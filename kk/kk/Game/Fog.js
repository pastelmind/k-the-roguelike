/**
 * @author 김선휘
 * 맵의 안개를 담당하는 클래스
 */ 
class Fog
{
    /**
     * Fog 클래스를 초기화한다.
     * @arg graphics    graphics 객체    
     * @arg map         map 객체
     */ 
    constructor(graphics, map)
    {
        var self = this;
        
        this.graphics_ = graphics;
        this.map_ = map;
        this.fov_ = new ROT.FOV.PreciseShadowcasting(function lightPasses(x, y)
        {
            return self.map_.isLightPassable(x, y);
        });
        /*this.exploreFog_ = new Array(MAP_WIDTH);
        
        for(var i = 0; i < MAP_WIDTH; i++)
        {
            this.exploreFog_[i] = new Array(MAP_HEIGHT);
        }*/
        this.exploreFog_ = new HighDataLayer(MAP_WIDTH, MAP_HEIGHT);
    }
    
    /**
     * 매 프레임마다 fog를 업데이트 시켜준다. 
     */
    update()
    {
        /**
         * fogLayer_의 상태는 총 3가지로 구분된다.
         * 0    플레이어의 시야범위
         * 1    플레이어가 탐사한 상태
         * 2    플레이어가 탐사하지 못한 상태
         */
        for(var i = 0; i < MAP_WIDTH; i++)
        {
            for(var j = 0; j < MAP_HEIGHT; j++)
            {
                /*if(this.exploreFog_[i][j] == 1)
                    this.map_.fogLayer_[i][j] = 1;
                else
                    this.map_.fogLayer_[i][j] = 2;*/
                if(this.exploreFog_.getObject(i, j) == 1)
                    this.map_.fogLayer_.addObject(i, j, 1);
                else
                    this.map_.fogLayer_.addObject(i, j, 2);
            }
        }
    }
    
    /**
     * 프레임마다 시야범위를 계산해준다.
     * @arg x       플레이어의 x 좌표
     * @arg y       플레이어의 y 좌표
     * @arg vision  플레이어의 시야범위
     */ 
    physics(x, y, vision)
    {
        this.fov_.compute(x, y, vision, this.updateFog.bind(this));
    }
    
    /**
     * 매 프레임마다 안개를 그려준다.
     */ 
    draw()
    {
        for(var i = 0; i < MAP_WIDTH; i++)
        {
            for(var j = 0; j < MAP_HEIGHT; j++)
            {
                /*if(this.map_.fogLayer_[i][j] == 1)
                    this.graphics_.fillRect(i, j, "rgba(0, 0, 0, 0.7)");
                if(this.map_.fogLayer_[i][j] == 2)
                    this.graphics_.fillRect(i, j, "rgb(0, 0, 0)");*/
                if(this.map_.fogLayer_.getObject(i, j) == 1)
                    this.graphics_.fillRect(i, j, "rgba(0, 0, 0, 0.7)");
                if(this.map_.fogLayer_.getObject(i, j) == 2)
                    this.graphics_.fillRect(i, j, "rgb(0, 0, 0)");
            }
        }
        
    }
    
    /**
     * ROT.FOV에서 이용하는 콜백함수 시야범위에 존재할 때 행동을 작성한다.
     * @arg x           시야범위의 x 좌표
     * @arg y           시야범위의 y 좌표
     * @arg r           시야범위
     * @arg visivility  시야범위의 반지름 값
     */ 
    updateFog(x, y, r, visibility)
    {
        if(!(x > MAP_WIDTH - 1 || x < 0 || y > MAP_HEIGHT - 1 || y < 0))
        {
            /*this.map_.fogLayer_[x][y] = 0;
            this.exploreFog_[x][y] = 1;*/
            this.map_.fogLayer_.addObject(x, y, 0);
            this.exploreFog_.addObject(x, y, 1);
        }
    }
}