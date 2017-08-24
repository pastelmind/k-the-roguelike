/**
 * @author 강예형
 */

/* global $ */
'use strict';

/**
 * 인자로 주어진 요소 중 이 배열에 포함된 것이 있으면 모두 삭제한다.
 * (기존의 배열을 수정함)
 */
Array.prototype.remove = function () {
  var matchIndex = -1;
  for (var i = 0; i < arguments.length; ++i)
    while ((matchIndex = this.indexOf(arguments[i])) !== -1)
      this.splice(matchIndex, 1);
};

/**
 * rot.js의 String.format을 확장하여 을/를, 이/가, 은/는 등의 한국어 조사를
 * 자동으로 처리한다.
 * 
 * 사용법:
 *    (kimchi.toString() === '김치', kimchi.eul === '를'일 때)
 *    '%{을}'.format(kimchi);   //=> '김치를'
 *    '%{를}'.format(kimchi);   //=> '김치를'
 *    '%{이}'.format(kimchi);   //=> '김치가'
 * 
 *    (terran.toString() === '테란', terran.eul === '을'일 때)
 *    '%{을}'.format(terran);   //=> '테란을'
 *    '%{를}'.format(terran);   //=> '테란을'
 *    '%{이}'.format(terran);   //=> '테란이'
 */

String.format.map = $.extend(String.format.map || {}, {
  '을': 'eulRul',
  '를': 'eulRul',
  '은': 'eunNun',
  '는': 'eunNun',
  '이': 'eeGa',
  '가': 'eeGa'
});
var GAME_WIDTH = 640;
var GAME_HEIGHT = 480;

var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;

var MAP_WIDTH = 90;
var MAP_HEIGHT = 60;

var UP_DIRECTION = 0;
var DOWN_DIRECTION = 1;
var LEFT_DIRECTION = 2;
var RIGHT_DIRECTION = 3;
var UP_LEFT_DIRECTION = 4;
var UP_RIGHT_DIRECTION = 5;
var DOWN_LEFT_DIRECTION = 6;
var DOWN_RIGHT_DIRECTION = 7;

var getRandom = function(low, high)
{
    return (Math.random() * (high - low)) + low;
}/**
 * @author 김선휘
 * 프레임 워크 내 캔버스의 컨트롤을 담당하는 클래스이다.
 */
class Graphics
{
    /**
     * 그래픽 클래스를 초기화한다.
     * @arg canvasWidth     캔버스의 폭
     * @arg canvasHeight    캔버스의 높이
     */
    constructor(canvasWidth, canvasHeight)
    {
        this.canvas_ = null;
        this.ctx_ = null;
        this.canvasWidth_ = canvasWidth;
        this.canvasHeight_ = canvasHeight;
        
        this.canvas_ = document.getElementById("gamecanvas");
        this.ctx_ = this.canvas_.getContext('2d');
        
        this.camera_ = null;
    }
    
    /**
     * 화면 버퍼의 원하는 색상을 칠한다.
     * @arg red     red 색상 값
     * @arg green   green 색상 값
     * @arg blue    blue 색상 값
     */
    fillDisplayBuffer(red, green, blue)
    {
        this.ctx_.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
        this.ctx_.fillRect(0, 0, this.canvasWidth_, this.canvasHeight_);
    }
    
    /**
     * 매 프레임마다 화면 버퍼를 흰색으로 지워준다. 
     */
    clearDisplayBuffer()
    {
        this.fillDisplayBuffer(255, 255, 255);
    }
    
    /**
     * 화면의 사각형 테두리를 그려준다. 
     * @arg x       사각형의 왼쪽 위 x좌표
     * @arg y       사각형의 왼쪽 위 y좌표
     * @arg width   사각형의 폭
     * @arg height  사각형의 높이
     */
    drawRect(x, y, width, height)
    {
        this.ctx_.strokeRect(
            this.camera_.getScale() * (x - this.camera_.x_),
            this.camera_.getScale() * (y - this.camera_.y_),
            this.camera_.getScale() * width,
            this.camera_.getScale() * height
        );
    }
    
    /**
     * 화면의 색상이 있는 사각형을 그려준다.
     * @arg x       사각형의 왼쪽 위 x좌표
     * @arg y       사각형의 왼쪽 위 y좌표
     * @arg width   사각형의 폭
     * @arg height  사각형의 높이
     * @arg color   색상 값 ex> "rgb(255, 255, 255, 0.5)"
     */ 
    fillRect(x, y, width, height, color)
    {
        this.ctx_.fillStyle = color;
        this.ctx_.fillRect(
            this.camera_.getScale() * (x - this.camera_.x_),
            this.camera_.getScale() * (y - this.camera_.y_),
            this.camera_.getScale() * width,
            this.camera_.getScale() * height
        );
    }
    
