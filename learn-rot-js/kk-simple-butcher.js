/* global KkSimple, ROT */

KkSimple.Butcher = function Butcher(map, x, y) {
  KkSimple.Unit.call(this, 'B', map, x, y);
};

KkSimple.Butcher.prototype = Object.create(KkSimple.Unit.prototype);
KkSimple.Butcher.prototype.constructor = KkSimple.Butcher;

KkSimple.Butcher.prototype.act = function act() {
  var map = this._map;
  if (!map) return;
  
  var pathFinder = new ROT.Path.AStar(
    KkSimple._player.getX(),
    KkSimple._player.getY(),
    function passableCallback(x, y) {
      return map.getTileAt(x, y).isType(KkSimple.Tile.FLOOR);
    }
  );
  
  var pathX = [], pathY = [];
  pathFinder.compute(
    this._x,
    this._y,
    function computePathCallback(x, y) {
      pathX.push(x);
      pathY.push(y);
    }
  );
  
  if (pathX.length > 1) {
    this.moveTo(pathX[1], pathY[1]);
    KkSimple._map.draw();
  }
  
  console.log("Butcher moves to %s, %s", this._x, this._y);
};
