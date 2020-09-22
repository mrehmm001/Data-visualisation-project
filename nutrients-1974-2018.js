function NutrientsTimeSeries() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Nutrients: 1974-2018';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'nutrients-timeseries';

  // Title to display above the plot.
    
  this.title = 'Nutrients: Average household intake of nutrient per year.';

    // Names for each axis.
  this.xAxisLabel = 'year';
  this.yAxisLabel = '%';

  var marginSize = 35;
        
    // Distictively colour each line
  this.color = [];

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    marginSize: marginSize,

    // Margin positions around the plot. Left and bottom have double
    // margin size to make space for axis and tick labels on the canvas.
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize,
    bottomMargin: height - marginSize * 2,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 10,
    numYTickLabels: 8,
  };

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/food/nutrients-1974-2018.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };
  var checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6,checkbox7,checkbox8,checkbox9
  this.setup = function() {
    // Font defaults.
    textSize(16);
    checkbox1 = createCheckbox('Iron', true);
    checkbox1.position(300,550);
      
    checkbox2 = createCheckbox('Niacin equivalent', true);
    checkbox2.position(300,575);  
    
    checkbox3 = createCheckbox('Riboflavin', true);
    checkbox3.position(300,600); 
      
    checkbox4 = createCheckbox('Protein', true);
    checkbox4.position(450,550);   
      
    checkbox5 = createCheckbox('Thiamin', true);
    checkbox5.position(450,575);
      
    checkbox6 = createCheckbox('Vitamin C', true);
    checkbox6.position(450,600);  
      
    checkbox7 = createCheckbox('Calcium', true);
    checkbox7.position(550,550);  
    
    
    checkbox8 = createCheckbox('Vitamin A (retinol equivalent)', true);
    checkbox8.position(550,600);  
      
    checkbox9 = createCheckbox('Energy', true);
    checkbox9.position(550,575);     
    
      
    // Set min and max years: assumes data is sorted by date.
    this.startYear = Number(this.data.columns[1]);
    this.endYear = Number(this.data.columns[this.data.columns.length-1]);
      
    // Generate random colour for each nutrient.
    for (var i = 0; i < this.data.getRowCount(); i++){
        this.color.push(color(random(0, 255),
                        random(0, 255),
                        random(0, 255)))
    }

    // Find min and max percentage for mapping to canvas height.
    this.minPercentages = 80;         // Percentage Range from min-to-max.
    this.maxPercentages = 400;
  };
 

  this.destroy = function() {
      checkbox1.remove();checkbox2.remove();checkbox3.remove();checkbox4.remove();checkbox5.remove();checkbox6.remove();checkbox7.remove();checkbox8.remove();checkbox9.remove();
  };
 
  this.draw = function() {
    background(0, 26, 71);  
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw the title above the plot.
    this.drawTitle();

    // Draw all y-axis labels.
    drawYAxisTickLabels(this.minPercentages,
                        this.maxPercentages,
                        this.layout,
                        this.mapNutrientsToHeight.bind(this),
                        0);

    // Draw x and y axis.
    drawAxis(this.layout);

    // Draw x and y axis labels.
    drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout);

    // Plot all percentages between startYear and endYear using the width
    // of the canvas minus margins.
   
    var numYears = this.endYear - this.startYear;

    // Loop over all rows and draw a line from the previous value to
    // the current.
    for (var i = 0; i < this.data.getRowCount(); i++) {
        
        var row = this.data.getRow(i);
        var previous = null;
        
        //  Labels of each line
        var l = row.getString(0);
        
        for (var j = 1; j < numYears; j++)
        {
            
          // Create an object to store data for the current year.
          var current = {
            // Convert strings to numbers.
              //????
             year: this.startYear + j -1,
             percentage: row.getNum(j)
          };
 
            if (previous != null) {
                // Draw line segment connecting previous year to current
                if(checkbox1.checked() && l==checkbox1.value() || checkbox2.checked() && l==checkbox2.value() || checkbox3.checked() && l==checkbox3.value() || checkbox4.checked() && l==checkbox4.value() || checkbox5.checked() && l==checkbox5.value() || checkbox6.checked() && l==checkbox6.value() || checkbox7.checked() && l==checkbox7.value() || checkbox8.checked() && l==checkbox8.value() || checkbox9.checked() && l==checkbox9.value()){
                    stroke(this.color[i]);
                    strokeWeight(3)
                    line(this.mapYearToWidth(previous.year), 
                         this.mapNutrientsToHeight(previous.percentage),
                         this.mapYearToWidth(current.year),
                         this.mapNutrientsToHeight(current.percentage)
                        );
                }
                


                // The number of x-axis labels to skip so that only
                // numXTickLabels are drawn.
                 var xLabelSkip = ceil((numYears/3)/ this.layout.numXTickLabels);

                // Draw the tick label marking the start of the previous year.
                if (j % xLabelSkip === 0) {
                  drawXAxisTickLabel(previous.year, this.layout,
                                     this.mapYearToWidth.bind(this));
                }
                noStroke();
                fill(this.color[i]);
                textAlign(LEFT);
                if(dist(mouseX,mouseY,this.mapYearToWidth(current.year),this.mapNutrientsToHeight(current.percentage))<=5){
                    fill(0);
                    //text(l+" "+ current.percentage+"%", mouseX+35,mouseY-10);
                    fill(255);
                    text(l+" "+ current.percentage+"%", 800,550);
            
                }
                fill(255,0,0);
                text("Info:", 765,550);
         }

             // Assign current year to previous year so that it is available
             // during the next iteration of this loop to give us the start
             // position of the next line segment.
             previous = current;
       }
    }
  };

  this.drawTitle = function() {
    fill(255);
    noStroke();
    textAlign('center', 'center');

    text(this.title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin - (this.layout.marginSize / 2));
  };

  this.mapYearToWidth = function(value) {
    return map(value,
               this.startYear,
               this.endYear,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
  };

  this.mapNutrientsToHeight = function(value) {
    //???
    return map(value,
               this.minPercentages,
               this.maxPercentages,
               this.layout.bottomMargin, 
               this.layout.topMargin);
  };
}