    /**
     * 화면에 글자 한 개를 그린다.(x, y를 기준으로 가운데 정렬)
     */
    drawSymbol(char, x, y, color)
    {
        this.ctx_.fillStyle = color;
        this.ctx_.font = (this.camera_.getScale() * TILE_WIDTH) + 'px sans-serif';
        this.ctx_.textAlign = 'center';
        this.ctx_.textBaseline = 'middle';
        this.ctx_.fillText(
            char,
            this.camera_.getScale() * (x - this.camera_.x_),
            this.camera_.getScale() * (y - this.camera_.y_)
        );
    }
    
    /**
     * 화면에 이미지를 그린다.
     */
    drawImage(image, x, y, width, height)
    {
        if (typeof image === 'string')
        {
            var imgElement = new Image();
            // var graphics = this;
            // imgElement.onload = function () {
            //     graphics.drawImage(this, x, y, width, height);
            // }
            imgElement.src = image;
            image = imgElement;
        }
        this.ctx_.drawImage(
            image,
            this.camera_.getScale() * (x - this.camera_.x_),
            this.camera_.getScale() * (y - this.camera_.y_),
            this.camera_.getScale() * width,
            this.camera_.getScale() * height
        );
    }
    
    /**
     * 카메라를 설정한다.
     * @arg camera  camera객체
     */
    setCamera(camera)
    {
        this.camera_ = camera;
    }
}// Rog에서만 사용하는 함수들이 추가되어 있는 Graphics 클래스
class RogGraphics extends Graphics
{
    constructor(canvasWidth, canvasHeight, tileWidth, tileHeight)
    {
        super(canvasWidth, canvasHeight);
        this.tileWidth_ = tileWidth;
        this.tileHeight_ = tileHeight;
        
        this.rectColor_ = "rgba(255, 0, 0, 0.5)";
        this.rectSize_ = 10;
    }
    
    drawRect(x, y, tileWidth, tileHeight)
    {
        var a = arguments;
        
        if (a.length == 2)
            super.drawRect(a[0] * this.tileWidth_, a[1] * this.tileHeight_, this.tileWidth_, this.tileHeight_);
        else
            super.drawRect(a[0], a[1], a[2], a[3]);
    }
    
    fillRect(x, y, tileWidth, tileHeight, color)
    {
        var a = arguments;
        
        if (a.length == 3)
        {
            color = arguments[2];
            super.fillRect(
                x * this.tileWidth_,
                y * this.tileHeight_,
                this.tileWidth_,
                this.tileHeight_,
                color
            );
        }
        else
            super.fillRect(x, y, tileWidth, tileHeight, color);
    }
    
    drawSymbol(symbol, x, y, color)
    {
        super.drawSymbol(
            symbol,
            this.tileWidth_  * x + Math.floor(this.tileWidth_  / 2),
            this.tileHeight_ * y + Math.floor(this.tileHeight_ / 2),
            color
        );
    }
    
    drawImage(image, x, y, width, height)
    {
        super.drawImage(
            image,
            x * this.tileWidth_,
            y * this.tileHeight_,
            width  || this.tileWidth_,
            height || this.tileHeight_
        );
    }
    

    getXMiddleValue(x, value)
    {
        return (x * this.tileWidth_ + this.tileWidth_ / 2) - (value / 2);
    }
    
    getYMiddelValue(y, value)
    {
        return (y * this.tileHeight_ + this.tileHeight_ / 2) - (value / 2);
    }
    
    getXRightValue(x, value)
    {
        return (x * this.tileWidth_ + this.tileWidth_ - value);
    }
    
    getYBottomValue(y, value)
    {
        return (y * this.tileHeight_ + this.tileHeight_ - value);
    }
    
