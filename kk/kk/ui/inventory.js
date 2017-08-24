/**
 * @author 강예형
 * 인터페이스에서 인벤토리 부분을 담당하는 object.
 */

/* global $, EquipmentSlots */
'use strict';
var ui = ui || {};

ui.inventory = {
    /**
     * 인벤토리 UI를 초기화한다.
     * @arg items 인벤토리 내 아이템(Item 클래스의 객체)을 모아 놓은 배열에 대한 참조.
     *            추후 inventory.update()를 호출할 때마다 쓰인다.
     * @arg size  인벤토리 UI의 고정된 크기
     */
    init: function(items, size, equipment) {
        this._items = items;
        this._size = size;
        this.equipment_ = equipment;

        this.$inventory = $('#inventory');

        //장비창을 생성한다
        var $weaponEquipped = $('<div class="equipment-row">').appendTo(this.$inventory)
            .append(
                $('<span class="equipment-row__text"></span>').text('무기 : ')
            );
        this.$weaponCell = $('<div class="inventory-cell">').appendTo($weaponEquipped);
        $('<img class="inventory-cell__item-image">').appendTo(this.$weaponCell)
            .smartTooltip({
                'items': 'img',
                'content': 'no item',
                'disabled': true
            });


        //인벤토리 내 아이템 칸을 만든다
        for (var index = 0; index < size; ++index) {
            var $inventoryCell = $('<div class="inventory-cell">').appendTo(this.$inventory);
            $('<img class="inventory-cell__item-image">').appendTo($inventoryCell)
                .smartTooltip({
                    'items': 'img',
                    'content': 'no item',
                    'disabled': true
                });
        }
        this.$inventoryCells = this.$inventory.children('.inventory-cell');

        //아이템 툴팁에 나오는 버튼을 클릭 시 발동하는 이벤트 핸들러 설정
        var inventoryUi = this;
        $(document.body).on('click', '.ui-tooltip .item-tooltip button', function() {
            //인벤토리에서 입력 제한을 막았을 경우 버튼이 클릭에 반응하지 않음
            if (inventoryUi.isFrozen) return;

            var $button = $(this);
            var actionCode = $button.data('actionCode');
            var inventoryIndex = $button.data('inventoryIndex');

            var item;
            if (typeof inventoryIndex === 'number')
                item = inventoryUi._items[inventoryIndex];
            else
                item = inventoryUi.equipment_.getItemIn(inventoryIndex);
                
            console.assert(item, '클릭한 칸의 아이템이 없습니다!');

            //행동이 성공하면 인벤토리를 업데이트한다.
            if (item.doAction(actionCode))
                inventoryUi.update();
        });

        this.update();
    },

    /**
     * 인벤토리 UI를 업데이트한다. 아이템의 추가, 삭제, 상태 변화가 반영된다.
     */
    update: function() {
        var self = this;

        function updateItemImage($img, item, indexOrSlot) {
            if (item) {
                //아이템 이미지를 설정하고 툴팁을 새로 고침
                $img.smartTooltip('option', {
                    'content': self.createTooltip(item, indexOrSlot),
                    'disabled': false
                }).attr('src', item.getImagePath()).show();
            }
            else {
                //아이템 이미지와 툴팁을 숨긴다
                $img.hide().smartTooltip('disable');
            }
        }

        for (var index = 0; index < this._size; ++index) {
            var item = this._items[index];
            var $img = this.$inventoryCells.eq(index).children('img');

            updateItemImage($img, item, index);
        }

        updateItemImage(
            this.$weaponCell.children('img'),
            this.equipment_.getItemIn(EquipmentSlots.SLOT_WEAPON),
            EquipmentSlots.SLOT_WEAPON
        );

    },


    /**
     * item을 위한 툴팁(jQuery HTML 조각)을 만든다.
     */
    createTooltip: function(item, indexOrSlot) {
        var $tooltip = $('<div class="item-tooltip">');
        $('<div class="item-tooltip__title">').appendTo($tooltip).text(item.getName());
        $('<div class="item-tooltip__desc">').appendTo($tooltip).text(item.desc_);

        var $tooltipButtons = $('<div class="tooltip-buttonset">').appendTo($tooltip);

        item.getAvailableActions().forEach(function(actionCode) {
            $('<button>').appendTo($tooltipButtons)
                .attr('data-inventory-index', indexOrSlot)  //data()로 지정한 데이터는 툴팁이 사라질 때 같이 소멸해 버린다!!!
                .attr('data-action-code', actionCode)      //attr()을 직접 지정해서 이 문제를 우회함
                .text(Item.actionCodes[actionCode]);
        });

        $tooltip.toggleClass('item-tooltip--frozen', !!this.isFrozen)
            .find('button').prop('disabled', this.isFrozen);
        return $tooltip;
    },

    /**
     * 인벤토리에서 아이템을 조작할 수 없게 제한한다.(설명 보기는 가능)
     */
    freezeInput: function() {
        this.isFrozen = true;
        this.update();
    },

    /**
     * 인벤토리에서 아이템을 조작할 수 있게 제한을 풀어준다.
     */
    unfreezeInput: function() {
        this.isFrozen = false;
        this.update();
    }
};
