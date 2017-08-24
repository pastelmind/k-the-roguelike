/**
 * @author 강예형
 * 게임 시작 시 이미지를 미리 로딩해 준다.
 */

/* global $, items */
'use strict';
var ui = ui || {};

ui.preloader = {
    loadImage: function(imagePath) {
        $('<img>').attr('src', imagePath).appendTo(document.body).hide();
    }
};

//아이템을 인벤토리에 넣을 때 이미지가 뜨는 딜레이를 해소하기 위해
//인벤토리 이미지를 미리 로딩한다.
$(function() {
    items.all.forEach(function(itemTemplate) {
        ui.preloader.loadImage('images/items/' + itemTemplate.imageName);
    });
});