    // 이동 방향에 따른 이미지를 그려준다.
    drawMoveDirection(x, y, moveD)
    {
        switch(moveD)
        {
            case UP_DIRECTION:
                super.fillRect(this.getXMiddleValue(x, this.rectSize_), y * this.tileHeight_, this.rectSize_, this.rectSize_, this.rectColor_);
                break;
            case DOWN_DIRECTION:
                super.fillRect(this.getXMiddleValue(x, this.rectSize_), this.getYBottomValue(y, this.rectSize_), this.rectSize_, this.rectSize_, this.rectColor_);
                break;
            case LEFT_DIRECTION:
                super.fillRect(x * this.tileWidth_, this.getYMiddelValue(y, this.rectSize_), this.rectSize_, this.rectSize_, this.rectColor_);
                break;
            case RIGHT_DIRECTION:
                super.fillRect(this.getXRightValue(x, this.rectSize_), this.getYMiddelValue(y, this.rectSize_), this.rectSize_, this.rectSize_, this.rectColor_);
                break;
            case UP_RIGHT_DIRECTION:
                super.fillRect(this.getXRightValue(x, this.rectSize_), y * this.tileHeight_, this.rectSize_, this.rectSize_, this.rectColor_);
                break;
            case UP_LEFT_DIRECTION:
                super.fillRect(x * this.tileWidth_, y * this.tileHeight_, this.rectSize_, this.rectSize_, this.rectColor_);
                break;
            case DOWN_RIGHT_DIRECTION:
                super.fillRect(this.getXRightValue(x, this.rectSize_), this.getYBottomValue(y, this.rectSize_), this.rectSize_, this.rectSize_, this.rectColor_);
                break;
            case DOWN_LEFT_DIRECTION:
                super.fillRect(x * this.tileWidth_, this.getYBottomValue(y, this.rectSize_), this.rectSize_, this.rectSize_, this.rectColor_);
        }
    }
}/**
 * @author 김선휘 
 * 게임에서의 화면 움직임을 담당하는 클래스
 */
class Camera
{
    /**
     * camera클래스를 초기화한다.
     * @arg graphics     graphics 객체
     * @arg focusX      카메라의 중심의 x좌표
     * @arg focusY      카메라의 중심의 y좌표
     */
    constructor(graphics, focusX, focusY)
    {
        this.cameraWidth_ = graphics.canvasWidth_;
        this.cameraHeight_ = graphics.canvasHeight_;
        this.scale_ = 1.0;
        this.focusX_ = focusX * (1 / this.scale);
        this.focusY_ = focusY * (1 / this.scale);
        this.x_ = this.focusX_ - (this.cameraWidth_ * 0.5);
        this.y_ = this.focusY_ - (this.cameraHeight_ * 0.5);
        
    }
    
    /**
     * 카메라를 매 프레임마다 업데이트 시켜준다. 
     * @arg focusX      카메라의 중심의 x좌표
     * @arg focusY      카메라의 중심의 y좌표
     */
    update(focusX, focusY)
    {
        this.focusX_ = focusX * TILE_WIDTH;
        this.focusY_ = focusY * TILE_HEIGHT;
        this.x_ = this.focusX_ - (this.cameraWidth_ * 0.5) * (1 / this.scale_);
        this.y_ = this.focusY_ - (this.cameraHeight_ * 0.5) * (1 / this.scale_);
    }
    
    setScale(scale)
    {
        this.scale_ = scale;
    }
    
