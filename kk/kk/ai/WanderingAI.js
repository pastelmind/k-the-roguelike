'use strict';
/* global AI */

/**
 * @author 강예형
 */
class WanderingAI extends AI
{
    run(unit)
    {
        var targetCoordinates = [];
        
        for (var a = -1; a < 1; ++a)
            for (var b = -1; b < 1; ++b)
                if (a != 0 || b != 0)
                    targetCoordinates.push({ x: unit.x_ + a, y: unit.y_ + b });
        
        targetCoordinates = targetCoordinates.filter(function (coords) {
           return unit.map_.isMoveable(coords.x, coords.y);
        });
        
        //유닛이 맵 상에서 이동할 수 있는 위치가 없음
        if (targetCoordinates.length === 0)
            return AI.RESULT_CONTINUE;
        
        var target = targetCoordinates.random();
        
        unit.walkTo(target.x, target.y);
        return AI.RESULT_BLOCK;
    }
}
