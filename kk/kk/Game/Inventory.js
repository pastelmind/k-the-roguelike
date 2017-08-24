/**
 * @author 강예형
 * 인벤토리에 관련된 기본 동작을 추상화하는 클래스
 */

'use strict';
/* global Item, ui */

class Inventory
{
    constructor(size)
    {
        this.size_ = size = parseInt(size, 10) || 12;
        this.items_ = new Array(size);
    }
    
    /**
     * 인벤토리에 아이템을 넣는다.
     * @arg [index]     인벤토리 칸을 직접 지정할 경우 슬롯 번호
     * @return 성공시 인벤토리에 넣은 item 객체, 실패시 false
     */
    add(item, index)
    {
        console.assert(item instanceof Item, 'item 값은 Item 클래스의 객체여야 함');
        console.assert(this.items_.indexOf(item) === -1, 'item이 이미 인벤토리에 들어있음');
        
        //인벤토리 슬롯을 직접 선택시
        if (typeof index === 'number')
        {
            if (this.items_[index])
            {
                ui.gamelog.printf('[[error]]' + index + '번째 칸에 %{이} 있어서 %{을} 넣을 수 없습니다.', this.items_[index], item);
                return false;
            }
        }
        else
        {
            for (index = 0; index < this.size_; ++index)
                if (!this.items_[index]) break;
    
            if (index === this.size_)
            {
                ui.gamelog.printf('[[error]]인벤토리가 가득 차서 %{을} 넣을 수 없습니다.', item);
                return false;
            }
        }
        
        this.items_[index] = item;
        return item;
    }
    
    /**
     * 인벤토리에서 아이템을 제거한다.
     * @return 성공시 인벤토리에 넣은 item 객체, 실패시 false
     */
    remove(item)
    {
        console.assert(item instanceof Item, 'item 값은 Item 클래스의 객체여야 함');
        
        var index = this.items_.indexOf(item);
        console.assert(index !== -1, 'item이 인벤토리에 들어있지 않음');
        
        this.items_[index] = null;
        return item;
    }
    
    /**
     * 인벤토리에 이 아이템이 들어있는 칸의 번호를 구한다.(없으면 -1)
     */
    indexOf(item)
    {
        return this.items_.indexOf(item);
    }
}
