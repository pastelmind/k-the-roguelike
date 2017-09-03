/* global KkSimple */

KkSimple.Unit = function Unit(ch, map, x, y) {
  this._ch = ch;
  this._x = x;
  this._y = y;
  this.addToMap(map, x, y);
};

KkSimple.Unit.prototype.addToMap = function addToMap(map) {
  this.removeFromMap();
  
  if (map.addUnit(this)) //Check if the stored unit coordinates are valid
    this._map = map;
};

KkSimple.Unit.prototype.removeFromMap = function removeFromMap() {
  if (this._map) {
    this._map.removeUnit(this);
    this._map = null;
  }
};

KkSimple.Unit.prototype.setPos = function setPos(x, y) {
  if (this._map) {
    if (this._map.setUnitPos(this, x, y)) {
      this._x = x;
      this._y = y;
    }
  }
  else {
    this._x = x;
    this._y = y;
  }
};

KkSimple.Unit.prototype.moveTo = function moveTo(x, y) {
  if (!(this._map) || this._map.getTileAt(x, y).isType(KkSimple.Tile.FLOOR))
    this.setPos(x, y);
};

KkSimple.Unit.prototype.moveBy = function moveBy(dx, dy) {
  this.moveTo(this.getX() + dx, this.getY() + dy);
};

KkSimple.Unit.prototype.getX = function getX() { return this._x; };
KkSimple.Unit.prototype.getY = function getY() { return this._y; };
KkSimple.Unit.prototype.getChar = function getChar() { return this._ch; };
