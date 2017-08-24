/**
 * @authro 김선휘
 * 게임 맵을 담당하는 클래스
 */ 
class Map
{
    /**
     * Map 클래스를 초기화한다.
     * @arg graphics        graphics 객체
     * @arg mapWidth        map의 넓이
     * @arg mapHeight       map의 높이
     * @arg tileWidth       게임 타일의 넓이
     * @arg tileHeight      게임 타일의 높이
     */ 
    constructor(graphics, mapWidth, mapHeight, tileWidth, tileHeight)
    {
        this.graphics_ = graphics;
        this.mapWidth_ = mapWidth;
        this.mapHeight_ = mapHeight;
        this.tileWidth_ = tileWidth;
        this.tileHeight_ = tileHeight;
        this.map_ = null;
      
        // 맵 셋팅 옵션
        this.mapOptions_ = 
        {
            roomWidth: [5, 9], // 방의 최소, 최대 폭
            roomHeight: [5, 10], // 방의 최소, 최대 높이
            corridorLength: [3, 10], // 복도의 최소, 최대 길이
            dugPercentage: 0.2, // 방의 %만큼 파지면 알고리즘 종료
            timeLimit: 1000 // ms가 지나면 알고리즘 종료
        }
        
        this.mapLayer_ = new HighDataLayer(this.mapWidth_, this.mapHeight_);
        this.fogLayer_ = new HighDataLayer(this.mapWidth_, this.mapHeight_);
        this.objectLayer_ = new LowDataLayer(this.mapWidth_, this.mapHeight_, 100, null);
        this.itemLayer_ = new HighDataLayer(this.mapWidth_, this.mapHeight_);
        
        var tempItemLayer = this.itemLayer_.getDataLayer();
        
        for(var i = 0; i < this.mapWidth_; i++)
        {
            for(var j = 0; j < this.mapHeight_; j++)
            {
                tempItemLayer[i][j] = new Array; 
            }
        }
        
        this.mapGenerate();
    }
    
    /**
     * 랜던 맵을 생성 및 맵의 기본 오브젝트들을 배치한다. 
     */
    mapGenerate()
    {
        var self = this;
        
        // 랜덤맵을 생성한다.
        this.map_ = new ROT.Map.Digger(MAP_WIDTH, MAP_HEIGHT, this.mapOptions_);
        
        //맵 지형을 생성하고, 지나다닐 수 있는 곳을 확인한다.
        this.map_.create(function fillMapData(x, y, data)
        {
            //참고사항 : 방과 복도는 data === 0, 벽은 data === 1
            if (data === 0)
            {
                self.mapLayer_.addObject(x, y, Map.TILE_FLOOR);
            }
            else if (data === 1)
            {
                self.mapLayer_.addObject(x, y, Map.TILE_WALL);
            }
        });
        
        var rooms = this.map_.getRooms();
        
        for (var i = 0, end = rooms.length; i < end; i++)
        {
            rooms[i].getDoors(function fillDoorData(x, y)
            {
                self.mapLayer_.addObject(x, y, Map.TILE_DOOR);
            });
        }
        
        // 맵에다가 안개를 뿌려준다.
        for (var i = 0; i < MAP_WIDTH; i++)
        {
            for(var j = 0; j < MAP_HEIGHT; j++)
            {
                this.fogLayer_.addObject(i, j, 1);
            }
        }
        
        //맵에다 아이템을 뿌리자
        for (var i = 0; i < rooms.length; ++i)
        {
            var room = rooms[i];
            
            if (Math.random() < 0.5) //확률 = 50%
            {
                for (var n = 3; n >= 0; --n)
                {
                    var x = room.getLeft() + Math.floor(Math.random() * (room.getRight() - room.getLeft() + 1));
                    var y = room.getTop()  + Math.floor(Math.random() * (room.getBottom() - room.getTop() + 1));
                    var item = new Item(this, items.all.random());
                    item.setPos(x, y);
                    console.log('%s, %s에 %{을} 뿌림'.format(x, y, item));
                }
            }
        }
    }
    
    /**
     * 맵 상의 모든 유닛(플레이어 제외)과 아이템의 턴을 업데이트한다.
     */
    update()
    {
        /*for (var x = 0; x < this.mapWidth_; ++x)
        {
            for (var y = 0; y < this.mapHeight_; ++y)
            {
                this.itemLayer_[x][y].forEach(function (item)
                {
                    item.update();
                });
                
                var unit = this.objectLayer_[x][y];
                if (unit && !(unit instanceof Player)) //현재 플레이어는 별도로 Player.update()를 실행하므로 제외한다.
                    unit.update();
            }
        }*/
    }
    
    /**
     * 맵을 그려준다.
     */ 
    draw()
    {
        for (var i = 0; i < this.mapWidth_; i++)
        {
            for (var j = 0; j < this.mapHeight_; j++)
            {
                var tileType = this.mapLayer_.getObject(i, j);
                switch(tileType)
                {
                    case Map.TILE_FLOOR:
                        this.graphics_.drawRect(i, j);
                        break;
                    case Map.TILE_WALL:
                        this.graphics_.fillRect(i, j, "rgb(200, 200, 200)");
                        break;
                    case Map.TILE_DOOR:
                        this.graphics_.fillRect(i, j, "rgb(255, 0, 0)");
                        break;
                    default:
                        throw new Error(tileType + '은 잘못된 타일 유형입니다.');
                }
                
                //바닥에 떨어진 아이템을 그린다.
                var graphics = this.graphics_;
                this.getItemList(i, j).forEach(function (item) {
                    item.draw(graphics);
                });
                
                //현재 위치에 있는 유닛을 그린다.
                /*var unit = this.objectLayer_[i][j];
                if (unit)
                {
                    unit.draw(graphics);
                }*/
                
                var unit = this.objectLayer_.getObject(i, j);
                if(unit)
                {
                    unit.draw(graphics);
                }
            }
        }
    }
    
