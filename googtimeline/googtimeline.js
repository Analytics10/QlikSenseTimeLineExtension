// Hacked together aimlessly by Kai Hilton-Jones
// Improved by Tim Payne

require.config({
	paths : {
		//create alias to plugins
		async : '/extensions/googtimeline/async',
		googT : '/extensions/googtimeline/goog',
		propertyParser : '/extensions/googtimeline/propertyParser',
	}
});
define(["jquery", 'googT!visualization,1,packages:[corechart,table,timeline]'], function($) {'use strict';
	var palette = [ "#033146", "#3adcad", "#24f2c5", "#179b96", "#106b7c", "#0f5e88", "#199edd", "#5ea1ce", "#1b7f62", "#549f15", "#1bc2a1", "#719e91" ];
	// var palette = [];
	return {
		initialProperties : {
			version : 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 20,
					qHeight : 400
				}]
			},
			chartType : "timeline",
			showRowLabels : true,
			groupByRowLabel : false
		},
		//property panel
		definition : {
			type : "items",
			component : "accordion",
			items : {
				dimensions : {
					uses : "dimensions",
					min : 3,
					max : 4
				},
				sorting : {
					uses : "sorting"
				},
				settings : {
					uses : "settings",
					type : "items", 
					items : 
					{
						mostrarNombreFila : { 
							label : "Mostrar nombre de fila", 
							type : "items",
							items:{ 
								mostrarNombreFila : {
									type : "boolean",
									component : "switch",
									label : "Mostrar Id de filas",
									ref : "showRowLabels",
									options : [{
										value : true,
										label : "On"
									},{
										value : false,
										label : "Off"
									}]
								},
								text: {
								    label:"Si desea mostrar el 'id' de las filas seleccione la opción 'On'",
								    component: "text"
								},
							} 
						},
						agruparFilas : { 
							label : "Agrupar filas", 
							type : "items",
							items:{ 
								agruparFilas : {
									type : "boolean",
									component : "switch",
									label : "Agrupar filas por Id",
									ref : "groupByRowLabel",
									options : [{
										value : true,
										label : "On"
									},{
										value : false,
										label : "Off"
									}]
								},
								text: {
								    label:"Si desea agrupar las filas por sus 'id' seleccione la opción 'On'",
								    component: "text"
								},
							} 
						},
						formatNumber : { 
							label : "Formato de Fecha", 
							type : "items",
							items:{ 
								formatNumber:{
									type: "string",
									component:"radiobuttons",
									label: "Selecciona tu formato de fecha",
									ref:"myFormatSelection",
									options:[
									{
										label:"yyyy-mm-dd",
										value: "1"
									},{
										label:"mm-dd-yyyy",
										value: "2"
									},{
										label:"dd-mm-yyyy",
										value: "3"
									},{
										label:"yyyy-dd-mm",
										value: "4"
									},{
										label:"dd/mm/yyyy",
										value: "5"
									},{
										label:"mm/dd/yyyy",
										value: "6"
									},{
										label:"yyyy/mm/dd",
										value: "7"
									},{
										label:"yyyy/dd/mm",
										value: "8"
									}],
									defaultValue: "1",
								},
								text: {
								    label:"Por favor escoja el formato de fecha en el cual vienen sus datos, para una correcta visualización del timeline",
								    component: "text"
								},
							} 
						},
						
						secondGroup : { 
							label : "Colorear por nombre de fila", 
							type : "items", 
							items:{ 
								optionalProp: { 
									ref: "optionalProp",
									component: "switch",
									type: "boolean", 
									label: "Un solo color",
									options : [{
										value : true,
										label : "On"
									},{
										value : false,
										label : "Off"
									}],
									defaultValue: false 
								},
								text: {
								    label:"Si desea colocar un solo color para las barras seleccione la opción 'On'",
								    component: "text"
								},
								stringSingleColor: {
									label:"Seleccionar Color",
									component: "color-picker",
									ref: "singleColor",
									type: "object",
									defaultValue: {
										color: "#002B40"
									},
									show: function(layout) { return layout.optionalProp }
								}
							} 
						},
						backgroundColorGroup : { 
							label : "Color de fondo", 
							type : "items",
							items:{ 
								optionalBackground: { 
									ref: "optionalBackground",
									component: "switch",
									type: "boolean", 
									label: "Color de fondo",
									options : [{
										value : true,
										label : "On"
									},{
										value : false,
										label : "Off"
									}],
									defaultValue: false
								},
								text: {
								    label:"Si desea colocar un color de fondo deje la opción 'On'",
								    component: "text"
								},
								stringBackgroundColor: {
									label:"Selecionar color de fondo",
									component: "color-picker",
									ref: "backgroundColor",
									type: "object",
									defaultValue: {
										color: "#002B40"
									},
									show: function(layout) { return layout.optionalBackground }
								}
							} 
						},
						OverlappingGrid : { 
							label : "Evita superponer líneas", 
							type : "items",
							items:{ 
								OverlappingGrid : {
									type : "boolean",
									component : "switch",
									label : "Evita superponer líneas de cuadrícula",
									ref : "avoidOverlappingGridLines",
									options : [{
										value : true,
										label : "On"
									},{
										value : false,
										label : "Off"
									}],
									defaultValue: false,
								},
								text: {
								    label:"Si desea evitar superponer las líneas deje la opción 'On'",
								    component: "text"
								},
							} 
						},
						rowLabelStyle: {
							label: "Estilo texto de fila",
							type : "items", 
							items: {
								slider: {
								    type: "number",
								    component: "slider",
								    label: "Tamaño texto de fila",
								    ref: "rowLabelSize",
								    min: 4,
								    max: 25,
								    step: 0.5,
								    defaultValue: 13
								},
								rowLabelNumber: {
									type: "number",
									label: "Tamaño texto de fila",
									ref: "rowLabelSize",
									defaultValue: "13",
									min: 4,
								    max: 25

								},
								// rowLabelTheme: {
								// 	type: "string",
								// 	label: "Row label theme",
								// 	ref: "rowLabelTheme",
								// 	defaultValue: "Arial"
								// }
								text: {
								    label:"Ingrese el tamaño de letra, con el cual desea ver el texto en el id de la fila, se recomienda entre 4 y 25 el tamaño",
								    component: "text"
								},
							}
						},
						barLabelStyle: {
							label: "Estilo texto de barra",
							type : "items", 
							items: {
								slider: {
								    type: "number",
								    component: "slider",
								    label: "Tamaño texto de barra",
								    ref: "barLabelSize",
								    min: 4,
								    max: 25,
								    step: 0.5,
								    defaultValue: 14
								},
								rowLabelNumber: {
									type: "number",
									label: "Tamaño texto en barra",
									ref: "barLabelSize",
									defaultValue: "14",
									min: 4,
								    max: 25
								},
								// rowLabelTheme: {
								// 	type: "string",
								// 	label: "Bar label theme",
								// 	ref: "barLabelTheme",
								// 	defaultValue: "Arial"
								// }
								text: {
								    label:"Ingrese el tamaño de letra, con el cual desea ver el texto en la barra de color (en caso que haya añadido una cuarta dimensión (contenido)), se recomienda entre 4 y 25 el tamaño",
								    component: "text"
								},
							},
						},
						distanciaAnios : { 
							label : "Min/Max Años", 
							type : "items",
							items:{ 
								optionalMin: { 
									ref: "optionalMin",
									component: "switch",
									type: "boolean", 
									label: "Establecer año mínimo a mostrar",
									options : [{
										value : true,
										label : "On"
									},{
										value : false,
										label : "Off"
									}],
									defaultValue: false
								},
								stringMinAnio: {
									type: "number",
									label: "Año mínimo a mostrar",
									ref: "minimoanio",
									defaultValue: "1300",
									show: function(layout) { return layout.optionalMin }
								},
								optionalMax: { 
									ref: "optionalMax",
									component: "switch",
									type: "boolean", 
									label: "Establecer máximo de años",
									options : [{
										value : true,
										label : "On"
									},{
										value : false,
										label : "Off"
									}],
									defaultValue: false
								},
								stringMaxAnio: {
									type: "number",
									label: "Año máximo a mostrar",
									ref: "maxanio",
									defaultValue: "2050",
									show: function(layout) { return layout.optionalMax }
								},
								text: {
								    label:"Si desea establecer un año máximo/mínimo deje la opción 'On', en caso de existir en los datos una fecha mayor/menor, por defecto se establece esa como máxima/mínima",
								    component: "text"
								},
							} 
						}
					}
				},
				informacion:{
					label:"Información",
					type: "items",
					items:{
						button: {
						    label:"Información",
						    component: "button",
						    action: function(data){
						        alert("Esta extensión se llama '"+data.visualization+"' perteneciente a Analytics10 https://www.analytics10.com .");
						    },
						},
						text: {
						    label:"Para el correcto uso de esta extensión debe como mínimo agregar 3 dimensiones en el siguiente orden: 'id', 'fecha inicio', 'fecha termino'. Puede agregar una 4 dimensión en el siguiente orden: 'id', 'contenido', 'fecha inicio', 'fecha termino'. Si las fechas no son correctamente leídas, por favor seleccione en que formato vienen en las opciones del menú lateral derecho en 'Aspecto'. Extensión creada por analytics10.",
						    component: "text"
						},
						link: {
						    label:"https://analytics10.com",
						    component: "link",
						    url:"https://analytics10.com"
						},
					}
				}
			}
		},
		snapshot : {
			canTakeSnapshot : true
		},

		paint : function($element, layout) {
			// var _this = this,
   //                  //app = qlik.currApp();
   //                  qData = layout.qHyperCube.qDataPages[0];
   //                  // id = layout.qInfo.qId,
   //                  // containerId = 'timeline-container_' + id,
   //                  // groupNames = [],
   //                  // groups = {},
   //                  // useGroups = false

			// Para la paleta de colores
			// layout.backgroundColor.index = layout.backgroundColor.index -1;
			// $element.css("single-color", palette[layout.singleColor.color]);
			// $element.css("background-color", palette[layout.backgroundColor.color]);

			var self = this, elemNos = [], errores = [], dimCount = this.backendApi.getDimensionInfos().length;
			var data = new google.visualization.DataTable();
			// Inicializando y agregando datos de dimensiones
			data.addColumn({ type: 'string', id: 'Campaign' });
			if(dimCount==4) {
				data.addColumn({ type: 'string', id: 'Name' });
			}
        	data.addColumn({ type: 'date', id: 'Start' });
        	data.addColumn({ type: 'date', id: 'End' });
        	// Fin inicialización de datos

			this.backendApi.eachDataRow(function(key, row) {
				var values = [];
				
				row.forEach(function(cell, col) {
					
					//values.push(cell.qText);
					if(dimCount==4) {
						if(col<2)
						{
							values.push(cell.qText);
						} else {
							if (!isNaN(cell.qText) || cell.qText == undefined || cell.qText == "-") {
								errores.push("Existe una fecha vacía en la dimensión "+(col+1)+", es probable que aparezca vacía en la línea de tiempo");
							}
							if (myDate instanceof Date && !isNaN(myDate.valueOf())) {
								myDate = cell.qText;
							}else{
								var myDate = formatDate(cell.qText);
								// var myDate = new Date(cell.qText.replace(/-+/g, '/'));
							}
							values.push(myDate);
						}
					} else {
						if(col<1)
						{
							values.push(cell.qText);
						} else {

							if (!isNaN(cell.qText) || cell.qText == undefined || cell.qText == "-") {
								errores.push("Existe una fecha vacía en la dimensión "+(col+1)+", es probable que aparezca vacía en la línea de tiempo");
							}
							if (myDate instanceof Date && !isNaN(myDate.valueOf())) {
								myDate = cell.qText;
							}else{
								var myDate = formatDate(cell.qText);
							}
							values.push(myDate);
						
						}
					}

					// Estructurando la fecha para ser leída
					function formatDate(date) {
						// debe quedar con la estructura YYYY-MM-DD
						switch(layout.myFormatSelection) {
							// yyyy-mm-dd
						    case "1":
						    	// var parts = date.split('-');
						    	var myDate = new Date(date.replace(/-+/g, '/'));
						        // return parts[0] + '-' + (parts[1]) + '-' + parts[2];
						        return myDate;
						        break;
						    case "2":
						    // mm-dd-yyyy
						    	var parts = date.split('-');
						    	var myDate = (parts[2] + '-' + (parts[0]) + '-' + parts[1]);
						        // return parts[2] + '-' + (parts[0]) + '-' + parts[1];
						        myDate = new Date(myDate.replace(/-+/g, '/'));
					        	return myDate;
						        break;
					        case "3":
					        // dd-mm-yyyy
					        	var parts = date.split('-');
					        	var myDate = (parts[2] + '-' + (parts[1]) + '-' + parts[0]);
					        	myDate = new Date(myDate.replace(/-+/g, '/'));
					        	return myDate;						
						        // return parts[2] + '-' + (parts[1]) + '-' + parts[0];
						        break;
						    case "4":
					        // yyyy-dd-mm
					        	var parts = date.split('-');
					        	var myDate = (parts[0] + '-' + (parts[2]) + '-' + parts[1]);
					        	myDate = new Date(myDate.replace(/-+/g, '/'));
					        	return myDate;								
						        // return parts[0] + '-' + (parts[2]) + '-' + parts[1];
						        break;
						    case "5":
					        // dd/mm/yyyy
					        	var parts = date.split('/');
					        	var myDate = (parts[2] + '-' + (parts[1]) + '-' + parts[0]);
					        	myDate = new Date(myDate.replace(/-+/g, '/'));
					        	return myDate;							
						        // return parts[2] + '-' + (parts[1]) + '-' + parts[0];
						        break;
						    case "6":
					        // mm/dd/yyyy
					        	var parts = date.split('/');
					        	var myDate = (parts[2] + '-' + (parts[0]) + '-' + parts[1]);
					        	myDate = new Date(myDate.replace(/-+/g, '/'));
					        	return myDate;							
						        // return parts[2] + '-' + (parts[0]) + '-' + parts[1];
						        break;
					        case "7":
					        // yyyy/mm/dd
					        	var parts = date.split('/');
					        	var myDate = (parts[0] + '-' + (parts[1]) + '-' + parts[2]);
					        	myDate = new Date(myDate.replace(/-+/g, '/'));
					        	return myDate;							
						        // return parts[0] + '-' + (parts[1]) + '-' + parts[2];
						        break;
						    case "8":
					        // yyyy/dd/mm
					        	var parts = date.split('/');
					        	var myDate = (parts[0] + '-' + (parts[2]) + '-' + parts[1]);
					        	myDate = new Date(myDate.replace(/-+/g, '/'));
					        	return myDate;							
						        // return parts[0] + '-' + (parts[2]) + '-' + parts[1];
						        break;
						    default:
						    	// var parts = date.split('-');
						    	// var myDate = (parts[0] + '-' + (parts[1]) + '-' + parts[2]);
					      //   	myDate = new Date(myDate.replace(/-+/g, '/'));
					      		var myDate = new Date(date.replace(/-+/g, '/'));
					        	return myDate;
						        // return parts[0] + '-' + (parts[1]) + '-' + parts[2];
						}

					  // return parts[2] + '-' + (parts[1] - 1) + '-' + parts[0];
					}

					
				});
				data.addRows([values]);
				//selections will always be on first dimension
				elemNos.push(row[0].qElemNumber);
			});
			
			var chart = new google.visualization.Timeline($element[0]);

			if (!layout.optionalProp) {layout.singleColor=null;}
			if (!layout.avoidOverlappingGridLines) {layout.avoidOverlappingGridLines=false;}
			if (layout.rowLabelSize==="undefined") {layout.rowLabelSize="13";}
			// if (layout.rowLabelTheme==="undefined") {layout.rowLabelTheme="Arial";}
			if (layout.barLabelSize==="undefined") {layout.barLabelSize="14";}
			// if (layout.barLabelTheme==="undefined") {layout.barLabelTheme="Arial";}
			if (!layout.optionalBackground) {
				layout.backgroundColor.color = null;
			}
			if(!layout.optionalMin){
				layout.minimoanio = null;
			}else{
				if (layout.minimoanio == undefined) {
					var varmin = new Date(1300, 0, 0);
				}else{
					var varmin = new Date(layout.minimoanio, 0, 0);
				}
			}
			if(!layout.optionalMax){
				var varmax = null;
			}else{
				if (layout.maxanio == undefined) {
					var varmax = new Date(2050, 0, 0);
				}else{
					var varmax = new Date(layout.maxanio, 0, 0);
				}
			}

			var options = {
				chartArea : {
					left : 20,
					top : 20,
					width : "auto",
					height : "auto"
				},
				colors: [ "#033146", "#3adcad", "#24f2c5", "#179b96", "#106b7c", "#0f5e88", "#199edd", "#5ea1ce", "#1b7f62", "#549f15", "#1bc2a1", "#719e91" ],
				hAxis: {
					minValue: varmin,
					maxValue:  varmax
				},
				timeline: { showRowLabels : layout.showRowLabels, 
							groupByRowLabel : layout.groupByRowLabel,
							singleColor: layout.singleColor,
							colorByRowLabel: layout.colorByRowLabel,
							// rowLabelStyle: {fontName: layout.rowLabelTheme, fontSize: layout.rowLabelSize },//primer columna
							// barLabelStyle: { fontName: layout.barLabelTheme, fontSize: layout.barLabelSize } //siguientes columnas
							rowLabelStyle: {fontName: "Arial", fontSize: layout.rowLabelSize },//primer columna
							barLabelStyle: { fontName: "Arial", fontSize: layout.barLabelSize } //siguientes columnas
				},
				backgroundColor: layout.backgroundColor.color,
				avoidOverlappingGridLines: layout.avoidOverlappingGridLines
			};


			chart.draw(data, options);
			// chart.draw(data, {
			// 	chartArea : {
			// 		left : 20,
			// 		top : 20,
			// 		width : "100%",
			// 		height : "100%"
			// 	},
			// 	timeline: { showRowLabels : layout.showRowLabels, 
			// 				groupByRowLabel : layout.groupByRowLabel,
			// 				singleColor: layout.singleColor,
			// 				// colors: ['#cbb69d', '#603913', '#c69c6e'],
			// 				colorByRowLabel: layout.colorByRowLabel,
			// 				rowLabelStyle: {fontName: 'Arial', fontSize: 13 } },
			// 	avoidOverlappingGridLines: false
			// });

			//selections
			var selections = [];
			var tim= [];
			for(var i=0;i<errores.length;i++){
				google.visualization.errors.addError($element[0], errores[i], 'error', {'showInTooltip': true, 'type' : 'error', 'removable': true});
			}
			google.visualization.events.addListener(chart, 'select', function(e) {
				var sel = chart.getSelection();
				// tim=sel;
				// sel.forEach(function(val) {
					// console.log(sel);
					selections[0]=elemNos[sel[0].row];
					// console.log("seleccion",selections);
					self.selectValues(0, selections, true);
				//});
				// chart.setSelection(tim);
				// selections = selections.concat(sel);
			});

			// chart.setSelection([]);
			// chart.setSelection(tim);

		}
	};

});
