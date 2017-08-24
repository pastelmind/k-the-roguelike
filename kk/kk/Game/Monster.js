/**
 * @author 강예형
 * 몬스터 클래스
 * TODO 많은 기능 추가
 */

/*
global
Unit
AIList
FindAttackTargetAI MeleeAttackAI WalkToTargetAI WanderingAI
*/

'use strict';

class Monster extends Unit
{
    constructor(map, template)
    {
        super(map);
        
        this.aiList_ = new AIList(
            new FindAttackTargetAI,
            new MeleeAttackAI,
            new WalkToTargetAI,
            new WanderingAI
        );
        
        this.loadTemplate(template);
    }
    
    loadTemplate(template)
    {
        super.loadTemplate(template);
        
        this.level_  = template.level_ || 1;
        this.damage_ = template.damage_ || 0;
        
        //this.aiList_ = new AIList();
    }
    
    getDamage()
    {
        return this.damage_;
    }
    
    ai()
    {
        var ai = this.aiList_.run(this);
        console.log(this.getName() + ' : ' + ai);
    }
    
    update()
    {
        this.ai(); //Rog에 AI를 따로 호출하는 코드가 없으니 일단 Monster.update()가 대신 호출해준다.
    }
}