    getScale(scale)
    {
        return this.scale_;
    }
}
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
}/**
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
}/**
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
        } while (this.map_.isMoveable(monX, monY));
        
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
class LowDataLayer
{
    constructor(mapWidth, mapHeight, maxData, nullObj)
    {
        this.mapWidth_ = mapWidth;
        this.mapHeight_ = mapHeight;
        this.maxData_ = maxData;
        this.nullObject_ = nullObj;
        this.dataIndex_ = 0;
        
        this.dataLayer_ = new Array(this.mapWidth_);
        
        for(var i = 0; i < this.mapWidth_; i++)
        {
            this.dataLayer_[i] = new Array(this.mapHeight_);
        }
        
        for(var i = 0; i < this.mapWidth_; i++)
        {
            for(var j = 0; j < this.mapHeight_; j++)
            {
                this.dataLayer_[i][j] = -1;
            }
        }
        
        this.dataArray_ = new Array(maxData);
        
        for(var i = 0; i < this.maxData_; i++)
        {
            this.dataArray_[i] = null;
        }
    }
    
    haveObject(x, y)
    {
        if(this.dataLayer_[x][y] == -1)
            return false;
        return true;
    }
    
    getObject(x, y)
    {
        if(this.haveObject(x, y))
        {
            return this.dataArray_[this.dataLayer_[x][y]];
        }
        return this.nullObject_;
    }
    
    addObject(x, y, obj)
    {
        if(this.haveObject(x, y))
        {
            this.removeObject(x, y);
        }
       
        this.dataLayer_[x][y] = this.dataIndex_;
        this.dataArray_[this.dataIndex_++] = obj;
            
        return true;
        
    }
    
    removeObject(x, y)
    {
        if(!this.haveObject(x, y))
        {
            return false;
        }
        else
        {
            var tempIndex = this.dataLayer_[x][y];
            this.dataArray_[tempIndex].remove();
            this.dataLayer_[x][y] = -1;
            this.dataIndex_--;
        }
    }
    
    setNullObject(nullObj)
    {
        this.nullObject_ = nullObj;
    }
    
    setMaxData(max)
    {
        this.maxData_ = max;
        var tempDataArray = new Array(this.maxData_);
        
        for(var i = 0; i < this.dataArray_.length; i++)
        {
            tempDataArray[i] = this.dataArray_[i];
        }
        
        this.dataArray_ = tempDataArray;
    }
    
    getDataArray()
    {
        return this.dataArray_;
    }
    
    getDataLayer()
    {
        return this.dataLayer_;
    }
    
    draw(graphics)
    {
        for(var i = 0; i < this.dataArray_.length; i++)
        {
            this.dataArray_[i].draw(graphics);
        }
    }
}

class HighDataLayer
{
    constructor(mapWidth, mapHeight)
    {
        this.mapWidth_ = mapWidth;
        this.mapHeight_ = mapHeight;
        
        this.dataLayer_ = new Array(this.mapWidth_);
        
        for(var i = 0; i < this.mapWidth_; i++)
        {
            this.dataLayer_[i] = new Array(this.mapHeight_);
        }
        
        for(var i = 0; i < this.mapWidth_; i++)
        {
            for(var j = 0; j < this.mapHeight_; j++)
            {
                this.dataLayer_[i][j] = -1;
            }
        }
    }
    
    haveObject(x, y)
    {
        if(this.dataLayer_[x][y] == -1)
            return false;
        return true;
    }
    getObject(x, y)
    {
        return this.dataLayer_[x][y];
    }
    
    addObject(x, y, object)
    {
        /*if(this.haveObject(x, y))
        {
           this.removeObject(x, y);
        }*/
        
        this.dataLayer_[x][y] = object;
            
        return true;
    }
    
    removeObject(x, y)
    {
        if(this.haveObject(x, y))
        {
            this.dataLayer_[x][y] = -1;
            return true;
        }
        return false;
    }
    
    getDataLayer()
    {
        return this.dataLayer_;
    }
    
    draw()
    {
        for(var i = 0; i < this.mapWidth_; i++)
        {
            for(var j = 0; j < this.mapHeight_; j++)
            {
                this.dataLayer_[i][j].draw();
            }
        }
    }
}/**
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
}/**
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
}/**
 * @author 강예형
 * 체력이 존재하고, 공격하거나 공격받을 수 있으며,
 * 상태 이상 효과를 가질 수 있고, 피해를 받아 죽을 수 있다.
 */

/* global Entity, ROT */
'use strict';

class Unit extends Entity
{
    constructor(map)
    {
        super(map);
        this.moveDirection_ = DOWN_DIRECTION;
        
    }
    
    loadTemplate(template)
    {
        super.loadTemplate(template);
        
        this.type_  = template.type;
        this.maxHp_ = template.hp;
        this.hp_ = this.maxHp_;
    }
    
    die()
    {
        this.hp_ = 0;
        this.remove();
    }
    
    /**
     * 이 유닛에게 dmg만큼의 피해를 입힌다.
     */ 
    takeDamage(dmg)
    {
        this.hp_ = this.hp_ - dmg;
        if (this.hp_ < 0)
            this.hp_ = 0;
            
        if (this.hp_ <= 0)
            this.die();
    }
    
    isDead()
    {
        return this.hp_ === 0;
    }
    
    /**
     * 자신의 공격력을 계산하여 돌려준다.
     * @abstract
     */
    getDamage()
    {
        throw new Error('not implemented');
    }
    
    /**
     * target에게 자신의 공격력만큼의 피해를 입힌다.
     */
    attackMelee(target)
    {
        target.takeDamage(this.getDamage());
    }
    
    attackXY(x, y)
    {
        var pObject = this.map_.getObject(x, y);
        if(pObject == null)
            return false;
        else
        {
            pObject.takeDamage(this.getDamage());
            return false;
        }
    }
    
    /**
     * 이 유닛의 현재 위치에서 (targetX, targetY)까지 걸어갈 수 있는 경로를
     * 계산하여 배열로 돌려준다. 경로의 좌표는 arr[i].x, arr[i].y로 조회할 수 있다.
     * 경로 탐색에 실패하면 빈 배열을 돌려준다.
     */
    computePathTo(targetX, targetY)
    {
        var unit = this;
        
        var pathFinder = new ROT.Path.Dijkstra(targetX, targetY, function isPassable(x, y) {
            return unit.map_.isMoveable(x, y);
        });
        
        var path = [];
        pathFinder.compute(this.x_, this.y_, function addNextPath(x, y) {
           path.push({ x: x, y: y });
        });
        
        return path;
    }
    
