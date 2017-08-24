/**
 * @author 김선휘
 * 게임 내부 오브젝트들의 부모클래스이다.
 */ 
class Entity
{
    /**
     * Entity 객체를 초기화한다.
     * @arg mpa         map객체
     */
    constructor(map)
    {
        this.map_ = map;
        
        this.isOnMap_ = true;
        this.x_ = 0;
        this.y_ = 0;
        this.dx_ = 0;
        this.dy_ = 0;
        this.setPos(this.x_, this.y_);
    }
    
    update(frameDelay)
    {}
    
    ai(frameDelay)
    {}
    
    /**
     * 오브젝트의 충돌처리
     * @arg frameDelay      frameDelay
     */
    physics(frameDelay)
    {
        // 맵 밖으로 나가는 경우를 방지
        if(this.x_ + this.dx_ > MAP_WIDTH - 1)
            this.dx_ = 0;
            
        if(this.x_ + this.dx_ < 0)
            this.dx_ = 0;
            
        if(this.y_ + this.dy_ > MAP_HEIGHT - 1)
            this.dy_ = 0;
            
        if(this.y_ + this.dy_ < 0)
            this.dy_ = 0;
            
       /* // 오브젝트 레이어를 이용한 충돌 처리
        if(this.map_.objectLayer_[this.x_ + this.dx_][this.y_ + this.dy_] == 0)
        {
            
        }*/
        
        if (this.map_.isMoveable(this.x_ + this.dx_, this.y_ + this.dy_))
        {
            this.setPos(this.x_ + this.dx_, this.y_ + this.dy_);
        }
        
        this.dx_ = 0;
        this.dy_ = 0;
    }
    
    /**
     * @virtual
     * 오브젝트의 형태를 graphics를 이용해 그린다.
     * @arg graphics    Graphics 객체
     */
    draw(graphics)
    {
        graphics.drawSymbol(this.symbol_, this.x_, this.y_, '#0000FF');
    }
    
    /**
     * 오브젝트의 map을 등록한다. 
     * @arg map     map 객체
     */
    setMap(map)
    {
        if (this.map_)
            this.map_.popObject(this.x_, this.y_, this);
        this.map_ = map;
        this.map_.pushObject(this.x_, this.y_, this);
    }
    
    /**
     * 오브젝트의 x 좌표를 설정한다. 
     * @arg x   이동할 x의 좌표
     */
    setX(x)
    {
        this.setPos(x, this.y_);
    }
    
    /**
     * 오브젝트의 y 좌표를 설정한다.
     * @arg y   이동할 y의 좌표
     */ 
    setY(y)
    {
        this.setPos(this.x_, y);
    }
    
    /**
     * 오브젝트의 이동할 좌표를 설정한다.
     * @arg x   이동할 x의 좌표
     * @arg y   이동할 y의 좌표
     */ 
    setPos(x, y)
    {
        this.map_.popObject(this.x_, this.y_, this);
        this.x_ = x;
        this.y_ = y;
        this.map_.pushObject(this.x_, this.y_, this);
    }
    
    /**
     * @author 강예형
     * Entity의 각종 속성을 template에서 복사해서 받아온다.
     * 받아올 멤버 변수 이름은 template의 속성 이름에 _(언더바)를 붙인 것과 같다.
     */
    loadTemplate(template)
    {
        this.code_      = template.code;
        this.name_      = template.name;
        this.eul_       = template.eul;
        this.desc_      = template.desc;
        this.symbol_    = template.symbol;
    }
    
    /**
     * @author 강예형
     * 이 객체를 게임에서 제거한다.
     */
    remove()
    {
        this.removeFromMap();
    }
    
    /**
     * @author 강예형
     * 이 객체를 지도에서 제거한다. (게임 내에서는 제거되지 않음)
     */
    removeFromMap()
    {
        if (this.isOnMap_)
        {
            this.isOnMap_ = false;
            this.map_.popObject(this.x_, this.y_);
        }
    }
    
    /**
     * @author 강예형
     * 이 객체를 지도에 추가한다.
     */
    addToMap()
    {
        if (!this.isOnMap_)
        {
            this.isOnMap_ = true;
            this.setPos(this.x_, this.y_);
        }
    }
    
    /**
     * 자신의 현 위치에서 지형을 고려하지 않고 (x, y)로 이동할 시 거쳐야 할
     * 타일의 개수를 돌려준다. (사각형 타일에서 대각선 이동이 가능한 경우)
     */
    getWalkingDistanceTo(x, y)
    {
        var hDistance = Math.abs(this.x_ - x);
        var vDistance = Math.abs(this.y_ - y);
        return Math.max(hDistance, vDistance);
    }
    
    /**
     * @virtual
     * 개체의 이름을 구한다.
     */
    getName()
    {
        return this.name_;
    }
    
    /**
     * @author 강예형
     * 개체의 이름(toString() 메서드) 뒤에 을/를, 은/는, 이/가 등의 품사를 붙여줌
     */
    eulRul()
    {
        return this.getName() + (this.eul_ ? (this.eul_ === '을' ? '을' : '를') : '을(를)');
    };
    
    eunNun()
    {
        return this.getName() + (this.eul_ ? (this.eul_ === '을' ? '은' : '는') : '은(는)');
    };
    
    eeGa()
    {
        return this.getName() + (this.eul_ ? (this.eul_ === '을' ? '이' : '가') : '이(가)');
    };
}