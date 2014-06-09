 loadCSS = function(href) {
     var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
     $("head").append(cssLink); 
 };

 loadJS = function(src) {
     var jsLink = $("<script type='text/javascript' src='"+src+"'>");
     $("head").append(jsLink); 
 }; 
 
 

function GFK_NEO(theDataType, theDataID)
{
	$(document).ready(function()
	{
		$.get("file://D:\rdwern\Documents\GitHub\NEO\d3.min.js")
			.pipe($.get("file://D:\rdwern\Documents\GitHub\NEO\d3.min.js"))
			.pipe($.get("http://cdn.kendostatic.com/2014.1.318/js/kendo.all.min.js", {}, function()
			{
				GFK_NEO_RUN(theDataType, theDataID);
			}));
	}); // document ready
/*
		// Load D3.js library
		$.getScript("file://D:\rdwern\Documents\GitHub\NEO\d3.min.js",function()
		{
			// Load underscore.js library
			$.getScript("file://D:\rdwern\Documents\GitHub\NEO\d3.min.js",function()
			{
				// Load KENDO-UI.js library
				$.getScript("http://cdn.kendostatic.com/2014.1.318/js/kendo.all.min.js",function()
				{	
					GFK_NEO_RUN(theDataType, theDataID);
				})
			})
		})
		
*/		

}
  
