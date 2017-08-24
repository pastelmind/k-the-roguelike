/**
 * @author 김선휘
 * 게임의 부모클래스
 */
class Game
{
    /**
     * Game 클래스를 초기화한다.
     * @arg graphics    graphics 객체
     * @arg graphics    input 객체
     */ 
    constructor(graphics, input)
    {
        this.graphics_ = graphics;
        this.input_ = input;
        
        this.fps_ = 0;
        this.frameDelay_ = 0;
        this.timeStart_ = 0;
        this.timeEnd_ = 0;
    }
    
    /**
     * 매 프레임 마다 실행이 되는 게임 루프
     */ 
    run()
    {
        this.timeStart_ = new Date;
        this.frameDelay_ = (this.timeStart_ - this.timeEnd_);
        this.timeEnd_ = this.timeStart_;
        this.fps_ = (0.99 * this.fps_) + (0.01 / this.frameDelay_) * 1000;
        
        
        this.update();
        this.ai();
        this.physics();
        this.render();
    }
    
    update()
    {}
    
    ai()
    {}
    
    physics()
    {}
    
    render()
    {}
}