    /**
     * (x, y)로 걸어간다. 만약 잘못된 좌표이거나 걸어갈 수 없는 지형이면 실패한다.
     * 참고로 자기 자신의 위치로 걸어가려고 하면 이미 자신이 차지하고 있는 타일이므로
     * 걸어갈 수 없다.
     */
    walkTo(x, y)
    {
        if (this.map_.isMoveable(x, y))
        {
            this.setPos(x, y);
            return true;
        }
        else
            return false;
    }
};
/**
 * @author 김선휘
 * 플레이어를 담당하는 클래스 Entity를 상속받는다.
 */

'use strict';
/* global ROT, Unit, Inventory, EquipmentSlots, Item, ui */

class Player extends Unit
{
    /**
     * Player클래스를 초기화한다.
     * @arg map         map 객체 플레이어의 위치 초기화등 맵과의 상호작용 시 사용됨
     * @arg input       input 객체
     */ 
    constructor(map, input)
    {
        super(map);
        this.input_ = input;
        
        var rooms = this.map_.map_.getRooms();
        var x = Math.floor(( rooms[0].getLeft() + rooms[0].getRight() ) / 2);
        var y = Math.floor(( rooms[0].getTop() + rooms[0].getBottom() ) / 2);
        this.setPos(x, y);
        this.vision_ = 4;
        
        //인벤토리 내에 소지한 아이템의 배열
        this.inventory_ = new Inventory(12);
        this.equipment_ = new EquipmentSlots();
        
        this.hp_ = 20; this.maxHp_ = 20;
        this.fullness_ = 100; this.maxFullness_ = 300;
        
        //플레이어 상태창 UI 및 인벤토리 UI를 동기화
        ui.charstats.init(this);
        ui.inventory.init(this.inventory_.items_, this.inventory_.size_, this.equipment_);
        
        this.symbol_ = '@';
    }
    
    /**
     * 아이템을 주워 인벤토리에 넣는다. 실패하면 아이템을 땅에 내려놓는다.
     * @return 성공하면 item 객체를 돌려주고, 실패시 false를 돌려준다.
     */
    pickUp(item)
    {
        if (!this.inventory_.add(item))
        {
            //맵에 아이템을 내려놓는다.
            item.owner_ = null;
            item.setPos(this.x_, this.y_);
            return false;
        }
        
        item.owner_ = this; //아이템의 소유권을 지정한다.
        item.removeFromMap();
        ui.inventory.update();
        return item;
    }
    
    /**
    * 인벤토리에 있는 아이템을 땅에 내려놓는다.
    * 착용한 아이템에 사용하면 벗어서 내려놓는다.
    * @return 성공하면 item 객체를 돌려주고, 실패시 false를 돌려준다.
    */
    drop(item)
    {
        //착용한 아이템일 경우 벗는다
        if (this.equipment_.isEquipped(item))
        {
            if (!this.equipment_.unequip(item))
                return false;
        }
        else if (!this.inventory_.remove(item))
        {
            return false;
        }
        
        item.owner_ = null; //아이템의 소유권을 없앤다.
        
        // 맵에 아이템을 내려놓는다.
        item.setPos(this.x_, this.y_);
        
        ui.gamelog.printf('%{을} 땅에 내려놓았습니다.', item);
        
        ui.inventory.update();
        return item;
    }
    
    /**
     * 아이템(item)을 착용한다. 이미 착용한 아이템이 있으면 벗어서 인벤토리에 넣는다.
     * 만약 착용 불가능하면 false를 돌려준다.
     */
    equip(item)
    {
        var slot = item.getEquipmentSlot();
        if (!slot)
        {
            ui.gamelog.printf('[[error]]%{은} 착용할 수 없는 아이템입니다.', item);
            return false;
        }
        
        //기존에 착용한 장비가 있으면 벗어둔다
        var previouslyEquippedItem = this.equipment_.getItemIn(slot);
        if (previouslyEquippedItem)
            this.equipment_.unequip(previouslyEquippedItem);
        
        //착용할 아이템을 인벤토리에서 꺼낸다
        if (this.inventory_.indexOf(item) !== -1)
            this.inventory_.remove(item);
        
        this.equipment_.equip(item);
        item.owner_ = this;
        
        if (previouslyEquippedItem)
            this.pickUp(previouslyEquippedItem);
        
        ui.inventory.update();
        return item;
    }
    
    /**
     * 아이템(item)을 벗어서 인벤토리에 넣는다. 성공하면 item 객체를, 실패하면 false를 돌려준다.
     */
    unequip(item)
    {
        if (!this.equipment_.unequip(item))
            return false;
        
        return this.pickUp(item);
    }
    
