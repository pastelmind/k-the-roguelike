/* global KkSimple */

KkSimple.Tile = function Tile(tileType) {
  this._type = (tileType === undefined ? KkSimple.Tile.TILE_WALL : tileType);
  this._objects = [];
  this._units = [];
};

KkSimple.Tile.FLOOR = 0;
KkSimple.Tile.WALL  = 1;

KkSimple.Tile.prototype.getChar = function getChar() {
  switch (this._type) {
    case KkSimple.Tile.FLOOR: return ".";
    case KkSimple.Tile.WALL:  return "#";
    default:                  return "?"; //unknown
  }
};

KkSimple.Tile.prototype.isType = function isType(type) {
  return this._type == type;
};

KkSimple.Tile.prototype.hasObject = function hasObject(obj) {
  return this._objects.indexOf(obj) != -1;
};

KkSimple.Tile.prototype.hasUnit = function hasUnit(unit) {
  return this._units.indexOf(unit) != -1;
};

KkSimple.Tile.prototype.addUnit = function addUnit(unit) {
  if (!this.hasUnit(unit))
    this._units.push(unit);
};

KkSimple.Tile.prototype.removeUnit = function removeUnit(unit) {
  var index;
  while ((index = this._units.indexOf(unit)) != -1)
    this._units.splice(index, 1);
};

KkSimple.Tile.prototype.getFirstUnit = function getFirstUnit() {
  return this._units[0];
};
