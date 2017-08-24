/**
 * @author 강예형
 * 플레이어의 상태창을 관리하는 오브젝트
 */

/* global $ */
'use strict';
var ui = ui || {};

ui.charstats = {
    /**
     * 상태창을 초기화한다.
     */
    init: function init(player)
    {
        this.$charstats_ = $('#charstats');
        this.player_ = player;
        
        this.update();
    },
    
    /**
     * 상태창을 최신화한다.
     */
    update: function update()
    {
        this.$charstats_.empty();
        
        $('<div>').appendTo(this.$charstats_)
            .text('HP : ' + this.player_.hp_ + ' / ' + this.player_.maxHp_);
        
        var $fullness = $('<div>').appendTo(this.$charstats_);
        var fullnessRatio = this.player_.fullness_ / this.player_.maxFullness_;
        if (fullnessRatio >= 0.5)
            $fullness.text('배부름');
        else if (fullnessRatio >= 0.25)
            $fullness.text('배고픔');
        else
            $fullness.text('굶주림');
    }
};
