'use strict';
/* global AI */

/**
 * @author 강예형
 */
class FindAttackTargetAI extends AI
{
    run(unit)
    {
        //시야에서 벗어난 유닛은 바로 잊어버림?
        unit.aiTarget_ = null;
        
        var units = unit.map_.getObjectsInRect(unit.x_ - 10, unit.y_ - 10, 20, 20);
        
        for (var i = 0; i < units.length; ++i)
        {
            var target = units[i];
            
            if (target instanceof Player) //플레이어만을 공격 대상으로 인식한다
            {
                unit.aiTarget_ = target;
                break;
            }
        };
        
        return AI.RESULT_CONTINUE;
    }
}
