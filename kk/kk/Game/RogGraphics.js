// Rog에서만 사용하는 함수들이 추가되어 있는 Graphics 클래스
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
}