/* global KkSimple, ROT */

KkSimple.Player = function Player(map, x, y) {
  KkSimple.Unit.call(this, '@', map, x, y);
};

KkSimple.Player.prototype = Object.create(KkSimple.Unit.prototype);
KkSimple.Player.prototype.constructor = KkSimple.Player;

KkSimple.Player.prototype.act = function act() {
  KkSimple._engine.lock();
  
  var player = this;
  window.addEventListener('keydown', this);
};

KkSimple.Player.prototype.handleEvent = function handleEvent(e) {
  var dx = 0, dy = 0;
  switch (e.keyCode) {
    case ROT.VK_LEFT:   dx = -1; break;
    case ROT.VK_RIGHT:  dx =  1; break;
    case ROT.VK_UP:     dy = -1; break;
    case ROT.VK_DOWN:   dy =  1; break;
  }
  
  if (dx != 0 || dy != 0)
    this.moveBy(dx, dy);
  
  window.removeEventListener("keydown", this);
  KkSimple._engine.unlock();
  KkSimple._map.draw();
};
