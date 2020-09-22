function UKFoodAttitudes() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'UK Food Attitudes 2018';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'uk-food-attitudes';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/food/attitudes-to-food.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
     this.select = createSelect();

    // Set select position.
    // ???
      this.select.position(width/3, 520);

    // Fill the options with all company names.
    for (var i = 0; i < this.data.getColumnCount(); i++){
        this.select.option(this.data.columns[i]);
    }
        
  };
    
    
    this.destroy = function() {
    this.select.remove();
  };

  // Create a new pie chart object.
  
  
    
  var values={
      x:width / 2,
      y:height / 2,
      diameter:width * 0.4
  }
  this.pie = new PieChart(values.x, values.y, values.diameter);
  this.draw = function() {
    background(0, 26, 71);
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the percentageof the company we're interested in from the
    // select item.
    // Use a temporary hard-code example for now.
    var questionType = this.select.value();

    // Get the column of raw data for questionType.
    var col = this.data.getColumn(questionType);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = ['green', '#00ff00', 'yellow', 'orange', 'red'];

    // Make a title.
    var title = 'Question: ' + questionType;

    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
    
    var index;
    // Conditions to display the percentages for specific colours (using the 'get' function)
      //RED
    if (get(mouseX, mouseY)[0] == 255 &&
        get(mouseX, mouseY)[1] == 0 &&
        get(mouseX, mouseY)[2] == 0){
        var percentage= (floor(parseFloat(col[4]) * 100) + "%");
        index=4;  
        
    }
      
     //ORANGE
   if  (get(mouseX, mouseY)[0] == 255 &&
        get(mouseX, mouseY)[1] == 165 &&
        get(mouseX, mouseY)[2] == 0){
        var percentage= (floor(parseFloat(col[3]) * 100) + "%");
        index=3;
   }
      
      //YELLOW
   if  (get(mouseX, mouseY)[0] == 255 &&
        get(mouseX, mouseY)[1] == 255 &&
        get(mouseX, mouseY)[2] == 0){
        var percentage=(floor(parseFloat(col[2]) * 100) + "%");
        index=2;
   }
          //Light Green
   if  (get(mouseX, mouseY)[0] == 0 &&
        get(mouseX, mouseY)[1] == 255 &&
        get(mouseX, mouseY)[2] == 0){
        var percentage= (floor(parseFloat(col[1]) * 100) + "%");
        index=1;
   }
      
          //Dark GREEN
   if  (get(mouseX, mouseY)[0] == 0 &&
        get(mouseX, mouseY)[1] == 128 &&
        get(mouseX, mouseY)[2] == 0){
        var percentage= (floor(parseFloat(col[0]) * 100) + "%");
        index=0;
   }
      this.pie.popup(index,col,colours[index]);
      fill(0);
      text(percentage, mouseX+40, mouseY);
  };
}
