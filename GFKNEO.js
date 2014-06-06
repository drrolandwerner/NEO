<style>

	path {
	  stroke: #000;
	  stroke-width: 1.5;
	  cursor: pointer;
	}

	text {
	  font: 12px sans-serif;
	  cursor: pointer;
	}
	
	.infotext 
	{
		padding: 8px;
		font: 14px sans-serif;
		display: block;
	   vertical-align: middle;
	}

	.sequence 
	{
		padding: 4px;
	}
	
	.labelLink 
	{
		padding: 48px;
		font: 9px sans-serif;
		font-family: arial, helvetica, sans-serif;

	}
	

	   .sunchart 
	{
		margin: 0 auto;
	   }
	   
	.chart 
	{

		margin: 0 auto;
/*	text-align: center;
       position: absolute;
       left: 0;
       right: 0;
	*/   }
	
	.chart .wrapper
	{	
		position:relative; 
		left:-50%;
	}
	
	div.tooltip {   
		position: absolute;           
		vertical-align: middle;
		text-align: center;    
		bottom: 5px;
		right: 5px;
		width: 150px;                  
		height: 14px;                 
		padding: 2px;             
		font: 12px sans-serif;        
		background: lightsteelblue;   
		border: 0px;      
		border-radius: 8px;           
		pointer-events: none;         
	}


	.popup {
//		position: absolute;
		left: 10;
		bottom: 20;
		//background-color: #fff;
		width: 600px;
		height: 20px;
		//border: 1px #ccc solid;
		border-radius: 6px;
		//box-shadow: #333 2px 2px 4px;
		padding: 8px;
		font-family: 12px arial, helvetica, sans-serif;
	}
	
	
rect {
  fill: none;
  stroke: #fff;
}

rect.parent,
.grandparent rect {
  stroke-width: 5px;
}
.tree_chart {
  display: block;
  margin: auto;
  margin-top: 40px;
}

.tree_grandparent text {
  font-weight: bold;
}

.tree_rect {
  fill: none;
  cursor: pointer;

  stroke: #fff;
}

tree_rect:hover tree_parent {
  fill: #bbb;
}



.children tree_parent,
.grandparent rect {
  cursor: pointer;
}

.children tree_parent {
  fill: #bbb;
  fill-opacity: .5;
}

.children:hover tree_parent {
  fill: #bbb;
}

rect:hover tree_parent {
  fill: #bbb;
}

rect.tree_parent,
.tree_grandparent tree_rect {
  stroke-width: 2px;
}

rect.tree_parent {
  fill: #bbb;
}

rect.tree_parent:hover tree_children {
  fill: #bbb;
}

.tree_grandparent rect {
  fill: orange;
}

.tree_grandparent:hover tree_rect {
  cursor: pointer;
 fill: #ee9700;
}


.tree_grandparent:hover tree_parent {
  cursor: pointer;
  fill: #ee9700;
}

.tree_grandparent:hover rect {
  fill: #ee9700;
}

.tree_children tree_rect.parent,
.tree_grandparent tree_rect {
  cursor: pointer;
}

.tree_children tree_rect.parent {
  fill: #bbb;
  fill-opacity: .5;
}

.tree_children:hover tree_children.child {
  fill: #bbb;
}

.tree_children {
  fill: #bbb;
  fill-opacity: .5;
}

.tree_child {
  fill: #ccc;
  fill-opacity: .5;
}

tree_child:hover tree_parent {
  fill: #bbb;
}
.tree_parent {
  fill: #ddd;
  fill-opacity: .5;
}

rect {
  fill: none;
    cursor: pointer;
}

rect:hover rect.child {
  fill: #bbb;
}


.dot {
  stroke: #000;
}

.axis path, .axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.label {
  fill: #777;
}

.year.label {
  font: 500 196px "Helvetica Neue";
  fill: #ddd;
}

.year.label.active {
  fill: #aaa;
}

.overlay {
  fill: none;
  pointer-events: all;
  cursor: ew-resize;
}




	</style>
	

	
	<!--
	<div id="info">
		<div id="D3Sunburst">	
	  <div id="D3SunburstChart"></div>
	  <div id="D3Sequence"></div>
	</div>

		<span id="infotext" class="infotext">Hover over chart to see market shares and values.</span>
		<span id="infotext" class="infotext">Click sector to zoom into chart.</span>
		<span id="infotext" class="infotext">Click core to zoom out of chart.</span>
	</div>
	-->
<!--
	<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	http://cdn.webix.io/edge/


<script src="http://192.168.2.5/NEO/jquery-1.11.1.min.js"></script>

-->
<script src="https://raw.githubusercontent.com/drrolandwerner/NEO/master/jquery-1.11.1.min.js"></script>
<script src="https://raw.githubusercontent.com/drrolandwerner/NEO/master/d3.min.js"></script>
<script src="https://raw.githubusercontent.com/drrolandwerner/NEO/master/d3.layout.cloud.js"></script>

<script src="https://raw.githubusercontent.com/drrolandwerner/NEO/master/underscore-min.js"></script>

<script src="http://cdn.webix.io/edge/webix.js" type="text/javascript"></script>
<link rel="stylesheet" href="http://cdn.webix.io/edge/webix.css" charset="utf-8">

<script>
	
function GFK_NEO()
{	
	$(document).ready(function ()
	{

	$(".ls").hide();
	
	var color = d3.scale.category20c();

	
	var jsonHierarchy = new Object();
	var tableData = "[";
	var jsonData = new Object();
	var jsonVisual = new Object();
	
	var toolbar = new Object();
	var sidebar = new Object();
	var myWebix = new Object();
	var gSunburst = new Object();
	
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
	
	var featureKeys = new Array();
	
	var country = "Germany";
	var period = "2012-12";
	var brand = "all";
	var kpi = "Units";
	var kpiVal = 1;
	var minShare = 10;
	var		nesting = new Array();;

	
	var gTimer;

	/*
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
				value1 = $(this).text().replace(/"/g, '');	/remove doublequotes
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
	
	*/
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
	
	var error = "";
	var url = "NEO_PTVDetails.json";
	$.getJSON(url, function(jsonData) 
	{
		var numRecords = jsonData.length;
		
	   for( var k = 0; k < jsonData.length; ++k )
	   {
			oldPeriod = jsonData[k]['Period'].split(" ");
			newPeriod = oldPeriod[1] + "-" + month[oldPeriod[0]];
			jsonData[k]['Period'] = newPeriod ;
		}
		
		var filterPeriod = new Array();
		var periods = _.keys(_.countBy(jsonData, function(jsonData) { return jsonData.Period; }));		
		periods.sort();
		for (var index = 0; index < periods.length; ++index)
			filterPeriod.push({id:index+1, value:periods[index]});
	
		var filterCountry = new Array();
		var countries = _.keys(_.countBy(jsonData, function(jsonData) { return jsonData.Country; }));
		countries.sort();
		for (var index = 0; index < countries.length; ++index)
			filterCountry.push({id:index+1, value:countries[index]});
			
		var filterBrand = new Array({id:1, value:"all"});
		
		var brands = _.keys(_.countBy(jsonData, function(jsonData) { return jsonData.Brand; }));
		brands.sort();
		for (var index = 0; index < brands.length; ++index)
			filterBrand.push({id:index+2, value:brands[index]});
		
		var KPIs = new Array({id:1, value:"Units"},{id:2, value:"Value"});
		
		featureKeys = new Array({id:1, value:"all"});
		countKeys = 1;
		for (var key in jsonData[0])
		{
			if (key !=="Country" && key !== "Period" && key !== "Units" && key !== "Value")
			{			
				countKeys += 1;
				theKey = new Object();
				theKey.id = countKeys;
				theKey.value = key;
				featureKeys.push(theKey);
			}
		}

		segment1 = featureKeys[segment1Val-1].value;
		segment2 = featureKeys[segment2Val-1].value;
		segment3 = featureKeys[segment3Val-1].value;
		segment4 = featureKeys[segment4Val-1].value;
		segment5 = featureKeys[segment5Val-1].value;

		myWebix = webix.ui({
		view:"accordion",
		//autowidth:true, autoheight:true,
		multi:false,
		rows:[ //or cols 
			{header:"Controls", id:"controlSection", collapsed: false, body:
				{rows:
				[
					{	
						view:"toolbar",
						id:"myToolbar",
						height:30,
						cols:[
							{ view:"richselect", id:"kpi", label:"", value:1, options: KPIs},
							//{ view:"label", label: "Segments:", width: 75},
							{ view:"richselect", id:"segment1", label:"", value:segment1Val, options: featureKeys},
							{ view:"richselect", id:"segment2", label:"", value:segment2Val, options: featureKeys},
							{ view:"richselect", id:"segment3", label:"", value:segment3Val, options: featureKeys},
							{ view:"richselect", id:"segment4", label:"", value:segment4Val, options: featureKeys},
							{ view:"richselect", id:"segment5", label:"", value:segment5Val, options: featureKeys},
							//{ view:"label", label: "Filter:", width: 50},
							{ view:"richselect", id:"filter_country", label:"", value:filter1Val, options: filterCountry },
							{ view:"richselect", id:"filter_period", label:"", value:filter2Val, options: filterPeriod },
							{ view:"richselect", id:"filter_brand", label:"", value:filter3Val, options: filterBrand }
							]	
					},
					{	
						view:"toolbar",
						id:"myToolbar2",
						height:30,
						cols:[
								{ view:"label", id:"minsharepercentage", label: Math.round(minShare/10,2)+"%", width:50},
								{ view:"slider", id:"minshare", label:"min. Share:", value:10, min:0, max: 100, step: 1, name:"minshare"},
								{ view:"slider", id:"periodSlider", label:"Period:", value:1, min:1, max: filterPeriod.length, step: 1, name:"periodSlider"},
								{ view:"label", id:"numRecords", label: numRecords+" records", width:100},
								{ view:"toggle", type:"iconButton", id:"playButton", offIcon:"play", onIcon:"pause", offLabel:"Play", onLabel:"Pause", width: 100 }
							]	
					}
				]
				}
			},
			{		
				collapsed:false, 
				//header:"Visualisation",
				autowidth:true,
				autoheight:true,
				
				body:
				{
				autowidth:true, autoheight:true,
				rows:
				[
				{id:"top", body: { cols:
								[
									{id:"D3Sequence", css: "sequence", height: 40, width:700},
									{ view:"label", id:"D3Link", css: "labelLink", align:"right", label: ""}
								]}},
				{view:"accordion", id:"chartContainer", type:"space", height: "100%", autowidth:true, autoheight:true,	
					cols:[
						{ header:"Sunburst", container:"D3Sunburst", collapsed: true,  body:
							{cols: 
							[
								{id:"D3SunburstChart", css: "sunchart", align:"middle"},
								{view: "iframe", id:"D3SunburstIFrame", css: "suniframe", align:"middle", src:"http://www.gfk.com"}		
							]}},
						{ header:"Treemap", collapsed: true, css: "wrapper", body:{id:"D3TreemapChart", css:"treechart"}},
						//{ header:"Bubble Chart", collapsed: true, css: "wrapper", body:{id:"D3BubbleChart", css:"bubblechart"}},
						//{ header:"Word Cloud", collapsed:true, body:{id:"D3CloudChart", css:"chart"}},
						{ header:"Data Table", collapsed: false, css: "wrapper", body:{ rows:
							[
								{view: "treetable", id: "PivotTable", export:true, columns:[]}	//autowidth:true, 
							]
							}					
						}						
					]}
				]}
				}
			]		
		});
		
	$$("kpi").attachEvent("onChange", function(newv, oldv){kpi=this.data.text;kpiVal=newv;toolbarChanged();});
	$$("segment1").attachEvent("onChange", function(newv, oldv){segment1=this.data.text;segment1Val=newv;toolbarChanged();});
	$$("segment2").attachEvent("onChange", function(newv, oldv){segment2=this.data.text;segment2Val=newv;toolbarChanged();});
	$$("segment3").attachEvent("onChange", function(newv, oldv){segment3=this.data.text;segment3Val=newv;toolbarChanged();});
	$$("segment4").attachEvent("onChange", function(newv, oldv){segment4=this.data.text;segment4Val=newv;toolbarChanged();});
	$$("segment5").attachEvent("onChange", function(newv, oldv){segment5=this.data.text;segment5Val=newv;toolbarChanged();});
	$$("filter_country").attachEvent("onChange", function(newv, oldv){country=this.data.text;filter1Val=newv;filterChanged();});
	$$("filter_period").attachEvent("onChange", function(newv, oldv){period=this.data.text;filter2Val=newv;$$("periodSlider").setValue(newv);filterChanged();});
	$$("filter_brand").attachEvent("onChange", function(newv, oldv){brand=this.data.text;filter3Val=newv;filterChanged();});
	$$("periodSlider").attachEvent("onChange", function(){period=periods[this.getValue()-1];$$("filter_period").setValue(this.getValue());filterChanged();});	// 
	$$("periodSlider").attachEvent("onSliderDrag", function(){period=periods[this.getValue()-1];$$("filter_period").setValue(this.getValue());filterChanged();});	
	$$("minshare").attachEvent("onChange", function(){minShare=this.getValue();toolbarChanged();});
	$$("minshare").attachEvent("onSliderDrag", function(){minShare=this.getValue();toolbarChanged();});
	$$("playButton").attachEvent("onChange", function(newv, oldv){ playPeriods(newv);});

	MakePivot(jsonData);
	MakeBreadcrump();
	toolbarChanged();

	function playPeriods(value)
	{	
		var msDelay = 100;
		var msDelayRepeat = 2000;
		if ($$("playButton").getValue()==1)
		{
			 gTimer = setInterval(function(){myTimer()},msDelay);
			function myTimer()
			{
				numberPeriods=filterPeriod.length
				currentPeriod = $$("filter_period").getValue();	
				if (currentPeriod<filterPeriod.length) 
				{
					$$("filter_period").setValue(currentPeriod+1);	
					clearInterval(gTimer);
					if ($$("playButton").getValue()==1) gTimer = setInterval(function(){myTimer()},msDelay);
				}
				else //last period
				{
					clearInterval(gTimer);
					// continue after three seconds
					setTimeout(function()
					{
						$$("filter_period").setValue(1);	
						if ($$("playButton").getValue()==1) gTimer = setInterval(function(){myTimer()},msDelay);
					},2000);
				}
			}
		}
		else
			clearInterval(gTimer);
	}
	
	
	function filterChanged()
	{	
		
		toolbarChanged();
	}
	
	function toolbarChanged()
	{					
		period = $$("filter_period").getText();
		country = $$("filter_country").getText();
		brand = $$("filter_brand").getText();
		//$$("labelPeriod").setValue(period);
		
		jsonDataFiltered = _.filter(jsonData, function(record)		
		{ 
			return record.Period === period; //record.Country == country && 
		});
		
		jsonDataFiltered = JSON.parse(JSON.stringify(jsonDataFiltered)); //clone

		if (brand !== "all")
		{
			for( var k = 0; k < jsonDataFiltered.length; ++k )
			{
				if (jsonDataFiltered[k]['Brand'] !== brand)
					jsonDataFiltered[k]['Brand'] = "Other" ;
			}
		}
		
		$$("numRecords").setValue(jsonDataFiltered.length + "/" + jsonData.length);

		$$("minsharepercentage").setValue((minShare/10)+"%");
		nesting = [];
		var json2 = d3.nest();
		if (segment1!=="all") nesting.push(segment1);
		if (segment2!=="all") nesting.push(segment2);
		if (segment3!=="all") nesting.push(segment3);
		if (segment4!=="all") nesting.push(segment4);
		if (segment5!=="all") nesting.push(segment5);
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

			MakeSunburst(jsonDataFiltered);
			MakeTreemap(jsonDataFiltered);
			//MakeBubblechart(jsonDataFiltered);
			//MakeWordCloud(jsonDataFiltered);
			UpdatePivot(jsonDataFiltered);
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

function MakeBubblechart(jsonData)
{
	jsonBubblechart = JSON.parse(JSON.stringify(jsonData)); 
	/*
	var result = _.chain(data)
    .groupBy("FlexCategoryName")
    .map(function(value, key) {
        return _.chain(value)
            .groupBy("VENUE_ID")
            .map(function(value1, venue_id) {
                return {
                    FlexCategoryName: key,
                    Cost: sum(_.pluck(value1, "Cost")),
                    Impressions: sum(_.pluck(value1, "Impressions")),
                    VENUE_ID: venue_id
                }
            })
            .value();
    })
    .value();
	*/
	
	var jsonData = _.chain(jsonBubblechart)
    .groupBy("Brand")
    .map(function(value, key) {
        return {
            name: key,
			category: key,
            x: sum(_.pluck(value, "Units")),
            y: sum(_.pluck(value, "Value")),
			size: sum(_.pluck(value, "Value")) / sum(_.pluck(value, "Units"))
        }
    })
    .value();
	
	function sum(numbers) {
    return _.reduce(numbers, function(result, current) {
        return result + parseFloat(current);
    }, 0);
	}
	
		var width = $("[view_id='chartContainer']").innerWidth();
		var height = $("[view_id='chartContainer']").innerHeight()-30;	
	
	var margin = {top: 20, right: 0, bottom: 0, left: 0};
	
	(function(){function e(a,b){try{for(var c in b)Object.defineProperty(a.prototype,c,{value:b[c],enumerable:!1})}catch(d){a.prototype=b}}function g(a){var b=-1,c=a.length,d=[];while(++b<c)d.push(a[b]);return d}function h(a){return Array.prototype.slice.call(a)}function k(){}function n(a){return a}function o(){return this}function p(){return!0}function q(a){return typeof a=="function"?a:function(){return a}}function r(a,b,c){return function(){var d=c.apply(b,arguments);return arguments.length?a:d}}function s(a){return a!=null&&!isNaN(a)}function t(a){return a.length}function v(a){return a==null}function w(a){return a.replace(/(^\s+)|(\s+$)/g,"").replace(/\s+/g," ")}function x(a){var b=1;while(a*b%1)b*=10;return b}function A(){}function B(a){function d(){var c=b,d=-1,e=c.length,f;while(++d<e)(f=c[d].on)&&f.apply(this,arguments);return a}var b=[],c=new k;return d.on=function(d,e){var f=c.get(d),g;return arguments.length<2?f&&f.on:(f&&(f.on=null,b=b.slice(0,g=b.indexOf(f)).concat(b.slice(g+1)),c.remove(d)),e&&b.push(c.set(d,{on:e})),a)},d}function E(a,b){return b-(a?1+Math.floor(Math.log(a+Math.pow(10,1+Math.floor(Math.log(a)/Math.LN10)-b))/Math.LN10):1)}function F(a){return a+""}function G(a){var b=a.lastIndexOf("."),c=b>=0?a.substring(b):(b=a.length,""),d=[];while(b>0)d.push(a.substring(b-=3,b+3));return d.reverse().join(",")+c}function I(a,b){return{scale:Math.pow(10,(8-b)*3),symbol:a}}function O(a){return function(b){return b<=0?0:b>=1?1:a(b)}}function P(a){return function(b){return 1-a(1-b)}}function Q(a){return function(b){return.5*(b<.5?a(2*b):2-a(2-2*b))}}function R(a){return a}function S(a){return function(b){return Math.pow(b,a)}}function T(a){return 1-Math.cos(a*Math.PI/2)}function U(a){return Math.pow(2,10*(a-1))}function V(a){return 1-Math.sqrt(1-a*a)}function W(a,b){var c;return arguments.length<2&&(b=.45),arguments.length<1?(a=1,c=b/4):c=b/(2*Math.PI)*Math.asin(1/a),function(d){return 1+a*Math.pow(2,10*-d)*Math.sin((d-c)*2*Math.PI/b)}}function X(a){return a||(a=1.70158),function(b){return b*b*((a+1)*b-a)}}function Y(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}function Z(){d3.event.stopPropagation(),d3.event.preventDefault()}function $(){var a=d3.event,b;while(b=a.sourceEvent)a=b;return a}function _(a){var b=new A,c=0,d=arguments.length;while(++c<d)b[arguments[c]]=B(b);return b.of=function(c,d){return function(e){try{var f=e.sourceEvent=d3.event;e.target=a,d3.event=e,b[e.type].apply(c,d)}finally{d3.event=f}}},b}function bb(a){return a=="transform"?d3.interpolateTransform:d3.interpolate}function bc(a,b){return b=b-(a=+a)?1/(b-a):0,function(c){return(c-a)*b}}function bd(a,b){return b=b-(a=+a)?1/(b-a):0,function(c){return Math.max(0,Math.min(1,(c-a)*b))}}function be(a,b,c){return new bf(a,b,c)}function bf(a,b,c){this.r=a,this.g=b,this.b=c}function bg(a){return a<16?"0"+Math.max(0,a).toString(16):Math.min(255,a).toString(16)}function bh(a,b,c){var d=0,e=0,f=0,g,h,i;g=/([a-z]+)\((.*)\)/i.exec(a);if(g){h=g[2].split(",");switch(g[1]){case"hsl":return c(parseFloat(h[0]),parseFloat(h[1])/100,parseFloat(h[2])/100);case"rgb":return b(bj(h[0]),bj(h[1]),bj(h[2]))}}return(i=bk.get(a))?b(i.r,i.g,i.b):(a!=null&&a.charAt(0)==="#"&&(a.length===4?(d=a.charAt(1),d+=d,e=a.charAt(2),e+=e,f=a.charAt(3),f+=f):a.length===7&&(d=a.substring(1,3),e=a.substring(3,5),f=a.substring(5,7)),d=parseInt(d,16),e=parseInt(e,16),f=parseInt(f,16)),b(d,e,f))}function bi(a,b,c){var d=Math.min(a/=255,b/=255,c/=255),e=Math.max(a,b,c),f=e-d,g,h,i=(e+d)/2;return f?(h=i<.5?f/(e+d):f/(2-e-d),a==e?g=(b-c)/f+(b<c?6:0):b==e?g=(c-a)/f+2:g=(a-b)/f+4,g*=60):h=g=0,bl(g,h,i)}function bj(a){var b=parseFloat(a);return a.charAt(a.length-1)==="%"?Math.round(b*2.55):b}function bl(a,b,c){return new bm(a,b,c)}function bm(a,b,c){this.h=a,this.s=b,this.l=c}function bn(a,b,c){function f(a){return a>360?a-=360:a<0&&(a+=360),a<60?d+(e-d)*a/60:a<180?e:a<240?d+(e-d)*(240-a)/60:d}function g(a){return Math.round(f(a)*255)}var d,e;return a%=360,a<0&&(a+=360),b=b<0?0:b>1?1:b,c=c<0?0:c>1?1:c,e=c<=.5?c*(1+b):c+b-c*b,d=2*c-e,be(g(a+120),g(a),g(a-120))}function bo(a){return j(a,bu),a}function bv(a){return function(){return bp(a,this)}}function bw(a){return function(){return bq(a,this)}}function by(a,b){function f(){if(b=this.classList)return b.add(a);var b=this.className,d=b.baseVal!=null,e=d?b.baseVal:b;c.lastIndex=0,c.test(e)||(e=w(e+" "+a),d?b.baseVal=e:this.className=e)}function g(){if(b=this.classList)return b.remove(a);var b=this.className,d=b.baseVal!=null,e=d?b.baseVal:b;e=w(e.replace(c," ")),d?b.baseVal=e:this.className=e}function h(){(b.apply(this,arguments)?f:g).call(this)}var c=new RegExp("(^|\\s+)"+d3.requote(a)+"(\\s+|$)","g");if(arguments.length<2){var d=this.node();if(e=d.classList)return e.contains(a);var e=d.className;return c.lastIndex=0,c.test(e.baseVal!=null?e.baseVal:e)}return this.each(typeof b=="function"?h:b?f:g)}function bz(a){return{__data__:a}}function bA(a){return function(){return bt(this,a)}}function bB(a){return arguments.length||(a=d3.ascending),function(b,c){return a(b&&b.__data__,c&&c.__data__)}}function bD(a){return j(a,bE),a}function bF(a,b,c){j(a,bJ);var d=new k,e=d3.dispatch("start","end"),f=bR;return a.id=b,a.time=c,a.tween=function(b,c){return arguments.length<2?d.get(b):(c==null?d.remove(b):d.set(b,c),a)},a.ease=function(b){return arguments.length?(f=typeof b=="function"?b:d3.ease.apply(d3,arguments),a):f},a.each=function(b,c){return arguments.length<2?bS.call(a,b):(e.on(b,c),a)},d3.timer(function(g){return a.each(function(h,i,j){function p(a){return o.active>b?r():(o.active=b,d.forEach(function(a,b){(b=b.call(l,h,i))&&k.push(b)}),e.start.call(l,h,i),q(a)||d3.timer(q,0,c),1)}function q(a){if(o.active!==b)return r();var c=(a-m)/n,d=f(c),g=k.length;while(g>0)k[--g].call(l,d);if(c>=1)return r(),bL=b,e.end.call(l,h,i),bL=0,1}function r(){return--o.count||delete l.__transition__,1}var k=[],l=this,m=a[j][i].delay,n=a[j][i].duration,o=l.__transition__||(l.__transition__={active:0,count:0});++o.count,m<=g?p(g):d3.timer(p,m,c)}),1},0,c),a}function bH(a,b,c){return c!=""&&bG}function bI(a,b){function d(a,d,e){var f=b.call(this,a,d);return f==null?e!=""&&bG:e!=f&&c(e,f)}function e(a,d,e){return e!=b&&c(e,b)}var c=bb(a);return typeof b=="function"?d:b==null?bH:(b+="",e)}function bS(a){var b=bL,c=bR,d=bP,e=bQ;bL=this.id,bR=this.ease();for(var f=0,g=this.length;f<g;f++)for(var h=this[f],i=0,j=h.length;i<j;i++){var k=h[i];k&&(bP=this[f][i].delay,bQ=this[f][i].duration,a.call(k=k.node,k.__data__,i,f))}return bL=b,bR=c,bP=d,bQ=e,this}function bW(){var a,b=Date.now(),c=bT;while(c)a=b-c.then,a>=c.delay&&(c.flush=c.callback(a)),c=c.next;var d=bX()-b;d>24?(isFinite(d)&&(clearTimeout(bV),bV=setTimeout(bW,d)),bU=0):(bU=1,bY(bW))}function bX(){var a=null,b=bT,c=Infinity;while(b)b.flush?b=a?a.next=b.next:bT=b.next:(c=Math.min(c,b.then+b.delay),b=(a=b).next);return c}function bZ(a){var b=[a.a,a.b],c=[a.c,a.d],d=b_(b),e=b$(b,c),f=b_(ca(c,b,-e))||0;b[0]*c[1]<c[0]*b[1]&&(b[0]*=-1,b[1]*=-1,d*=-1,e*=-1),this.rotate=(d?Math.atan2(b[1],b[0]):Math.atan2(-c[0],c[1]))*cb,this.translate=[a.e,a.f],this.scale=[d,f],this.skew=f?Math.atan2(e,f)*cb:0}function b$(a,b){return a[0]*b[0]+a[1]*b[1]}function b_(a){var b=Math.sqrt(b$(a,a));return b&&(a[0]/=b,a[1]/=b),b}function ca(a,b,c){return a[0]+=c*b[0],a[1]+=c*b[1],a}function cd(a,b){var c=a.ownerSVGElement||a;if(c.createSVGPoint){var d=c.createSVGPoint();if(cc<0&&(window.scrollX||window.scrollY)){c=d3.select(document.body).append("svg").style("position","absolute").style("top",0).style("left",0);var e=c[0][0].getScreenCTM();cc=!e.f&&!e.e,c.remove()}return cc?(d.x=b.pageX,d.y=b.pageY):(d.x=b.clientX,d.y=b.clientY),d=d.matrixTransform(a.getScreenCTM().inverse()),[d.x,d.y]}var f=a.getBoundingClientRect();return[b.clientX-f.left-a.clientLeft,b.clientY-f.top-a.clientTop]}function ce(){}function cf(a){var b=a[0],c=a[a.length-1];return b<c?[b,c]:[c,b]}function cg(a){return a.rangeExtent?a.rangeExtent():cf(a.range())}function ch(a,b){var c=0,d=a.length-1,e=a[c],f=a[d],g;f<e&&(g=c,c=d,d=g,g=e,e=f,f=g);if(g=f-e)b=b(g),a[c]=b.floor(e),a[d]=b.ceil(f);return a}function ci(){return Math}function cj(a,b,c,d){function g(){var g=Math.min(a.length,b.length)>2?cq:cp,i=d?bd:bc;return e=g(a,b,i,c),f=g(b,a,i,d3.interpolate),h}function h(a){return e(a)}var e,f;return h.invert=function(a){return f(a)},h.domain=function(b){return arguments.length?(a=b.map(Number),g()):a},h.range=function(a){return arguments.length?(b=a,g()):b},h.rangeRound=function(a){return h.range(a).interpolate(d3.interpolateRound)},h.clamp=function(a){return arguments.length?(d=a,g()):d},h.interpolate=function(a){return arguments.length?(c=a,g()):c},h.ticks=function(b){return cn(a,b)},h.tickFormat=function(b){return co(a,b)},h.nice=function(){return ch(a,cl),g()},h.copy=function(){return cj(a,b,c,d)},g()}function ck(a,b){return d3.rebind(a,b,"range","rangeRound","interpolate","clamp")}function cl(a){return a=Math.pow(10,Math.round(Math.log(a)/Math.LN10)-1),{floor:function(b){return Math.floor(b/a)*a},ceil:function(b){return Math.ceil(b/a)*a}}}function cm(a,b){var c=cf(a),d=c[1]-c[0],e=Math.pow(10,Math.floor(Math.log(d/b)/Math.LN10)),f=b/d*e;return f<=.15?e*=10:f<=.35?e*=5:f<=.75&&(e*=2),c[0]=Math.ceil(c[0]/e)*e,c[1]=Math.floor(c[1]/e)*e+e*.5,c[2]=e,c}function cn(a,b){return d3.range.apply(d3,cm(a,b))}function co(a,b){return d3.format(",."+Math.max(0,-Math.floor(Math.log(cm(a,b)[2])/Math.LN10+.01))+"f")}function cp(a,b,c,d){var e=c(a[0],a[1]),f=d(b[0],b[1]);return function(a){return f(e(a))}}function cq(a,b,c,d){var e=[],f=[],g=0,h=Math.min(a.length,b.length)-1;a[h]<a[0]&&(a=a.slice().reverse(),b=b.slice().reverse());while(++g<=h)e.push(c(a[g-1],a[g])),f.push(d(b[g-1],b[g]));return function(b){var c=d3.bisect(a,b,1,h)-1;return f[c](e[c](b))}}function cr(a,b){function d(c){return a(b(c))}var c=b.pow;return d.invert=function(b){return c(a.invert(b))},d.domain=function(e){return arguments.length?(b=e[0]<0?cu:ct,c=b.pow,a.domain(e.map(b)),d):a.domain().map(c)},d.nice=function(){return a.domain(ch(a.domain(),ci)),d},d.ticks=function(){var d=cf(a.domain()),e=[];if(d.every(isFinite)){var f=Math.floor(d[0]),g=Math.ceil(d[1]),h=c(d[0]),i=c(d[1]);if(b===cu){e.push(c(f));for(;f++<g;)for(var j=9;j>0;j--)e.push(c(f)*j)}else{for(;f<g;f++)for(var j=1;j<10;j++)e.push(c(f)*j);e.push(c(f))}for(f=0;e[f]<h;f++);for(g=e.length;e[g-1]>i;g--);e=e.slice(f,g)}return e},d.tickFormat=function(a,e){arguments.length<2&&(e=cs);if(arguments.length<1)return e;var f=a/d.ticks().length,g=b===cu?(h=-1e-12,Math.floor):(h=1e-12,Math.ceil),h;return function(a){return a/c(g(b(a)+h))<f?e(a):""}},d.copy=function(){return cr(a.copy(),b)},ck(d,a)}function ct(a){return Math.log(a<0?0:a)/Math.LN10}function cu(a){return-Math.log(a>0?0:-a)/Math.LN10}function cv(a,b){function e(b){return a(c(b))}var c=cw(b),d=cw(1/b);return e.invert=function(b){return d(a.invert(b))},e.domain=function(b){return arguments.length?(a.domain(b.map(c)),e):a.domain().map(d)},e.ticks=function(a){return cn(e.domain(),a)},e.tickFormat=function(a){return co(e.domain(),a)},e.nice=function(){return e.domain(ch(e.domain(),cl))},e.exponent=function(a){if(!arguments.length)return b;var f=e.domain();return c=cw(b=a),d=cw(1/b),e.domain(f)},e.copy=function(){return cv(a.copy(),b)},ck(e,a)}function cw(a){return function(b){return b<0?-Math.pow(-b,a):Math.pow(b,a)}}function cx(a,b){function f(b){return d[((c.get(b)||c.set(b,a.push(b)))-1)%d.length]}function g(b,c){return d3.range(a.length).map(function(a){return b+c*a})}var c,d,e;return f.domain=function(d){if(!arguments.length)return a;a=[],c=new k;var e=-1,g=d.length,h;while(++e<g)c.has(h=d[e])||c.set(h,a.push(h));return f[b.t](b.x,b.p)},f.range=function(a){return arguments.length?(d=a,e=0,b={t:"range",x:a},f):d},f.rangePoints=function(c,h){arguments.length<2&&(h=0);var i=c[0],j=c[1],k=(j-i)/(a.length-1+h);return d=g(a.length<2?(i+j)/2:i+k*h/2,k),e=0,b={t:"rangePoints",x:c,p:h},f},f.rangeBands=function(c,h){arguments.length<2&&(h=0);var i=c[1]<c[0],j=c[i-0],k=c[1-i],l=(k-j)/(a.length+h);return d=g(j+l*h,l),i&&d.reverse(),e=l*(1-h),b={t:"rangeBands",x:c,p:h},f},f.rangeRoundBands=function(c,h){arguments.length<2&&(h=0);var i=c[1]<c[0],j=c[i-0],k=c[1-i],l=Math.floor((k-j)/(a.length+h)),m=k-j-(a.length-h)*l;return d=g(j+Math.round(m/2),l),i&&d.reverse(),e=Math.round(l*(1-h)),b={t:"rangeRoundBands",x:c,p:h},f},f.rangeBand=function(){return e},f.rangeExtent=function(){return cf(b.x)},f.copy=function(){return cx(a,b)},f.domain(a)}function cC(a,b){function d(){var d=0,f=a.length,g=b.length;c=[];while(++d<g)c[d-1]=d3.quantile(a,d/g);return e}function e(a){return isNaN(a=+a)?NaN:b[d3.bisect(c,a)]}var c;return e.domain=function(b){return arguments.length?(a=b.filter(function(a){return!isNaN(a)}).sort(d3.ascending),d()):a},e.range=function(a){return arguments.length?(b=a,d()):b},e.quantiles=function(){return c},e.copy=function(){return cC(a,b)},d()}function cD(a,b,c){function f(b){return c[Math.max(0,Math.min(e,Math.floor(d*(b-a))))]}function g(){return d=c.length/(b-a),e=c.length-1,f}var d,e;return f.domain=function(c){return arguments.length?(a=+c[0],b=+c[c.length-1],g()):[a,b]},f.range=function(a){return arguments.length?(c=a,g()):c},f.copy=function(){return cD(a,b,c)},g()}function cE(a){function b(a){return+a}return b.invert=b,b.domain=b.range=function(c){return arguments.length?(a=c.map(b),b):a},b.ticks=function(b){return cn(a,b)},b.tickFormat=function(b){return co(a,b)},b.copy=function(){return cE(a)},b}function cH(a){return a.innerRadius}function cI(a){return a.outerRadius}function cJ(a){return a.startAngle}function cK(a){return a.endAngle}function cL(a){function h(e){function o(){h.push("M",f(a(i),g))}var h=[],i=[],j=-1,k=e.length,l,m=q(b),n=q(c);while(++j<k)d.call(this,l=e[j],j)?i.push([+m.call(this,l,j),+n.call(this,l,j)]):i.length&&(o(),i=[]);return i.length&&o(),h.length?h.join(""):null}var b=cM,c=cN,d=p,e=cO,f=cQ,g=.7;return h.x=function(a){return arguments.length?(b=a,h):b},h.y=function(a){return arguments.length?(c=a,h):c},h.defined=function(a){return arguments.length?(d=a,h):d},h.interpolate=function(a){return arguments.length?(cP.has(a+="")||(a=cO),f=cP.get(e=a),h):e},h.tension=function(a){return arguments.length?(g=a,h):g},h}function cM(a){return a[0]}function cN(a){return a[1]}function cQ(a){var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];while(++b<c)e.push("L",(d=a[b])[0],",",d[1]);return e.join("")}function cR(a){var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];while(++b<c)e.push("V",(d=a[b])[1],"H",d[0]);return e.join("")}function cS(a){var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];while(++b<c)e.push("H",(d=a[b])[0],"V",d[1]);return e.join("")}function cT(a,b){return a.length<4?cQ(a):a[1]+cW(a.slice(1,a.length-1),cX(a,b))}function cU(a,b){return a.length<3?cQ(a):a[0]+cW((a.push(a[0]),a),cX([a[a.length-2]].concat(a,[a[1]]),b))}function cV(a,b,c){return a.length<3?cQ(a):a[0]+cW(a,cX(a,b))}function cW(a,b){if(b.length<1||a.length!=b.length&&a.length!=b.length+2)return cQ(a);var c=a.length!=b.length,d="",e=a[0],f=a[1],g=b[0],h=g,i=1;c&&(d+="Q"+(f[0]-g[0]*2/3)+","+(f[1]-g[1]*2/3)+","+f[0]+","+f[1],e=a[1],i=2);if(b.length>1){h=b[1],f=a[i],i++,d+="C"+(e[0]+g[0])+","+(e[1]+g[1])+","+(f[0]-h[0])+","+(f[1]-h[1])+","+f[0]+","+f[1];for(var j=2;j<b.length;j++,i++)f=a[i],h=b[j],d+="S"+(f[0]-h[0])+","+(f[1]-h[1])+","+f[0]+","+f[1]}if(c){var k=a[i];d+="Q"+(f[0]+h[0]*2/3)+","+(f[1]+h[1]*2/3)+","+k[0]+","+k[1]}return d}function cX(a,b){var c=[],d=(1-b)/2,e,f=a[0],g=a[1],h=1,i=a.length;while(++h<i)e=f,f=g,g=a[h],c.push([d*(g[0]-e[0]),d*(g[1]-e[1])]);return c}function cY(a){if(a.length<3)return cQ(a);var b=1,c=a.length,d=a[0],e=d[0],f=d[1],g=[e,e,e,(d=a[1])[0]],h=[f,f,f,d[1]],i=[e,",",f];de(i,g,h);while(++b<c)d=a[b],g.shift(),g.push(d[0]),h.shift(),h.push(d[1]),de(i,g,h);b=-1;while(++b<2)g.shift(),g.push(d[0]),h.shift(),h.push(d[1]),de(i,g,h);return i.join("")}function cZ(a){if(a.length<4)return cQ(a);var b=[],c=-1,d=a.length,e,f=[0],g=[0];while(++c<3)e=a[c],f.push(e[0]),g.push(e[1]);b.push(da(dd,f)+","+da(dd,g)),--c;while(++c<d)e=a[c],f.shift(),f.push(e[0]),g.shift(),g.push(e[1]),de(b,f,g);return b.join("")}function c$(a){var b,c=-1,d=a.length,e=d+4,f,g=[],h=[];while(++c<4)f=a[c%d],g.push(f[0]),h.push(f[1]);b=[da(dd,g),",",da(dd,h)],--c;while(++c<e)f=a[c%d],g.shift(),g.push(f[0]),h.shift(),h.push(f[1]),de(b,g,h);return b.join("")}function c_(a,b){var c=a.length-1,d=a[0][0],e=a[0][1],f=a[c][0]-d,g=a[c][1]-e,h=-1,i,j;while(++h<=c)i=a[h],j=h/c,i[0]=b*i[0]+(1-b)*(d+j*f),i[1]=b*i[1]+(1-b)*(e+j*g);return cY(a)}function da(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]}function de(a,b,c){a.push("C",da(db,b),",",da(db,c),",",da(dc,b),",",da(dc,c),",",da(dd,b),",",da(dd,c))}function df(a,b){return(b[1]-a[1])/(b[0]-a[0])}function dg(a){var b=0,c=a.length-1,d=[],e=a[0],f=a[1],g=d[0]=df(e,f);while(++b<c)d[b]=g+(g=df(e=f,f=a[b+1]));return d[b]=g,d}function dh(a){var b=[],c,d,e,f,g=dg(a),h=-1,i=a.length-1;while(++h<i)c=df(a[h],a[h+1]),Math.abs(c)<1e-6?g[h]=g[h+1]=0:(d=g[h]/c,e=g[h+1]/c,f=d*d+e*e,f>9&&(f=c*3/Math.sqrt(f),g[h]=f*d,g[h+1]=f*e));h=-1;while(++h<=i)f=(a[Math.min(i,h+1)][0]-a[Math.max(0,h-1)][0])/(6*(1+g[h]*g[h])),b.push([f||0,g[h]*f||0]);return b}function di(a){return a.length<3?cQ(a):a[0]+cW(a,dh(a))}function dj(a){var b,c=-1,d=a.length,e,f;while(++c<d)b=a[c],e=b[0],f=b[1]+cF,b[0]=e*Math.cos(f),b[1]=e*Math.sin(f);return a}function dk(a){function l(g){function y(){l.push("M",h(a(n),k),j,i(a(m.reverse()),k),"Z")}var l=[],m=[],n=[],o=-1,p=g.length,r,s=q(b),t=q(d),u=b===c?function(){return w}:q(c),v=d===e?function(){return x}:q(e),w,x;while(++o<p)f.call(this,r=g[o],o)?(m.push([w=+s.call(this,r,o),x=+t.call(this,r,o)]),n.push([+u.call(this,r,o),+v.call(this,r,o)])):m.length&&(y(),m=[],n=[]);return m.length&&y(),l.length?l.join(""):null}var b=cM,c=cM,d=0,e=cN,f=p,g=cO,h=cQ,i=cQ,j="L",k=.7;return l.x=function(a){return arguments.length?(b=c=a,l):c},l.x0=function(a){return arguments.length?(b=a,l):b},l.x1=function(a){return arguments.length?(c=a,l):c},l.y=function(a){return arguments.length?(d=e=a,l):e},l.y0=function(a){return arguments.length?(d=a,l):d},l.y1=function(a){return arguments.length?(e=a,l):e},l.defined=function(a){return arguments.length?(f=a,l):f},l.interpolate=function(a){return arguments.length?(cP.has(a+="")||(a=cO),h=cP.get(g=a),i=h.reverse||h,j=/-closed$/.test(a)?"M":"L",l):g},l.tension=function(a){return arguments.length?(k=a,l):k},l}function dl(a){return a.source}function dm(a){return a.target}function dn(a){return a.radius}function dp(a){return a.startAngle}function dq(a){return a.endAngle}function dr(a){return[a.x,a.y]}function ds(a){return function(){var b=a.apply(this,arguments),c=b[0],d=b[1]+cF;return[c*Math.cos(d),c*Math.sin(d)]}}function dt(){return 64}function du(){return"circle"}function dv(a){var b=Math.sqrt(a/Math.PI);return"M0,"+b+"A"+b+","+b+" 0 1,1 0,"+ -b+"A"+b+","+b+" 0 1,1 0,"+b+"Z"}function dz(a,b){a.attr("transform",function(a){return"translate("+b(a)+",0)"})}function dA(a,b){a.attr("transform",function(a){return"translate(0,"+b(a)+")"})}function dB(a,b,c){e=[];if(c&&b.length>1){var d=cf(a.domain()),e,f=-1,g=b.length,h=(b[1]-b[0])/++c,i,j;while(++f<g)for(i=c;--i>0;)(j=+b[f]-i*h)>=d[0]&&e.push(j);for(--f,i=0;++i<c&&(j=+b[f]+i*h)<d[1];)e.push(j)}return e}function dG(){dE||(dE=d3.select("body").append("div").style("visibility","hidden").style("top",0).style("height",0).style("width",0).style("overflow-y","scroll").append("div").style("height","2000px").node().parentNode);var a=d3.event,b;try{dE.scrollTop=1e3,dE.dispatchEvent(a),b=1e3-dE.scrollTop}catch(c){b=a.wheelDelta||-a.detail*5}return b}function dH(a){var b=a.source,c=a.target,d=dJ(b,c),e=[b];while(b!==d)b=b.parent,e.push(b);var f=e.length;while(c!==d)e.splice(f,0,c),c=c.parent;return e}function dI(a){var b=[],c=a.parent;while(c!=null)b.push(a),a=c,c=c.parent;return b.push(a),b}function dJ(a,b){if(a===b)return a;var c=dI(a),d=dI(b),e=c.pop(),f=d.pop(),g=null;while(e===f)g=e,e=c.pop(),f=d.pop();return g}function dM(a){a.fixed|=2}function dN(a){a!==dL&&(a.fixed&=1)}function dO(){dL.fixed&=1,dK=dL=null}function dP(){dL.px=d3.event.x,dL.py=d3.event.y,dK.resume()}function dQ(a,b,c){var d=0,e=0;a.charge=0;if(!a.leaf){var f=a.nodes,g=f.length,h=-1,i;while(++h<g){i=f[h];if(i==null)continue;dQ(i,b,c),a.charge+=i.charge,d+=i.charge*i.cx,e+=i.charge*i.cy}}if(a.point){a.leaf||(a.point.x+=Math.random()-.5,a.point.y+=Math.random()-.5);var j=b*c[a.point.index];a.charge+=a.pointCharge=j,d+=j*a.point.x,e+=j*a.point.y}a.cx=d/a.charge,a.cy=e/a.charge}function dR(a){return 20}function dS(a){return 1}function dU(a){return a.x}function dV(a){return a.y}function dW(a,b,c){a.y0=b,a.y=c}function dZ(a){return d3.range(a.length)}function d$(a){var b=-1,c=a[0].length,d=[];while(++b<c)d[b]=0;return d}function d_(a){var b=1,c=0,d=a[0][1],e,f=a.length;for(;b<f;++b)(e=a[b][1])>d&&(c=b,d=e);return c}function ea(a){return a.reduce(eb,0)}function eb(a,b){return a+b[1]}function ec(a,b){return ed(a,Math.ceil(Math.log(b.length)/Math.LN2+1))}function ed(a,b){var c=-1,d=+a[0],e=(a[1]-d)/b,f=[];while(++c<=b)f[c]=e*c+d;return f}function ee(a){return[d3.min(a),d3.max(a)]}function ef(a,b){return d3.rebind(a,b,"sort","children","value"),a.links=ej,a.nodes=function(b){return ek=!0,(a.nodes=a)(b)},a}function eg(a){return a.children}function eh(a){return a.value}function ei(a,b){return b.value-a.value}function ej(a){return d3.merge(a.map(function(a){return(a.children||[]).map(function(b){return{source:a,target:b}})}))}function el(a,b){return a.value-b.value}function em(a,b){var c=a._pack_next;a._pack_next=b,b._pack_prev=a,b._pack_next=c,c._pack_prev=b}function en(a,b){a._pack_next=b,b._pack_prev=a}function eo(a,b){var c=b.x-a.x,d=b.y-a.y,e=a.r+b.r;return e*e-c*c-d*d>.001}function ep(a){function l(a){b=Math.min(a.x-a.r,b),c=Math.max(a.x+a.r,c),d=Math.min(a.y-a.r,d),e=Math.max(a.y+a.r,e)}var b=Infinity,c=-Infinity,d=Infinity,e=-Infinity,f=a.length,g,h,i,j,k;a.forEach(eq),g=a[0],g.x=-g.r,g.y=0,l(g);if(f>1){h=a[1],h.x=h.r,h.y=0,l(h);if(f>2){i=a[2],eu(g,h,i),l(i),em(g,i),g._pack_prev=i,em(i,h),h=g._pack_next;for(var m=3;m<f;m++){eu(g,h,i=a[m]);var n=0,o=1,p=1;for(j=h._pack_next;j!==h;j=j._pack_next,o++)if(eo(j,i)){n=1;break}if(n==1)for(k=g._pack_prev;k!==j._pack_prev;k=k._pack_prev,p++)if(eo(k,i))break;n?(o<p||o==p&&h.r<g.r?en(g,h=j):en(g=k,h),m--):(em(g,i),h=i,l(i))}}}var q=(b+c)/2,r=(d+e)/2,s=0;for(var m=0;m<f;m++){var t=a[m];t.x-=q,t.y-=r,s=Math.max(s,t.r+Math.sqrt(t.x*t.x+t.y*t.y))}return a.forEach(er),s}function eq(a){a._pack_next=a._pack_prev=a}function er(a){delete a._pack_next,delete a._pack_prev}function es(a){var b=a.children;b&&b.length?(b.forEach(es),a.r=ep(b)):a.r=Math.sqrt(a.value)}function et(a,b,c,d){var e=a.children;a.x=b+=d*a.x,a.y=c+=d*a.y,a.r*=d;if(e){var f=-1,g=e.length;while(++f<g)et(e[f],b,c,d)}}function eu(a,b,c){var d=a.r+c.r,e=b.x-a.x,f=b.y-a.y;if(d&&(e||f)){var g=b.r+c.r,h=Math.sqrt(e*e+f*f),i=Math.max(-1,Math.min(1,(d*d+h*h-g*g)/(2*d*h))),j=Math.acos(i),k=i*(d/=h),l=Math.sin(j)*d;c.x=a.x+k*e+l*f,c.y=a.y+k*f-l*e}else c.x=a.x+d,c.y=a.y}function ev(a){return 1+d3.max(a,function(a){return a.y})}function ew(a){return a.reduce(function(a,b){return a+b.x},0)/a.length}function ex(a){var b=a.children;return b&&b.length?ex(b[0]):a}function ey(a){var b=a.children,c;return b&&(c=b.length)?ey(b[c-1]):a}function ez(a,b){return a.parent==b.parent?1:2}function eA(a){var b=a.children;return b&&b.length?b[0]:a._tree.thread}function eB(a){var b=a.children,c;return b&&(c=b.length)?b[c-1]:a._tree.thread}function eC(a,b){var c=a.children;if(c&&(e=c.length)){var d,e,f=-1;while(++f<e)b(d=eC(c[f],b),a)>0&&(a=d)}return a}function eD(a,b){return a.x-b.x}function eE(a,b){return b.x-a.x}function eF(a,b){return a.depth-b.depth}function eG(a,b){function c(a,d){var e=a.children;if(e&&(i=e.length)){var f,g=null,h=-1,i;while(++h<i)f=e[h],c(f,g),g=f}b(a,d)}c(a,null)}function eH(a){var b=0,c=0,d=a.children,e=d.length,f;while(--e>=0)f=d[e]._tree,f.prelim+=b,f.mod+=b,b+=f.shift+(c+=f.change)}function eI(a,b,c){a=a._tree,b=b._tree;var d=c/(b.number-a.number);a.change+=d,b.change-=d,b.shift+=c,b.prelim+=c,b.mod+=c}function eJ(a,b,c){return a._tree.ancestor.parent==b.parent?a._tree.ancestor:c}function eK(a){return{x:a.x,y:a.y,dx:a.dx,dy:a.dy}}function eL(a,b){var c=a.x+b[3],d=a.y+b[0],e=a.dx-b[1]-b[3],f=a.dy-b[0]-b[2];return e<0&&(c+=e/2,e=0),f<0&&(d+=f/2,f=0),{x:c,y:d,dx:e,dy:f}}function eM(a){return a.map(eN).join(",")}function eN(a){return/[",\n]/.test(a)?'"'+a.replace(/\"/g,'""')+'"':a}function eP(a,b){return function(c){return c&&a.hasOwnProperty(c.type)?a[c.type](c):b}}function eQ(a){return"m0,"+a+"a"+a+","+a+" 0 1,1 0,"+ -2*a+"a"+a+","+a+" 0 1,1 0,"+2*a+"z"}function eR(a,b){eS.hasOwnProperty(a.type)&&eS[a.type](a,b)}function eT(a,b){eR(a.geometry,b)}function eU(a,b){for(var c=a.features,d=0,e=c.length;d<e;d++)eR(c[d].geometry,b)}function eV(a,b){for(var c=a.geometries,d=0,e=c.length;d<e;d++)eR(c[d],b)}function eW(a,b){for(var c=a.coordinates,d=0,e=c.length;d<e;d++)b.apply(null,c[d])}function eX(a,b){for(var c=a.coordinates,d=0,e=c.length;d<e;d++)for(var f=c[d],g=0,h=f.length;g<h;g++)b.apply(null,f[g])}function eY(a,b){for(var c=a.coordinates,d=0,e=c.length;d<e;d++)for(var f=c[d][0],g=0,h=f.length;g<h;g++)b.apply(null,f[g])}function eZ(a,b){b.apply(null,a.coordinates)}function e$(a,b){for(var c=a.coordinates[0],d=0,e=c.length;d<e;d++)b.apply(null,c[d])}function e_(a){return a.source}function fa(a){return a.target}function fb(a,b){function q(a){var b=Math.sin(o-(a*=o))/p,c=Math.sin(a)/p,f=b*g*d+c*m*j,i=b*g*e+c*m*k,l=b*h+c*n;return[Math.atan2(i,f)/eO,Math.atan2(l,Math.sqrt(f*f+i*i))/eO]}var c=a[0]*eO,d=Math.cos(c),e=Math.sin(c),f=a[1]*eO,g=Math.cos(f),h=Math.sin(f),i=b[0]*eO,j=Math.cos(i),k=Math.sin(i),l=b[1]*eO,m=Math.cos(l),n=Math.sin(l),o=q.d=Math.acos(Math.max(-1,Math.min(1,h*n+g*m*Math.cos(i-c)))),p=Math.sin(o);return q}function fe(a){var b=0,c=0;for(;;){if(a(b,c))return[b,c];b===0?(b=c+1,c=0):(b-=1,c+=1)}}function ff(a,b,c,d){var e,f,g,h,i,j,k;return e=d[a],f=e[0],g=e[1],e=d[b],h=e[0],i=e[1],e=d[c],j=e[0],k=e[1],(k-g)*(h-f)-(i-g)*(j-f)>0}function fg(a,b,c){return(c[0]-b[0])*(a[1]-b[1])<(c[1]-b[1])*(a[0]-b[0])}function fh(a,b,c,d){var e=a[0],f=b[0],g=c[0],h=d[0],i=a[1],j=b[1],k=c[1],l=d[1],m=e-g,n=f-e,o=h-g,p=i-k,q=j-i,r=l-k,s=(o*p-r*m)/(r*n-o*q);return[e+s*n,i+s*q]}function fj(a,b){var c={list:a.map(function(a,b){return{index:b,x:a[0],y:a[1]}}).sort(function(a,b){return a.y<b.y?-1:a.y>b.y?1:a.x<b.x?-1:a.x>b.x?1:0}),bottomSite:null},d={list:[],leftEnd:null,rightEnd:null,init:function(){d.leftEnd=d.createHalfEdge(null,"l"),d.rightEnd=d.createHalfEdge(null,"l"),d.leftEnd.r=d.rightEnd,d.rightEnd.l=d.leftEnd,d.list.unshift(d.leftEnd,d.rightEnd)},createHalfEdge:function(a,b){return{edge:a,side:b,vertex:null,l:null,r:null}},insert:function(a,b){b.l=a,b.r=a.r,a.r.l=b,a.r=b},leftBound:function(a){var b=d.leftEnd;do b=b.r;while(b!=d.rightEnd&&e.rightOf(b,a));return b=b.l,b},del:function(a){a.l.r=a.r,a.r.l=a.l,a.edge=null},right:function(a){return a.r},left:function(a){return a.l},leftRegion:function(a){return a.edge==null?c.bottomSite:a.edge.region[a.side]},rightRegion:function(a){return a.edge==null?c.bottomSite:a.edge.region[fi[a.side]]}},e={bisect:function(a,b){var c={region:{l:a,r:b},ep:{l:null,r:null}},d=b.x-a.x,e=b.y-a.y,f=d>0?d:-d,g=e>0?e:-e;return c.c=a.x*d+a.y*e+(d*d+e*e)*.5,f>g?(c.a=1,c.b=e/d,c.c/=d):(c.b=1,c.a=d/e,c.c/=e),c},intersect:function(a,b){var c=a.edge,d=b.edge;if(!c||!d||c.region.r==d.region.r)return null;var e=c.a*d.b-c.b*d.a;if(Math.abs(e)<1e-10)return null;var f=(c.c*d.b-d.c*c.b)/e,g=(d.c*c.a-c.c*d.a)/e,h=c.region.r,i=d.region.r,j,k;h.y<i.y||h.y==i.y&&h.x<i.x?(j=a,k=c):(j=b,k=d);var l=f>=k.region.r.x;return l&&j.side==="l"||!l&&j.side==="r"?null:{x:f,y:g}},rightOf:function(a,b){var c=a.edge,d=c.region.r,e=b.x>d.x;if(e&&a.side==="l")return 1;if(!e&&a.side==="r")return 0;if(c.a===1){var f=b.y-d.y,g=b.x-d.x,h=0,i=0;!e&&c.b<0||e&&c.b>=0?i=h=f>=c.b*g:(i=b.x+b.y*c.b>c.c,c.b<0&&(i=!i),i||(h=1));if(!h){var j=d.x-c.region.l.x;i=c.b*(g*g-f*f)<j*f*(1+2*g/j+c.b*c.b),c.b<0&&(i=!i)}}else{var k=c.c-c.a*b.x,l=b.y-k,m=b.x-d.x,n=k-d.y;i=l*l>m*m+n*n}return a.side==="l"?i:!i},endPoint:function(a,c,d){a.ep[c]=d;if(!a.ep[fi[c]])return;b(a)},distance:function(a,b){var c=a.x-b.x,d=a.y-b.y;return Math.sqrt(c*c+d*d)}},f={list:[],insert:function(a,b,c){a.vertex=b,a.ystar=b.y+c;for(var d=0,e=f.list,g=e.length;d<g;d++){var h=e[d];if(a.ystar>h.ystar||a.ystar==h.ystar&&b.x>h.vertex.x)continue;break}e.splice(d,0,a)},del:function(a){for(var b=0,c=f.list,d=c.length;b<d&&c[b]!=a;++b);c.splice(b,1)},empty:function(){return f.list.length===0},nextEvent:function(a){for(var b=0,c=f.list,d=c.length;b<d;++b)if(c[b]==a)return c[b+1];return null},min:function(){var a=f.list[0];return{x:a.vertex.x,y:a.ystar}},extractMin:function(){return f.list.shift()}};d.init(),c.bottomSite=c.list.shift();var g=c.list.shift(),h,i,j,k,l,m,n,o,p,q,r,s,t;for(;;){f.empty()||(h=f.min());if(g&&(f.empty()||g.y<h.y||g.y==h.y&&g.x<h.x))i=d.leftBound(g),j=d.right(i),n=d.rightRegion(i),s=e.bisect(n,g),m=d.createHalfEdge(s,"l"),d.insert(i,m),q=e.intersect(i,m),q&&(f.del(i),f.insert(i,q,e.distance(q,g))),i=m,m=d.createHalfEdge(s,"r"),d.insert(i,m),q=e.intersect(m,j),q&&f.insert(m,q,e.distance(q,g)),g=c.list.shift();else if(!f.empty())i=f.extractMin(),k=d.left(i),j=d.right(i),l=d.right(j),n=d.leftRegion(i),o=d.rightRegion(j),r=i.vertex,e.endPoint(i.edge,i.side,r),e.endPoint(j.edge,j.side,r),d.del(i),f.del(j),d.del(j),t="l",n.y>o.y&&(p=n,n=o,o=p,t="r"),s=e.bisect(n,o),m=d.createHalfEdge(s,t),d.insert(k,m),e.endPoint(s,fi[t],r),q=e.intersect(k,m),q&&(f.del(k),f.insert(k,q,e.distance(q,n))),q=e.intersect(m,l),q&&f.insert(m,q,e.distance(q,n));else break}for(i=d.right(d.leftEnd);i!=d.rightEnd;i=d.right(i))b(i.edge)}function fk(){return{leaf:!0,nodes:[],point:null}}function fl(a,b,c,d,e,f){if(!a(b,c,d,e,f)){var g=(c+e)*.5,h=(d+f)*.5,i=b.nodes;i[0]&&fl(a,i[0],c,d,g,h),i[1]&&fl(a,i[1],g,d,e,h),i[2]&&fl(a,i[2],c,h,g,f),i[3]&&fl(a,i[3],g,h,e,f)}}function fm(a){return{x:a[0],y:a[1]}}function fo(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function fq(a,b,c,d){var e,f,g=0,h=b.length,i=c.length;while(g<h){if(d>=i)return-1;e=b.charCodeAt(g++);if(e==37){f=fw[b.charAt(g++)];if(!f||(d=f(a,c,d))<0)return-1}else if(e!=c.charCodeAt(d++))return-1}return d}function fx(a,b,c){return fz.test(b.substring(c,c+=3))?c:-1}function fy(a,b,c){fA.lastIndex=0;var d=fA.exec(b.substring(c,c+10));return d?c+=d[0].length:-1}function fC(a,b,c){var d=fD.get(b.substring(c,c+=3).toLowerCase());return d==null?-1:(a.m=d,c)}function fE(a,b,c){fF.lastIndex=0;var d=fF.exec(b.substring(c,c+12));return d?(a.m=fG.get(d[0].toLowerCase()),c+=d[0].length):-1}function fI(a,b,c){return fq(a,fv.c.toString(),b,c)}function fJ(a,b,c){return fq(a,fv.x.toString(),b,c)}function fK(a,b,c){return fq(a,fv.X.toString(),b,c)}function fL(a,b,c){fU.lastIndex=0;var d=fU.exec(b.substring(c,c+4));return d?(a.y=+d[0],c+=d[0].length):-1}function fM(a,b,c){fU.lastIndex=0;var d=fU.exec(b.substring(c,c+2));return d?(a.y=fN()+ +d[0],c+=d[0].length):-1}function fN(){return~~((new Date).getFullYear()/1e3)*1e3}function fO(a,b,c){fU.lastIndex=0;var d=fU.exec(b.substring(c,c+2));return d?(a.m=d[0]-1,c+=d[0].length):-1}function fP(a,b,c){fU.lastIndex=0;var d=fU.exec(b.substring(c,c+2));return d?(a.d=+d[0],c+=d[0].length):-1}function fQ(a,b,c){fU.lastIndex=0;var d=fU.exec(b.substring(c,c+2));return d?(a.H=+d[0],c+=d[0].length):-1}function fR(a,b,c){fU.lastIndex=0;var d=fU.exec(b.substring(c,c+2));return d?(a.M=+d[0],c+=d[0].length):-1}function fS(a,b,c){fU.lastIndex=0;var d=fU.exec(b.substring(c,c+2));return d?(a.S=+d[0],c+=d[0].length):-1}function fT(a,b,c){fU.lastIndex=0;var d=fU.exec(b.substring(c,c+3));return d?(a.L=+d[0],c+=d[0].length):-1}function fV(a,b,c){var d=fW.get(b.substring(c,c+=2).toLowerCase());return d==null?-1:(a.p=d,c)}function fX(a){var b=a.getTimezoneOffset(),c=b>0?"-":"+",d=~~(Math.abs(b)/60),e=Math.abs(b)%60;return c+fr(d)+fr(e)}function fZ(a){return a.toISOString()}function f$(a,b,c){function d(b){var c=a(b),d=f(c,1);return b-c<d-b?c:d}function e(c){return b(c=a(new fn(c-1)),1),c}function f(a,c){return b(a=new fn(+a),c),a}function g(a,d,f){var g=e(a),h=[];if(f>1)while(g<d)c(g)%f||h.push(new Date(+g)),b(g,1);else while(g<d)h.push(new Date(+g)),b(g,1);return h}function h(a,b,c){try{fn=fo;var d=new fo;return d._=a,g(d,b,c)}finally{fn=Date}}a.floor=a,a.round=d,a.ceil=e,a.offset=f,a.range=g;var i=a.utc=f_(a);return i.floor=i,i.round=f_(d),i.ceil=f_(e),i.offset=f_(f),i.range=h,a}function f_(a){return function(b,c){try{fn=fo;var d=new fo;return d._=b,a(d,c)._}finally{fn=Date}}}function ga(a,b,c){function d(b){return a(
b)}return d.invert=function(b){return gc(a.invert(b))},d.domain=function(b){return arguments.length?(a.domain(b),d):a.domain().map(gc)},d.nice=function(a){var b=gb(d.domain());return d.domain([a.floor(b[0]),a.ceil(b[1])])},d.ticks=function(c,e){var f=gb(d.domain());if(typeof c!="function"){var g=f[1]-f[0],h=g/c,i=d3.bisect(gg,h);if(i==gg.length)return b.year(f,c);if(!i)return a.ticks(c).map(gc);Math.log(h/gg[i-1])<Math.log(gg[i]/h)&&--i,c=b[i],e=c[1],c=c[0].range}return c(f[0],new Date(+f[1]+1),e)},d.tickFormat=function(){return c},d.copy=function(){return ga(a.copy(),b,c)},d3.rebind(d,a,"range","rangeRound","interpolate","clamp")}function gb(a){var b=a[0],c=a[a.length-1];return b<c?[b,c]:[c,b]}function gc(a){return new Date(a)}function gd(a){return function(b){var c=a.length-1,d=a[c];while(!d[1](b))d=a[--c];return d[0](b)}}function ge(a){var b=new Date(a,0,1);return b.setFullYear(a),b}function gf(a){var b=a.getFullYear(),c=ge(b),d=ge(b+1);return b+(a-c)/(d-c)}function go(a){var b=new Date(Date.UTC(a,0,1));return b.setUTCFullYear(a),b}function gp(a){var b=a.getUTCFullYear(),c=go(b),d=go(b+1);return b+(a-c)/(d-c)}Date.now||(Date.now=function(){return+(new Date)});try{document.createElement("div").style.setProperty("opacity",0,"")}catch(a){var b=CSSStyleDeclaration.prototype,c=b.setProperty;b.setProperty=function(a,b,d){c.call(this,a,b+"",d)}}d3={version:"2.9.1"};var f=h;try{f(document.documentElement.childNodes)[0].nodeType}catch(i){f=g}var j=[].__proto__?function(a,b){a.__proto__=b}:function(a,b){for(var c in b)a[c]=b[c]};d3.map=function(a){var b=new k;for(var c in a)b.set(c,a[c]);return b},e(k,{has:function(a){return l+a in this},get:function(a){return this[l+a]},set:function(a,b){return this[l+a]=b},remove:function(a){return a=l+a,a in this&&delete this[a]},keys:function(){var a=[];return this.forEach(function(b){a.push(b)}),a},values:function(){var a=[];return this.forEach(function(b,c){a.push(c)}),a},entries:function(){var a=[];return this.forEach(function(b,c){a.push({key:b,value:c})}),a},forEach:function(a){for(var b in this)b.charCodeAt(0)===m&&a.call(this,b.substring(1),this[b])}});var l="\0",m=l.charCodeAt(0);d3.functor=q,d3.rebind=function(a,b){var c=1,d=arguments.length,e;while(++c<d)a[e=arguments[c]]=r(a,b,b[e]);return a},d3.ascending=function(a,b){return a<b?-1:a>b?1:a>=b?0:NaN},d3.descending=function(a,b){return b<a?-1:b>a?1:b>=a?0:NaN},d3.mean=function(a,b){var c=a.length,d,e=0,f=-1,g=0;if(arguments.length===1)while(++f<c)s(d=a[f])&&(e+=(d-e)/++g);else while(++f<c)s(d=b.call(a,a[f],f))&&(e+=(d-e)/++g);return g?e:undefined},d3.median=function(a,b){return arguments.length>1&&(a=a.map(b)),a=a.filter(s),a.length?d3.quantile(a.sort(d3.ascending),.5):undefined},d3.min=function(a,b){var c=-1,d=a.length,e,f;if(arguments.length===1){while(++c<d&&((e=a[c])==null||e!=e))e=undefined;while(++c<d)(f=a[c])!=null&&e>f&&(e=f)}else{while(++c<d&&((e=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c<d)(f=b.call(a,a[c],c))!=null&&e>f&&(e=f)}return e},d3.max=function(a,b){var c=-1,d=a.length,e,f;if(arguments.length===1){while(++c<d&&((e=a[c])==null||e!=e))e=undefined;while(++c<d)(f=a[c])!=null&&f>e&&(e=f)}else{while(++c<d&&((e=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c<d)(f=b.call(a,a[c],c))!=null&&f>e&&(e=f)}return e},d3.extent=function(a,b){var c=-1,d=a.length,e,f,g;if(arguments.length===1){while(++c<d&&((e=g=a[c])==null||e!=e))e=g=undefined;while(++c<d)(f=a[c])!=null&&(e>f&&(e=f),g<f&&(g=f))}else{while(++c<d&&((e=g=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c<d)(f=b.call(a,a[c],c))!=null&&(e>f&&(e=f),g<f&&(g=f))}return[e,g]},d3.random={normal:function(a,b){return arguments.length<2&&(b=1),arguments.length<1&&(a=0),function(){var c,d,e;do c=Math.random()*2-1,d=Math.random()*2-1,e=c*c+d*d;while(!e||e>1);return a+b*c*Math.sqrt(-2*Math.log(e)/e)}}},d3.sum=function(a,b){var c=0,d=a.length,e,f=-1;if(arguments.length===1)while(++f<d)isNaN(e=+a[f])||(c+=e);else while(++f<d)isNaN(e=+b.call(a,a[f],f))||(c+=e);return c},d3.quantile=function(a,b){var c=(a.length-1)*b+1,d=Math.floor(c),e=a[d-1],f=c-d;return f?e+f*(a[d]-e):e},d3.transpose=function(a){return d3.zip.apply(d3,a)},d3.zip=function(){if(!(e=arguments.length))return[];for(var a=-1,b=d3.min(arguments,t),c=new Array(b);++a<b;)for(var d=-1,e,f=c[a]=new Array(e);++d<e;)f[d]=arguments[d][a];return c},d3.bisector=function(a){return{left:function(b,c,d,e){arguments.length<3&&(d=0),arguments.length<4&&(e=b.length);while(d<e){var f=d+e>>1;a.call(b,b[f],f)<c?d=f+1:e=f}return d},right:function(b,c,d,e){arguments.length<3&&(d=0),arguments.length<4&&(e=b.length);while(d<e){var f=d+e>>1;c<a.call(b,b[f],f)?e=f:d=f+1}return d}}};var u=d3.bisector(function(a){return a});d3.bisectLeft=u.left,d3.bisect=d3.bisectRight=u.right,d3.first=function(a,b){var c=0,d=a.length,e=a[0],f;arguments.length===1&&(b=d3.ascending);while(++c<d)b.call(a,e,f=a[c])>0&&(e=f);return e},d3.last=function(a,b){var c=0,d=a.length,e=a[0],f;arguments.length===1&&(b=d3.ascending);while(++c<d)b.call(a,e,f=a[c])<=0&&(e=f);return e},d3.nest=function(){function f(c,g){if(g>=b.length)return e?e.call(a,c):d?c.sort(d):c;var h=-1,i=c.length,j=b[g++],l,m,n=new k,o,p={};while(++h<i)(o=n.get(l=j(m=c[h])))?o.push(m):n.set(l,[m]);return n.forEach(function(a){p[a]=f(n.get(a),g)}),p}function g(a,d){if(d>=b.length)return a;var e=[],f=c[d++],h;for(h in a)e.push({key:h,values:g(a[h],d)});return f&&e.sort(function(a,b){return f(a.key,b.key)}),e}var a={},b=[],c=[],d,e;return a.map=function(a){return f(a,0)},a.entries=function(a){return g(f(a,0),0)},a.key=function(c){return b.push(c),a},a.sortKeys=function(d){return c[b.length-1]=d,a},a.sortValues=function(b){return d=b,a},a.rollup=function(b){return e=b,a},a},d3.keys=function(a){var b=[];for(var c in a)b.push(c);return b},d3.values=function(a){var b=[];for(var c in a)b.push(a[c]);return b},d3.entries=function(a){var b=[];for(var c in a)b.push({key:c,value:a[c]});return b},d3.permute=function(a,b){var c=[],d=-1,e=b.length;while(++d<e)c[d]=a[b[d]];return c},d3.merge=function(a){return Array.prototype.concat.apply([],a)},d3.split=function(a,b){var c=[],d=[],e,f=-1,g=a.length;arguments.length<2&&(b=v);while(++f<g)b.call(d,e=a[f],f)?d=[]:(d.length||c.push(d),d.push(e));return c},d3.range=function(a,b,c){arguments.length<3&&(c=1,arguments.length<2&&(b=a,a=0));if((b-a)/c===Infinity)throw new Error("infinite range");var d=[],e=x(Math.abs(c)),f=-1,g;a*=e,b*=e,c*=e;if(c<0)while((g=a+c*++f)>b)d.push(g/e);else while((g=a+c*++f)<b)d.push(g/e);return d},d3.requote=function(a){return a.replace(y,"\\$&")};var y=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;d3.round=function(a,b){return b?Math.round(a*(b=Math.pow(10,b)))/b:Math.round(a)},d3.xhr=function(a,b,c){var d=new XMLHttpRequest;arguments.length<3?(c=b,b=null):b&&d.overrideMimeType&&d.overrideMimeType(b),d.open("GET",a,!0),b&&d.setRequestHeader("Accept",b),d.onreadystatechange=function(){if(d.readyState===4){var a=d.status;c(a>=200&&a<300||a===304?d:null)}},d.send(null)},d3.text=function(a,b,c){function d(a){c(a&&a.responseText)}arguments.length<3&&(c=b,b=null),d3.xhr(a,b,d)},d3.json=function(a,b){d3.text(a,"application/json",function(a){b(a?JSON.parse(a):null)})},d3.html=function(a,b){d3.text(a,"text/html",function(a){if(a!=null){var c=document.createRange();c.selectNode(document.body),a=c.createContextualFragment(a)}b(a)})},d3.xml=function(a,b,c){function d(a){c(a&&a.responseXML)}arguments.length<3&&(c=b,b=null),d3.xhr(a,b,d)};var z={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};d3.ns={prefix:z,qualify:function(a){var b=a.indexOf(":"),c=a;return b>=0&&(c=a.substring(0,b),a=a.substring(b+1)),z.hasOwnProperty(c)?{space:z[c],local:a}:a}},d3.dispatch=function(){var a=new A,b=-1,c=arguments.length;while(++b<c)a[arguments[b]]=B(a);return a},A.prototype.on=function(a,b){var c=a.indexOf("."),d="";return c>0&&(d=a.substring(c+1),a=a.substring(0,c)),arguments.length<2?this[a].on(d):this[a].on(d,b)},d3.format=function(a){var b=C.exec(a),c=b[1]||" ",d=b[3]||"",e=b[5],f=+b[6],g=b[7],h=b[8],i=b[9],j=1,k="",l=!1;h&&(h=+h.substring(1)),e&&(c="0",g&&(f-=Math.floor((f-1)/4)));switch(i){case"n":g=!0,i="g";break;case"%":j=100,k="%",i="f";break;case"p":j=100,k="%",i="r";break;case"d":l=!0,h=0;break;case"s":j=-1,i="r"}return i=="r"&&!h&&(i="g"),i=D.get(i)||F,function(a){if(l&&a%1)return"";var b=a<0&&(a=-a)?"âˆ’":d;if(j<0){var m=d3.formatPrefix(a,h);a*=m.scale,k=m.symbol}else a*=j;a=i(a,h);if(e){var n=a.length+b.length;n<f&&(a=(new Array(f-n+1)).join(c)+a),g&&(a=G(a)),a=b+a}else{g&&(a=G(a)),a=b+a;var n=a.length;n<f&&(a=(new Array(f-n+1)).join(c)+a)}return a+k}};var C=/(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,D=d3.map({g:function(a,b){return a.toPrecision(b)},e:function(a,b){return a.toExponential(b)},f:function(a,b){return a.toFixed(b)},r:function(a,b){return d3.round(a,b=E(a,b)).toFixed(Math.max(0,Math.min(20,b)))}}),H=["y","z","a","f","p","n","Î¼","m","","k","M","G","T","P","E","Z","Y"].map(I);d3.formatPrefix=function(a,b){var c=0;return a&&(a<0&&(a*=-1),b&&(a=d3.round(a,E(a,b))),c=1+Math.floor(1e-12+Math.log(a)/Math.LN10),c=Math.max(-24,Math.min(24,Math.floor((c<=0?c+1:c-1)/3)*3))),H[8+c/3]};var J=S(2),K=S(3),L=function(){return R},M=d3.map({linear:L,poly:S,quad:function(){return J},cubic:function(){return K},sin:function(){return T},exp:function(){return U},circle:function(){return V},elastic:W,back:X,bounce:function(){return Y}}),N=d3.map({"in":R,out:P,"in-out":Q,"out-in":function(a){return Q(P(a))}});d3.ease=function(a){var b=a.indexOf("-"),c=b>=0?a.substring(0,b):a,d=b>=0?a.substring(b+1):"in";return c=M.get(c)||L,d=N.get(d)||R,O(d(c.apply(null,Array.prototype.slice.call(arguments,1))))},d3.event=null,d3.interpolate=function(a,b){var c=d3.interpolators.length,d;while(--c>=0&&!(d=d3.interpolators[c](a,b)));return d},d3.interpolateNumber=function(a,b){return b-=a,function(c){return a+b*c}},d3.interpolateRound=function(a,b){return b-=a,function(c){return Math.round(a+b*c)}},d3.interpolateString=function(a,b){var c,d,e,f=0,g=0,h=[],i=[],j,k;ba.lastIndex=0;for(d=0;c=ba.exec(b);++d)c.index&&h.push(b.substring(f,g=c.index)),i.push({i:h.length,x:c[0]}),h.push(null),f=ba.lastIndex;f<b.length&&h.push(b.substring(f));for(d=0,j=i.length;(c=ba.exec(a))&&d<j;++d){k=i[d];if(k.x==c[0]){if(k.i)if(h[k.i+1]==null){h[k.i-1]+=k.x,h.splice(k.i,1);for(e=d+1;e<j;++e)i[e].i--}else{h[k.i-1]+=k.x+h[k.i+1],h.splice(k.i,2);for(e=d+1;e<j;++e)i[e].i-=2}else if(h[k.i+1]==null)h[k.i]=k.x;else{h[k.i]=k.x+h[k.i+1],h.splice(k.i+1,1);for(e=d+1;e<j;++e)i[e].i--}i.splice(d,1),j--,d--}else k.x=d3.interpolateNumber(parseFloat(c[0]),parseFloat(k.x))}while(d<j)k=i.pop(),h[k.i+1]==null?h[k.i]=k.x:(h[k.i]=k.x+h[k.i+1],h.splice(k.i+1,1)),j--;return h.length===1?h[0]==null?i[0].x:function(){return b}:function(a){for(d=0;d<j;++d)h[(k=i[d]).i]=k.x(a);return h.join("")}},d3.interpolateTransform=function(a,b){var c=[],d=[],e,f=d3.transform(a),g=d3.transform(b),h=f.translate,i=g.translate,j=f.rotate,k=g.rotate,l=f.skew,m=g.skew,n=f.scale,o=g.scale;return h[0]!=i[0]||h[1]!=i[1]?(c.push("translate(",null,",",null,")"),d.push({i:1,x:d3.interpolateNumber(h[0],i[0])},{i:3,x:d3.interpolateNumber(h[1],i[1])})):i[0]||i[1]?c.push("translate("+i+")"):c.push(""),j!=k?d.push({i:c.push(c.pop()+"rotate(",null,")")-2,x:d3.interpolateNumber(j,k)}):k&&c.push(c.pop()+"rotate("+k+")"),l!=m?d.push({i:c.push(c.pop()+"skewX(",null,")")-2,x:d3.interpolateNumber(l,m)}):m&&c.push(c.pop()+"skewX("+m+")"),n[0]!=o[0]||n[1]!=o[1]?(e=c.push(c.pop()+"scale(",null,",",null,")"),d.push({i:e-4,x:d3.interpolateNumber(n[0],o[0])},{i:e-2,x:d3.interpolateNumber(n[1],o[1])})):(o[0]!=1||o[1]!=1)&&c.push(c.pop()+"scale("+o+")"),e=d.length,function(a){var b=-1,f;while(++b<e)c[(f=d[b]).i]=f.x(a);return c.join("")}},d3.interpolateRgb=function(a,b){a=d3.rgb(a),b=d3.rgb(b);var c=a.r,d=a.g,e=a.b,f=b.r-c,g=b.g-d,h=b.b-e;return function(a){return"#"+bg(Math.round(c+f*a))+bg(Math.round(d+g*a))+bg(Math.round(e+h*a))}},d3.interpolateHsl=function(a,b){a=d3.hsl(a),b=d3.hsl(b);var c=a.h,d=a.s,e=a.l,f=b.h-c,g=b.s-d,h=b.l-e;return function(a){return bn(c+f*a,d+g*a,e+h*a).toString()}},d3.interpolateArray=function(a,b){var c=[],d=[],e=a.length,f=b.length,g=Math.min(a.length,b.length),h;for(h=0;h<g;++h)c.push(d3.interpolate(a[h],b[h]));for(;h<e;++h)d[h]=a[h];for(;h<f;++h)d[h]=b[h];return function(a){for(h=0;h<g;++h)d[h]=c[h](a);return d}},d3.interpolateObject=function(a,b){var c={},d={},e;for(e in a)e in b?c[e]=bb(e)(a[e],b[e]):d[e]=a[e];for(e in b)e in a||(d[e]=b[e]);return function(a){for(e in c)d[e]=c[e](a);return d}};var ba=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;d3.interpolators=[d3.interpolateObject,function(a,b){return b instanceof Array&&d3.interpolateArray(a,b)},function(a,b){return(typeof a=="string"||typeof b=="string")&&d3.interpolateString(a+"",b+"")},function(a,b){return(typeof b=="string"?bk.has(b)||/^(#|rgb\(|hsl\()/.test(b):b instanceof bf||b instanceof bm)&&d3.interpolateRgb(a,b)},function(a,b){return!isNaN(a=+a)&&!isNaN(b=+b)&&d3.interpolateNumber(a,b)}],d3.rgb=function(a,b,c){return arguments.length===1?a instanceof bf?be(a.r,a.g,a.b):bh(""+a,be,bn):be(~~a,~~b,~~c)},bf.prototype.brighter=function(a){a=Math.pow(.7,arguments.length?a:1);var b=this.r,c=this.g,d=this.b,e=30;return!b&&!c&&!d?be(e,e,e):(b&&b<e&&(b=e),c&&c<e&&(c=e),d&&d<e&&(d=e),be(Math.min(255,Math.floor(b/a)),Math.min(255,Math.floor(c/a)),Math.min(255,Math.floor(d/a))))},bf.prototype.darker=function(a){return a=Math.pow(.7,arguments.length?a:1),be(Math.floor(a*this.r),Math.floor(a*this.g),Math.floor(a*this.b))},bf.prototype.hsl=function(){return bi(this.r,this.g,this.b)},bf.prototype.toString=function(){return"#"+bg(this.r)+bg(this.g)+bg(this.b)};var bk=d3.map({aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"});bk.forEach(function(a,b){bk.set(a,bh(b,be,bn))}),d3.hsl=function(a,b,c){return arguments.length===1?a instanceof bm?bl(a.h,a.s,a.l):bh(""+a,bi,bl):bl(+a,+b,+c)},bm.prototype.brighter=function(a){return a=Math.pow(.7,arguments.length?a:1),bl(this.h,this.s,this.l/a)},bm.prototype.darker=function(a){return a=Math.pow(.7,arguments.length?a:1),bl(this.h,this.s,a*this.l)},bm.prototype.rgb=function(){return bn(this.h,this.s,this.l)},bm.prototype.toString=function(){return this.rgb().toString()};var bp=function(a,b){return b.querySelector(a)},bq=function(a,b){return b.querySelectorAll(a)},br=document.documentElement,bs=br.matchesSelector||br.webkitMatchesSelector||br.mozMatchesSelector||br.msMatchesSelector||br.oMatchesSelector,bt=function(a,b){return bs.call(a,b)};typeof Sizzle=="function"&&(bp=function(a,b){return Sizzle(a,b)[0]},bq=function(a,b){return Sizzle.uniqueSort(Sizzle(a,b))},bt=Sizzle.matchesSelector);var bu=[];d3.selection=function(){return bC},d3.selection.prototype=bu,bu.select=function(a){var b=[],c,d,e,f;typeof a!="function"&&(a=bv(a));for(var g=-1,h=this.length;++g<h;){b.push(c=[]),c.parentNode=(e=this[g]).parentNode;for(var i=-1,j=e.length;++i<j;)(f=e[i])?(c.push(d=a.call(f,f.__data__,i)),d&&"__data__"in f&&(d.__data__=f.__data__)):c.push(null)}return bo(b)},bu.selectAll=function(a){var b=[],c,d;typeof a!="function"&&(a=bw(a));for(var e=-1,g=this.length;++e<g;)for(var h=this[e],i=-1,j=h.length;++i<j;)if(d=h[i])b.push(c=f(a.call(d,d.__data__,i))),c.parentNode=d;return bo(b)},bu.attr=function(a,b){function d(){this.removeAttribute(a)}function e(){this.removeAttributeNS(a.space,a.local)}function f(){this.setAttribute(a,b)}function g(){this.setAttributeNS(a.space,a.local,b)}function h(){var c=b.apply(this,arguments);c==null?this.removeAttribute(a):this.setAttribute(a,c)}function i(){var c=b.apply(this,arguments);c==null?this.removeAttributeNS(a.space,a.local):this.setAttributeNS(a.space,a.local,c)}a=d3.ns.qualify(a);if(arguments.length<2){var c=this.node();return a.local?c.getAttributeNS(a.space,a.local):c.getAttribute(a)}return this.each(b==null?a.local?e:d:typeof b=="function"?a.local?i:h:a.local?g:f)},bu.classed=function(a,b){var c=a.split(bx),d=c.length,e=-1;if(arguments.length>1){while(++e<d)by.call(this,c[e],b);return this}while(++e<d)if(!by.call(this,c[e]))return!1;return!0};var bx=/\s+/g;bu.style=function(a,b,c){function d(){this.style.removeProperty(a)}function e(){this.style.setProperty(a,b,c)}function f(){var d=b.apply(this,arguments);d==null?this.style.removeProperty(a):this.style.setProperty(a,d,c)}return arguments.length<3&&(c=""),arguments.length<2?window.getComputedStyle(this.node(),null).getPropertyValue(a):this.each(b==null?d:typeof b=="function"?f:e)},bu.property=function(a,b){function c(){delete this[a]}function d(){this[a]=b}function e(){var c=b.apply(this,arguments);c==null?delete this[a]:this[a]=c}return arguments.length<2?this.node()[a]:this.each(b==null?c:typeof b=="function"?e:d)},bu.text=function(a){return arguments.length<1?this.node().textContent:this.each(typeof a=="function"?function(){var b=a.apply(this,arguments);this.textContent=b==null?"":b}:a==null?function(){this.textContent=""}:function(){this.textContent=a})},bu.html=function(a){return arguments.length<1?this.node().innerHTML:this.each(typeof a=="function"?function(){var b=a.apply(this,arguments);this.innerHTML=b==null?"":b}:a==null?function(){this.innerHTML=""}:function(){this.innerHTML=a})},bu.append=function(a){function b(){return this.appendChild(document.createElementNS(this.namespaceURI,a))}function c(){return this.appendChild(document.createElementNS(a.space,a.local))}return a=d3.ns.qualify(a),this.select(a.local?c:b)},bu.insert=function(a,b){function c(){return this.insertBefore(document.createElementNS(this.namespaceURI,a),bp(b,this))}function d(){return this.insertBefore(document.createElementNS(a.space,a.local),bp(b,this))}return a=d3.ns.qualify(a),this.select(a.local?d:c)},bu.remove=function(){return this.each(function(){var a=this.parentNode;a&&a.removeChild(this)})},bu.data=function(a,b){function g(a,c){var d,e=a.length,f=c.length,g=Math.min(e,f),l=Math.max(e,f),m=[],n=[],o=[],p,q;if(b){var r=new k,s=[],t,u=c.length;for(d=-1;++d<e;)t=b.call(p=a[d],p.__data__,d),r.has(t)?o[u++]=p:r.set(t,p),s.push(t);for(d=-1;++d<f;)t=b.call(c,q=c[d],d),r.has(t)?(m[d]=p=r.get(t),p.__data__=q,n[d]=o[d]=null):(n[d]=bz(q),m[d]=o[d]=null),r.remove(t);for(d=-1;++d<e;)r.has(s[d])&&(o[d]=a[d])}else{for(d=-1;++d<g;)p=a[d],q=c[d],p?(p.__data__=q,m[d]=p,n[d]=o[d]=null):(n[d]=bz(q),m[d]=o[d]=null);for(;d<f;++d)n[d]=bz(c[d]),m[d]=o[d]=null;for(;d<l;++d)o[d]=a[d],n[d]=m[d]=null}n.update=m,n.parentNode=m.parentNode=o.parentNode=a.parentNode,h.push(n),i.push(m),j.push(o)}var c=-1,d=this.length,e,f;if(!arguments.length){a=new Array(d=(e=this[0]).length);while(++c<d)if(f=e[c])a[c]=f.__data__;return a}var h=bD([]),i=bo([]),j=bo([]);if(typeof a=="function")while(++c<d)g(e=this[c],a.call(e,e.parentNode.__data__,c));else while(++c<d)g(e=this[c],a);return i.enter=function(){return h},i.exit=function(){return j},i},bu.datum=bu.map=function(a){return arguments.length<1?this.property("__data__"):this.property("__data__",a)},bu.filter=function(a){var b=[],c,d,e;typeof a!="function"&&(a=bA(a));for(var f=0,g=this.length;f<g;f++){b.push(c=[]),c.parentNode=(d=this[f]).parentNode;for(var h=0,i=d.length;h<i;h++)(e=d[h])&&a.call(e,e.__data__,h)&&c.push(e)}return bo(b)},bu.order=function(){for(var a=-1,b=this.length;++a<b;)for(var c=this[a],d=c.length-1,e=c[d],f;--d>=0;)if(f=c[d])e&&e!==f.nextSibling&&e.parentNode.insertBefore(f,e),e=f;return this},bu.sort=function(a){a=bB.apply(this,arguments);for(var b=-1,c=this.length;++b<c;)this[b].sort(a);return this.order()},bu.on=function(a,b,c){arguments.length<3&&(c=!1);var d="__on"+a,e=a.indexOf(".");return e>0&&(a=a.substring(0,e)),arguments.length<2?(e=this.node()[d])&&e._:this.each(function(e,f){function i(a){var c=d3.event;d3.event=a;try{b.call(g,g.__data__,f)}finally{d3.event=c}}var g=this,h=g[d];h&&(g.removeEventListener(a,h,h.$),delete g[d]),b&&(g.addEventListener(a,g[d]=i,i.$=c),i._=b)})},bu.each=function(a){for(var b=-1,c=this.length;++b<c;)for(var d=this[b],e=-1,f=d.length;++e<f;){var g=d[e];g&&a.call(g,g.__data__,e,b)}return this},bu.call=function(a){return a.apply(this,(arguments[0]=this,arguments)),this},bu.empty=function(){return!this.node()},bu.node=function(a){for(var b=0,c=this.length;b<c;b++)for(var d=this[b],e=0,f=d.length;e<f;e++){var g=d[e];if(g)return g}return null},bu.transition=function(){var a=[],b,c;for(var d=-1,e=this.length;++d<e;){a.push(b=[]);for(var f=this[d],g=-1,h=f.length;++g<h;)b.push((c=f[g])?{node:c,delay:bP,duration:bQ}:null)}return bF(a,bL||++bK,Date.now())};var bC=bo([[document]]);bC[0].parentNode=br,d3.select=function(a){return typeof a=="string"?bC.select(a):bo([[a]])},d3.selectAll=function(a){return typeof a=="string"?bC.selectAll(a):bo([f(a)])};var bE=[];d3.selection.enter=bD,d3.selection.enter.prototype=bE,bE.append=bu.append,bE.insert=bu.insert,bE.empty=bu.empty,bE.node=bu.node,bE.select=function(a){var b=[],c,d,e,f,g;for(var h=-1,i=this.length;++h<i;){e=(f=this[h]).update,b.push(c=[]),c.parentNode=f.parentNode;for(var j=-1,k=f.length;++j<k;)(g=f[j])?(c.push(e[j]=d=a.call(f.parentNode,g.__data__,j)),d.__data__=g.__data__):c.push(null)}return bo(b)};var bG={},bJ=[],bK=0,bL=0,bM=0,bN=250,bO=d3.ease("cubic-in-out"),bP=bM,bQ=bN,bR=bO;bJ.call=bu.call,d3.transition=function(a){return arguments.length?bL?a.transition():a:bC.transition()},d3.transition.prototype=bJ,bJ.select=function(a){var b=[],c,d,e;typeof a!="function"&&(a=bv(a));for(var f=-1,g=this.length;++f<g;){b.push(c=[]);for(var h=this[f],i=-1,j=h.length;++i<j;)(e=h[i])&&(d=a.call(e.node,e.node.__data__,i))?("__data__"in e.node&&(d.__data__=e.node.__data__),c.push({node:d,delay:e.delay,duration:e.duration})):c.push(null)}return bF(b,this.id,this.time).ease(this.ease())},bJ.selectAll=function(a){var b=[],c,d,e;typeof a!="function"&&(a=bw(a));for(var f=-1,g=this.length;++f<g;)for(var h=this[f],i=-1,j=h.length;++i<j;)if(e=h[i]){d=a.call(e.node,e.node.__data__,i),b.push(c=[]);for(var k=-1,l=d.length;++k<l;)c.push({node:d[k],delay:e.delay,duration:e.duration})}return bF(b,this.id,this.time).ease(this.ease())},bJ.attr=function(a,b){return this.attrTween(a,bI(a,b))},bJ.attrTween=function(a,b){function d(a,d){var e=b.call(this,a,d,this.getAttribute(c));return e===bG?(this.removeAttribute(c),null):e&&function(a){this.setAttribute(c,e(a))}}function e(a,d){var e=b.call(this,a,d,this.getAttributeNS(c.space,c.local));return e===bG?(this.removeAttributeNS(c.space,c.local),null):e&&function(a){this.setAttributeNS(c.space,c.local,e(a))}}var c=d3.ns.qualify(a);return this.tween("attr."+a,c.local?e:d)},bJ.style=function(a,b,c){return arguments.length<3&&(c=""),this.styleTween(a,bI(a,b),c)},bJ.styleTween=function(a,b,c){return arguments.length<3&&(c=""),this.tween("style."+a,function(d,e){var f=b.call(this,d,e,window.getComputedStyle(this,null).getPropertyValue(a));return f===bG?(this.style.removeProperty(a),null):f&&function(b){this.style.setProperty(a,f(b),c)}})},bJ.text=function(a){return this.tween("text",function(b,c){this.textContent=typeof a=="function"?a.call(this,b,c):a})},bJ.remove=function(){return this.each("end.transition",function(){var a;!this.__transition__&&(a=this.parentNode)&&a.removeChild(this)})},bJ.delay=function(a){var b=this;return b.each(typeof a=="function"?function(c,d,e){b[e][d].delay=a.apply(this,arguments)|0}:(a|=0,function(c,d,e){b[e][d].delay=a}))},bJ.duration=function(a){var b=this;return b.each(typeof a=="function"?function(c,d,e){b[e][d].duration=Math.max(1,a.apply(this,arguments)|0)}:(a=Math.max(1,a|0),function(c,d,e){b[e][d].duration=a}))},bJ.transition=function(){return this.select(o)};var bT=null,bU,bV;d3.timer=function(a,b,c){var d=!1,e,f=bT;if(arguments.length<3){if(arguments.length<2)b=0;else if(!isFinite(b))return;c=Date.now()}while(f){if(f.callback===a){f.then=c,f.delay=b,d=!0;break}e=f,f=f.next}d||(bT={callback:a,then:c,delay:b,next:bT}),bU||(bV=clearTimeout(bV),bU=1,bY(bW))},d3.timer.flush=function(){var a,b=Date.now(),c=bT;while(c)a=b-c.then,c.delay||(c.flush=c.callback(a)),c=c.next;bX()};var bY=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,17)};d3.transform=function(a){var b=document.createElementNS(d3.ns.prefix.svg,"g"),c={a:1,b:0,c:0,d:1,e:0,f:0};return(d3.transform=function(a){b.setAttribute("transform",a);var d=b.transform.baseVal.consolidate();return new bZ(d?d.matrix:c)})(a)},bZ.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var cb=180/Math.PI;d3.mouse=function(a){return cd(a,$())};var cc=/WebKit/.test(navigator.userAgent)?-1:0;d3.touches=function(a,b){return arguments.length<2&&(b=$().touches),b?f(b).map(function(b){var c=cd(a,b);return c.identifier=b.identifier,c}):[]},d3.scale={},d3.scale.linear=function(){return cj([0,1],[0,1],d3.interpolate,!1)},d3.scale.log=function(){return cr(d3.scale.linear(),ct)};var cs=d3.format(".0e");ct.pow=function(a){return Math.pow(10,a)},cu.pow=function(a){return-Math.pow(10,-a)},d3.scale.pow=function(){return cv(d3.scale.linear(),1)},d3.scale.sqrt=function(){return d3.scale.pow().exponent(.5)},d3.scale.ordinal=function(){return cx([],{t:"range",x:[]})},d3.scale.category10=function(){return d3.scale.ordinal().range(cy)},d3.scale.category20=function(){return d3.scale.ordinal().range(cz)},d3.scale.category20b=function(){return d3.scale.ordinal().range(cA)},d3.scale.category20c=function(){return d3.scale.ordinal().range(cB)};var cy=["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],cz=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],cA=["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"],cB=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];d3.scale.quantile=function(){return cC([],[])},d3.scale.quantize=function(){return cD(0,1,[0,1])},d3.scale.identity=function(){return cE([0,1])},d3.svg={},d3.svg.arc=function(){function e(){var e=a.apply(this,arguments),f=b.apply(this,arguments),g=c.apply(this,arguments)+cF,h=d.apply(this,arguments)+cF,i=(h<g&&(i=g,g=h,h=i),h-g),j=i<Math.PI?"0":"1",k=Math.cos(g),l=Math.sin(g),m=Math.cos(h),n=Math.sin(h);return i>=cG?e?"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+ -f+"A"+f+","+f+" 0 1,1 0,"+f+"M0,"+e+"A"+e+","+e+" 0 1,0 0,"+ -e+"A"+e+","+e+" 0 1,0 0,"+e+"Z":"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+ -f+"A"+f+","+f+" 0 1,1 0,"+f+"Z":e?"M"+f*k+","+f*l+"A"+f+","+f+" 0 "+j+",1 "+f*m+","+f*n+"L"+e*m+","+e*n+"A"+e+","+e+" 0 "+j+",0 "+e*k+","+e*l+"Z":"M"+f*k+","+f*l+"A"+f+","+f+" 0 "+j+",1 "+f*m+","+f*n+"L0,0"+"Z"}var a=cH,b=cI,c=cJ,d=cK;return e.innerRadius=function(b){return arguments.length?(a=q(b),e):a},e.outerRadius=function(a){return arguments.length?(b=q(a),e):b},e.startAngle=function(a){return arguments.length?(c=q(a),e):c},e.endAngle=function(a){return arguments.length?(d=q(a),e):d},e.centroid=function(){var e=(a.apply(this,arguments)+b.apply(this,arguments))/2,f=(c.apply(this,arguments)+d.apply(this,arguments))/2+cF;return[Math.cos(f)*e,Math.sin(f)*e]},e};var cF=-Math.PI/2,cG=2*Math.PI-1e-6;d3.svg.line=function(){return cL(n)};var cO="linear",cP=d3.map({linear:cQ,"step-before":cR,"step-after":cS,basis:cY,"basis-open":cZ,"basis-closed":c$,bundle:c_,cardinal:cV,"cardinal-open":cT,"cardinal-closed":cU,monotone:di}),db=[0,2/3,1/3,0],dc=[0,1/3,2/3,0],dd=[0,1/6,2/3,1/6];d3.svg.line.radial=function(){var a=cL(dj);return a.radius=a.x,delete a.x,a.angle=a.y,delete a.y,a},cR.reverse=cS,cS.reverse=cR,d3.svg.area=function(){return dk(Object)},d3.svg.area.radial=function(){var a=dk(dj);return a.radius=a.x,delete a.x,a.innerRadius=a.x0,delete a.x0,a.outerRadius=a.x1,delete a.x1,a.angle=a.y,delete a.y,a.startAngle=a.y0,delete a.y0,a.endAngle=a.y1,delete a.y1,a},d3.svg.chord=function(){function f(c,d){var e=g(this,a,c,d),f=g(this,b,c,d);return"M"+e.p0+i(e.r,e.p1,e.a1-e.a0)+(h(e,f)?j(e.r,e.p1,e.r,e.p0):j(e.r,e.p1,f.r,f.p0)+i(f.r,f.p1,f.a1-f.a0)+j(f.r,f.p1,e.r,e.p0))+"Z"}function g(a,b,f,g){var h=b.call(a,f,g),i=c.call(a,h,g),j=d.call(a,h,g)+cF,k=e.call(a,h,g)+cF;return{r:i,a0:j,a1:k,p0:[i*Math.cos(j),i*Math.sin(j)],p1:[i*Math.cos(k),i*Math.sin(k)]}}function h(a,b){return a.a0==b.a0&&a.a1==b.a1}function i(a,b,c){return"A"+a+","+a+" 0 "+ +(c>Math.PI)+",1 "+b}function j(a,b,c,d){return"Q 0,0 "+d}var a=dl,b=dm,c=dn,d=cJ,e=cK;return f.radius=function(a){return arguments.length?(c=q(a),f):c},f.source=function(b){return arguments.length?(a=q(b),f):a},f.target=function(a){return arguments.length?(b=q(a),f):b},f.startAngle=function(a){return arguments.length?(d=q(a),f):d},f.endAngle=function(a){return arguments.length?(e=q(a),f):e},f},d3.svg.diagonal=function(){function d(d,e){var f=a.call(this,d,e),g=b.call(this,d,e),h=(f.y+g.y)/2,i=[f,{x:f.x,y:h},{x:g.x,y:h},g];return i=i.map(c),"M"+i[0]+"C"+i[1]+" "+i[2]+" "+i[3]}var a=dl,b=dm,c=dr;return d.source=function(b){return arguments.length?(a=q(b),d):a},d.target=function(a){return arguments.length?(b=q(a),d):b},d.projection=function(a){return arguments.length?(c=a,d):c},d},d3.svg.diagonal.radial=function(){var a=d3.svg.diagonal(),b=dr,c=a.projection;return a.projection=function(a){return arguments.length?c(ds(b=a)):b},a},d3.svg.mouse=d3.mouse,d3.svg.touches=d3.touches,d3.svg.symbol=function(){function c(c,d){return(dw.get(a.call(this,c,d))||dv)(b.call(this,c,d))}var a=du,b=dt;return c
.type=function(b){return arguments.length?(a=q(b),c):a},c.size=function(a){return arguments.length?(b=q(a),c):b},c};var dw=d3.map({circle:dv,cross:function(a){var b=Math.sqrt(a/5)/2;return"M"+ -3*b+","+ -b+"H"+ -b+"V"+ -3*b+"H"+b+"V"+ -b+"H"+3*b+"V"+b+"H"+b+"V"+3*b+"H"+ -b+"V"+b+"H"+ -3*b+"Z"},diamond:function(a){var b=Math.sqrt(a/(2*dy)),c=b*dy;return"M0,"+ -b+"L"+c+",0"+" 0,"+b+" "+ -c+",0"+"Z"},square:function(a){var b=Math.sqrt(a)/2;return"M"+ -b+","+ -b+"L"+b+","+ -b+" "+b+","+b+" "+ -b+","+b+"Z"},"triangle-down":function(a){var b=Math.sqrt(a/dx),c=b*dx/2;return"M0,"+c+"L"+b+","+ -c+" "+ -b+","+ -c+"Z"},"triangle-up":function(a){var b=Math.sqrt(a/dx),c=b*dx/2;return"M0,"+ -c+"L"+b+","+c+" "+ -b+","+c+"Z"}});d3.svg.symbolTypes=dw.keys();var dx=Math.sqrt(3),dy=Math.tan(30*Math.PI/180);d3.svg.axis=function(){function k(k){k.each(function(){var k=d3.select(this),l=h==null?a.ticks?a.ticks.apply(a,g):a.domain():h,m=i==null?a.tickFormat?a.tickFormat.apply(a,g):String:i,n=dB(a,l,j),o=k.selectAll(".minor").data(n,String),p=o.enter().insert("line","g").attr("class","tick minor").style("opacity",1e-6),q=d3.transition(o.exit()).style("opacity",1e-6).remove(),r=d3.transition(o).style("opacity",1),s=k.selectAll("g").data(l,String),t=s.enter().insert("g","path").style("opacity",1e-6),u=d3.transition(s.exit()).style("opacity",1e-6).remove(),v=d3.transition(s).style("opacity",1),w,x=cg(a),y=k.selectAll(".domain").data([0]),z=y.enter().append("path").attr("class","domain"),A=d3.transition(y),B=a.copy(),C=this.__chart__||B;this.__chart__=B,t.append("line").attr("class","tick"),t.append("text"),v.select("text").text(m);switch(b){case"bottom":w=dz,p.attr("y2",d),r.attr("x2",0).attr("y2",d),t.select("line").attr("y2",c),t.select("text").attr("y",Math.max(c,0)+f),v.select("line").attr("x2",0).attr("y2",c),v.select("text").attr("x",0).attr("y",Math.max(c,0)+f).attr("dy",".71em").attr("text-anchor","middle"),A.attr("d","M"+x[0]+","+e+"V0H"+x[1]+"V"+e);break;case"top":w=dz,p.attr("y2",-d),r.attr("x2",0).attr("y2",-d),t.select("line").attr("y2",-c),t.select("text").attr("y",-(Math.max(c,0)+f)),v.select("line").attr("x2",0).attr("y2",-c),v.select("text").attr("x",0).attr("y",-(Math.max(c,0)+f)).attr("dy","0em").attr("text-anchor","middle"),A.attr("d","M"+x[0]+","+ -e+"V0H"+x[1]+"V"+ -e);break;case"left":w=dA,p.attr("x2",-d),r.attr("x2",-d).attr("y2",0),t.select("line").attr("x2",-c),t.select("text").attr("x",-(Math.max(c,0)+f)),v.select("line").attr("x2",-c).attr("y2",0),v.select("text").attr("x",-(Math.max(c,0)+f)).attr("y",0).attr("dy",".32em").attr("text-anchor","end"),A.attr("d","M"+ -e+","+x[0]+"H0V"+x[1]+"H"+ -e);break;case"right":w=dA,p.attr("x2",d),r.attr("x2",d).attr("y2",0),t.select("line").attr("x2",c),t.select("text").attr("x",Math.max(c,0)+f),v.select("line").attr("x2",c).attr("y2",0),v.select("text").attr("x",Math.max(c,0)+f).attr("y",0).attr("dy",".32em").attr("text-anchor","start"),A.attr("d","M"+e+","+x[0]+"H0V"+x[1]+"H"+e)}if(a.ticks)t.call(w,C),v.call(w,B),u.call(w,B),p.call(w,C),r.call(w,B),q.call(w,B);else{var D=B.rangeBand()/2,E=function(a){return B(a)+D};t.call(w,E),v.call(w,E)}})}var a=d3.scale.linear(),b="bottom",c=6,d=6,e=6,f=3,g=[10],h=null,i,j=0;return k.scale=function(b){return arguments.length?(a=b,k):a},k.orient=function(a){return arguments.length?(b=a,k):b},k.ticks=function(){return arguments.length?(g=arguments,k):g},k.tickValues=function(a){return arguments.length?(h=a,k):h},k.tickFormat=function(a){return arguments.length?(i=a,k):i},k.tickSize=function(a,b,f){if(!arguments.length)return c;var g=arguments.length-1;return c=+a,d=g>1?+b:c,e=g>0?+arguments[g]:c,k},k.tickPadding=function(a){return arguments.length?(f=+a,k):f},k.tickSubdivide=function(a){return arguments.length?(j=+a,k):j},k},d3.svg.brush=function(){function g(a){a.each(function(){var a=d3.select(this),e=a.selectAll(".background").data([0]),f=a.selectAll(".extent").data([0]),l=a.selectAll(".resize").data(d,String),m;a.style("pointer-events","all").on("mousedown.brush",k).on("touchstart.brush",k),e.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),f.enter().append("rect").attr("class","extent").style("cursor","move"),l.enter().append("g").attr("class",function(a){return"resize "+a}).style("cursor",function(a){return dC[a]}).append("rect").attr("x",function(a){return/[ew]$/.test(a)?-3:null}).attr("y",function(a){return/^[ns]/.test(a)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),l.style("display",g.empty()?"none":null),l.exit().remove(),b&&(m=cg(b),e.attr("x",m[0]).attr("width",m[1]-m[0]),i(a)),c&&(m=cg(c),e.attr("y",m[0]).attr("height",m[1]-m[0]),j(a)),h(a)})}function h(a){a.selectAll(".resize").attr("transform",function(a){return"translate("+e[+/e$/.test(a)][0]+","+e[+/^s/.test(a)][1]+")"})}function i(a){a.select(".extent").attr("x",e[0][0]),a.selectAll(".extent,.n>rect,.s>rect").attr("width",e[1][0]-e[0][0])}function j(a){a.select(".extent").attr("y",e[0][1]),a.selectAll(".extent,.e>rect,.w>rect").attr("height",e[1][1]-e[0][1])}function k(){function x(){var a=d3.event.changedTouches;return a?d3.touches(d,a)[0]:d3.mouse(d)}function y(){d3.event.keyCode==32&&(q||(r=null,s[0]-=e[1][0],s[1]-=e[1][1],q=2),Z())}function z(){d3.event.keyCode==32&&q==2&&(s[0]+=e[1][0],s[1]+=e[1][1],q=0,Z())}function A(){var a=x(),d=!1;t&&(a[0]+=t[0],a[1]+=t[1]),q||(d3.event.altKey?(r||(r=[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2]),s[0]=e[+(a[0]<r[0])][0],s[1]=e[+(a[1]<r[1])][1]):r=null),o&&B(a,b,0)&&(i(m),d=!0),p&&B(a,c,1)&&(j(m),d=!0),d&&(h(m),l({type:"brush",mode:q?"move":"resize"}))}function B(a,b,c){var d=cg(b),g=d[0],h=d[1],i=s[c],j=e[1][c]-e[0][c],k,l;q&&(g-=i,h-=j+i),k=Math.max(g,Math.min(h,a[c])),q?l=(k+=i)+j:(r&&(i=Math.max(g,Math.min(h,2*r[c]-k))),i<k?(l=k,k=i):l=i);if(e[0][c]!==k||e[1][c]!==l)return f=null,e[0][c]=k,e[1][c]=l,!0}function C(){A(),m.style("pointer-events","all").selectAll(".resize").style("display",g.empty()?"none":null),d3.select("body").style("cursor",null),u.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),l({type:"brushend"}),Z()}var d=this,k=d3.select(d3.event.target),l=a.of(d,arguments),m=d3.select(d),n=k.datum(),o=!/^(n|s)$/.test(n)&&b,p=!/^(e|w)$/.test(n)&&c,q=k.classed("extent"),r,s=x(),t,u=d3.select(window).on("mousemove.brush",A).on("mouseup.brush",C).on("touchmove.brush",A).on("touchend.brush",C).on("keydown.brush",y).on("keyup.brush",z);if(q)s[0]=e[0][0]-s[0],s[1]=e[0][1]-s[1];else if(n){var v=+/w$/.test(n),w=+/^n/.test(n);t=[e[1-v][0]-s[0],e[1-w][1]-s[1]],s[0]=e[v][0],s[1]=e[w][1]}else d3.event.altKey&&(r=s.slice());m.style("pointer-events","none").selectAll(".resize").style("display",null),d3.select("body").style("cursor",k.style("cursor")),l({type:"brushstart"}),A(),Z()}var a=_(g,"brushstart","brush","brushend"),b=null,c=null,d=dD[0],e=[[0,0],[0,0]],f;return g.x=function(a){return arguments.length?(b=a,d=dD[!b<<1|!c],g):b},g.y=function(a){return arguments.length?(c=a,d=dD[!b<<1|!c],g):c},g.extent=function(a){var d,h,i,j,k;return arguments.length?(f=[[0,0],[0,0]],b&&(d=a[0],h=a[1],c&&(d=d[0],h=h[0]),f[0][0]=d,f[1][0]=h,b.invert&&(d=b(d),h=b(h)),h<d&&(k=d,d=h,h=k),e[0][0]=d|0,e[1][0]=h|0),c&&(i=a[0],j=a[1],b&&(i=i[1],j=j[1]),f[0][1]=i,f[1][1]=j,c.invert&&(i=c(i),j=c(j)),j<i&&(k=i,i=j,j=k),e[0][1]=i|0,e[1][1]=j|0),g):(a=f||e,b&&(d=a[0][0],h=a[1][0],f||(d=e[0][0],h=e[1][0],b.invert&&(d=b.invert(d),h=b.invert(h)),h<d&&(k=d,d=h,h=k))),c&&(i=a[0][1],j=a[1][1],f||(i=e[0][1],j=e[1][1],c.invert&&(i=c.invert(i),j=c.invert(j)),j<i&&(k=i,i=j,j=k))),b&&c?[[d,i],[h,j]]:b?[d,h]:c&&[i,j])},g.clear=function(){return f=null,e[0][0]=e[0][1]=e[1][0]=e[1][1]=0,g},g.empty=function(){return b&&e[0][0]===e[1][0]||c&&e[0][1]===e[1][1]},d3.rebind(g,a,"on")};var dC={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},dD=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]];d3.behavior={},d3.behavior.drag=function(){function c(){this.on("mousedown.drag",d).on("touchstart.drag",d)}function d(){function j(){var a=c.parentNode,b=d3.event.changedTouches;return b?d3.touches(a,b)[0]:d3.mouse(a)}function k(){if(!c.parentNode)return l();var a=j(),b=a[0]-g[0],e=a[1]-g[1];h|=b|e,g=a,Z(),d({type:"drag",x:a[0]+f[0],y:a[1]+f[1],dx:b,dy:e})}function l(){d({type:"dragend"}),h&&(Z(),d3.event.target===e&&i.on("click.drag",m,!0)),i.on("mousemove.drag",null).on("touchmove.drag",null).on("mouseup.drag",null).on("touchend.drag",null)}function m(){Z(),i.on("click.drag",null)}var c=this,d=a.of(c,arguments),e=d3.event.target,f,g=j(),h=0,i=d3.select(window).on("mousemove.drag",k).on("touchmove.drag",k).on("mouseup.drag",l,!0).on("touchend.drag",l,!0);b?(f=b.apply(c,arguments),f=[f.x-g[0],f.y-g[1]]):f=[0,0],Z(),d({type:"dragstart"})}var a=_(c,"drag","dragstart","dragend"),b=null;return c.origin=function(a){return arguments.length?(b=a,c):b},d3.rebind(c,a,"on")},d3.behavior.zoom=function(){function l(){this.on("mousedown.zoom",r).on("mousewheel.zoom",s).on("mousemove.zoom",t).on("DOMMouseScroll.zoom",s).on("dblclick.zoom",u).on("touchstart.zoom",v).on("touchmove.zoom",w).on("touchend.zoom",v)}function m(b){return[(b[0]-a[0])/c,(b[1]-a[1])/c]}function n(b){return[b[0]*c+a[0],b[1]*c+a[1]]}function o(a){c=Math.max(e[0],Math.min(e[1],a))}function p(b,c){c=n(c),a[0]+=b[0]-c[0],a[1]+=b[1]-c[1]}function q(b){h&&h.domain(g.range().map(function(b){return(b-a[0])/c}).map(g.invert)),j&&j.domain(i.range().map(function(b){return(b-a[1])/c}).map(i.invert)),d3.event.preventDefault(),b({type:"zoom",scale:c,translate:a})}function r(){function h(){d=1,p(d3.mouse(a),g),q(b)}function i(){d&&Z(),e.on("mousemove.zoom",null).on("mouseup.zoom",null),d&&d3.event.target===c&&e.on("click.zoom",j,!0)}function j(){Z(),e.on("click.zoom",null)}var a=this,b=f.of(a,arguments),c=d3.event.target,d=0,e=d3.select(window).on("mousemove.zoom",h).on("mouseup.zoom",i),g=m(d3.mouse(a));window.focus(),Z()}function s(){b||(b=m(d3.mouse(this))),o(Math.pow(2,dG()*.002)*c),p(d3.mouse(this),b),q(f.of(this,arguments))}function t(){b=null}function u(){var a=d3.mouse(this),b=m(a);o(d3.event.shiftKey?c/2:c*2),p(a,b),q(f.of(this,arguments))}function v(){var a=d3.touches(this),e=Date.now();d=c,b={},a.forEach(function(a){b[a.identifier]=m(a)}),Z();if(a.length===1&&e-k<500){var g=a[0],h=m(a[0]);o(c*2),p(g,h),q(f.of(this,arguments))}k=e}function w(){var a=d3.touches(this),c=a[0],e=b[c.identifier];if(g=a[1]){var g,h=b[g.identifier];c=[(c[0]+g[0])/2,(c[1]+g[1])/2],e=[(e[0]+h[0])/2,(e[1]+h[1])/2],o(d3.event.scale*d)}p(c,e),q(f.of(this,arguments))}var a=[0,0],b,c=1,d,e=dF,f=_(l,"zoom"),g,h,i,j,k;return l.translate=function(b){return arguments.length?(a=b.map(Number),l):a},l.scale=function(a){return arguments.length?(c=+a,l):c},l.scaleExtent=function(a){return arguments.length?(e=a==null?dF:a.map(Number),l):e},l.x=function(a){return arguments.length?(h=a,g=a.copy(),l):h},l.y=function(a){return arguments.length?(j=a,i=a.copy(),l):j},d3.rebind(l,f,"on")};var dE,dF=[0,Infinity];d3.layout={},d3.layout.bundle=function(){return function(a){var b=[],c=-1,d=a.length;while(++c<d)b.push(dH(a[c]));return b}},d3.layout.chord=function(){function j(){var a={},j=[],l=d3.range(e),m=[],n,o,p,q,r;b=[],c=[],n=0,q=-1;while(++q<e){o=0,r=-1;while(++r<e)o+=d[q][r];j.push(o),m.push(d3.range(e)),n+=o}g&&l.sort(function(a,b){return g(j[a],j[b])}),h&&m.forEach(function(a,b){a.sort(function(a,c){return h(d[b][a],d[b][c])})}),n=(2*Math.PI-f*e)/n,o=0,q=-1;while(++q<e){p=o,r=-1;while(++r<e){var s=l[q],t=m[s][r],u=d[s][t],v=o,w=o+=u*n;a[s+"-"+t]={index:s,subindex:t,startAngle:v,endAngle:w,value:u}}c[s]={index:s,startAngle:p,endAngle:o,value:(o-p)/n},o+=f}q=-1;while(++q<e){r=q-1;while(++r<e){var x=a[q+"-"+r],y=a[r+"-"+q];(x.value||y.value)&&b.push(x.value<y.value?{source:y,target:x}:{source:x,target:y})}}i&&k()}function k(){b.sort(function(a,b){return i((a.source.value+a.target.value)/2,(b.source.value+b.target.value)/2)})}var a={},b,c,d,e,f=0,g,h,i;return a.matrix=function(f){return arguments.length?(e=(d=f)&&d.length,b=c=null,a):d},a.padding=function(d){return arguments.length?(f=d,b=c=null,a):f},a.sortGroups=function(d){return arguments.length?(g=d,b=c=null,a):g},a.sortSubgroups=function(c){return arguments.length?(h=c,b=null,a):h},a.sortChords=function(c){return arguments.length?(i=c,b&&k(),a):i},a.chords=function(){return b||j(),b},a.groups=function(){return c||j(),c},a},d3.layout.force=function(){function t(a){return function(b,c,d,e,f){if(b.point!==a){var g=b.cx-a.x,h=b.cy-a.y,i=1/Math.sqrt(g*g+h*h);if((e-c)*i<k){var j=b.charge*i*i;return a.px-=g*j,a.py-=h*j,!0}if(b.point&&isFinite(i)){var j=b.pointCharge*i*i;a.px-=g*j,a.py-=h*j}}return!b.charge}}function u(b){dM(dL=b),dK=a}var a={},b=d3.dispatch("start","tick","end"),c=[1,1],d,e,f=.9,g=dR,h=dS,i=-30,j=.1,k=.8,l,m=[],o=[],p,r,s;return a.tick=function(){if((e*=.99)<.005)return b.end({type:"end",alpha:e=0}),!0;var a=m.length,d=o.length,g,h,k,l,n,q,u,v,w;for(h=0;h<d;++h){k=o[h],l=k.source,n=k.target,v=n.x-l.x,w=n.y-l.y;if(q=v*v+w*w)q=e*r[h]*((q=Math.sqrt(q))-p[h])/q,v*=q,w*=q,n.x-=v*(u=l.weight/(n.weight+l.weight)),n.y-=w*u,l.x+=v*(u=1-u),l.y+=w*u}if(u=e*j){v=c[0]/2,w=c[1]/2,h=-1;if(u)while(++h<a)k=m[h],k.x+=(v-k.x)*u,k.y+=(w-k.y)*u}if(i){dQ(g=d3.geom.quadtree(m),e,s),h=-1;while(++h<a)(k=m[h]).fixed||g.visit(t(k))}h=-1;while(++h<a)k=m[h],k.fixed?(k.x=k.px,k.y=k.py):(k.x-=(k.px-(k.px=k.x))*f,k.y-=(k.py-(k.py=k.y))*f);b.tick({type:"tick",alpha:e})},a.nodes=function(b){return arguments.length?(m=b,a):m},a.links=function(b){return arguments.length?(o=b,a):o},a.size=function(b){return arguments.length?(c=b,a):c},a.linkDistance=function(b){return arguments.length?(g=q(b),a):g},a.distance=a.linkDistance,a.linkStrength=function(b){return arguments.length?(h=q(b),a):h},a.friction=function(b){return arguments.length?(f=b,a):f},a.charge=function(b){return arguments.length?(i=typeof b=="function"?b:+b,a):i},a.gravity=function(b){return arguments.length?(j=b,a):j},a.theta=function(b){return arguments.length?(k=b,a):k},a.alpha=function(c){return arguments.length?(e?c>0?e=c:e=0:c>0&&(b.start({type:"start",alpha:e=c}),d3.timer(a.tick)),a):e},a.start=function(){function q(a,c){var d=t(b),e=-1,f=d.length,g;while(++e<f)if(!isNaN(g=d[e][a]))return g;return Math.random()*c}function t(){if(!l){l=[];for(d=0;d<e;++d)l[d]=[];for(d=0;d<f;++d){var a=o[d];l[a.source.index].push(a.target),l[a.target.index].push(a.source)}}return l[b]}var b,d,e=m.length,f=o.length,j=c[0],k=c[1],l,n;for(b=0;b<e;++b)(n=m[b]).index=b,n.weight=0;p=[],r=[];for(b=0;b<f;++b)n=o[b],typeof n.source=="number"&&(n.source=m[n.source]),typeof n.target=="number"&&(n.target=m[n.target]),p[b]=g.call(this,n,b),r[b]=h.call(this,n,b),++n.source.weight,++n.target.weight;for(b=0;b<e;++b)n=m[b],isNaN(n.x)&&(n.x=q("x",j)),isNaN(n.y)&&(n.y=q("y",k)),isNaN(n.px)&&(n.px=n.x),isNaN(n.py)&&(n.py=n.y);s=[];if(typeof i=="function")for(b=0;b<e;++b)s[b]=+i.call(this,m[b],b);else for(b=0;b<e;++b)s[b]=i;return a.resume()},a.resume=function(){return a.alpha(.1)},a.stop=function(){return a.alpha(0)},a.drag=function(){d||(d=d3.behavior.drag().origin(n).on("dragstart",u).on("drag",dP).on("dragend",dO)),this.on("mouseover.force",dM).on("mouseout.force",dN).call(d)},d3.rebind(a,b,"on")};var dK,dL;d3.layout.partition=function(){function c(a,b,d,e){var f=a.children;a.x=b,a.y=a.depth*e,a.dx=d,a.dy=e;if(f&&(h=f.length)){var g=-1,h,i,j;d=a.value?d/a.value:0;while(++g<h)c(i=f[g],b,j=i.value*d,e),b+=j}}function d(a){var b=a.children,c=0;if(b&&(f=b.length)){var e=-1,f;while(++e<f)c=Math.max(c,d(b[e]))}return 1+c}function e(e,f){var g=a.call(this,e,f);return c(g[0],0,b[0],b[1]/d(g[0])),g}var a=d3.layout.hierarchy(),b=[1,1];return e.size=function(a){return arguments.length?(b=a,e):b},ef(e,a)},d3.layout.pie=function(){function f(g,h){var i=g.map(function(b,c){return+a.call(f,b,c)}),j=+(typeof c=="function"?c.apply(this,arguments):c),k=((typeof e=="function"?e.apply(this,arguments):e)-c)/d3.sum(i),l=d3.range(g.length);b!=null&&l.sort(b===dT?function(a,b){return i[b]-i[a]}:function(a,c){return b(g[a],g[c])});var m=[];return l.forEach(function(a){m[a]={data:g[a],value:d=i[a],startAngle:j,endAngle:j+=d*k}}),m}var a=Number,b=dT,c=0,e=2*Math.PI;return f.value=function(b){return arguments.length?(a=b,f):a},f.sort=function(a){return arguments.length?(b=a,f):b},f.startAngle=function(a){return arguments.length?(c=a,f):c},f.endAngle=function(a){return arguments.length?(e=a,f):e},f};var dT={};d3.layout.stack=function(){function g(h,i){var j=h.map(function(b,c){return a.call(g,b,c)}),k=j.map(function(a,b){return a.map(function(a,b){return[e.call(g,a,b),f.call(g,a,b)]})}),l=b.call(g,k,i);j=d3.permute(j,l),k=d3.permute(k,l);var m=c.call(g,k,i),n=j.length,o=j[0].length,p,q,r;for(q=0;q<o;++q){d.call(g,j[0][q],r=m[q],k[0][q][1]);for(p=1;p<n;++p)d.call(g,j[p][q],r+=k[p-1][q][1],k[p][q][1])}return h}var a=n,b=dZ,c=d$,d=dW,e=dU,f=dV;return g.values=function(b){return arguments.length?(a=b,g):a},g.order=function(a){return arguments.length?(b=typeof a=="function"?a:dX.get(a)||dZ,g):b},g.offset=function(a){return arguments.length?(c=typeof a=="function"?a:dY.get(a)||d$,g):c},g.x=function(a){return arguments.length?(e=a,g):e},g.y=function(a){return arguments.length?(f=a,g):f},g.out=function(a){return arguments.length?(d=a,g):d},g};var dX=d3.map({"inside-out":function(a){var b=a.length,c,d,e=a.map(d_),f=a.map(ea),g=d3.range(b).sort(function(a,b){return e[a]-e[b]}),h=0,i=0,j=[],k=[];for(c=0;c<b;++c)d=g[c],h<i?(h+=f[d],j.push(d)):(i+=f[d],k.push(d));return k.reverse().concat(j)},reverse:function(a){return d3.range(a.length).reverse()},"default":dZ}),dY=d3.map({silhouette:function(a){var b=a.length,c=a[0].length,d=[],e=0,f,g,h,i=[];for(g=0;g<c;++g){for(f=0,h=0;f<b;f++)h+=a[f][g][1];h>e&&(e=h),d.push(h)}for(g=0;g<c;++g)i[g]=(e-d[g])/2;return i},wiggle:function(a){var b=a.length,c=a[0],d=c.length,e=0,f,g,h,i,j,k,l,m,n,o=[];o[0]=m=n=0;for(g=1;g<d;++g){for(f=0,i=0;f<b;++f)i+=a[f][g][1];for(f=0,j=0,l=c[g][0]-c[g-1][0];f<b;++f){for(h=0,k=(a[f][g][1]-a[f][g-1][1])/(2*l);h<f;++h)k+=(a[h][g][1]-a[h][g-1][1])/l;j+=k*a[f][g][1]}o[g]=m-=i?j/i*l:0,m<n&&(n=m)}for(g=0;g<d;++g)o[g]-=n;return o},expand:function(a){var b=a.length,c=a[0].length,d=1/b,e,f,g,h=[];for(f=0;f<c;++f){for(e=0,g=0;e<b;e++)g+=a[e][f][1];if(g)for(e=0;e<b;e++)a[e][f][1]/=g;else for(e=0;e<b;e++)a[e][f][1]=d}for(f=0;f<c;++f)h[f]=0;return h},zero:d$});d3.layout.histogram=function(){function e(e,f){var g=[],h=e.map(b,this),i=c.call(this,h,f),j=d.call(this,i,h,f),k,f=-1,l=h.length,m=j.length-1,n=a?1:1/l,o;while(++f<m)k=g[f]=[],k.dx=j[f+1]-(k.x=j[f]),k.y=0;if(m>0){f=-1;while(++f<l)o=h[f],o>=i[0]&&o<=i[1]&&(k=g[d3.bisect(j,o,1,m)-1],k.y+=n,k.push(e[f]))}return g}var a=!0,b=Number,c=ee,d=ec;return e.value=function(a){return arguments.length?(b=a,e):b},e.range=function(a){return arguments.length?(c=q(a),e):c},e.bins=function(a){return arguments.length?(d=typeof a=="number"?function(b){return ed(b,a)}:q(a),e):d},e.frequency=function(b){return arguments.length?(a=!!b,e):a},e},d3.layout.hierarchy=function(){function e(f,h,i){var j=b.call(g,f,h),k=ek?f:{data:f};k.depth=h,i.push(k);if(j&&(m=j.length)){var l=-1,m,n=k.children=[],o=0,p=h+1;while(++l<m)d=e(j[l],p,i),d.parent=k,n.push(d),o+=d.value;a&&n.sort(a),c&&(k.value=o)}else c&&(k.value=+c.call(g,f,h)||0);return k}function f(a,b){var d=a.children,e=0;if(d&&(i=d.length)){var h=-1,i,j=b+1;while(++h<i)e+=f(d[h],j)}else c&&(e=+c.call(g,ek?a:a.data,b)||0);return c&&(a.value=e),e}function g(a){var b=[];return e(a,0,b),b}var a=ei,b=eg,c=eh;return g.sort=function(b){return arguments.length?(a=b,g):a},g.children=function(a){return arguments.length?(b=a,g):b},g.value=function(a){return arguments.length?(c=a,g):c},g.revalue=function(a){return f(a,0),a},g};var ek=!1;d3.layout.pack=function(){function c(c,d){var e=a.call(this,c,d),f=e[0];f.x=0,f.y=0,es(f);var g=b[0],h=b[1],i=1/Math.max(2*f.r/g,2*f.r/h);return et(f,g/2,h/2,i),e}var a=d3.layout.hierarchy().sort(el),b=[1,1];return c.size=function(a){return arguments.length?(b=a,c):b},ef(c,a)},d3.layout.cluster=function(){function d(d,e){var f=a.call(this,d,e),g=f[0],h,i=0,j,k;eG(g,function(a){var c=a.children;c&&c.length?(a.x=ew(c),a.y=ev(c)):(a.x=h?i+=b(a,h):0,a.y=0,h=a)});var l=ex(g),m=ey(g),n=l.x-b(l,m)/2,o=m.x+b(m,l)/2;return eG(g,function(a){a.x=(a.x-n)/(o-n)*c[0],a.y=(1-(g.y?a.y/g.y:1))*c[1]}),f}var a=d3.layout.hierarchy().sort(null).value(null),b=ez,c=[1,1];return d.separation=function(a){return arguments.length?(b=a,d):b},d.size=function(a){return arguments.length?(c=a,d):c},ef(d,a)},d3.layout.tree=function(){function d(d,e){function h(a,c){var d=a.children,e=a._tree;if(d&&(f=d.length)){var f,g=d[0],i,k=g,l,m=-1;while(++m<f)l=d[m],h(l,i),k=j(l,i,k),i=l;eH(a);var n=.5*(g._tree.prelim+l._tree.prelim);c?(e.prelim=c._tree.prelim+b(a,c),e.mod=e.prelim-n):e.prelim=n}else c&&(e.prelim=c._tree.prelim+b(a,c))}function i(a,b){a.x=a._tree.prelim+b;var c=a.children;if(c&&(e=c.length)){var d=-1,e;b+=a._tree.mod;while(++d<e)i(c[d],b)}}function j(a,c,d){if(c){var e=a,f=a,g=c,h=a.parent.children[0],i=e._tree.mod,j=f._tree.mod,k=g._tree.mod,l=h._tree.mod,m;while(g=eB(g),e=eA(e),g&&e)h=eA(h),f=eB(f),f._tree.ancestor=a,m=g._tree.prelim+k-e._tree.prelim-i+b(g,e),m>0&&(eI(eJ(g,a,d),a,m),i+=m,j+=m),k+=g._tree.mod,i+=e._tree.mod,l+=h._tree.mod,j+=f._tree.mod;g&&!eB(f)&&(f._tree.thread=g,f._tree.mod+=k-j),e&&!eA(h)&&(h._tree.thread=e,h._tree.mod+=i-l,d=a)}return d}var f=a.call(this,d,e),g=f[0];eG(g,function(a,b){a._tree={ancestor:a,prelim:0,mod:0,change:0,shift:0,number:b?b._tree.number+1:0}}),h(g),i(g,-g._tree.prelim);var k=eC(g,eE),l=eC(g,eD),m=eC(g,eF),n=k.x-b(k,l)/2,o=l.x+b(l,k)/2,p=m.depth||1;return eG(g,function(a){a.x=(a.x-n)/(o-n)*c[0],a.y=a.depth/p*c[1],delete a._tree}),f}var a=d3.layout.hierarchy().sort(null).value(null),b=ez,c=[1,1];return d.separation=function(a){return arguments.length?(b=a,d):b},d.size=function(a){return arguments.length?(c=a,d):c},ef(d,a)},d3.layout.treemap=function(){function i(a,b){var c=-1,d=a.length,e,f;while(++c<d)f=(e=a[c]).value*(b<0?0:b),e.area=isNaN(f)||f<=0?0:f}function j(a){var b=a.children;if(b&&b.length){var c=e(a),d=[],f=b.slice(),g,h=Infinity,k,n=Math.min(c.dx,c.dy),o;i(f,c.dx*c.dy/a.value),d.area=0;while((o=f.length)>0)d.push(g=f[o-1]),d.area+=g.area,(k=l(d,n))<=h?(f.pop(),h=k):(d.area-=d.pop().area,m(d,n,c,!1),n=Math.min(c.dx,c.dy),d.length=d.area=0,h=Infinity);d.length&&(m(d,n,c,!0),d.length=d.area=0),b.forEach(j)}}function k(a){var b=a.children;if(b&&b.length){var c=e(a),d=b.slice(),f,g=[];i(d,c.dx*c.dy/a.value),g.area=0;while(f=d.pop())g.push(f),g.area+=f.area,f.z!=null&&(m(g,f.z?c.dx:c.dy,c,!d.length),g.length=g.area=0);b.forEach(k)}}function l(a,b){var c=a.area,d,e=0,f=Infinity,g=-1,i=a.length;while(++g<i){if(!(d=a[g].area))continue;d<f&&(f=d),d>e&&(e=d)}return c*=c,b*=b,c?Math.max(b*e*h/c,c/(b*f*h)):Infinity}function m(a,c,d,e){var f=-1,g=a.length,h=d.x,i=d.y,j=c?b(a.area/c):0,k;if(c==d.dx){if(e||j>d.dy)j=d.dy;while(++f<g)k=a[f],k.x=h,k.y=i,k.dy=j,h+=k.dx=Math.min(d.x+d.dx-h,j?b(k.area/j):0);k.z=!0,k.dx+=d.x+d.dx-h,d.y+=j,d.dy-=j}else{if(e||j>d.dx)j=d.dx;while(++f<g)k=a[f],k.x=h,k.y=i,k.dx=j,i+=k.dy=Math.min(d.y+d.dy-i,j?b(k.area/j):0);k.z=!1,k.dy+=d.y+d.dy-i,d.x+=j,d.dx-=j}}function n(b){var d=g||a(b),e=d[0];return e.x=0,e.y=0,e.dx=c[0],e.dy=c[1],g&&a.revalue(e),i([e],e.dx*e.dy/e.value),(g?k:j)(e),f&&(g=d),d}var a=d3.layout.hierarchy(),b=Math.round,c=[1,1],d=null,e=eK,f=!1,g,h=.5*(1+Math.sqrt(5));return n.size=function(a){return arguments.length?(c=a,n):c},n.padding=function(a){function b(b){var c=a.call(n,b,b.depth);return c==null?eK(b):eL(b,typeof c=="number"?[c,c,c,c]:c)}function c(b){return eL(b,a)}if(!arguments.length)return d;var f;return e=(d=a)==null?eK:(f=typeof a)==="function"?b:f==="number"?(a=[a,a,a,a],c):c,n},n.round=function(a){return arguments.length?(b=a?Math.round:Number,n):b!=Number},n.sticky=function(a){return arguments.length?(f=a,g=null,n):f},n.ratio=function(a){return arguments.length?(h=a,n):h},ef(n,a)},d3.csv=function(a,b){d3.text(a,"text/csv",function(a){b(a&&d3.csv.parse(a))})},d3.csv.parse=function(a){var b;return d3.csv.parseRows(a,function(a,c){if(c){var d={},e=-1,f=b.length;while(++e<f)d[b[e]]=a[e];return d}return b=a,null})},d3.csv.parseRows=function(a,b){function j(){if(f.lastIndex>=a.length)return d;if(i)return i=!1,c;var b=f.lastIndex;if(a.charCodeAt(b)===34){var e=b;while(e++<a.length)if(a.charCodeAt(e)===34){if(a.charCodeAt(e+1)!==34)break;e++}f.lastIndex=e+2;var g=a.charCodeAt(e+1);return g===13?(i=!0,a.charCodeAt(e+2)===10&&f.lastIndex++):g===10&&(i=!0),a.substring(b+1,e).replace(/""/g,'"')}var h=f.exec(a);return h?(i=h[0].charCodeAt(0)!==44,a.substring(b,h.index)):(f.lastIndex=a.length,a.substring(b))}var c={},d={},e=[],f=/\r\n|[,\r\n]/g,g=0,h,i;f.lastIndex=0;while((h=j())!==d){var k=[];while(h!==c&&h!==d)k.push(h),h=j();if(b&&!(k=b(k,g++)))continue;e.push(k)}return e},d3.csv.format=function(a){return a.map(eM).join("\n")},d3.geo={};var eO=Math.PI/180;d3.geo.azimuthal=function(){function i(b){var f=b[0]*eO-e,i=b[1]*eO,j=Math.cos(f),k=Math.sin(f),l=Math.cos(i),m=Math.sin(i),n=a!=="orthographic"?h*m+g*l*j:null,o,p=a==="stereographic"?1/(1+n):a==="gnomonic"?1/n:a==="equidistant"?(o=Math.acos(n),o?o/Math.sin(o):0):a==="equalarea"?Math.sqrt(2/(1+n)):1,q=p*l*k,r=p*(h*l*j-g*m);return[c*q+d[0],c*r+d[1]]}var a="orthographic",b,c=200,d=[480,250],e,f,g,h;return i.invert=function(b){var f=(b[0]-d[0])/c,i=(b[1]-d[1])/c,j=Math.sqrt(f*f+i*i),k=a==="stereographic"?2*Math.atan(j):a==="gnomonic"?Math.atan(j):a==="equidistant"?j:a==="equalarea"?2*Math.asin(.5*j):Math.asin(j),l=Math.sin(k),m=Math.cos(k);return[(e+Math.atan2(f*l,j*g*m+i*h*l))/eO,Math.asin(m*h-(j?i*l*g/j:0))/eO]},i.mode=function(b){return arguments.length?(a=b+"",i):a},i.origin=function(a){return arguments.length?(b=a,e=b[0]*eO,f=b[1]*eO,g=Math.cos(f),h=Math.sin(f),i):b},i.scale=function(a){return arguments.length?(c=+a,i):c},i.translate=function(a){return arguments.length?(d=[+a[0],+a[1]],i):d},i.origin([0,0])},d3.geo.albers=function(){function i(a){var b=f*(eO*a[0]-e),i=Math.sqrt(g-2*f*Math.sin(eO*a[1]))/f;return[c*i*Math.sin(b)+d[0],c*(i*Math.cos(b)-h)+d[1]]}function j(){var c=eO*b[0],d=eO*b[1],j=eO*a[1],k=Math.sin(c),l=Math.cos(c);return e=eO*a[0],f=.5*(k+Math.sin(d)),g=l*l+2*f*k,h=Math.sqrt(g-2*f*Math.sin(j))/f,i}var a=[-98,38],b=[29.5,45.5],c=1e3,d=[480,250],e,f,g,h;return i.invert=function(a){var b=(a[0]-d[0])/c,i=(a[1]-d[1])/c,j=h+i,k=Math.atan2(b,j),l=Math.sqrt(b*b+j*j);return[(e+k/f)/eO,Math.asin((g-l*l*f*f)/(2*f))/eO]},i.origin=function(b){return arguments.length?(a=[+b[0],+b[1]],j()):a},i.parallels=function(a){return arguments.length?(b=[+a[0],+a[1]],j()):b},i.scale=function(a){return arguments.length?(c=+a,i):c},i.translate=function(a){return arguments.length?(d=[+a[0],+a[1]],i):d},j()},d3.geo.albersUsa=function(){function e(e){var f=e[0],g=e[1];return(g>50?b:f<-140?c:g<21?d:a)(e)}var a=d3.geo.albers(),b=d3.geo.albers().origin([-160,60]).parallels([55,65]),c=d3.geo.albers().origin([-160,20]).parallels([8,18]),d=d3.geo.albers().origin([-60,10]).parallels([8,18]);return e.scale=function(f){return arguments.length?(a.scale(f),b.scale(f*.6),c.scale(f),d.scale(f*1.5),e.translate(a.translate())):a.scale()},e.translate=function(f){if(!arguments.length)return a.translate();var g=a.scale()/1e3,h=f[0],i=f[1];return a.translate(f),b.translate([h-400*g,i+170*g]),c.translate([h-190*g,i+200*g]),d.translate([h+580*g,i+430*g]),e},e.scale(a.scale())},d3.geo.bonne=function(){function g(g){var h=g[0]*eO-c,i=g[1]*eO-d;if(e){var j=f+e-i,k=h*Math.cos(i)/j;h=j*Math.sin(k),i=j*Math.cos(k)-f}else h*=Math.cos(i),i*=-1;return[a*h+b[0],a*i+b[1]]}var a=200,b=[480,250],c,d,e,f;return g.invert=function(d){var g=(d[0]-b[0])/a,h=(d[1]-b[1])/a;if(e){var i=f+h,j=Math.sqrt(g*g+i*i);h=f+e-j,g=c+j*Math.atan2(g,i)/Math.cos(h)}else h*=-1,g/=Math.cos(h);return[g/eO,h/eO]},g.parallel=function(a){return arguments.length?(f=1/Math.tan(e=a*eO),g):e/eO},g.origin=function(a){return arguments.length?(c=a[0]*eO,d=a[1]*eO,g):[c/eO,d/eO]},g.scale=function(b){return arguments.length?(a=+b,g):a},g.translate=function(a){return arguments.length?(b=[+a[0],+a[1]],g):b},g.origin([0,0]).parallel(45)},d3.geo.equirectangular=function(){function c(c){var d=c[0]/360,e=-c[1]/360;return[a*d+b[0],a*e+b[1]]}var a=500,b=[480,250];return c.invert=function(c){var d=(c[0]-b[0])/a,e=(c[1]-b[1])/a;return[360*d,-360*e]},c.scale=function(b){return arguments.length?(a=+b,c):a},c.translate=function(a){return arguments.length?(b=[+a[0],+a[1]],c):b},c},d3.geo.mercator=function(){function c(c){var d=c[0]/360,e=-(Math.log(Math.tan(Math.PI/4+c[1]*eO/2))/eO)/360;return[a*d+b[0],a*Math.max(-0.5,Math.min(.5,e))+b[1]]}var a=500,b=[480,250];return c.invert=function(c){var d=(c[0]-b[0])/a,e=(c[1]-b[1])/a;return[360*d,2*Math.atan(Math.exp(-360*e*eO))/eO-90]},c.scale=function(b){return arguments.length?(a=+b,c):a},c.translate=function(a){return arguments.length?(b=[+a[0],+a[1]],c):b},c},d3.geo.path=function(){function d(c,d){return typeof a=="function"&&(b=eQ(a.apply(this,arguments))),f(c)||null}function e(a){return c(a).join(",")}function h(a){var b=k(a[0]),c=0,d=a.length;while(++c<d)b-=k(a[c]);return b}function i(a){var b=d3.geom.polygon(a[0].map(c)),d=b.area(),e=b.centroid(d<0?(d*=-1,1):-1),f=e[0],g=e[1],h=d,i=0,j=a.length;while(++i<j)b=d3.geom.polygon(a[i].map(c)),d=b.area(),e=b.centroid(d<0?(d*=-1,1):-1),f-=e[0],g-=e[1],h-=d;return[f,g,6*h]}function k(a){return Math.abs(d3.geom.polygon(a.map(c)).area())}var a=4.5,b=eQ(a),c=d3.geo.albersUsa(),f=eP({FeatureCollection:function(a){var b=[],c=a.features,d=-1,e=c.length;while(++d<e)b.push(f(c[d].geometry));return b.join("")},Feature:function(a){return f(a.geometry)},Point:function(a){return"M"+e(a.coordinates)+b},MultiPoint:function(a){var c=[],d=a.coordinates,f=-1,g=d.length;while(++f<g)c.push("M",e(d[f]),b);return c.join("")},LineString:function(a){var b=["M"],c=a.coordinates,d=-1,f=c.length;while(++d<f)b.push(e(c[d]),"L");return b.pop(),b.join("")},MultiLineString:function(a){var b=[],c=a.coordinates,d=-1,f=c.length,g,h,i;while(++d<f){g=c[d],h=-1,i=g.length,b.push("M");while(++h<i)b.push(e(g[h]),"L");b.pop()}return b.join("")},Polygon:function(a){var b=[],c=a.coordinates,d=-1,f=c.length,g,h,i;while(++d<f){g=c[d],h=-1;if((i=g.length-1)>0){b.push("M");while(++h<i)b.push(e(g[h]),"L");b[b.length-1]="Z"}}return b.join("")},MultiPolygon:function(a){var b=[],c=a.coordinates,d=-1,f=c.length,g,h,i,j,k,l;while(++d<f){g=c[d],h=-1,i=g.length;while(++h<i){j=g[h],k=-1;if((l=j.length-1)>0){b.push("M");while(++k<l)b.push(e(j[k]),"L");b[b.length-1]="Z"}}}return b.join("")},GeometryCollection:function(a){var b=[],c=a.geometries,d=-1,e=c.length;while(++d<e)b.push(f(c[d]));return b.join("")}}),g=d.area=eP({FeatureCollection:function(a){var b=0,c=a.features,d=-1,e=c.length;while(++d<e)b+=g(c[d]);return b},Feature:function(a){return g(a.geometry)},Polygon:function(a){return h(a.coordinates)},MultiPolygon:function(a){var b=0,c=a.coordinates,d=-1,e=c.length;while(++d<e)b+=h(c[d]);return b},GeometryCollection:function(a){var b=0,c=a.geometries,d=-1,e=c.length;while(++d<e)b+=g(c[d]);return b}},0),j=d.centroid=eP({Feature:function(a){return j(a.geometry)},Polygon:function(a){var b=i(a.coordinates);return[b[0]/b[2],b[1]/b[2]]},MultiPolygon:function(a){var b=0,c=a.coordinates,d,e=0,f=0,g=0,h=-1,j=c.length;while(++h<j)d=i(c[h]),e+=d[0],f+=d[1],g+=d[2];return[e/g,f/g]}});return d.projection=function(a){return c=a,d},d.pointRadius=function(c){return typeof c=="function"?a=c:(a=+c,b=eQ(a)),d},d},d3.geo.bounds=function(a){var b=Infinity,c=Infinity,d=-Infinity,e=-Infinity;return eR(a,function(a,f){a<b&&(b=a),a>d&&(d=a),f<c&&(c=f),f>e&&(e=f)}),[[b,c],[d,e]]};var eS={Feature:eT,FeatureCollection:eU,GeometryCollection:eV,LineString:eW,MultiLineString:eX,MultiPoint:eW,MultiPolygon:eY,Point:eZ,Polygon:e$};d3.geo.circle=function(){function e(){}function f(a){return d.distance(a)<c}function h(a){var b=-1,e=a.length,f=[],g,h,j,k,l;while(++b<e)l=d.distance(j=a[b]),l<c?(h&&f.push(fb(h,j)((k-c)/(k-l))),f.push(j),g=h=null):(h=j,!g&&f.length&&(f.push(fb(f[f.length-1],h)((c-k)/(l-k))),g=h)),k=l;return h&&f.length&&(l=d.distance(j=f[0]),f.push(fb(h,j)((k-c)/(k-l)))),i(f)}function i(a){var b=0,c=a.length,e,f,g=c?[a[0]]:a,h,i=d.source();while(++b<c){h=d.source(a[b-1])(a[b]).coordinates;for(e=0,f=h.length;++e<f;)g.push(h[e])}return d.source(i),g}var a=[0,0],b=89.99,c=b*eO,d=d3.geo.greatArc().target(n);e.clip=function(b){return d.source(typeof a=="function"?a.apply(this,arguments):a),g(b)};var g=eP({FeatureCollection:function(a){var b=a.features.map(g).filter(n);return b&&(a=Object.create(a),a.features=b,a)},Feature:function(
a){var b=g(a.geometry);return b&&(a=Object.create(a),a.geometry=b,a)},Point:function(a){return f(a.coordinates)&&a},MultiPoint:function(a){var b=a.coordinates.filter(f);return b.length&&{type:a.type,coordinates:b}},LineString:function(a){var b=h(a.coordinates);return b.length&&(a=Object.create(a),a.coordinates=b,a)},MultiLineString:function(a){var b=a.coordinates.map(h).filter(function(a){return a.length});return b.length&&(a=Object.create(a),a.coordinates=b,a)},Polygon:function(a){var b=a.coordinates.map(h);return b[0].length&&(a=Object.create(a),a.coordinates=b,a)},MultiPolygon:function(a){var b=a.coordinates.map(function(a){return a.map(h)}).filter(function(a){return a[0].length});return b.length&&(a=Object.create(a),a.coordinates=b,a)},GeometryCollection:function(a){var b=a.geometries.map(g).filter(n);return b.length&&(a=Object.create(a),a.geometries=b,a)}});return e.origin=function(b){return arguments.length?(a=b,e):a},e.angle=function(a){return arguments.length?(c=(b=+a)*eO,e):b},e.precision=function(a){return arguments.length?(d.precision(a),e):d.precision()},e},d3.geo.greatArc=function(){function d(){var d=typeof a=="function"?a.apply(this,arguments):a,e=typeof b=="function"?b.apply(this,arguments):b,f=fb(d,e),g=c/f.d,h=0,i=[d];while((h+=g)<1)i.push(f(h));return i.push(e),{type:"LineString",coordinates:i}}var a=e_,b=fa,c=6*eO;return d.distance=function(){var c=typeof a=="function"?a.apply(this,arguments):a,d=typeof b=="function"?b.apply(this,arguments):b;return fb(c,d).d},d.source=function(b){return arguments.length?(a=b,d):a},d.target=function(a){return arguments.length?(b=a,d):b},d.precision=function(a){return arguments.length?(c=a*eO,d):c/eO},d},d3.geo.greatCircle=d3.geo.circle,d3.geom={},d3.geom.contour=function(a,b){var c=b||fe(a),d=[],e=c[0],f=c[1],g=0,h=0,i=NaN,j=NaN,k=0;do k=0,a(e-1,f-1)&&(k+=1),a(e,f-1)&&(k+=2),a(e-1,f)&&(k+=4),a(e,f)&&(k+=8),k===6?(g=j===-1?-1:1,h=0):k===9?(g=0,h=i===1?-1:1):(g=fc[k],h=fd[k]),g!=i&&h!=j&&(d.push([e,f]),i=g,j=h),e+=g,f+=h;while(c[0]!=e||c[1]!=f);return d};var fc=[1,0,1,1,-1,0,-1,1,0,0,0,0,-1,0,-1,NaN],fd=[0,-1,0,0,0,-1,0,0,1,-1,1,1,0,-1,0,NaN];d3.geom.hull=function(a){if(a.length<3)return[];var b=a.length,c=b-1,d=[],e=[],f,g,h=0,i,j,k,l,m,n,o,p;for(f=1;f<b;++f)a[f][1]<a[h][1]?h=f:a[f][1]==a[h][1]&&(h=a[f][0]<a[h][0]?f:h);for(f=0;f<b;++f){if(f===h)continue;j=a[f][1]-a[h][1],i=a[f][0]-a[h][0],d.push({angle:Math.atan2(j,i),index:f})}d.sort(function(a,b){return a.angle-b.angle}),o=d[0].angle,n=d[0].index,m=0;for(f=1;f<c;++f)g=d[f].index,o==d[f].angle?(i=a[n][0]-a[h][0],j=a[n][1]-a[h][1],k=a[g][0]-a[h][0],l=a[g][1]-a[h][1],i*i+j*j>=k*k+l*l?d[f].index=-1:(d[m].index=-1,o=d[f].angle,m=f,n=g)):(o=d[f].angle,m=f,n=g);e.push(h);for(f=0,g=0;f<2;++g)d[g].index!==-1&&(e.push(d[g].index),f++);p=e.length;for(;g<c;++g){if(d[g].index===-1)continue;while(!ff(e[p-2],e[p-1],d[g].index,a))--p;e[p++]=d[g].index}var q=[];for(f=0;f<p;++f)q.push(a[e[f]]);return q},d3.geom.polygon=function(a){return a.area=function(){var b=0,c=a.length,d=a[c-1][0]*a[0][1],e=a[c-1][1]*a[0][0];while(++b<c)d+=a[b-1][0]*a[b][1],e+=a[b-1][1]*a[b][0];return(e-d)*.5},a.centroid=function(b){var c=-1,d=a.length,e=0,f=0,g,h=a[d-1],i;arguments.length||(b=-1/(6*a.area()));while(++c<d)g=h,h=a[c],i=g[0]*h[1]-h[0]*g[1],e+=(g[0]+h[0])*i,f+=(g[1]+h[1])*i;return[e*b,f*b]},a.clip=function(b){var c,d=-1,e=a.length,f,g,h=a[e-1],i,j,k;while(++d<e){c=b.slice(),b.length=0,i=a[d],j=c[(g=c.length)-1],f=-1;while(++f<g)k=c[f],fg(k,h,i)?(fg(j,h,i)||b.push(fh(j,k,h,i)),b.push(k)):fg(j,h,i)&&b.push(fh(j,k,h,i)),j=k;h=i}return b},a},d3.geom.voronoi=function(a){var b=a.map(function(){return[]});return fj(a,function(a){var c,d,e,f,g,h;a.a===1&&a.b>=0?(c=a.ep.r,d=a.ep.l):(c=a.ep.l,d=a.ep.r),a.a===1?(g=c?c.y:-1e6,e=a.c-a.b*g,h=d?d.y:1e6,f=a.c-a.b*h):(e=c?c.x:-1e6,g=a.c-a.a*e,f=d?d.x:1e6,h=a.c-a.a*f);var i=[e,g],j=[f,h];b[a.region.l.index].push(i,j),b[a.region.r.index].push(i,j)}),b.map(function(b,c){var d=a[c][0],e=a[c][1];return b.forEach(function(a){a.angle=Math.atan2(a[0]-d,a[1]-e)}),b.sort(function(a,b){return a.angle-b.angle}).filter(function(a,c){return!c||a.angle-b[c-1].angle>1e-10})})};var fi={l:"r",r:"l"};d3.geom.delaunay=function(a){var b=a.map(function(){return[]}),c=[];return fj(a,function(c){b[c.region.l.index].push(a[c.region.r.index])}),b.forEach(function(b,d){var e=a[d],f=e[0],g=e[1];b.forEach(function(a){a.angle=Math.atan2(a[0]-f,a[1]-g)}),b.sort(function(a,b){return a.angle-b.angle});for(var h=0,i=b.length-1;h<i;h++)c.push([e,b[h],b[h+1]])}),c},d3.geom.quadtree=function(a,b,c,d,e){function k(a,b,c,d,e,f){if(isNaN(b.x)||isNaN(b.y))return;if(a.leaf){var g=a.point;g?Math.abs(g.x-b.x)+Math.abs(g.y-b.y)<.01?l(a,b,c,d,e,f):(a.point=null,l(a,g,c,d,e,f),l(a,b,c,d,e,f)):a.point=b}else l(a,b,c,d,e,f)}function l(a,b,c,d,e,f){var g=(c+e)*.5,h=(d+f)*.5,i=b.x>=g,j=b.y>=h,l=(j<<1)+i;a.leaf=!1,a=a.nodes[l]||(a.nodes[l]=fk()),i?c=g:e=g,j?d=h:f=h,k(a,b,c,d,e,f)}var f,g=-1,h=a.length;h&&isNaN(a[0].x)&&(a=a.map(fm));if(arguments.length<5)if(arguments.length===3)e=d=c,c=b;else{b=c=Infinity,d=e=-Infinity;while(++g<h)f=a[g],f.x<b&&(b=f.x),f.y<c&&(c=f.y),f.x>d&&(d=f.x),f.y>e&&(e=f.y);var i=d-b,j=e-c;i>j?e=c+i:d=b+j}var m=fk();return m.add=function(a){k(m,a,b,c,d,e)},m.visit=function(a){fl(a,m,b,c,d,e)},a.forEach(m.add),m},d3.time={};var fn=Date;fo.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){fp.setUTCDate.apply(this._,arguments)},setDay:function(){fp.setUTCDay.apply(this._,arguments)},setFullYear:function(){fp.setUTCFullYear.apply(this._,arguments)},setHours:function(){fp.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){fp.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){fp.setUTCMinutes.apply(this._,arguments)},setMonth:function(){fp.setUTCMonth.apply(this._,arguments)},setSeconds:function(){fp.setUTCSeconds.apply(this._,arguments)},setTime:function(){fp.setTime.apply(this._,arguments)}};var fp=Date.prototype;d3.time.format=function(a){function c(c){var d=[],e=-1,f=0,g,h;while(++e<b)a.charCodeAt(e)==37&&(d.push(a.substring(f,e),(h=fv[g=a.charAt(++e)])?h(c):g),f=e+1);return d.push(a.substring(f,e)),d.join("")}var b=a.length;return c.parse=function(b){var c={y:1900,m:0,d:1,H:0,M:0,S:0,L:0},d=fq(c,a,b,0);if(d!=b.length)return null;"p"in c&&(c.H=c.H%12+c.p*12);var e=new fn;return e.setFullYear(c.y,c.m,c.d),e.setHours(c.H,c.M,c.S,c.L),e},c.toString=function(){return a},c};var fr=d3.format("02d"),fs=d3.format("03d"),ft=d3.format("04d"),fu=d3.format("2d"),fv={a:function(a){return fB[a.getDay()].substring(0,3)},A:function(a){return fB[a.getDay()]},b:function(a){return fH[a.getMonth()].substring(0,3)},B:function(a){return fH[a.getMonth()]},c:d3.time.format("%a %b %e %H:%M:%S %Y"),d:function(a){return fr(a.getDate())},e:function(a){return fu(a.getDate())},H:function(a){return fr(a.getHours())},I:function(a){return fr(a.getHours()%12||12)},j:function(a){return fs(1+d3.time.dayOfYear(a))},L:function(a){return fs(a.getMilliseconds())},m:function(a){return fr(a.getMonth()+1)},M:function(a){return fr(a.getMinutes())},p:function(a){return a.getHours()>=12?"PM":"AM"},S:function(a){return fr(a.getSeconds())},U:function(a){return fr(d3.time.sundayOfYear(a))},w:function(a){return a.getDay()},W:function(a){return fr(d3.time.mondayOfYear(a))},x:d3.time.format("%m/%d/%y"),X:d3.time.format("%H:%M:%S"),y:function(a){return fr(a.getFullYear()%100)},Y:function(a){return ft(a.getFullYear()%1e4)},Z:fX,"%":function(a){return"%"}},fw={a:fx,A:fy,b:fC,B:fE,c:fI,d:fP,e:fP,H:fQ,I:fQ,L:fT,m:fO,M:fR,p:fV,S:fS,x:fJ,X:fK,y:fM,Y:fL},fz=/^(?:sun|mon|tue|wed|thu|fri|sat)/i,fA=/^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i,fB=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],fD=d3.map({jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11}),fF=/^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig,fG=d3.map({january:0,february:1,march:2,april:3,may:4,june:5,july:6,august:7,september:8,october:9,november:10,december:11}),fH=["January","February","March","April","May","June","July","August","September","October","November","December"],fU=/\s*\d+/,fW=d3.map({am:0,pm:1});d3.time.format.utc=function(a){function c(a){try{fn=fo;var c=new fn;return c._=a,b(c)}finally{fn=Date}}var b=d3.time.format(a);return c.parse=function(a){try{fn=fo;var c=b.parse(a);return c&&c._}finally{fn=Date}},c.toString=b.toString,c};var fY=d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");d3.time.format.iso=Date.prototype.toISOString?fZ:fY,fZ.parse=function(a){return new Date(a)},fZ.toString=fY.toString,d3.time.second=f$(function(a){return new fn(Math.floor(a/1e3)*1e3)},function(a,b){a.setTime(a.getTime()+Math.floor(b)*1e3)},function(a){return a.getSeconds()}),d3.time.seconds=d3.time.second.range,d3.time.seconds.utc=d3.time.second.utc.range,d3.time.minute=f$(function(a){return new fn(Math.floor(a/6e4)*6e4)},function(a,b){a.setTime(a.getTime()+Math.floor(b)*6e4)},function(a){return a.getMinutes()}),d3.time.minutes=d3.time.minute.range,d3.time.minutes.utc=d3.time.minute.utc.range,d3.time.hour=f$(function(a){var b=a.getTimezoneOffset()/60;return new fn((Math.floor(a/36e5-b)+b)*36e5)},function(a,b){a.setTime(a.getTime()+Math.floor(b)*36e5)},function(a){return a.getHours()}),d3.time.hours=d3.time.hour.range,d3.time.hours.utc=d3.time.hour.utc.range,d3.time.day=f$(function(a){return new fn(a.getFullYear(),a.getMonth(),a.getDate())},function(a,b){a.setDate(a.getDate()+b)},function(a){return a.getDate()-1}),d3.time.days=d3.time.day.range,d3.time.days.utc=d3.time.day.utc.range,d3.time.dayOfYear=function(a){var b=d3.time.year(a);return Math.floor((a-b)/864e5-(a.getTimezoneOffset()-b.getTimezoneOffset())/1440)},fB.forEach(function(a,b){a=a.toLowerCase(),b=7-b;var c=d3.time[a]=f$(function(a){return(a=d3.time.day(a)).setDate(a.getDate()-(a.getDay()+b)%7),a},function(a,b){a.setDate(a.getDate()+Math.floor(b)*7)},function(a){var c=d3.time.year(a).getDay();return Math.floor((d3.time.dayOfYear(a)+(c+b)%7)/7)-(c!==b)});d3.time[a+"s"]=c.range,d3.time[a+"s"].utc=c.utc.range,d3.time[a+"OfYear"]=function(a){var c=d3.time.year(a).getDay();return Math.floor((d3.time.dayOfYear(a)+(c+b)%7)/7)}}),d3.time.week=d3.time.sunday,d3.time.weeks=d3.time.sunday.range,d3.time.weeks.utc=d3.time.sunday.utc.range,d3.time.weekOfYear=d3.time.sundayOfYear,d3.time.month=f$(function(a){return new fn(a.getFullYear(),a.getMonth(),1)},function(a,b){a.setMonth(a.getMonth()+b)},function(a){return a.getMonth()}),d3.time.months=d3.time.month.range,d3.time.months.utc=d3.time.month.utc.range,d3.time.year=f$(function(a){return new fn(a.getFullYear(),0,1)},function(a,b){a.setFullYear(a.getFullYear()+b)},function(a){return a.getFullYear()}),d3.time.years=d3.time.year.range,d3.time.years.utc=d3.time.year.utc.range;var gg=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],gh=[[d3.time.second,1],[d3.time.second,5],[d3.time.second,15],[d3.time.second,30],[d3.time.minute,1],[d3.time.minute,5],[d3.time.minute,15],[d3.time.minute,30],[d3.time.hour,1],[d3.time.hour,3],[d3.time.hour,6],[d3.time.hour,12],[d3.time.day,1],[d3.time.day,2],[d3.time.week,1],[d3.time.month,1],[d3.time.month,3],[d3.time.year,1]],gi=[[d3.time.format("%Y"),function(a){return!0}],[d3.time.format("%B"),function(a){return a.getMonth()}],[d3.time.format("%b %d"),function(a){return a.getDate()!=1}],[d3.time.format("%a %d"),function(a){return a.getDay()&&a.getDate()!=1}],[d3.time.format("%I %p"),function(a){return a.getHours()}],[d3.time.format("%I:%M"),function(a){return a.getMinutes()}],[d3.time.format(":%S"),function(a){return a.getSeconds()}],[d3.time.format(".%L"),function(a){return a.getMilliseconds()}]],gj=d3.scale.linear(),gk=gd(gi);gh.year=function(a,b){return gj.domain(a.map(gf)).ticks(b).map(ge)},d3.time.scale=function(){return ga(d3.scale.linear(),gh,gk)};var gl=gh.map(function(a){return[a[0].utc,a[1]]}),gm=[[d3.time.format.utc("%Y"),function(a){return!0}],[d3.time.format.utc("%B"),function(a){return a.getUTCMonth()}],[d3.time.format.utc("%b %d"),function(a){return a.getUTCDate()!=1}],[d3.time.format.utc("%a %d"),function(a){return a.getUTCDay()&&a.getUTCDate()!=1}],[d3.time.format.utc("%I %p"),function(a){return a.getUTCHours()}],[d3.time.format.utc("%I:%M"),function(a){return a.getUTCMinutes()}],[d3.time.format.utc(":%S"),function(a){return a.getUTCSeconds()}],[d3.time.format.utc(".%L"),function(a){return a.getUTCMilliseconds()}]],gn=gd(gm);gl.year=function(a,b){return gj.domain(a.map(gp)).ticks(b).map(go)},d3.time.scale.utc=function(){return ga(d3.scale.linear(),gl,gn)}})();


var jsonData = [{"name":"United States","category":"America","x":[[1800,1912.62],[1801,1948.59],[1802,1981.63],[1803,1946.61],[1804,1944.22],[1805,1987.88],[1806,2024.49],[1807,2045.45],[1808,1896.7],[1809,1993.22],[1810,2050.52],[1811,2093.55],[1812,2056.15],[1813,2079.25],[1814,2119.35],[1815,2111.19],[1816,2023.09],[1817,2021.75],[1818,2027.3],[1819,2023.02],[1820,2011.22],[1821,2043.38],[1822,2101.55],[1823,2077.84],[1824,2134.86],[1825,2184.19],[1826,2200.15],[1827,2210.11],[1828,2209.17],[1829,2133.96],[1830,2293.67],[1831,2438],[1832,2530.55],[1833,2620.99],[1834,2491.55],[1835,2589.99],[1836,2629.47],[1837,2543.05],[1838,2520.65],[1839,2646.12],[1840,2512.15],[1841,2457.92],[1842,2436.73],[1843,2476.52],[1844,2614.36],[1845,2656.44],[1846,2673.07],[1847,2744.83],[1848,2817.92],[1849,2743.7],[1850,2754.9],[1851,2871.34],[1852,3022.03],[1853,3235.59],[1854,3244.9],[1855,3172.17],[1856,3239.39],[1857,3167.39],[1858,3182.83],[1859,3270.94],[1860,3359.31],[1861,3288.25],[1862,3393.61],[1863,3617.64],[1864,3739.47],[1865,3541.92],[1866,3514],[1867,3632],[1868,3681.88],[1869,3781.48],[1870,3970.93],[1871,4044.9],[1872,4106.03],[1873,4198.88],[1874,4055.76],[1875,4170.62],[1876,4131.67],[1877,4181.78],[1878,4275.61],[1879,4718.64],[1880,5178.86],[1881,5239.22],[1882,5428.53],[1883,5402.76],[1884,5362.11],[1885,5277.75],[1886,5332.39],[1887,5472.26],[1888,5330.85],[1889,5549.39],[1890,5524.7],[1891,5584.39],[1892,5717.15],[1893,5579.84],[1894,5297.88],[1895,5828.93],[1896,5603.9],[1897,5962.94],[1898,6008.89],[1899,6609.78],[1900,6624.3],[1901,7305.78],[1902,7282.17],[1903,7356.13],[1904,7494.66],[1905,8031.68],[1906,8205.42],[1907,7928.61],[1908,7339.85],[1909,8048.39],[1910,7913.7],[1911,8010.71],[1912,8317.33],[1913,8448.56],[1914,7615.96],[1915,7758.77],[1916,8875.24],[1917,8714.46],[1918,9254.58],[1919,8908.37],[1920,8568.17],[1921,8068.82],[1922,8504.51],[1923,9512.22],[1924,9544.98],[1925,9581.57],[1926,9990.36],[1927,9869.44],[1928,9892.79],[1929,10387.38],[1930,9346.2],[1931,8640.93],[1932,7433.95],[1933,7267.63],[1934,7977.82],[1935,8601.16],[1936,9629.63],[1937,10028.34],[1938,9569.07],[1939,10225.26],[1940,10948.06],[1941,12667.38],[1942,14819.55],[1943,16980.87],[1944,18085.1],[1945,17614.95],[1946,15431.41],[1947,14931.55],[1948,15266.38],[1949,14866.24],[1950,15855.86],[1951,16750.74],[1952,17039.38],[1953,17471.28],[1954,16979.26],[1955,17822.45],[1956,17783.27],[1957,17749.5],[1958,17217.39],[1959,18084.11],[1960,18175.43],[1961,18226.62],[1962,18978.45],[1963,19461.1],[1964,20243.98],[1965,21209.93],[1966,22263.22],[1967,22495.68],[1968,23268.21],[1969,23669.41],[1970,23345.77],[1971,23744.67],[1972,24654.04],[1973,25742],[1974,25281.7],[1975,24889.6],[1976,25881.72],[1977,26715.14],[1978,27814.18],[1979,28278.91],[1980,27838.11],[1981,28160.14],[1982,27243.47],[1983,28119.69],[1984,29785.25],[1985,30636.21],[1986,31297.31],[1987,31953.81],[1988,32860.52],[1989,33587.09],[1990,33710.39],[1991,33076.87],[1992,33589.59],[1993,33914.89],[1994,34730.56],[1995,35053.29],[1996,35807],[1997,36847.81],[1998,37811.68],[1999,38912.58],[2000,39758.5],[2001,39474.11],[2002,39535.84],[2003,40044.18],[2004,40956.4],[2005,41674],[2006,42385.18],[2007,42866.22],[2008,42656.49],[2009,41256.08]],"size":[[1820,9980510],[1821,10298969],[1822,10625503],[1823,10951077],[1824,11276695],[1825,11602355],[1826,11928057],[1827,12250905],[1828,12580590],[1829,12906416],[1830,13240314],[1831,13658580],[1832,14077890],[1833,14496235],[1834,14914618],[1835,15334042],[1836,15752501],[1837,16170997],[1838,16590533],[1839,17009101],[1840,17443768],[1841,18056100],[1842,18667464],[1843,19278865],[1844,19890301],[1845,20502776],[1846,21114282],[1847,21725822],[1848,22337396],[1849,22950007],[1850,23579718],[1851,24405303],[1852,25230918],[1853,26156953],[1854,26882238],[1855,27707943],[1856,28534680],[1857,29360442],[1858,30186232],[1859,31012051],[1860,31838901],[1861,32677742],[1862,33515609],[1863,34354509],[1864,35192433],[1865,36031388],[1866,36869368],[1867,37708378],[1868,38546412],[1869,39385476],[1870,40240630],[1871,41098000],[1872,42136000],[1873,43174000],[1874,44212000],[1875,45245000],[1876,46287000],[1877,47325000],[1878,48362000],[1879,49400000],[1880,50458000],[1881,51743000],[1882,53027000],[1883,54311000],[1884,55595000],[1885,56879000],[1886,58164000],[1887,59448000],[1888,60732000],[1889,62016000],[1890,63302000],[1891,64612000],[1892,65922000],[1893,67231000],[1894,68541000],[1895,69851000],[1896,71161000],[1897,72471000],[1898,73781000],[1899,75091000],[1900,76391000],[1901,77888000],[1902,79469000],[1903,80946000],[1904,82485000],[1905,84147000],[1906,85770000],[1907,87339000],[1908,89055000],[1909,90845000],[1910,92767000],[1911,94234000],[1912,95703000],[1913,97606000],[1914,99505000],[1915,100941000],[1916,102364000],[1917,103817000],[1918,104958000],[1919,105473000],[1920,106881000],[1921,108964000],[1922,110484000],[1923,112387000],[1924,114558000],[1925,116284000],[1926,117857000],[1927,119502000],[1928,120971000],[1929,122245000],[1930,123668000],[1931,124633000],[1932,125436000],[1933,126180000],[1934,126978000],[1935,127859000],[1936,128681000],[1937,129464000],[1938,130476000],[1939,131539000],[1940,132637000],[1941,133922000],[1942,135386000],[1943,137272000],[1944,138937000],[1945,140474000],[1946,141940000],[1947,144688000],[1948,147203000],[1949,149770000],[1950,152271000],[1951,154878000],[1952,157553000],[1953,160184000],[1954,163026000],[1955,165931000],[1956,168903000],[1957,171984000],[1958,174882000],[1959,177830000],[1960,180671000],[1961,183691000],[1962,186538000],[1963,189242000],[1964,191889000],[1965,194303000],[1966,196560000],[1967,198712000],[1968,200706000],[1969,202677000],[1970,205052000],[1971,207661000],[1972,209896000],[1973,211909000],[1974,213854000],[1975,215973000],[1976,218035000],[1977,220239000],[1978,222585000],[1979,225055000],[1980,227726463],[1981,229966237],[1982,232187835],[1983,234307207],[1984,236348292],[1985,238466283],[1986,240650755],[1987,242803533],[1988,245021414],[1989,247341697],[1990,250131894],[1991,253492503],[1992,256894189],[1993,260255352],[1994,263435673],[1995,266557091],[1996,269667391],[1997,272911760],[1998,276115288],[1999,279294713],[2000,282338631],[2001,285023886],[2002,287675526],[2003,290342554],[2004,293027571],[2005,295734134],[2006,298444215],[2007,301139947],[2008,303824646]],"y":[[1800,39.41],[1880,39.41],[1890,45.21],[1901,49.3],[1902,50.5],[1903,50.6],[1904,49.6],[1905,50.3],[1906,50.1],[1907,50.2],[1908,51.9],[1909,52.8],[1910,51.8],[1911,53.4],[1912,54.1],[1913,53.5],[1914,54.6],[1915,55.1],[1916,54.2],[1917,54],[1918,47.2],[1919,55.3],[1920,55.4],[1921,58.2],[1922,58.1],[1923,57.5],[1924,58.5],[1925,58.5],[1926,57.9],[1927,59.4],[1928,58.3],[1929,58.5],[1930,59.6],[1931,60.3],[1932,61],[1933,60.95],[1934,60.31],[1935,60.97],[1936,60.42],[1937,61.11],[1938,62.44],[1939,63.12],[1940,63.28],[1941,63.84],[1942,64.63],[1943,64.34],[1944,65.13],[1945,65.63],[1946,66.33],[1947,66.73],[1948,67.3],[1949,67.68],[1950,68.12],[1951,68.22],[1952,68.44],[1953,68.79],[1954,69.58],[1955,69.63],[1956,69.71],[1957,69.49],[1958,69.76],[1959,69.98],[1960,69.91],[1961,70.32],[1962,70.21],[1963,70.04],[1964,70.33],[1965,70.41],[1966,70.43],[1967,70.76],[1968,70.42],[1969,70.66],[1970,70.92],[1971,71.24],[1972,71.34],[1973,71.54],[1974,72.08],[1975,72.68],[1976,72.99],[1977,73.38],[1978,73.58],[1979,74.03],[1980,73.93],[1981,74.36],[1982,74.65],[1983,74.71],[1984,74.82],[1985,74.79],[1986,74.87],[1987,75.01],[1988,75.03],[1989,75.31],[1990,75.6],[1991,75.8],[1992,76.08],[1993,75.83],[1994,76],[1995,76.09],[1996,76.44],[1997,76.8],[1998,76.97],[1999,76.97],[2000,77.13],[2001,77.25],[2002,77.31],[2003,77.49],[2004,77.92],[2005,77.93],[2006,78.21],[2007,79.09],[2008,79.27],[2009,79.43]]},{"name":"China","category":"East Asia & Pacific","x":[[1800,985.89],[1820,863.05],[1821,859.02],[1822,855.01],[1823,851.02],[1824,847.04],[1825,843.09],[1826,839.15],[1827,835.23],[1828,831.33],[1829,827.45],[1830,823.59],[1831,819.74],[1832,815.92],[1833,812.11],[1834,808.32],[1835,804.54],[1836,800.78],[1837,797.05],[1838,793.32],[1839,789.62],[1840,785.93],[1841,782.26],[1842,778.61],[1843,774.98],[1844,771.36],[1845,767.76],[1846,764.17],[1847,760.6],[1848,757.05],[1849,753.52],[1850,750],[1851,675.4],[1852,608.22],[1853,547.72],[1854,493.24],[1855,444.18],[1856,400],[1857,420.8],[1858,442.67],[1859,465.69],[1860,489.9],[1861,515.37],[1862,542.16],[1863,570.35],[1864,600],[1865,626.77],[1866,654.74],[1867,683.95],[1868,714.47],[1869,746.35],[1870,779.65],[1871,780.42],[1872,781.18],[1873,781.94],[1874,782.71],[1875,783.47],[1876,784.24],[1877,785.01],[1878,785.78],[1879,786.55],[1880,787.32],[1881,788.09],[1882,788.86],[1883,789.63],[1884,790.4],[1885,791.18],[1886,791.95],[1887,792.73],[1888,793.5],[1889,794.28],[1890,795.06],[1891,795.78],[1892,796.5],[1893,797.22],[1894,797.94],[1895,798.66],[1896,799.38],[1897,800.11],[1898,800.83],[1899,801.56],[1900,802.28],[1901,803.06],[1902,803.84],[1903,804.62],[1904,805.4],[1905,806.18],[1906,806.96],[1907,807.74],[1908,808.53],[1909,809.31],[1910,810.09],[1911,810.88],[1912,811.66],[1913,812.45],[1914,823.4],[1915,834.5],[1916,845.75],[1917,857.15],[1918,868.7],[1919,880.41],[1920,892.28],[1921,904.31],[1922,916.5],[1923,928.85],[1924,941.37],[1925,954.06],[1926,966.92],[1927,979.96],[1928,993.16],[1929,1006.55],[1930,1015.72],[1931,1018.48],[1932,1043.08],[1933,1035.38],[1934,940.18],[1935,1010.72],[1936,1068.93],[1937,1037.42],[1938,1006.21],[1939,930.68],[1940,860.82],[1941,796.21],[1942,736.44],[1943,681.16],[1944,630.03],[1945,582.74],[1946,539],[1947,498.54],[1948,461.12],[1949,426.5],[1950,394.49],[1951,432.35],[1952,473.38],[1953,486.2],[1954,490.39],[1955,507.64],[1956,542.5],[1957,560],[1958,607.89],[1959,604.38],[1960,583.02],[1961,486.83],[1962,484.67],[1963,519.76],[1964,567.77],[1965,617.76],[1966,657.14],[1967,622.45],[1968,594.27],[1969,627.78],[1970,685.35],[1971,699.98],[1972,702.94],[1973,738.22],[1974,735.36],[1975,767.09],[1976,750.79],[1977,786.85],[1978,861.1],[1979,915.22],[1980,934.27],[1981,977.54],[1982,1044.34],[1983,1107.46],[1984,1229.08],[1985,1337.64],[1986,1406.19],[1987,1529.5],[1988,1611.38],[1989,1615.03],[1990,1647.38],[1991,1732.13],[1992,1877.41],[1993,2035.59],[1994,2214.2],[1995,2521.34],[1996,2546.44],[1997,2653.3],[1998,2635.55],[1999,2784.39],[2000,3012.12],[2001,3309.8],[2002,3695.65],[2003,4228.98],[2004,4551.13],[2005,4909.2],[2006,5450.12],[2007,6127.78],[2008,6679.2],[2009,7226.07]],"size":[[1820,381000000],[1821,383711494],[1822,386442286],[1823,389192512],[1824,391962310],[1825,394751821],[1826,397561184],[1827,400390540],[1828,403240033],[1829,406109805],[1830,409000000],[1831,409299014],[1832,409598247],[1833,409897699],[1834,410197370],[1835,410497259],[1836,410797368],[1837,411097697],[1838,411398245],[1839,411699012],[1840,412000000],[1841,412000000],[1842,412000000],[1843,412000000],[1844,412000000],[1845,412000000],[1846,412000000],[1847,412000000],[1848,412000000],[1849,412000000],[1850,412000000],[1851,408358528],[1852,404749241],[1853,401171855],[1854,397626087],[1855,394111659],[1856,390628294],[1857,387175716],[1858,383753654],[1859,380361838],[1860,377000000],[1861,375055482],[1862,373120994],[1863,371196483],[1864,369281899],[1865,367377190],[1866,365482306],[1867,363597195],[1868,361721807],[1869,359856092],[1870,358000000],[1871,358988000],[1872,359978000],[1873,360971000],[1874,361967000],[1875,362966000],[1876,363967000],[1877,364971000],[1878,365978000],[1879,366988000],[1880,368000000],[1881,369183000],[1882,370369000],[1883,371560000],[1884,372754000],[1885,373952000],[1886,375154000],[1887,376359000],[1888,377569000],[1889,378783000],[1890,380000000],[1891,381979000],[1892,383969000],[1893,385969000],[1894,387979000],[1895,390000000],[1896,391980000],[1897,393970000],[1898,395970000],[1899,397980000],[1900,400000000],[1901,402243000],[1902,404498000],[1903,406766000],[1904,409047000],[1905,411340000],[1906,413646000],[1907,415965000],[1908,418297000],[1909,420642000],[1910,423000000],[1911,427662000],[1912,432375000],[1913,437140000],[1914,441958000],[1915,446829000],[1916,451753000],[1917,456732000],[1918,461766000],[1919,466855000],[1920,472000000],[1921,473673000],[1922,475352000],[1923,477037000],[1924,478728000],[1925,480425000],[1926,482128000],[1927,483837000],[1928,485552000],[1929,487273000],[1930,489000000],[1931,492640000],[1932,496307000],[1933,500000000],[1934,502639000],[1935,505292000],[1936,507959000],[1937,510640000],[1938,513336000],[1939,516046000],[1940,518770000],[1941,521508000],[1942,524261000],[1943,527028000],[1944,529810000],[1945,532607000],[1946,535418000],[1947,538244000],[1948,541085000],[1949,543941000],[1950,546815000],[1951,557480000],[1952,568910000],[1953,581390000],[1954,595310000],[1955,608655000],[1956,621465000],[1957,637408000],[1958,653235000],[1959,666005000],[1960,667070000],[1961,660330000],[1962,665770000],[1963,682335000],[1964,698355000],[1965,715185000],[1966,735400000],[1967,754550000],[1968,774510000],[1969,796025000],[1970,818315000],[1971,841105000],[1972,862030000],[1973,881940000],[1974,900350000],[1975,916395000],[1976,930685000],[1977,943455000],[1978,956165000],[1979,969005000],[1980,981235000],[1981,993861000],[1982,1000281000],[1983,1023288000],[1984,1036825000],[1985,1051040000],[1986,1066790000],[1987,1084035000],[1988,1101630000],[1989,1118650000],[1990,1135185000],[1991,1150780000],[1992,1164970000],[1993,1178440000],[1994,1191835000],[1995,1204855000],[1996,1217550000],[1997,1230075000],[1998,1241935000],[1999,1252735000],[2000,1262645000],[2001,1271850000],[2002,1280400000],[2003,1288400000],[2004,1295733978],[2005,1303182268],[2006,1310823807],[2007,1318683096],[2008,1326856173]],"y":[[1800,32],[1850,32],[1856,26],[1864,31],[1871,32],[1924,32],[1930,32],[1934,34],[1936,35],[1942,37],[1949,41],[1950,39.25],[1951,39.64],[1952,40.41],[1953,44.56],[1954,46.47],[1955,48.02],[1956,50.45],[1957,50.55],[1958,50.16],[1959,38.4],[1960,31.63],[1961,34.1],[1962,44.5],[1963,51.9],[1964,53.32],[1965,55.65],[1966,56.8],[1967,58.38],[1968,59.41],[1969,60.97],[1970,62.65],[1971,63.74],[1972,63.12],[1973,62.78],[1974,62.5],[1975,62.7],[1976,62.44],[1977,63.97],[1978,64.24],[1979,65.09],[1980,66.12],[1981,66.45],[1982,66.37],[1983,66.54],[1984,66.71],[1985,66.89],[1986,67.08],[1987,67.29],[1988,67.52],[1989,67.77],[1990,68.04],[1991,68.33],[1992,68.64],[1993,68.95],[1994,69.27],[1995,69.6],[1996,69.94],[1997,70.28],[1998,70.62],[1999,70.96],[2000,71.29],[2001,71.59],[2002,71.87],[2003,72.13],[2004,72.35],[2005,72.56],[2006,72.74],[2007,72.92],[2008,73.1],[2009,73.28]]}];

xMax = 1e5;
xMin = 300;
yMax = 85;
yMin = 10;
sizeMin = 0;
sizeMax = 5e8;
yearMin = 1800;
yearMax = 2009;

jsonData = [{ "name":"Portugal", "category":"Portugal","x": [[1997, 1.30410000000000E+10],[1998, 1.20550000000000E+10],[1999, 1.51310000000000E+10],[2000, 1.46880000000000E+10],[2001, 1.36220000000000E+10],[2002, 1.52120000000000E+10],[2003, 1.45270000000000E+10],[2004, 1.48580000000000E+10],[2005, 1.52260000000000E+10],[2006, 1.49580000000000E+10],[2007, 1.23980000000000E+10],[2008, 1.11960000000000E+10]], "y": [[1997, 8.90000000000000E+07],[1998, 2.01800000000000E+09],[1999, 8.07400000000000E+09],[2000, 7.13800000000000E+09],[2001, 7.21200000000000E+09],[2002, 9.03700000000000E+09],[2003, 7.74000000000000E+09],[2004, 1.16890000000000E+10],[2005, 1.36060000000000E+10],[2006, 1.23430000000000E+10],[2007, 1.31240000000000E+10],[2008, 1.51990000000000E+10]], "size": [[1997, 3.41380000000000E+10],[1998, 3.89130000000000E+10],[1999, 4.29420000000000E+10],[2000, 4.33720000000000E+10],[2001, 4.61680000000000E+10],[2002, 4.56500000000000E+10],[2003, 4.65210000000000E+10],[2004, 4.48270000000000E+10],[2005, 4.61880000000000E+10],[2006, 4.85760000000000E+10],[2007, 4.68960000000000E+10],[2008, 4.54710000000000E+10]] },{ "name":"Philippines", "category":"Philippines","x": [[1994, 1.34800000000000E+09],[1995, 2.10900000000000E+09],[1996, 4.85500000000000E+09],[1997, 7.36300000000000E+09],[1998, 9.38800000000000E+09],[1999, 1.11830000000000E+10],[2000, 1.66630000000000E+10],[2001, 1.87890000000000E+10],[2002, 1.61280000000000E+10],[2003, 1.49390000000000E+10],[2004, 1.61940000000000E+10],[2005, 1.52570000000000E+10],[2006, 1.52940000000000E+10],[2007, 1.68370000000000E+10],[2008, 1.57490000000000E+10]], "y": [[1994, 1.20000000000000E+07],[1995, 1.20000000000000E+07],[1996, 2.00000000000000E+07],[1997, 1.20000000000000E+07],[1998, 2.00000000000000E+07],[1999, 1.60000000000000E+07],[2000, 1.70000000000000E+07],[2001, 8.48000000000000E+08],[2002, 8.77100000000000E+09],[2003, 1.31390000000000E+10],[2004, 1.23840000000000E+10],[2005, 1.68610000000000E+10],[2006, 1.63660000000000E+10],[2007, 1.87890000000000E+10],[2008, 1.95760000000000E+10]], "size": [[1994, 3.04710000000000E+10],[1995, 3.35660000000000E+10],[1996, 3.67270000000000E+10],[1997, 3.97970000000000E+10],[1998, 4.15780000000000E+10],[1999, 4.14320000000000E+10],[2000, 4.52900000000000E+10],[2001, 4.70500000000000E+10],[2002, 4.84670000000000E+10],[2003, 5.29400000000000E+10],[2004, 5.59570000000000E+10],[2005, 5.65670000000000E+10],[2006, 5.67830000000000E+10],[2007, 5.96110000000000E+10],[2008, 6.08210000000000E+10]] },{ "name":"Tanzania", "category":"Tanzania","x": [[2004, 8.60000000000000E+07],[2005, 9.90000000000000E+07],[2006, 1.06000000000000E+08],[2007, 1.13000000000000E+08],[2008, 1.19000000000000E+08]], "y": [[2004, 4.15000000000000E+08],[2005, 1.14900000000000E+09],[2006, 1.33000000000000E+09],[2007, 1.51300000000000E+09],[2008, 1.60000000000000E+09]], "size": [[2004, 2.89400000000000E+09],[2005, 3.61300000000000E+09],[2006, 3.52900000000000E+09],[2007, 4.17500000000000E+09],[2008, 4.41400000000000E+09]] },{ "name":"Morocco", "category":"Morocco","x": [[2005, 1.31620000000000E+10],[2006, 1.34780000000000E+10],[2007, 1.28630000000000E+10],[2008, 1.16990000000000E+10]], "y": [[2005, 2.00300000000000E+09],[2006, 2.51200000000000E+09],[2007, 2.82300000000000E+09],[2008, 2.86700000000000E+09]], "size": [[2005, 1.99110000000000E+10],[2006, 2.04300000000000E+10],[2007, 2.05060000000000E+10],[2008, 2.08240000000000E+10]] },{ "name":"Greece", "category":"Greece","x": [[1986, 1.88100000000000E+10],[1987, 2.07060000000000E+10],[1988, 2.43860000000000E+10],[1989, 2.51790000000000E+10],[1990, 2.51660000000000E+10],[1991, 2.37020000000000E+10],[1992, 2.66120000000000E+10],[1993, 2.77950000000000E+10],[1994, 2.95780000000000E+10],[1995, 2.86970000000000E+10],[1996, 2.92980000000000E+10],[1997, 3.06290000000000E+10],[1998, 3.24420000000000E+10],[1999, 3.23810000000000E+10],[2000, 3.43130000000000E+10],[2001, 3.54310000000000E+10],[2002, 3.45660000000000E+10],[2003, 3.51700000000000E+10],[2004, 3.53800000000000E+10],[2005, 3.55430000000000E+10],[2006, 3.22640000000000E+10],[2007, 3.46760000000000E+10],[2008, 3.33560000000000E+10]], "y": [[1986, 6.40000000000000E+07],[1987, 6.30000000000000E+07],[1988, 9.40000000000000E+07],[1989, 1.12000000000000E+08],[1990, 9.20000000000000E+07],[1991, 9.30000000000000E+07],[1992, 7.90000000000000E+07],[1993, 8.40000000000000E+07],[1994, 8.00000000000000E+07],[1995, 7.50000000000000E+07],[1996, 7.80000000000000E+07],[1997, 3.33000000000000E+08],[1998, 1.71300000000000E+09],[1999, 3.90700000000000E+09],[2000, 5.92000000000000E+09],[2001, 6.13300000000000E+09],[2002, 7.06100000000000E+09],[2003, 7.99500000000000E+09],[2004, 8.99100000000000E+09],[2005, 8.17100000000000E+09],[2006, 1.06100000000000E+10],[2007, 1.37740000000000E+10],[2008, 1.37970000000000E+10]], "size": [[1986, 2.81240000000000E+10],[1987, 3.00860000000000E+10],[1988, 3.31620000000000E+10],[1989, 3.42100000000000E+10],[1990, 3.47750000000000E+10],[1991, 3.57430000000000E+10],[1992, 3.72250000000000E+10],[1993, 3.81370000000000E+10],[1994, 4.03810000000000E+10],[1995, 4.12990000000000E+10],[1996, 4.24110000000000E+10],[1997, 4.32920000000000E+10],[1998, 4.61800000000000E+10],[1999, 4.93950000000000E+10],[2000, 5.34250000000000E+10],[2001, 5.30760000000000E+10],[2002, 5.39450000000000E+10],[2003, 5.79050000000000E+10],[2004, 5.88130000000000E+10],[2005, 5.94270000000000E+10],[2006, 6.01790000000000E+10],[2007, 6.27110000000000E+10],[2008, 6.29120000000000E+10]] },{ "name":"Thailand", "category":"Thailand","x": [[1981, 1.67500000000000E+09],[1982, 1.85900000000000E+09],[1983, 1.80400000000000E+09],[1984, 2.31700000000000E+09],[1985, 5.31300000000000E+09],[1986, 5.54500000000000E+09],[1987, 6.69800000000000E+09],[1988, 6.80000000000000E+09],[1989, 7.87900000000000E+09],[1990, 1.10530000000000E+10],[1991, 1.30370000000000E+10],[1992, 1.48150000000000E+10],[1993, 1.35040000000000E+10],[1994, 1.41310000000000E+10],[1995, 1.47800000000000E+10],[1996, 1.76400000000000E+10],[1997, 1.90760000000000E+10],[1998, 1.66940000000000E+10],[1999, 1.62520000000000E+10],[2000, 1.77940000000000E+10],[2001, 1.99270000000000E+10],[2002, 1.87990000000000E+10],[2003, 1.90530000000000E+10],[2004, 2.02840000000000E+10],[2005, 2.02380000000000E+10],[2006, 2.47580000000000E+10],[2007, 3.05370000000000E+10],[2008, 3.13620000000000E+10]], "y": [[1981, 1.52700000000000E+09],[1982, 5.01100000000000E+09],[1983, 6.16900000000000E+09],[1984, 8.26300000000000E+09],[1985, 1.06660000000000E+10],[1986, 1.02520000000000E+10],[1987, 1.56240000000000E+10],[1988, 1.87200000000000E+10],[1989, 1.91950000000000E+10],[1990, 1.77680000000000E+10],[1991, 1.98000000000000E+10],[1992, 2.29430000000000E+10],[1993, 2.79530000000000E+10],[1994, 3.14100000000000E+10],[1995, 3.38990000000000E+10],[1996, 3.73490000000000E+10],[1997, 4.45090000000000E+10],[1998, 4.87630000000000E+10],[1999, 5.20100000000000E+10],[2000, 6.04160000000000E+10],[2001, 7.16910000000000E+10],[2002, 7.78310000000000E+10],[2003, 8.43010000000000E+10],[2004, 8.81780000000000E+10],[2005, 9.34050000000000E+10],[2006, 9.35550000000000E+10],[2007, 9.60000000000000E+10],[2008, 1.01892000000000E+11]], "size": [[1981, 1.53690000000000E+10],[1982, 1.66940000000000E+10],[1983, 1.88560000000000E+10],[1984, 2.10240000000000E+10],[1985, 2.30740000000000E+10],[1986, 2.47170000000000E+10],[1987, 2.86520000000000E+10],[1988, 3.24640000000000E+10],[1989, 3.74060000000000E+10],[1990, 4.41760000000000E+10],[1991, 5.01850000000000E+10],[1992, 5.70980000000000E+10],[1993, 6.34070000000000E+10],[1994, 7.11770000000000E+10],[1995, 8.04200000000000E+10],[1996, 8.98420000000000E+10],[1997, 9.32270000000000E+10],[1998, 9.00530000000000E+10],[1999, 9.00400000000000E+10],[2000, 9.59770000000000E+10],[2001, 1.02420000000000E+11],[2002, 1.09013000000000E+11],[2003, 1.16981000000000E+11],[2004, 1.25726000000000E+11],[2005, 1.32198000000000E+11],[2006, 1.38744000000000E+11],[2007, 1.43378000000000E+11],[2008, 1.47426000000000E+11]] },{ "name":"Ukraine", "category":"Ukraine","x": [[1990, 1.14033000000000E+11],[1991, 1.06667000000000E+11],[1992, 1.05831000000000E+11],[1993, 8.76020000000000E+10],[1994, 7.70880000000000E+10],[1995, 7.02280000000000E+10],[1996, 5.63540000000000E+10],[1997, 5.51930000000000E+10],[1998, 5.02200000000000E+10],[1999, 5.38710000000000E+10],[2000, 5.15140000000000E+10],[2001, 5.31680000000000E+10],[2002, 5.46290000000000E+10],[2003, 5.46430000000000E+10],[2004, 4.51280000000000E+10],[2005, 5.00130000000000E+10],[2006, 6.49420000000000E+10],[2007, 6.71010000000000E+10],[2008, 6.84660000000000E+10]], "y": [[1990, 4.98890000000000E+10],[1991, 4.64310000000000E+10],[1992, 4.22350000000000E+10],[1993, 3.88880000000000E+10],[1994, 3.42600000000000E+10],[1995, 3.27260000000000E+10],[1996, 3.32750000000000E+10],[1997, 3.10170000000000E+10],[1998, 2.91970000000000E+10],[1999, 3.02540000000000E+10],[2000, 2.99470000000000E+10],[2001, 3.03570000000000E+10],[2002, 3.04940000000000E+10],[2003, 3.42400000000000E+10],[2004, 3.75240000000000E+10],[2005, 3.41570000000000E+10],[2006, 2.44500000000000E+10],[2007, 2.55450000000000E+10],[2008, 2.20350000000000E+10]], "size": [[1990, 2.98626000000000E+11],[1991, 2.78467000000000E+11],[1992, 2.52317000000000E+11],[1993, 2.29708000000000E+11],[1994, 2.02713000000000E+11],[1995, 1.93821000000000E+11],[1996, 1.82785000000000E+11],[1997, 1.77826000000000E+11],[1998, 1.72646000000000E+11],[1999, 1.71944000000000E+11],[2000, 1.71269000000000E+11],[2001, 1.72803000000000E+11],[2002, 1.73572000000000E+11],[2003, 1.80208000000000E+11],[2004, 1.82030000000000E+11],[2005, 1.85913000000000E+11],[2006, 1.93233000000000E+11],[2007, 1.96135000000000E+11],[2008, 1.92456000000000E+11]] },{ "name":"Indonesia", "category":"Indonesia","x": [[1985, 3.39000000000000E+08],[1986, 4.68700000000000E+09],[1987, 6.33700000000000E+09],[1988, 6.85700000000000E+09],[1989, 8.25100000000000E+09],[1990, 9.76800000000000E+09],[1991, 1.10460000000000E+10],[1992, 1.13620000000000E+10],[1993, 1.06810000000000E+10],[1994, 1.28050000000000E+10],[1995, 1.43670000000000E+10],[1996, 1.70380000000000E+10],[1997, 2.08160000000000E+10],[1998, 2.41700000000000E+10],[1999, 2.93650000000000E+10],[2000, 3.40020000000000E+10],[2001, 3.77130000000000E+10],[2002, 4.29290000000000E+10],[2003, 4.64590000000000E+10],[2004, 4.82110000000000E+10],[2005, 5.17930000000000E+10],[2006, 5.86300000000000E+10],[2007, 6.38170000000000E+10],[2008, 6.13920000000000E+10]], "y": [[1985, 2.74000000000000E+08],[1986, 3.83000000000000E+08],[1987, 3.93000000000000E+08],[1988, 6.61000000000000E+08],[1989, 8.04000000000000E+08],[1990, 7.34000000000000E+08],[1991, 1.05100000000000E+09],[1992, 1.07600000000000E+09],[1993, 4.84400000000000E+09],[1994, 1.87160000000000E+10],[1995, 2.51800000000000E+10],[1996, 2.87560000000000E+10],[1997, 3.04900000000000E+10],[1998, 2.70140000000000E+10],[1999, 2.86390000000000E+10],[2000, 2.58100000000000E+10],[2001, 2.59020000000000E+10],[2002, 2.34650000000000E+10],[2003, 2.31750000000000E+10],[2004, 1.93460000000000E+10],[2005, 1.78200000000000E+10],[2006, 1.91790000000000E+10],[2007, 2.10130000000000E+10],[2008, 2.41560000000000E+10]], "size": [[1985, 1.40980000000000E+10],[1986, 1.95070000000000E+10],[1987, 2.29750000000000E+10],[1988, 2.52010000000000E+10],[1989, 2.77160000000000E+10],[1990, 3.26670000000000E+10],[1991, 3.73400000000000E+10],[1992, 4.15130000000000E+10],[1993, 4.53960000000000E+10],[1994, 5.13540000000000E+10],[1995, 5.92730000000000E+10],[1996, 6.77150000000000E+10],[1997, 7.57180000000000E+10],[1998, 7.83300000000000E+10],[1999, 8.58220000000000E+10],[2000, 9.34290000000000E+10],[2001, 1.01375000000000E+11],[2002, 1.08318000000000E+11],[2003, 1.14050000000000E+11],[2004, 1.21275000000000E+11],[2005, 1.27751000000000E+11],[2006, 1.32727000000000E+11],[2007, 1.40906000000000E+11],[2008, 1.48437000000000E+11]] },{ "name":"Luxembourg", "category":"Luxembourg","x": [[1969, 1.11000000000000E+09],[1970, 1.01400000000000E+09],[1971, 8.42000000000000E+08],[1972, 7.66000000000000E+08],[1973, 8.20000000000000E+08],[1974, 7.14000000000000E+08],[1975, 4.92000000000000E+08],[1976, 3.72000000000000E+08],[1977, 3.76000000000000E+08],[1978, 4.22000000000000E+08],[1979, 4.28000000000000E+08],[1980, 4.74000000000000E+08],[1981, 4.20000000000000E+08],[1982, 3.08000000000000E+08],[1983, 2.76000000000000E+08],[1984, 3.62000000000000E+08],[1985, 3.75000000000000E+08],[1986, 3.85000000000000E+08],[1987, 3.48000000000000E+08],[1988, 3.84000000000000E+08],[1989, 4.44000000000000E+08],[1990, 4.77000000000000E+08],[1991, 5.25000000000000E+08],[1992, 4.72000000000000E+08],[1993, 5.03000000000000E+08],[1994, 3.85000000000000E+08],[1995, 1.89000000000000E+08],[1996, 1.33000000000000E+08],[1997, 8.40000000000000E+07]], "y": [[1969, 1.00000000000000E+06],[1970, 2.00000000000000E+06],[1971, 5.00000000000000E+06],[1972, 7.20000000000000E+07],[1973, 1.42000000000000E+08],[1974, 1.20000000000000E+08],[1975, 2.41000000000000E+08],[1976, 4.62000000000000E+08],[1977, 4.71000000000000E+08],[1978, 4.14000000000000E+08],[1979, 3.90000000000000E+08],[1980, 2.16000000000000E+08],[1981, 9.00000000000000E+07],[1982, 2.00000000000000E+06],[1983, 1.50000000000000E+07],[1984, 1.40000000000000E+07],[1985, 4.00000000000000E+06],[1986, 1.00000000000000E+06],[1987, 6.10000000000000E+07],[1988, 1.90000000000000E+07],[1989, 4.60000000000000E+07],[1990, 3.40000000000000E+07],[1991, 2.80000000000000E+07],[1992, 3.00000000000000E+07],[1993, 2.30000000000000E+07],[1994, 5.00000000000000E+07],[1995, 1.52000000000000E+08],[1996, 1.88000000000000E+08],[1997, 1.77000000000000E+08]], "size": [[1969, 1.44000000000000E+09],[1970, 1.35700000000000E+09],[1971, 1.33300000000000E+09],[1972, 1.36800000000000E+09],[1973, 1.39400000000000E+09],[1974, 1.24200000000000E+09],[1975, 1.05400000000000E+09],[1976, 1.09600000000000E+09],[1977, 1.13600000000000E+09],[1978, 1.13900000000000E+09],[1979, 1.09800000000000E+09],[1980, 9.18000000000000E+08],[1981, 7.28000000000000E+08],[1982, 5.42000000000000E+08],[1983, 4.70000000000000E+08],[1984, 5.38000000000000E+08],[1985, 5.19000000000000E+08],[1986, 5.88000000000000E+08],[1987, 5.78000000000000E+08],[1988, 6.16000000000000E+08],[1989, 6.32000000000000E+08],[1990, 6.24000000000000E+08],[1991, 7.01000000000000E+08],[1992, 6.60000000000000E+08],[1993, 6.71000000000000E+08],[1994, 5.77000000000000E+08],[1995, 4.87000000000000E+08],[1996, 4.40000000000000E+08],[1997, 4.06000000000000E+08]] },{ "name":"Chile", "category":"Chile","x": [[1971, 1.37600000000000E+09],[1972, 8.54000000000000E+08],[1973, 1.22700000000000E+09],[1974, 1.06100000000000E+09],[1975, 8.02000000000000E+08],[1976, 9.89000000000000E+08],[1977, 1.06000000000000E+09],[1978, 1.20100000000000E+09],[1979, 1.61500000000000E+09],[1980, 1.89000000000000E+09],[1981, 1.92400000000000E+09],[1982, 1.14200000000000E+09],[1983, 1.36400000000000E+09],[1984, 2.10000000000000E+09],[1985, 1.72500000000000E+09],[1986, 1.58500000000000E+09],[1987, 1.53800000000000E+09],[1988, 3.01700000000000E+09],[1989, 5.40600000000000E+09],[1990, 6.52500000000000E+09],[1991, 4.25000000000000E+09],[1992, 2.60100000000000E+09],[1993, 2.84900000000000E+09],[1994, 4.69300000000000E+09],[1995, 6.39100000000000E+09],[1996, 9.49900000000000E+09],[1997, 9.37400000000000E+09],[1998, 1.13420000000000E+10],[1999, 1.27700000000000E+10],[2000, 8.46700000000000E+09],[2001, 4.83700000000000E+09],[2002, 5.05200000000000E+09],[2003, 4.87800000000000E+09],[2004, 7.71800000000000E+09],[2005, 7.21200000000000E+09],[2006, 1.05990000000000E+10],[2007, 1.32590000000000E+10],[2008, 1.41120000000000E+10]], "y": [[1971, 9.50000000000000E+07],[1972, 9.10000000000000E+07],[1973, 9.80000000000000E+07],[1974, 1.01000000000000E+08],[1975, 9.50000000000000E+07],[1976, 9.10000000000000E+07],[1977, 1.04000000000000E+08],[1978, 1.14000000000000E+08],[1979, 1.24000000000000E+08],[1980, 1.53000000000000E+08],[1981, 1.83000000000000E+08],[1982, 1.95000000000000E+08],[1983, 1.88000000000000E+08],[1984, 2.09000000000000E+08],[1985, 2.16000000000000E+08],[1986, 2.38000000000000E+08],[1987, 2.41000000000000E+08],[1988, 2.57000000000000E+08],[1989, 2.44000000000000E+08],[1990, 1.88000000000000E+08],[1991, 1.96000000000000E+08],[1992, 1.93000000000000E+08],[1993, 2.88000000000000E+08],[1994, 3.00000000000000E+08],[1995, 3.02000000000000E+08],[1996, 3.07000000000000E+08],[1997, 1.00400000000000E+09],[1998, 5.10900000000000E+09],[1999, 7.62300000000000E+09],[2000, 1.04490000000000E+10],[2001, 1.33410000000000E+10],[2002, 1.29230000000000E+10],[2003, 1.65760000000000E+10],[2004, 1.66380000000000E+10],[2005, 1.36000000000000E+10],[2006, 1.14380000000000E+10],[2007, 4.63000000000000E+09],[2008, 2.18800000000000E+09]], "size": [[1971, 8.52400000000000E+09],[1972, 8.93400000000000E+09],[1973, 8.76600000000000E+09],[1974, 9.29700000000000E+09],[1975, 8.73200000000000E+09],[1976, 9.27700000000000E+09],[1977, 9.77600000000000E+09],[1978, 1.03600000000000E+10],[1979, 1.11340000000000E+10],[1980, 1.17510000000000E+10],[1981, 1.19780000000000E+10],[1982, 1.18710000000000E+10],[1983, 1.26240000000000E+10],[1984, 1.34970000000000E+10],[1985, 1.40400000000000E+10],[1986, 1.47440000000000E+10],[1987, 1.56370000000000E+10],[1988, 1.69150000000000E+10],[1989, 1.78110000000000E+10],[1990, 1.83720000000000E+10],[1991, 1.99610000000000E+10],[1992, 2.23630000000000E+10],[1993, 2.40030000000000E+10],[1994, 2.52770000000000E+10],[1995, 2.80270000000000E+10],[1996, 3.07330000000000E+10],[1997, 3.32970000000000E+10],[1998, 3.55090000000000E+10],[1999, 3.83900000000000E+10],[2000, 4.00780000000000E+10],[2001, 4.25310000000000E+10],[2002, 4.36710000000000E+10],[2003, 4.68290000000000E+10],[2004, 5.12080000000000E+10],[2005, 5.24840000000000E+10],[2006, 5.53200000000000E+10],[2007, 5.85090000000000E+10],[2008, 5.97040000000000E+10]] },{ "name":"Kyrgyz Republic", "category":"Kyrgyz Republic","x": [[1990, 2.05600000000000E+09],[1991, 1.95700000000000E+09],[1992, 1.07700000000000E+09],[1993, 9.73000000000000E+08],[1994, 6.83000000000000E+08],[1995, 6.78000000000000E+08],[1996, 8.27000000000000E+08],[1997, 8.99000000000000E+08],[1998, 8.77000000000000E+08],[1999, 5.41000000000000E+08],[2000, 6.41000000000000E+08],[2001, 6.19000000000000E+08],[2002, 5.68000000000000E+08],[2003, 5.09000000000000E+08],[2004, 5.24000000000000E+08],[2005, 5.94000000000000E+08],[2006, 5.63000000000000E+08],[2007, 5.87000000000000E+08],[2008, 2.92000000000000E+08]], "y": [[1990, 3.69000000000000E+09],[1991, 3.70700000000000E+09],[1992, 3.51200000000000E+09],[1993, 1.39500000000000E+09],[1994, 6.80000000000000E+08],[1995, 2.48900000000000E+09],[1996, 2.64700000000000E+09],[1997, 2.45200000000000E+09],[1998, 1.63500000000000E+09],[1999, 1.45200000000000E+09],[2000, 1.65900000000000E+09],[2001, 1.88700000000000E+09],[2002, 1.73100000000000E+09],[2003, 1.55100000000000E+09],[2004, 1.69400000000000E+09],[2005, 1.56200000000000E+09],[2006, 1.63200000000000E+09],[2007, 1.70200000000000E+09],[2008, 8.45000000000000E+08]], "size": [[1990, 1.57320000000000E+10],[1991, 1.57220000000000E+10],[1992, 1.37890000000000E+10],[1993, 1.14530000000000E+10],[1994, 1.30870000000000E+10],[1995, 1.42850000000000E+10],[1996, 1.57290000000000E+10],[1997, 1.42850000000000E+10],[1998, 1.24550000000000E+10],[1999, 1.41350000000000E+10],[2000, 1.59830000000000E+10],[2001, 1.49360000000000E+10],[2002, 1.30860000000000E+10],[2003, 1.55760000000000E+10],[2004, 1.63120000000000E+10],[2005, 1.64150000000000E+10],[2006, 1.70820000000000E+10],[2007, 1.62370000000000E+10],[2008, 1.18770000000000E+10]] },{ "name":"Italy", "category":"Italy","x": [[1960, 2.13800000000000E+09],[1961, 4.31500000000000E+09],[1962, 5.10600000000000E+09],[1963, 3.44600000000000E+09],[1964, 3.73300000000000E+09],[1965, 4.31800000000000E+09],[1966, 5.07800000000000E+09],[1967, 8.24500000000000E+09],[1968, 7.04200000000000E+09],[1969, 7.49100000000000E+09],[1970, 5.71400000000000E+09],[1971, 5.86900000000000E+09],[1972, 4.65100000000000E+09],[1973, 5.18100000000000E+09],[1974, 6.61900000000000E+09],[1975, 5.98600000000000E+09],[1976, 8.12900000000000E+09],[1977, 8.95800000000000E+09],[1978, 1.02770000000000E+10],[1979, 1.50020000000000E+10],[1980, 1.82500000000000E+10],[1981, 2.03060000000000E+10],[1982, 2.41030000000000E+10],[1983, 2.41580000000000E+10],[1984, 2.76890000000000E+10],[1985, 3.00230000000000E+10],[1986, 3.10040000000000E+10],[1987, 3.30350000000000E+10],[1988, 3.38970000000000E+10],[1989, 3.20490000000000E+10],[1990, 3.57620000000000E+10],[1991, 3.21730000000000E+10],[1992, 2.50050000000000E+10],[1993, 2.01950000000000E+10],[1994, 2.29440000000000E+10],[1995, 2.75680000000000E+10],[1996, 2.53230000000000E+10],[1997, 2.47690000000000E+10],[1998, 2.78270000000000E+10],[1999, 2.82250000000000E+10],[2000, 3.05240000000000E+10],[2001, 3.67750000000000E+10],[2002, 4.04680000000000E+10],[2003, 4.41170000000000E+10],[2004, 5.08770000000000E+10],[2005, 4.94190000000000E+10],[2006, 5.04380000000000E+10],[2007, 4.97350000000000E+10],[2008, 4.85910000000000E+10]], "y": [[1960, 2.14900000000000E+09],[1961, 2.22300000000000E+09],[1962, 2.63300000000000E+09],[1963, 2.45500000000000E+09],[1964, 2.72600000000000E+09],[1965, 2.56600000000000E+09],[1966, 3.76300000000000E+09],[1967, 4.13900000000000E+09],[1968, 6.00500000000000E+09],[1969, 5.80100000000000E+09],[1970, 5.70000000000000E+09],[1971, 2.75200000000000E+09],[1972, 3.62300000000000E+09],[1973, 4.48200000000000E+09],[1974, 4.02000000000000E+09],[1975, 7.67300000000000E+09],[1976, 1.39880000000000E+10],[1977, 1.12570000000000E+10],[1978, 1.09860000000000E+10],[1979, 1.10880000000000E+10],[1980, 9.22600000000000E+09],[1981, 8.67200000000000E+09],[1982, 1.19850000000000E+10],[1983, 1.36540000000000E+10],[1984, 2.48740000000000E+10],[1985, 2.47120000000000E+10],[1986, 2.68710000000000E+10],[1987, 3.17320000000000E+10],[1988, 3.24200000000000E+10],[1989, 3.48890000000000E+10],[1990, 3.97090000000000E+10],[1991, 3.63420000000000E+10],[1992, 3.54760000000000E+10],[1993, 3.99630000000000E+10],[1994, 4.08040000000000E+10],[1995, 4.69980000000000E+10],[1996, 5.01910000000000E+10],[1997, 6.12930000000000E+10],[1998, 7.08830000000000E+10],[1999, 8.69830000000000E+10],[2000, 1.01360000000000E+11],[2001, 1.04188000000000E+11],[2002, 9.94140000000000E+10],[2003, 1.17300000000000E+11],[2004, 1.29772000000000E+11],[2005, 1.49262000000000E+11],[2006, 1.58079000000000E+11],[2007, 1.72646000000000E+11],[2008, 1.72699000000000E+11]], "size": [[1960, 5.59900000000000E+10],[1961, 6.03150000000000E+10],[1962, 6.45590000000000E+10],[1963, 7.10260000000000E+10],[1964, 7.63010000000000E+10],[1965, 8.25940000000000E+10],[1966, 8.93920000000000E+10],[1967, 9.62200000000000E+10],[1968, 1.03211000000000E+11],[1969, 1.09612000000000E+11],[1970, 1.16496000000000E+11],[1971, 1.23920000000000E+11],[1972, 1.33894000000000E+11],[1973, 1.43916000000000E+11],[1974, 1.47354000000000E+11],[1975, 1.45778000000000E+11],[1976, 1.61783000000000E+11],[1977, 1.64958000000000E+11],[1978, 1.73119000000000E+11],[1979, 1.78999000000000E+11],[1980, 1.83474000000000E+11],[1981, 1.78954000000000E+11],[1982, 1.81826000000000E+11],[1983, 1.80109000000000E+11],[1984, 1.79636000000000E+11],[1985, 1.82237000000000E+11],[1986, 1.88895000000000E+11],[1987, 1.98292000000000E+11],[1988, 2.00690000000000E+11],[1989, 2.07115000000000E+11],[1990, 2.13147000000000E+11],[1991, 2.18449000000000E+11],[1992, 2.22668000000000E+11],[1993, 2.19745000000000E+11],[1994, 2.28740000000000E+11],[1995, 2.37364000000000E+11],[1996, 2.39398000000000E+11],[1997, 2.46524000000000E+11],[1998, 2.53655000000000E+11],[1999, 2.59255000000000E+11],[2000, 2.69947000000000E+11],[2001, 2.71894000000000E+11],[2002, 2.77534000000000E+11],[2003, 2.86278000000000E+11],[2004, 2.95777000000000E+11],[2005, 2.96839000000000E+11],[2006, 3.07690000000000E+11],[2007, 3.08222000000000E+11],[2008, 3.13526000000000E+11]] },{ "name":"India", "category":"India","x": [[1971, 3.25900000000000E+10],[1972, 3.66810000000000E+10],[1973, 3.59580000000000E+10],[1974, 4.10390000000000E+10],[1975, 4.41110000000000E+10],[1976, 5.17750000000000E+10],[1977, 5.24270000000000E+10],[1978, 5.32180000000000E+10],[1979, 5.62710000000000E+10],[1980, 6.14630000000000E+10],[1981, 7.07460000000000E+10],[1982, 8.03900000000000E+10],[1983, 8.70300000000000E+10],[1984, 9.99000000000000E+10],[1985, 1.16039000000000E+11],[1986, 1.29902000000000E+11],[1987, 1.52799000000000E+11],[1988, 1.64671000000000E+11],[1989, 1.84971000000000E+11],[1990, 1.91603000000000E+11],[1991, 2.14079000000000E+11],[1992, 2.29328000000000E+11],[1993, 2.52692000000000E+11],[1994, 2.64422000000000E+11],[1995, 2.95808000000000E+11],[1996, 3.06786000000000E+11],[1997, 3.31441000000000E+11],[1998, 3.41238000000000E+11],[1999, 3.67613000000000E+11],[2000, 3.96485000000000E+11],[2001, 4.11644000000000E+11],[2002, 4.30677000000000E+11],[2003, 4.45778000000000E+11],[2004, 4.67341000000000E+11],[2005, 4.80875000000000E+11],[2006, 5.18206000000000E+11],[2007, 5.53194000000000E+11],[2008, 5.82523000000000E+11]], "y": [[1971, 3.77000000000000E+08],[1972, 4.74000000000000E+08],[1973, 3.58000000000000E+08],[1974, 4.65000000000000E+08],[1975, 5.13000000000000E+08],[1976, 4.86000000000000E+08],[1977, 5.08000000000000E+08],[1978, 5.64000000000000E+08],[1979, 5.91000000000000E+08],[1980, 6.24000000000000E+08],[1981, 7.93000000000000E+08],[1982, 1.98600000000000E+09],[1983, 2.29100000000000E+09],[1984, 2.15100000000000E+09],[1985, 2.15800000000000E+09],[1986, 3.68200000000000E+09],[1987, 4.23500000000000E+09],[1988, 3.60400000000000E+09],[1989, 7.27500000000000E+09],[1990, 9.95800000000000E+09],[1991, 1.33550000000000E+10],[1992, 1.62580000000000E+10],[1993, 1.78780000000000E+10],[1994, 2.18820000000000E+10],[1995, 2.94340000000000E+10],[1996, 3.20240000000000E+10],[1997, 2.89800000000000E+10],[1998, 3.96210000000000E+10],[1999, 4.98990000000000E+10],[2000, 4.30160000000000E+10],[2001, 4.64310000000000E+10],[2002, 4.79420000000000E+10],[2003, 6.01480000000000E+10],[2004, 6.27750000000000E+10],[2005, 6.15160000000000E+10],[2006, 6.23940000000000E+10],[2007, 7.54370000000000E+10],[2008, 8.19270000000000E+10]], "size": [[1971, 6.63840000000000E+10],[1972, 7.05160000000000E+10],[1973, 7.27960000000000E+10],[1974, 7.66780000000000E+10],[1975, 8.59260000000000E+10],[1976, 9.56150000000000E+10],[1977, 9.89280000000000E+10],[1978, 1.10130000000000E+11],[1979, 1.12820000000000E+11],[1980, 1.19260000000000E+11],[1981, 1.31126000000000E+11],[1982, 1.40300000000000E+11],[1983, 1.50994000000000E+11],[1984, 1.69205000000000E+11],[1985, 1.83390000000000E+11],[1986, 2.01279000000000E+11],[1987, 2.18984000000000E+11],[1988, 2.41307000000000E+11],[1989, 2.68663000000000E+11],[1990, 2.89438000000000E+11],[1991, 3.15631000000000E+11],[1992, 3.32713000000000E+11],[1993, 3.56335000000000E+11],[1994, 3.85438000000000E+11],[1995, 4.17624000000000E+11],[1996, 4.36736000000000E+11],[1997, 4.65812000000000E+11],[1998, 4.96929000000000E+11],[1999, 5.36609000000000E+11],[2000, 5.61248000000000E+11],[2001, 5.79860000000000E+11],[2002, 5.97293000000000E+11],[2003, 6.34037000000000E+11],[2004, 6.66646000000000E+11],[2005, 6.98242000000000E+11],[2006, 7.53245000000000E+11],[2007, 8.13902000000000E+11],[2008, 8.43339000000000E+11]] },{ "name":"Moldova", "category":"Moldova","x": [[1990, 4.98800000000000E+09],[1991, 4.58700000000000E+09],[1992, 3.88500000000000E+09],[1993, 3.95900000000000E+09],[1994, 3.60000000000000E+09],[1995, 1.91300000000000E+09],[1996, 1.36000000000000E+09],[1997, 4.88000000000000E+08],[1998, 5.00000000000000E+08],[1999, 2.08000000000000E+08],[2000, 1.65000000000000E+08],[2001, 1.19000000000000E+08],[2002, 1.22000000000000E+08],[2003, 1.86000000000000E+08]], "y": [[1990, 6.85800000000000E+09],[1991, 6.09900000000000E+09],[1992, 5.84100000000000E+09],[1993, 4.09500000000000E+09],[1994, 3.88500000000000E+09],[1995, 3.46600000000000E+09],[1996, 4.01200000000000E+09],[1997, 4.19000000000000E+09],[1998, 3.85800000000000E+09],[1999, 3.78200000000000E+09],[2000, 3.10100000000000E+09],[2001, 3.42300000000000E+09],[2002, 3.03700000000000E+09],[2003, 3.14600000000000E+09]], "size": [[1990, 1.62210000000000E+10],[1991, 1.50480000000000E+10],[1992, 1.29560000000000E+10],[1993, 1.02650000000000E+10],[1994, 8.22800000000000E+09],[1995, 6.06800000000000E+09],[1996, 6.12200000000000E+09],[1997, 5.27300000000000E+09],[1998, 4.66300000000000E+09],[1999, 4.19500000000000E+09],[2000, 3.35600000000000E+09],[2001, 3.64800000000000E+09],[2002, 3.30200000000000E+09],[2003, 3.41300000000000E+09]] },{ "name":"France", "category":"France","x": [[1960, 2.73730000000000E+10],[1961, 3.19810000000000E+10],[1962, 3.90250000000000E+10],[1963, 3.52530000000000E+10],[1964, 4.53680000000000E+10],[1965, 4.28280000000000E+10],[1966, 4.22940000000000E+10],[1967, 4.98920000000000E+10],[1968, 5.02550000000000E+10],[1969, 5.28950000000000E+10],[1970, 4.48580000000000E+10],[1971, 4.57720000000000E+10],[1972, 3.86360000000000E+10],[1973, 3.58760000000000E+10],[1974, 3.55040000000000E+10],[1975, 3.75850000000000E+10],[1976, 5.83930000000000E+10],[1977, 5.72080000000000E+10],[1978, 6.44020000000000E+10],[1979, 7.16130000000000E+10],[1980, 7.03780000000000E+10],[1981, 5.90820000000000E+10],[1982, 6.67430000000000E+10],[1983, 6.04090000000000E+10],[1984, 5.26460000000000E+10],[1985, 4.54650000000000E+10],[1986, 3.47420000000000E+10],[1987, 3.12930000000000E+10],[1988, 2.92220000000000E+10],[1989, 3.67270000000000E+10],[1990, 3.54230000000000E+10],[1991, 4.32040000000000E+10],[1992, 3.77320000000000E+10],[1993, 2.47490000000000E+10],[1994, 2.41430000000000E+10],[1995, 2.65560000000000E+10],[1996, 3.09660000000000E+10],[1997, 2.58630000000000E+10],[1998, 3.73120000000000E+10],[1999, 3.31120000000000E+10],[2000, 3.08600000000000E+10],[2001, 2.39010000000000E+10],[2002, 2.69910000000000E+10],[2003, 2.92660000000000E+10],[2004, 2.72350000000000E+10],[2005, 3.07050000000000E+10],[2006, 2.64040000000000E+10],[2007, 2.81970000000000E+10],[2008, 2.64340000000000E+10]], "y": [[1960, 3.99000000000000E+09],[1961, 5.36200000000000E+09],[1962, 6.01800000000000E+09],[1963, 5.38300000000000E+09],[1964, 4.26400000000000E+09],[1965, 3.36400000000000E+09],[1966, 3.99000000000000E+09],[1967, 4.23300000000000E+09],[1968, 5.40800000000000E+09],[1969, 6.54000000000000E+09],[1970, 6.60300000000000E+09],[1971, 7.40800000000000E+09],[1972, 9.30600000000000E+09],[1973, 1.00900000000000E+10],[1974, 1.06340000000000E+10],[1975, 1.22240000000000E+10],[1976, 1.06190000000000E+10],[1977, 9.60100000000000E+09],[1978, 6.73100000000000E+09],[1979, 8.68200000000000E+09],[1980, 7.00600000000000E+09],[1981, 5.76000000000000E+09],[1982, 5.35300000000000E+09],[1983, 4.93200000000000E+09],[1984, 3.91800000000000E+09],[1985, 3.15300000000000E+09],[1986, 2.85000000000000E+09],[1987, 2.43600000000000E+09],[1988, 2.41400000000000E+09],[1989, 2.97400000000000E+09],[1990, 3.02700000000000E+09],[1991, 3.05400000000000E+09],[1992, 3.18500000000000E+09],[1993, 3.49600000000000E+09],[1994, 3.62500000000000E+09],[1995, 3.84000000000000E+09],[1996, 4.12200000000000E+09],[1997, 4.90000000000000E+09],[1998, 4.97500000000000E+09],[1999, 7.70100000000000E+09],[2000, 1.15140000000000E+10],[2001, 1.51460000000000E+10],[2002, 1.83690000000000E+10],[2003, 1.93680000000000E+10],[2004, 2.10490000000000E+10],[2005, 2.30690000000000E+10],[2006, 2.17600000000000E+10],[2007, 2.19870000000000E+10],[2008, 2.18840000000000E+10]], "size": [[1960, 7.50590000000000E+10],[1961, 7.98840000000000E+10],[1962, 8.71540000000000E+10],[1963, 9.22600000000000E+10],[1964, 9.87410000000000E+10],[1965, 1.06118000000000E+11],[1966, 1.10813000000000E+11],[1967, 1.16886000000000E+11],[1968, 1.23276000000000E+11],[1969, 1.37480000000000E+11],[1970, 1.46822000000000E+11],[1971, 1.55849000000000E+11],[1972, 1.71201000000000E+11],[1973, 1.82508000000000E+11],[1974, 1.86847000000000E+11],[1975, 1.85294000000000E+11],[1976, 2.05857000000000E+11],[1977, 2.10450000000000E+11],[1978, 2.26145000000000E+11],[1979, 2.40469000000000E+11],[1980, 2.57308000000000E+11],[1981, 2.75630000000000E+11],[1982, 2.78468000000000E+11],[1983, 2.95359000000000E+11],[1984, 3.22653000000000E+11],[1985, 3.42554000000000E+11],[1986, 3.60573000000000E+11],[1987, 3.76442000000000E+11],[1988, 3.90232000000000E+11],[1989, 4.03534000000000E+11],[1990, 4.17206000000000E+11],[1991, 4.51682000000000E+11],[1992, 4.60078000000000E+11],[1993, 4.69734000000000E+11],[1994, 4.74678000000000E+11],[1995, 4.91068000000000E+11],[1996, 5.09263000000000E+11],[1997, 5.01062000000000E+11],[1998, 5.07342000000000E+11],[1999, 5.21346000000000E+11],[2000, 5.36054000000000E+11],[2001, 5.45711000000000E+11],[2002, 5.53874000000000E+11],[2003, 5.61767000000000E+11],[2004, 5.69078000000000E+11],[2005, 5.71497000000000E+11],[2006, 5.69328000000000E+11],[2007, 5.64354000000000E+11],[2008, 5.69510000000000E+11]] },{ "name":"Denmark", "category":"Denmark","x": [[1985, 2.72680000000000E+10],[1986, 2.84790000000000E+10],[1987, 2.76690000000000E+10],[1988, 2.55680000000000E+10],[1989, 2.04300000000000E+10],[1990, 2.35580000000000E+10],[1991, 3.34450000000000E+10],[1992, 2.69570000000000E+10],[1993, 2.93270000000000E+10],[1994, 3.32900000000000E+10],[1995, 2.73560000000000E+10],[1996, 3.96650000000000E+10],[1997, 2.87560000000000E+10],[1998, 2.36530000000000E+10],[1999, 2.00810000000000E+10],[2000, 1.66730000000000E+10],[2001, 1.78190000000000E+10],[2002, 1.82570000000000E+10],[2003, 2.53070000000000E+10],[2004, 1.86730000000000E+10],[2005, 1.54630000000000E+10],[2006, 2.45660000000000E+10],[2007, 1.98910000000000E+10],[2008, 1.74540000000000E+10]], "y": [[1985, 2.94000000000000E+08],[1986, 5.57000000000000E+08],[1987, 3.66000000000000E+08],[1988, 6.40000000000000E+08],[1989, 6.92000000000000E+08],[1990, 6.94000000000000E+08],[1991, 8.29000000000000E+08],[1992, 1.08100000000000E+09],[1993, 1.58900000000000E+09],[1994, 2.28000000000000E+09],[1995, 3.63500000000000E+09],[1996, 5.67900000000000E+09],[1997, 6.78000000000000E+09],[1998, 8.12800000000000E+09],[1999, 9.05600000000000E+09],[2000, 8.77400000000000E+09],[2001, 9.27300000000000E+09],[2002, 9.59000000000000E+09],[2003, 9.76400000000000E+09],[2004, 9.94100000000000E+09],[2005, 8.78000000000000E+09],[2006, 9.40100000000000E+09],[2007, 7.03700000000000E+09],[2008, 7.08800000000000E+09]], "size": [[1985, 2.91440000000000E+10],[1986, 3.07830000000000E+10],[1987, 2.94890000000000E+10],[1988, 2.80700000000000E+10],[1989, 2.29330000000000E+10],[1990, 2.59820000000000E+10],[1991, 3.65450000000000E+10],[1992, 3.07380000000000E+10],[1993, 3.39740000000000E+10],[1994, 4.05770000000000E+10],[1995, 3.67590000000000E+10],[1996, 5.35830000000000E+10],[1997, 4.43150000000000E+10],[1998, 4.11130000000000E+10],[1999, 3.89210000000000E+10],[2000, 3.60530000000000E+10],[2001, 3.77300000000000E+10],[2002, 3.92870000000000E+10],[2003, 4.61850000000000E+10],[2004, 4.04360000000000E+10],[2005, 3.62460000000000E+10],[2006, 4.56110000000000E+10],[2007, 3.93160000000000E+10],[2008, 3.66380000000000E+10]] },{ "name":"Latvia", "category":"Latvia","x": [[2007, 1.00000000000000E+06],[2008, 2.00000000000000E+06]], "y": [[2007, 1.92500000000000E+09],[2008, 2.05800000000000E+09]], "size": [[2007, 4.77100000000000E+09],[2008, 5.27400000000000E+09]] },{ "name":"Bangladesh", "category":"Bangladesh","x": [[2005, 5.80000000000000E+07],[2006, 3.43000000000000E+08],[2007, 2.75000000000000E+08],[2008, 6.38000000000000E+08]], "y": [[2005, 2.36290000000000E+10],[2006, 2.65070000000000E+10],[2007, 2.79760000000000E+10],[2008, 3.11060000000000E+10]], "size": [[2005, 2.65060000000000E+10],[2006, 2.98790000000000E+10],[2007, 3.12860000000000E+10],[2008, 3.49570000000000E+10]] },{ "name":"Myanmar", "category":"Myanmar","x": [[1971, 2.70000000000000E+07],[1972, 3.00000000000000E+07],[1973, 2.10000000000000E+07],[1974, 1.80000000000000E+07],[1975, 2.90000000000000E+07],[1976, 1.60000000000000E+07],[1977, 1.90000000000000E+07],[1978, 2.40000000000000E+07],[1979, 2.40000000000000E+07],[1980, 2.90000000000000E+07],[1981, 2.60000000000000E+07],[1982, 3.10000000000000E+07],[1983, 3.40000000000000E+07],[1984, 2.90000000000000E+07],[1985, 4.20000000000000E+07],[1986, 5.10000000000000E+07],[1987, 4.00000000000000E+07],[1988, 3.70000000000000E+07],[1989, 3.70000000000000E+07],[1990, 4.00000000000000E+07],[1991, 5.00000000000000E+07],[1992, 5.00000000000000E+06],[1993, 5.00000000000000E+06],[1994, 5.00000000000000E+06]], "y": [[1971, 2.70000000000000E+07],[1972, 3.80000000000000E+07],[1973, 5.40000000000000E+07],[1974, 5.10000000000000E+07],[1975, 1.08000000000000E+08],[1976, 9.70000000000000E+07],[1977, 9.90000000000000E+07],[1978, 1.06000000000000E+08],[1979, 1.58000000000000E+08],[1980, 1.96000000000000E+08],[1981, 2.03000000000000E+08],[1982, 2.37000000000000E+08],[1983, 2.86000000000000E+08],[1984, 4.75000000000000E+08],[1985, 6.58000000000000E+08],[1986, 7.99000000000000E+08],[1987, 8.09000000000000E+08],[1988, 9.54000000000000E+08],[1989, 1.02200000000000E+09],[1990, 9.74000000000000E+08],[1991, 1.04600000000000E+09],[1992, 1.16500000000000E+09],[1993, 1.40200000000000E+09],[1994, 1.81300000000000E+09]], "size": [[1971, 6.91000000000000E+08],[1972, 7.63000000000000E+08],[1973, 8.21000000000000E+08],[1974, 8.46000000000000E+08],[1975, 9.78000000000000E+08],[1976, 1.09200000000000E+09],[1977, 1.19100000000000E+09],[1978, 1.24300000000000E+09],[1979, 1.34000000000000E+09],[1980, 1.48700000000000E+09],[1981, 1.39500000000000E+09],[1982, 1.55200000000000E+09],[1983, 1.67500000000000E+09],[1984, 1.89000000000000E+09],[1985, 2.11900000000000E+09],[1986, 2.24500000000000E+09],[1987, 2.32000000000000E+09],[1988, 2.22600000000000E+09],[1989, 2.49400000000000E+09],[1990, 2.47800000000000E+09],[1991, 2.67700000000000E+09],[1992, 2.99600000000000E+09],[1993, 3.38500000000000E+09],[1994, 3.59400000000000E+09]] },{ "name":"Pakistan", "category":"Pakistan","x": [[1971, 9.20000000000000E+07],[1972, 9.20000000000000E+07],[1973, 6.60000000000000E+07],[1974, 9.40000000000000E+07],[1975, 7.50000000000000E+07],[1976, 6.40000000000000E+07],[1977, 7.80000000000000E+07],[1978, 4.30000000000000E+07],[1979, 3.60000000000000E+07],[1980, 3.00000000000000E+07],[1981, 4.30000000000000E+07],[1982, 3.00000000000000E+06],[1983, 4.20000000000000E+07],[1984, 3.40000000000000E+07],[1985, 4.70000000000000E+07],[1986, 4.00000000000000E+07],[1987, 2.50000000000000E+07],[1988, 2.70000000000000E+07],[1989, 2.40000000000000E+07],[1990, 3.80000000000000E+07],[1991, 2.70000000000000E+07],[1992, 4.40000000000000E+07],[1993, 4.50000000000000E+07],[1994, 4.00000000000000E+07],[1995, 4.40000000000000E+08],[1996, 3.75000000000000E+08],[1997, 4.06000000000000E+08],[1998, 5.01000000000000E+08],[1999, 4.10000000000000E+08],[2000, 2.41000000000000E+08],[2001, 2.85000000000000E+08],[2002, 2.31000000000000E+08],[2003, 1.98000000000000E+08],[2004, 1.75000000000000E+08],[2005, 1.29000000000000E+08],[2006, 1.36000000000000E+08],[2007, 1.36000000000000E+08],[2008, 1.13000000000000E+08]], "y": [[1971, 3.38200000000000E+09],[1972, 3.38200000000000E+09],[1973, 3.38300000000000E+09],[1974, 3.68800000000000E+09],[1975, 3.84800000000000E+09],[1976, 3.68200000000000E+09],[1977, 4.64800000000000E+09],[1978, 4.55300000000000E+09],[1979, 5.75700000000000E+09],[1980, 6.06200000000000E+09],[1981, 6.18800000000000E+09],[1982, 6.42300000000000E+09],[1983, 5.40000000000000E+09],[1984, 5.97400000000000E+09],[1985, 7.03400000000000E+09],[1986, 7.76100000000000E+09],[1987, 8.72000000000000E+09],[1988, 1.04400000000000E+10],[1989, 1.09820000000000E+10],[1990, 1.26690000000000E+10],[1991, 1.31650000000000E+10],[1992, 1.46070000000000E+10],[1993, 1.56210000000000E+10],[1994, 1.43940000000000E+10],[1995, 1.52810000000000E+10],[1996, 1.59920000000000E+10],[1997, 1.55580000000000E+10],[1998, 1.91610000000000E+10],[1999, 1.95720000000000E+10],[2000, 2.17800000000000E+10],[2001, 2.48550000000000E+10],[2002, 2.70060000000000E+10],[2003, 3.92130000000000E+10],[2004, 4.34720000000000E+10],[2005, 4.12860000000000E+10],[2006, 3.58110000000000E+10],[2007, 3.29230000000000E+10],[2008, 2.96780000000000E+10]], "size": [[1971, 7.57200000000000E+09],[1972, 7.57200000000000E+09],[1973, 8.37700000000000E+09],[1974, 9.06400000000000E+09],[1975, 9.94100000000000E+09],[1976, 1.03200000000000E+10],[1977, 1.08770000000000E+10],[1978, 1.23750000000000E+10],[1979, 1.41740000000000E+10],[1980, 1.49740000000000E+10],[1981, 1.60620000000000E+10],[1982, 1.76880000000000E+10],[1983, 1.96970000000000E+10],[1984, 2.18730000000000E+10],[1985, 2.30030000000000E+10],[1986, 2.55890000000000E+10],[1987, 2.87030000000000E+10],[1988, 3.30910000000000E+10],[1989, 3.46010000000000E+10],[1990, 3.76730000000000E+10],[1991, 4.10760000000000E+10],[1992, 4.88100000000000E+10],[1993, 5.06460000000000E+10],[1994, 5.35550000000000E+10],[1995, 5.69570000000000E+10],[1996, 5.91250000000000E+10],[1997, 6.21550000000000E+10],[1998, 6.54280000000000E+10],[1999, 6.57800000000000E+10],[2000, 6.81250000000000E+10],[2001, 7.24300000000000E+10],[2002, 7.57040000000000E+10],[2003, 8.08300000000000E+10],[2004, 8.56990000000000E+10],[2005, 9.38320000000000E+10],[2006, 9.83500000000000E+10],[2007, 9.56910000000000E+10],[2008, 9.16260000000000E+10]] },{ "name":"Uzbekistan", "category":"Uzbekistan","x": [[1990, 4.15900000000000E+09],[1991, 4.00000000000000E+09],[1992, 2.49000000000000E+09],[1993, 3.18600000000000E+09],[1994, 3.97200000000000E+09],[1995, 1.63900000000000E+09],[1996, 1.82700000000000E+09],[1997, 1.88100000000000E+09],[1998, 1.87500000000000E+09],[1999, 1.85400000000000E+09],[2000, 1.91500000000000E+09],[2001, 1.94000000000000E+09],[2002, 2.01400000000000E+09],[2003, 2.01800000000000E+09],[2004, 2.04300000000000E+09],[2005, 2.00900000000000E+09],[2006, 2.08100000000000E+09],[2007, 2.00000000000000E+09],[2008, 2.01800000000000E+09]], "y": [[1990, 4.30290000000000E+10],[1991, 3.93140000000000E+10],[1992, 3.86400000000000E+10],[1993, 3.67650000000000E+10],[1994, 3.51180000000000E+10],[1995, 3.42990000000000E+10],[1996, 3.19980000000000E+10],[1997, 3.29130000000000E+10],[1998, 3.28020000000000E+10],[1999, 3.29760000000000E+10],[2000, 3.43580000000000E+10],[2001, 3.48870000000000E+10],[2002, 3.64650000000000E+10],[2003, 3.55210000000000E+10],[2004, 3.50150000000000E+10],[2005, 3.52980000000000E+10],[2006, 3.66940000000000E+10],[2007, 3.85060000000000E+10],[2008, 3.45660000000000E+10]], "size": [[1990, 5.63250000000000E+10],[1991, 5.41650000000000E+10],[1992, 5.09110000000000E+10],[1993, 4.91490000000000E+10],[1994, 4.78000000000000E+10],[1995, 4.74530000000000E+10],[1996, 4.54190000000000E+10],[1997, 4.60540000000000E+10],[1998, 4.59000000000000E+10],[1999, 4.53720000000000E+10],[2000, 4.68640000000000E+10],[2001, 4.75000000000000E+10],[2002, 4.93100000000000E+10],[2003, 4.94000000000000E+10],[2004, 5.00000000000000E+10],[2005, 4.92000000000000E+10],[2006, 5.09200000000000E+10],[2007, 4.89500000000000E+10],[2008, 4.94000000000000E+10]] },{ "name":"Turkey", "category":"Turkey","x": [[1985, 1.50280000000000E+10],[1986, 1.94360000000000E+10],[1987, 1.76530000000000E+10],[1988, 1.24860000000000E+10],[1989, 2.02700000000000E+10],[1990, 2.01810000000000E+10],[1991, 2.15610000000000E+10],[1992, 2.45710000000000E+10],[1993, 2.37610000000000E+10],[1994, 2.82350000000000E+10],[1995, 2.80470000000000E+10],[1996, 3.04130000000000E+10],[1997, 3.38600000000000E+10],[1998, 3.56880000000000E+10],[1999, 3.70310000000000E+10],[2000, 3.81870000000000E+10],[2001, 3.84160000000000E+10],[2002, 3.21490000000000E+10],[2003, 3.22520000000000E+10],[2004, 3.44480000000000E+10],[2005, 4.31920000000000E+10],[2006, 4.66500000000000E+10],[2007, 5.34310000000000E+10],[2008, 5.77160000000000E+10]], "y": [[1985, 5.80000000000000E+07],[1986, 1.34100000000000E+09],[1987, 2.52800000000000E+09],[1988, 3.24000000000000E+09],[1989, 9.52400000000000E+09],[1990, 1.01920000000000E+10],[1991, 1.25890000000000E+10],[1992, 1.08130000000000E+10],[1993, 1.07880000000000E+10],[1994, 1.38220000000000E+10],[1995, 1.65790000000000E+10],[1996, 1.71740000000000E+10],[1997, 2.20860000000000E+10],[1998, 2.48510000000000E+10],[1999, 3.64180000000000E+10],[2000, 4.62160000000000E+10],[2001, 4.95500000000000E+10],[2002, 5.24970000000000E+10],[2003, 6.35360000000000E+10],[2004, 6.22410000000000E+10],[2005, 7.34450000000000E+10],[2006, 8.06910000000000E+10],[2007, 9.50250000000000E+10],[2008, 9.86850000000000E+10]], "size": [[1985, 3.42190000000000E+10],[1986, 3.96950000000000E+10],[1987, 4.43530000000000E+10],[1988, 4.80480000000000E+10],[1989, 5.20440000000000E+10],[1990, 5.75430000000000E+10],[1991, 6.02460000000000E+10],[1992, 6.73420000000000E+10],[1993, 7.38080000000000E+10],[1994, 7.83210000000000E+10],[1995, 8.62470000000000E+10],[1996, 9.48620000000000E+10],[1997, 1.03296000000000E+11],[1998, 1.11022000000000E+11],[1999, 1.16440000000000E+11],[2000, 1.24922000000000E+11],[2001, 1.22725000000000E+11],[2002, 1.29400000000000E+11],[2003, 1.40581000000000E+11],[2004, 1.50698000000000E+11],[2005, 1.61956000000000E+11],[2006, 1.76299000000000E+11],[2007, 1.91558000000000E+11],[2008, 1.98418000000000E+11]] },{ "name":"Sub-Saharan Africa (all income levels)", "category":"Sub-Saharan Africa (all income levels)","x": [[1971, 5.59590000000000E+10],[1972, 5.96360000000000E+10],[1973, 6.53160000000000E+10],[1974, 6.94250000000000E+10],[1975, 7.48650000000000E+10],[1976, 7.84170000000000E+10],[1977, 7.90060000000000E+10],[1978, 8.33760000000000E+10],[1979, 8.93280000000000E+10],[1980, 9.86020000000000E+10],[1981, 1.12942000000000E+11],[1982, 1.19050000000000E+11],[1983, 1.21719000000000E+11],[1984, 1.32362000000000E+11],[1985, 1.37943000000000E+11],[1986, 1.39480000000000E+11],[1987, 1.48990000000000E+11],[1988, 1.49225000000000E+11],[1989, 1.54589000000000E+11],[1990, 1.61832000000000E+11],[1991, 1.64021000000000E+11],[1992, 1.62731000000000E+11],[1993, 1.72591000000000E+11],[1994, 1.76637000000000E+11],[1995, 1.80988000000000E+11],[1996, 1.92346000000000E+11],[1997, 1.98857000000000E+11],[1998, 1.93373000000000E+11],[1999, 1.91944000000000E+11],[2000, 1.98094000000000E+11],[2001, 2.01128000000000E+11],[2002, 2.06742000000000E+11],[2003, 2.21789000000000E+11],[2004, 2.31316000000000E+11],[2005, 2.34453000000000E+11],[2006, 2.42739000000000E+11],[2007, 2.51620000000000E+11],[2008, 2.45858000000000E+11]], "y": [[1971, 1.19000000000000E+08],[1972, 2.55000000000000E+08],[1973, 3.11000000000000E+08],[1974, 1.59000000000000E+08],[1975, 5.53000000000000E+08],[1976, 7.76000000000000E+08],[1977, 1.02000000000000E+09],[1978, 1.34900000000000E+09],[1979, 2.14000000000000E+09],[1980, 3.11800000000000E+09],[1981, 4.13800000000000E+09],[1982, 4.41800000000000E+09],[1983, 5.49100000000000E+09],[1984, 4.84300000000000E+09],[1985, 5.26100000000000E+09],[1986, 4.71900000000000E+09],[1987, 5.73600000000000E+09],[1988, 5.42100000000000E+09],[1989, 6.55300000000000E+09],[1990, 7.40500000000000E+09],[1991, 6.76100000000000E+09],[1992, 6.80900000000000E+09],[1993, 7.20100000000000E+09],[1994, 8.56900000000000E+09],[1995, 7.89500000000000E+09],[1996, 9.02300000000000E+09],[1997, 9.87300000000000E+09],[1998, 1.05380000000000E+10],[1999, 1.15500000000000E+10],[2000, 1.21410000000000E+10],[2001, 1.17700000000000E+10],[2002, 1.24860000000000E+10],[2003, 1.52140000000000E+10],[2004, 1.76820000000000E+10],[2005, 1.90190000000000E+10],[2006, 2.06280000000000E+10],[2007, 2.09050000000000E+10],[2008, 2.00290000000000E+10]], "size": [[1971, 8.60609474738555E+10],[1972, 9.65864373182189E+10],[1973, 1.05115272224164E+11],[1974, 1.15026582853808E+11],[1975, 1.24238668493615E+11],[1976, 1.32134908104296E+11],[1977, 1.36653693229960E+11],[1978, 1.40178904077222E+11],[1979, 1.51672487562402E+11],[1980, 1.62196928923565E+11],[1981, 1.81532070531036E+11],[1982, 1.89206489628579E+11],[1983, 1.89558963326366E+11],[1984, 2.05262594125144E+11],[1985, 2.18284410243062E+11],[1986, 2.27310751484091E+11],[1987, 2.33834993252012E+11],[1988, 2.44380217861795E+11],[1989, 2.53506272056802E+11],[1990, 2.60471105946958E+11],[1991, 2.66183730647606E+11],[1992, 2.62574162813430E+11],[1993, 2.71093599089994E+11],[1994, 2.80707190356788E+11],[1995, 2.90689339093975E+11],[1996, 3.06010964183488E+11],[1997, 3.17307250651047E+11],[1998, 3.15129306349440E+11],[1999, 3.18458992746026E+11],[2000, 3.30293142771941E+11],[2001, 3.38523491782664E+11],[2002, 3.57002041954516E+11],[2003, 3.71613042171426E+11],[2004, 3.93565246501735E+11],[2005, 4.01485776888910E+11],[2006, 4.17383273025912E+11],[2007, 4.30769971395859E+11],[2008, 4.25129890356744E+11]] },{ "name":"Hong Kong SAR, China", "category":"Hong Kong SAR, China","x": [[1995, 2.71740000000000E+10],[1996, 2.32880000000000E+10],[1997, 1.72260000000000E+10],[1998, 2.04240000000000E+10],[1999, 1.65490000000000E+10],[2000, 1.89380000000000E+10],[2001, 1.99090000000000E+10],[2002, 2.18710000000000E+10],[2003, 2.75780000000000E+10],[2004, 2.55910000000000E+10],[2005, 2.70300000000000E+10],[2006, 2.65830000000000E+10],[2007, 2.85230000000000E+10],[2008, 2.58760000000000E+10]], "y": [[1995, 7.20000000000000E+07],[1996, 4.55600000000000E+09],[1997, 1.13530000000000E+10],[1998, 1.06320000000000E+10],[1999, 1.26610000000000E+10],[2000, 1.22400000000000E+10],[2001, 1.23680000000000E+10],[2002, 1.22700000000000E+10],[2003, 7.73000000000000E+09],[2004, 1.13040000000000E+10],[2005, 1.12700000000000E+10],[2006, 1.18870000000000E+10],[2007, 1.03160000000000E+10],[2008, 1.19800000000000E+10]], "size": [[1995, 2.79160000000000E+10],[1996, 2.84420000000000E+10],[1997, 2.89450000000000E+10],[1998, 3.14170000000000E+10],[1999, 2.94980000000000E+10],[2000, 3.13310000000000E+10],[2001, 3.24320000000000E+10],[2002, 3.43140000000000E+10],[2003, 3.55090000000000E+10],[2004, 3.71320000000000E+10],[2005, 3.84510000000000E+10],[2006, 3.86170000000000E+10],[2007, 3.89520000000000E+10],[2008, 3.79940000000000E+10]] },{ "name":"Czech Republic", "category":"Czech Republic","x": [[1971, 3.08590000000000E+10],[1972, 3.36860000000000E+10],[1973, 3.50570000000000E+10],[1974, 3.52320000000000E+10],[1975, 3.73110000000000E+10],[1976, 3.91600000000000E+10],[1977, 4.14690000000000E+10],[1978, 4.39310000000000E+10],[1979, 4.12690000000000E+10],[1980, 4.46260000000000E+10],[1981, 4.46490000000000E+10],[1982, 4.93340000000000E+10],[1983, 5.12700000000000E+10],[1984, 5.11930000000000E+10],[1985, 4.96830000000000E+10],[1986, 4.76170000000000E+10],[1987, 4.39360000000000E+10],[1988, 4.54130000000000E+10],[1989, 4.68000000000000E+10],[1990, 4.76000000000000E+10],[1991, 4.61650000000000E+10],[1992, 4.44940000000000E+10],[1993, 4.36020000000000E+10],[1994, 4.26570000000000E+10],[1995, 4.48490000000000E+10],[1996, 4.68500000000000E+10],[1997, 4.77150000000000E+10],[1998, 4.75420000000000E+10],[1999, 4.61340000000000E+10],[2000, 5.47770000000000E+10],[2001, 5.47520000000000E+10],[2002, 5.20850000000000E+10],[2003, 5.31080000000000E+10],[2004, 5.28240000000000E+10],[2005, 5.22670000000000E+10],[2006, 5.22550000000000E+10],[2007, 5.66880000000000E+10],[2008, 5.17240000000000E+10]], "y": [[1971, 3.65000000000000E+08],[1972, 5.87000000000000E+08],[1973, 3.84000000000000E+08],[1974, 4.02000000000000E+08],[1975, 2.89000000000000E+08],[1976, 5.84000000000000E+08],[1977, 6.00000000000000E+08],[1978, 6.00000000000000E+08],[1979, 6.00000000000000E+08],[1980, 6.00000000000000E+08],[1981, 6.00000000000000E+08],[1982, 6.00000000000000E+08],[1983, 6.00000000000000E+08],[1984, 6.00000000000000E+08],[1985, 6.00000000000000E+08],[1986, 6.00000000000000E+08],[1987, 6.00000000000000E+08],[1988, 6.00000000000000E+08],[1989, 6.00000000000000E+08],[1990, 3.85000000000000E+08],[1991, 3.81000000000000E+08],[1992, 3.85000000000000E+08],[1993, 3.98000000000000E+08],[1994, 3.86000000000000E+08],[1995, 4.79000000000000E+08],[1996, 1.03600000000000E+09],[1997, 1.15100000000000E+09],[1998, 1.29400000000000E+09],[1999, 1.72800000000000E+09],[2000, 1.69100000000000E+09],[2001, 1.58000000000000E+09],[2002, 1.60500000000000E+09],[2003, 1.58400000000000E+09],[2004, 1.54300000000000E+09],[2005, 1.47000000000000E+09],[2006, 1.56700000000000E+09],[2007, 1.37000000000000E+09],[2008, 1.01800000000000E+09]], "size": [[1971, 3.63720000000000E+10],[1972, 3.95790000000000E+10],[1973, 4.11740000000000E+10],[1974, 4.31400000000000E+10],[1975, 4.59080000000000E+10],[1976, 4.82290000000000E+10],[1977, 5.11940000000000E+10],[1978, 5.36650000000000E+10],[1979, 5.12490000000000E+10],[1980, 5.26560000000000E+10],[1981, 5.35770000000000E+10],[1982, 5.46470000000000E+10],[1983, 5.66510000000000E+10],[1984, 5.80240000000000E+10],[1985, 5.81210000000000E+10],[1986, 6.06060000000000E+10],[1987, 6.21960000000000E+10],[1988, 6.43340000000000E+10],[1989, 6.51310000000000E+10],[1990, 6.22710000000000E+10],[1991, 6.02980000000000E+10],[1992, 5.90570000000000E+10],[1993, 5.86540000000000E+10],[1994, 5.83890000000000E+10],[1995, 6.05750000000000E+10],[1996, 6.38230000000000E+10],[1997, 6.42170000000000E+10],[1998, 6.46240000000000E+10],[1999, 6.41590000000000E+10],[2000, 7.29110000000000E+10],[2001, 7.42340000000000E+10],[2002, 7.59950000000000E+10],[2003, 8.28160000000000E+10],[2004, 8.37900000000000E+10],[2005, 8.19310000000000E+10],[2006, 8.36540000000000E+10],[2007, 8.77640000000000E+10],[2008, 8.31660000000000E+10]] },{ "name":"Mexico", "category":"Mexico","x": [[1971, 1.60000000000000E+08],[1972, 2.23000000000000E+08],[1973, 2.07000000000000E+08],[1974, 2.23000000000000E+08],[1975, 1.95000000000000E+08],[1976, 1.80000000000000E+08],[1977, 1.89000000000000E+08],[1981, 3.30000000000000E+07],[1982, 1.27800000000000E+09],[1983, 2.42400000000000E+09],[1984, 3.13200000000000E+09],[1985, 3.85200000000000E+09],[1986, 6.33700000000000E+09],[1987, 7.28900000000000E+09],[1988, 8.03500000000000E+09],[1989, 7.89000000000000E+09],[1990, 7.77400000000000E+09],[1991, 9.21300000000000E+09],[1992, 9.51900000000000E+09],[1993, 1.15220000000000E+10],[1994, 1.42390000000000E+10],[1995, 1.54320000000000E+10],[1996, 1.84750000000000E+10],[1997, 1.83330000000000E+10],[1998, 1.86280000000000E+10],[1999, 1.91120000000000E+10],[2000, 1.94320000000000E+10],[2001, 2.36310000000000E+10],[2002, 2.65460000000000E+10],[2003, 3.12180000000000E+10],[2004, 2.42000000000000E+10],[2005, 3.30550000000000E+10],[2006, 3.19300000000000E+10],[2007, 3.17370000000000E+10],[2008, 2.13980000000000E+10]], "y": [[1971, 5.47400000000000E+09],[1972, 5.24000000000000E+09],[1973, 5.28500000000000E+09],[1974, 4.92000000000000E+09],[1975, 5.92200000000000E+09],[1976, 4.35700000000000E+09],[1977, 5.00100000000000E+09],[1981, 8.43000000000000E+09],[1982, 9.94300000000000E+09],[1983, 8.30200000000000E+09],[1984, 8.03500000000000E+09],[1985, 7.89600000000000E+09],[1986, 8.37700000000000E+09],[1987, 9.80800000000000E+09],[1988, 9.09000000000000E+09],[1989, 1.06840000000000E+10],[1990, 1.44600000000000E+10],[1991, 2.07260000000000E+10],[1992, 2.05550000000000E+10],[1993, 2.08740000000000E+10],[1994, 2.34060000000000E+10],[1995, 2.45200000000000E+10],[1996, 2.66700000000000E+10],[1997, 2.76730000000000E+10],[1998, 3.16570000000000E+10],[1999, 3.37210000000000E+10],[2000, 4.14640000000000E+10],[2001, 5.33340000000000E+10],[2002, 7.26090000000000E+10],[2003, 8.95760000000000E+10],[2004, 9.68250000000000E+10],[2005, 9.51180000000000E+10],[2006, 1.11965000000000E+11],[2007, 1.24495000000000E+11],[2008, 1.32221000000000E+11]], "size": [[1971, 3.10390000000000E+10],[1972, 3.43600000000000E+10],[1973, 3.71000000000000E+10],[1974, 4.09840000000000E+10],[1975, 4.39240000000000E+10],[1976, 4.75240000000000E+10],[1977, 5.22590000000000E+10],[1981, 7.31570000000000E+10],[1982, 8.00480000000000E+10],[1983, 8.18770000000000E+10],[1984, 8.69300000000000E+10],[1985, 9.29890000000000E+10],[1986, 9.71340000000000E+10],[1987, 1.04002000000000E+11],[1988, 1.09862000000000E+11],[1989, 1.17705000000000E+11],[1990, 1.15837000000000E+11],[1991, 1.28570000000000E+11],[1992, 1.32864000000000E+11],[1993, 1.35673000000000E+11],[1994, 1.47131000000000E+11],[1995, 1.52248000000000E+11],[1996, 1.62167000000000E+11],[1997, 1.71232000000000E+11],[1998, 1.81086000000000E+11],[1999, 1.89975000000000E+11],[2000, 2.04177000000000E+11],[2001, 2.11887000000000E+11],[2002, 2.15876000000000E+11],[2003, 2.13728000000000E+11],[2004, 2.32644000000000E+11],[2005, 2.43823000000000E+11],[2006, 2.49504000000000E+11],[2007, 2.57245000000000E+11],[2008, 2.61863000000000E+11]] },{ "name":"Canada", "category":"Canada","x": [[1960, 3.91700000000000E+09],[1961, 4.67400000000000E+09],[1962, 8.47100000000000E+09],[1963, 1.35890000000000E+10],[1964, 1.63530000000000E+10],[1965, 1.97620000000000E+10],[1966, 1.99230000000000E+10],[1967, 2.29300000000000E+10],[1968, 2.72710000000000E+10],[1969, 2.94670000000000E+10],[1970, 3.75580000000000E+10],[1971, 4.17070000000000E+10],[1972, 4.22210000000000E+10],[1973, 3.49060000000000E+10],[1974, 3.47910000000000E+10],[1975, 3.63270000000000E+10],[1976, 4.09270000000000E+10],[1977, 4.83120000000000E+10],[1978, 4.99120000000000E+10],[1979, 5.26990000000000E+10],[1980, 5.98080000000000E+10],[1981, 6.34730000000000E+10],[1982, 6.91880000000000E+10],[1983, 7.37600000000000E+10],[1984, 8.39700000000000E+10],[1985, 7.94760000000000E+10],[1986, 7.16550000000000E+10],[1987, 8.42450000000000E+10],[1988, 9.17730000000000E+10],[1989, 9.17580000000000E+10],[1990, 8.22200000000000E+10],[1991, 8.84850000000000E+10],[1992, 9.00300000000000E+10],[1993, 8.23840000000000E+10],[1994, 8.66510000000000E+10],[1995, 8.74030000000000E+10],[1996, 8.99920000000000E+10],[1997, 9.94070000000000E+10],[1998, 1.06908000000000E+11],[1999, 1.07919000000000E+11],[2000, 1.17588000000000E+11],[2001, 1.17891000000000E+11],[2002, 1.17837000000000E+11],[2003, 1.12632000000000E+11],[2004, 1.01256000000000E+11],[2005, 1.09984000000000E+11],[2006, 1.08147000000000E+11],[2007, 1.15725000000000E+11],[2008, 1.12020000000000E+11]], "y": [[1960, 4.06400000000000E+09],[1961, 4.29700000000000E+09],[1962, 4.39300000000000E+09],[1963, 4.41400000000000E+09],[1964, 4.36000000000000E+09],[1965, 5.98500000000000E+09],[1966, 6.57000000000000E+09],[1967, 6.65400000000000E+09],[1968, 7.67300000000000E+09],[1969, 5.94300000000000E+09],[1970, 6.37100000000000E+09],[1971, 6.97600000000000E+09],[1972, 9.19500000000000E+09],[1973, 1.61990000000000E+10],[1974, 1.30750000000000E+10],[1975, 1.55070000000000E+10],[1976, 1.33080000000000E+10],[1977, 1.23800000000000E+10],[1978, 1.00410000000000E+10],[1979, 1.09440000000000E+10],[1980, 9.19200000000000E+09],[1981, 8.67000000000000E+09],[1982, 9.03100000000000E+09],[1983, 8.79400000000000E+09],[1984, 6.12000000000000E+09],[1985, 6.80800000000000E+09],[1986, 6.88600000000000E+09],[1987, 6.15900000000000E+09],[1988, 9.43200000000000E+09],[1989, 1.48350000000000E+10],[1990, 9.65400000000000E+09],[1991, 8.62200000000000E+09],[1992, 1.31220000000000E+10],[1993, 1.52990000000000E+10],[1994, 1.54370000000000E+10],[1995, 2.11900000000000E+10],[1996, 1.83660000000000E+10],[1997, 2.08030000000000E+10],[1998, 2.58910000000000E+10],[1999, 2.74120000000000E+10],[2000, 3.34720000000000E+10],[2001, 3.59810000000000E+10],[2002, 3.38350000000000E+10],[2003, 3.30500000000000E+10],[2004, 3.43580000000000E+10],[2005, 3.43510000000000E+10],[2006, 3.38810000000000E+10],[2007, 4.07000000000000E+10],[2008, 4.09120000000000E+10]], "size": [[1960, 1.15966000000000E+11],[1961, 1.15295000000000E+11],[1962, 1.19328000000000E+11],[1963, 1.24477000000000E+11],[1964, 1.37500000000000E+11],[1965, 1.47203000000000E+11],[1966, 1.61282000000000E+11],[1967, 1.69103000000000E+11],[1968, 1.80503000000000E+11],[1969, 1.95424000000000E+11],[1970, 2.09512000000000E+11],[1971, 2.21833000000000E+11],[1972, 2.46127000000000E+11],[1973, 2.70081000000000E+11],[1974, 2.83515000000000E+11],[1975, 2.77080000000000E+11],[1976, 2.98220000000000E+11],[1977, 3.22026000000000E+11],[1978, 3.42907000000000E+11],[1979, 3.59110000000000E+11],[1980, 3.73278000000000E+11],[1981, 3.90460000000000E+11],[1982, 3.87349000000000E+11],[1983, 4.07830000000000E+11],[1984, 4.37010000000000E+11],[1985, 4.58910000000000E+11],[1986, 4.68480000000000E+11],[1987, 4.96250000000000E+11],[1988, 5.05840000000000E+11],[1989, 4.99472000000000E+11],[1990, 4.82041000000000E+11],[1991, 5.08461000000000E+11],[1992, 5.20279000000000E+11],[1993, 5.32117000000000E+11],[1994, 5.55673000000000E+11],[1995, 5.60005000000000E+11],[1996, 5.72929000000000E+11],[1997, 5.73600000000000E+11],[1998, 5.61649000000000E+11],[1999, 5.78945000000000E+11],[2000, 6.05596000000000E+11],[2001, 5.89780000000000E+11],[2002, 6.01158000000000E+11],[2003, 5.89542000000000E+11],[2004, 5.99865000000000E+11],[2005, 6.26033000000000E+11],[2006, 6.15856000000000E+11],[2007, 6.41991000000000E+11],[2008, 6.40940000000000E+11]] },{ "name":"Mozambique", "category":"Mozambique","x": [[1985, 1.08000000000000E+08],[1986, 7.00000000000000E+07],[1989, 9.90000000000000E+07],[1992, 4.90000000000000E+07],[1993, 1.60000000000000E+07]], "y": [[1985, 3.00000000000000E+06],[1986, 1.00000000000000E+06],[1989, 1.00000000000000E+06],[1992, 1.00000000000000E+06],[1993, 1.00000000000000E+06]], "size": [[1985, 5.50000000000000E+08],[1986, 3.10000000000000E+08],[1989, 4.72000000000000E+08],[1992, 4.16000000000000E+08],[1993, 3.92000000000000E+08]] },{ "name":"Brazil", "category":"Brazil","x": [[1990, 4.64100000000000E+09],[1991, 5.44400000000000E+09],[1992, 5.25000000000000E+09],[1993, 5.36500000000000E+09],[1994, 5.02800000000000E+09],[1995, 5.60300000000000E+09],[1996, 6.20500000000000E+09],[1997, 7.63700000000000E+09],[1998, 7.16100000000000E+09],[1999, 1.00540000000000E+10],[2000, 1.13270000000000E+10],[2001, 1.13920000000000E+10],[2002, 9.46700000000000E+09],[2003, 9.50800000000000E+09],[2004, 1.05830000000000E+10],[2005, 1.02350000000000E+10],[2006, 1.05420000000000E+10],[2007, 1.08820000000000E+10],[2008, 1.25560000000000E+10]], "y": [[1990, 6.66000000000000E+08],[1991, 7.43000000000000E+08],[1992, 3.91000000000000E+08],[1993, 3.88000000000000E+08],[1994, 4.79000000000000E+08],[1995, 5.59000000000000E+08],[1996, 1.00800000000000E+09],[1997, 1.22600000000000E+09],[1998, 1.37100000000000E+09],[1999, 2.65300000000000E+09],[2000, 4.00300000000000E+09],[2001, 1.02940000000000E+10],[2002, 1.24060000000000E+10],[2003, 1.31100000000000E+10],[2004, 1.92640000000000E+10],[2005, 1.88120000000000E+10],[2006, 1.82580000000000E+10],[2007, 1.56960000000000E+10],[2008, 2.90210000000000E+10]], "size": [[1990, 2.22820000000000E+11],[1991, 2.34366000000000E+11],[1992, 2.41730000000000E+11],[1993, 2.51973000000000E+11],[1994, 2.60041000000000E+11],[1995, 2.75601000000000E+11],[1996, 2.91281000000000E+11],[1997, 3.08100000000000E+11],[1998, 3.21948000000000E+11],[1999, 3.34716000000000E+11],[2000, 3.49153000000000E+11],[2001, 3.28208000000000E+11],[2002, 3.45988000000000E+11],[2003, 3.65290000000000E+11],[2004, 3.87859000000000E+11],[2005, 4.03423000000000E+11],[2006, 4.19895000000000E+11],[2007, 4.45763000000000E+11],[2008, 4.63369000000000E+11]] },{ "name":"Croatia", "category":"Croatia","x": [[1990, 6.25000000000000E+08],[1993, 4.54000000000000E+08],[1994, 1.00000000000000E+08],[1995, 2.42000000000000E+08],[1996, 1.20000000000000E+08],[1997, 5.11000000000000E+08],[1998, 5.38000000000000E+08],[1999, 5.16000000000000E+08],[2000, 1.55100000000000E+09],[2001, 1.63800000000000E+09],[2002, 2.10900000000000E+09],[2003, 2.40300000000000E+09],[2004, 2.13900000000000E+09],[2005, 2.32800000000000E+09],[2006, 2.25700000000000E+09],[2007, 2.42300000000000E+09],[2008, 2.49500000000000E+09]], "y": [[1990, 1.86600000000000E+09],[1993, 1.82500000000000E+09],[1994, 1.83900000000000E+09],[1995, 8.92000000000000E+08],[1996, 1.31800000000000E+09],[1997, 1.17200000000000E+09],[1998, 1.34200000000000E+09],[1999, 1.23500000000000E+09],[2000, 1.57100000000000E+09],[2001, 1.81900000000000E+09],[2002, 2.52700000000000E+09],[2003, 2.17300000000000E+09],[2004, 2.45900000000000E+09],[2005, 1.81400000000000E+09],[2006, 2.05800000000000E+09],[2007, 3.06400000000000E+09],[2008, 2.45900000000000E+09]], "size": [[1990, 9.21700000000000E+09],[1993, 9.32200000000000E+09],[1994, 8.26800000000000E+09],[1995, 8.85800000000000E+09],[1996, 1.05380000000000E+10],[1997, 9.67100000000000E+09],[1998, 1.08850000000000E+10],[1999, 1.21440000000000E+10],[2000, 1.05900000000000E+10],[2001, 1.20610000000000E+10],[2002, 1.21730000000000E+10],[2003, 1.25600000000000E+10],[2004, 1.31790000000000E+10],[2005, 1.23540000000000E+10],[2006, 1.23060000000000E+10],[2007, 1.20810000000000E+10],[2008, 1.22160000000000E+10]] },{ "name":"Romania", "category":"Romania","x": [[1971, 1.03380000000000E+10],[1972, 1.11560000000000E+10],[1973, 1.21740000000000E+10],[1974, 1.23000000000000E+10],[1975, 1.71340000000000E+10],[1976, 1.52110000000000E+10],[1977, 1.60720000000000E+10],[1978, 1.80650000000000E+10],[1979, 2.04840000000000E+10],[1980, 2.12150000000000E+10],[1981, 9.37400000000000E+09],[1982, 9.80400000000000E+09],[1983, 1.10780000000000E+10],[1984, 1.08460000000000E+10],[1985, 2.24160000000000E+10],[1986, 2.37460000000000E+10],[1987, 2.45400000000000E+10],[1988, 2.78560000000000E+10],[1989, 2.76200000000000E+10],[1990, 1.85020000000000E+10],[1991, 1.56130000000000E+10],[1992, 1.85220000000000E+10],[1993, 1.92080000000000E+10],[1994, 1.97380000000000E+10],[1995, 2.08000000000000E+10],[1996, 2.07930000000000E+10],[1997, 1.72810000000000E+10],[1998, 1.49940000000000E+10],[1999, 1.49300000000000E+10],[2000, 1.93000000000000E+10],[2001, 2.00190000000000E+10],[2002, 2.06290000000000E+10],[2003, 2.36430000000000E+10],[2004, 2.17730000000000E+10],[2005, 2.21380000000000E+10],[2006, 2.52680000000000E+10],[2007, 2.53050000000000E+10],[2008, 2.58820000000000E+10]], "y": [[1971, 2.18410000000000E+10],[1972, 2.14260000000000E+10],[1973, 2.25880000000000E+10],[1974, 2.29780000000000E+10],[1975, 2.52990000000000E+10],[1976, 2.62730000000000E+10],[1977, 2.30850000000000E+10],[1978, 2.10700000000000E+10],[1979, 1.87410000000000E+10],[1980, 2.71320000000000E+10],[1981, 3.50000000000000E+10],[1982, 3.60000000000000E+10],[1983, 3.70000000000000E+10],[1984, 3.80000000000000E+10],[1985, 2.99320000000000E+10],[1986, 3.07200000000000E+10],[1987, 2.90050000000000E+10],[1988, 2.59910000000000E+10],[1989, 2.62690000000000E+10],[1990, 2.25730000000000E+10],[1991, 2.04680000000000E+10],[1992, 1.94700000000000E+10],[1993, 1.79970000000000E+10],[1994, 1.65660000000000E+10],[1995, 1.59710000000000E+10],[1996, 1.67130000000000E+10],[1997, 1.00840000000000E+10],[1998, 1.01650000000000E+10],[1999, 8.43700000000000E+09],[2000, 9.00100000000000E+09],[2001, 8.07300000000000E+09],[2002, 8.96600000000000E+09],[2003, 9.69600000000000E+09],[2004, 1.04620000000000E+10],[2005, 9.61200000000000E+09],[2006, 1.18310000000000E+10],[2007, 1.15590000000000E+10],[2008, 9.92400000000000E+09]], "size": [[1971, 3.94540000000000E+10],[1972, 4.34390000000000E+10],[1973, 4.67790000000000E+10],[1974, 4.90620000000000E+10],[1975, 5.37210000000000E+10],[1976, 5.82660000000000E+10],[1977, 5.98580000000000E+10],[1978, 6.42550000000000E+10],[1979, 6.49330000000000E+10],[1980, 6.74860000000000E+10],[1981, 7.01380000000000E+10],[1982, 6.89220000000000E+10],[1983, 7.02600000000000E+10],[1984, 7.16670000000000E+10],[1985, 7.18180000000000E+10],[1986, 7.54780000000000E+10],[1987, 7.40770000000000E+10],[1988, 7.53220000000000E+10],[1989, 7.58510000000000E+10],[1990, 6.43090000000000E+10],[1991, 5.68030000000000E+10],[1992, 5.41950000000000E+10],[1993, 5.54760000000000E+10],[1994, 5.51360000000000E+10],[1995, 5.92660000000000E+10],[1996, 6.13500000000000E+10],[1997, 5.71480000000000E+10],[1998, 5.34960000000000E+10],[1999, 5.07100000000000E+10],[2000, 5.19340000000000E+10],[2001, 5.38660000000000E+10],[2002, 5.47350000000000E+10],[2003, 5.51400000000000E+10],[2004, 5.64990000000000E+10],[2005, 5.94130000000000E+10],[2006, 6.26970000000000E+10],[2007, 6.16730000000000E+10],[2008, 6.49560000000000E+10]] },{ "name":"Sweden", "category":"Sweden","x": [[1985, 1.97900000000000E+09],[1986, 2.20500000000000E+09],[1987, 2.11700000000000E+09],[1988, 2.03500000000000E+09],[1989, 1.51100000000000E+09],[1990, 1.53300000000000E+09],[1991, 2.45100000000000E+09],[1992, 2.55900000000000E+09],[1993, 2.77800000000000E+09],[1994, 3.14500000000000E+09],[1995, 2.94000000000000E+09],[1996, 4.31200000000000E+09],[1997, 2.74300000000000E+09],[1998, 2.99100000000000E+09],[1999, 3.14100000000000E+09],[2000, 2.46600000000000E+09],[2001, 3.19900000000000E+09],[2002, 3.63300000000000E+09],[2003, 4.16500000000000E+09],[2004, 1.82100000000000E+09],[2005, 1.40500000000000E+09],[2006, 1.53700000000000E+09],[2007, 1.35000000000000E+09],[2008, 1.61900000000000E+09]], "y": [[1985, 4.00000000000000E+07],[1986, 7.00000000000000E+07],[1987, 1.08000000000000E+08],[1988, 1.41000000000000E+08],[1989, 2.17000000000000E+08],[1990, 3.95000000000000E+08],[1991, 5.05000000000000E+08],[1992, 6.54000000000000E+08],[1993, 8.37000000000000E+08],[1994, 7.22000000000000E+08],[1995, 6.67000000000000E+08],[1996, 5.74000000000000E+08],[1997, 6.10000000000000E+08],[1998, 4.31000000000000E+08],[1999, 3.98000000000000E+08],[2000, 4.62000000000000E+08],[2001, 3.61000000000000E+08],[2002, 5.10000000000000E+08],[2003, 7.00000000000000E+08],[2004, 7.49000000000000E+08],[2005, 5.85000000000000E+08],[2006, 5.82000000000000E+08],[2007, 8.24000000000000E+08],[2008, 6.03000000000000E+08]], "size": [[1985, 1.36539000000000E+11],[1986, 1.38084000000000E+11],[1987, 1.45977000000000E+11],[1988, 1.45641000000000E+11],[1989, 1.42916000000000E+11],[1990, 1.45984000000000E+11],[1991, 1.46970000000000E+11],[1992, 1.45936000000000E+11],[1993, 1.45247000000000E+11],[1994, 1.42700000000000E+11],[1995, 1.48293000000000E+11],[1996, 1.40627000000000E+11],[1997, 1.49206000000000E+11],[1998, 1.58791000000000E+11],[1999, 1.54838000000000E+11],[2000, 1.45231000000000E+11],[2001, 1.61595000000000E+11],[2002, 1.46700000000000E+11],[2003, 1.35379000000000E+11],[2004, 1.51673000000000E+11],[2005, 1.58365000000000E+11],[2006, 1.43286000000000E+11],[2007, 1.48823000000000E+11],[2008, 1.49894000000000E+11]] },{ "name":"Serbia", "category":"Serbia","x": [[1990, 2.82780000000000E+10],[1991, 2.49060000000000E+10],[1992, 2.39320000000000E+10],[1993, 2.12290000000000E+10],[1994, 2.13540000000000E+10],[1995, 2.16810000000000E+10],[1996, 1.99000000000000E+10],[1997, 2.35600000000000E+10],[1998, 2.40790000000000E+10],[1999, 1.89600000000000E+10],[2000, 2.14330000000000E+10],[2001, 2.18590000000000E+10],[2002, 2.25590000000000E+10],[2003, 2.47100000000000E+10],[2004, 2.57360000000000E+10],[2005, 2.34420000000000E+10],[2006, 2.50730000000000E+10],[2007, 2.56040000000000E+10],[2008, 2.66800000000000E+10]], "y": [[1990, 1.31500000000000E+09],[1991, 1.31500000000000E+09],[1992, 5.92000000000000E+08],[1993, 3.69000000000000E+08],[1994, 3.08000000000000E+08],[1995, 3.54000000000000E+08],[1996, 5.10000000000000E+08],[1997, 5.64000000000000E+08],[1998, 5.25000000000000E+08],[1999, 3.58000000000000E+08],[2000, 3.92000000000000E+08],[2001, 5.00000000000000E+08],[2002, 5.03000000000000E+08],[2003, 5.37000000000000E+08],[2004, 6.82000000000000E+08],[2005, 3.17000000000000E+08],[2006, 1.18000000000000E+08],[2007, 4.03000000000000E+08],[2008, 4.15000000000000E+08]], "size": [[1990, 4.09480000000000E+10],[1991, 3.95100000000000E+10],[1992, 3.64880000000000E+10],[1993, 3.24000000000000E+10],[1994, 3.24000000000000E+10],[1995, 3.44760000000000E+10],[1996, 3.52390000000000E+10],[1997, 3.74550000000000E+10],[1998, 3.78080000000000E+10],[1999, 3.34100000000000E+10],[2000, 3.41400000000000E+10],[2001, 3.51300000000000E+10],[2002, 3.50600000000000E+10],[2003, 3.53660000000000E+10],[2004, 3.76860000000000E+10],[2005, 3.64740000000000E+10],[2006, 3.64810000000000E+10],[2007, 3.65500000000000E+10],[2008, 3.68310000000000E+10]] },{ "name":"United States", "category":"United States","x": [[1960, 4.31123000000000E+11],[1961, 4.51459000000000E+11],[1962, 4.81401000000000E+11],[1963, 5.28474000000000E+11],[1964, 5.62718000000000E+11],[1965, 6.10827000000000E+11],[1966, 6.55728000000000E+11],[1967, 6.73964000000000E+11],[1968, 7.32786000000000E+11],[1969, 7.55279000000000E+11],[1970, 7.53280000000000E+11],[1971, 7.62910000000000E+11],[1972, 8.24970000000000E+11],[1973, 9.07360000000000E+11],[1974, 8.64682000000000E+11],[1975, 8.90852000000000E+11],[1976, 9.87113000000000E+11],[1977, 1.02945200000000E+12],[1978, 1.01935200000000E+12],[1979, 1.12479100000000E+12],[1980, 1.24287100000000E+12],[1981, 1.28742700000000E+12],[1982, 1.27576800000000E+12],[1983, 1.34796600000000E+12],[1984, 1.43649200000000E+12],[1985, 1.50027700000000E+12],[1986, 1.48283900000000E+12],[1987, 1.56624600000000E+12],[1988, 1.64849900000000E+12],[1989, 1.69268800000000E+12],[1990, 1.69964800000000E+12],[1991, 1.71210800000000E+12],[1992, 1.74126600000000E+12],[1993, 1.81111600000000E+12],[1994, 1.81277100000000E+12],[1995, 1.83253700000000E+12],[1996, 1.92501000000000E+12],[1997, 1.97600500000000E+12],[1998, 2.00631000000000E+12],[1999, 2.01881300000000E+12],[2000, 2.12949800000000E+12],[2001, 1.98212000000000E+12],[2002, 2.03966500000000E+12],[2003, 2.08332600000000E+12],[2004, 2.09049500000000E+12],[2005, 2.15395600000000E+12],[2006, 2.12779600000000E+12],[2007, 2.11845500000000E+12],[2008, 2.13259600000000E+12]], "y": [[1960, 1.69060000000000E+11],[1961, 1.80830000000000E+11],[1962, 1.96880000000000E+11],[1963, 2.16140000000000E+11],[1964, 2.35400000000000E+11],[1965, 2.37540000000000E+11],[1966, 2.68570000000000E+11],[1967, 2.83550000000000E+11],[1968, 3.25280000000000E+11],[1969, 3.56310000000000E+11],[1970, 3.99110000000000E+11],[1971, 4.00180000000000E+11],[1972, 4.02320000000000E+11],[1973, 3.64870000000000E+11],[1974, 3.42469000000000E+11],[1975, 3.20762000000000E+11],[1976, 3.15247000000000E+11],[1977, 3.26890000000000E+11],[1978, 3.26768000000000E+11],[1979, 3.52428000000000E+11],[1980, 3.70463000000000E+11],[1981, 3.69981000000000E+11],[1982, 3.26628000000000E+11],[1983, 2.93285000000000E+11],[1984, 3.18212000000000E+11],[1985, 3.12382000000000E+11],[1986, 2.65904000000000E+11],[1987, 2.91704000000000E+11],[1988, 2.70497000000000E+11],[1989, 3.71432000000000E+11],[1990, 3.81669000000000E+11],[1991, 4.02230000000000E+11],[1992, 4.26908000000000E+11],[1993, 4.41000000000000E+11],[1994, 4.92096000000000E+11],[1995, 5.28844000000000E+11],[1996, 4.78765000000000E+11],[1997, 5.05647000000000E+11],[1998, 5.58449000000000E+11],[1999, 5.81933000000000E+11],[2000, 6.34290000000000E+11],[2001, 6.59914000000000E+11],[2002, 7.12432000000000E+11],[2003, 6.70192000000000E+11],[2004, 7.31552000000000E+11],[2005, 7.82829000000000E+11],[2006, 8.42774000000000E+11],[2007, 9.15196000000000E+11],[2008, 9.10176000000000E+11]], "size": [[1960, 7.99679000000000E+11],[1961, 8.40228000000000E+11],[1962, 9.04036000000000E+11],[1963, 9.71637000000000E+11],[1964, 1.04177400000000E+12],[1965, 1.11811500000000E+12],[1966, 1.21206800000000E+12],[1967, 1.28508400000000E+12],[1968, 1.40760000000000E+12],[1969, 1.52745100000000E+12],[1970, 1.62389100000000E+12],[1971, 1.70338000000000E+12],[1972, 1.85110900000000E+12],[1973, 1.96550900000000E+12],[1974, 1.95733500000000E+12],[1975, 2.01116000000000E+12],[1976, 2.13795700000000E+12],[1977, 2.23245400000000E+12],[1978, 2.31644200000000E+12],[1979, 2.35966300000000E+12],[1980, 2.42732000000000E+12],[1981, 2.43702400000000E+12],[1982, 2.37663500000000E+12],[1983, 2.44904000000000E+12],[1984, 2.56277300000000E+12],[1985, 2.62192900000000E+12],[1986, 2.63972400000000E+12],[1987, 2.71718700000000E+12],[1988, 2.85804200000000E+12],[1989, 3.12788600000000E+12],[1990, 3.20281300000000E+12],[1991, 3.25489000000000E+12],[1992, 3.27059700000000E+12],[1993, 3.39152000000000E+12],[1994, 3.45183000000000E+12],[1995, 3.55837400000000E+12],[1996, 3.65124400000000E+12],[1997, 3.67222000000000E+12],[1998, 3.80450400000000E+12],[1999, 3.87363800000000E+12],[2000, 4.02588500000000E+12],[2001, 3.83883100000000E+12],[2002, 4.02639900000000E+12],[2003, 4.05464900000000E+12],[2004, 4.14808000000000E+12],[2005, 4.26888700000000E+12],[2006, 4.27501100000000E+12],[2007, 4.32391400000000E+12],[2008, 4.34297900000000E+12]] },{ "name":"Estonia", "category":"Estonia","x": [[1990, 1.49950000000000E+10],[1991, 1.26440000000000E+10],[1992, 1.07210000000000E+10],[1993, 8.22200000000000E+09],[1994, 8.72800000000000E+09],[1995, 8.40300000000000E+09],[1996, 8.82100000000000E+09],[1997, 8.85400000000000E+09],[1998, 8.03600000000000E+09],[1999, 7.72300000000000E+09],[2000, 7.82000000000000E+09],[2001, 7.81600000000000E+09],[2002, 8.00000000000000E+09],[2003, 9.60800000000000E+09],[2004, 9.69800000000000E+09],[2005, 9.50400000000000E+09],[2006, 9.01800000000000E+09],[2007, 1.16450000000000E+10],[2008, 9.90900000000000E+09]], "y": [[1990, 9.57000000000000E+08],[1991, 9.71000000000000E+08],[1992, 2.87000000000000E+08],[1993, 1.30000000000000E+08],[1994, 2.20000000000000E+08],[1995, 2.64000000000000E+08],[1996, 2.94000000000000E+08],[1997, 2.58000000000000E+08],[1998, 2.66000000000000E+08],[1999, 2.29000000000000E+08],[2000, 5.96000000000000E+08],[2001, 5.99000000000000E+08],[2002, 5.29000000000000E+08],[2003, 5.04000000000000E+08],[2004, 4.87000000000000E+08],[2005, 5.44000000000000E+08],[2006, 5.39000000000000E+08],[2007, 3.44000000000000E+08],[2008, 4.23000000000000E+08]], "size": [[1990, 1.73920000000000E+10],[1991, 1.48860000000000E+10],[1992, 1.15380000000000E+10],[1993, 8.97300000000000E+09],[1994, 9.09600000000000E+09],[1995, 8.78800000000000E+09],[1996, 9.23400000000000E+09],[1997, 9.31200000000000E+09],[1998, 8.59400000000000E+09],[1999, 8.28100000000000E+09],[2000, 8.50900000000000E+09],[2001, 8.49300000000000E+09],[2002, 8.60600000000000E+09],[2003, 1.02200000000000E+10],[2004, 1.03040000000000E+10],[2005, 1.02050000000000E+10],[2006, 9.73200000000000E+09],[2007, 1.21900000000000E+10],[2008, 1.05810000000000E+10]] },{ "name":"Nigeria", "category":"Nigeria","x": [[1972, 1.00000000000000E+06],[1974, 5.20000000000000E+07],[1975, 5.10000000000000E+07],[1976, 5.50000000000000E+07],[1977, 5.50000000000000E+07],[1983, 4.00000000000000E+06],[1984, 7.00000000000000E+06],[1985, 4.00000000000000E+06],[1986, 6.00000000000000E+06],[1987, 6.00000000000000E+06],[1988, 1.10000000000000E+07],[1989, 1.10000000000000E+07],[1990, 1.30000000000000E+07],[1991, 1.30000000000000E+07],[1992, 1.40000000000000E+07]], "y": [[1972, 2.47000000000000E+08],[1974, 1.50000000000000E+08],[1975, 5.45000000000000E+08],[1976, 7.68000000000000E+08],[1977, 1.01500000000000E+09],[1983, 5.49100000000000E+09],[1984, 4.84300000000000E+09],[1985, 5.25800000000000E+09],[1986, 4.71800000000000E+09],[1987, 5.73500000000000E+09],[1988, 5.39500000000000E+09],[1989, 6.42200000000000E+09],[1990, 7.22300000000000E+09],[1991, 6.57800000000000E+09],[1992, 6.62800000000000E+09]], "size": [[1972, 2.23700000000000E+09],[1974, 2.28700000000000E+09],[1975, 3.46400000000000E+09],[1976, 4.10600000000000E+09],[1977, 4.71300000000000E+09],[1983, 8.71300000000000E+09],[1984, 8.98400000000000E+09],[1985, 1.02210000000000E+10],[1986, 1.07660000000000E+10],[1987, 1.12650000000000E+10],[1988, 1.16540000000000E+10],[1989, 1.28130000000000E+10],[1990, 1.34630000000000E+10],[1991, 1.41670000000000E+10],[1992, 1.48340000000000E+10]] },{ "name":"Spain", "category":"Spain","x": [[1969, 1.02020000000000E+10],[1970, 1.22280000000000E+10],[1971, 1.33870000000000E+10],[1972, 1.56490000000000E+10],[1973, 1.42760000000000E+10],[1974, 1.29380000000000E+10],[1975, 1.70080000000000E+10],[1976, 1.59440000000000E+10],[1977, 1.83080000000000E+10],[1978, 2.03930000000000E+10],[1979, 2.32540000000000E+10],[1980, 3.27760000000000E+10],[1981, 3.80040000000000E+10],[1982, 4.47460000000000E+10],[1983, 4.92290000000000E+10],[1984, 4.94260000000000E+10],[1985, 5.54140000000000E+10],[1986, 5.54330000000000E+10],[1987, 5.54570000000000E+10],[1988, 4.38970000000000E+10],[1989, 6.05390000000000E+10],[1990, 6.06630000000000E+10],[1991, 5.97150000000000E+10],[1992, 6.51400000000000E+10],[1993, 6.33880000000000E+10],[1994, 6.26130000000000E+10],[1995, 6.70790000000000E+10],[1996, 5.46700000000000E+10],[1997, 6.39760000000000E+10],[1998, 6.31660000000000E+10],[1999, 7.54360000000000E+10],[2000, 8.08580000000000E+10],[2001, 7.17340000000000E+10],[2002, 8.24570000000000E+10],[2003, 7.59550000000000E+10],[2004, 8.03230000000000E+10],[2005, 8.07670000000000E+10],[2006, 6.79780000000000E+10],[2007, 7.40850000000000E+10],[2008, 4.99730000000000E+10]], "y": [[1969, 1.00000000000000E+07],[1970, 3.00000000000000E+06],[1971, 1.12000000000000E+08],[1972, 1.93000000000000E+08],[1973, 7.61000000000000E+08],[1974, 4.43000000000000E+08],[1975, 6.04000000000000E+08],[1976, 1.56800000000000E+09],[1977, 9.18000000000000E+08],[1978, 8.39000000000000E+08],[1979, 1.53000000000000E+09],[1980, 2.91300000000000E+09],[1981, 3.66000000000000E+09],[1982, 3.86000000000000E+09],[1983, 3.48700000000000E+09],[1984, 2.06400000000000E+09],[1985, 2.51400000000000E+09],[1986, 2.11800000000000E+09],[1987, 1.49600000000000E+09],[1988, 1.36500000000000E+09],[1989, 1.39800000000000E+09],[1990, 1.50900000000000E+09],[1991, 1.36100000000000E+09],[1992, 1.71100000000000E+09],[1993, 1.19600000000000E+09],[1994, 3.22900000000000E+09],[1995, 3.75000000000000E+09],[1996, 6.76700000000000E+09],[1997, 1.81740000000000E+10],[1998, 1.62120000000000E+10],[1999, 1.90580000000000E+10],[2000, 2.01780000000000E+10],[2001, 2.33580000000000E+10],[2002, 3.23860000000000E+10],[2003, 3.93680000000000E+10],[2004, 5.54600000000000E+10],[2005, 7.90110000000000E+10],[2006, 9.05700000000000E+10],[2007, 9.47990000000000E+10],[2008, 1.20798000000000E+11]], "size": [[1969, 5.20360000000000E+10],[1970, 5.63030000000000E+10],[1971, 6.15850000000000E+10],[1972, 6.79150000000000E+10],[1973, 7.56600000000000E+10],[1974, 8.00760000000000E+10],[1975, 8.20980000000000E+10],[1976, 8.92450000000000E+10],[1977, 9.26890000000000E+10],[1978, 9.82880000000000E+10],[1979, 1.04703000000000E+11],[1980, 1.09226000000000E+11],[1981, 1.09996000000000E+11],[1982, 1.13506000000000E+11],[1983, 1.15378000000000E+11],[1984, 1.18106000000000E+11],[1985, 1.25617000000000E+11],[1986, 1.28228000000000E+11],[1987, 1.32606000000000E+11],[1988, 1.38584000000000E+11],[1989, 1.47200000000000E+11],[1990, 1.51150000000000E+11],[1991, 1.54786000000000E+11],[1992, 1.56704000000000E+11],[1993, 1.55396000000000E+11],[1994, 1.60846000000000E+11],[1995, 1.65628000000000E+11],[1996, 1.73381000000000E+11],[1997, 1.89172000000000E+11],[1998, 1.93408000000000E+11],[1999, 2.05877000000000E+11],[2000, 2.22235000000000E+11],[2001, 2.33206000000000E+11],[2002, 2.41613000000000E+11],[2003, 2.57884000000000E+11],[2004, 2.77244000000000E+11],[2005, 2.88924000000000E+11],[2006, 2.95513000000000E+11],[2007, 3.01763000000000E+11],[2008, 3.11146000000000E+11]] },{ "name":"Ireland", "category":"Ireland","x": [[1979, 7.10000000000000E+07],[1980, 7.30000000000000E+07],[1981, 4.30000000000000E+07],[1982, 6.30000000000000E+07],[1983, 7.40000000000000E+07],[1984, 7.40000000000000E+07],[1985, 1.06000000000000E+08],[1986, 1.82800000000000E+09],[1987, 5.05700000000000E+09],[1988, 5.29100000000000E+09],[1989, 5.94400000000000E+09],[1990, 5.91800000000000E+09],[1991, 5.85300000000000E+09],[1992, 6.65800000000000E+09],[1993, 6.61800000000000E+09],[1994, 6.68400000000000E+09],[1995, 7.01800000000000E+09],[1996, 6.99200000000000E+09],[1997, 6.78700000000000E+09],[1998, 6.74000000000000E+09],[1999, 5.83200000000000E+09],[2000, 6.81700000000000E+09],[2001, 7.06200000000000E+09],[2002, 6.82100000000000E+09],[2003, 6.20300000000000E+09],[2004, 6.22900000000000E+09],[2005, 6.38900000000000E+09],[2006, 5.88400000000000E+09],[2007, 5.49900000000000E+09],[2008, 5.14700000000000E+09]], "y": [[1979, 7.81000000000000E+08],[1980, 1.61000000000000E+09],[1981, 3.39900000000000E+09],[1982, 4.95500000000000E+09],[1983, 5.67700000000000E+09],[1984, 6.01900000000000E+09],[1985, 5.96000000000000E+09],[1986, 2.76700000000000E+09],[1987, 2.30900000000000E+09],[1988, 3.52800000000000E+09],[1989, 4.17300000000000E+09],[1990, 3.94100000000000E+09],[1991, 3.75200000000000E+09],[1992, 3.64800000000000E+09],[1993, 4.53500000000000E+09],[1994, 4.45600000000000E+09],[1995, 5.16000000000000E+09],[1996, 6.29100000000000E+09],[1997, 6.56900000000000E+09],[1998, 6.42500000000000E+09],[1999, 6.95800000000000E+09],[2000, 9.26300000000000E+09],[2001, 9.14700000000000E+09],[2002, 1.08290000000000E+10],[2003, 1.30380000000000E+10],[2004, 1.28940000000000E+10],[2005, 1.15740000000000E+10],[2006, 1.39070000000000E+10],[2007, 1.54630000000000E+10],[2008, 1.67220000000000E+10]], "size": [[1979, 1.06400000000000E+10],[1980, 1.05660000000000E+10],[1981, 1.05290000000000E+10],[1982, 1.05300000000000E+10],[1983, 1.07840000000000E+10],[1984, 1.12360000000000E+10],[1985, 1.17410000000000E+10],[1986, 1.23070000000000E+10],[1987, 1.26290000000000E+10],[1988, 1.28950000000000E+10],[1989, 1.35340000000000E+10],[1990, 1.42290000000000E+10],[1991, 1.49300000000000E+10],[1992, 1.57800000000000E+10],[1993, 1.61490000000000E+10],[1994, 1.68280000000000E+10],[1995, 1.76040000000000E+10],[1996, 1.89200000000000E+10],[1997, 1.96890000000000E+10],[1998, 2.08780000000000E+10],[1999, 2.17650000000000E+10],[2000, 2.36730000000000E+10],[2001, 2.46320000000000E+10],[2002, 2.48430000000000E+10],[2003, 2.48610000000000E+10],[2004, 2.52150000000000E+10],[2005, 2.56260000000000E+10],[2006, 2.71160000000000E+10],[2007, 2.78740000000000E+10],[2008, 2.98590000000000E+10]] },{ "name":"Sub-Saharan Africa (developing only)", "category":"Sub-Saharan Africa (developing only)","x": [[1971, 5.59590000000000E+10],[1972, 5.96360000000000E+10],[1973, 6.53160000000000E+10],[1974, 6.94250000000000E+10],[1975, 7.48650000000000E+10],[1976, 7.84170000000000E+10],[1977, 7.90060000000000E+10],[1978, 8.33760000000000E+10],[1979, 8.93280000000000E+10],[1980, 9.86020000000000E+10],[1981, 1.12942000000000E+11],[1982, 1.19050000000000E+11],[1983, 1.21719000000000E+11],[1984, 1.32362000000000E+11],[1985, 1.37943000000000E+11],[1986, 1.39480000000000E+11],[1987, 1.48990000000000E+11],[1988, 1.49225000000000E+11],[1989, 1.54589000000000E+11],[1990, 1.61832000000000E+11],[1991, 1.64021000000000E+11],[1992, 1.62731000000000E+11],[1993, 1.72591000000000E+11],[1994, 1.76637000000000E+11],[1995, 1.80988000000000E+11],[1996, 1.92346000000000E+11],[1997, 1.98857000000000E+11],[1998, 1.93373000000000E+11],[1999, 1.91944000000000E+11],[2000, 1.98094000000000E+11],[2001, 2.01128000000000E+11],[2002, 2.06742000000000E+11],[2003, 2.21789000000000E+11],[2004, 2.31316000000000E+11],[2005, 2.34453000000000E+11],[2006, 2.42739000000000E+11],[2007, 2.51620000000000E+11],[2008, 2.45858000000000E+11]], "y": [[1971, 1.19000000000000E+08],[1972, 2.55000000000000E+08],[1973, 3.11000000000000E+08],[1974, 1.59000000000000E+08],[1975, 5.53000000000000E+08],[1976, 7.76000000000000E+08],[1977, 1.02000000000000E+09],[1978, 1.34900000000000E+09],[1979, 2.14000000000000E+09],[1980, 3.11800000000000E+09],[1981, 4.13800000000000E+09],[1982, 4.41800000000000E+09],[1983, 5.49100000000000E+09],[1984, 4.84300000000000E+09],[1985, 5.26100000000000E+09],[1986, 4.71900000000000E+09],[1987, 5.73600000000000E+09],[1988, 5.42100000000000E+09],[1989, 6.55300000000000E+09],[1990, 7.40500000000000E+09],[1991, 6.76100000000000E+09],[1992, 6.80900000000000E+09],[1993, 7.20100000000000E+09],[1994, 8.56900000000000E+09],[1995, 7.89500000000000E+09],[1996, 9.02300000000000E+09],[1997, 9.87300000000000E+09],[1998, 1.05380000000000E+10],[1999, 1.15500000000000E+10],[2000, 1.21410000000000E+10],[2001, 1.17700000000000E+10],[2002, 1.24860000000000E+10],[2003, 1.52140000000000E+10],[2004, 1.76820000000000E+10],[2005, 1.90190000000000E+10],[2006, 2.06280000000000E+10],[2007, 2.09050000000000E+10],[2008, 2.00290000000000E+10]], "size": [[1971, 8.59728159789199E+10],[1972, 9.64875270998072E+10],[1973, 1.05007627974902E+11],[1974, 1.14908788836872E+11],[1975, 1.24111440756708E+11],[1976, 1.31999594151496E+11],[1977, 1.36513751774209E+11],[1978, 1.40035352597284E+11],[1979, 1.51517165973901E+11],[1980, 1.62030829685298E+11],[1981, 1.81346170965388E+11],[1982, 1.89012731004349E+11],[1983, 1.89364843748244E+11],[1984, 2.05052393101270E+11],[1985, 2.18060874110118E+11],[1986, 2.27077971844414E+11],[1987, 2.33595532403295E+11],[1988, 2.44129958080035E+11],[1989, 2.53246666656354E+11],[1990, 2.60204368145104E+11],[1991, 2.65911142780541E+11],[1992, 2.62305271357091E+11],[1993, 2.70815983227555E+11],[1994, 2.80419729608894E+11],[1995, 2.90391656036001E+11],[1996, 3.05697590876177E+11],[1997, 3.16982309278977E+11],[1998, 3.14806595321015E+11],[1999, 3.18132871922003E+11],[2000, 3.29954903079096E+11],[2001, 3.38176823726161E+11],[2002, 3.56636450770872E+11],[2003, 3.71232488460301E+11],[2004, 3.93162212436378E+11],[2005, 4.01074631732469E+11],[2006, 4.16955847894158E+11],[2007, 4.30328837494051E+11],[2008, 4.24694532231152E+11]] },{ "name":"Russian Federation", "category":"Russian Federation","x": [[1990, 1.55153000000000E+11],[1991, 1.52985000000000E+11],[1992, 1.51078000000000E+11],[1993, 1.47553000000000E+11],[1994, 1.60936000000000E+11],[1995, 1.59043000000000E+11],[1996, 1.59357000000000E+11],[1997, 1.55850000000000E+11],[1998, 1.61111000000000E+11],[1999, 1.60152000000000E+11],[2000, 1.74225000000000E+11],[2001, 1.67926000000000E+11],[2002, 1.69327000000000E+11],[2003, 1.71367000000000E+11],[2004, 1.59908000000000E+11],[2005, 1.64519000000000E+11],[2006, 1.77889000000000E+11],[2007, 1.69128000000000E+11],[2008, 1.96286000000000E+11]], "y": [[1990, 5.12194000000000E+11],[1991, 5.01645000000000E+11],[1992, 4.60670000000000E+11],[1993, 4.29745000000000E+11],[1994, 3.64316000000000E+11],[1995, 3.54056000000000E+11],[1996, 3.64724000000000E+11],[1997, 3.57403000000000E+11],[1998, 3.45520000000000E+11],[1999, 3.58633000000000E+11],[2000, 3.70372000000000E+11],[2001, 3.76744000000000E+11],[2002, 3.84744000000000E+11],[2003, 4.06758000000000E+11],[2004, 4.22437000000000E+11],[2005, 4.39312000000000E+11],[2006, 4.57749000000000E+11],[2007, 4.86713000000000E+11],[2008, 4.94716000000000E+11]], "size": [[1990, 1.08215200000000E+12],[1991, 1.06816300000000E+12],[1992, 1.00845000000000E+12],[1993, 9.55702000000000E+11],[1994, 8.74881000000000E+11],[1995, 8.59026000000000E+11],[1996, 8.46166000000000E+11],[1997, 8.33174000000000E+11],[1998, 8.26189000000000E+11],[1999, 8.45347000000000E+11],[2000, 8.76468000000000E+11],[2001, 8.89333000000000E+11],[2002, 8.89312000000000E+11],[2003, 9.14328000000000E+11],[2004, 9.29905000000000E+11],[2005, 9.51159000000000E+11],[2006, 9.93865000000000E+11],[2007, 1.01339900000000E+12],[2008, 1.03843100000000E+12]] },{ "name":"Israel", "category":"Israel","x": [[1995, 1.90230000000000E+10],[1996, 2.25430000000000E+10],[1997, 2.49730000000000E+10],[1998, 2.66020000000000E+10],[1999, 2.63780000000000E+10],[2000, 2.93520000000000E+10],[2001, 3.30420000000000E+10],[2002, 3.52270000000000E+10],[2003, 3.62150000000000E+10],[2004, 3.66110000000000E+10],[2005, 3.62820000000000E+10],[2006, 3.58350000000000E+10],[2007, 3.74020000000000E+10],[2008, 3.53780000000000E+10]], "y": [[1995, 1.50000000000000E+07],[1996, 1.90000000000000E+07],[1997, 2.00000000000000E+07],[1998, 1.60000000000000E+07],[1999, 2.00000000000000E+07],[2000, 1.30000000000000E+07],[2001, 1.30000000000000E+07],[2002, 2.80000000000000E+07],[2003, 2.50000000000000E+07],[2004, 4.34100000000000E+09],[2005, 5.62700000000000E+09],[2006, 9.08500000000000E+09],[2007, 1.05690000000000E+10],[2008, 1.53820000000000E+10]], "size": [[1995, 3.04250000000000E+10],[1996, 3.25310000000000E+10],[1997, 3.51000000000000E+10],[1998, 3.79550000000000E+10],[1999, 3.92150000000000E+10],[2000, 4.26610000000000E+10],[2001, 4.39510000000000E+10],[2002, 4.55000000000000E+10],[2003, 4.70410000000000E+10],[2004, 4.72790000000000E+10],[2005, 4.86020000000000E+10],[2006, 5.05580000000000E+10],[2007, 5.37920000000000E+10],[2008, 5.69950000000000E+10]] },{ "name":"Colombia", "category":"Colombia","x": [[1971, 1.30200000000000E+09],[1972, 1.29700000000000E+09],[1973, 1.41600000000000E+09],[1974, 1.54800000000000E+09],[1975, 1.35700000000000E+09],[1976, 1.55500000000000E+09],[1977, 1.57100000000000E+09],[1978, 1.60700000000000E+09],[1979, 1.55900000000000E+09],[1980, 1.60000000000000E+09],[1981, 1.69800000000000E+09],[1982, 1.83700000000000E+09],[1983, 1.56600000000000E+09],[1984, 2.43900000000000E+09],[1985, 3.12100000000000E+09],[1986, 2.99800000000000E+09],[1987, 3.03400000000000E+09],[1988, 3.22800000000000E+09],[1989, 3.49100000000000E+09],[1990, 3.68600000000000E+09],[1991, 3.78600000000000E+09],[1992, 4.62200000000000E+09],[1993, 4.31600000000000E+09],[1994, 3.50400000000000E+09],[1995, 4.23100000000000E+09],[1996, 1.90000000000000E+09],[1997, 3.08800000000000E+09],[1998, 2.69900000000000E+09],[1999, 1.97500000000000E+09],[2000, 2.22100000000000E+09],[2001, 2.38300000000000E+09],[2002, 2.33000000000000E+09],[2003, 2.94800000000000E+09],[2004, 2.01900000000000E+09],[2005, 2.49100000000000E+09],[2006, 2.95000000000000E+09],[2007, 3.49300000000000E+09],[2008, 3.04500000000000E+09]], "y": [[1971, 9.44000000000000E+08],[1972, 1.02600000000000E+09],[1973, 1.01100000000000E+09],[1974, 9.91000000000000E+08],[1975, 2.25500000000000E+09],[1976, 2.49700000000000E+09],[1977, 2.76100000000000E+09],[1978, 3.17800000000000E+09],[1979, 3.60200000000000E+09],[1980, 3.94200000000000E+09],[1981, 4.09300000000000E+09],[1982, 4.66400000000000E+09],[1983, 5.58100000000000E+09],[1984, 5.25000000000000E+09],[1985, 4.82100000000000E+09],[1986, 4.60500000000000E+09],[1987, 4.74300000000000E+09],[1988, 4.75800000000000E+09],[1989, 4.23500000000000E+09],[1990, 4.49900000000000E+09],[1991, 4.78600000000000E+09],[1992, 4.94100000000000E+09],[1993, 5.44500000000000E+09],[1994, 4.94700000000000E+09],[1995, 5.55200000000000E+09],[1996, 5.24100000000000E+09],[1997, 9.30500000000000E+09],[1998, 1.07240000000000E+10],[1999, 6.55100000000000E+09],[2000, 8.25300000000000E+09],[2001, 8.68500000000000E+09],[2002, 8.18100000000000E+09],[2003, 6.82600000000000E+09],[2004, 7.01300000000000E+09],[2005, 7.39900000000000E+09],[2006, 7.39500000000000E+09],[2007, 6.59100000000000E+09],[2008, 5.78100000000000E+09]], "size": [[1971, 1.02000000000000E+10],[1972, 1.04990000000000E+10],[1973, 1.15960000000000E+10],[1974, 1.29030000000000E+10],[1975, 1.29720000000000E+10],[1976, 1.37410000000000E+10],[1977, 1.52930000000000E+10],[1978, 1.73630000000000E+10],[1979, 1.90050000000000E+10],[1980, 2.04460000000000E+10],[1981, 2.07770000000000E+10],[1982, 2.21820000000000E+10],[1983, 2.29050000000000E+10],[1984, 2.52940000000000E+10],[1985, 2.68270000000000E+10],[1986, 2.94300000000000E+10],[1987, 3.14970000000000E+10],[1988, 3.30120000000000E+10],[1989, 3.49700000000000E+10],[1990, 3.63570000000000E+10],[1991, 3.69900000000000E+10],[1992, 3.29440000000000E+10],[1993, 3.85590000000000E+10],[1994, 4.14090000000000E+10],[1995, 4.27160000000000E+10],[1996, 4.34330000000000E+10],[1997, 4.46740000000000E+10],[1998, 4.49640000000000E+10],[1999, 4.28880000000000E+10],[2000, 4.31990000000000E+10],[2001, 4.35170000000000E+10],[2002, 4.51170000000000E+10],[2003, 4.66130000000000E+10],[2004, 4.97950000000000E+10],[2005, 5.04110000000000E+10],[2006, 5.38520000000000E+10],[2007, 5.53140000000000E+10],[2008, 5.60240000000000E+10]] },{ "name":"Switzerland", "category":"Switzerland","x": [[1978, 2.50000000000000E+07],[1979, 4.70000000000000E+07],[1980, 6.50000000000000E+07],[1981, 8.30000000000000E+07],[1982, 8.30000000000000E+07],[1983, 7.40000000000000E+07],[1984, 9.40000000000000E+07],[1985, 1.02000000000000E+08],[1986, 7.90000000000000E+07],[1987, 3.70000000000000E+07],[1988, 3.10000000000000E+07],[1989, 5.00000000000000E+07],[1990, 4.00000000000000E+07],[1991, 9.00000000000000E+06],[1992, 9.00000000000000E+06],[1993, 1.00000000000000E+06],[1994, 1.00000000000000E+06],[1995, 1.00000000000000E+06]], "y": [[1978, 2.23000000000000E+08],[1979, 4.01000000000000E+08],[1980, 2.94000000000000E+08],[1981, 2.12000000000000E+08],[1982, 2.37000000000000E+08],[1983, 2.44000000000000E+08],[1984, 2.24000000000000E+08],[1985, 2.13000000000000E+08],[1986, 2.24000000000000E+08],[1987, 2.67000000000000E+08],[1988, 2.63000000000000E+08],[1989, 2.64000000000000E+08],[1990, 3.31000000000000E+08],[1991, 4.11000000000000E+08],[1992, 4.91000000000000E+08],[1993, 5.53000000000000E+08],[1994, 6.28000000000000E+08],[1995, 7.23000000000000E+08]], "size": [[1978, 4.22500000000000E+10],[1979, 4.54650000000000E+10],[1980, 4.81750000000000E+10],[1981, 5.18340000000000E+10],[1982, 5.25080000000000E+10],[1983, 5.21950000000000E+10],[1984, 4.95550000000000E+10],[1985, 5.55370000000000E+10],[1986, 5.65410000000000E+10],[1987, 5.87950000000000E+10],[1988, 5.96780000000000E+10],[1989, 5.37490000000000E+10],[1990, 5.49940000000000E+10],[1991, 5.68860000000000E+10],[1992, 5.83110000000000E+10],[1993, 6.08610000000000E+10],[1994, 6.54230000000000E+10],[1995, 6.22470000000000E+10]] },{ "name":"Vietnam", "category":"Vietnam","x": [[1981, 1.41700000000000E+09],[1982, 1.50100000000000E+09],[1983, 1.57900000000000E+09],[1984, 2.01600000000000E+09],[1985, 2.30400000000000E+09],[1986, 2.65700000000000E+09],[1987, 3.06500000000000E+09],[1988, 3.44000000000000E+09],[1989, 2.72600000000000E+09],[1990, 2.00100000000000E+09],[1991, 1.36600000000000E+09],[1992, 8.51000000000000E+08],[1993, 6.37000000000000E+08],[1994, 1.07100000000000E+09],[1995, 2.02300000000000E+09],[1996, 2.37600000000000E+09],[1997, 3.32500000000000E+09],[1998, 3.48000000000000E+09],[1999, 2.91500000000000E+09],[2000, 3.13500000000000E+09],[2001, 3.21800000000000E+09],[2002, 4.87800000000000E+09],[2003, 7.23700000000000E+09],[2004, 7.03900000000000E+09],[2005, 8.67600000000000E+09],[2006, 1.43130000000000E+10],[2007, 1.48390000000000E+10],[2008, 1.51720000000000E+10]], "y": [[1981, 1.60000000000000E+07],[1982, 3.60000000000000E+07],[1983, 1.22000000000000E+08],[1984, 1.13000000000000E+08],[1985, 7.20000000000000E+07],[1986, 6.60000000000000E+07],[1987, 6.60000000000000E+07],[1988, 6.40000000000000E+07],[1989, 3.80000000000000E+07],[1990, 6.00000000000000E+06],[1991, 3.50000000000000E+07],[1992, 6.00000000000000E+06],[1993, 1.40000000000000E+07],[1994, 4.00000000000000E+06],[1995, 7.48000000000000E+08],[1996, 1.09700000000000E+09],[1997, 1.97300000000000E+09],[1998, 3.43700000000000E+09],[1999, 3.59600000000000E+09],[2000, 4.35600000000000E+09],[2001, 4.42300000000000E+09],[2002, 8.33400000000000E+09],[2003, 1.20440000000000E+10],[2004, 1.96400000000000E+10],[2005, 2.18390000000000E+10],[2006, 2.44690000000000E+10],[2007, 2.58910000000000E+10],[2008, 2.91640000000000E+10]], "size": [[1981, 3.69400000000000E+09],[1982, 3.93600000000000E+09],[1983, 3.98600000000000E+09],[1984, 4.77800000000000E+09],[1985, 5.06900000000000E+09],[1986, 5.52700000000000E+09],[1987, 6.05100000000000E+09],[1988, 6.78500000000000E+09],[1989, 7.78400000000000E+09],[1990, 8.68100000000000E+09],[1991, 9.21000000000000E+09],[1992, 9.70500000000000E+09],[1993, 1.06620000000000E+10],[1994, 1.22880000000000E+10],[1995, 1.46480000000000E+10],[1996, 1.69440000000000E+10],[1997, 1.91320000000000E+10],[1998, 2.16880000000000E+10],[1999, 2.35590000000000E+10],[2000, 2.65610000000000E+10],[2001, 3.06080000000000E+10],[2002, 3.57960000000000E+10],[2003, 4.09250000000000E+10],[2004, 4.60290000000000E+10],[2005, 5.34620000000000E+10],[2006, 6.04930000000000E+10],[2007, 6.68570000000000E+10],[2008, 7.30490000000000E+10]] },{ "name":"Macedonia, FYR", "category":"Macedonia, FYR","x": [[1998, 5.90600000000000E+09],[1999, 5.43600000000000E+09],[2000, 5.20900000000000E+09],[2001, 5.56800000000000E+09],[2002, 5.11900000000000E+09],[2003, 5.34100000000000E+09],[2004, 5.16000000000000E+09],[2005, 5.43600000000000E+09],[2006, 5.10800000000000E+09]], "y": [[1998, 1.00000000000000E+06],[1999, 4.00000000000000E+06],[2000, 1.00000000000000E+06],[2001, 1.00000000000000E+06],[2002, 1.00000000000000E+06],[2003, 1.00000000000000E+06],[2004, 1.00000000000000E+06],[2005, 1.00000000000000E+06],[2006, 1.00000000000000E+06]], "size": [[1998, 7.04800000000000E+09],[1999, 6.86300000000000E+09],[2000, 6.81100000000000E+09],[2001, 6.36200000000000E+09],[2002, 6.09100000000000E+09],[2003, 6.73800000000000E+09],[2004, 6.66700000000000E+09],[2005, 6.94500000000000E+09],[2006, 7.00900000000000E+09]] },{ "name":"Malaysia", "category":"Malaysia","x": [[1988, 2.46000000000000E+08],[1989, 2.09100000000000E+09],[1990, 2.82300000000000E+09],[1991, 3.34500000000000E+09],[1992, 3.36200000000000E+09],[1993, 3.32400000000000E+09],[1994, 3.21200000000000E+09],[1995, 3.32400000000000E+09],[1996, 3.29900000000000E+09],[1997, 3.06300000000000E+09],[1998, 3.17600000000000E+09],[1999, 4.62800000000000E+09],[2000, 4.56000000000000E+09],[2001, 7.69100000000000E+09],[2002, 8.87500000000000E+09],[2003, 1.12620000000000E+10],[2004, 1.70520000000000E+10],[2005, 1.99890000000000E+10],[2006, 2.15110000000000E+10],[2007, 2.70060000000000E+10],[2008, 2.61770000000000E+10]], "y": [[1988, 3.76100000000000E+09],[1989, 4.06700000000000E+09],[1990, 4.70400000000000E+09],[1991, 8.34200000000000E+09],[1992, 1.14260000000000E+10],[1993, 1.62880000000000E+10],[1994, 1.98500000000000E+10],[1995, 2.55530000000000E+10],[1996, 3.08410000000000E+10],[1997, 3.65470000000000E+10],[1998, 4.28100000000000E+10],[1999, 4.81420000000000E+10],[2000, 5.39610000000000E+10],[2001, 5.32300000000000E+10],[2002, 5.21830000000000E+10],[2003, 5.84800000000000E+10],[2004, 5.66180000000000E+10],[2005, 5.71660000000000E+10],[2006, 5.87390000000000E+10],[2007, 6.17970000000000E+10],[2008, 6.19100000000000E+10]], "size": [[1988, 1.93490000000000E+10],[1989, 2.05340000000000E+10],[1990, 2.30120000000000E+10],[1991, 2.65470000000000E+10],[1992, 2.93140000000000E+10],[1993, 3.47330000000000E+10],[1994, 3.90930000000000E+10],[1995, 4.54530000000000E+10],[1996, 5.14070000000000E+10],[1997, 5.78720000000000E+10],[1998, 6.07010000000000E+10],[1999, 6.52210000000000E+10],[2000, 6.92440000000000E+10],[2001, 7.14190000000000E+10],[2002, 7.42330000000000E+10],[2003, 7.84650000000000E+10],[2004, 8.19630000000000E+10],[2005, 8.48260000000000E+10],[2006, 8.98260000000000E+10],[2007, 9.75140000000000E+10],[2008, 9.73910000000000E+10]] },{ "name":"Peru", "category":"Peru","x": [[2000, 3.47000000000000E+08],[2001, 3.10000000000000E+08],[2002, 7.84000000000000E+08],[2003, 7.67000000000000E+08],[2004, 9.16000000000000E+08],[2005, 8.04000000000000E+08],[2006, 8.16000000000000E+08],[2007, 8.45000000000000E+08],[2008, 8.77000000000000E+08]], "y": [[2000, 7.88000000000000E+08],[2001, 8.74000000000000E+08],[2002, 1.09500000000000E+09],[2003, 1.31700000000000E+09],[2004, 2.33300000000000E+09],[2005, 4.54900000000000E+09],[2006, 4.82700000000000E+09],[2007, 8.22400000000000E+09],[2008, 1.01110000000000E+10]], "size": [[2000, 1.99140000000000E+10],[2001, 2.07780000000000E+10],[2002, 2.19830000000000E+10],[2003, 2.29240000000000E+10],[2004, 2.42550000000000E+10],[2005, 2.54990000000000E+10],[2006, 2.73580000000000E+10],[2007, 2.99310000000000E+10],[2008, 3.24300000000000E+10]] },{ "name":"Australia", "category":"Australia","x": [[1962, 1.85530000000000E+10],[1963, 1.96790000000000E+10],[1964, 2.21220000000000E+10],[1965, 2.36730000000000E+10],[1966, 2.72560000000000E+10],[1967, 2.94520000000000E+10],[1968, 3.20400000000000E+10],[1969, 3.47250000000000E+10],[1970, 3.75130000000000E+10],[1971, 3.76790000000000E+10],[1972, 3.99790000000000E+10],[1973, 4.82330000000000E+10],[1974, 4.71790000000000E+10],[1975, 5.06390000000000E+10],[1976, 5.22250000000000E+10],[1977, 5.97450000000000E+10],[1978, 6.06980000000000E+10],[1979, 6.32750000000000E+10],[1980, 6.97620000000000E+10],[1981, 7.27090000000000E+10],[1982, 7.42040000000000E+10],[1983, 7.71680000000000E+10],[1984, 8.16300000000000E+10],[1985, 8.93740000000000E+10],[1986, 9.28570000000000E+10],[1987, 1.00668000000000E+11],[1988, 1.06103000000000E+11],[1989, 1.13665000000000E+11],[1990, 1.21478000000000E+11],[1991, 1.25778000000000E+11],[1992, 1.29112000000000E+11],[1993, 1.31300000000000E+11],[1994, 1.35608000000000E+11],[1995, 1.38523000000000E+11],[1996, 1.45663000000000E+11],[1997, 1.51491000000000E+11],[1998, 1.63816000000000E+11],[1999, 1.68499000000000E+11],[2000, 1.74245000000000E+11],[2001, 1.86788000000000E+11],[2002, 1.75328000000000E+11],[2003, 1.75883000000000E+11],[2004, 1.84270000000000E+11],[2005, 1.92910000000000E+11],[2006, 1.94341000000000E+11],[2007, 1.97635000000000E+11],[2008, 2.00835000000000E+11]], "y": [[1962, 3.00000000000000E+06],[1963, 5.00000000000000E+06],[1964, 7.00000000000000E+06],[1965, 7.00000000000000E+06],[1966, 8.00000000000000E+06],[1967, 8.00000000000000E+06],[1968, 7.00000000000000E+06],[1969, 9.00000000000000E+06],[1970, 4.28000000000000E+08],[1971, 1.73400000000000E+09],[1972, 1.93500000000000E+09],[1973, 2.75100000000000E+09],[1974, 3.63200000000000E+09],[1975, 2.94400000000000E+09],[1976, 3.55500000000000E+09],[1977, 4.12600000000000E+09],[1978, 5.48100000000000E+09],[1979, 6.23300000000000E+09],[1980, 6.97600000000000E+09],[1981, 9.50800000000000E+09],[1982, 1.01710000000000E+10],[1983, 9.99600000000000E+09],[1984, 1.17910000000000E+10],[1985, 1.15010000000000E+10],[1986, 1.37840000000000E+10],[1987, 1.39890000000000E+10],[1988, 1.47180000000000E+10],[1989, 1.51280000000000E+10],[1990, 1.43590000000000E+10],[1991, 1.07720000000000E+10],[1992, 1.16330000000000E+10],[1993, 1.22950000000000E+10],[1994, 1.21990000000000E+10],[1995, 1.49130000000000E+10],[1996, 1.24450000000000E+10],[1997, 1.14260000000000E+10],[1998, 1.29340000000000E+10],[1999, 1.60010000000000E+10],[2000, 1.62450000000000E+10],[2001, 1.72710000000000E+10],[2002, 3.17300000000000E+10],[2003, 2.99950000000000E+10],[2004, 3.19060000000000E+10],[2005, 3.22610000000000E+10],[2006, 3.07990000000000E+10],[2007, 3.20440000000000E+10],[2008, 3.55220000000000E+10]], "size": [[1962, 2.45490000000000E+10],[1963, 2.73860000000000E+10],[1964, 3.04260000000000E+10],[1965, 3.34610000000000E+10],[1966, 3.59760000000000E+10],[1967, 3.89230000000000E+10],[1968, 4.17620000000000E+10],[1969, 4.56070000000000E+10],[1970, 4.93810000000000E+10],[1971, 5.30450000000000E+10],[1972, 5.55830000000000E+10],[1973, 6.44110000000000E+10],[1974, 6.96030000000000E+10],[1975, 7.35790000000000E+10],[1976, 7.63920000000000E+10],[1977, 8.24870000000000E+10],[1978, 8.57940000000000E+10],[1979, 9.06430000000000E+10],[1980, 9.52340000000000E+10],[1981, 1.02208000000000E+11],[1982, 1.04413000000000E+11],[1983, 1.05517000000000E+11],[1984, 1.11504000000000E+11],[1985, 1.19660000000000E+11],[1986, 1.25374000000000E+11],[1987, 1.31523000000000E+11],[1988, 1.38294000000000E+11],[1989, 1.47082000000000E+11],[1990, 1.54287000000000E+11],[1991, 1.56536000000000E+11],[1992, 1.59137000000000E+11],[1993, 1.63238000000000E+11],[1994, 1.67172000000000E+11],[1995, 1.72808000000000E+11],[1996, 1.77279000000000E+11],[1997, 1.82604000000000E+11],[1998, 1.95025000000000E+11],[1999, 2.03631000000000E+11],[2000, 2.09870000000000E+11],[2001, 2.24271000000000E+11],[2002, 2.27386000000000E+11],[2003, 2.26253000000000E+11],[2004, 2.36296000000000E+11],[2005, 2.45216000000000E+11],[2006, 2.47012000000000E+11],[2007, 2.50816000000000E+11],[2008, 2.57098000000000E+11]] },{ "name":"Korea, Rep.", "category":"Korea, Rep.","x": [[1986, 1.74200000000000E+10],[1987, 1.45560000000000E+10],[1988, 1.86400000000000E+10],[1989, 1.76770000000000E+10],[1990, 1.76610000000000E+10],[1991, 1.63400000000000E+10],[1992, 1.72780000000000E+10],[1993, 3.12910000000000E+10],[1994, 4.19570000000000E+10],[1995, 4.93120000000000E+10],[1996, 5.74000000000000E+10],[1997, 6.92950000000000E+10],[1998, 8.03220000000000E+10],[1999, 8.45310000000000E+10],[2000, 1.11395000000000E+11],[2001, 1.23427000000000E+11],[2002, 1.33838000000000E+11],[2003, 1.34222000000000E+11],[2004, 1.42263000000000E+11],[2005, 1.48791000000000E+11],[2006, 1.52914000000000E+11],[2007, 1.70704000000000E+11],[2008, 1.91761000000000E+11]], "y": [[1986, 2.50000000000000E+08],[1987, 8.39100000000000E+09],[1988, 1.04320000000000E+10],[1989, 9.14500000000000E+09],[1990, 9.60400000000000E+09],[1991, 9.93500000000000E+09],[1992, 1.21870000000000E+10],[1993, 1.44880000000000E+10],[1994, 1.84270000000000E+10],[1995, 1.95070000000000E+10],[1996, 2.70500000000000E+10],[1997, 3.18230000000000E+10],[1998, 2.71570000000000E+10],[1999, 2.96680000000000E+10],[2000, 2.94610000000000E+10],[2001, 3.36150000000000E+10],[2002, 4.17740000000000E+10],[2003, 4.24920000000000E+10],[2004, 5.93990000000000E+10],[2005, 6.21540000000000E+10],[2006, 7.26560000000000E+10],[2007, 8.23600000000000E+10],[2008, 8.13320000000000E+10]], "size": [[1986, 6.38950000000000E+10],[1987, 7.26920000000000E+10],[1988, 8.42620000000000E+10],[1989, 9.36950000000000E+10],[1990, 1.05371000000000E+11],[1991, 1.13255000000000E+11],[1992, 1.24404000000000E+11],[1993, 1.43035000000000E+11],[1994, 1.61764000000000E+11],[1995, 1.81139000000000E+11],[1996, 2.02605000000000E+11],[1997, 2.22114000000000E+11],[1998, 2.16069000000000E+11],[1999, 2.35596000000000E+11],[2000, 2.88526000000000E+11],[2001, 3.09137000000000E+11],[2002, 3.29804000000000E+11],[2003, 3.43191000000000E+11],[2004, 3.66612000000000E+11],[2005, 3.87874000000000E+11],[2006, 4.02270000000000E+11],[2007, 4.25905000000000E+11],[2008, 4.43935000000000E+11]] },{ "name":"Iran, Islamic Rep.", "category":"Iran, Islamic Rep.","x": [[1999, 4.17000000000000E+08],[2000, 4.84000000000000E+08],[2001, 4.72000000000000E+08],[2002, 5.16000000000000E+08],[2003, 4.72000000000000E+08],[2004, 4.76000000000000E+08],[2005, 5.71000000000000E+08],[2006, 5.64000000000000E+08],[2007, 5.75000000000000E+08],[2008, 3.90000000000000E+08]], "y": [[1999, 7.36400000000000E+10],[2000, 7.61710000000000E+10],[2001, 8.32460000000000E+10],[2002, 9.19670000000000E+10],[2003, 1.00926000000000E+11],[2004, 1.08979000000000E+11],[2005, 1.15883000000000E+11],[2006, 1.16435000000000E+11],[2007, 1.22238000000000E+11],[2008, 1.43561000000000E+11]], "size": [[1999, 1.12657000000000E+11],[2000, 1.21383000000000E+11],[2001, 1.30199000000000E+11],[2002, 1.41081000000000E+11],[2003, 1.53879000000000E+11],[2004, 1.66916000000000E+11],[2005, 1.75698000000000E+11],[2006, 1.87195000000000E+11],[2007, 1.95685000000000E+11],[2008, 1.99043000000000E+11]] },{ "name":"Netherlands", "category":"Netherlands","x": [[1960, 1.31620000000000E+10],[1961, 1.39590000000000E+10],[1962, 1.46980000000000E+10],[1963, 1.45150000000000E+10],[1964, 1.37220000000000E+10],[1965, 1.32990000000000E+10],[1966, 1.38580000000000E+10],[1967, 1.56050000000000E+10],[1968, 1.56790000000000E+10],[1969, 1.19610000000000E+10],[1970, 8.09300000000000E+09],[1971, 5.58700000000000E+09],[1972, 3.66800000000000E+09],[1973, 3.17800000000000E+09],[1974, 2.96500000000000E+09],[1975, 2.21800000000000E+09],[1976, 4.87100000000000E+09],[1977, 6.16700000000000E+09],[1978, 7.04600000000000E+09],[1979, 5.57300000000000E+09],[1980, 8.87400000000000E+09],[1981, 1.04250000000000E+10],[1982, 1.45720000000000E+10],[1983, 1.54850000000000E+10],[1984, 1.69480000000000E+10],[1985, 1.71330000000000E+10],[1986, 1.74270000000000E+10],[1987, 1.92070000000000E+10],[1988, 2.48590000000000E+10],[1989, 2.48340000000000E+10],[1990, 2.75200000000000E+10],[1991, 2.52420000000000E+10],[1992, 2.52160000000000E+10],[1993, 2.42480000000000E+10],[1994, 2.73630000000000E+10],[1995, 3.00220000000000E+10],[1996, 2.84530000000000E+10],[1997, 2.73620000000000E+10],[1998, 2.95720000000000E+10],[1999, 2.50640000000000E+10],[2000, 2.71100000000000E+10],[2001, 2.85180000000000E+10],[2002, 2.89850000000000E+10],[2003, 2.97380000000000E+10],[2004, 2.81330000000000E+10],[2005, 2.69260000000000E+10],[2006, 2.65060000000000E+10],[2007, 2.84620000000000E+10],[2008, 2.67970000000000E+10]], "y": [[1960, 1.46000000000000E+08],[1961, 1.50000000000000E+08],[1962, 1.51000000000000E+08],[1963, 1.48000000000000E+08],[1964, 1.56000000000000E+08],[1965, 1.56000000000000E+08],[1966, 1.02500000000000E+09],[1967, 2.77700000000000E+09],[1968, 5.47600000000000E+09],[1969, 1.03650000000000E+10],[1970, 1.90760000000000E+10],[1971, 2.71370000000000E+10],[1972, 3.53860000000000E+10],[1973, 4.18530000000000E+10],[1974, 4.45970000000000E+10],[1975, 4.35960000000000E+10],[1976, 4.39440000000000E+10],[1977, 4.31550000000000E+10],[1978, 3.88640000000000E+10],[1979, 3.24670000000000E+10],[1980, 2.58090000000000E+10],[1981, 2.33520000000000E+10],[1982, 2.70600000000000E+10],[1983, 3.46980000000000E+10],[1984, 3.87380000000000E+10],[1985, 3.82130000000000E+10],[1986, 4.15020000000000E+10],[1987, 4.12920000000000E+10],[1988, 3.64280000000000E+10],[1989, 3.99300000000000E+10],[1990, 3.66050000000000E+10],[1991, 4.10950000000000E+10],[1992, 4.34100000000000E+10],[1993, 4.39870000000000E+10],[1994, 4.33890000000000E+10],[1995, 4.17390000000000E+10],[1996, 4.69640000000000E+10],[1997, 5.08420000000000E+10],[1998, 5.10700000000000E+10],[1999, 5.11600000000000E+10],[2000, 5.15250000000000E+10],[2001, 5.37770000000000E+10],[2002, 5.52450000000000E+10],[2003, 5.50320000000000E+10],[2004, 6.12210000000000E+10],[2005, 5.79000000000000E+10],[2006, 5.67070000000000E+10],[2007, 6.10130000000000E+10],[2008, 6.34700000000000E+10]], "size": [[1960, 1.65160000000000E+10],[1961, 1.76240000000000E+10],[1962, 1.92550000000000E+10],[1963, 2.09840000000000E+10],[1964, 2.29750000000000E+10],[1965, 2.50100000000000E+10],[1966, 2.78690000000000E+10],[1967, 3.00560000000000E+10],[1968, 3.36190000000000E+10],[1969, 3.71440000000000E+10],[1970, 4.08580000000000E+10],[1971, 4.49040000000000E+10],[1972, 4.95510000000000E+10],[1973, 5.26270000000000E+10],[1974, 5.47610000000000E+10],[1975, 5.42580000000000E+10],[1976, 5.81370000000000E+10],[1977, 5.82860000000000E+10],[1978, 6.15960000000000E+10],[1979, 6.44640000000000E+10],[1980, 6.48060000000000E+10],[1981, 6.40530000000000E+10],[1982, 6.03120000000000E+10],[1983, 5.96500000000000E+10],[1984, 6.27780000000000E+10],[1985, 6.29470000000000E+10],[1986, 6.71580000000000E+10],[1987, 6.84190000000000E+10],[1988, 6.96110000000000E+10],[1989, 7.30500000000000E+10],[1990, 7.19380000000000E+10],[1991, 7.44190000000000E+10],[1992, 7.70950000000000E+10],[1993, 7.68510000000000E+10],[1994, 7.96030000000000E+10],[1995, 8.09260000000000E+10],[1996, 8.53120000000000E+10],[1997, 8.67030000000000E+10],[1998, 9.11160000000000E+10],[1999, 8.67210000000000E+10],[2000, 8.96310000000000E+10],[2001, 9.36670000000000E+10],[2002, 9.59420000000000E+10],[2003, 9.68290000000000E+10],[2004, 1.02440000000000E+11],[2005, 1.00219000000000E+11],[2006, 9.83930000000000E+10],[2007, 1.05162000000000E+11],[2008, 1.07645000000000E+11]] },{ "name":"China", "category":"China","x": [[1980, 1.64149000000000E+11],[1981, 1.67482000000000E+11],[1982, 1.82282000000000E+11],[1983, 1.96869000000000E+11],[1984, 2.23954000000000E+11],[1985, 2.63914000000000E+11],[1986, 3.02717000000000E+11],[1987, 3.43030000000000E+11],[1988, 3.77138000000000E+11],[1989, 4.08395000000000E+11],[1990, 4.42764000000000E+11],[1991, 4.99432000000000E+11],[1992, 5.66892000000000E+11],[1993, 6.17071000000000E+11],[1994, 6.95532000000000E+11],[1995, 7.44477000000000E+11],[1996, 8.24009000000000E+11],[1997, 8.67489000000000E+11],[1998, 8.83712000000000E+11],[1999, 9.64380000000000E+11],[2000, 1.06214400000000E+12],[2001, 1.12205100000000E+12],[2002, 1.27137100000000E+12],[2003, 1.51551000000000E+12],[2004, 1.71376100000000E+12],[2005, 1.97174700000000E+12],[2006, 2.30100600000000E+12],[2007, 2.65574800000000E+12],[2008, 2.73328400000000E+12]], "y": [[1980, 6.88000000000000E+08],[1981, 5.65000000000000E+08],[1982, 6.98000000000000E+08],[1983, 6.40000000000000E+08],[1984, 9.09000000000000E+08],[1985, 9.64000000000000E+08],[1986, 1.67700000000000E+09],[1987, 2.71200000000000E+09],[1988, 2.03400000000000E+09],[1989, 3.67600000000000E+09],[1990, 2.76300000000000E+09],[1991, 2.42300000000000E+09],[1992, 2.46000000000000E+09],[1993, 3.11500000000000E+09],[1994, 3.14600000000000E+09],[1995, 2.99000000000000E+09],[1996, 2.82000000000000E+09],[1997, 8.05500000000000E+09],[1998, 6.07500000000000E+09],[1999, 4.80000000000000E+09],[2000, 5.75700000000000E+09],[2001, 4.92100000000000E+09],[2002, 4.18300000000000E+09],[2003, 5.01200000000000E+09],[2004, 7.20300000000000E+09],[2005, 1.19310000000000E+10],[2006, 1.42170000000000E+10],[2007, 3.05390000000000E+10],[2008, 3.10280000000000E+10]], "size": [[1980, 3.00630000000000E+11],[1981, 3.09270000000000E+11],[1982, 3.27680000000000E+11],[1983, 3.51440000000000E+11],[1984, 3.77390000000000E+11],[1985, 4.10690000000000E+11],[1986, 4.49530000000000E+11],[1987, 4.97270000000000E+11],[1988, 5.45210000000000E+11],[1989, 5.84810000000000E+11],[1990, 6.21204000000000E+11],[1991, 6.77561000000000E+11],[1992, 7.53957000000000E+11],[1993, 8.37326000000000E+11],[1994, 9.28128000000000E+11],[1995, 1.00779700000000E+12],[1996, 1.08012500000000E+12],[1997, 1.13468800000000E+12],[1998, 1.16658400000000E+12],[1999, 1.23981100000000E+12],[2000, 1.35623500000000E+12],[2001, 1.47243000000000E+12],[2002, 1.64139100000000E+12],[2003, 1.90848600000000E+12],[2004, 2.20100100000000E+12],[2005, 2.49965800000000E+12],[2006, 2.86431000000000E+12],[2007, 3.27625800000000E+12],[2008, 3.45875500000000E+12]] },{ "name":"Slovenia", "category":"Slovenia","x": [[1990, 3.89000000000000E+09],[1991, 3.62200000000000E+09],[1992, 4.63900000000000E+09],[1993, 4.69200000000000E+09],[1994, 4.61400000000000E+09],[1995, 4.60400000000000E+09],[1996, 4.46400000000000E+09],[1997, 4.70600000000000E+09],[1998, 4.98400000000000E+09],[1999, 4.48000000000000E+09],[2000, 4.61100000000000E+09],[2001, 4.91900000000000E+09],[2002, 5.30200000000000E+09],[2003, 5.10800000000000E+09],[2004, 5.19100000000000E+09],[2005, 5.27100000000000E+09],[2006, 5.43600000000000E+09],[2007, 5.48200000000000E+09],[2008, 5.32300000000000E+09]], "y": [[1990, 2.00000000000000E+06],[1991, 2.00000000000000E+06],[1992, 2.00000000000000E+06],[1993, 2.00000000000000E+06],[1994, 2.00000000000000E+06],[1995, 1.50000000000000E+07],[1996, 8.00000000000000E+06],[1997, 1.00000000000000E+07],[1998, 1.09000000000000E+08],[1999, 1.72000000000000E+08],[2000, 2.93000000000000E+08],[2001, 2.96000000000000E+08],[2002, 2.88000000000000E+08],[2003, 3.70000000000000E+08],[2004, 3.58000000000000E+08],[2005, 3.39000000000000E+08],[2006, 3.71000000000000E+08],[2007, 4.53000000000000E+08],[2008, 4.76000000000000E+08]], "size": [[1990, 1.24440000000000E+10],[1991, 1.27440000000000E+10],[1992, 1.23440000000000E+10],[1993, 1.19460000000000E+10],[1994, 1.28950000000000E+10],[1995, 1.29130000000000E+10],[1996, 1.30570000000000E+10],[1997, 1.31760000000000E+10],[1998, 1.37280000000000E+10],[1999, 1.32620000000000E+10],[2000, 1.36240000000000E+10],[2001, 1.44660000000000E+10],[2002, 1.45980000000000E+10],[2003, 1.38200000000000E+10],[2004, 1.52710000000000E+10],[2005, 1.51170000000000E+10],[2006, 1.51150000000000E+10],[2007, 1.50430000000000E+10],[2008, 1.63990000000000E+10]] },{ "name":"Finland", "category":"Finland","x": [[1974, 5.98200000000000E+09],[1975, 6.31900000000000E+09],[1976, 9.06000000000000E+09],[1977, 8.33000000000000E+09],[1978, 1.20900000000000E+10],[1979, 1.07820000000000E+10],[1980, 1.26020000000000E+10],[1981, 4.14700000000000E+09],[1982, 4.18000000000000E+09],[1983, 4.37500000000000E+09],[1984, 5.19700000000000E+09],[1985, 9.18500000000000E+09],[1986, 8.19400000000000E+09],[1987, 9.71000000000000E+09],[1988, 1.00860000000000E+10],[1989, 9.15200000000000E+09],[1990, 1.00380000000000E+10],[1991, 1.02200000000000E+10],[1992, 8.14400000000000E+09],[1993, 1.04550000000000E+10],[1994, 1.46130000000000E+10],[1995, 1.16510000000000E+10],[1996, 1.55120000000000E+10],[1997, 1.31710000000000E+10],[1998, 8.59500000000000E+09],[1999, 9.62100000000000E+09],[2000, 9.23900000000000E+09],[2001, 1.13020000000000E+10],[2002, 1.32810000000000E+10],[2003, 1.94460000000000E+10],[2004, 1.71320000000000E+10],[2005, 7.17900000000000E+09],[2006, 1.69670000000000E+10],[2007, 1.45460000000000E+10],[2008, 9.11000000000000E+09]], "y": [[1974, 3.25000000000000E+08],[1975, 8.47000000000000E+08],[1976, 1.15700000000000E+09],[1977, 1.53900000000000E+09],[1978, 1.69500000000000E+09],[1979, 1.65700000000000E+09],[1980, 1.71900000000000E+09],[1981, 1.00700000000000E+09],[1982, 9.64000000000000E+08],[1983, 7.52000000000000E+08],[1984, 8.35000000000000E+08],[1985, 1.43800000000000E+09],[1986, 1.83200000000000E+09],[1987, 2.14000000000000E+09],[1988, 2.63200000000000E+09],[1989, 3.93100000000000E+09],[1990, 4.65500000000000E+09],[1991, 4.95400000000000E+09],[1992, 5.17900000000000E+09],[1993, 5.55400000000000E+09],[1994, 6.43000000000000E+09],[1995, 6.63400000000000E+09],[1996, 8.51200000000000E+09],[1997, 6.88400000000000E+09],[1998, 8.82300000000000E+09],[1999, 9.53700000000000E+09],[2000, 1.00800000000000E+10],[2001, 1.15520000000000E+10],[2002, 1.13040000000000E+10],[2003, 1.39410000000000E+10],[2004, 1.27790000000000E+10],[2005, 1.12510000000000E+10],[2006, 1.23170000000000E+10],[2007, 1.05560000000000E+10],[2008, 1.12470000000000E+10]], "size": [[1974, 2.76310000000000E+10],[1975, 2.61710000000000E+10],[1976, 2.92550000000000E+10],[1977, 3.30980000000000E+10],[1978, 3.57320000000000E+10],[1979, 3.92430000000000E+10],[1980, 4.07470000000000E+10],[1981, 4.09090000000000E+10],[1982, 4.11750000000000E+10],[1983, 4.21970000000000E+10],[1984, 4.52870000000000E+10],[1985, 4.97160000000000E+10],[1986, 4.92660000000000E+10],[1987, 5.34020000000000E+10],[1988, 5.38780000000000E+10],[1989, 5.38170000000000E+10],[1990, 5.43770000000000E+10],[1991, 5.79860000000000E+10],[1992, 5.77250000000000E+10],[1993, 6.10790000000000E+10],[1994, 6.56310000000000E+10],[1995, 6.40350000000000E+10],[1996, 6.93730000000000E+10],[1997, 6.91760000000000E+10],[1998, 7.01670000000000E+10],[1999, 6.94570000000000E+10],[2000, 6.99910000000000E+10],[2001, 7.44530000000000E+10],[2002, 7.49010000000000E+10],[2003, 8.42300000000000E+10],[2004, 8.58470000000000E+10],[2005, 7.05500000000000E+10],[2006, 8.23040000000000E+10],[2007, 8.12460000000000E+10],[2008, 7.74360000000000E+10]] },{ "name":"Austria", "category":"Austria","x": [[1960, 2.14100000000000E+09],[1961, 2.80900000000000E+09],[1962, 2.87700000000000E+09],[1963, 3.16000000000000E+09],[1964, 3.35100000000000E+09],[1965, 2.63200000000000E+09],[1966, 2.93300000000000E+09],[1967, 3.02800000000000E+09],[1968, 3.30200000000000E+09],[1969, 4.04200000000000E+09],[1970, 2.87200000000000E+09],[1971, 3.70000000000000E+09],[1972, 3.33700000000000E+09],[1973, 3.18900000000000E+09],[1974, 3.35500000000000E+09],[1975, 2.79800000000000E+09],[1976, 3.63900000000000E+09],[1977, 2.48500000000000E+09],[1978, 2.50500000000000E+09],[1979, 2.37700000000000E+09],[1980, 2.92100000000000E+09],[1981, 4.36100000000000E+09],[1982, 3.80800000000000E+09],[1983, 4.22700000000000E+09],[1984, 4.71000000000000E+09],[1985, 4.78000000000000E+09],[1986, 4.10900000000000E+09],[1987, 4.93000000000000E+09],[1988, 3.98300000000000E+09],[1989, 4.80000000000000E+09],[1990, 7.00600000000000E+09],[1991, 7.78600000000000E+09],[1992, 5.09100000000000E+09],[1993, 3.74000000000000E+09],[1994, 3.90800000000000E+09],[1995, 5.17300000000000E+09],[1996, 6.21500000000000E+09],[1997, 6.85600000000000E+09],[1998, 5.13100000000000E+09],[1999, 5.45500000000000E+09],[2000, 6.73900000000000E+09],[2001, 8.09600000000000E+09],[2002, 7.81700000000000E+09],[2003, 9.51400000000000E+09],[2004, 9.11000000000000E+09],[2005, 8.48700000000000E+09],[2006, 8.41200000000000E+09],[2007, 7.64700000000000E+09],[2008, 6.94900000000000E+09]], "y": [[1960, 1.28100000000000E+09],[1961, 1.28100000000000E+09],[1962, 1.36800000000000E+09],[1963, 1.44200000000000E+09],[1964, 1.46300000000000E+09],[1965, 1.33800000000000E+09],[1966, 1.71300000000000E+09],[1967, 1.55600000000000E+09],[1968, 1.72900000000000E+09],[1969, 2.64200000000000E+09],[1970, 3.66800000000000E+09],[1971, 4.58300000000000E+09],[1972, 4.36900000000000E+09],[1973, 4.42700000000000E+09],[1974, 4.58000000000000E+09],[1975, 4.54500000000000E+09],[1976, 5.53800000000000E+09],[1977, 5.60800000000000E+09],[1978, 5.41100000000000E+09],[1979, 4.80500000000000E+09],[1980, 3.82400000000000E+09],[1981, 3.36000000000000E+09],[1982, 4.14300000000000E+09],[1983, 3.42100000000000E+09],[1984, 4.68400000000000E+09],[1985, 4.96500000000000E+09],[1986, 5.09400000000000E+09],[1987, 5.66400000000000E+09],[1988, 5.71300000000000E+09],[1989, 6.53700000000000E+09],[1990, 7.72000000000000E+09],[1991, 7.46700000000000E+09],[1992, 6.62800000000000E+09],[1993, 6.78000000000000E+09],[1994, 8.65600000000000E+09],[1995, 8.91300000000000E+09],[1996, 9.40400000000000E+09],[1997, 8.28100000000000E+09],[1998, 8.86800000000000E+09],[1999, 9.28600000000000E+09],[2000, 7.85800000000000E+09],[2001, 8.74500000000000E+09],[2002, 9.30200000000000E+09],[2003, 1.11610000000000E+10],[2004, 1.09530000000000E+10],[2005, 1.30280000000000E+10],[2006, 1.06380000000000E+10],[2007, 9.90200000000000E+09],[2008, 1.11550000000000E+10]], "size": [[1960, 1.54420000000000E+10],[1961, 1.61660000000000E+10],[1962, 1.72640000000000E+10],[1963, 1.78510000000000E+10],[1964, 1.98960000000000E+10],[1965, 2.18520000000000E+10],[1966, 2.35270000000000E+10],[1967, 2.41280000000000E+10],[1968, 2.53650000000000E+10],[1969, 2.59330000000000E+10],[1970, 2.95360000000000E+10],[1971, 2.82020000000000E+10],[1972, 2.89250000000000E+10],[1973, 3.09160000000000E+10],[1974, 3.34050000000000E+10],[1975, 3.49330000000000E+10],[1976, 3.48340000000000E+10],[1977, 3.73280000000000E+10],[1978, 3.76770000000000E+10],[1979, 4.01970000000000E+10],[1980, 4.16000000000000E+10],[1981, 4.22460000000000E+10],[1982, 4.22350000000000E+10],[1983, 4.19720000000000E+10],[1984, 4.16630000000000E+10],[1985, 4.37420000000000E+10],[1986, 4.39770000000000E+10],[1987, 4.96880000000000E+10],[1988, 4.81490000000000E+10],[1989, 4.91550000000000E+10],[1990, 4.92960000000000E+10],[1991, 5.01810000000000E+10],[1992, 4.99290000000000E+10],[1993, 5.13620000000000E+10],[1994, 5.21240000000000E+10],[1995, 5.51790000000000E+10],[1996, 5.35740000000000E+10],[1997, 5.56850000000000E+10],[1998, 5.59110000000000E+10],[1999, 5.97180000000000E+10],[2000, 5.98780000000000E+10],[2001, 6.08630000000000E+10],[2002, 6.03580000000000E+10],[2003, 5.77080000000000E+10],[2004, 6.15190000000000E+10],[2005, 6.36130000000000E+10],[2006, 6.17140000000000E+10],[2007, 6.21990000000000E+10],[2008, 6.40790000000000E+10]] },{ "name":"United Kingdom", "category":"United Kingdom","x": [[1967, 1.46923000000000E+11],[1968, 1.59729000000000E+11],[1969, 1.71107000000000E+11],[1970, 1.70647000000000E+11],[1971, 1.63523000000000E+11],[1972, 1.45241000000000E+11],[1973, 1.74609000000000E+11],[1974, 1.48831000000000E+11],[1975, 1.69468000000000E+11],[1976, 1.79867000000000E+11],[1977, 1.82507000000000E+11],[1978, 1.88178000000000E+11],[1979, 2.02879000000000E+11],[1980, 2.07896000000000E+11],[1981, 2.06892000000000E+11],[1982, 1.95325000000000E+11],[1983, 1.94705000000000E+11],[1984, 1.28048000000000E+11],[1985, 1.78330000000000E+11],[1986, 2.02531000000000E+11],[1987, 2.11469000000000E+11],[1988, 2.05133000000000E+11],[1989, 2.01792000000000E+11],[1990, 2.06438000000000E+11],[1991, 2.11458000000000E+11],[1992, 1.93638000000000E+11],[1993, 1.71246000000000E+11],[1994, 1.61341000000000E+11],[1995, 1.55206000000000E+11],[1996, 1.47269000000000E+11],[1997, 1.21973000000000E+11],[1998, 1.25101000000000E+11],[1999, 1.08341000000000E+11],[2000, 1.22300000000000E+11],[2001, 1.33048000000000E+11],[2002, 1.25681000000000E+11],[2003, 1.39842000000000E+11],[2004, 1.33268000000000E+11],[2005, 1.36336000000000E+11],[2006, 1.50844000000000E+11],[2007, 1.38091000000000E+11],[2008, 1.26764000000000E+11]], "y": [[1967, 1.50000000000000E+07],[1968, 1.07000000000000E+08],[1969, 3.40000000000000E+08],[1970, 8.22000000000000E+08],[1971, 2.44300000000000E+09],[1972, 6.58600000000000E+09],[1973, 2.73500000000000E+09],[1974, 1.04810000000000E+10],[1975, 9.15000000000000E+09],[1976, 7.24000000000000E+09],[1977, 5.89700000000000E+09],[1978, 4.19100000000000E+09],[1979, 3.07700000000000E+09],[1980, 2.12200000000000E+09],[1981, 1.47700000000000E+09],[1982, 1.49300000000000E+09],[1983, 1.63600000000000E+09],[1984, 2.66600000000000E+09],[1985, 2.89600000000000E+09],[1986, 1.74300000000000E+09],[1987, 4.53200000000000E+09],[1988, 4.77800000000000E+09],[1989, 4.94900000000000E+09],[1990, 4.99800000000000E+09],[1991, 5.82400000000000E+09],[1992, 1.25830000000000E+10],[1993, 3.40390000000000E+10],[1994, 5.32580000000000E+10],[1995, 6.37390000000000E+10],[1996, 8.40860000000000E+10],[1997, 1.10963000000000E+11],[1998, 1.17799000000000E+11],[1999, 1.42902000000000E+11],[2000, 1.48077000000000E+11],[2001, 1.41905000000000E+11],[2002, 1.52276000000000E+11],[2003, 1.48881000000000E+11],[2004, 1.57065000000000E+11],[2005, 1.52640000000000E+11],[2006, 1.40828000000000E+11],[2007, 1.65793000000000E+11],[2008, 1.76215000000000E+11]], "size": [[1967, 2.07548000000000E+11],[1968, 2.22617000000000E+11],[1969, 2.37901000000000E+11],[1970, 2.48014000000000E+11],[1971, 2.55756000000000E+11],[1972, 2.62767000000000E+11],[1973, 2.81352000000000E+11],[1974, 2.72402000000000E+11],[1975, 2.70790000000000E+11],[1976, 2.75279000000000E+11],[1977, 2.81730000000000E+11],[1978, 2.86462000000000E+11],[1979, 2.98645000000000E+11],[1980, 2.84071000000000E+11],[1981, 2.76697000000000E+11],[1982, 2.71676000000000E+11],[1983, 2.75567000000000E+11],[1984, 2.80396000000000E+11],[1985, 2.94719000000000E+11],[1986, 2.99355000000000E+11],[1987, 3.01644000000000E+11],[1988, 3.06694000000000E+11],[1989, 3.12675000000000E+11],[1990, 3.17755000000000E+11],[1991, 3.21352000000000E+11],[1992, 3.19346000000000E+11],[1993, 3.21665000000000E+11],[1994, 3.25024000000000E+11],[1995, 3.32489000000000E+11],[1996, 3.49313000000000E+11],[1997, 3.49180000000000E+11],[1998, 3.61079000000000E+11],[1999, 3.65250000000000E+11],[2000, 3.74375000000000E+11],[2001, 3.82368000000000E+11],[2002, 3.84596000000000E+11],[2003, 3.95473000000000E+11],[2004, 3.91287000000000E+11],[2005, 3.95425000000000E+11],[2006, 3.93432000000000E+11],[2007, 3.92974000000000E+11],[2008, 3.84580000000000E+11]] },{ "name":"Hungary", "category":"Hungary","x": [[1965, 8.95000000000000E+09],[1966, 9.24300000000000E+09],[1967, 9.57200000000000E+09],[1968, 9.14200000000000E+09],[1969, 8.97300000000000E+09],[1970, 9.45700000000000E+09],[1971, 9.79900000000000E+09],[1972, 1.07630000000000E+10],[1973, 1.16470000000000E+10],[1974, 1.18240000000000E+10],[1975, 1.15620000000000E+10],[1976, 1.20050000000000E+10],[1977, 1.21710000000000E+10],[1978, 1.21370000000000E+10],[1979, 1.20720000000000E+10],[1980, 1.20420000000000E+10],[1981, 1.22450000000000E+10],[1982, 1.26890000000000E+10],[1983, 1.18130000000000E+10],[1984, 1.18510000000000E+10],[1985, 9.60100000000000E+09],[1986, 1.00530000000000E+10],[1987, 9.92100000000000E+09],[1988, 9.18600000000000E+09],[1989, 8.65900000000000E+09],[1990, 8.66900000000000E+09],[1991, 8.14200000000000E+09],[1992, 9.27600000000000E+09],[1993, 9.17000000000000E+09],[1994, 8.85800000000000E+09],[1995, 9.23000000000000E+09],[1996, 9.72700000000000E+09],[1997, 9.51200000000000E+09],[1998, 9.69200000000000E+09],[1999, 1.03060000000000E+10],[2000, 9.70700000000000E+09],[2001, 8.92300000000000E+09],[2002, 9.06300000000000E+09],[2003, 9.25400000000000E+09],[2004, 8.33900000000000E+09],[2005, 7.14600000000000E+09],[2006, 7.09200000000000E+09],[2007, 7.48700000000000E+09],[2008, 7.20500000000000E+09]], "y": [[1965, 6.60000000000000E+08],[1966, 8.13000000000000E+08],[1967, 1.19700000000000E+09],[1968, 1.99300000000000E+09],[1969, 2.50300000000000E+09],[1970, 2.10900000000000E+09],[1971, 1.76500000000000E+09],[1972, 2.02300000000000E+09],[1973, 2.86200000000000E+09],[1974, 3.01700000000000E+09],[1975, 3.87300000000000E+09],[1976, 5.48500000000000E+09],[1977, 5.74600000000000E+09],[1978, 6.39500000000000E+09],[1979, 7.40700000000000E+09],[1980, 8.40600000000000E+09],[1981, 8.94000000000000E+09],[1982, 8.98500000000000E+09],[1983, 8.17000000000000E+09],[1984, 6.50800000000000E+09],[1985, 5.95700000000000E+09],[1986, 6.46100000000000E+09],[1987, 5.08800000000000E+09],[1988, 4.58000000000000E+09],[1989, 5.32600000000000E+09],[1990, 4.47300000000000E+09],[1991, 5.02600000000000E+09],[1992, 4.20400000000000E+09],[1993, 4.08400000000000E+09],[1994, 4.83400000000000E+09],[1995, 5.21200000000000E+09],[1996, 6.37300000000000E+09],[1997, 5.74500000000000E+09],[1998, 7.31900000000000E+09],[1999, 7.82000000000000E+09],[2000, 6.60200000000000E+09],[2001, 8.86100000000000E+09],[2002, 1.07380000000000E+10],[2003, 1.18830000000000E+10],[2004, 1.17190000000000E+10],[2005, 1.23790000000000E+10],[2006, 1.31600000000000E+10],[2007, 1.52320000000000E+10],[2008, 1.51760000000000E+10]], "size": [[1965, 1.11770000000000E+10],[1966, 1.18610000000000E+10],[1967, 1.24900000000000E+10],[1968, 1.31550000000000E+10],[1969, 1.40690000000000E+10],[1970, 1.45420000000000E+10],[1971, 1.49940000000000E+10],[1972, 1.63230000000000E+10],[1973, 1.76430000000000E+10],[1974, 1.89850000000000E+10],[1975, 2.04720000000000E+10],[1976, 2.20500000000000E+10],[1977, 2.34020000000000E+10],[1978, 2.55430000000000E+10],[1979, 2.45190000000000E+10],[1980, 2.38760000000000E+10],[1981, 2.43000000000000E+10],[1982, 2.47750000000000E+10],[1983, 2.57900000000000E+10],[1984, 2.63030000000000E+10],[1985, 2.67960000000000E+10],[1986, 2.80640000000000E+10],[1987, 2.97490000000000E+10],[1988, 2.92330000000000E+10],[1989, 2.95810000000000E+10],[1990, 2.84360000000000E+10],[1991, 2.99630000000000E+10],[1992, 3.16850000000000E+10],[1993, 3.29150000000000E+10],[1994, 3.35150000000000E+10],[1995, 3.40180000000000E+10],[1996, 3.50900000000000E+10],[1997, 3.53970000000000E+10],[1998, 3.71900000000000E+10],[1999, 3.78320000000000E+10],[2000, 3.51910000000000E+10],[2001, 3.64150000000000E+10],[2002, 3.61570000000000E+10],[2003, 3.41450000000000E+10],[2004, 3.37080000000000E+10],[2005, 3.57560000000000E+10],[2006, 3.58590000000000E+10],[2007, 3.99600000000000E+10],[2008, 4.00250000000000E+10]] },{ "name":"Slovak Republic", "category":"Slovak Republic","x": [[1971, 7.20800000000000E+09],[1972, 7.92300000000000E+09],[1973, 7.92000000000000E+09],[1974, 6.58100000000000E+09],[1975, 7.01700000000000E+09],[1976, 7.52200000000000E+09],[1977, 6.67700000000000E+09],[1978, 6.30600000000000E+09],[1979, 5.50200000000000E+09],[1980, 7.56000000000000E+09],[1981, 7.45600000000000E+09],[1982, 7.08200000000000E+09],[1983, 7.78000000000000E+09],[1984, 8.25100000000000E+09],[1985, 8.15300000000000E+09],[1986, 7.81100000000000E+09],[1987, 7.71400000000000E+09],[1988, 7.74200000000000E+09],[1989, 7.76100000000000E+09],[1990, 8.12300000000000E+09],[1991, 6.55100000000000E+09],[1992, 7.79900000000000E+09],[1993, 6.35300000000000E+09],[1994, 5.36400000000000E+09],[1995, 6.99000000000000E+09],[1996, 6.41800000000000E+09],[1997, 6.86500000000000E+09],[1998, 6.47700000000000E+09],[1999, 7.09100000000000E+09],[2000, 6.11100000000000E+09],[2001, 6.25700000000000E+09],[2002, 5.59800000000000E+09],[2003, 6.40300000000000E+09],[2004, 6.11500000000000E+09],[2005, 5.98000000000000E+09],[2006, 5.72900000000000E+09],[2007, 5.22300000000000E+09],[2008, 5.14900000000000E+09]], "y": [[1971, 5.42000000000000E+08],[1972, 5.89000000000000E+08],[1973, 6.47000000000000E+08],[1974, 7.89000000000000E+08],[1975, 9.03000000000000E+08],[1976, 9.97000000000000E+08],[1977, 1.13300000000000E+09],[1978, 1.77200000000000E+09],[1979, 2.38800000000000E+09],[1980, 2.04400000000000E+09],[1981, 2.59200000000000E+09],[1982, 3.37400000000000E+09],[1983, 1.36300000000000E+09],[1984, 1.23900000000000E+09],[1985, 6.31000000000000E+08],[1986, 1.26700000000000E+09],[1987, 6.79000000000000E+08],[1988, 3.89000000000000E+08],[1989, 5.28000000000000E+08],[1990, 1.82300000000000E+09],[1991, 2.12300000000000E+09],[1992, 8.70000000000000E+08],[1993, 1.17800000000000E+09],[1994, 2.18600000000000E+09],[1995, 2.38100000000000E+09],[1996, 2.34100000000000E+09],[1997, 2.33200000000000E+09],[1998, 2.35100000000000E+09],[1999, 3.05400000000000E+09],[2000, 3.34400000000000E+09],[2001, 2.69900000000000E+09],[2002, 2.51100000000000E+09],[2003, 2.39600000000000E+09],[2004, 2.42100000000000E+09],[2005, 2.18400000000000E+09],[2006, 1.91000000000000E+09],[2007, 1.61700000000000E+09],[2008, 1.60700000000000E+09]], "size": [[1971, 1.08650000000000E+10],[1972, 1.18230000000000E+10],[1973, 1.22990000000000E+10],[1974, 1.28860000000000E+10],[1975, 1.33690000000000E+10],[1976, 1.45170000000000E+10],[1977, 1.53070000000000E+10],[1978, 1.54320000000000E+10],[1979, 1.68430000000000E+10],[1980, 1.99670000000000E+10],[1981, 1.97050000000000E+10],[1982, 1.97500000000000E+10],[1983, 1.92320000000000E+10],[1984, 1.99470000000000E+10],[1985, 2.19450000000000E+10],[1986, 2.37290000000000E+10],[1987, 2.31220000000000E+10],[1988, 2.24920000000000E+10],[1989, 2.34000000000000E+10],[1990, 2.54970000000000E+10],[1991, 2.42610000000000E+10],[1992, 2.32320000000000E+10],[1993, 2.40440000000000E+10],[1994, 2.54580000000000E+10],[1995, 2.64280000000000E+10],[1996, 2.54540000000000E+10],[1997, 2.50530000000000E+10],[1998, 2.57320000000000E+10],[1999, 2.81050000000000E+10],[2000, 3.07980000000000E+10],[2001, 3.18560000000000E+10],[2002, 3.22120000000000E+10],[2003, 3.09860000000000E+10],[2004, 3.04600000000000E+10],[2005, 3.13520000000000E+10],[2006, 3.12510000000000E+10],[2007, 2.78920000000000E+10],[2008, 2.87600000000000E+10]] },{ "name":"Argentina", "category":"Argentina","x": [[1971, 7.29000000000000E+08],[1972, 6.15000000000000E+08],[1973, 6.31000000000000E+08],[1974, 6.78000000000000E+08],[1975, 6.50000000000000E+08],[1976, 6.27000000000000E+08],[1977, 5.35000000000000E+08],[1978, 7.56000000000000E+08],[1979, 6.80000000000000E+08],[1980, 8.19000000000000E+08],[1981, 8.94000000000000E+08],[1982, 7.33000000000000E+08],[1983, 9.00000000000000E+08],[1984, 5.81000000000000E+08],[1985, 6.07000000000000E+08],[1986, 1.01300000000000E+09],[1987, 1.00300000000000E+09],[1988, 1.56100000000000E+09],[1989, 8.57000000000000E+08],[1990, 6.54000000000000E+08],[1991, 9.14000000000000E+08],[1992, 8.25000000000000E+08],[1993, 1.16600000000000E+09],[1994, 2.31200000000000E+09],[1995, 1.87900000000000E+09],[1996, 1.87800000000000E+09],[1997, 1.78900000000000E+09],[1998, 1.70400000000000E+09],[1999, 1.97300000000000E+09],[2000, 1.75400000000000E+09],[2001, 1.34900000000000E+09],[2002, 8.06000000000000E+08],[2003, 9.30000000000000E+08],[2004, 1.67000000000000E+09],[2005, 2.17200000000000E+09],[2006, 2.09800000000000E+09],[2007, 2.49400000000000E+09],[2008, 2.80500000000000E+09]], "y": [[1971, 5.41700000000000E+09],[1972, 5.86800000000000E+09],[1973, 6.54300000000000E+09],[1974, 6.51300000000000E+09],[1975, 7.30100000000000E+09],[1976, 7.75700000000000E+09],[1977, 8.03800000000000E+09],[1978, 6.65300000000000E+09],[1979, 7.41600000000000E+09],[1980, 8.74400000000000E+09],[1981, 8.71100000000000E+09],[1982, 1.02340000000000E+10],[1983, 1.05020000000000E+10],[1984, 1.10460000000000E+10],[1985, 1.24250000000000E+10],[1986, 1.32730000000000E+10],[1987, 1.25320000000000E+10],[1988, 2.10750000000000E+10],[1989, 2.43200000000000E+10],[1990, 1.98730000000000E+10],[1991, 2.10020000000000E+10],[1992, 2.08200000000000E+10],[1993, 2.15430000000000E+10],[1994, 2.02230000000000E+10],[1995, 2.64770000000000E+10],[1996, 3.23960000000000E+10],[1997, 3.20190000000000E+10],[1998, 3.40920000000000E+10],[1999, 4.55710000000000E+10],[2000, 4.86110000000000E+10],[2001, 4.30070000000000E+10],[2002, 4.02750000000000E+10],[2003, 4.75940000000000E+10],[2004, 5.48970000000000E+10],[2005, 5.53320000000000E+10],[2006, 5.77550000000000E+10],[2007, 6.25280000000000E+10],[2008, 6.50970000000000E+10]], "size": [[1971, 2.36240000000000E+10],[1972, 2.53060000000000E+10],[1973, 2.66610000000000E+10],[1974, 2.79500000000000E+10],[1975, 2.93430000000000E+10],[1976, 3.02160000000000E+10],[1977, 3.24130000000000E+10],[1978, 3.34340000000000E+10],[1979, 3.76410000000000E+10],[1980, 3.97060000000000E+10],[1981, 3.88390000000000E+10],[1982, 3.98860000000000E+10],[1983, 4.30030000000000E+10],[1984, 4.49660000000000E+10],[1985, 4.52650000000000E+10],[1986, 4.90030000000000E+10],[1987, 5.20390000000000E+10],[1988, 5.22460000000000E+10],[1989, 5.05110000000000E+10],[1990, 5.07400000000000E+10],[1991, 5.36230000000000E+10],[1992, 5.58810000000000E+10],[1993, 6.15760000000000E+10],[1994, 6.28080000000000E+10],[1995, 6.70150000000000E+10],[1996, 6.96860000000000E+10],[1997, 7.22960000000000E+10],[1998, 7.40130000000000E+10],[1999, 8.04680000000000E+10],[2000, 8.89100000000000E+10],[2001, 9.01200000000000E+10],[2002, 8.44690000000000E+10],[2003, 9.20440000000000E+10],[2004, 1.00177000000000E+11],[2005, 1.05505000000000E+11],[2006, 1.14990000000000E+11],[2007, 1.15081000000000E+11],[2008, 1.21424000000000E+11]] },{ "name":"Poland", "category":"Poland","x": [[1960, 2.85390000000000E+10],[1961, 3.11300000000000E+10],[1962, 3.39100000000000E+10],[1963, 3.55120000000000E+10],[1964, 3.88130000000000E+10],[1965, 4.22240000000000E+10],[1966, 4.59020000000000E+10],[1967, 4.97560000000000E+10],[1968, 5.34290000000000E+10],[1969, 5.70450000000000E+10],[1970, 5.90710000000000E+10],[1971, 6.39140000000000E+10],[1972, 7.02260000000000E+10],[1973, 7.87880000000000E+10],[1974, 8.61850000000000E+10],[1975, 9.16230000000000E+10],[1976, 9.87560000000000E+10],[1977, 1.03538000000000E+11],[1978, 1.09178000000000E+11],[1979, 1.10585000000000E+11],[1980, 1.14547000000000E+11],[1981, 1.08632000000000E+11],[1982, 1.12228000000000E+11],[1983, 1.19744000000000E+11],[1984, 1.28937000000000E+11],[1985, 1.31513000000000E+11],[1986, 1.34299000000000E+11],[1987, 1.39591000000000E+11],[1988, 1.38236000000000E+11],[1989, 1.39670000000000E+11],[1990, 1.31045000000000E+11],[1991, 1.29230000000000E+11],[1992, 1.27199000000000E+11],[1993, 1.28257000000000E+11],[1994, 1.29371000000000E+11],[1995, 1.33009000000000E+11],[1996, 1.36764000000000E+11],[1997, 1.36253000000000E+11],[1998, 1.35646000000000E+11],[1999, 1.34825000000000E+11],[2000, 1.37667000000000E+11],[2001, 1.36860000000000E+11],[2002, 1.34694000000000E+11],[2003, 1.42592000000000E+11],[2004, 1.43494000000000E+11],[2005, 1.43336000000000E+11],[2006, 1.48731000000000E+11],[2007, 1.45789000000000E+11],[2008, 1.40491000000000E+11]], "y": [[1960, 6.80000000000000E+07],[1961, 4.32000000000000E+08],[1962, 5.91000000000000E+08],[1963, 6.13000000000000E+08],[1964, 7.24000000000000E+08],[1965, 3.41000000000000E+08],[1966, 1.98000000000000E+08],[1967, 5.20000000000000E+07],[1968, 4.87000000000000E+08],[1969, 1.44500000000000E+09],[1970, 2.03800000000000E+09],[1971, 2.28400000000000E+09],[1972, 2.29200000000000E+09],[1973, 1.40800000000000E+09],[1974, 4.86000000000000E+08],[1975, 5.90000000000000E+08],[1976, 7.66000000000000E+08],[1977, 2.90000000000000E+08],[1978, 1.96000000000000E+08],[1979, 3.42000000000000E+08],[1980, 1.44000000000000E+08],[1981, 1.54000000000000E+08],[1982, 1.23000000000000E+08],[1983, 1.18000000000000E+08],[1984, 7.60000000000000E+07],[1985, 8.10000000000000E+07],[1986, 6.30000000000000E+07],[1987, 1.65000000000000E+08],[1988, 9.70000000000000E+07],[1989, 1.15000000000000E+08],[1990, 1.25000000000000E+08],[1991, 1.07000000000000E+08],[1992, 1.00000000000000E+08],[1993, 9.70000000000000E+07],[1994, 1.47000000000000E+08],[1995, 2.58000000000000E+08],[1996, 3.23000000000000E+08],[1997, 2.15000000000000E+08],[1998, 3.13000000000000E+08],[1999, 6.20000000000000E+08],[2000, 9.28000000000000E+08],[2001, 1.35800000000000E+09],[2002, 2.19800000000000E+09],[2003, 2.42500000000000E+09],[2004, 3.14400000000000E+09],[2005, 5.18100000000000E+09],[2006, 4.59700000000000E+09],[2007, 4.51700000000000E+09],[2008, 4.67900000000000E+09]], "size": [[1960, 2.92820000000000E+10],[1961, 3.22400000000000E+10],[1962, 3.53640000000000E+10],[1963, 3.69410000000000E+10],[1964, 4.05900000000000E+10],[1965, 4.37860000000000E+10],[1966, 4.73550000000000E+10],[1967, 5.12210000000000E+10],[1968, 5.54710000000000E+10],[1969, 5.99560000000000E+10],[1970, 6.44170000000000E+10],[1971, 6.95370000000000E+10],[1972, 7.60450000000000E+10],[1973, 8.39080000000000E+10],[1974, 9.12710000000000E+10],[1975, 9.67840000000000E+10],[1976, 1.03648000000000E+11],[1977, 1.08925000000000E+11],[1978, 1.15121000000000E+11],[1979, 1.16818000000000E+11],[1980, 1.20941000000000E+11],[1981, 1.14129000000000E+11],[1982, 1.16542000000000E+11],[1983, 1.24201000000000E+11],[1984, 1.32848000000000E+11],[1985, 1.35662000000000E+11],[1986, 1.38058000000000E+11],[1987, 1.43439000000000E+11],[1988, 1.41961000000000E+11],[1989, 1.43319000000000E+11],[1990, 1.34415000000000E+11],[1991, 1.32728000000000E+11],[1992, 1.30687000000000E+11],[1993, 1.31779000000000E+11],[1994, 1.33294000000000E+11],[1995, 1.37042000000000E+11],[1996, 1.41194000000000E+11],[1997, 1.40935000000000E+11],[1998, 1.40771000000000E+11],[1999, 1.40001000000000E+11],[2000, 1.43174000000000E+11],[2001, 1.43721000000000E+11],[2002, 1.42499000000000E+11],[2003, 1.50009000000000E+11],[2004, 1.52550000000000E+11],[2005, 1.55359000000000E+11],[2006, 1.60764000000000E+11],[2007, 1.58761000000000E+11],[2008, 1.54710000000000E+11]] },{ "name":"Belgium", "category":"Belgium","x": [[1960, 1.29330000000000E+10],[1961, 1.33470000000000E+10],[1962, 1.46600000000000E+10],[1963, 1.49050000000000E+10],[1964, 1.52730000000000E+10],[1965, 1.55140000000000E+10],[1966, 1.56410000000000E+10],[1967, 1.49900000000000E+10],[1968, 1.53370000000000E+10],[1969, 1.36750000000000E+10],[1970, 1.02680000000000E+10],[1971, 8.93600000000000E+09],[1972, 9.47100000000000E+09],[1973, 8.80500000000000E+09],[1974, 1.10590000000000E+10],[1975, 8.76300000000000E+09],[1976, 1.06040000000000E+10],[1977, 1.18870000000000E+10],[1978, 1.34310000000000E+10],[1979, 1.46450000000000E+10],[1980, 1.55890000000000E+10],[1981, 1.74550000000000E+10],[1982, 1.88370000000000E+10],[1983, 1.66740000000000E+10],[1984, 1.81470000000000E+10],[1985, 1.49320000000000E+10],[1986, 1.39350000000000E+10],[1987, 1.50600000000000E+10],[1988, 1.62120000000000E+10],[1989, 1.76300000000000E+10],[1990, 1.98550000000000E+10],[1991, 1.92390000000000E+10],[1992, 1.85240000000000E+10],[1993, 1.87180000000000E+10],[1994, 1.95860000000000E+10],[1995, 1.92770000000000E+10],[1996, 1.82060000000000E+10],[1997, 1.62820000000000E+10],[1998, 1.68900000000000E+10],[1999, 1.25280000000000E+10],[2000, 1.60300000000000E+10],[2001, 1.27640000000000E+10],[2002, 1.26600000000000E+10],[2003, 1.16080000000000E+10],[2004, 1.14810000000000E+10],[2005, 1.04930000000000E+10],[2006, 9.21600000000000E+09],[2007, 8.32700000000000E+09],[2008, 7.23500000000000E+09]], "y": [[1960, 4.20000000000000E+07],[1961, 5.10000000000000E+07],[1962, 3.70000000000000E+07],[1963, 2.30000000000000E+07],[1964, 2.50000000000000E+07],[1965, 2.90000000000000E+07],[1966, 3.60000000000000E+07],[1967, 3.38000000000000E+08],[1968, 2.12000000000000E+08],[1969, 1.44100000000000E+09],[1970, 4.05500000000000E+09],[1971, 6.17400000000000E+09],[1972, 7.69600000000000E+09],[1973, 9.62700000000000E+09],[1974, 1.08830000000000E+10],[1975, 8.96700000000000E+09],[1976, 9.21800000000000E+09],[1977, 7.51800000000000E+09],[1978, 6.70400000000000E+09],[1979, 7.27400000000000E+09],[1980, 5.96800000000000E+09],[1981, 4.90500000000000E+09],[1982, 2.35900000000000E+09],[1983, 3.69400000000000E+09],[1984, 2.79300000000000E+09],[1985, 2.38300000000000E+09],[1986, 9.73000000000000E+08],[1987, 2.09400000000000E+09],[1988, 2.54900000000000E+09],[1989, 5.37400000000000E+09],[1990, 5.40500000000000E+09],[1991, 6.21600000000000E+09],[1992, 6.66800000000000E+09],[1993, 6.81200000000000E+09],[1994, 8.27500000000000E+09],[1995, 1.01810000000000E+10],[1996, 1.10100000000000E+10],[1997, 1.15370000000000E+10],[1998, 1.50360000000000E+10],[1999, 1.92310000000000E+10],[2000, 1.59770000000000E+10],[2001, 1.57800000000000E+10],[2002, 1.78680000000000E+10],[2003, 2.16090000000000E+10],[2004, 2.14770000000000E+10],[2005, 2.28490000000000E+10],[2006, 2.30220000000000E+10],[2007, 2.53860000000000E+10],[2008, 2.46460000000000E+10]], "size": [[1960, 1.51520000000000E+10],[1961, 1.60290000000000E+10],[1962, 1.75450000000000E+10],[1963, 1.88120000000000E+10],[1964, 2.05510000000000E+10],[1965, 2.14330000000000E+10],[1966, 2.26480000000000E+10],[1967, 2.36910000000000E+10],[1968, 2.64600000000000E+10],[1969, 2.91650000000000E+10],[1970, 3.05230000000000E+10],[1971, 3.32370000000000E+10],[1972, 3.70600000000000E+10],[1973, 4.06150000000000E+10],[1974, 4.23140000000000E+10],[1975, 4.08180000000000E+10],[1976, 4.71230000000000E+10],[1977, 4.68690000000000E+10],[1978, 5.05590000000000E+10],[1979, 5.19050000000000E+10],[1980, 5.30910000000000E+10],[1981, 5.00510000000000E+10],[1982, 4.99780000000000E+10],[1983, 5.18690000000000E+10],[1984, 5.36900000000000E+10],[1985, 5.62590000000000E+10],[1986, 5.76210000000000E+10],[1987, 6.23270000000000E+10],[1988, 6.45410000000000E+10],[1989, 6.68770000000000E+10],[1990, 7.02920000000000E+10],[1991, 7.11860000000000E+10],[1992, 7.14100000000000E+10],[1993, 7.00680000000000E+10],[1994, 7.13410000000000E+10],[1995, 7.35160000000000E+10],[1996, 7.51380000000000E+10],[1997, 7.78610000000000E+10],[1998, 8.20750000000000E+10],[1999, 8.33660000000000E+10],[2000, 8.27730000000000E+10],[2001, 7.86180000000000E+10],[2002, 8.09390000000000E+10],[2003, 8.35610000000000E+10],[2004, 8.43530000000000E+10],[2005, 8.57090000000000E+10],[2006, 8.43480000000000E+10],[2007, 8.75260000000000E+10],[2008, 8.35830000000000E+10]] },{ "name":"Dominican Republic", "category":"Dominican Republic","x": [[2003, 2.65100000000000E+09],[2004, 1.94900000000000E+09],[2005, 1.19400000000000E+09],[2006, 1.76600000000000E+09],[2007, 1.82600000000000E+09],[2008, 1.98200000000000E+09]], "y": [[2003, 1.15700000000000E+09],[2004, 4.85000000000000E+08],[2005, 9.57000000000000E+08],[2006, 1.19800000000000E+09],[2007, 2.17500000000000E+09],[2008, 1.80500000000000E+09]], "size": [[2003, 1.32650000000000E+10],[2004, 1.17950000000000E+10],[2005, 1.26230000000000E+10],[2006, 1.37800000000000E+10],[2007, 1.44100000000000E+10],[2008, 1.51720000000000E+10]] },{ "name":"Kazakhstan", "category":"Kazakhstan","x": [[1990, 6.21440000000000E+10],[1991, 6.25340000000000E+10],[1992, 5.98000000000000E+10],[1993, 5.53200000000000E+10],[1994, 4.71000000000000E+10],[1995, 4.80160000000000E+10],[1996, 4.26310000000000E+10],[1997, 3.74550000000000E+10],[1998, 3.53970000000000E+10],[1999, 3.42210000000000E+10],[2000, 3.56450000000000E+10],[2001, 4.03010000000000E+10],[2002, 4.01510000000000E+10],[2003, 4.58270000000000E+10],[2004, 5.05580000000000E+10],[2005, 5.01100000000000E+10],[2006, 4.93690000000000E+10],[2007, 5.62910000000000E+10],[2008, 6.21540000000000E+10]], "y": [[1990, 9.13800000000000E+09],[1991, 8.70000000000000E+09],[1992, 8.73500000000000E+09],[1993, 7.76000000000000E+09],[1994, 5.35000000000000E+09],[1995, 5.45400000000000E+09],[1996, 4.79900000000000E+09],[1997, 4.25400000000000E+09],[1998, 4.02000000000000E+09],[1999, 4.11800000000000E+09],[2000, 5.48000000000000E+09],[2001, 6.07100000000000E+09],[2002, 6.23000000000000E+09],[2003, 6.82000000000000E+09],[2004, 7.14900000000000E+09],[2005, 7.25300000000000E+09],[2006, 8.00300000000000E+09],[2007, 5.04800000000000E+09],[2008, 7.40900000000000E+09]], "size": [[1990, 8.73790000000000E+10],[1991, 8.59840000000000E+10],[1992, 8.27010000000000E+10],[1993, 7.74440000000000E+10],[1994, 6.63970000000000E+10],[1995, 6.66610000000000E+10],[1996, 5.90380000000000E+10],[1997, 5.20000000000000E+10],[1998, 4.91450000000000E+10],[1999, 4.74980000000000E+10],[2000, 5.13240000000000E+10],[2001, 5.68570000000000E+10],[2002, 5.83420000000000E+10],[2003, 6.38660000000000E+10],[2004, 6.69450000000000E+10],[2005, 6.78470000000000E+10],[2006, 7.16570000000000E+10],[2007, 7.65980000000000E+10],[2008, 8.03270000000000E+10]] },{ "name":"Bulgaria", "category":"Bulgaria","x": [[1985, 1.51740000000000E+10],[1986, 1.76070000000000E+10],[1987, 1.92000000000000E+10],[1988, 1.64690000000000E+10],[1989, 1.69610000000000E+10],[1990, 2.11800000000000E+10],[1991, 2.10000000000000E+10],[1992, 1.80160000000000E+10],[1993, 1.73980000000000E+10],[1994, 1.71480000000000E+10],[1995, 1.75610000000000E+10],[1996, 1.73970000000000E+10],[1997, 1.91780000000000E+10],[1998, 1.85670000000000E+10],[1999, 1.64860000000000E+10],[2000, 1.72070000000000E+10],[2001, 1.97570000000000E+10],[2002, 1.73730000000000E+10],[2003, 1.94620000000000E+10],[2004, 1.91070000000000E+10],[2005, 1.86250000000000E+10],[2006, 1.92060000000000E+10],[2007, 2.24630000000000E+10],[2008, 2.32200000000000E+10]], "y": [[1985, 3.25700000000000E+09],[1986, 2.34200000000000E+09],[1987, 2.80000000000000E+09],[1988, 8.70000000000000E+09],[1989, 8.28000000000000E+09],[1990, 3.18800000000000E+09],[1991, 2.88500000000000E+09],[1992, 2.76600000000000E+09],[1993, 3.04000000000000E+09],[1994, 2.55600000000000E+09],[1995, 3.21000000000000E+09],[1996, 2.98300000000000E+09],[1997, 2.01200000000000E+09],[1998, 2.01300000000000E+09],[1999, 2.01000000000000E+09],[2000, 1.91200000000000E+09],[2001, 1.90800000000000E+09],[2002, 1.53900000000000E+09],[2003, 1.76200000000000E+09],[2004, 1.49400000000000E+09],[2005, 1.72900000000000E+09],[2006, 2.15900000000000E+09],[2007, 2.33600000000000E+09],[2008, 2.36000000000000E+09]], "size": [[1985, 4.16320000000000E+10],[1986, 4.18200000000000E+10],[1987, 4.34730000000000E+10],[1988, 4.50210000000000E+10],[1989, 4.43280000000000E+10],[1990, 4.21410000000000E+10],[1991, 4.08620000000000E+10],[1992, 3.56100000000000E+10],[1993, 3.79970000000000E+10],[1994, 3.81330000000000E+10],[1995, 4.17890000000000E+10],[1996, 4.27160000000000E+10],[1997, 4.26210000000000E+10],[1998, 4.14830000000000E+10],[1999, 3.80190000000000E+10],[2000, 4.06460000000000E+10],[2001, 4.35340000000000E+10],[2002, 4.21690000000000E+10],[2003, 4.23280000000000E+10],[2004, 4.14260000000000E+10],[2005, 4.39720000000000E+10],[2006, 4.55020000000000E+10],[2007, 4.29370000000000E+10],[2008, 4.45840000000000E+10]] },{ "name":"Norway", "category":"Norway","x": [[1993, 8.90000000000000E+07],[1994, 9.90000000000000E+07],[1995, 8.50000000000000E+07],[1996, 9.10000000000000E+07],[1997, 8.00000000000000E+07],[1998, 7.90000000000000E+07],[1999, 8.30000000000000E+07],[2000, 7.20000000000000E+07],[2001, 9.50000000000000E+07],[2002, 1.33000000000000E+08],[2003, 1.30000000000000E+08],[2004, 1.06000000000000E+08],[2005, 1.32000000000000E+08],[2006, 1.37000000000000E+08],[2007, 1.37000000000000E+08],[2008, 1.33000000000000E+08]], "y": [[1993, 1.00000000000000E+07],[1994, 1.54000000000000E+08],[1995, 1.88000000000000E+08],[1996, 2.80000000000000E+08],[1997, 2.36000000000000E+08],[1998, 2.22000000000000E+08],[1999, 2.80000000000000E+08],[2000, 2.11000000000000E+08],[2001, 2.39000000000000E+08],[2002, 1.98000000000000E+08],[2003, 2.99000000000000E+08],[2004, 3.74000000000000E+08],[2005, 3.75000000000000E+08],[2006, 4.71000000000000E+08],[2007, 7.64000000000000E+08],[2008, 4.40000000000000E+08]], "size": [[1993, 1.19697000000000E+11],[1994, 1.12193000000000E+11],[1995, 1.22055000000000E+11],[1996, 1.04427000000000E+11],[1997, 1.10749000000000E+11],[1998, 1.16122000000000E+11],[1999, 1.22289000000000E+11],[2000, 1.39608000000000E+11],[2001, 1.19163000000000E+11],[2002, 1.30283000000000E+11],[2003, 1.06801000000000E+11],[2004, 1.10189000000000E+11],[2005, 1.37229000000000E+11],[2006, 1.21205000000000E+11],[2007, 1.36112000000000E+11],[2008, 1.41168000000000E+11]] },{ "name":"Germany", "category":"Germany","x": [[1960, 1.02754000000000E+11],[1961, 1.09565000000000E+11],[1962, 1.19301000000000E+11],[1963, 1.27974000000000E+11],[1964, 1.38121000000000E+11],[1965, 1.37469000000000E+11],[1966, 1.35783000000000E+11],[1967, 1.41420000000000E+11],[1968, 1.54124000000000E+11],[1969, 1.67817000000000E+11],[1970, 2.29922000000000E+11],[1971, 2.45402000000000E+11],[1972, 2.50348000000000E+11],[1973, 2.58316000000000E+11],[1974, 2.62491000000000E+11],[1975, 2.42829000000000E+11],[1976, 2.78488000000000E+11],[1977, 2.71197000000000E+11],[1978, 2.80637000000000E+11],[1979, 2.89628000000000E+11],[1980, 2.93514000000000E+11],[1981, 3.04572000000000E+11],[1982, 3.09920000000000E+11],[1983, 3.22622000000000E+11],[1984, 3.28728000000000E+11],[1985, 3.22422000000000E+11],[1986, 3.24891000000000E+11],[1987, 3.17639000000000E+11],[1988, 3.20752000000000E+11],[1989, 3.23632000000000E+11],[1990, 3.21641000000000E+11],[1991, 3.16920000000000E+11],[1992, 3.04857000000000E+11],[1993, 2.99795000000000E+11],[1994, 2.96888000000000E+11],[1995, 2.96365000000000E+11],[1996, 3.02663000000000E+11],[1997, 2.92411000000000E+11],[1998, 2.98945000000000E+11],[1999, 2.88177000000000E+11],[2000, 3.04162000000000E+11],[2001, 3.01647000000000E+11],[2002, 3.06593000000000E+11],[2003, 3.20106000000000E+11],[2004, 3.05137000000000E+11],[2005, 3.05721000000000E+11],[2006, 3.02297000000000E+11],[2007, 3.10371000000000E+11],[2008, 2.90645000000000E+11]], "y": [[1960, 8.30000000000000E+07],[1961, 1.52000000000000E+08],[1962, 1.87000000000000E+08],[1963, 6.51000000000000E+08],[1964, 1.58600000000000E+09],[1965, 2.49200000000000E+09],[1966, 3.06600000000000E+09],[1967, 3.77900000000000E+09],[1968, 6.48400000000000E+09],[1969, 9.56800000000000E+09],[1970, 1.45880000000000E+10],[1971, 2.12500000000000E+10],[1972, 2.77580000000000E+10],[1973, 4.09520000000000E+10],[1974, 6.06890000000000E+10],[1975, 6.49830000000000E+10],[1976, 6.00320000000000E+10],[1977, 6.18190000000000E+10],[1978, 6.82600000000000E+10],[1979, 7.41420000000000E+10],[1980, 6.59900000000000E+10],[1981, 5.18650000000000E+10],[1982, 4.13310000000000E+10],[1983, 4.03820000000000E+10],[1984, 3.79940000000000E+10],[1985, 2.79850000000000E+10],[1986, 2.98110000000000E+10],[1987, 3.29560000000000E+10],[1988, 3.31410000000000E+10],[1989, 3.85750000000000E+10],[1990, 4.04600000000000E+10],[1991, 3.61070000000000E+10],[1992, 3.28890000000000E+10],[1993, 3.45740000000000E+10],[1994, 4.02510000000000E+10],[1995, 4.31800000000000E+10],[1996, 4.80180000000000E+10],[1997, 4.97280000000000E+10],[1998, 5.38300000000000E+10],[1999, 5.50630000000000E+10],[2000, 5.24950000000000E+10],[2001, 5.84300000000000E+10],[2002, 5.45110000000000E+10],[2003, 5.85050000000000E+10],[2004, 6.29720000000000E+10],[2005, 6.93980000000000E+10],[2006, 7.60770000000000E+10],[2007, 7.72720000000000E+10],[2008, 8.76540000000000E+10]], "size": [[1960, 1.18069000000000E+11],[1961, 1.26335000000000E+11],[1962, 1.37271000000000E+11],[1963, 1.49254000000000E+11],[1964, 1.63556000000000E+11],[1965, 1.71445000000000E+11],[1966, 1.76683000000000E+11],[1967, 1.83448000000000E+11],[1968, 2.02141000000000E+11],[1969, 2.24573000000000E+11],[1970, 3.08771000000000E+11],[1971, 3.27249000000000E+11],[1972, 3.45881000000000E+11],[1973, 3.74352000000000E+11],[1974, 3.90563000000000E+11],[1975, 3.83770000000000E+11],[1976, 4.21423000000000E+11],[1977, 4.26053000000000E+11],[1978, 4.47974000000000E+11],[1979, 4.67573000000000E+11],[1980, 4.66340000000000E+11],[1981, 4.67737000000000E+11],[1982, 4.68109000000000E+11],[1983, 4.76810000000000E+11],[1984, 5.03233000000000E+11],[1985, 5.20560000000000E+11],[1986, 5.21813000000000E+11],[1987, 5.30467000000000E+11],[1988, 5.47109000000000E+11],[1989, 5.57397000000000E+11],[1990, 5.47650000000000E+11],[1991, 5.35826000000000E+11],[1992, 5.33672000000000E+11],[1993, 5.22487000000000E+11],[1994, 5.25205000000000E+11],[1995, 5.32814000000000E+11],[1996, 5.50691000000000E+11],[1997, 5.48011000000000E+11],[1998, 5.52375000000000E+11],[1999, 5.52545000000000E+11],[2000, 5.72313000000000E+11],[2001, 5.81886000000000E+11],[2002, 5.81954000000000E+11],[2003, 6.01543000000000E+11],[2004, 6.08490000000000E+11],[2005, 6.13438000000000E+11],[2006, 6.29388000000000E+11],[2007, 6.29546000000000E+11],[2008, 6.31211000000000E+11]] },{ "name":"New Zealand", "category":"New Zealand","x": [[1970, 8.56000000000000E+08],[1971, 7.44000000000000E+08],[1972, 1.20100000000000E+09],[1973, 1.57800000000000E+09],[1974, 1.22900000000000E+09],[1975, 1.04500000000000E+09],[1976, 1.17500000000000E+09],[1977, 9.28000000000000E+08],[1978, 6.43000000000000E+08],[1979, 3.50000000000000E+08],[1980, 4.28000000000000E+08],[1981, 2.87000000000000E+08],[1982, 4.86000000000000E+08],[1983, 6.33000000000000E+08],[1984, 9.90000000000000E+08],[1985, 7.95000000000000E+08],[1986, 4.67000000000000E+08],[1987, 5.83000000000000E+08],[1988, 5.02000000000000E+08],[1989, 4.53000000000000E+08],[1990, 6.64000000000000E+08],[1991, 4.82000000000000E+08],[1992, 1.25300000000000E+09],[1993, 7.44000000000000E+08],[1994, 6.92000000000000E+08],[1995, 9.01000000000000E+08],[1996, 9.37000000000000E+08],[1997, 1.64200000000000E+09],[1998, 1.46100000000000E+09],[1999, 1.79600000000000E+09],[2000, 1.54600000000000E+09],[2001, 2.11900000000000E+09],[2002, 2.05900000000000E+09],[2003, 3.96700000000000E+09],[2004, 4.78700000000000E+09],[2005, 5.86500000000000E+09],[2006, 5.53800000000000E+09],[2007, 3.16200000000000E+09],[2008, 4.83200000000000E+09]], "y": [[1970, 8.00000000000000E+06],[1971, 4.90000000000000E+07],[1972, 2.15000000000000E+08],[1973, 2.62000000000000E+08],[1974, 1.22000000000000E+08],[1975, 1.43000000000000E+08],[1976, 2.51600000000000E+09],[1977, 4.15500000000000E+09],[1978, 3.68000000000000E+09],[1979, 1.58000000000000E+09],[1980, 1.70400000000000E+09],[1981, 2.16200000000000E+09],[1982, 4.91000000000000E+09],[1983, 3.96300000000000E+09],[1984, 4.66600000000000E+09],[1985, 5.59800000000000E+09],[1986, 4.72900000000000E+09],[1987, 4.84200000000000E+09],[1988, 4.55600000000000E+09],[1989, 6.40300000000000E+09],[1990, 5.70900000000000E+09],[1991, 7.02100000000000E+09],[1992, 7.49500000000000E+09],[1993, 7.00000000000000E+09],[1994, 5.47500000000000E+09],[1995, 4.73600000000000E+09],[1996, 6.61500000000000E+09],[1997, 9.38900000000000E+09],[1998, 7.63000000000000E+09],[1999, 9.66100000000000E+09],[2000, 9.57200000000000E+09],[2001, 1.25830000000000E+10],[2002, 1.02430000000000E+10],[2003, 9.78800000000000E+09],[2004, 7.06200000000000E+09],[2005, 9.41700000000000E+09],[2006, 9.85100000000000E+09],[2007, 1.18420000000000E+10],[2008, 1.06520000000000E+10]], "size": [[1970, 1.39830000000000E+10],[1971, 1.54780000000000E+10],[1972, 1.76130000000000E+10],[1973, 1.85310000000000E+10],[1974, 1.88280000000000E+10],[1975, 2.05640000000000E+10],[1976, 2.14560000000000E+10],[1977, 2.18310000000000E+10],[1978, 2.22240000000000E+10],[1979, 2.20820000000000E+10],[1980, 2.25960000000000E+10],[1981, 2.34740000000000E+10],[1982, 2.49700000000000E+10],[1983, 2.64930000000000E+10],[1984, 2.74390000000000E+10],[1985, 2.77240000000000E+10],[1986, 2.85760000000000E+10],[1987, 2.91210000000000E+10],[1988, 2.98900000000000E+10],[1989, 3.13580000000000E+10],[1990, 3.22620000000000E+10],[1991, 3.32950000000000E+10],[1992, 3.28930000000000E+10],[1993, 3.42740000000000E+10],[1994, 3.48510000000000E+10],[1995, 3.59940000000000E+10],[1996, 3.64710000000000E+10],[1997, 3.71090000000000E+10],[1998, 3.76110000000000E+10],[1999, 3.78160000000000E+10],[2000, 3.92470000000000E+10],[2001, 3.99030000000000E+10],[2002, 4.06760000000000E+10],[2003, 4.07760000000000E+10],[2004, 4.25050000000000E+10],[2005, 4.29690000000000E+10],[2006, 4.36020000000000E+10],[2007, 4.37500000000000E+10],[2008, 4.38500000000000E+10]] },{ "name":"Japan", "category":"Japan","x": [[1960, 3.72000000000000E+10],[1961, 3.77000000000000E+10],[1962, 4.64000000000000E+10],[1963, 5.35000000000000E+10],[1964, 5.26000000000000E+10],[1965, 5.34000000000000E+10],[1966, 6.20000000000000E+10],[1967, 8.00000000000000E+10],[1968, 7.99000000000000E+10],[1969, 6.93000000000000E+10],[1970, 6.01000000000000E+10],[1971, 4.54000000000000E+10],[1972, 4.16000000000000E+10],[1973, 3.73000000000000E+10],[1974, 3.97610000000000E+10],[1975, 4.23170000000000E+10],[1976, 4.37700000000000E+10],[1977, 4.72770000000000E+10],[1978, 4.73980000000000E+10],[1979, 5.03450000000000E+10],[1980, 5.49350000000000E+10],[1981, 6.27880000000000E+10],[1982, 6.72810000000000E+10],[1983, 7.80940000000000E+10],[1984, 9.06400000000000E+10],[1985, 9.93340000000000E+10],[1986, 9.80680000000000E+10],[1987, 1.07538000000000E+11],[1988, 1.11054000000000E+11],[1989, 1.17557000000000E+11],[1990, 1.16706000000000E+11],[1991, 1.24618000000000E+11],[1992, 1.31677000000000E+11],[1993, 1.41264000000000E+11],[1994, 1.55453000000000E+11],[1995, 1.68666000000000E+11],[1996, 1.78127000000000E+11],[1997, 1.91183000000000E+11],[1998, 1.91981000000000E+11],[1999, 2.12130000000000E+11],[2000, 2.32250000000000E+11],[2001, 2.48116000000000E+11],[2002, 2.66377000000000E+11],[2003, 2.82304000000000E+11],[2004, 2.90540000000000E+11],[2005, 3.03552000000000E+11],[2006, 2.95433000000000E+11],[2007, 3.03747000000000E+11],[2008, 2.88698000000000E+11]], "y": [[1960, 1.00000000000000E+08],[1961, 1.00000000000000E+08],[1962, 3.00000000000000E+08],[1963, 8.00000000000000E+08],[1964, 7.00000000000000E+08],[1965, 7.24000000000000E+08],[1966, 1.36200000000000E+09],[1967, 1.41600000000000E+09],[1968, 1.48500000000000E+09],[1969, 1.73000000000000E+09],[1970, 4.50000000000000E+09],[1971, 5.50000000000000E+09],[1972, 5.50000000000000E+09],[1973, 1.05000000000000E+10],[1974, 1.53460000000000E+10],[1975, 2.02800000000000E+10],[1976, 2.43280000000000E+10],[1977, 3.62000000000000E+10],[1978, 5.41580000000000E+10],[1979, 7.29800000000000E+10],[1980, 8.11070000000000E+10],[1981, 7.85000000000000E+10],[1982, 7.90260000000000E+10],[1983, 9.06680000000000E+10],[1984, 1.22956000000000E+11],[1985, 1.28043000000000E+11],[1986, 1.29900000000000E+11],[1987, 1.35296000000000E+11],[1988, 1.40486000000000E+11],[1989, 1.50472000000000E+11],[1990, 1.67084000000000E+11],[1991, 1.79474000000000E+11],[1992, 1.78505000000000E+11],[1993, 1.78012000000000E+11],[1994, 1.91675000000000E+11],[1995, 1.95640000000000E+11],[1996, 2.07604000000000E+11],[1997, 2.17100000000000E+11],[1998, 2.24969000000000E+11],[1999, 2.43320000000000E+11],[2000, 2.51335000000000E+11],[2001, 2.50859000000000E+11],[2002, 2.54288000000000E+11],[2003, 2.63737000000000E+11],[2004, 2.52616000000000E+11],[2005, 2.39039000000000E+11],[2006, 2.63446000000000E+11],[2007, 2.89583000000000E+11],[2008, 2.82844000000000E+11]], "size": [[1960, 1.15500000000000E+11],[1961, 1.32100000000000E+11],[1962, 1.40400000000000E+11],[1963, 1.59970000000000E+11],[1964, 1.79370000000000E+11],[1965, 1.91770000000000E+11],[1966, 2.14850000000000E+11],[1967, 2.43750000000000E+11],[1968, 2.71950000000000E+11],[1969, 3.14550000000000E+11],[1970, 3.54800000000000E+11],[1971, 3.82900000000000E+11],[1972, 4.25700000000000E+11],[1973, 4.65387000000000E+11],[1974, 4.56976000000000E+11],[1975, 4.73146000000000E+11],[1976, 5.06992000000000E+11],[1977, 5.29371000000000E+11],[1978, 5.57772000000000E+11],[1979, 5.85340000000000E+11],[1980, 5.72531000000000E+11],[1981, 5.80276000000000E+11],[1982, 5.78714000000000E+11],[1983, 6.14392000000000E+11],[1984, 6.43359000000000E+11],[1985, 6.66941000000000E+11],[1986, 6.71104000000000E+11],[1987, 7.13011000000000E+11],[1988, 7.48135000000000E+11],[1989, 7.93685000000000E+11],[1990, 8.35514000000000E+11],[1991, 8.63623000000000E+11],[1992, 8.70236000000000E+11],[1993, 8.78273000000000E+11],[1994, 9.36114000000000E+11],[1995, 9.60284000000000E+11],[1996, 9.81234000000000E+11],[1997, 1.00440700000000E+12],[1998, 1.01017300000000E+12],[1999, 1.02811600000000E+12],[2000, 1.04898400000000E+12],[2001, 1.03030700000000E+12],[2002, 1.04899700000000E+12],[2003, 1.03841200000000E+12],[2004, 1.06834700000000E+12],[2005, 1.08991000000000E+12],[2006, 1.09477300000000E+12],[2007, 1.12549300000000E+12],[2008, 1.07549300000000E+12]] }];
yearMin=1960;
yearMax=2008;
xMin=1000000.0;
xMax=2.733284E12;
yMin=1000000.0;
yMax=9.15196E11;
sizeMin=3.1E8;
sizeMax=4.342979E12;


readJson = function(text, callback)
{
  callback(text ? JSON.parse(text) : null);
}

// Various accessors that specify the four dimensions of data to visualize.
function x(d) { return d.x; };
function y(d) { return d.y; };

function radius(d)
{ return d.size;
};

//function color(d) { return d.category; };
function key(d) { return d.name; };

// Chart dimensions.
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
    width = width - margin.right,
    height = height - margin.top - margin.bottom;

// Various scales. These domains make assumptions of data, naturally.
var xScale = d3.scale.log().domain([xMin, xMax]).range([0, width]),
    yScale = d3.scale.log().domain([yMin, yMax]).range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([sizeMin, sizeMax]).range([1, 40]),
    colorScale = d3.scale.category10();

// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(10, d3.format(",d")),
    yAxis = d3.svg.axis().orient("right").scale(yScale).ticks(10, d3.format(",d"));

// Create the SVG container and set the origin.
	d3.select("[view_id='D3BubbleChart']").select("svg").remove();

var svg = d3.select("[view_id='D3BubbleChart']").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Units");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Value");

// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 24)
    .attr("x", width);

// Load the data.
readJson(JSON.stringify(jsonData), function(nations) {

  // A bisector since many nation's data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });

  //      .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
//      .on("mouseout", function(){d3.select(this).style("fill", "white");})
  
  // Add a dot per nation. Initialize the data at 1800, and set the colors.
  var dot = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
      .data(interpolateData(1800))
    .enter().append("circle")
      .attr("class", "dot")
      .style("fill", function(d) { return colorScale(color(d)); })
      .call(position)
      .sort(order);

  // Add a title.
  dot.append("title")
      .text(function(d) { return d.name; });

  // Start a transition that interpolates the data based on year.
  svg.transition()
      .duration(5000)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

  // Positions the dots based on data.
  function position(dot) {
    dot .attr("cx", function(d) { return xScale(x(d)); })
        .attr("cy", function(d) { return yScale(y(d)); })
        .attr("r", function(d) { return radiusScale(d.size); });
  }

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return b.size - a.size;
  }

  // After the transition finishes, you can mouseover to change the year.
  function enableInteraction() {
    var box = label.node().getBBox();

    var yearScale = d3.scale.linear()
        .domain([yearMin, yearMax])
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

    svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

    function mouseover() {
      label.classed("active", true);
    }

    function mouseout() {
      label.classed("active", false);
    }

    function mousemove() {
      displayYear(yearScale.invert(d3.mouse(this)[0]));
    }
  }

  // Tweens the entire chart by first tweening the year, and then the data.
  // For the interpolated data, the dots and label are redrawn.
  function tweenYear() {
    var year = d3.interpolateNumber(yearMin, yearMax);
    return function(t) { displayYear(year(t)); };
  }

  // Updates the display to show the specified year.
  function displayYear(year) {
    dot.data(interpolateData(year), key).call(position).sort(order);
    label.text(Math.round(year));
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year) {
    return nations.map(function(d) {
      return {
        name: d.name,
        category: d.category,
        x: interpolateValues(d.x, year),
        size: interpolateValues(d.size, year),
        y: interpolateValues(d.y, year)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }
});

}


function MakeWordCloud(jsonData)
{



	var fill = d3.scale.category20();

	var theWords = [{name:".NET",units:10},{name:"Silverlight",units:20},{name:"jQuery",units:30},{name:"CSS3",units:20},{name:"JavaScript",units:70}];//JSON.stringify(jsonData).split(",");
	var jsonData = _.chain(jsonData)
    .groupBy("Brand")
    .map(function(value, key) {
        return {
            Brand: key,
            Value: sum(_.pluck(value, "Value"))
        }
    })
    .value();
	
	function sum(numbers) {
    return _.reduce(numbers, function(result, current) {
        return result + parseFloat(current);
    }, 0);
	}
	
	 
  cloud().size([600, 450])
		.words(jsonData.map(function(d) {
			return {text: d.Brand, size: d.Value}
			}))
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words)
	{
    d3.select("[view_id='D3CloudChart']").select("svg").remove();
	d3.select("[view_id='D3CloudChart']").append("svg")
        .attr("width", 700)
        .attr("height", 500)
      .append("g")
        .attr("transform", "translate(150,150)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}


function MakePivot(jsonData)
{
	
	theTable = $$("PivotTable");
	theConfig = theTable.config;
	theTable.ungroup();
	theTable.clearAll();
	
	var theGrouping = {by: "Brand",map:{Units:['Units','sum'], Value:['Value','sum'], Brand:["Brand"], Product:["#Products",'count']}};
	theConfig.columns = [];
	theConfig.columns.push({id:"Country",width:100, sort:"string", header:["Country",{content:"selectFilter"}]});	
	theConfig.columns.push({id:"Period",width:100, sort:"string", header:["Period",{content:"selectFilter"}]});	
	for (var i=1;i<featureKeys.length; i++)
	{
		theConfig.columns.push({id:featureKeys[i].value,width:100, sort:"string", cssFormat:cssPivot, header:[featureKeys[i].value,{content:"selectFilter"}]});
	}
	theConfig.columns.push({ id:"Units", header:["Units",{content:"numberFilter"}], width:100, sort:"int", css:{"text-align":"right"}, format:webix.Number.numToStr({groupDelimiter:"",groupSize:3,decimalDelimeter:".",decimalSize:0})});
	theConfig.columns.push({ id:"Value", header:["Value",{content:"numberFilter"}], width:100, sort:"int", css:{"text-align":"right"}, format:webix.Number.numToStr({groupDelimiter:"",groupSize:3,decimalDelimeter:".",decimalSize:0})});	
	theConfig.columns.push({ id:"AvgPrice", header:["AvgPrice",{content:"numberFilter"}], width:100, sort:"int", css:{"text-align":"right"}, format:webix.Number.numToStr({groupDelimiter:"",groupSize:3,decimalDelimeter:".",decimalSize:0})});	
	theGrouping = {};
	
	theTable.refreshColumns();//Columns();
	$$("PivotTable").parse(jsonData);
	//theTable.group(theGrouping);
}

function cssPivot(value, config)
{
	var rString = {"fill":"Red"};

    return rString;
}

function UpdatePivot(jsonData)
{
	
	var theGrouping = {by: "Brand",map:{Units:['Units','sum'], Value:['Value','sum'], Brand:["Brand"], Product:["#Products",'count']}};
	theGrouping = {};
	theTable = $$("PivotTable");
	theConfig = theTable.config;
	theTable.ungroup();
	theTable.clearAll();
	$$("PivotTable").parse(jsonData);
	//theTable.group(theGrouping);

	
}

function MakeTreemap(jsonData)
{
		
	jsonDataTreemap = JSON.parse(JSON.stringify(jsonData)); 
	
	var totalMarket = d3.sum(jsonDataTreemap, function(d) { return d[kpi]; });
	
	var width = $("[view_id='chartContainer']").innerWidth();
		var height = $("[view_id='chartContainer']").innerHeight()-30;	
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

	d3.select("[view_id='D3TreemapChart']").select("svg").remove();
	var svg = d3.select("[view_id='D3TreemapChart']").append("svg")
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
			
	}
	
	
	function MakeSunburst(jsonData)
	{
		
		jsonDataSunburst = JSON.parse(JSON.stringify(jsonData)); 

		var width = $("[view_id='chartContainer']").innerWidth();
		var height = $("[view_id='chartContainer']").innerHeight()-60;	
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

	
	//d3.select("[view_id='D3Link']").remove(); 
	$$("D3Link").setValue("");
	d3.select("[view_id='D3SunburstChart']").select("svg").remove();
	var div = d3.select("[view_id='D3View']").append("div")   
		.attr("class", "tooltip")               
		.style("opacity", 0);

	gSunburst = d3.select("[view_id='D3SunburstChart']").append("svg")	
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
				var minRadians = minShare/10 * 0.01; // 0.005 radians = 0.29 degrees			
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

		function click(d) {
			path.transition()
			  .duration(duration)
			  .attrTween("d", arcTween(d));

		// Somewhat of a hack as we rely on arcTween updating the scales.
		gSunburst.selectAll("text").data(nodes).style("Visibility", function(e) {
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
		function mouseover(d) {
		
		var percentage = (100 * d.value / path.node().__data__.value).toPrecision(3);
		var percentageRelative = (100 * d.value / d.parent.value).toPrecision(3);  
		var percentageString = "Abs: "+percentage + "% ";
		if (percentage !== percentageRelative) percentageString +=  "Rel: " + percentageRelative + "% "
		var percentageStringLong =  percentageString + kpi + ": " + parseInt( d.value ).toLocaleString();

		var sequenceArray = getAncestors(d);
		updateBreadcrumbs(sequenceArray, percentageStringLong);


		

		  
		  // Fade all the segments.
		  d3.selectAll("path")
			  .style("opacity", 0.3);

		  // Then highlight only those that are an ancestor of the current segment.
		  gSunburst.selectAll("path")
			  .filter(function(node) {
						return (sequenceArray.indexOf(node) >= 0);
					  })
			  .style("opacity", 1);
			  
			  div.transition()        
					.duration(1000)      
					.style("opacity", .9);      
				div .html(percentageString)  
					.style("left", (d3.event.pageX) + "px")     
					.style("top", (d3.event.pageY - 28) + "px");  
					
				
		}


		// Restore everything to full opacity when moving off the Visualization.
		function mouseleave(d) {

		
		  // Hide the tooltip
		 div.transition()        
					.duration(500)      
					.style("opacity", 0);   
					

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

		  d3.select("#explanation")
			  .transition()
			  .duration(1000)
			  .style("Visibility", "hidden");
		}

		// Given a node in a partition layout, return an array of all of its ancestor


	} //MakeSunburst

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
	  d3.select("[view_id='D3Sequence']").select("svg").remove();

	  var trail = d3.select("[view_id='D3Sequence']").append("svg:svg")
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
	$$("D3Link").setValue(theLink);

	}

	
	});  //JSON LOad

	}); // document ready
}
	</script>

	<script>
	  if (top != self) top.location.replace(location);
	</script>
