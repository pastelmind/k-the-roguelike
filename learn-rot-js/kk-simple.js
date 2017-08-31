/* global ROT */

var KkSimple = {
  _display: null,
  _map: null,
  
  init: function init() {
    this._display = new ROT.Display();
    document.body.appendChild(this._display.getContainer());
    
    this._map = new this.Map();
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
