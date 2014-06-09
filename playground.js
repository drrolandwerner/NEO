	//var jsonDataBrand = [];
	
		var jsonDataBrand = _.chain(jsonData)
			.groupBy("Country")
			.map(function(value, country) {
				return _.chain(value)
					.groupBy("Period")
					.map(function(value1, period) {					
						return _.chain(value1)
							.groupBy("Brand")
							.map(function(value2, brand) {
								return {
									Country: country,
									Brand: brand,
									Period: period,
									Units: sum(_.pluck(value2, "Units")),
									Value: sum(_.pluck(value2, "Value"))
								}
							})
							.value();
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
			for (i=0;i<jsonDataBrand[0].length;i++)
			{
				var objectArray = jsonDataBrand[0][i];
				var data = new Array();
				var name = "";
				for (k=0;k<objectArray.length;k++)
				{
					//periodSplit = objectArray[k].Period.split("-");
					//seriesData.push({Name: objectArray[k].Name, Period: new Date(periodSplit[0],periodSplit[1]), Units: objectArray[k].Units, Value: objectArray[k].Value});
					seriesData.push({Country: objectArray[k].Country, Period: objectArray[k].Period, Brand: objectArray[k].Brand, Units: objectArray[k].Units, Value: objectArray[k].Value});
				}
				seriesData.push(data); 
			}
	