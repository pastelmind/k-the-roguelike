/* global KkSimple, ROT */

KkSimple.Map = function Map() {
  var digger = new ROT.Map.Digger();
  
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
  this.forEachTile(function itemGenerateCallback(x, y, tile) {
    if (tile._type == KkSimple.Tile.FLOOR)
    {
      var chanceToSpawnItem = nKrystalsToSpawn / nTotalFloorTiles;
      if (ROT.RNG.getUniform() < chanceToSpawnItem) //Automatically handle NaN (if all floor tiles have been visited)
      {
        tile._objects.push(KkSimple.Map.OBJECT_KRYSTAL);
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

KkSimple.Map.prototype.draw = function draw() {
  this.forEachTile(function drawCallback(x, y, tile) {
    var fg = "#afa", bg = "#000";
    if (tile.isType(KkSimple.Tile.WALL))
    {
      fg = "#ccc"; bg = "#888";
    }
    
    var ch = "";
    if (tile.hasObject(KkSimple.Map.OBJECT_KRYSTAL)) {
      ch = KkSimple.getObjectChar(KkSimple.Map.OBJECT_KRYSTAL);
      fg = "#fff";
    }
    else
      ch = tile.getChar();
      
    KkSimple._display.draw(x, y, ch, fg, bg);
  });
};
