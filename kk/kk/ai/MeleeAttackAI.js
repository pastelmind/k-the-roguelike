'use strict';
/* global AI */

/**
 * @author 강예형
 */
class MeleeAttackAI extends AI
{
    run(unit)
    {
        var target = unit.aiTarget_;
        if (!target)
            return AI.RESULT_CONTINUE;
        
        if (unit.getWalkingDistanceTo(target.x_, target.y_) > 1)
        {
            //근접 공격의 사거리 밖에 있음
            return AI.RESULT_CONTINUE;
        }
        
        unit.attackMelee(target);
        if (target.isDead())
            unit.aiTarget_ = null;

        return AI.RESULT_BLOCK;
    }
}