    /**
     * (x, y) 좌표가 지도의 범위 내에 속한 좌표인지 검사한다.
     */
    isValidCoords(x, y)
    {
        return 0 <= x && x < this.mapWidth_ && 0 <= y && y < this.mapHeight_;
    }
    
    /**
     * (x, y)의 타일이 걸어다닐 수 있는 타일인지 확인한다.
     * (유닛 간의 충돌처리는 감안하지 않는다.)
     */
    isWalkable(x, y)
    {
        if (!this.isValidCoords(x, y))
            return false;
        
        var tileType = this.mapLayer_.getObject(x, y);
        return tileType === Map.TILE_FLOOR || tileType === Map.TILE_DOOR;
    }
    
    /**
     * (x, y)의 타일이 걸어다닐 수 있는 타일인지 확인한다.
     * (유닛 간의 충돌을 감안한다.)
     */
    isMoveable(x, y)
    {
        return this.isWalkable(x, y) && !this.objectLayer_.haveObject(x, y);
    }
    
    /**
     * (x, y)의 타일이 시야를 통과시키는지 확인한다.(유닛에 의한 시야 차단 포함)
     */
    isLightPassable(x, y)
    {
        if (!this.isValidCoords(x, y))
            return false;
        
        //벽과 문 지형은 시야를 차단한다.
        
        //유닛은 시야를 가릴 수 있다.
            
        if(this.mapLayer_.getObject(x, y) == Map.TILE_DOOR || this.mapLayer_.getObject(x, y) == Map.TILE_WALL)
            return false;
        if(this.objectLayer_.haveObject(x, y))
            return false;
        
        return true;
    }
    
    /**
     * Map의 x, y 위치에 있는 아이템 리스트를 받을 수 있다.
     * @ret Array자료형
     */ 
    getItemList(x, y)
    {
        //return this.itemLayer_[x][y];
        return this.itemLayer_.getObject(x, y);
    }
    
    /**
     * Map의 x, y 위치에 아이템을 내려놓는다. 리스트에는 스택의 형식으로 저장된다.
     * 이미 해당 위치에 아이템이 있으면 아무 동작도 일어나지 않는다.
     */
    pushItem(x, y, item)
    {
        if(this.itemLayer_.getObject(x, y).indexOf(item) === -1)
            this.itemLayer_.getObject(x, y).push(item);
    }
    
    /**
     * Map의 x, y 위치에 있는 맨 위 아이템을 꺼낸다.
     * item을 지정할 시 item을 직접 골라서 제거할 수 있다.
     * @return 성공시 아이템에 대한 참조, 실패시 null / undefined
     */
    popItem(x, y, item)
    {
        if (item)
        {
            var index = this.itemLayer_.getObject(x, y).indexOf(item);
            if (index !== -1)
                this.itemLayer_.getObject(x, y).splice(index, 1);
            return item || null;
        }
        else
            return this.itemLayer_.getObject(x, y).pop();
    }
    
    /**
     * (x, y)에 있는 object을 돌려준다.(없으면 null)
     * x, y가 맵 밖의 좌표일 경우 null을 돌려준다.
     */
    getObject(x, y)
    {
        if (!this.isValidCoords(x, y))
            return null;
        
        return this.objectLayer_.getObject(x, y);
    }
    
    pushObject(x, y, object)
    {
        return this.objectLayer_.addObject(x, y, object);
    }
    
    /**
     * Map의 x, y 위치에 있는 유닛을 지도에서 제거한다.
     * unit을 지정할 시 unit과 일치하는 경우에만 제거한다.
     * @return 성공시 유닛에 대한 참조, 실패시 null / undefined
     */
    popObject(x, y, unit)
    {
        var tempUnit = this.objectLayer_.getObject(x, y);
        
        if (unit && unit !== tempUnit)
            return null;
        
        this.objectLayer_.removeObject(x, y);
        return tempUnit;
    }
    
    /**
     * @author 강예형
     * (x, y, w, h)로 정의한 사각형 구역 내의 모든 object를 찾아서 배열로 돌려준다.
     */
    getObjectsInRect(x, y, w, h)
    {
        var objects = [];
        
        for (var j = y; j < y + h; ++j)
        {
            for (var i = x; i < x + w; ++i)
            {
                var obj = this.getObject(i, j);
                if (obj)
                    objects.push(obj);
            }
        }
        
        return objects;
    }
}

//각 칸의 지형을 나타내는 상수값.
Map.TILE_FLOOR  = 0; //지나다닐 수 있는 바닥
Map.TILE_WALL   = 1; //지나갈 수 없는 벽이나 기둥
Map.TILE_DOOR   = 2; //방과 복도를 잇는 문(지나다닐 수 있음)

