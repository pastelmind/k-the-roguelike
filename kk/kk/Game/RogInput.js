// Rog에서만 사용하는 함수들이 추가되어 있는 Input 클래스
class RogInput extends Input
{
    constructor()
    {
        super();
        
        this.dx_ = 0;
        this.dy_ = 0;
        
        this.moveDirection_ = DOWN_DIRECTION;
    }
    
    // 이동키를 검사한다.
    wasdUpdate()
    {
        this.dx_ = 0;
        this.dy_ = 0;
        
       if(this.isKeyDown(ROT.VK_W))
       {
          this.dy_--;
       }
       if(this.isKeyDown(ROT.VK_A))
       {
           this.dx_--;
       }
       if(this.isKeyDown(ROT.VK_S))
       {
           this.dy_++;
       }
       if(this.isKeyDown(ROT.VK_D))
       {
           this.dx_++;
       }
       
       this.checkDirection();
    }
    
    getDirection()
    {
        return this.moveDirection_;
    }
    
    getDiffX()
    {
        return this.dx_;
    }
    
    getDiffY()
    {
        return this.dy_;
    }
    
    // 이동방향을 검사한다.
    checkDirection()
    {
        if(this.dx_ == 0 && this.dy_ == -1)
            this.moveDirection_ = UP_DIRECTION;
        if(this.dx_ == -1 && this.dy_ == 0)
            this.moveDirection_ = LEFT_DIRECTION;
        if(this.dx_ == 0 && this.dy_ == 1)
            this.moveDirection_ = DOWN_DIRECTION;
        if(this.dx_ == 1 && this.dy_ == 0)
            this.moveDirection_ = RIGHT_DIRECTION;
        if(this.dx_ == 1 && this.dy_ == -1)
            this.moveDirection_ = UP_RIGHT_DIRECTION;
        if(this.dx_ == -1 && this.dy_ == -1)
            this.moveDirection_ = UP_LEFT_DIRECTION;
        if(this.dx_ == 1 && this.dy_ == 1)
            this.moveDirection_ = DOWN_RIGHT_DIRECTION;
        if(this.dx_ == -1 && this.dy_ == 1)
            this.moveDirection_ = DOWN_LEFT_DIRECTION;
    }
}