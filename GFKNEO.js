 loadCSS = function(href) {
     var cssLink = $("<link rel='stylesheet' type='text/css' media='screen' href='"+href+"'>");
     $("head").append(cssLink); 
 };

 loadJS = function(src) {
     var jsLink = $("<script type='text/javascript' src='"+src+"'>");
     $("head").append(jsLink); 
 }; 
 
 
function GFK_NEO()
{
	$(document).ready(function()
	{
		var file_d3 = "https://rawgithub.com/drrolandwerner/NEO/master/d3.min.js";
		var file_underscore = "https://rawgithub.com/drrolandwerner/NEO/master/underscore-min.js";
		var file_kendo = "http://cdn.kendostatic.com/2014.1.318/js/kendo.all.min.js";
		var file_css_neo = "https://rawgithub.com/drrolandwerner/NEO/master/GFKNEO.css";
		var file_css_kendo_1 = "http://cdn.kendostatic.com/2014.1.318/styles/kendo.common.min.css";
		var file_css_kendo_2 = "http://cdn.kendostatic.com/2014.1.318/styles/kendo.default.min.css";
		var file_css_kendo_3 = "http://cdn.kendostatic.com/2014.1.318/styles/kendo.dataviz.min.css";
		var file_css_kendo_4 = "http://cdn.kendostatic.com/2014.1.318/styles/kendo.dataviz.default.min.css";

		//remove following lines
		/*
		file_d3 = "file://D:\\rdwern\\Documents\\GitHub\\NEO\\d3.min.js";
		file_underscore = "file://D:\\rdwern\\Documents\\GitHub\\NEO\\underscore-min.js";
		file_css_neo = "file://D:\\rdwern\\Documents\\GitHub\\NEO\\GFKNEO.css";
		file_kendo = "file://D:\\rdwern\\Documents\\GitHub\\NEO\\kendo.all.min.js";
		var file_css_kendo_1 = "file://D:\\rdwern\\Documents\\GitHub\\NEO\\kendo.common.min.css";
		var file_css_kendo_2 = "file://D:\\rdwern\\Documents\\GitHub\\NEO\\kendo.default.min.css";
		var file_css_kendo_3 = "file://D:\\rdwern\\Documents\\GitHub\\NEO\\kendo.dataviz.min.css";
		var file_css_kendo_4 = "file://D:\\rdwern\\Documents\\GitHub\\NEO\\kendo.dataviz.default.min.css";
		*/
		// remove previous lines
		
		// Load D3.js library
		$.getScript(file_d3,function()
		{
			// Load underscore.js library
			$.getScript(file_underscore,function()
			{
				// Load KENDO-UI.js library
				$.getScript(file_kendo,function()
				{	
					loadCSS(file_css_neo);
					loadCSS(file_css_kendo_1);
					loadCSS(file_css_kendo_2);
					loadCSS(file_css_kendo_3);
					loadCSS(file_css_kendo_4);
					GFK_NEO_RUN();
				})
			})
		})
		
	
	}); // document ready

}
  
