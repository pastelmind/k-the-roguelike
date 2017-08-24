/**
 * @author 강예형
 * 아이템 클래스
 */

/* global Entity, EquipmentSlots, ui */
'use strict';

class Item extends Entity {
    constructor(map, template)
    {
        super(map);

        this.owner_ = null; //아이템의 소지자
        this.isEquipped_ = false; //아이템이 착용되어 있는지의 여부
        
        if (template)
            this.loadTemplate(template);
    }

    loadTemplate(template)
    {
        super.loadTemplate(template);
        
        this.type_ = template.type;
        this.imageName_ = template.imageName;
        
        //소지한 아이템에 적용 가능한 기본적인 행동(떨어뜨리기, 던지기 등)의 코드
        this.actions_ = ['drop', 'throw'];

        //아이템의 종류에 따른 행동과 부가적인 속성 추가
        if (this.type_ === 'food')
        {
            this.actions_.push('eat');
            this.fullness_ = template.fullness;
        }

        if (this.type_ === 'weapon')
        {
            this.actions_.push('equip', 'unequip');
            this.damage_ = template.damage;
        }
        
        if (this.code_ === 'battery')
        {
            this.charge_ = 0;
            this.maxCharge_ = 10;
        }
    }
    
    getName()
    {
        if (this.code_ === 'battery')
            return super.getName() + ' (' + this.charge_ + '/' + this.maxCharge_ + ')';
        
        return super.getName();
    }
    
    /**
     * 인벤토리에 넣을 때 나타낼 아이템의 경로를 가져온다.
     */
    getImagePath()
    {
        var imageName = this.imageName_;
        if (this.code_ === 'battery')
            imageName = 'battery' + this.charge_ + '.png';
        
        return 'images/items/' + imageName;
    }
    
    /**
     * 아이템의 맵 상의 위치를 설정한다.
     * @arg x   이동할 x의 좌표
     * @arg y   이동할 y의 좌표
     */ 
    setPos(x, y)
    {
        //위치를 옮기기 이전의 맵의 타일에서 아이템을 제거한다.
        this.map_.popItem(this.x_, this.y_, this);

        this.x_ = x;
        this.y_ = y;
        
        //새로운 위치에 아이템을 저장한다.
        this.map_.pushItem(this.x_, this.y_, this);
    }
    
    /**
     * 아이템을 지도에서 제거한다. (게임 내에서는 제거되지 않음)
     */
    removeFromMap()
    {
        this.map_.popItem(this.x_, this.y_);
    }
    
    
    /**
     * 아이템을 착용 가능한 슬롯을 구한다. (착용 불가능한 경우 null)
     */
    getEquipmentSlot()
    {
        if (this.type_ === 'weapon')
            return EquipmentSlots.SLOT_WEAPON;
        if (this.type_ === 'armor')
            return EquipmentSlots.SLOT_ARMOR;
        return null;
    }

    /**
     * 이 아이템에 현재 사용 가능한 행동의 목록을 배열로 돌려준다.
     */
    getAvailableActions()
    {
        //배열을 복사
        var actions = this.actions_.slice();

        //아무도 소지하고 있지 않은(땅에 떨어진) 아이템은 행동의 대상이 될 수 없다.
        if (!this.owner_) return [];

        if (this.owner_.equipment_.isEquipped(this))
            actions.remove('equip');
        else
            actions.remove('unequip');

        return actions;
    }

    /**
     * actionCode로 지정한 행동을 수행한다.
     * 행동이 성공하면 그 행동의 리턴값을 돌려준다.
     * 행동이 실패하면 false스러운 값을 돌려준다.
     */
    doAction(actionCode)
    {
        if (this.getAvailableActions().indexOf(actionCode) === -1) {
            ui.gamelog.print('[[error]]이 아이템에 ' + actionCode + ' 행동을 사용할 수 없습니다.');
            return false;
        }

        switch (actionCode)
        {
            case 'drop':
                return this.owner_.drop(this);
            case 'throw':
                return this.owner_.throwItem(this);
            case 'eat':
                return this.owner_.eat(this);
            case 'equip':
                return this.owner_.equip(this);
            case 'unequip':
                return this.owner_.unequip(this);
            default:
                ui.gamelog.print('[[error]]' + actionCode + '는 정의되지 않은 행동입니다.');
                return false;
        }
    }
    
    draw(graphics)
    {
        graphics.drawImage(this.getImagePath(), this.x_, this.y_);
    }
};

/**
 * 아이템에 사용 가능한 행동 및 UI 텍스트
 */
Item.actionCodes = {
    'drop'      : '내려놓기',
    'throw'     : '던지기',
    'eat'       : '먹기',
    'equip'     : '착용',
    'unequip'   : '벗기'
};
