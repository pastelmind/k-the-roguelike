var GAME_WIDTH = 640;
var GAME_HEIGHT = 480;

var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;

var MAP_WIDTH = 90;
var MAP_HEIGHT = 60;

var UP_DIRECTION = 0;
var DOWN_DIRECTION = 1;
var LEFT_DIRECTION = 2;
var RIGHT_DIRECTION = 3;
var UP_LEFT_DIRECTION = 4;
var UP_RIGHT_DIRECTION = 5;
var DOWN_LEFT_DIRECTION = 6;
var DOWN_RIGHT_DIRECTION = 7;

var getRandom = function(low, high)
{
    return (Math.random() * (high - low)) + low;
}