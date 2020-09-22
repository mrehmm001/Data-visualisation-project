function LineGraph(posX,posY){
    
    stroke(255);
    fill(255);
    textAlign(CENTER,CENTER);
    var xLen;
    var yLen;
    var xStart;
    var xEnd;
    var yStart;
    var yEnd;
    var xlabelTickSpace;
    //This is used to draw the X axis
    this.draw_X_Axis=function(len, start, end, step=1,label){
        end=end+4;//rounding it up from 2016 to 2020
        //parsing values to plotting values
        xStart=start;        
        xEnd=end;
        xLen=len;

        fill(0);
        line(posX,posY,posX+len,posY);
        var tickCount=floor((end-start)/step);
        var arr=[];
        for(var i=start;i<=end;i+=tickCount){
            arr.push(i);
            
        }
        noStroke();
        fill(255);
        text(label,(posX+len)/2,posY+35);
        var labelTickSpace=(len/arr.length+6);
        xlabelTickSpace=labelTickSpace;
        for(var i=0;i<arr.length;i++){
            text(arr[i],posX+i*labelTickSpace,posY+20);
        }
        
    }

    //This is used to draw the Y axis
    this.draw_Y_Axis=function(len, start, end, step=1,label){
        noStroke();
        start=this.numberRoundDown(start);
        end=this.numberRoundUp(end);
        yStart=start;
        stroke(255);
        line(posX,posY,posX,posY-len);
        var tickCount=(end)/step;
        yEnd=end+tickCount;
        yLen=len;
        var arr=[];
        for(var i=start;i<=end;i+=tickCount){
            arr.push(i);
            
        }
        noStroke();
        fill(255);
        var labelTickSpace=len/arr.length
        push();
        rotate(-90*(PI/180));
        text(label,(posY+len)/2.5,posX-73);
        pop();
        for(var i=0;i<arr.length;i++){
            noStroke();
            textAlign(RIGHT)
            text(arr[i],posX-10,posY-i*labelTickSpace);
            stroke(255,255,255,100);
            line(posX,posY-i*labelTickSpace,posX+xLen,posY-i*labelTickSpace);
        }
        
    }

    
    //When called, this will plot the given data on the line graph
    this.plotData=function(xValue1,xValue2,yValue1,yValue2){
        var mapValues={
            x1:map(xValue1,xStart,xEnd, posX,posX+xLen),
            x2:map(xValue2,xStart,xEnd, posX,posX+xLen),
            y1:map(yValue1,yStart,yEnd, posY,posY-yLen),
            y2:map(yValue2,yStart,yEnd, posY,posY-yLen),
            
        }
        stroke(255,0,0);
        line(mapValues.x1,mapValues.y1,mapValues.x2,mapValues.y2);
        this.mouseOverInfo(mapValues.x1,mapValues.y1,xValue1,yValue1);
        
        
        
    }
    //Mouse over interactive feature that shows info
    this.mouseOverInfo=function(x,y,year,value){
        var altMouseX=mouseX-100;
        var altMouseY=mouseY-500;
        if(abs(altMouseX-x)<=5 && altMouseY<posY && altMouseY>posY-yLen){                      
            push();
            textAlign(LEFT);
            fill(0,0,0);
            stroke(255);
            rectMode(TOP,RIGHT);
            rect(altMouseX,altMouseY,100,-50);
            fill(255);
            noStroke();
            text("year: "+year,altMouseX+10,altMouseY-30)
            text("GDP: "+value,altMouseX+10,altMouseY-15)
            stroke(255,255,255,100);
            line(altMouseX,posY,altMouseX,posY-yLen);
            pop();

            
        }

    }
    
    //Used this to help round up or down a number
    this.numberRoundUp=function(n){

            if(n<100){
                n=ceil(n/10)*10;
                return n;
            }
            if(n<1000){
                n=ceil(n/100)*100;
                return n;
                
                
            }
            if(n<10000){
                n=ceil(n/1000)*1000;
                return n;

            }
            if(n<100000){
                n=ceil(n/10000)*10000;
                return n;

            }
            if(n<1000000){
                n=ceil(n/100000)*100000;
                return n;
                
                
            }
            if(n>1000000){
                n=ceil(n/1000000)*1000000;
                return n;
                
                
            }
            return n;

        
        
    }
    
    this.numberRoundDown=function(n){
        if(n<100){
            n=floor(n/10)*10;
            return n;
        }
        if(n<1000){
            n=floor(n/100)*100;
            return n;
            
            
        }
        if(n<10000){
            n=floor(n/1000)*1000;
            return n;

        }
        if(n<100000){
            n=floor(n/10000)*10000;
            return n;

        }
        if(n<1000000){
            n=floor(n/100000)*100000;
            return n;
            
            
        }
        if(n>1000000){
            n=floor(n/1000000)*1000000;
            return n;
            
            
        }
        return n;
        
    }


    
}