function GFK_NEO_RUN(theDataType, theDataID) 
{	
	// Hide all COGNOS lists, COGNOS crosstabs, HTML elements with data
	$(".ls").hide();
	$(".xt").hide();
	$("."+theDataID).hide();
	
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
	
	var gTotalMarket = 0;
	var gTotalMarketFiltered = 0;
	
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
	
	var gPlay = false;
	
	var featureKeys = new Array();
	
	var country = "Germany";
	var period = "2012-12";
	var brand = "all";
	var kpi = "Units";
	var kpiVal = 1;
	var minShare = 10;
	var	nesting = new Array();;
	var gTimer;
	
	if (theDataType=="html_ls") // COGNOS list inside HTML
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
	else if (theDataType=="html_csv")
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
				var field = currentline[j].replace(/"/g, '');
				field = field.replace(/\\/g, '');
				obj[headers[j]] = field;
			}
				if (obj.Country=="Germany")
					result.push(obj);
			}
			return result; 
		}
		var theCSVData = $("."+theDataID).text();
		jsonData = csvJSON( theCSVData );
		$("."+theDataID).remove();
	}
	else if (theDataType=="file_json")
	{
		d3.json(theDataID, function(jsonData) 
		{
		})
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
		}
		else
			delete jsonData[k];
	}
	
	var numRecords = jsonData.length;
	
	
	var filterPeriod = new Array();
	var periods = _.keys(_.countBy(jsonData, function(jsonData) { return jsonData.Period; }));		
	periods.sort();
	for (var index = 0; index < periods.length; ++index)
		filterPeriod.push(periods[index]);

	var filterCountry = new Array();
	var countries = _.keys(_.countBy(jsonData, function(jsonData) { return jsonData.Country; }));
	countries.sort();
	for (var index = 0; index < countries.length; ++index)
		filterCountry.push(countries[index]);
		
	var filterBrand = new Array();
	
	var brands = _.keys(_.countBy(jsonData, function(jsonData) { return jsonData.Brand; }));
	brands.sort();
	for (var index = 0; index < brands.length; ++index)
		filterBrand.push(brands[index]);
	
	var KPIs = new Array("Units","Value");
	
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

	segment1 = featureKeys[segment1Val-1];

	
	var template = kendo.template('<div id="panelBar"></div>');
	$(document).html(template);	//"body"

	var panelBar = $("#panelBar").kendoPanelBar(
	{
		expandMode: "multiple", 
		animation: {collapse: {duration: 0},expand: {duration: 0}}
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
			content: "<div id='loading'></div><div class='k-content' id='panelAnalytics'><div id='analyticsBreadcrump'></div><div id='analyticsChart'></div></div>"
	   }
	]);
		
	//	var template = kendo.template('<div id="panelControlsFeatures"></div>');
	//	$("#panelControls").html(template);
		
	var tabStripControls = $("#panelControls").kendoTabStrip(
	{
		animation: false,
		value: ["Segments"],
	}).data("kendoTabStrip");

	tabStripControls.append(
	[
		{
			text: "Brands",
			encoded: false,                            
			content: "<div id='pcBrands'  class='pcMultiSelect'></div>"
		},
		{
			text: "Segments",
			encoded: false,                            
			content: "<div id='pcSegments'  class='pcMultiSelect'></div>"
		},
		{
			text: "Filters",
			 encoded: false,                            
			content: "Country: <div id='pcFilterCountry' class='pcDrop'></div>min. Share: <div id='pcFilterShare' class='pcSlider'></div>Period:<div id='pcFilterPeriod' class='pcDrop'></div><div id='pcFilterPeriodSlider' class='pcSlider'></div><div id='pcFilterPeriodPlay' class='pcButton'></div>"
		},
		{
			text: "Analytics",
			 encoded: false,                            
			content: "<div id='pcAnalytics' class='pcDrop'>KPI: <div id='pcAnalyticsKPI'></div> Visualization: <div id='pcAnalyticsVisual' class='pcDrop'></div></div>"
		}
	]);
	
	var multiSelectBrands = $("#pcBrands").kendoMultiSelect(
	{
		animation: false,
		multiple: "multiple",
		placeholder: "click to select specific brands...",
		dataSource: filterBrand,
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
		dataSource: filterCountry,
		value: filterCountry[0],
		change: function(e) {toolbarChanged();}
	}).data("kendoDropDownList");

	var dropDownFilterPeriod = $("#pcFilterPeriod").kendoDropDownList(
	{
		animation: false,
		dataSource: filterPeriod,
		value: filterPeriod[0],
		select: function(e)
		{
			dataItem = e.item.index();
			sliderFilterPeriod.value(dataItem); 
			toolbarChanged();
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
		slide: function(e) {setTimeout(function() {toolbarChanged();},50)},
		change: function(e) {setTimeout(function() {toolbarChanged();},50)}
	}).data("kendoSlider");

	var sliderFilterPeriod = $("#pcFilterPeriodSlider").kendoSlider(
	{
		min: 0,
		max: filterPeriod.length,
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
		icon: "arrow-e",
		click: function(e) {gPlay = !gPlay; playPeriods(gPlay);}
	}).data("kendoButton");
	
	var dropDownKPI = $("#pcAnalyticsKPI").kendoDropDownList(
	{
		animation: false,
		dataSource: KPIs,
		value: KPIs[0],
		change: function(e) {setTimeout(function() {toolbarChanged();},50)}
	}).data("kendoDropDownList");
	
	var dropDownVisual = $("#pcAnalyticsVisual").kendoDropDownList(
	{
		animation: false,
		dataSource: ["Sunburst","Treemap","Area","Area Stacked","Area 100%", "Columns","Columns Stacked","Columns 100%", "Lines","Lines Stacked","Lines 100%"],
		value: "Sunburst",
		change: function(e) {kendo.ui.progress($("#loading"), true); setTimeout(function() {toolbarChanged();},100)}
	}).data("kendoDropDownList");
	
	
	tabStripControls.select(0);    
		
	//MakePivot(jsonData);
	MakeBreadcrump();
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
		brands = multiSelectBrands.value();
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
		
		gTotalMarket = 0;
		for( var j = 0; j < jsonData.length; j++ )
		{
			gTotalMarket +=  jsonData[j][kpi];
		}
		
		gTotalMarketFiltered = 0;
		for( var k = 0; k < jsonDataFiltered.length; k++ )
		{
			gTotalMarketFiltered +=  jsonDataFiltered[k][kpi];
		}
		
		//alert ("Market: "+parseInt(gTotalMarket)+" Filtered: "+parseInt(gTotalMarketFiltered));
		
		//$$("numRecords").setValue(jsonDataFiltered.length + "/" + jsonData.length);

		//$$("minsharepercentage").setValue((minShare)+"%");
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
			if (visual=="Sunburst")
				MakeSunburst(jsonDataFiltered);
			else if (visual=="Treemap")
				MakeTreemap(jsonDataFiltered);
			else if (visual=="Area")
				MakeChart(jsonDataFiltered,"area","none");
			else if (visual=="Area Stacked")
				MakeChart(jsonDataFiltered,"area","normal");
			else if (visual=="Area 100%")
				MakeChart(jsonDataFiltered,"area","100%");
			else if (visual=="Columns")
				MakeChart(jsonDataFiltered,"column","none");
			else if (visual=="Columns Stacked")
				MakeChart(jsonDataFiltered,"column","normal");
			else if (visual=="Columns 100%")
				MakeChart(jsonDataFiltered,"column","100%");
			else if (visual=="Lines")
				MakeChart(jsonDataFiltered,"line","none");
			else if (visual=="Lines Stacked")
				MakeChart(jsonDataFiltered,"line","normal");
			else if (visual=="Lines 100%")
				MakeChart(jsonDataFiltered,"Line","100%");
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

		var segment = "Brand";
		if (nesting.length>0)
			segment = nesting[0];
	/*	
		var jsonData3 = _.chain(jsonData)
		.groupBy(segment)
		.map(function(value, key) {
			return _.chain(value)
				.groupBy("Period")
				.map(function(value1, period) {
					return {
						Name: key,
						Kpi: sum(_.pluck(value1, kpi)),
						Units: sum(_.pluck(value1, "Units")),
						Value: sum(_.pluck(value1, "Value")),
						Period: period
					}
				})
				.value();
		})
		.value();
		

		function sum(numbers) {
		return _.reduce(numbers, function(result, current) {
			return result + parseFloat(current);
		}, 0);
		}
		
		//var categories = filterPeriod;
		var seriesData = [];
		for (i=0;i<jsonData3.length;i++)
		{
			var objectArray = jsonData3[i];
			var data = new Array();
			var name = "";
			for (k=0;k<objectArray.length;k++)
			{
				periodSplit = objectArray[k].Period.split("-");
				seriesData.push({Name: objectArray[k].Name, Period: new Date(periodSplit[0],periodSplit[1]), Units: objectArray[k].Units, Value: objectArray[k].Value});
			}
			seriesData.push(data); //.push(data);
		}
	*/
		delete gDataSource;
		gDataSource = new kendo.data.DataSource({
		  data: jsonData, //seriesData, 
		  //group: [{ field: "Name", aggregates: [{field: kpi, aggregate: "sum"}]}],
		  group: [{ field: segment, aggregates: [{field: kpi, aggregate: "sum"}]}],
		  sort: [{ field: "Period", dir: "asc"}],
		});

		var chartStackObj = false;
		var valueAxisObj = {line: {visible: false},majorGridLines: {visible: false}, minorGridLines: {visible: false},labels: {format: "{0:n0}"}};
		if (chartStack=="normal")
		{
			chartStackObj = true;
		}
		else if (chartStack=="100%")
		{
			chartStackObj = { type: "100%" };
			valueAxisObj = {line: {visible: false},minorGridLines: {visible: false},labels: {}, min: 0, max: 1};
		}
		
		$("#analyticsChart").kendoChart({
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
				aggregate: "sum",
				line: {style: "smooth"}
			}],
			
			valueAxis: valueAxisObj,
			categoryAxis:{
				labels: {rotation: 90},
				majorGridLines: {visible: false},
				majorTicks: {visible: false}},
				
			tooltip: {
				visible: true,
				//format: "{0:n0}",
				template: "#= series.name #: #= parseInt(value).toLocaleString() #",
			},
			dataBound: onDb

		});
		function onDb()
		{
		var chart = $("#analyticsChart").data("kendoChart");
		var numSeries = chart.options.series.length;
		for (var i=0;i<numSeries; i++)  
			chart.options.series[i].color = color(chart.options.series[i].name); 
		if (numSeries < 10)
			chart.options.legend.visible = true;
		
		}
		kendo.ui.progress($("#loading"), false);
	} // MakeChart
	


	function MakeTreemap(jsonData)
	{
		jsonDataTreemap = jsonData; //JSON.parse(JSON.stringify(jsonData)); 
		kendo.ui.progress($("#loading"), false);

		var totalMarket = d3.sum(jsonDataTreemap, function(d) { return d[kpi]; });
		
		var width = 600; //$("[view_id='panelAnalytics']").innerWidth();
			var height = 400; //$("[view_id='panelAnalytics']").innerHeight()-30;	
			var radius = Math.min(width, height) / 2;

			var json2 = d3.nest();	
			nesting.forEach(function(key) {
				json2.key(function(d) {return d[key]; }).sortKeys(d3.ascending)
			});
			json2 = json2.rollup(function(d) 
				{
					return {"kpi": d3.sum(d, function(d) {return d[kpi];})}
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

		var svg = d3.select("#analyticsChart").append("svg")
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
				return d._children; 
			})
			.classed("children", true)
			.on("click", transition);

			
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
				return d._children || [d]; 
			})
			.call(rect);

		g.append("rect")
		   .attr("class", "tree_parent")
			.style("fill", function(d) {return d.name == 'tree' ? '#fff' : color(d.name); })
			.on("mouseover", function(d) 
					{
					d3.select(this).attr("opacity",0.3);
					var sequenceArray = getAncestors(d);
					var percentage = (100 * d.value / totalMarket).toPrecision(3);

					var theString = kpi + ": " + parseInt( d.value ).toLocaleString() + " Abs. Share: " + percentage + "%";
					updateBreadcrumbs(sequenceArray, theString);
				})
			.on("mouseleave", function(d)
				{
					d3.select(this).attr("opacity",1.0);
							  // Hide the breadcrumb trail
					d3.select("#trail")
						  .style("Visibility", "hidden");

				})
		   .call(rect)
		  .append("title")
			.text(function(d) { return formatNumber(d.value); });

		g.append("text")
		   .attr("class", "tree_text")
		   .attr("dy", ".75em")
			.text(function(d) { return d.name; })
			.call(text);

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

		var width = 800; //$("[view_id='panelAnalytics']").innerWidth();
		var height = 500; //$("[view_id='panelAnalytics']").innerHeight()-60;	
		var radius = Math.min(width, height) / 2;

		var json2 = d3.nest();	
		nesting.forEach(function(key) {
			json2.key(function(d) {return d[key]; }).sortKeys(d3.ascending)
		});
		json2 = json2.rollup(function(d) 
			{
				return {"kpi": d3.sum(d, function(d) {return d[kpi];})}
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
				if (text.length>10) text=text.substr(0,10)+"."; 
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
			.on("click", click);
				

		function contextmenu(d)
		{	
		d3.event.preventDefault();
			//open link in iframe
			var theSearch = "";
			var sequenceArray = getAncestors(d);
			sequenceArray.forEach(function(entry)
			{
				theSearch += entry.name + " ";
			});
			
			theLinkTarget='http://www.bing.com/search?q=' +theSearch;
			theLinkTarget = encodeURI(theLinkTarget);
			$$("D3SunburstIFrame").load(theLinkTarget);
			
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
				  var multiline = ((d.name || "").substr(0,20)).split(" ").length > 1;
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
				var percentageStringLong = "Total Market = 100%"; 
			
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
		  .attr("width", 400)
		  .attr("height", 50)
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
		  .text(function(d) { return (d.name || "").substr(0,10) || "all"; });

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
