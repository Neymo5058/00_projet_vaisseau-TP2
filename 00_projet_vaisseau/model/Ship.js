class Ship {
  id;
  name;
  category;
  baseSpeed;
  baseHealth;
  health;
  componentSlots = {
    thruster: null,
    hull: null,
    shield: null,
    engine: null,
    weapon: null,
    battery: null,
  };

  constructor(shipObj) {
    this.id = shipObj.id || shipObj._id || null;
    this.name = shipObj.name || null;
    this.category = shipObj.category || null;
    this.baseSpeed = shipObj.baseSpeed || null;
    this.baseHealth = shipObj.baseHealth || null;
    this.health = shipObj.health || null;
    this.componentSlots = {
      thruster: shipObj.componentSlots?.thruster || null,
      hull: shipObj.componentSlots?.hull || null,
      shield: shipObj.componentSlots?.shield || null,
      engine: shipObj.componentSlots?.engine || null,
      weapon: shipObj.componentSlots?.weapon || null,
      battery: shipObj.componentSlots?.battery || null,
    };
  }

  installComponent(component, slot) {
    if (!this.componentSlots.hasOwnProperty(slot)) {
      console.warn(`Invalid slot: ${slot}`);
      return;
    }
    this.componentSlots[slot] = component;
  }

  move() {
    const engine = this.componentSlots.engine;
    const thruster = this.componentSlots.thruster;

    if (!engine?.isWorking?.() || !thruster?.isWorking?.()) {
      console.warn('Ship cannot move — missing working engine or thruster');
      return false;
    }

    const speedBoost = (engine.stats?.speedBoost || 0) + (thruster.stats?.speedBoost || 0);
    const totalSpeed = this.baseSpeed + speedBoost;

    console.warn(`${this.name} is moving at speed ${totalSpeed}`);
    return true;
  }

  attack(target) {
    const weapon = this.componentSlots.weapon;

    if (!weapon?.isWorking?.() || !weapon?.hasAmmo?.()) {
      console.warn('Ship cannot attack — weapon offline or out of ammo');
      return false;
    }

    const damage = weapon.stats?.damage || 10;
    weapon.stats.ammo -= 1;

    target.receiveDamage({ damage });
    console.warn(`${this.name} attacked ${target.name} for ${damage} damage`);
    return true;
  }

  receiveDamage(source) {
    const incoming = source.damage || 0;
    const shield = this.componentSlots.shield;
    const shieldValue = shield?.stats?.absorption || 0;

    const netDamage = Math.max(0, incoming - shieldValue);
    this.health -= netDamage;

    console.warn(`${this.name} received ${netDamage} damage (after shield)`);

    if (this.health <= 0) {
      this.health = 0;
      console.warn(`${this.name} has been destroyed`);
    }
  }

  save(callback) {
    // Placeholder
  }

  remove(callback) {
    // Placeholder
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      baseSpeed: this.baseSpeed,
      baseHealth: this.baseHealth,
      health: this.health,
      componentSlots: this.componentSlots,
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

export default Ship;
