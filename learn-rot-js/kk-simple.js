/* global ROT */

var KkSimple = {
  _display: null,
  _map: null,
  
  init: function init() {
    this._display = new ROT.Display();
    document.body.appendChild(this._display.getContainer());
    
    this._map = new this.Map();
    
    //Generate the player
    var playerX, playerY;
    var xMax = this._map.getWidth()  - 1;
    var yMax = this._map.getHeight() - 1;
    do {
      playerX = ROT.RNG.getUniformInt(0, xMax);
      playerY = ROT.RNG.getUniformInt(0, yMax);
      var tile = this._map.getTileAt(playerX, playerY);
    } while (!tile.isType(KkSimple.Tile.FLOOR));
    this._player = new this.Player(this._map, playerX, playerY);
    
    var scheduler = new ROT.Scheduler.Simple();
    scheduler.add(this._player, true);
    this._engine = new ROT.Engine(scheduler);
    this._engine.start();
    
    this._map.draw();
  },
  
  getObjectChar: function getObjectChar(objectType) {
    switch (objectType) {
      case 0:   return "";  //nothing
      case 1:   return "@"; //player
      case 2:   return "*"; //krystal
      default:  return "!"; //unknown
    }
    
  }
};

KkSimple.init = KkSimple.init.bind(KkSimple);

document.addEventListener('DOMContentLoaded', KkSimple.init);
