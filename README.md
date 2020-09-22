----Features Implemented----
Mapping
We implemented data visualisation of earthquake data mapped to the 2D projection of the globe(1). On our mapping, we used data from a live feed, provided by the US geological survey (USGS), pinpointing the longitudes, latitudes and magnitudes of all earthquakes from a specific time-frame. Our extension shows the patterns of recent earthquakes and how they differ in magnitude through the size of the ellipse representing them. 

Another mapping extension was the change in global population(2). This data focuses on population growth by country within a time period which includes future forecasts, 1800 to 2100. This is displayed using colours where lighter colours indicate low population nations and darker colours indicate high population nations. The data which is implemented is provided by ourworldindata.org. The data was then mapped onto a Scalable Vector Graphics (SVG) image where boundaries of countries in the extensible markup language (XML) where stored as country variables; the countries where then given shades depending on their population at a given year. A level of interaction was added to this extension in the form of a slider. This was done through the p5.js function 'createSlider' which creates an <input></input> element using the DOM. 

Interactive Pie Chart
We added an additional pie chart to our data visualization project(3). The data for this pie chart, provided by data.gov.uk, iis formed from answers to a variety of questions gauging the public’s attitudes to UK food. To better visualise the diversity of people's opinion on British foods, we have added several interactive features to this pie chart. A mouse over effect which displays the percentages as the cursor hovers over. In the same time, mouse over effect triggers a popup to each to the section of the pie chart.

Line Graph
We also added two additional line graph data to our data visualization project. One shows the Average household intake of nutrients per year(4), which is plotted on a 2D line graph. The features include checkbox filtering which you can use to focus on certain nutrients over others. Also a mouse over effect which returns the data of nutrients percentage intake of that current year. The aforementioned second line graph one shows every nation's GDP rate of all 195 nations over a time period from 1960 to current(5). 


How We Coordinated Development
Scheduled meetings through Zoom Calls 

How You Structured Your Code
Overall, we used object orientation in the form of constructor functions in separate files

Coding Techniques Used
Modularity 
Object Orientated Programming (OOP)

Challenges Faced
Finding a balance between challenging, stretching extensions that were also practical in execution due to the restrictions of time and experience in data visualisation also, sharing data while making changes.

self-evaluation: what would you do differently next time?
Tell a story with the data we use


----What to look for----
(1)file:earthquake.js name: "Earthquake Data"
(2)file:past-present-future-population.js name: "Population timeline (predictions) 1800-2100"
(3)file:uk-food-attitudes.js name: "UK Food Attitudes 2018"
(4)nutrients-1974-2018.js name: "Nutrients: 1974-2018"
(5)Nation-gdp-graph.js name: "GDP percentage by nation"