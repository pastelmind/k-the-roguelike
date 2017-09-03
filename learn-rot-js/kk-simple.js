/* global ROT */

var KkSimple = {
  _display: null,
  _map: null,
  
  init: function init() {
    //Initialize the display
    this._display = new ROT.Display();
    document.body.appendChild(this._display.getContainer());
    
    //Initialize the scheduler and engine
    var scheduler = new ROT.Scheduler.Speed();
    this._engine = new ROT.Engine(scheduler);
    
    //Generate the map
    this._map = new this.Map();
    
    //Generate the player
    var playerX, playerY;
    do {
      playerX = ROT.RNG.getUniformInt(0, this._map.getWidth()  - 1);
      playerY = ROT.RNG.getUniformInt(0, this._map.getHeight() - 1);
      var tile = this._map.getTileAt(playerX, playerY);
    } while (!tile.isType(KkSimple.Tile.FLOOR));
    this._player = new this.Player(this._map, playerX, playerY);
    scheduler.add(this._player, true);
    
    //Generate the Butcher
    var butcherX, butcherY;
    do {
      butcherX = ROT.RNG.getUniformInt(0, this._map.getWidth()  - 1);
      butcherY = ROT.RNG.getUniformInt(0, this._map.getHeight() - 1);
      var tile = this._map.getTileAt(butcherX, butcherY);
    } while (!tile.isType(KkSimple.Tile.FLOOR));
    this._butcher = new this.Butcher(this._map, butcherX, butcherY);
    scheduler.add(this._butcher, true);
    
    //Start the engine (this should be called after adding all actors)
    this._engine.start();
    
    //Draw the map
    this._map.draw();
  }
};

KkSimple.init = KkSimple.init.bind(KkSimple);

document.addEventListener('DOMContentLoaded', KkSimple.init);
