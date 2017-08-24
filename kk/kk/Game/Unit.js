/**
 * @author 강예형
 * 체력이 존재하고, 공격하거나 공격받을 수 있으며,
 * 상태 이상 효과를 가질 수 있고, 피해를 받아 죽을 수 있다.
 */

/* global Entity, ROT */
'use strict';

class Unit extends Entity
{
    constructor(map)
    {
        super(map);
        this.moveDirection_ = DOWN_DIRECTION;
        
    }
    
    loadTemplate(template)
    {
        super.loadTemplate(template);
        
        this.type_  = template.type;
        this.maxHp_ = template.hp;
        this.hp_ = this.maxHp_;
    }
    
    die()
    {
        this.hp_ = 0;
        this.remove();
    }
    
    /**
     * 이 유닛에게 dmg만큼의 피해를 입힌다.
     */ 
    takeDamage(dmg)
    {
        this.hp_ = this.hp_ - dmg;
        if (this.hp_ < 0)
            this.hp_ = 0;
            
        if (this.hp_ <= 0)
            this.die();
    }
    
    isDead()
    {
        return this.hp_ === 0;
    }
    
    /**
     * 자신의 공격력을 계산하여 돌려준다.
     * @abstract
     */
    getDamage()
    {
        throw new Error('not implemented');
    }
    
    /**
     * target에게 자신의 공격력만큼의 피해를 입힌다.
     */
    attackMelee(target)
    {
        target.takeDamage(this.getDamage());
    }
    
    attackXY(x, y)
    {
        var pObject = this.map_.getObject(x, y);
        if(pObject == null)
            return false;
        else
        {
            pObject.takeDamage(this.getDamage());
            return false;
        }
    }
    
    /**
     * 이 유닛의 현재 위치에서 (targetX, targetY)까지 걸어갈 수 있는 경로를
     * 계산하여 배열로 돌려준다. 경로의 좌표는 arr[i].x, arr[i].y로 조회할 수 있다.
     * 경로 탐색에 실패하면 빈 배열을 돌려준다.
     */
    computePathTo(targetX, targetY)
    {
        var unit = this;
        
        var pathFinder = new ROT.Path.Dijkstra(targetX, targetY, function isPassable(x, y) {
            return unit.map_.isMoveable(x, y);
        });
        
        var path = [];
        pathFinder.compute(this.x_, this.y_, function addNextPath(x, y) {
           path.push({ x: x, y: y });
        });
        
        return path;
    }
    
    /**
     * (x, y)로 걸어간다. 만약 잘못된 좌표이거나 걸어갈 수 없는 지형이면 실패한다.
     * 참고로 자기 자신의 위치로 걸어가려고 하면 이미 자신이 차지하고 있는 타일이므로
     * 걸어갈 수 없다.
     */
    walkTo(x, y)
    {
        if (this.map_.isMoveable(x, y))
        {
            this.setPos(x, y);
            return true;
        }
        else
            return false;
    }
};
