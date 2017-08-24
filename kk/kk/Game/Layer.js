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
}