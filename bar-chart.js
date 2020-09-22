function SideBarChart(posX,posY){
    this.arr=[];
    var yLen;
    var mappingValues={
        start1:0,
        stop1:0,
        start2:0,
        stop2:0
    }
    //draw the x axis
    this.draw_X_Axis=function(len,arr=[]){
        stroke(255);
        //assigning the mapping values
        mappingValues.start1=0;
        mappingValues.stop1=arr[arr.length-1];
        mappingValues.start2=posX;
        mappingValues.stop2=posX+len;
        line(posX,posY,posX+len,posY);
        var tickSpaces=len/arr.length;
        for(var i=0; i<arr.length;i++){
            stroke(255);
            textAlign(CENTER);
            textSize(10);
            if(arr.length<=5000){
                if(arr[i]%50000==0){
                    fill(255);
                    stroke(255);
                    text(arr[i],posX+i*tickSpaces,posY+10);
                    line(posX+i*tickSpaces,posY,posX+i*tickSpaces,posY-450);

                }
            }else if(arr.length<=50000){
                if(arr[i]%100000==0){
                    fill(255);
                    stroke(255);
                    text(arr[i],posX+i*tickSpaces,posY+10);
                    line(posX+i*tickSpaces,posY,posX+i*tickSpaces,posY-450);

                }
            }

        }
    
        
    }
    //draws the y axis
    this.draw_Y_Axis=function(len,arr=[]){
        yLen=len;
        stroke(255);
        var tickSpaces=len/arr.length;
        line(posX,posY,posX,posY-len);
        for(var i=0; i<arr.length;i++){
            textAlign(RIGHT,CENTER);
            textSize(10);
            text(arr[i].entityName,posX-10,(posY-tickSpaces/2)-i*tickSpaces);
            var xMappedValue=map(arr[i].gdpValue,mappingValues.start1,mappingValues.stop1+100,mappingValues.start2,mappingValues.stop2);
            text(arr[i].gdpValue,xMappedValue+40,(posY-tickSpaces/2)-i*tickSpaces)
            rect(posX,(posY-tickSpaces/2)-i*tickSpaces-10,xMappedValue,tickSpaces/2)
            
        }
        
     
        
    }
    var full=false;
    //method used to insert the nation into the array, if the array has space for it.
    this.insertData=function(n){
        if(!full){
            this.arr.push(n);
            this.sortList(this.arr);
            if(this.arr.length==20){
                full=true;
            }
            
        }else{
            if(n.gdpValue>this.arr[0].gdpValue){
                this.arr[0]=n;
                this.sortList(this.arr);
                
            }
        }
        return this.arr;
        
        
        
        
        
        
    }
    
    //Sorts the array using bubble sort algorithm
    this.sortList=function(array){
        for(var i=0; i<array.length;i++){
            for(var j=0; j<i;j++){
                if(array[i].gdpValue<array[j].gdpValue){
                    var temp=array.splice(i,1);
                    array.splice(j,0,temp[0]);
                }
                
                
                
            }
          
        }
        return array;
        
        
        
    }
    
    
    
    
    
}




