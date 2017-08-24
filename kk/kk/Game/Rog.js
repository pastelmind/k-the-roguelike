/**
 * @author 김선휘  
 * 게임 로직이 작성되는 클래스 - Game을 상속받는다.
 */ 
 
 // ROG는 클라이언트이고, 나머지는 클래스는 클라이언트가 사용하는 라이브러리이다.
 // 클라이언트의 전역변수를 생각하기.
 // 현재는 CONST에 전역변수들을 상수처럼 선언해서 사용하고 있는데, 이렇게 상수를 이용하여 게임 내부 여러 곳에서 매개변수 필요 없이 값을 이용할 수 있다.
 // 여러 클래스에서 상수를 사용하는데 어느 곳에서는 생성자에서 파라미터로 상수를 받아서 사용하고 있고
 // 아니면 클래스 내부에서 직접 상수를 사용하고 있다. 통일이 필요해 보인다.
 // 1. 상수를 전부 파라미터로 전달하기 
 // 2. 상수를 전부 클래스 내부에서 사용하기
 // 3. 하나의 구조체를 생성한 후 구조체를 클래스에 전달하기.
class Rog extends Game
{
    /**
     * 게임 초기화 순서
     * 1. 카메라를 생성 후 초기화
     * 2. 그래픽에 카메라를 등록
     * 3. 맵 클래스를 생성 후 초기화
     * 4. 안개 클래스를 생성 후 맵을 매개변수로 초기화
     * 5. 오브젝트 클래스를 생성 후 초기화
     * 6. 각 오브젝트 클래스에 맵 클래스를 등록
     */
     
     /**
      * Rog클래스를 초기화한다.
      * @arg graphics   graphics 객체
      * @arg input      input 객체
      */
    constructor(graphics, input)
    {
        super(graphics, input);
        this.camera_ = new Camera(graphics, 0, 0);
        this.graphics_.setCamera(this.camera_);
        this.map_ = new Map(graphics, MAP_WIDTH, MAP_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
        this.fog_ = new Fog(this.graphics_, this.map_);
        this.player_ = new Player(this.map_, input);
        
        var rooms = this.map_.map_.getRooms();
        
        //플레이어의 위치 주변에 랜덤한 몬스터를 생성하자.
        do {
            var monX = this.player_.x_ + ROT.RNG.getUniformInt(-20, 20);
            var monY = this.player_.y_ + ROT.RNG.getUniformInt(-20, 20);
        } while (!this.map_.isMoveable(monX, monY));
        
        var monster = new Monster(this.map_, monsters.lab_rat);
        monster.setPos(monX, monY);
        console.log('%{이} %s, %s에 생성되었습니다.'.format(monster, monX, monY));
        console.log('플레이어의 위치는 ' + this.player_.x_ + ', ' + this.player_.y_ + '입니다.');
            
        
        // 오브젝트들을 갱신할 때 턴 사이의 딜레이 시간이 있기 때문에
        // 매 프레임마다 오브젝트들이 갱신되지 않음.
        
        // 턴을 적용하기 위해서 주 오브젝트(플레이어)가 갱신되지 않으면,
        // 다른 부 오브젝트(몬스터 및 아이템)들도 갱신되지 않아야한다.
        this.turnDelay_ = 100;
        this.currentDelay_ = 0;
        
        // 화면 배율을 위한 변수
        this.isScaleDown_ = 1;
    }
    
    /**
     * 매 프레임마다 게임이 업데이트 된다.
     */
    update()
    {
        // 매 프레임마다 갱신되지 않게 함. (속도를 제한함) - Sleep
        if(this.currentDelay_ > this.turnDelay_)
        {
            // z키를 누르면 화면의 배율이 1/2가 된다.
            if(this.input_.isKeyDown(ROT.VK_Z))
                this.isScaleDown_ *= -1;
            
            if(this.isScaleDown_ == 1)
                this.camera_.setScale(1.0);
            else
                this.camera_.setScale(0.5);
                
            this.player_.update();
            this.fog_.update();
            
            this.currentDelay_ = 0;
        }
        
        // frameDelay의 정확하지 않은 값을 거름.
        if(this.currentDelay_ > 99999)
            this.currentDelay_ = 0;
        else
            this.currentDelay_ += this.frameDelay_;
    }
    
    ai()
    {
    }
    
    /**
     * 매 프레임마다 오브젝트들의 물리효과들이 적용된다.
     */ 
    physics()
    {
        this.player_.physics();
        this.fog_.physics(this.player_.x_, this.player_.y_, this.player_.vision_);
    }
    
    /**
     * 게임의 각 아이템들을 그려준다. 
     */
    render()
    {
        /**
         * 그리기 순서
         * 1. 맵을 그리기
         * 2. 아이템 그리기 -> 맵 그릴때 같이 그리는 건 어떰?(by KYH)
         * 3. 안개 그리기
         * 4. 플레이어 그리기
         */
        this.camera_.update(this.player_.x_, this.player_.y_);
        this.map_.draw();
        this.fog_.draw();
        this.player_.draw(this.graphics_);
        
    }
}
