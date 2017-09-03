/* global KkSimple */

KkSimple.Item = function Item(itemData, map, x, y) {
  KkSimple.Unit.call(this, itemData.ch, map, x, y);
  this._code = itemData.code;
};

KkSimple.Item.prototype = Object.create(KkSimple.Unit.prototype);
KkSimple.Item.prototype.constructor = KkSimple.Item;

KkSimple.Item.prototype.getCode = function getCode() {
  return this._code;
};


//Item data
KkSimple.items = {
  krystal: {
    ch: '*'
  }
};

//Automatically add code string to each item data
for (var itemCode in KkSimple.items)
  KkSimple.items[itemCode].code = itemCode;
