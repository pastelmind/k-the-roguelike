/**
 * @author 강예형
 * AI를 순차적으로 실행하기 위한 액션 리스트 구조의 클래스.
 */

/* global AI */

class AIList
{
    /**
     * 생성자에 인자로 AI 객체를 넘기면 그 순서대로 AI 목록에 추가된다.
     */
    constructor()
    {
        this.list_ = Array.prototype.concat.apply([], arguments);
    }
    
    /**
     * unit이 리스트에 있는 각 AI를 순차적으로 수행하게 한다.
     * @return  마지막으로 수행한 AI의 객체 (없으면 null)
     */
    run(unit)
    {
        for (var i = 0; i < this.list_.length; ++i)
        {
            if (this.list_[i].run(unit) !== AI.RESULT_CONTINUE)
                break;
        }
        
        return this.list_[i] || null;
    }
}