function GFK_NEO_RUN() 
{	
	// Hide all COGNOS lists, COGNOS crosstabs, HTML elements with data
	//$(".ls").hide();
	//$(".xt").hide();
	$("#tsvdata").hide();
	$("#jsondata").hide();
	//kendo.ui.progress($("#loading"), true);

	var color = d3.scale.category20c();
	var jsonHierarchy = new Object();
	var tableData = "[";
	var jsonData = new Object();
	var jsonVisual = new Object();
	
	var toolbar = new Object();
	var sidebar = new Object();
	var myWebix = new Object();

	var gSunburst = new Object();
	var gDataSource = new Object();
	
	var gTotalMarket = new Object();
	var gTotalMarketFiltered = new Object();
	
	/*
	var segment1Val = 2;
	var segment2Val = 1;
	var segment3Val = 1;
	var segment4Val = 1;
	var segment5Val = 1;
	var filter1Val = 1;
	var filter2Val = 1;
	var filter3Val = 1;
	var segment1 = "all";
	var segment2 = "all";
	var segment3 = "all";
	var segment4 = "all";
	var segment5 = "all";
	var filter1 = "";
	var filter2 = "";
	var filter3 = "";
	*/
	
	var gPlay = false;
	
	var featureKeys = new Array();
	
	var country = "Germany";
	var period = "2012-12";
	var brand = "all";
	var kpi = "Units";
	var aggregation = "Total";
	var kpiVal = 1;
	var minShare = 10;
	var	nesting = new Array();;
	var gTimer;
	
	// identify what data is available for analysis
	tsvData = $("#tsvdata"); // embedded tab separated data in HTML file	
	jsonData = $("#jsondata"); // embedded JSON data in HTML file	
	crosstabData = $(".xt"); // embedded Cognos Crosstab in HTML file
	listData = $(".ls"); // embedded Cognos List in HTML file
	
	if (! $.isEmptyObject(tsvData))
	{
		function csvJSON(csv){
			var lines=csv.split("\n");
			var result = [];
			var headers=lines[0].split("\t");
			for(var i=1;i<lines.length-1;i++){
			var obj = {};
			var currentline=lines[i].split("\t");
			for(var j=0;j<headers.length;j++)
			{
				var field = currentline[j];
				if (! $.isEmptyObject(field))
				{
					field = field.replace(/"/g, '');
					field = field.replace(/\\/g, '');
					obj[headers[j]] = field;
				}
			}
				if (obj.Country=="Germany")
					result.push(obj);
			}
			return result; 
		}
		var theTSVData = tsvData.text(); //$("."+theDataID).text();
		jsonData = csvJSON( theTSVData );
		tsvData.remove();
	}
	else if (! $.isEmptyObject(jsonData))
	{
		d3.json(theDataID, function(jsonData) 
		{
			alert("JSON data import not yet implemented");
		})
	}
	else if (! $.isEmptyObject(listData)) // COGNOS list inside HTML
	{
		var json = '{';
			var row = 0;
			var columns = new Array();

		var tbl2 = $(".ls tr").each(function(i)
		{        
			var column = 0;
			var record = "{";
			$(this).find('TD').each(function()
			{
				if (row==0) // header
				{
					columns[column] = $(this).text();
				}
				else // data
				{
					if (column>0) record += ", " ;
					record += '"' + columns[column]  + '":';
					value1 = $(this).text().replace(/"/g, '');	//remove doublequotes
					value = value1.replace(/\\/g, ''); //remove backslashs
					if (columns[column]!='Units' && columns[column]!='Value')
						record += '"' + value + '"';
					else
						record += value;
				}
				column += 1;
			});
			record += "}";
			if (row>0) 
			{
				if (tableData!="[") 
					tableData += ",\n";
					
				tableData += record;
			}
			row += 1;
		});

		tableData += "]";
		jsonData = JSON.parse( tableData );
	}
	
	var month = new Object();
	month['January'] = '01';
	month['February'] = '02';
	month['March'] = '03';
	month['April'] = '04';
	month['May'] = '05';
	month['June'] = '06';
	month['July'] = '07';
	month['August'] = '08';
	month['September'] = '09';
	month['October'] = '10';
	month['November'] = '11';
	month['December'] = '12';

	for( var k = 0; k < jsonData.length; k++ )
	{
		if(jsonData[k]['Period'] !== 'undefined') // $.isEmptyObject(jsonData[k]['Period']))
		{
			oldPeriod = jsonData[k]['Period'].split(" ");
			newPeriod = oldPeriod[1] + "-" + month[oldPeriod[0]];
			jsonData[k]['Period'] = newPeriod ;
			jsonData[k]['Value'] = parseFloat(jsonData[k]['Value']);
			jsonData[k]['Units'] = parseFloat(jsonData[k]['Units']);
			jsonData[k]['Price'] = parseFloat(jsonData[k]['Value']/Math.max(jsonData[k]['Units'],1));
			// Random data generation, to be removed
			jsonData[k]['Growth'] = Math.floor(Math.random() * (10 - -10) + -10);
			jsonData[k]['Stores'] = Math.floor(Math.random() * 10000);			
		}
		else
			delete jsonData[k];
	}
	
	var numRecords = jsonData.length;
	
	
	  var jsonBrands = d3.nest()
      .key(function(d) { return d.Brand; })
      .entries(jsonData);
 
	  var jsonBrandPeriod = d3.nest()
      .key(function(d) { return d.Brand + "/"+ d.Period; })
      .entries(jsonData);
	
	
	  // Compute the overall rate for all data.
	  var overallPrice = d3.sum(jsonData, function(d) {return d.Value;}) / d3.sum(jsonData,function(d) {return d.Value;});

	  // Compute the overall price by brand.
	  jsonBrands.forEach(function(d) {
		d.Price = d3.sum(d.values, function(d) {return d.Value;}) / d3.sum(d.values, function(d) {return d.Value;});
	  });

	  // Sort brands by ascending overall price.
	  jsonBrands.sort(function(a, b) {
		return a.Price - b.price;
	  });

	  // Compute the price for each product.
	  jsonData.forEach(function(d) {
		d.Price = d.Value / Math.max(d.Units,1);
	  });
	
	
	

		

	
	// Build arrays with all members (non KPIS)	
	var segmentFilters = new Object();
	for (var property in jsonData[0])
	{
		var kpiTestArray = ["Units","Value","Price", "Growth", "Stores"];
		if (kpiTestArray.indexOf(property)<0)
		{
			segmentFilters[property] = new Array();
			var segment = _.keys(_.countBy(jsonData, function(jsonData) { return jsonData[property]; }));
			segment.sort();
			for (var index = 0; index < segment.length; ++index)
				segmentFilters[property].push(segment[index]);
		}
	}
	
	var KPIs = new Array("Units","Value","Price", "Growth", "Stores");
	
	featureKeys = new Array();
	countKeys = 1;
	for (var key in jsonData[0])
	{
		if (key !== "Units" && key !== "Value")
		{			
			countKeys += 1;
			featureKeys.push(key);
		}
	}

	//segment1 = featureKeys[segment1Val-1];

	
	var template = kendo.template('<div id="panelBar"></div>');
	$("body").html(template);	//"body"

	var panelBar = $("#panelBar").kendoPanelBar(
	{
		expandMode: "multiple", 
		collapse: function (e)
			{
				if (e.item.innerText.substr(0,9)=="Analytics") e.preventDefault();
			},
		expand: function (e)
			{
				//e.preventDefault();
			},
		animation: {collapse: {duration: 100},expand: {duration: 100}}
	}).data("kendoPanelBar");
	
	panelBar.append(
	[
		{
			text: "<b>Controls</b>",
			expanded: false,
			encoded: false, 
			content: "<div class='panelControls' id='panelControls'></div>"
		},
		{
			text: "<b>Analytics</b>",
			expanded: true,
			encoded: false,                                 
			content: "<div id='loading'></div>\
			<div id='analyticsBreadcrump' class='analyticsBreadcrump'></div>\
			<div id='analyticsChartContainer' class='analyticsChartContainer center'>\
				<div id='analyticsChart' class='analyticsChart  halfcenter'></div>\
			</div></div>"
	   }
	]);
	
	var tabStripControls = $("#panelControls").kendoTabStrip(
	{
		animation: false,
		value: ["Segments"],
	}).data("kendoTabStrip");

	tabStripControls.append(
	[
		{
			text: "Analytics",
			 encoded: false,                            
			content: "KPI: <div id='pcAnalyticsKPI' class='pcDrop'></div><div id='pcAnalyticsKPIAggregation' class='pcDrop'></div> Visualization: <div id='pcAnalyticsVisual' class='pcDrop'></div>"
		},
		{
			text: "Segments",
			encoded: false,                            
			content: "<div id='pcSegments'  class='pcMultiSelect'></div>"
		},
		{
			text: "Groups",
			encoded: false,                            
			content: "<div id='pcSegment1'  class='pcMultiSelect'></div>"
		},		
		{
			text: "Filters",
			 encoded: false,                            
			content: "<div>Country: <div id='pcFilterCountry' class='pcDrop'></div>min. Share: <div id='pcFilterShare' class='pcSlider'></div>Period:<div id='pcFilterPeriod' class='pcDrop'></div><div id='pcFilterPeriodSlider' class='pcSlider'></div><div id='pcFilterPeriodPlay' class='pcButton'></div></div>"
		},
		{
			text: "Data",
			encoded: false,                            
			content: "<div id='pcDownload' class='pcButton'>Export Data...</div>"
		},

	]);
			
	var multiSelectGrouping1 = $("#pcSegment1").kendoMultiSelect(
	{
		animation: false,
		multiple: "multiple",
		maxSelectedItems: 5,
		placeholder: "click to select specific brands...",
		dataSource: segmentFilters["Brand"],
		value: [],
		change: function(e) {setTimeout(function() {toolbarChanged();},50)}
	}).data("kendoMultiSelect");
	
	var multiSelectSegmentation = $("#pcSegments").kendoMultiSelect(
	{
		animation: false,
		multiple: "multiple",
		placeholder: "click to select segmentations...",
		dataSource: featureKeys,
		value: ["Brand"],
		change: function(e) {setTimeout(function() {toolbarChanged();},50)}
	}).data("kendoMultiSelect");

	
	var dropDownFilterCountry = $("#pcFilterCountry").kendoDropDownList(
	{
		animation: false,
		dataSource: segmentFilters["Country"], //filterCountry,
		value: segmentFilters["Country"][0],
		change: function(e) {toolbarChanged();}
	}).data("kendoDropDownList");

	var dropDownFilterPeriod = $("#pcFilterPeriod").kendoDropDownList(
	{
		animation: false,
		dataSource: segmentFilters["Period"], //filterPeriod,
		value: segmentFilters["Period"][0],
		select: function(e)
		{
			dataItem = e.item.index();
			period = e.item.text();
			sliderFilterPeriod.value(dataItem); 
			setTimeout(function() {toolbarChanged();},100);
		}
	}).data("kendoDropDownList");
	
	var sliderFilterShare = $("#pcFilterShare").kendoSlider(
	{
		min: 0,
		max: 10,
		smallStep: 0.1,
		largeStep: 1,
		value: 1,
		showButtons: false,
		slide: function(e) {toolbarChanged();},
		change: function(e) {toolbarChanged();}
	}).data("kendoSlider");

	
	var sliderFilterPeriod = $("#pcFilterPeriodSlider").kendoSlider(
	{
		min: 0,
		max: segmentFilters["Period"].length,
		smallStep: 1,
		largeStep: 1,
		value: 1,
		showButtons: false,
		tickPlacement: "none",
		tooltip: {enabled: false},
		slide: function(e) {dropDownFilterPeriod.select(e.value); toolbarChanged();},
		change: function(e) {dropDownFilterPeriod.select(e.value); toolbarChanged();}
	}).data("kendoSlider");

	var sliderFilterPeriodPlay = $("#pcFilterPeriodPlay").kendoButton(
	{
		icon: "seek-e",
		click: function(e) {
			gPlay = !gPlay; 
			if (gPlay)
				$("#pcFilterPeriodPlay").find(".k-icon").removeClass("k-i-seek-e").addClass("k-i-close");
			else
				$("#pcFilterPeriodPlay").find(".k-icon").removeClass("k-i-close").addClass("k-i-seek-e");
			playPeriods(gPlay);
		}
	}).data("kendoButton");
	
	var dropDownKPI = $("#pcAnalyticsKPI").kendoDropDownList(
	{
		animation: false,
		dataSource: KPIs,
		value: KPIs[0],
		change: function(e) {setTimeout(function() {toolbarChanged();},50)}
	}).data("kendoDropDownList");

	var dropDownKPIAggregation = $("#pcAnalyticsKPIAggregation").kendoDropDownList(
	{
		animation: false,
		dataSource: ["Total","Average", "Count", "Maximum", "Minimum"],
		value: "Total",
		change: function(e) {aggregation = e.value; toolbarChanged();}
	}).data("kendoDropDownList");

	
	var dropDownVisual = $("#pcAnalyticsVisual").kendoDropDownList(
	{
		animation: false,
		dataSource: ["Sunburst","Treemap","Bubble", "Area","Area Stacked","Area 100%", "Columns Stacked","Columns 100%", "Lines", "Lines Stacked"],
		value: "Sunburst",
		change: function(e) {kendo.ui.progress($("#loading"), true); setTimeout(function() {toolbarChanged();},100)}
	}).data("kendoDropDownList");
	
	var downloadButton = $("#pcDownload").kendoButton(
	{
		click: function(e) {alert("Feature not yet implemented");}
	}).data("kendoButton");

	tabStripControls.select(0);    
		
	//MakePivot(jsonData);
	MakeBreadcrump();
	kendo.ui.progress($("#loading"), false);
	toolbarChanged();

	function playPeriods(play)
	{	
		var msDelay = 300;
		var msDelayRepeat = 2000;
		if (play==true)
		{
			 gTimer = setInterval(function(){myTimer()},msDelay);
			function myTimer()
			{
				toolbarChanged();					
				numberPeriods=filterPeriod.length
				currentPeriod = sliderFilterPeriod.value();					
				if (currentPeriod<filterPeriod.length) 
				{
					sliderFilterPeriod.value(currentPeriod+1);
					dropDownFilterPeriod.select(currentPeriod+1);
					clearInterval(gTimer);
					if (gPlay) gTimer = setInterval(function(){myTimer()},msDelay);
				}
				else //last period
				{
					clearInterval(gTimer);
					// continue after wait time
					setTimeout(function()
					{
						sliderFilterPeriod.value(0);
						dropDownFilterPeriod.select(0);
						if (gPlay) gTimer = setInterval(function(){myTimer()},msDelay);
					},2000);
				}
			}
		}
		else
			clearInterval(gTimer);
	}
	
	function toolbarChanged()
	{					
		kendo.ui.progress($("#loading"), true);

		period = dropDownFilterPeriod.value();
		country = dropDownFilterCountry.value();
		minShare = sliderFilterShare.value();
		kpi = dropDownKPI.value();
		aggregation = dropDownKPIAggregation.value();
		brands = multiSelectGrouping1.value();
		visual = dropDownVisual.value();
		
		delete jsonDataFiltered;
		
		jsonDataFiltered = JSON.parse(JSON.stringify(jsonData)); //clone
		if (brands.length > 0)
		{
			for( var k = 0; k < jsonDataFiltered.length; k++ )
			{
				if (brands.indexOf(jsonDataFiltered[k]['Brand']) == -1)
					jsonDataFiltered[k]['Brand'] = " Other" ;
			}
		}	
		
		
		
		if (visual=="Sunburst" || visual=="Treemap")
			jsonDataFiltered = _.filter(jsonDataFiltered, function(record)		
			{ 
				return record.Period == period && record.Country == country;
			});
		
		
		delete gTotalMarket;
		delete gTotalMarketFiltered;
		gTotalMarket = new Object();
		gTotalMarketFiltered = new Object();

		for (var i=0; i<segmentFilters["Period"].length; i++)
		{
			gTotalMarket[segmentFilters["Period"][i]] = 0;
			gTotalMarketFiltered[segmentFilters["Period"][i]] = 0;
		}
		
		for( var j = 0; j < jsonData.length; j++ )
		{
			gTotalMarket[jsonData[j]["Period"]] +=  jsonData[j][kpi];
		}
		
		for( var k = 0; k < jsonDataFiltered.length; k++ )
		{
			gTotalMarketFiltered[jsonDataFiltered[k]["Period"]] +=  jsonDataFiltered[k][kpi];
		}
		
		nesting = multiSelectSegmentation.value();
		var json2 = d3.nest();

			/*
		nesting.forEach(function(key) {
			json2.key(function(d) {return d[key]; }).sortKeys(d3.ascending)
		});
		json2 = json2.rollup(function(d) 
			{
				return {"kpi": d3.sum(d, function(d) {return d[kpi];})}
			});
		jsonVisual = json2.entries(jsonDataFiltered);
		*/
		if (true)
		{
			initializeBreadcrumbTrail();
			d3.select("#analyticsChart").select("svg").remove();
			d3.select("#analyticsChartContainer").select("svg").remove();
			d3.select("#kendoChart").remove();
			
			if (visual=="Sunburst")
				MakeSunburst(jsonDataFiltered);
			else if (visual=="Treemap")
				MakeTreemap(jsonDataFiltered);
			else if (visual=="Bubbles")
				MakeBubbles(jsonDataFiltered);
			else if (visual=="Voronoi")
				MakeVoronoi(jsonDataFiltered);
			else if (visual=="Area")
				MakeChart(jsonDataFiltered,"area","none");
			else if (visual=="Area Stacked")
				MakeChart(jsonDataFiltered,"area","normal");
			else if (visual=="Area 100%")
				MakeChart(jsonDataFiltered,"area","100%");
			else if (visual=="Columns Stacked")
				MakeChart(jsonDataFiltered,"column","normal");
			else if (visual=="Columns 100%")
				MakeChart(jsonDataFiltered,"column","100%");
			else if (visual=="Lines")
				MakeChart(jsonDataFiltered,"line","none");
			else if (visual=="Lines Stacked")
				MakeChart(jsonDataFiltered,"line","normal");
		}
	}

	function reSortRoot(root) {
			for (var key in root)
		{
			if (key == "key")
			{
				root.name = root.key;
				delete root.key;
			}
			else if (key == "values") {
				root.children = [];
				for (item in root.values)
				{
					if (typeof root.values[item] === 'object')
						root.children.push(reSortRoot(root.values[item]));
					root.value = root.values[item];
				}
				delete root.values;
			}
		}
		if (root.children.length == 0)
			delete root.children;

		return root;
	}

	function MakeBreadcrump()
	{

	}

	
	function MakeChart(jsonData,chartType,chartStack)
	{
		//use 1st level of segmentation
		var segment = "Brand";
		if (nesting.length>0) segment = nesting[0];
	
		var aggFunction = "sum";
		if (aggregation=="Total")
				aggFunction = "sum";
		else if (aggregation=="Average")
				aggFunction = "average";
		else if (aggregation=="Maximum")
				aggFunction = "max";
		else if (aggregation=="Minimum")
				aggFunction = "min";
	
		
		//reduce datasets to 1st level of segmentation
		var jsonDataReduced = _.chain(jsonData)
		.groupBy(segment)
		.map(function(value, key) {
			return _.chain(value)
				.groupBy("Period")
				.map(function(value1, period) {
					var data = {					
						'Kpi': aggregate(_.pluck(value1, kpi)),
						'Units': aggregate(_.pluck(value1, "Units")),
						'Value': aggregate(_.pluck(value1, "Value")),
						'Price': aggregate(_.pluck(value1, "Price")),
						'Period': period
					};
					data[segment] = key;
					return data;
				})
				.value();
		})
		.value();
		

		function aggregate(numbers)
		{
			return _.reduce(numbers, function(result, current)
			{
				if (aggregation=="Total")
					return result + parseFloat(current);
				if (aggregation=="Count")
					return result + 1;
				else if (aggregation=="Average")
					return (result+parseFloat(current))/2;
				else if (aggregation=="Maximum")
					return Math.max(result,parseFloat(current));
				else if (aggregation=="Minimum")
				{
				if (parseFloat(current) == 0)
					return result;
				else
					return Math.min(result,parseFloat(current));
				}
				else	
					return result + parseFloat(current);
			}, 0);
		}
		
		var seriesData = [];
		for (i=0;i<jsonDataReduced.length;i++)
		{
			var objectArray = jsonDataReduced[i];
			var data = new Array();
			var name = "";
			//var periodTotal
			for (k=0;k<objectArray.length;k++)
			{
				//translate segment into Others if market share < below min share 
				var value1 = objectArray[k].Kpi;
				var value2 = gTotalMarket[objectArray[k].Period];
				//if ( aggFunction == "sum" && value1 / value2  < minShare/100) objectArray[k][segment] = " Other";
				seriesData.push(objectArray[k]);
			}
		}
	

	
		var minPeriod = period; 
		delete gDataSource;
		gDataSource = new kendo.data.DataSource({
		  data: seriesData, //jsonData
		  group: [{ field: segment, aggregates: [{field: kpi, aggregate: aggFunction}]}],	//"average", "count", "max", "min" and "sum".
		  sort: [{ field: "Period", dir: "asc"}],
		  filter: { field: "Period", operator: "gte", value: minPeriod }
		});

		
		var tooltipObj = {visible: true, template: segment + " #= series.name #<br/>#= category #<br/>#= parseInt(value).toLocaleString() # "+kpi+"<br/>#= kendo.format('{0:P}', percentage)#"}; //template: "#= kendo.format('{0:P}', percentage)#"};
		var chartStackObj = false;
		var valueAxisObj = {line: {visible: false},majorGridLines: {visible: false}, minorGridLines: {visible: false},labels: {format: "{0:n0}"},crosshair: {color: "green",width: 2,visible: false}};
		if (chartStack=="normal")
		{
			chartStackObj = true;
		}
		else if (chartStack=="100%")
		{
			chartStackObj = { type: "100%" };
			valueAxisObj = {line: {visible: false},minorGridLines: {visible: false},labels: {}, min: 0, max: 1,crosshair: {color: "green",width: 2,visible: false}};
		}
			   
		$("#analyticsChartContainer").append("<div id='kendoChart' class='kendoChart'></div>");
		gKendoChart = $("#kendoChart").kendoChart({
			chartArea: {
				border: {width: 0},
				opacity: 0
			},
			plotArea: {
				border: {width: 0}
			},
			legend: {
				visible: false,
				position: "bottom"
			},
			dataSource: gDataSource,
			series: [{
				type: chartType,
				stack: chartStackObj,
				field: kpi,
				categoryField: "Period",
				aggregate: aggFunction,
				style: "smooth",
				line: {style: "smooth"},
				//connectors:{width: 4,color: "red"},
				labels: {visible: false},
				markers: { visible: false}
			}],
			
			valueAxis: valueAxisObj,
			categoryAxis:{
				labels: {rotation: 90},
				majorGridLines: {visible: false},
				majorTicks: {visible: false},
				crosshair: {color: "green",width: 2,visible: false}
				},
											
			tooltip: tooltipObj,
			dataBound: onDb

		});
		function onDb()
		{
			var chart = $("#kendoChart").data("kendoChart");
			var numSeries = chart.options.series.length;
			for (var i=0;i<numSeries; i++)  
				chart.options.series[i].color = color(chart.options.series[i].name); 
			if (numSeries < 10)
				chart.options.legend.visible = true;		
		}
		kendo.ui.progress($("#loading"), false);
	} // MakeChart
	


	function MakeBubbles(jsonData)
	{
		alert("Bubble diagram not yet implemented. Show Sunburst diagram.");
		MakeSunburst(jsonData);
	}
	
	function MakeTreemap(jsonData)
	{
		jsonDataTreemap = jsonData; //JSON.parse(JSON.stringify(jsonData)); 
		kendo.ui.progress($("#loading"), false);

		var totalMarket = d3.sum(jsonDataTreemap, function(d) { return d[kpi]; });
		
		var width = $("#analyticsChartContainer").innerWidth();
		var height = 600; //width/2;	$("#analyticsChartContainer").innerHeigth(); 

		var radius = Math.min(width, height) / 2;

		var json2 = d3.nest();	
		nesting.forEach(function(key) {
			json2.key(function(d) {return d[key]; }).sortKeys(d3.ascending)
		});

		json2 = json2.rollup(function(leaves) 
		{
			if (aggregation=="Total")
				return {"kpi": d3.sum(leaves, function(d) {return d[kpi];})};
			if (aggregation=="Count")
				return {"kpi": leaves.length};
			else if (aggregation=="Maximum")
				return {"kpi": d3.max(leaves, function(d) {return d[kpi];})};
			else if (aggregation=="Minumum")
				return {"kpi": d3.min(leaves, function(d) {return d[kpi];})};
			else if (aggregation=="Average")
				return {"kpi": d3.mean(leaves, function(d) {return d[kpi];})};
		});
		jsonDataTreemap = json2.entries(jsonDataTreemap);


			
	  // Change the key names and children values from D3.nest
		jsonDataTreemap = reSortRoot({key: "Market", values: jsonDataTreemap });	
	
	
		var margin = {top: 20, right: 0, bottom: 0, left: 0},
		formatNumber = d3.format(",d"),
		transitioning;

		
		var x = d3.scale.linear()
			.domain([0, width])
			.range([0, width]);

		var y = d3.scale.linear()
			.domain([0, height])
			.range([0, height]);
		
		var treemap = d3.layout.treemap()		
			.children(function(d, depth) { return depth ? null : d._children; })
			.sort(function(a, b) { return a.value - b.value; }) //{ return a.value - b.value; })
			.ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
			.round(false);

		var svg = d3.select("#analyticsChartContainer").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.bottom + margin.top)
			.style("margin-left", -margin.left + "px")
			.style("margin.right", -margin.right + "px")
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.style("shape-rendering", "crispEdges");

		var grandparent = svg.append("g")
			.attr("class", "tree_grandparent");

		grandparent.append("rect")
			.attr("y", -margin.top)
			.attr("width", width)
			.attr("height", margin.top);

		grandparent.append("text")
			.attr("x", 6)
			.attr("y", 6 - margin.top)
			.attr("dy", ".75em");


		  initialize(jsonDataTreemap);
		  accumulate(jsonDataTreemap);
		  layout(jsonDataTreemap);
		  display(jsonDataTreemap);

		function initialize(root) {
			root.x = root.y = 0;
			root.dx = width;
			root.dy = height;
			root.depth = 0;
		  }

		// Aggregate the values for internal nodes. This is normally done by the
		// treemap layout, but not here because of our custom implementation.
		// We also take a snapshot of the original children (_children) to avoid
		// the children being overwritten when when layout is computed.
		function accumulate(d) {
		return (d._children = d.children)
			? d.value = d.children.reduce(function(p, v) 
			{ 
				return p + accumulate(v); 
			}, 0)
			: d.value;
		}

	  // Compute the treemap layout recursively such that each group of siblings
	  // uses the same size (1×1) rather than the dimensions of the parent cell.
	  // This optimizes the layout for the current zoom state. Note that a wrapper
	  // object is created for the parent node for each group of siblings so that
	  // the parent’s dimensions are not discarded as we recurse. Since each group
	  // of sibling was laid out in 1×1, we must rescale to fit using absolute
	  // coordinates. This lets us use a viewport to zoom.
	  function layout(d) 
	  {
		if (d._children) 
		{
		  treemap.nodes({_children: d._children});
		  d._children.forEach(function(c)
		  {
			c.x = d.x + c.x * d.dx;
			c.y = d.y + c.y * d.dy;
			c.dx *= d.dx;
			c.dy *= d.dy;
			c.parent = d;
				layout(c);
		  });
		}
	  }

	  function display(d) {
		grandparent
			.datum(d.parent)
			.on("click", transition)
		  .select("text")
			.text(name(d));

		var g1 = svg.insert("g", ".grandparent")
			.datum(d)
			.attr("class", "depth");

		var g = g1.selectAll("g")
			.attr("class", "tree_children")
			.data(d._children)
			.style("fill", function(d) {
			  return d.name == 'tree' ? '#fff' : color(d.name); })
			.enter().append("g");
				
		g.filter(function(d)
			{
				if (d.area >= minShare/100)
					return d._children;
				else return null;
			})
			.classed("children", true)
			.on("click", transition)
			.on("contextmenu", contextmenu);
			
		g.selectAll(".child")
			.data(function(d)
			{
				return d._children || [d]; 
			})
		
		.enter().append("rect")
			.attr("fill", function(d,i)
			{
				return color(d.name);
			})
			.attr("class", "tree_child")
			.filter(function(d)
			{
				if (d.area >= minShare/100)
					return d._children || [d];
				else return null;
			})
			.call(rect);

		g.append("rect")
		   .attr("class", "tree_parent")
			.style("fill", function(d) {return d.name == 'tree' ? '#fff' : color(d.name); })
			.on("mouseover", mouseoverTree)
			.on("mouseleave", mouseleaveTree)
			.on("contextmenu", contextmenu)
			.call(rect)
		  .append("title")
			.text(function(d) { return formatNumber(d.value); });

		g.append("text")
		   .attr("class", "tree_text")
		   .attr("dy", ".75em")
			.on("mouseover", mouseoverTree)
			.on("mouseleave", mouseleaveTree)
			.on("contextmenu", contextmenu)
			.text(function(d) { return d.name; })
			.call(text);

		function contextmenu(d)
		{	
			d3.event.preventDefault();
			//open link in Window
			var theSearch = "";
			var sequenceArray = getAncestors(d);
			sequenceArray.forEach(function(entry)
			{
				theSearch += entry.name + " ";
			});
			
			theLinkTarget='http://www.bing.com/search?q=' +theSearch;
			theLinkTarget = encodeURI(theLinkTarget);
			
			$("<div id='firstWindow' />").appendTo("#analyticsBreadcrump").kendoWindow(
			{
			    draggable: true, resizable: true, width: "800px",
				height: "600px", title: "Gfk NEO Search",
				scrollable: false,
				content: theLinkTarget, modal: false, actions: ["Minimize", "Maximize", "Close"]
			});
		}
			
		function mouseoverTree(d)
		{
			d3.select(this).attr("opacity",0.3);
			var sequenceArray = getAncestors(d);
			var percentage = (100 * d.value / totalMarket).toPrecision(3);

			var theString = kpi + ": " + parseInt( d.value ).toLocaleString() + " Abs. Share: " + percentage + "%";
			updateBreadcrumbs(sequenceArray, theString);
		}		

		function mouseleaveTree(d)
		{
			d3.select(this).attr("opacity",1.0);
					  // Hide the breadcrumb trail
			d3.select("#trail")
				  .style("Visibility", "hidden");
		}
		
		function transition(d) {
		  if (transitioning || !d) return;
		  transitioning = true;

		  var g2 = display(d),
			  t1 = g1.transition().duration(750),
			  t2 = g2.transition().duration(750);

		  // Update the domain only after entering new elements.
		  x.domain([d.x, d.x + d.dx]);
		  y.domain([d.y, d.y + d.dy]);

		  // Enable anti-aliasing during the transition.
		  svg.style("shape-rendering", null);

		  // Draw child nodes on top of parent nodes.
		  svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

		  // Fade-in entering text.
		  g2.selectAll("text").style("fill-opacity", 0);

		  // Transition to the new view.
		  t1.selectAll("text").call(text).style("fill-opacity", 0);
		  t2.selectAll("text").call(text).style("fill-opacity", 1);
		  t1.selectAll("rect").call(rect);
		  t2.selectAll("rect").call(rect);

		  // Remove the old node when the transition is finished.
		  t1.remove().each("end", function() {
			svg.style("shape-rendering", "crispEdges");
			transitioning = false;
		  });
		}

		return g;
	  }

		  function text(text) {
			text.attr("x", function(d) { return x(d.x) + 6; })
				.attr("y", function(d) { return y(d.y) + 6; });
		  }

		  function rect(rect) {
			rect.attr("x", function(d) { return x(d.x); })
				.attr("y", function(d) { return y(d.y); })
				.attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
				.attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
		  }

		  function name(d) {
			return d.parent
				? name(d.parent) + "." + d.name
				: d.name;
		}
				
	} // MakeTreemap
	
	function MakeSunburst(jsonData)
	{
		
		jsonDataSunburst = jsonData; //JSON.parse(JSON.stringify(jsonData)); 
		kendo.ui.progress($("#loading"), false);

		var width = 900; //$("#analyticsChart").innerWidth() - 10;
		var height = 600; //width/2;	
		var radius = Math.min(width, height) / 2;

		var json2 = d3.nest();	
		nesting.forEach(function(key) {
			json2.key(function(d) {return d[key]; }).sortKeys(d3.ascending)
		});
			json2 = json2.rollup(function(leaves) 
			{
				if (aggregation=="Total")
					return {"kpi": d3.sum(leaves, function(d) {return d[kpi];})};
				if (aggregation=="Count")
					return {"kpi": leaves.length};
				else if (aggregation=="Maximum")
					return {"kpi": d3.max(leaves, function(d) {return d[kpi];})};
				else if (aggregation=="Minumum")
					return {"kpi": d3.min(leaves, function(d) {return d[kpi];})};
				else if (aggregation=="Average")
					return {"kpi": d3.mean(leaves, function(d) {return d[kpi];})};
			});

		jsonDataSunburst = json2.entries(jsonDataSunburst);
		// Change the key names and children values from D3.nest
		jsonDataSunburst = reSortRoot({key: "Market", values: jsonDataSunburst });	
		x = d3.scale.linear().range([0, 2 * Math.PI]),
		y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
		padding = 10,
		duration = 1000;


		gSunburst = d3.select("#analyticsChart").append("svg")	
			.attr("width", width + padding * 2)
			.attr("height", height + padding * 2)
			.attr("preserveAspectRatio","xMidYMin")
			.append("g")
			.attr("id", "container")
		   .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");
		   
			gSunburst.append("svg:circle")
			  .attr("r", radius)
			  .style("opacity", 0);

			  
		var partition = d3.layout.partition()
			.sort(null)
			.value(function(d) { 
				return d.value;
				});	

		var arc = d3.svg.arc()
			.startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
			.endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
			.innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
			.outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

		// Stash the old values for transition.
		function stash(d) {
		  d.x0 = d.x;
		  d.dx0 = d.dx;
		}
			
		var contextMenuShowing = false;

		var path = new Object();
		var nodes = new Object();
		nodes = partition.nodes(jsonDataSunburst)
			.filter(function(d)
			{
				var minRadians = minShare * 0.01; // 0.005 radians = 0.29 degrees			
				return (d.dx > minRadians);
			});
				
		path = gSunburst.selectAll("path").data(nodes);
		  
		path.enter().append("path")
			.attr("id", function(d, i) { return "path-" + i; })
			.attr("d", arc)
			//.attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
			.attr("fill-rule", "evenodd")
			.style("fill", colour)
			.each(stash)	
			.on("mouseover", mouseover)
			.on("click", click)
			.on("contextmenu", contextmenu);

		d3.select("#container").on("mouseleave", mouseleave);

		var totalSize = path.node().__data__.value;

		var text = gSunburst.selectAll("text").data(nodes);
		var textEnter = text.data(nodes).enter().append("text")
			.style("fill","black") 	
			.text(function(d)
			{
				var dummyText = "";
				if (d.depth==0) dummyText = "100%";
				text = d.name || dummyText;
				if (text.length>10 && d.depth>0) text=text.substr(0,10)+"."; 
				//if (d.outerRadius < 1) text = "";
				return text;
			})	  
			
			.attr("text-anchor", function(d) 
				{
					if (d.depth==0) return "middle";
					return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
				})
			.attr("dy", ".2em")
			.attr("transform", function(d)
			{
				if (d.depth==0) return "";
				var multiline = ((d.name || "").substr(0,20)).split(" ").length > 1,
					angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
					rotate = angle + (multiline ? -.5 : 0);
				return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
			}) 	  
			.on("click", click)
			.on("contextmenu", contextmenu);

				

		function contextmenu(d)
		{	
			d3.event.preventDefault();
			//open link in Window
			var theSearch = "";
			var sequenceArray = getAncestors(d);
			sequenceArray.forEach(function(entry)
			{
				theSearch += entry.name + " ";
			});
			
			theLinkTarget='http://www.bing.com/search?q=' +theSearch;
			theLinkTarget = encodeURI(theLinkTarget);
			
			$("<div id='firstWindow' />").appendTo("#analyticsBreadcrump").kendoWindow(
			{
			    draggable: true, resizable: true, width: "800px",
				height: "600px", title: "Gfk NEO Search",
				scrollable: false,
				content: theLinkTarget, modal: false, actions: ["Minimize", "Maximize", "Close"]
			});
		}

		function click(d)
		{
			path.transition()
			  .duration(duration)
			  .attrTween("d", arcTween(d));

			// Somewhat of a hack as we rely on arcTween updating the scales.
			gSunburst.selectAll("text").data(nodes).style("Visibility", function(e)
			{
			  return isParentOf(d, e) ? null : d3.select(this).style("Visibility");
			})
				.transition()
				.duration(duration)
				.attrTween("text-anchor", function(d)
				{
				  return function()
				  {
					if (d.depth==0) return "middle";	
					return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
				  };
				})
				.attrTween("transform", function(d) {
				  var multiline = ((d.Product || "").substr(0,20)).split(" ").length > 1;
				  return function()
				  {
					if (d.depth==0) return "";			
					var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
						rotate = angle + (multiline ? -.5 : 0);
					return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
				  };
				})
				.style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
				.each("end", function(e) {
				  d3.select(this).style("Visibility", isParentOf(d, e) ? null : "hidden");
				});
		}


		function isParentOf(p, c) {
		  if (p === c) return true;
		  if (p.children) {
			return p.children.some(function(d) {
			  return isParentOf(d, c);
			});
		  }
		  return false;
		}

		function colour(d) {
			
			return color(d.name); //colors[d.depth];
		  
		  if (d.children) {
			// There is a maximum of two children!
			var colours = d.children.map(colour),
				a = d3.hsl(colours[0]),
				b = d3.hsl(colours[1]);
			// L*a*b* might be better here...
			return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
		  }
		  return d.colour || "#fff";
		}

		 // Interpolate the scales!
		function arcTween(d) {
		  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
			  yd = d3.interpolate(y.domain(), [d.y, 1]),
			  yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
		  return function(d, i) {
			return i
				? function(t) { return arc(d); }
				: function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
		  };
		}

		function maxY(d) {
		  return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
		}

		function brightness(rgb) {
		  return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
		}

		// Fade all but the current sequence, and show it in the breadcrumb trail.
		function mouseover(d)
		{		
			if (d.depth>0)
			{
			var percentage = (100 * d.value / path.node().__data__.value).toPrecision(3);
			var percentageRelative = (100 * d.value / d.parent.value).toPrecision(3);  
			var percentageString = "Abs: "+percentage + "% ";
			if (percentage !== percentageRelative) percentageString +=  "Rel: " + percentageRelative + "% "
			var percentageStringLong =  percentageString + kpi + ": " + parseInt( d.value ).toLocaleString();
			}
			else
				var percentageStringLong = "Market: " + parseInt(gTotalMarketFiltered[period]).toLocaleString() +" "+ kpi + " 100%"; 
			
			var sequenceArray = getAncestors(d);
			updateBreadcrumbs(sequenceArray, percentageStringLong);
			  
			// Fade all the segments.
			d3.selectAll("path")
				.style("opacity", 0.3);

			// Then highlight only those that are an ancestor of the current segment.
			gSunburst.selectAll("path")
				.filter(function(node)
					{
						return (sequenceArray.indexOf(node) >= 0);
					})
				.style("opacity", 1);
		}

		// Restore everything to full opacity when moving off the Visualization.
		function mouseleave(d) {	

		// Deactivate all segments during transition.
		  d3.selectAll("path").on("mouseover", null);

		  // Transition each segment to full opacity and then reactivate it.
		  d3.selectAll("path")
			  .transition()
			  .duration(1000)
			  .style("opacity", 1)
			  .each("end", function() {
					  d3.select(this).on("mouseover", mouseover);
					});
			/*
		  d3.select("#explanation")
			  .transition()
			  .duration(1000)
			  .style("Visibility", "hidden");
			  */
		}
	} //MakeSunburst

	
	function MakeVoronoi(jsonData)
	{
		jsonDataVoronoi = jsonData;  
		
		var segment = "Brand";
		if (nesting.length>0) segment = nesting[0];

				//reduce datasets to 1st level of segmentation
		var jsonDataReduced = _.chain(jsonData)
		.groupBy(segment)
		.map(function(value, key) {
			return _.chain(value)
				.groupBy("Period")
				.map(function(value1, period) {
					var data = {					
						'Kpi': aggregate(_.pluck(value1, kpi)),
						'Units': aggregate(_.pluck(value1, "Units")),
						'Value': aggregate(_.pluck(value1, "Value")),
						'Price': aggregate(_.pluck(value1, "Price")),
						'Growth': aggregate(_.pluck(value1, "Growth")),
						'Stores': aggregate(_.pluck(value1, "Stores")),
						'cx': 20,
						'cy': 50,
						'x': 10,
						'y': 40,						
						'Period': period
					};
					data[segment] = key;
					return data;
				})
				.value();
		})
		.value();
		

		function aggregate(numbers)
		{
			return _.reduce(numbers, function(result, current)
			{
				if (aggregation=="Total")
					return result + parseFloat(current);
				if (aggregation=="Count")
					return result + 1;
				else if (aggregation=="Average")
					return (result+parseFloat(current))/2;
				else if (aggregation=="Maximum")
					return Math.max(result,parseFloat(current));
				else if (aggregation=="Minimum")
				{
				if (parseFloat(current) == 0)
					return result;
				else
					return Math.min(result,parseFloat(current));
				}
				else	
					return result + parseFloat(current);
			}, 0);
		}
		
		var seriesData = [];
		for (i=0;i<jsonDataReduced.length;i++)
		{
			var objectArray = jsonDataReduced[i];
			var data = new Array();
			var name = "";
			for (k=0;k<objectArray.length;k++)
			{
				//translate segment into Others if market share < below min share 
				var value1 = objectArray[k].Kpi;
				var value2 = gTotalMarket[objectArray[k].Period];
				seriesData.push(objectArray[k]);
			}
		}
		
		
	jsonDataVoronoi = seriesData;	
	
	
	var margin = {top: 20, right: 95, bottom: 10, left: 125},
    width = 970 - margin.left - margin.right,
    height,
    tickExtension = 20; // extend grid lines beyond scale range

	var formatPercent = d3.format(".0%"),
		formatTenthPercent = d3.format(".1%"),
		formatNumber = d3.format(",.3s"),
		formatDollars = function(d) { return (d < 0 ? "-" : "") + "$" + formatNumber(Math.abs(d)).replace(/G$/, "B"); };

	var nameAll = "Brands and Products";

	var x = d3.scale.linear()
		.domain([0, .6])
		.rangeRound([0, width - 60])
		.clamp(true)
		.nice();

	var y = d3.scale.ordinal();

	var y0 = d3.scale.ordinal()
		.domain([nameAll])
		.range([150]);

	var r = d3.scale.sqrt()
		.domain([0, 1e9])
		.range([0, 1]);

	var z = d3.scale.threshold()
		.domain([.1, .2, .3, .4, .5])
		.range(["#b35806", "#f1a340", "#fee0b6", "#d8daeb", "#998ec3", "#542788"].reverse());

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("top")
		.ticks(5)
		.tickFormat(formatPercent);

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickSize(-width + 60 - tickExtension * 2, 0)
		.tickPadding(6);

	var quadtree = d3.geom.quadtree()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });


	var svg = d3.select("#analyticsChart").append("svg")
		.attr("height", 420 + margin.top + margin.bottom)
		.attr("width", width + margin.left + margin.right)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.select("#analyticsChart").append("svg")
		.style("margin-top", "20px")
		.attr("height", 80)
		.attr("width", width + margin.left + margin.right)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call(renderChartKey);

	var gx = svg.append("g")
		.attr("class", "g-x g-axis")
		.call(xAxis);

	var tickLast = gx.selectAll(".g-x .tick:last-of-type");

	tickLast.select("text")
		.text(function() { return "\u2265 " + this.textContent; });

	tickLast.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
		.attr("transform", "translate(" + width + ",0)")
	  .select("text")
		.text("N.A.");

	var titleX = gx.append("text")
		.attr("class", "g-title")
		.attr("y", -9)
		.style("text-anchor", "end");

	titleX.append("tspan")
		.attr("x", -20)
		.style("font-weight", "bold")
		.text("Effective tax rate");

	titleX.append("tspan")
		.attr("x", -20)
		.attr("dy", "1em")
		.text("2007-12");

	
		
	var jsonBrands = d3.nest()
		  .key(function(d) { return d.Brand; })
		  .entries(jsonDataVoronoi);
 
 
	  var jsonBrandPeriod = d3.nest()
      .key(function(d) { return d.Brand + "/"+ d.Period; })
      .entries(jsonDataVoronoi);
	
	
	  // Compute the overall rate for all data.
	  var overallPrice = d3.sum(jsonDataVoronoi, function(d) {return d.Value;}) / d3.sum(jsonDataVoronoi,function(d) {return d.Units;});

	  // Compute the overall price by brand.
	  jsonBrands.forEach(function(d) {
		d.Price = d3.sum(d.values, function(d) {return d.Value;}) / d3.sum(d.values, function(d) {return d.Units;});
	  });

	  // Sort brands by ascending overall price.
	  jsonBrands.sort(function(a, b) {
		return a.price - b.price;
	  });

	  // Compute the price for each product.
	  jsonData.forEach(function(d) {
		d.Price = d.Value / d.Units;
	  });
	
	
	height = 120 * jsonBrands.length;

	y.domain(jsonBrands.map(function(d)
	{
		return d.key;
	}));
	  
	y.rangePoints([10, height], 1);

	svg.append("g")
	  .attr("class", "g-y g-axis g-y-axis-brand")
	  .attr("transform", "translate(-" + tickExtension + ",0)")
	  .call(yAxis.scale(y))
	  .call(yAxisWrap)
	  .style("stroke-opacity", 0)
	  .style("fill-opacity", 0)
	.selectAll(".tick text,.tick tspan")
	  .attr("x", -95)
	  .style("text-anchor", "start");

	svg.append("g")
	  .attr("class", "g-y g-axis g-y-axis-overall")
	  .attr("transform", "translate(-" + tickExtension + ",0)")
	  .call(yAxis.scale(y0))
	  .call(yAxisWrap);

	var productClip = svg.append("defs").selectAll("clipPath")
		.data(jsonDataVoronoi)
		.enter().append("clipPath")
		  .attr("id", function(d, i) { return "g-clip-product-" + i; })
		.append("circle")
		  .attr("cx", function(d) { 
			return d.cx; 
			})
		  .attr("cy", function(d) {
			return 0 + d.cy - y0(nameAll); 
		  })
		  .attr("r", function(d) {
				rValue = r(d.Units) + 20;
				//rValue = 10;
			return rValue;
			});

	var gVoronoi = svg.append("g")
	  .attr("class", "g-voronoi")

	gVoronoi.selectAll("path")
	  .data(jsonDataVoronoi)
	.enter().append("path")
	  .attr("clip-path", function(d, i) { return "url(#g-clip-product-" + i + ")"; })
	  .on("mouseover", mouseover)
	  .on("mouseout", mouseout);

	gVoronoi.call(updateVoronoi,
	  function(d) { return 
		d.cx;
		},
	  function(d) { return 
		d.cy + y0(nameAll);
		},
	  420);

  var brand = svg.append("g")
      .attr("class", "g-brand")
    .selectAll("g")
      .data(jsonBrands)
    .enter().append("g")
      .attr("transform", function(d) { 
		return "translate(0," + y(d.key) + ")";
		});

  var brandNote = d3.select(".g-brand-notes")
      .style("opacity", 0)
      .style("display", "none")
    .selectAll("div")
      .data(jsonBrands)
    .enter().append("div")
      .attr("class", "g-brand-note")
      .style("top", function(d) { return y(d.key) + "px"; })
      .html(function(d) { return brandNoteByName[d.key]; });

  var brandproduct = brand.append("g")
      .attr("class", "g-brand-product")
    .selectAll("circle")
      .data(function(d) {
		return d.values;
		})
    .enter().append("circle")
      .attr("cx", function(d) { 
		return d.cx; 
		})
      .attr("cy", function(d) {
		return d.cy - y(d.Brand) + y0(nameAll); 
		})
      .attr("cy", function(d) { 
		return d.cy + y0(nameAll); 
		})
      .attr("r", function(d) { 
		rValue = r(d.Units);
		rValue = 20;
		return rValue;
		})
      .style("fill", function(d) { return isNaN(d.Growth) ? null : z(d.Growth); })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  var brandOverall = brand.append("g")
      .attr("class", "g-overall")
      //.attr("transform", function(d) { return "translate(" + x(d.Growth) + "," + (y0(nameAll) - y(d.key)) + ")"; })
      .attr("transform", function(d) {
		rValue =  "translate(" + 25 + "," + (y0(nameAll) - y(d.key)) + ")"; 
		return rValue;
		})
      .style("stroke-opacity", 0)
      .style("fill-opacity", 0);

  brandOverall.append("line")
      .attr("y1", -100)
      .attr("y2", +127);

  var brandOverallText = brandOverall.append("text")
      .attr("y", -106);

  brandOverallText.append("tspan")
      .attr("x", 0)
      .text(function(d) { return formatPercent(d.Growth); });

  brandOverallText.filter(function(d, i) { return !i; }).append("tspan")
      .attr("x", 0)
      .attr("dy", "-11")
      .style("font-size", "8px")
      .text("OVERALL");

  var overall = svg.append("g")
      .attr("class", "g-overall g-overall-all")
      //.attr("transform", "translate(" + 20 + "," + y0(nameAll) + ")");
     .attr("transform", "translate(" + x(jsonBrandPeriod) + "," + y0(nameAll) + ")");

  overall.append("line")
      .attr("y1", -100)
      .attr("y2", +127);

  var overallText = overall.append("text")
      .attr("y", -106)
      .style("font-weight", "bold");

  overallText.append("tspan")
      .attr("x", 0)
      .style("font-size", "13px")
      .text(formatTenthPercent(jsonBrandPeriod));

  overallText.append("tspan")
      .attr("x", 0)
      .attr("dy", "-14")
      .style("font-size", "8px")
      .text("OVERALL");

  var currentView = "overall";

  d3.selectAll(".g-content button[data-view]")
      .datum(function(d) { return this.getAttribute("data-view"); })
      .on("click", transitionView);

  var searchInput = d3.select(".g-search input")
      .on("keyup", keyuped);

  var searchClear = d3.select(".g-search .g-search-clear")
      .on("click", function() {
        searchInput.property("value", "").node().blur();
        search();
      });

  var tip = d3.select(".g-tip");

  var tipMetric = tip.selectAll(".g-tip-metric")
      .datum(function() { return this.getAttribute("data-name"); });

  d3.selectAll(".g-annotations b,.g-brand-notes b")
      .datum(function() { return new RegExp("\\b" + d3.requote(this.textContent), "i"); })
      .on("mouseover", mouseoverAnnotation)
      .on("mouseout", mouseout);

  function keyuped() {
    if (d3.event.keyCode === 27) {
      this.value = "";
      this.blur();
    }
    search(this.value.trim());
  }

  function search(value) {
    if (value) {
      var re = new RegExp("\\b" + d3.requote(value), "i");
      svg.classed("g-searching", true);
      brandproduct.classed("g-match", function(d) { return re.test(d.Product) || re.test(d.brand) || (d.symbol && re.test(d.symbol)) || (d.alias && re.test(d.alias)); });
      var matches = d3.selectAll(".g-match");
      if (matches[0].length === 1) mouseover(matches.datum());
      else mouseout();
      searchClear.style("display", null);
    } else {
      mouseout();
      svg.classed("g-searching", false);
      brandproduct.classed("g-match", false);
      searchClear.style("display", "none");
    }
  }

  function transitionView(view) {
    if (currentView === view) view = view === "overall" ? "brand" : "overall";
    d3.selectAll(".g-buttons button[data-view]").classed("g-active", function(v) { return v === view; })
    switch (currentView = view) {
      case "overall": return void transitionOverall();
      case "brand": return void transitionbrand();
    }
  }

  function transitionOverall() {
    gVoronoi.style("display", "none");

    var transition = d3.transition()
        .duration(750);

    transition.select("svg")
        .delay(720)
        .attr("height", 420 + margin.top + margin.bottom)
        .each("end", function() {
          gVoronoi.call(updateVoronoi,
            function(d) { 
				return d.cx;
				},
            function(d) {
				return d.cy + y0(nameAll); 
				},
            420);
        });

    transition.select(".g-annotations-overall")
        .each("start", function() { this.style.display = "block"; })
        .style("opacity", 1);

    transition.select(".g-brand-notes")
        .style("opacity", 0)
        .each("end", function() { this.style.display = "none"; });

    transition.selectAll(".g-y-axis-brand")
        .style("stroke-opacity", 0)
        .style("fill-opacity", 0);

    transition.selectAll(".g-y-axis-overall")
        .style("stroke-opacity", 1)
        .style("fill-opacity", 1);

    var transitionOverall = transition.select(".g-overall-all")
        .delay(x(jsonBrandPeriod))
        .style("stroke-opacity", 1)
        .style("fill-opacity", 1);

    transitionOverall.select("line")
        .attr("y2", +127);

    transitionOverall.select("text")
        .attr("y", -106);

    var transitionbrandOverall = transition.selectAll(".g-brand .g-overall")
        .delay(function(d) { return x(d.Growth); })
        .attr("transform", function(d) { 
			return "translate(" + x(d.Growth) + "," + (y0(nameAll) - y(d.key)) + ")"; 
			//return "translate(" + 20 + "," + (y0(nameAll) - y(d.key)) + ")"; 
			})
        .style("stroke-opacity", 0)
        .style("fill-opacity", 0);

    transitionbrandOverall.select("line")
        .attr("y1", -100)
        .attr("y2", +127);

    transitionbrandOverall.select("text")
        .attr("y", -106);

    transition.selectAll(".g-brand-product circle")
        .delay(function(d) { return d.cx; })
        .attr("cx", function(d) { 
			return d.cx; 
			})
        .attr("cy", function(d) { 
			return d.cy - y(d.Brand) + y0(nameAll); 
			});
  }

  function transitionbrand() {
    gVoronoi.style("display", "none");

    var transition = d3.transition()
        .duration(750);

    transition.select("svg")
        .attr("height", height + margin.top + margin.bottom)
      .transition()
        .delay(720)
        .each("end", function() {
          gVoronoi.call(updateVoronoi,
            function(d) { 
				return d.x; 
				},
            function(d) { 
				return y(d.Brand) + d.y; 
				},
            height);
        });

    transition.select(".g-annotations-overall")
        .style("opacity", 0)
        .each("end", function() { this.style.display = "none"; });

    transition.select(".g-brand-notes")
        .delay(250)
        .each("start", function() { this.style.display = "block"; })
        .style("opacity", 1);

    transition.selectAll(".g-y-axis-brand,.g-brand-note")
        .delay(250)
        .style("stroke-opacity", 1)
        .style("fill-opacity", 1);

    transition.selectAll(".g-y-axis-overall")
        .style("stroke-opacity", 0)
        .style("fill-opacity", 0);

    var transitionOverall = transition.select(".g-overall-all")
        .delay(x(jsonBrandPeriod))
        .style("stroke-opacity", 0)
        .style("fill-opacity", 0);

    transitionOverall.select("line")
        .attr("y2", height - y0(nameAll));
//        .attr("y2", height);

    var transitionbrandOverall = transition.selectAll(".g-brand .g-overall")
        .delay(function(d) { return x(d.Growth); })
        .attr("transform", function(d) { return "translate(" + x(d.Growth) + ",0)"; })
        .style("stroke-opacity", 1)
        .style("fill-opacity", 1);

    transitionbrandOverall.select("line")
        .attr("y1", -25)
        .attr("y2", +25);

    transitionbrandOverall.select("text")
        .attr("y", -31);

    transition.selectAll(".g-brand-product circle")
        .delay(function(d) { return d.x; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function updateVoronoi(gVoronoi, x, y, height) {
    productClip
        .attr("cx", x)
        .attr("cy", y);

    gVoronoi
        .style("display", null)
      .selectAll("path")
        .data(d3.geom.voronoi().x(x).y(y)(jsonDataVoronoi))
        .attr("d", function(d)
		{
			var rValue = "M" + d.join("L") + "Z"; 
			return rValue;
		})
        .datum(function(d) {
			return d.point;
			});
  }

  function mouseoverAnnotation(re) {
    var matches = brandproduct.filter(function(d) { return re.test(d.Product) || re.test(d.alias); }).classed("g-active", true);
    if (d3.sum(matches, function(d) { return d.length; }) === 1) mouseover(matches.datum());
    else tip.style("display", "none");
  }

  function mouseover(d) {
    brandproduct.filter(function(c) { return c === d; }).classed("g-active", true);

    var dx, dy;
    if (currentView === "overall") 
		dx = d.cx, dy = d.cy + y0(nameAll);
    else
		dx = d.x, dy = d.y + y(d.Brand);
    dy -= 19, dx += 50; // margin fudge factors

    tip.style("display", null)
        .style("top", (dy - r(d.Units)) + "px")
        .style("left", dx + "px");

    tip.select(".g-tip-title")
        .text(d.Product);

    tipMetric.select(".g-tip-metric-value").text(function(name) {
      switch (name) {
        case "Growth": return isNaN(d.Growth) ? "N.A." : formatPercent(d.Growth);
        case "taxes": return formatDollars(d.taxes);
        case "earnings": return formatDollars(d.earnings);
      }
    });
  }

  function mouseout() {
    tip.style("display", "none");
    brandproduct.filter(".g-active").classed("g-active", false);
  }
  
	function renderChartKey(g) {
	var formatPercent = d3.format(".0%"),
      formatNumber = d3.format(".0f");

  // A position encoding for the key only.
  var x = d3.scale.linear()
      .domain([0, .6])
      .range([0, 240]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(13)
      .tickValues(z.domain())
      .tickFormat(function(d) { return d === .5 ? formatPercent(d) : formatNumber(100 * d); });

  g.append("text")
      .attr("x", -25)
      .style("text-anchor", "end")
      .style("font", "bold 9px sans-serif")
      .text("CHART KEY");

  var gColor = g.append("g")
      .attr("class", "g-key-color")
      .attr("transform", "translate(140,-7)");

  gColor.selectAll("rect")
      .data(z.range().map(function(d, i) {
        return {
          x0: i ? x(z.domain()[i - 1]) : x.range()[0],
          x1: i < 4 ? x(z.domain()[i]) : x.range()[1],
          z: d
        };
      }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", function(d) { return d.x0; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .style("fill", function(d) { return d.z; });

  gColor.call(xAxis);

  var gColorText = g.append("text")
      .attr("x", 140 - 6)
      .style("text-anchor", "end");

  gColorText.append("tspan")
      .style("font-weight", "bold")
      .text("Color");

  gColorText.append("tspan")
      .style("fill", "#777")
      .text(" shows effective growth");

  var gSize = g.append("g")
      .attr("class", "g-key-size")
      .attr("transform", "translate(580,-7)");

  var gSizeInstance = gSize.selectAll("g")
      .data([1e9, 10e9, 50e9, 100e9])
    .enter().append("g")
      .attr("class", "g-brand");

  gSizeInstance.append("circle")
    .attr("r", r);

  gSizeInstance.append("text")
      .attr("x", function(d) { return r(d) + 4; })
      .attr("dy", ".35em")
      .text(function(d) { return "$" + Math.round(d / 1e9) + "B"; });

  var gSizeX = 0;

  gSizeInstance.attr("transform", function() {
    var t = "translate(" + gSizeX + ",3)";
    gSizeX += this.getBBox().width + 15;
    return t;
  });

  var gSizeText = g.append("text")
      .attr("x", 580 - 10)
      .style("text-anchor", "end");

  gSizeText.append("tspan")
      .style("font-weight", "bold")
      .text("Size");

  gSizeText.append("tspan")
      .style("fill", "#777")
      .text(" shows market capitalization");
}

	function yAxisWrap(g) {
	  g.selectAll(".tick text")
		.filter(function(d) { return /[ ]/.test(d) && this.getComputedTextLength() > margin.left - tickExtension - 10; })
		  .attr("dy", null)
		  .each(function(d) {
			d3.select(this).text(null).selectAll("tspan")
				.data(d.split(" "))
			  .enter().append("tspan")
				.attr("x", this.getAttribute("x"))
				.attr("dy", function(d, i) { return (i * 1.35 - .35) + "em"; })
				.text(function(d) { return d; });
		  });
	}

	function taxes(d) {
	  return d.taxes;
	}

	function earnings(d) {
	  return d.earnings;
	}

	function rate(taxes, earnings) {
	  return earnings <= 0 ? NaN : taxes / earnings;
	}

	function type(d) {
	  d.x = +d.x;
	  d.y = +d.y;
	  d.cx = +d.cx;
	  d.cy = +d.cy;
	  d.taxes *= 1e6;
	  d.earnings *= 1e6;
	  d.capitalization *= 1e6;
	  return d;
	}	
			
			
  }  // MakeVoronoi
	
	

	
	// Group of helper functions starts here
	
	// nodes, highest first, but excluding the root.
	function getAncestors(node) {
	  var path = [];
	  var current = node;
	  while (current.parent) {
		path.unshift(current);
		current = current.parent;
	  }
	  return path;
	}
	
	function updateSequence(d,total)
	{

	}
		
	function initializeBreadcrumbTrail() {
	  // Add the svg area.
	  d3.select("#analyticsBreadcrump").select("svg").remove();

	  var trail = d3.select("#analyticsBreadcrump").append("svg:svg")
		  //.attr("width", 400)
		  //.attr("height", 50)
		  .attr("id", "trail");
	  // Add the label at the end, for the percentage.
	  trail.append("svg:text")
		.attr("id", "endlabel")
		.style("fill", "#000");
	}

	// Generate a string that describes the points of a breadcrumb polygon.
	function breadcrumbPoints(d, i) {
		var points = [];
		var bread = {w: 75, h: 30, s: 3, t: 10};

	  points.push("0,0");
	  points.push(bread.w + ",0");
	  points.push(bread.w + bread.t + "," + (bread.h / 2));
	  points.push(bread.w + "," + bread.h);
	  points.push("0," + bread.h);
	  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
		points.push(bread.t + "," + (bread.h / 2));
	  }
	  return points.join(" ");
	}

	// Update the breadcrumb trail to show the current sequence and percentage.
	function updateBreadcrumbs(nodeArray, percentageString) {
		var bread = {w: 75, h: 30, s: 3, t: 10};

		// Data join; key function combines name and depth (= position in sequence).
		var g = d3.select("#trail")
		  .selectAll("g")
		  .data(nodeArray, function(d) { return d.name + d.depth; });

		// Add breadcrumb and label for entering nodes.
		var entering = g.enter().append("svg:g");

		entering.append("svg:polygon")
		  .attr("points", breadcrumbPoints)
		  .style("fill", function(d) { return color(d.name);});// colors[d.depth]; });

		entering.append("svg:text")
		  .attr("x", (bread.w + bread.t) / 2)
		  .attr("y", bread.h / 2)
		  .attr("dy", "0.35em")
		  .attr("text-anchor", "middle")
		  .text(function(d) {
			return (d.name || "").substr(0,10) || "all";
			});

		// Set position for entering and updating nodes.
		g.attr("transform", function(d, i) {
		return "translate(" + i * (bread.w + bread.s) + ", 0)";
		});

		// Remove exiting nodes.
		g.exit().remove();

		// Now move and update the percentage at the end.
		d3.select("#trail").select("#endlabel")
		  .attr("x", (nodeArray.length + 0.2) * (bread.w + bread.s))
		  .attr("y", bread.h / 2)
		  .attr("dy", "0.35em")
		  .attr("text-anchor", "left")
		  .text(percentageString);

		// Make the breadcrumb trail visible, if it's hidden.
		d3.select("#trail").style("Visibility", "");
	  
		// update links
			
		var theSearch = "";
		nodeArray.forEach(function(entry)
		{
			theSearch += entry.name + " ";
		});
		theLinkTarget='http://www.google.com/search?q=' +theSearch;
		theLinkTarget = encodeURI(theLinkTarget);
		theLink = "<a href=" + theLinkTarget +">Search...</a>"; 
		//$$("D3Link").setValue(theLink);
	} // update breadcrumps
	
	
}
