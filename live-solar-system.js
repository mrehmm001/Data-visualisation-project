
function LiveSolarSystem(){
    this.name="Live solar system";
    this.id="Live-Solar-System";
    
    this.time;

    this.planets;

    var d;
    var ecl;

    //tools
    this.slider;
    this.scaleSlider;

    //Planets
    var sun;
    var mercury;
    var venus;
    var earth;
    var moon;
    var mars;
    var jupiter;
    var saturn;
    var uranus;
    var neptune;

    var defaultVersion;
    var scaledVersion;

    var orbitArr;

    this.preload=function(){
        mercury=loadImage('/assets/images/mercury.png');
        venus=loadImage('/assets/images/venus.png');
        earth=loadImage('/assets/images/earth.png');
        moon=loadImage('/assets/images/moon.png')
        mars=loadImage('/assets/images/mars.png');
        jupiter=loadImage('/assets/images/jupiter.png');
        saturn=loadImage('/assets/images/saturn.png');
        uranus=loadImage('/assets/images/uranus.png');
        neptune=loadImage('/assets/images/neptune.png');
        sun=loadImage('/assets/images/sun.png');
    }
    this.setup=function(){

        var date=new Date();
        time={
            year:date.getUTCFullYear(),
            month:date.getUTCMonth(),
            day:date.getUTCDate(),
            hour:date.getUTCHours()
        }

        d=(this.timeScale(new Date()));
        ecl = 23.4393 - 3.563E-7 * d;

        

        this.planets=[
            //0 Sun
            {N:0.0,
             i:0.0,
             w : 282.9404 + 4.70935E-5 * d,
             a : 1.000000,
             e : 0.016709 - 1.151E-9 * d,
             M : 356.0470 + 0.9856002585 * d,
             size:696340,
            },
            //1 Mercury
            {N0:  48.3313, N1:3.24587E-5,
             i0: 7.0047,i1:5.00E-8,
             w0:  29.1241,w1: 1.01444E-5,
             a0: 0.387098, a1: 0,
             e0: 0.205635,e1: 5.59E-10 ,
             M0: 168.6562, M1: 4.0923344368,
             colour:color(80, 78, 81),
             size:2439.7 //radius in km
            },
            //2 Venus
            {N0:  76.6799 ,N1: 2.46590E-5,
             i0: 3.3946 ,i1: 2.75E-8,
             w0:  54.8910 ,w1: 1.38374E-5,
             a0: 0.723330,a1: 0,
             e0: 0.006773 ,e1: 1.302E-9,
             M0:  48.0052 , M1: 1.6021302244,
             colour:color(187, 183, 171),
             size: 6051.8 //radius in km             
            },
            //3 Mars
            {N0:  49.5574 ,N1: 2.11081E-5,
             i0: 1.8497 ,i1: 1.78E-8,
             w0: 286.5016 ,w1: 2.92961E-5,
             a0: 1.523688, a1:0,
             e0: 0.093405 ,e1: 2.516E-9,
             M0:  18.6021 , M1: 0.5240207766,
             colour:color(226, 123, 88),
             size:3389.5 //radius in km  
            },
            //4 Jupiter
            {N0: 100.4542 ,N1: 2.76854E-5,
             i0: 1.3030 ,i1: 1.557E-7,
             w0: 273.8777 ,w1: 1.64505E-5,
             a0: 5.20256,a1: 0,
             e0: 0.048498 ,e1: 4.469E-9,
             M0:  19.8950 , M1: 0.0830853001,
             colour:color(211, 156, 126),
             size:69911 //radius in km 
            },
            //5 Saturn
            {N0: 113.6634 ,N1: 2.38980E-5,
            i0: 2.4886 ,i1: 1.081E-7,
             w0: 339.3939 ,w1: 2.97661E-5,
             a0: 9.55475, a1:0,
             e0: 0.055546 ,e1: 9.499E-9,
             M0: 316.9670 , M1: 0.0334442282,
             colour:color(197, 171, 110),
             size:58232 //radius in km 
            },
            //6 Uranus
            {N0:  74.0005 ,N1: 1.3978E-5,
             i0: 0.7733 ,i1: 1.9E-8,
             w0:  96.6612 ,w1: 3.0565E-5,
             a0: 19.18171 ,a1: 1.55E-8,
             e0: 0.047318 ,e1: 7.45E-9,
             M0: 142.5905 , M1: 0.011725806,
             colour:color(147, 184, 190),
             size:25362 //radius in km 

            },
            //7 Neptune
            {N0: 131.7806 ,N1: 3.0173E-5,
             i0: 1.7700 ,i1: 2.55E-7,
             w0: 272.8461 ,w1: 6.027E-6,
             a0: 30.05826 ,a1: 3.313E-8,
             e0: 0.008606 ,e1: 2.15E-9,
             M0: 260.2471 , M1: 0.005995147,
             colour:color(62, 84, 232),
             size: 24622},
             //8 Moon
            {N0: 125.1228  ,N1:  0.0529538083,
             i0: 5.1454 ,i1: 0,
             w0: 318.0634 ,w1: 0.1643573223,
             a0: 60.2666/23454.779920164812 ,a1: 0,
             e0: 0.054900 ,e1: 0,
             M0: 115.3654, M1: 13.0649929509,
             colour:color(62, 84, 232),
             size:1737.1}


        ]
        this.slider=createSlider(-30,30,0);
        this.slider.position(width/2,height-30);
        this.slider.size(200)

        this.scaleSlider=createSlider(1,30,1,0.1);
        this.scaleSlider.position(width/2+250,height-30);
        this.scaleSlider.size(200);


        orbitArr=this.getOrbitVisiuals();

        

    }

    var speed=0;
    var setupCount=0;
    this.draw=function(){
        
      


        imageMode(CENTER);
        var date = new Date();
        speed+=this.slider.value();
        date.setDate(date.getDate() + speed);
        d=(this.timeScale(date));
        ecl = 23.4393 - 3.563E-7 * d;

        background(0);
        fill(255);
        push()
        text("DATE: "+date.getUTCDate()+"/"+(date.getUTCMonth()+1)+"/"+date.getUTCFullYear(),100,100)
        push();

        //labels for the slider
        textSize(20);
        text("-",width/2-270,height-17);
        text("+",width/2-40,height-15);

        text("scale",width/2+75,height-30)
        text("trajectory",width/2-180,height-30)
        pop();
        push();
        var sunPos=this.plotSun(this.planets[0]);
        translate(width/2,height/2);

        // //sun
        fill("yellow");
        scale(this.scaleSlider.value());
        
        size=69634/1000;
        image(sun,sunPos.x,sunPos.y,20,20);
        var startIndex;
        var endIndex;
        if(this.scaleSlider.value()<=1.2){
            startIndex=6;
            endIndex=7;

        }
        else if(this.scaleSlider.value()<=2){
            startIndex=5;
            endIndex=6;
        }
        else if(this.scaleSlider.value()>=2.1){
            startIndex=0;
            endIndex=5;

        }else if(this.scaleSlider.value()>3.9){
            startIndex=0;
            endIndex=4;

        }else if(this.scaleSlider.value()>6.1){
            startIndex=0;
            endIndex=3;

        }
    
        

        //this creates the planetary solar pathways
        if(setupCount%1==0){
            for(var i=startIndex; i<=endIndex;i++){
                beginShape();
                for(var j=0; j<orbitArr[i].length;j++){
                    stroke(255);
                    noFill();
                    strokeWeight(0.1);
                    if(i==6){
                        if(j%150==0){
                            curveVertex(orbitArr[i][j].x,orbitArr[i][j].y);
                        }                
                    }else if(i==7){
                        if(j%1500==0){
                            curveVertex(orbitArr[i][j].x,orbitArr[i][j].y);
                        } 

                    }
                    else{
                        curveVertex(orbitArr[i][j].x,orbitArr[i][j].y);
                    }
                }
                endShape();

            }
        }

        //This is used to draw out each individual planet
        for(var i=1;i<this.planets.length;i++){
            fill(this.planets[i].colour);
            this.planet=new PlanetPS(this.planets[i].N0,this.planets[i].N1,this.planets[i].i0,this.planets[i].i1,this.planets[i].w0,this.planets[i].w1,this.planets[i].a0,this.planets[i].a1,this.planets[i].e0,this.planets[i].e1,this.planets[i].M0,this.planets[i].M1);
            var earthPosition=findGeoCentricPosition(d);
            var size=(0.0009*this.planets[i].size)/2;
            var earthSize=(0.0009*6371)/2;
            this.planet=this.planet.plotCartesianCoords(d);

            //I looped through the arbitrary array of planets, and using the switch cases I was able to assign each planet with its own image and positioned it in it's position of the solar system
            switch(i){
                case(1):
                    image(mercury,this.planet.x,-this.planet.y,size,size);
                    break;
                
                case(2):
                    image(venus,this.planet.x,-this.planet.y,size,size);
                    break;

                case(3):
                    image(mars,this.planet.x,-this.planet.y,size,size);
                    break;

                case(4):
                    image(jupiter,this.planet.x,-this.planet.y,size,size);
                    break;

                case(5):
                    image(saturn,this.planet.x,-this.planet.y,size*1.5,size);
                    break;

                case(6):
                    image(uranus,this.planet.x,-this.planet.y,size,size);
                    break;

                case(7):
                    image(neptune,this.planet.x,-this.planet.y,size,size);
                    break;

                case(8):
                    push();
                    translate(earthPosition.x,-earthPosition.y);
                    fill(255)
                    image(moon,this.planet.x/4,-this.planet.y/4,size,size);
                    pop();
                    break;
                    
                default:
                    break;


            }
            //Earth position
            image(earth,earthPosition.x,-earthPosition.y,earthSize,earthSize);
            EarthPosX=earthPosition.x;
            EarthPosY=earthPosition.y;
            
            
        }
        pop();
        
        



    }

    //converts gregorian time to julian date which is needed for this algorithm
    this.timeScale=function(utc){
        return 1.0 + (utc.getTime() - Date.UTC(2000, 0, 1)) / (3600.0 * 24.0 * 1000.0);
        
    }
    

    //function for plotting the sun
    this.plotSun=function(sun){
        var E = sun.M + sun.e*(180/PI) * sin(sun.M) * ( 1.0 + sun.e * cos(sun.M));
        var xv=cos(E)-sun.e;
        var yv=sqrt(1.0-sun.e*sun.e)*sin(E);
        var v=Math.atan2(yv,xv);
        var r=sqrt(xv*xv + yv*yv );
        
        var lonsun=v+sun.w;
        var xs=r*cos(lonsun);
        var ys=r*sin(lonsun);

        var xe=xs;
        var ye=ys*cos(ecl);
        var ze=ys*sin(ecl);

        return {x:xe,y:ye,z:ze};

    }
    this.auToPixels=function(au){
        //1 au is 147 million km;
        //1 pixel=1 million km
        //so 1au is 147 pixels

        return a*149;       

    }

    this.getOrbitVisiuals=function(){
        /*Planets orbit time in days
        Mecury:88
        Venus orbit time:225
        Earth orbit time:365
        Mars orbit time:687.5
        Jupiter orbit time:4,300
        Saturn orbit time:11,000 
        uranus orbit time:31,000
        neptune orbit time:60,200
         */
        var orbitTimes=[0,88+10,225+10,365+10,730+10,4300+10,11000+10,31000+10,60200+10,0];

        var arr1=[];
        for(var i=1;i<this.planets.length;i++){
            var arr2=[];
            var date2 = new Date();
            var d2=(this.timeScale(date2));
            for(var j=0;j<=orbitTimes[i];j++){
                if(i==3){
                    date2 = new Date();
                    date2.setDate(date2.getDate() + j);
                    d2=(this.timeScale(date2));
                    this.planet=findGeoCentricPosition(d2);
                    arr2.push({x:this.planet.x,y:-this.planet.y});
                    continue;
                    


                }
                if(i>3){
                    date2 = new Date();
                    date2.setDate(date2.getDate() + j);
                    d2=(this.timeScale(date2));
                    this.planet=new PlanetPS(this.planets[i-1].N0,this.planets[i-1].N1,this.planets[i-1].i0,this.planets[i-1].i1,this.planets[i-1].w0,this.planets[i-1].w1,this.planets[i-1].a0,this.planets[i-1].a1,this.planets[i-1].e0,this.planets[i].e1,this.planets[i-1].M0,this.planets[i-1].M1);
                    this.planet=this.planet.plotCartesianCoords(d2);
                    arr2.push({x:this.planet.x,y:-this.planet.y});
                    continue;
                }
                date2 = new Date();
                date2.setDate(date2.getDate() + j);
                d2=(this.timeScale(date2));
                this.planet=new PlanetPS(this.planets[i].N0,this.planets[i].N1,this.planets[i].i0,this.planets[i].i1,this.planets[i].w0,this.planets[i].w1,this.planets[i].a0,this.planets[i].a1,this.planets[i].e0,this.planets[i].e1,this.planets[i].M0,this.planets[i].M1);
                this.planet=this.planet.plotCartesianCoords(d2);
                arr2.push({x:this.planet.x,y:-this.planet.y});
              
  


            }
            arr1.push(arr2);

        
        }

        return arr1;


    }

    this.destroy=function(){
        this.scaleSlider.remove();
        this.slider.remove();
    }

}
