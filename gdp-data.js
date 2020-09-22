function GDP_DATA(){
    push();
    this.name="GDP data";
    this.id="GDP"
    this.lineGraphMode;
    this.barChartMode;
    this.data;
    var sel;
    var slider;
    this.years=[];
    var lineGraph;
    var barChart;
    var playButton;
    var playingState=false;
    
    this.preload=function(){
        //grab the data
        this.data=loadTable('/data/Nation-GDP/NationsGDP.csv','csv');

    }
    this.setup=function(){
        //resize the canvas
        canvasContainer = select('#app');
        var c = createCanvas(1024, 676);
        c.parent('app');
        lineGraph=true;
        barChart=false;
        //Created two buttons to switch between two modes
        this.lineGraphMode = createButton('Line Graph');
        this.barChartMode = createButton('Bar chart');
        this.lineGraphMode.position(300,50);
        this.barChartMode.position(400,50);
        slider=createSlider(3,198,0);
        slider.position(width/2+300,height+30);
        slider.hide();
        sel=createSelect();
        sel.position(width/2+300,height+30);
        playButton=createButton("play");
        playButton.position(width/2+250,height+30)
        playButton.hide();
        var nationArr=this.data.getRow(0).arr;
        for(var i=1; i<nationArr.length;i++){
            sel.option(nationArr[i]);
        }
        //This is to push the years form 1820-2016 into the array
        for(var i=1800;i<=2016;i++){
            this.years.push(i);
        }


    }
    var count=0;
    this.collectData=function(val=0){

        var entityArr;
        if(lineGraph){
            //this is to find the sel value index within the database
            for(var i=1; i<this.data.getRow(0).arr.length;i++){
                if(this.data.getRow(0).arr[i]==sel.value()){
                    entityArr=this.data.getColumn(i);
                    entityArr.splice(0,2);
                    break;
                }
            }
        }
        if(barChart){
            //This will grab the data of entity by year
            entityArr=this.data.getColumn(val);
            entityArr.splice(0,2);
        }
        //Used to find the min and max of the year and gdp
        entityData={
            yearsMin:2016,
            yearsMax:1800,
            gdpMin:entityArr[2],
            gdpMax:entityArr[2],
            gdpArr:[],
            yearArr:[],
        }
        var arr=[];
        yearValueArr=this.data.getColumn(0);
        yearValueArr.splice(0,2);
        for(var i=0;i<entityArr.length;i++){
            if(entityArr[i]!="" && parseFloat(entityArr[i])!=0){
                
                entityData.gdpArr.push(parseFloat(entityArr[i]));
                if(parseFloat(entityArr[i])>entityData.gdpMax){
                    entityData.gdpMax=parseFloat(entityArr[i]);

                }
                if(parseFloat(entityArr[i])<entityData.gdpMin){
                    entityData.gdpMin=parseFloat(entityArr[i]);

                }

                if(parseFloat(yearValueArr[i])>entityData.yearsMax){
                    entityData.yearsMax=parseFloat(yearValueArr[i]);
                    entityData.yearArr.push(parseFloat(yearValueArr[i]));
                }

                if(parseFloat(yearValueArr[i])<entityData.yearsMin){
                    entityData.yearsMin=parseFloat(yearValueArr[i]);
                    entityData.yearArr.push(parseFloat(yearValueArr[i]));
                }           
            }else{
                
                entityData={
                    yearsMin:2016,
                    yearsMax:1800,
                    gdpMin:entityArr[2],
                    gdpMax:entityArr[2],
                    gdpArr:[],
                    yearArr:[]
                }
                

            }



        }
        if(count==0 && sel.value()=="Brazil"){
         count++;
            print(entityData.gdpArr);
            print(entityData)
        }

        return entityData;








    }
    this.draw=function(){
        this.barChartMode.mousePressed(function(){
            lineGraph=false;
            barChart=true;
            sel.hide();
            slider.show();
            playButton.show();
        });
        
        
        this.lineGraphMode.mousePressed(function(){
            lineGraph=true;
            barChart=false;
            sel.show();
            slider.hide();
            playButton.hide();
            
        });
        
        
        
        background(0, 26, 71);
        translate(100,500);
        fill(255);
        noStroke();
        textSize(15);
        text("This data is from the Madisson project of comparative economic growth and income levels",(width/2)+130,-460);
        if(lineGraph){
            var nationData=this.collectData();
            var graph=new LineGraph(0,50);
            graph.draw_X_Axis(700,nationData.yearsMin,nationData.yearsMax,10,"years")
            graph.draw_Y_Axis(450,nationData.gdpMin,nationData.gdpMax,20,"In millions international $")
            var entitiesRow=this.data.getRow(0).arr;
            for(var i=1;i<entitiesRow.length;i++){
                //Loops through until it finds the current nation select value
                if(entitiesRow[i]==sel.value()){
                    var entityCol=this.data.getColumn(i);
                    for(var j=0;j<nationData.gdpArr.length;j++){
                        graph.plotData(nationData.yearArr[j],nationData.yearArr[j+1],nationData.gdpArr[j],nationData.gdpArr[j+1]);


                    }
                
                }
            }
        }
        //I decided to add another mode, barchart mode as another means of displaying this data.
        if(barChart){
            var nationData=this.collectData();
            var barChartData=new SideBarChart(0,50);            
            var entitiesRow=this.data.getRow(0).arr;
            var array=[];

            gdpArray=[];
            for(var i=0; i<=400000;i+=100){
                gdpArray.push(i);
            }
            for(var i=1;i<entitiesRow.length;i++){
                var entityCol=this.data.getColumn(i); 
               if(isNaN(parseFloat(entityCol[slider.value()-1]))==false){   
                    array=barChartData.insertData({entityName:entityCol[0],gdpValue:parseFloat(entityCol[slider.value()-1]),year:this.years[slider.value()]});
                    if(parseFloat(entityCol[slider.value()])>gdpArray[gdpArray.length-1]){
                        while(gdpArray[gdpArray.length-1]<=parseFloat(entityCol[slider.value()])){
                            gdpArray.push(gdpArray[gdpArray.length-1]+100);
                            
                        }
                    }

                }
            }
            
            //Create the barchart layout
            fill(200);
            textSize(50);
            text(this.years[slider.value()-3],700,0);
            fill(255);
            barChartData.draw_X_Axis(700,gdpArray);

            barChartData.draw_Y_Axis(450,array);


            //I used this logic to make the playbutton work
            playButton.mousePressed(function(){
                playingState=!playingState;
                //Just like a normal play button, if it's not playing anything, then it will say "play", and it will say "stop" when playing
                //For this to work, I just removed and recreated the button since there was no other convenient way to rename the button.
                //I used a boolean method , playingstate to make this work.
                if(!playingState){
                    playButton.remove();
                    playButton=createButton("play");
                    playButton.position(width/2+250,height+30)
                }else{
                    playButton.remove();
                    playButton=createButton("stop");
                    playButton.position(width/2+250,height+30)
                }
            });
            //The playing state works by recreating the slider each time, but having its slider value increased.
            //I made it so that when it reaches the end, the playing state is turned off, back to pause state.
            if(playingState){
                i=slider.value();
                if(i!=198);
                i++;
                slider.remove();
                slider=createSlider(3,198,i);
                slider.position(width/2+300,height+30);
                if(i>=198){
                    playingState=false;
                    playButton.remove();
                    playButton=createButton("play");
                    playButton.position(width/2+250,height+30)
                }
                
            }
           
                
            
            
        }


        this.destroy=function(){
            slider.remove();
            playButton.remove();
            sel.remove();
            this.lineGraphMode.remove();
            this.barChartMode.remove();
            canvasContainer = select('#app');
            var c = createCanvas(1024, 576);
            c.parent('app');


        }
        



    }
    pop();



}