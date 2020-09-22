function SeaRiseData(){
    this.name="Sea rise data";
    this.id="Sea-rise-data";

    this.image;
    this.preload=function(){
        this.image=loadImage('data/sea-rise/heightmap.png');

    }
    var slider;
    this.setup=function(){
        pixelDensity(1);
        canvasContainer = select('#app');
        var c = createCanvas(2160/3, 1080/3);
        c.parent('app');
        
        slider=createSlider(0,255,0,0.1);
        slider.position(width/2,height+30);
     

    this.draw=function(){
        image(this.image,0,0,width,height);


        loadPixels();
        for(var y=0; y<height;y++){
            for(var x=0; x<width;x++){
                var index=(x+y*width)*4;
                var pixel1=pixels[index+0];
                var pixel2=pixels[index+1];
                var pixel3=pixels[index+2];
                var pixel4=pixels[index+3];
                if((pixel1>=0 && pixel1<=slider.value()) && (pixel2>=0 && pixel2<=slider.value()) && (pixel3>=0 && pixel3<=slider.value())){
                    if(pixels[index+2]!=100){
                        pixels[index+0]=0;
                        pixels[index+1]=0;
                        pixels[index+2]=100;
                        pixels[index+3]=255;
                    }
                }
                
                
            }
        }
        var heightSpaces=height/8;
        var widthsSpaces=width/8;
        updatePixels();
        // for(var y=0; y<height;y+=heightSpaces){
        //     for(var x=0; x<width;x+=widthsSpaces){
        //         updatePixels(x,y,widthsSpaces,heightSpaces);
                
        //     }
        // }
        


    }


    }


}