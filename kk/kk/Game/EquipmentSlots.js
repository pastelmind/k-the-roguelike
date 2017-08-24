/**
 * @author 강예형
 * 착용한 장비에 관련된 기본 동작을 추상화하는 클래스
 */

'use strict';
/* global Item */

class EquipmentSlots
{
    constructor()
    {
        this.weapon_ = null;
        this.armor_  = null;
    }
    
    /**
     * 아이템을 착용한다. 해당 슬롯에 다른 아이템을 착용하고 있으면 실패한다.
     * @return 성공시 착용한 item 객체, 실패시 false
     */
    equip(item)
    {
        console.assert(item instanceof Item, 'item 값은 Item 클래스의 객체여야 함');
        
        var slot = item.getEquipmentSlot();
        
        //다른 아이템을 이미 착용하고 있을 경우
        if (this.getItemIn(slot))
            return false;
        
        this[slot] = item;
        return item;
    }
    
    /**
     * 착용한 아이템을 벗는다.
     * @return 성공시 벗은 item 객체, 실패시 false
     */
    unequip(item)
    {
        console.assert(item instanceof Item, 'item 값은 Item 클래스의 객체여야 함');
        
        var slot = item.getEquipmentSlot();
        console.assert(this.getItemIn(slot) === item, '착용하지 않은 아이템을 벗으려 함');
        
        this[slot] = null;
        return item;
    }
    
    /**
     * slot에 착용한 아이템을 돌려준다.(없으면 null)
     */
    getItemIn(slot)
    {
        console.assert(slot in this, slot + '은 올바른 슬롯이 아님');
        return this[slot];
    }
    
    /**
     * 아이템을 착용하고 있는지 확인한다.
     */
    isEquipped(item)
    {
        var slot = item.getEquipmentSlot();
        if (!slot) return false;
        
        return this.getItemIn(slot) === item;
    }
}

//착용 가능한 슬롯
EquipmentSlots.SLOT_WEAPON = 'weapon_';
EquipmentSlots.SLOT_ARMOR  = 'armor_';
