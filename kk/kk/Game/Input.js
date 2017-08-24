/**
 * @author 김선휘
 * Input을 처리하는 클래스
 */ 
class Input
{
    /**
     * Input 클래스를 초기화한다. 
     */
    constructor()
    {
        this.keysLength_ = 255;
        this.keysDown_ = new Array(this.keysLength_);
        
        for(var i = 0; i < this.keysLength_; i++)
            this.keysDown_[i] = false;
    }
    
    /**
     * keydown 이벤트가 발생할 때 불러지는 함수 
     * @arg e   이벤트 객체
     */
    keyDown(e)
    {
        this.keysDown_[e.keyCode || e.which] = true;
        
        //스페이스바로 인한 스크롤 막기
        if (e.which == 32)
          e.preventDefault();
    }
    
    /**
     * keyup 이벤트가 발생할 때 불러지는 함수 
     * @arg e   이벤트 객체
     */
    keyUp(e)
    {
        this.keysDown_[e.keyCode || e.which] = false;
        
        //스페이스바로 인한 스크롤 막기
        if (e.which == 32)
          e.preventDefault();
    }
    
    /**
     * 키의 눌림 여부를 판단한다.
     * @arg keycode     눌림여부를 판단할 키의 번호
     */ 
    isKeyDown(keyCode)
    {
        if(this.keysDown_[keyCode] == true)
            return true;
        return false;
    }
    
    /**
     * 키의 눌림 여부를 판단한다.
     * @arg keycode     눌림여부를 판단할 키의 번호
     */ 
    isKeyUp(keyCode)
    {
        if(this.keysDown_[keyCode] == false)
            return true;
        return false;
    }
    
    /**
     * 아무 키나 눌러져있으면 TRUE 값을 반환한다. 
     */
    anyKeyDown()
    {
        for(var i = 0; i < this.keysLength_; i++)
        {
            if(this.keysDown_[i] == true)
                return true;
        }
        
        return false;
    }
    
    /**
     * 키 배열의 있는 모든 정보를 지운다.
     */ 
    clearKeysDown()
    {
        for(var i = 0; i < this.keysLength_; i++)
            this.keysDown_[i] = false;
    }
}
