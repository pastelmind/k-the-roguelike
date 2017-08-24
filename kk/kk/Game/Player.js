/**
 * @author 김선휘
 * 플레이어를 담당하는 클래스 Entity를 상속받는다.
 */

'use strict';
/* global ROT, Unit, Inventory, EquipmentSlots, Item, ui */

class Player extends Unit
{
    /**
     * Player클래스를 초기화한다.
     * @arg map         map 객체 플레이어의 위치 초기화등 맵과의 상호작용 시 사용됨
     * @arg input       input 객체
     */ 
    constructor(map, input)
    {
        super(map);
        this.input_ = input;
        
        var rooms = this.map_.map_.getRooms();
        var x = Math.floor(( rooms[0].getLeft() + rooms[0].getRight() ) / 2);
        var y = Math.floor(( rooms[0].getTop() + rooms[0].getBottom() ) / 2);
        this.setPos(x, y);
        this.vision_ = 4;
        
        //인벤토리 내에 소지한 아이템의 배열
        this.inventory_ = new Inventory(12);
        this.equipment_ = new EquipmentSlots();
        
        this.hp_ = 20; this.maxHp_ = 20;
        this.fullness_ = 100; this.maxFullness_ = 300;
        
        //플레이어 상태창 UI 및 인벤토리 UI를 동기화
        ui.charstats.init(this);
        ui.inventory.init(this.inventory_.items_, this.inventory_.size_, this.equipment_);
        
        this.symbol_ = '@';
    }
    
    /**
     * 아이템을 주워 인벤토리에 넣는다. 실패하면 아이템을 땅에 내려놓는다.
     * @return 성공하면 item 객체를 돌려주고, 실패시 false를 돌려준다.
     */
    pickUp(item)
    {
        if (!this.inventory_.add(item))
        {
            //맵에 아이템을 내려놓는다.
            item.owner_ = null;
            item.setPos(this.x_, this.y_);
            return false;
        }
        
        item.owner_ = this; //아이템의 소유권을 지정한다.
        item.removeFromMap();
        ui.inventory.update();
        return item;
    }
    
    /**
    * 인벤토리에 있는 아이템을 땅에 내려놓는다.
    * 착용한 아이템에 사용하면 벗어서 내려놓는다.
    * @return 성공하면 item 객체를 돌려주고, 실패시 false를 돌려준다.
    */
    drop(item)
    {
        //착용한 아이템일 경우 벗는다
        if (this.equipment_.isEquipped(item))
        {
            if (!this.equipment_.unequip(item))
                return false;
        }
        else if (!this.inventory_.remove(item))
        {
            return false;
        }
        
        item.owner_ = null; //아이템의 소유권을 없앤다.
        
        // 맵에 아이템을 내려놓는다.
        item.setPos(this.x_, this.y_);
        
        ui.gamelog.printf('%{을} 땅에 내려놓았습니다.', item);
        
        ui.inventory.update();
        return item;
    }
    
    /**
     * 아이템(item)을 착용한다. 이미 착용한 아이템이 있으면 벗어서 인벤토리에 넣는다.
     * 만약 착용 불가능하면 false를 돌려준다.
     */
    equip(item)
    {
        var slot = item.getEquipmentSlot();
        if (!slot)
        {
            ui.gamelog.printf('[[error]]%{은} 착용할 수 없는 아이템입니다.', item);
            return false;
        }
        
        //기존에 착용한 장비가 있으면 벗어둔다
        var previouslyEquippedItem = this.equipment_.getItemIn(slot);
        if (previouslyEquippedItem)
            this.equipment_.unequip(previouslyEquippedItem);
        
        //착용할 아이템을 인벤토리에서 꺼낸다
        if (this.inventory_.indexOf(item) !== -1)
            this.inventory_.remove(item);
        
        this.equipment_.equip(item);
        item.owner_ = this;
        
        if (previouslyEquippedItem)
            this.pickUp(previouslyEquippedItem);
        
        ui.inventory.update();
        return item;
    }
    
    /**
     * 아이템(item)을 벗어서 인벤토리에 넣는다. 성공하면 item 객체를, 실패하면 false를 돌려준다.
     */
    unequip(item)
    {
        if (!this.equipment_.unequip(item))
            return false;
        
        return this.pickUp(item);
    }
    
    /**
     * 아이템(item)을 먹는다. 성공하면 true, 실패하면 false를 돌려준다.
     */
    eat(item)
    {
        console.assert(item.type_ === 'food', '%{은} 음식이 아니므로 먹을 수 없음'.format(item));
        
        //인벤토리에 들어있는 아이템이면 인벤토리에서 꺼낸다
        if (this.inventory_.indexOf(item) !== -1)
        {
            if (!this.inventory_.remove(item))
                return false;
            ui.inventory.update();
        }
        
        var prevFullness = this.fullness_;
        this.fullness_ = Math.min(this.fullness_ + item.fullness_, this.maxFullness_);
        if (this.maxFullness_ === this.fullness_)
            ui.gamelog.printf('%{을} 먹어 허기를 모두 회복하였습니다.', item);
        else
            ui.gamelog.printf('%{을} 먹어 허기를 %{s}만큼 회복하였습니다.', item, this.fullness_ - prevFullness);
        ui.charstats.update();
        
        item.remove();
        return true;
    }
    
    getDamage()
    {
        var damage = 0;
        
        var weapon = this.equipment_.getItemIn(EquipmentSlots.SLOT_WEAPON);
        if (weapon)
            damage += weapon.damage_ || 0;

        return Math.min(damage, 1);
    }
    
    /**
     * 플레이어를 매 프레임마다 업데이트함
     */
    update()
    {
        
        this.input_.wasdUpdate();
        
        this.dx_ = this.input_.getDiffX();
        this.dy_ = this.input_.getDiffY();
        
        this.moveDirection_ = this.input_.getDirection();
        
        if (this.input_.isKeyDown(ROT.VK_SPACE)) //32
        {
            var item = this.map_.getItemList(this.x_, this.y_)[0]; 
            if (item)
                this.pickUp(item);
        }
        
        if(this.input_.isKeyDown(ROT.VK_F))
            this.attack();
        
    }
    
    /**
     * 플레이어를 그려줌 
     */
    draw(graphics)
    {
        //graphics.fillRect(this.x_, this.y_, "rgb(0, 0, 0)");
        super.draw(graphics);
        
        // 바라보는 방향에 따른 그리기 추가작업
        graphics.drawMoveDirection(this.x_, this.y_, this.moveDirection_);
    }
    
    attack()
    {
        switch(this.moveDirection_)
        {
            case UP_DIRECTION:
                this.attackXY(this.x_, this.y_ - 1);
                break;
        }
    }
}