/**
 * @author 강예형
 * AI를 위한 기본 인터페이스 (AIList 참고)
 * @interface
 */

class AI
{
    /**
     * @abstract
     * @return  AI.RESULT_CONTINUE이면 다음 AI를 계속 진행하고,
     *          AI.RESULT_BLOCK이면 AI 처리를 여기서 끝냄
     */
    run(unit)
    {
        throw new Error('not implemented');
    }
}

//AI.run()에서 리턴할 수 있는 값
AI.RESULT_BLOCK     = 1;
AI.RESULT_CONTINUE  = 0;
