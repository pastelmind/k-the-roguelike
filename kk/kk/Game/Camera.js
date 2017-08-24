/**
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