    /**
     * 아이템(item)을 먹는다. 성공하면 true, 실패하면 false를 돌려준다.
     */
    eat(item)
    {
        console.assert(item.type_ === 'food', '%{은} 음식이 아니므로 먹을 수 없음'.format(item));
        
        //인벤토리에 들어있는 아이템이면 인벤토리에서 꺼낸다
        if (this.inventory_.indexOf(item) !== -1)
        {
            if (!this.inventory_.remove(item))
                return false;
            ui.inventory.update();
        }
        
        var prevFullness = this.fullness_;
        this.fullness_ = Math.min(this.fullness_ + item.fullness_, this.maxFullness_);
        if (this.maxFullness_ === this.fullness_)
            ui.gamelog.printf('%{을} 먹어 허기를 모두 회복하였습니다.', item);
        else
            ui.gamelog.printf('%{을} 먹어 허기를 %{s}만큼 회복하였습니다.', item, this.fullness_ - prevFullness);
        ui.charstats.update();
        
        item.remove();
        return true;
    }
    
    getDamage()
    {
        var damage = 0;
        
        var weapon = this.equipment_.getItemIn(EquipmentSlots.SLOT_WEAPON);
        if (weapon)
            damage += weapon.damage_ || 0;

        return Math.min(damage, 1);
    }
    
    /**
     * 플레이어를 매 프레임마다 업데이트함
     */
    update()
    {
        
        this.input_.wasdUpdate();
        
        this.dx_ = this.input_.getDiffX();
        this.dy_ = this.input_.getDiffY();
        
        this.moveDirection_ = this.input_.getDirection();
        
        if (this.input_.isKeyDown(ROT.VK_SPACE)) //32
        {
            var item = this.map_.getItemList(this.x_, this.y_)[0]; 
            if (item)
                this.pickUp(item);
        }
        
        if(this.input_.isKeyDown(ROT.VK_F))
            this.attack();
        
    }
    
    /**
     * 플레이어를 그려줌 
     */
    draw(graphics)
    {
        //graphics.fillRect(this.x_, this.y_, "rgb(0, 0, 0)");
        super.draw(graphics);
        
        // 바라보는 방향에 따른 그리기 추가작업
        graphics.drawMoveDirection(this.x_, this.y_, this.moveDirection_);
    }
    
    attack()
    {
        switch(this.moveDirection_)
        {
            case UP_DIRECTION:
                this.attackXY(this.x_, this.y_ - 1);
                break;
        }
    }
}/**
 * @author 강예형
 * 인벤토리에 관련된 기본 동작을 추상화하는 클래스
 */

'use strict';
/* global Item, ui */

class Inventory
{
    constructor(size)
    {
        this.size_ = size = parseInt(size, 10) || 12;
        this.items_ = new Array(size);
    }
    
    /**
     * 인벤토리에 아이템을 넣는다.
     * @arg [index]     인벤토리 칸을 직접 지정할 경우 슬롯 번호
     * @return 성공시 인벤토리에 넣은 item 객체, 실패시 false
     */
    add(item, index)
    {
        console.assert(item instanceof Item, 'item 값은 Item 클래스의 객체여야 함');
        console.assert(this.items_.indexOf(item) === -1, 'item이 이미 인벤토리에 들어있음');
        
        //인벤토리 슬롯을 직접 선택시
        if (typeof index === 'number')
        {
            if (this.items_[index])
            {
                ui.gamelog.printf('[[error]]' + index + '번째 칸에 %{이} 있어서 %{을} 넣을 수 없습니다.', this.items_[index], item);
                return false;
            }
        }
        else
        {
            for (index = 0; index < this.size_; ++index)
                if (!this.items_[index]) break;
    
            if (index === this.size_)
            {
                ui.gamelog.printf('[[error]]인벤토리가 가득 차서 %{을} 넣을 수 없습니다.', item);
                return false;
            }
        }
        
        this.items_[index] = item;
        return item;
    }
    
    /**
     * 인벤토리에서 아이템을 제거한다.
     * @return 성공시 인벤토리에 넣은 item 객체, 실패시 false
     */
    remove(item)
    {
        console.assert(item instanceof Item, 'item 값은 Item 클래스의 객체여야 함');
        
        var index = this.items_.indexOf(item);
        console.assert(index !== -1, 'item이 인벤토리에 들어있지 않음');
        
        this.items_[index] = null;
        return item;
    }
    
    /**
     * 인벤토리에 이 아이템이 들어있는 칸의 번호를 구한다.(없으면 -1)
     */
    indexOf(item)
    {
        return this.items_.indexOf(item);
    }
}
/**
 * @author 강예형
 * 착용한 장비에 관련된 기본 동작을 추상화하는 클래스
 */

'use strict';
/* global Item */

class EquipmentSlots
{
    constructor()
    {
        this.weapon_ = null;
        this.armor_  = null;
    }
    
