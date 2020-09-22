function PopulationTimeline() {
    

    
    this.name = 'Population timeline (predictions)1800-2100'
    this.id = 'past-present-future-population-map'
    
    this.data;
    this.font;
    
    this.preload=function(){
        this.data=loadTable("data/countryPopulation/country.csv","csv","header");
        this.font = loadFont('./assets/Regular.ttf');
        
    }
    
    
    
    var years;
    var entity;
    var population;
    var slider;
    var nationNames=[];
    var playButton;
    var playButtonObj;
    var heatMap=new createMap();
    this.setup=function(){
        entity=this.data.getColumn("Entity");
        years=this.data.getColumn("Year");
        population=this.data.getColumn("Population");

        slider = createSlider(1800, 2100, 2020);
        slider.position(903,530);
        slider.style('width', '80px');
        slider.size(200);

        for(var i=0; i<heatMap.nations.length;i++){
            nationNames.push(heatMap.nations[i].name);
        }
        for(var i=0;i<heatMap.nations.length;i++){
            heatMap.nations[i].colourID=[floor(random(0,255)),floor(random(0,255)),floor(random(0,255))];
        }
        
        playButtonObj={
            x:850,
            y:530,
            playing:false
        }
        playButton=createButton("play");
        playButton.position(playButtonObj.x,playButtonObj.y);
        
    }
    
    this.draw=function(){
        clear();
        background(0, 26, 71);  
        fill(255);
        textAlign(LEFT,LEFT);
        textSize(40);
        strokeWeight(1);
        text(slider.value(),467, 45);
        for(var i=0; i<entity.length;i++ ){        
            if(years[i]==slider.value()){
                var rgbVAL=map(parseInt(population[i]),0,100000000,255,0);
                var rgbVAL2=map(parseInt(population[i]),200000000,2000000000,255,0);  
                if(nationNames.indexOf(entity[i])!=-1){
                    heatMap.nations[nationNames.indexOf(entity[i])].colour=color(rgbVAL2,rgbVAL,rgbVAL);
                    heatMap.nations[nationNames.indexOf(entity[i])].population=parseInt(population[i]);
                }
            }
        }
        
        
        
        var passNationName;
        var passNationPopulation;
        for(var i=0; i< heatMap.nations.length;i++){

            noFill();
            var size=0.5;
            var cords=[0,0];
            fill(heatMap.nations[i].colourID);
            heatMap.drawNation(heatMap.nations[i],size,cords);
            if(get(mouseX,mouseY)[0]==heatMap.nations[i].colourID[0] && get(mouseX,mouseY)[1]==heatMap.nations[i].colourID[1]  && get(mouseX,mouseY)[2]==heatMap.nations[i].colourID[2]){
                passNationName= heatMap.nations[i].name;
                passNationPopulation=heatMap.nations[i].population;
            }
        }

        for(var i=0; i< heatMap.nations.length;i++){    
            var size=0.5;
            var cords=[0,0];

            fill(heatMap.nations[i].colour);        
            heatMap.drawNation(heatMap.nations[i],size,cords);


            if(passNationName!=undefined && passNationPopulation!=undefined){
                var strInfo=("Country:"+passNationName+"\n"+"population:"+this.m(passNationPopulation,2));
                var bbox = this.font.textBounds(strInfo, mouseX+10, mouseY-10, 20);
                fill(0,0,0,2)
                if(mouseX>=width-300){
                    rect(mouseX-strInfo.length*5.5,bbox.y,bbox.w-100,60);
                    fill(255,255,255);
                    textSize(20);
                    var textBox1=text(strInfo,mouseX-strInfo.length*5,mouseY);
                    
                }else{
                    rect(bbox.x,bbox.y,bbox.w-100,60);
                    fill(255,255,255);
                    textSize(20);
                    var textBox1=text(strInfo,mouseX+20,mouseY);
                }
            }
        }

        var populationRange=[["No data",0],["5M",5000000],["10M",10000000],["50M",50000000],["100M",100000000],["500M",500000000],["1B",1000000000],[">1.5B",1500000000]];
        for(var i=0;i<populationRange.length;i++){
            fill(255);
            stroke(0);
            textSize(10);
            text(populationRange[i][0],51*(i+1),height-50)
            var rgbVAL=map(populationRange[i][1],0,100000000,255,0);
            var rgbVAL2=map(populationRange[i][1],100000000,1800000000,255,0);  
            fill(rgbVAL2,rgbVAL,rgbVAL);
            rect(51*(i+1),height-50,50,30);

        }
        playButton.mousePressed(function(){
            playButtonObj.playing=!playButtonObj.playing;
            if(playButtonObj.playing){
                playButton.remove();
                playButton=createButton("stop");
                playButton.position(playButtonObj.x,playButtonObj.y);

            }else{
                playButton.remove();
                playButton=createButton("play");
                playButton.position(playButtonObj.x,playButtonObj.y);
                
            }

        });

        if(playButtonObj.playing){
            var i=slider.value();
            if(i!=2100){
                i++;
                slider.remove();
                slider = createSlider(1800, 2100, i);
                slider.position(903,530);
                slider.style('width', '80px');
                slider.size(200);

            }
            if(i>=2100){
                playButton.remove();
                playButton=createButton("play");
                playButton.position(playButtonObj.x,playButtonObj.y);
                playButtonObj.playButton=false;

            }
        }



        
        
        
    }

    this.destroy=function(){
        slider.remove();
        playButton.remove();
        
    }

    
    //This takes large interger value and makes it readable e.g 1500000000 > 1.5B
    this.m=function(n,d){
        if(typeof(n)=="number"){
    //refence https://stackoverflow.com/questions/9345136/1000000-to-1m-and-1000-to-1k-and-so-on-in-js
        x=(''+n).length,p=Math.pow,d=p(10,d)
        x-=x%3
        return Math.round(n*d/p(10,x))/d+" kMBTPE"[x/3]
    }

}

    
    
}
function mouseClicked(){
    if(get(mouseX,mouseY)[0]==240 && get(mouseX,mouseY)[1]==241 && get(mouseX,mouseY)[2]==3 ){
        return true;
        
    }
    false
}
    