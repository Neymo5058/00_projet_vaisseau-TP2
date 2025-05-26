import ShipModel from '../model/ShipModel.js';
import { Types } from 'mongoose';

const populateAllSlots = [
  'componentSlots.weapon',
  'componentSlots.engine',
  'componentSlots.thruster',
  'componentSlots.shield',
  'componentSlots.battery',
  'componentSlots.hull',
  'componentSlots.radar',
];

const ShipController = {
  getAll: async (req, res) => {
    try {
      const ships = await ShipModel.find().populate(populateAllSlots);

      const reorderedShips = ships.map((ship) => ({
        _id: ship._id,
        name: ship.name,
        category: ship.category,
        baseSpeed: ship.baseSpeed,
        baseHealth: ship.baseHealth,
        health: ship.health,
        __v: ship.__v,
        componentSlots: Object.fromEntries(
          Object.entries(ship.componentSlots).map(([slot, comp]) => [
            slot,
            comp && comp.stats
              ? {
                  _id: comp._id,
                  name: comp.name,
                  category: comp.category,
                  stats: comp.stats,
                  __v: comp.__v,
                }
              : comp,
          ])
        ),
      }));

      res.status(200).json({
        status: 'success',
        results: reorderedShips.length,
        data: { ships: reorderedShips },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const ship = await ShipModel.findById(req.params.shipId).populate(populateAllSlots);
      if (!ship) return res.status(404).json({ error: 'Ship not found' });

      const reordered = {
        _id: ship._id,
        name: ship.name,
        category: ship.category,
        baseSpeed: ship.baseSpeed,
        baseHealth: ship.baseHealth,
        health: ship.health,
        __v: ship.__v,
        componentSlots: Object.fromEntries(
          Object.entries(ship.componentSlots).map(([slot, comp]) => [
            slot,
            comp && comp.stats
              ? {
                  _id: comp._id,
                  name: comp.name,
                  category: comp.category,
                  stats: comp.stats,
                  __v: comp.__v,
                }
              : comp,
          ])
        ),
      };

      res.status(200).json(reordered);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const ship = new ShipModel({ ...req.body, _id: new Types.ObjectId() });
      await ship.save();
      res.status(201).json(ship);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  batchCreate: async (req, res) => {
    try {
      const ships = req.body.map((data) => ({
        ...data,
        _id: new Types.ObjectId(),
      }));
      const result = await ShipModel.insertMany(ships);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const deleted = await ShipModel.findByIdAndDelete(req.params.shipId);
      if (!deleted) return res.status(404).json({ error: 'Ship not found' });
      res.status(200).json({ message: 'Ship deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  attack: async (req, res) => {
    const { shipId } = req.params;
    const { defenderShipId } = req.body;

    try {
      const attacker = await ShipModel.findById(shipId).populate(populateAllSlots);
      const defender = await ShipModel.findById(defenderShipId).populate(populateAllSlots);

      if (!attacker || !defender) {
        return res.status(404).json({ error: 'Attacker or defender not found' });
      }

      const weapon = attacker.componentSlots.weapon;
      if (!weapon) {
        return res.status(400).json({ error: 'Attacker has no weapon installed.' });
      }

      const damage = typeof weapon.stats?.damage === 'number' ? weapon.stats.damage : 0;
      const ammo = typeof weapon.stats?.ammo === 'number' ? weapon.stats.ammo : 0;

      if (ammo <= 0) {
        return res.status(400).json({ error: "Attacker's weapon has no ammo." });
      }

      const shield = defender.componentSlots.shield;
      const absorption = typeof shield?.stats?.absorption === 'number' ? shield.stats.absorption : 0;

      const netDamage = Math.max(0, damage - absorption);
      defender.health -= netDamage;
      if (defender.health < 0) defender.health = 0;

      // Reduce ammo by 1
      attacker.componentSlots.weapon.stats.ammo -= 1;
      await attacker.componentSlots.weapon.save();
      await defender.save();

      res.status(200).json({
        message: `Attacked with ${damage} damage (after shield: ${netDamage}).`,
        attacker,
        defender,
        isDefenderDestroyed: defender.health === 0,
      });
    } catch (err) {
      console.error('Attack error:', err);
      res.status(500).json({ error: err.message });
    }
  },
  move: async (req, res) => {
    try {
      const ship = await ShipModel.findById(req.params.shipId).populate([
        'componentSlots.engine',
        'componentSlots.thruster',
      ]);

      if (!ship) {
        return res.status(404).json({ error: 'Ship not found' });
      }

      const engineBoost = ship.componentSlots.engine?.stats?.speedBoost || 0;
      const thrusterBoost = ship.componentSlots.thruster?.stats?.speedBoost || 0;

      if (engineBoost <= 0 || thrusterBoost <= 0) {
        return res.status(400).json({ error: 'Engine or thruster not functional.' });
      }

      const totalSpeed = ship.baseSpeed + engineBoost + thrusterBoost;

      res.status(200).json({
        message: 'Ship can move.',
        baseSpeed: ship.baseSpeed,
        engineBoost,
        thrusterBoost,
        totalSpeed,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default ShipController;
