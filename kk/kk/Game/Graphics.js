/**
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
}