    /**
     * 아이템을 착용한다. 해당 슬롯에 다른 아이템을 착용하고 있으면 실패한다.
     * @return 성공시 착용한 item 객체, 실패시 false
     */
    equip(item)
    {
        console.assert(item instanceof Item, 'item 값은 Item 클래스의 객체여야 함');
        
        var slot = item.getEquipmentSlot();
        
        //다른 아이템을 이미 착용하고 있을 경우
        if (this.getItemIn(slot))
            return false;
        
        this[slot] = item;
        return item;
    }
    
    /**
     * 착용한 아이템을 벗는다.
     * @return 성공시 벗은 item 객체, 실패시 false
     */
    unequip(item)
    {
        console.assert(item instanceof Item, 'item 값은 Item 클래스의 객체여야 함');
        
        var slot = item.getEquipmentSlot();
        console.assert(this.getItemIn(slot) === item, '착용하지 않은 아이템을 벗으려 함');
        
        this[slot] = null;
        return item;
    }
    
    /**
     * slot에 착용한 아이템을 돌려준다.(없으면 null)
     */
    getItemIn(slot)
    {
        console.assert(slot in this, slot + '은 올바른 슬롯이 아님');
        return this[slot];
    }
    
    /**
     * 아이템을 착용하고 있는지 확인한다.
     */
    isEquipped(item)
    {
        var slot = item.getEquipmentSlot();
        if (!slot) return false;
        
        return this.getItemIn(slot) === item;
    }
}

//착용 가능한 슬롯
EquipmentSlots.SLOT_WEAPON = 'weapon_';
EquipmentSlots.SLOT_ARMOR  = 'armor_';
/**
 * @author 강예형
 * 아이템 클래스
 */

/* global Entity, EquipmentSlots, ui */
'use strict';

class Item extends Entity {
    constructor(map, template)
    {
        super(map);

        this.owner_ = null; //아이템의 소지자
        this.isEquipped_ = false; //아이템이 착용되어 있는지의 여부
        
        if (template)
            this.loadTemplate(template);
    }

    loadTemplate(template)
    {
        super.loadTemplate(template);
        
        this.type_ = template.type;
        this.imageName_ = template.imageName;
        
        //소지한 아이템에 적용 가능한 기본적인 행동(떨어뜨리기, 던지기 등)의 코드
        this.actions_ = ['drop', 'throw'];

        //아이템의 종류에 따른 행동과 부가적인 속성 추가
        if (this.type_ === 'food')
        {
            this.actions_.push('eat');
            this.fullness_ = template.fullness;
        }

        if (this.type_ === 'weapon')
        {
            this.actions_.push('equip', 'unequip');
            this.damage_ = template.damage;
        }
        
        if (this.code_ === 'battery')
        {
            this.charge_ = 0;
            this.maxCharge_ = 10;
        }
    }
    
    getName()
    {
        if (this.code_ === 'battery')
            return super.getName() + ' (' + this.charge_ + '/' + this.maxCharge_ + ')';
        
        return super.getName();
    }
    
    /**
     * 인벤토리에 넣을 때 나타낼 아이템의 경로를 가져온다.
     */
    getImagePath()
    {
        var imageName = this.imageName_;
        if (this.code_ === 'battery')
            imageName = 'battery' + this.charge_ + '.png';
        
        return 'images/items/' + imageName;
    }
    
    /**
     * 아이템의 맵 상의 위치를 설정한다.
     * @arg x   이동할 x의 좌표
     * @arg y   이동할 y의 좌표
     */ 
    setPos(x, y)
    {
        //위치를 옮기기 이전의 맵의 타일에서 아이템을 제거한다.
        this.map_.popItem(this.x_, this.y_, this);

        this.x_ = x;
        this.y_ = y;
        
        //새로운 위치에 아이템을 저장한다.
        this.map_.pushItem(this.x_, this.y_, this);
    }
    
    /**
     * 아이템을 지도에서 제거한다. (게임 내에서는 제거되지 않음)
     */
    removeFromMap()
    {
        this.map_.popItem(this.x_, this.y_);
    }
    
    
    /**
     * 아이템을 착용 가능한 슬롯을 구한다. (착용 불가능한 경우 null)
     */
    getEquipmentSlot()
    {
        if (this.type_ === 'weapon')
            return EquipmentSlots.SLOT_WEAPON;
        if (this.type_ === 'armor')
            return EquipmentSlots.SLOT_ARMOR;
        return null;
    }

    /**
     * 이 아이템에 현재 사용 가능한 행동의 목록을 배열로 돌려준다.
     */
    getAvailableActions()
    {
        //배열을 복사
        var actions = this.actions_.slice();

        //아무도 소지하고 있지 않은(땅에 떨어진) 아이템은 행동의 대상이 될 수 없다.
        if (!this.owner_) return [];

        if (this.owner_.equipment_.isEquipped(this))
            actions.remove('equip');
        else
            actions.remove('unequip');

        return actions;
    }

