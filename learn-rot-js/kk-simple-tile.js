/* global KkSimple */

KkSimple.Tile = function Tile(tileType) {
  this._type = (tileType === undefined ? KkSimple.Tile.TILE_WALL : tileType);
  this._objects = [];
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
