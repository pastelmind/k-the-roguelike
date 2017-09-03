/* global KkSimple, ROT */

KkSimple.Map = function Map() {
  this._width  = ROT.DEFAULT_WIDTH;
  this._height = ROT.DEFAULT_HEIGHT;
  
  //Generate the map
  var digger = new ROT.Map.Digger(this._width, this._height);
  
  var tiles = [];
  this._tiles = tiles;
  var nTotalFloorTiles = 0;
  
  digger.create(function mapCreateCallback(x, y, value) {
    //value = 0 for walkable tiles (floor and corridoors), 1 for walls
    var tileType = value == 0 ? KkSimple.Tile.FLOOR : KkSimple.Tile.WALL;
    
    if (!tiles[y])
      tiles[y] = [];
    tiles[y][x] = new KkSimple.Tile(tileType);
    
    if (value == 0)
      ++nTotalFloorTiles;
  });
  
  //Generate items
  var nKrystalsToSpawn = 10;
  var map = this;
  this.forEachTile(function itemGenerateCallback(x, y, tile) {
    if (tile.isType(KkSimple.Tile.FLOOR))
    {
      var chanceToSpawnItem = nKrystalsToSpawn / nTotalFloorTiles;
      if (ROT.RNG.getUniform() < chanceToSpawnItem) //Automatically handle NaN (if all floor tiles have been visited)
      {
        tile.addUnit(new KkSimple.Item(KkSimple.items.krystal, map, x, y));
        --nKrystalsToSpawn;
      }
      
      --nTotalFloorTiles;
    }
  });
};

KkSimple.Map.OBJECT_NONE    = 0;
KkSimple.Map.OBJECT_PLAYER  = 1;
KkSimple.Map.OBJECT_KRYSTAL = 2;

KkSimple.Map.prototype.forEachTile = function forEachTile(callback) {
  for (var y = 0; y < this._tiles.length; ++y) {
    for (var x = 0; x < this._tiles[y].length; ++x) {
      callback.call(this, x, y, this._tiles[y][x]);
    }
  }
};

KkSimple.Map.prototype.getTileAt = function getTileAt(x, y) {
  return this._tiles[y] ? this._tiles[y][x] : undefined;
};

KkSimple.Map.prototype.draw = function draw() {
  this.forEachTile(function drawCallback(x, y, tile) {
    var fg = "#afa", bg = "#000";
    if (tile.isType(KkSimple.Tile.WALL))
    {
      fg = "#ccc"; bg = "#888";
    }
    
    var ch = "", unitToDraw = null;
    if (tile.hasUnit(KkSimple._player)) {
      ch = KkSimple._player.getChar();
    }
    else if (unitToDraw = tile.getFirstUnit()) {
      ch = unitToDraw.getChar();
      fg = "#fff";
    }
    else
      ch = tile.getChar();
      
    KkSimple._display.draw(x, y, ch, fg, bg);
  });
};

KkSimple.Map.prototype.addUnit = function addUnitAt(unit) {
  var tile = this.getTileAt(unit.getX(), unit.getY());
  if (tile) {
    tile.addUnit(unit);
    return true;
  }
  return false;
};

KkSimple.Map.prototype.removeUnit = function removeUnitAt(unit) {
  var tile = this.getTileAt(unit.getX(), unit.getY());
  if (tile)
    tile.removeUnit(unit);
};

KkSimple.Map.prototype.setUnitPos = function setUnitPos(unit, x, y) {
  var newTile = this.getTileAt(x, y);
  
  if (newTile) {
    var oldTile = this.getTileAt(unit.getX(), unit.getY());
    if (oldTile)
      oldTile.removeUnit(unit);
    newTile.addUnit(unit);
    return true;
  }
  return false;
};

KkSimple.Map.prototype.getWidth  = function getWidth()  { return this._width; };
KkSimple.Map.prototype.getHeight = function getHeight() { return this._height; };