    /**
     * actionCode로 지정한 행동을 수행한다.
     * 행동이 성공하면 그 행동의 리턴값을 돌려준다.
     * 행동이 실패하면 false스러운 값을 돌려준다.
     */
    doAction(actionCode)
    {
        if (this.getAvailableActions().indexOf(actionCode) === -1) {
            ui.gamelog.print('[[error]]이 아이템에 ' + actionCode + ' 행동을 사용할 수 없습니다.');
            return false;
        }

        switch (actionCode)
        {
            case 'drop':
                return this.owner_.drop(this);
            case 'throw':
                return this.owner_.throwItem(this);
            case 'eat':
                return this.owner_.eat(this);
            case 'equip':
                return this.owner_.equip(this);
            case 'unequip':
                return this.owner_.unequip(this);
            default:
                ui.gamelog.print('[[error]]' + actionCode + '는 정의되지 않은 행동입니다.');
                return false;
        }
    }
    
    draw(graphics)
    {
        graphics.drawImage(this.getImagePath(), this.x_, this.y_);
    }
};

/**
 * 아이템에 사용 가능한 행동 및 UI 텍스트
 */
Item.actionCodes = {
    'drop'      : '내려놓기',
    'throw'     : '던지기',
    'eat'       : '먹기',
    'equip'     : '착용',
    'unequip'   : '벗기'
};
/**
 * @author 강예형
 * 몬스터 클래스
 * TODO 많은 기능 추가
 */

/*
global
Unit
AIList
FindAttackTargetAI MeleeAttackAI WalkToTargetAI WanderingAI
*/

'use strict';

class Monster extends Unit
{
    constructor(map, template)
    {
        super(map);
        
        this.aiList_ = new AIList(
            new FindAttackTargetAI,
            new MeleeAttackAI,
            new WalkToTargetAI,
            new WanderingAI
        );
        
        this.loadTemplate(template);
    }
    
    loadTemplate(template)
    {
        super.loadTemplate(template);
        
        this.level_  = template.level_ || 1;
        this.damage_ = template.damage_ || 0;
        
        //this.aiList_ = new AIList();
    }
    
    getDamage()
    {
        return this.damage_;
    }
    
    ai()
    {
        var ai = this.aiList_.run(this);
        console.log(this.getName() + ' : ' + ai);
    }
    
    update()
    {
        this.ai(); //Rog에 AI를 따로 호출하는 코드가 없으니 일단 Monster.update()가 대신 호출해준다.
    }
}
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
'use strict';
/* global AI */

/**
 * @author 강예형
 */
class WalkToTargetAI extends AI
{
    run(unit)
    {
        var target = unit.aiTarget_;
        if (!target)
            return AI.RESULT_CONTINUE;
        
        //대상까지의 거리가 1 이하인 경우, 이미 도착했으니 다음 AI로 넘어간다
        if (unit.getWalkingDistanceTo(target) <= 1)
            return AI.RESULT_CONTINUE;
        
        var path = unit.computePathTo(target.x_, target.y_);
        
        //경로를 계산하지 못한 경우
        if (path.length === 0)
            return AI.RESULT_CONTINUE;
        
        unit.walkTo(path[0].x, path[0].y);
        return AI.RESULT_BLOCK;
    }
}
'use strict';
/* global AI */

/**
 * @author 강예형
 */
class FindAttackTargetAI extends AI
{
    run(unit)
    {
        //시야에서 벗어난 유닛은 바로 잊어버림?
        unit.aiTarget_ = null;
        
        var units = unit.map_.getObjectsInRect(unit.x_ - 10, unit.y_ - 10, 20, 20);
        
        for (var i = 0; i < units.length; ++i)
        {
            var target = units[i];
            
            if (target instanceof Player) //플레이어만을 공격 대상으로 인식한다
            {
                unit.aiTarget_ = target;
                break;
            }
        };
        
        return AI.RESULT_CONTINUE;
    }
}
'use strict';
/* global AI */

/**
 * @author 강예형
 */
class MeleeAttackAI extends AI
{
    run(unit)
    {
        var target = unit.aiTarget_;
        if (!target)
            return AI.RESULT_CONTINUE;
        
        if (unit.getWalkingDistanceTo(target.x_, target.y_) > 1)
        {
            //근접 공격의 사거리 밖에 있음
            return AI.RESULT_CONTINUE;
        }
        
        unit.attackMelee(target);
        if (target.isDead())
            unit.aiTarget_ = null;

        return AI.RESULT_BLOCK;
    }
}
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
