'use strict';
/* global AI */

/**
 * @author 강예형
 */
class WalkToTargetAI extends AI
{
    run(unit)
    {
        var target = unit.aiTarget_;
        if (!target)
            return AI.RESULT_CONTINUE;
        
        //대상까지의 거리가 1 이하인 경우, 이미 도착했으니 다음 AI로 넘어간다
        if (unit.getWalkingDistanceTo(target) <= 1)
            return AI.RESULT_CONTINUE;
        
        var path = unit.computePathTo(target.x_, target.y_);
        
        //경로를 계산하지 못한 경우
        if (path.length === 0)
            return AI.RESULT_CONTINUE;
        
        unit.walkTo(path[0].x, path[0].y);
        return AI.RESULT_BLOCK;
    }
}
