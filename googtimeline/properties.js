define( [], function () {
    'use strict';

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses : "dimensions",
        min : 3,
        max : 4
    };
    var sorting = {
        uses : "sorting"
    };

    // var measures = {
    //     uses: "measures",
    //     min: 0,
    //     max: 1
    // };

    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    var appearanceSection = {
        uses: "settings",
        items : 
        {
            selection1 : 
            {
                type : "boolean",
                component : "switch",
                label : "Show Row Labels",
                ref : "showRowLabels",
                options : [{
                    value : true,
                    label : "On"
                },{
                    value : false,
                    label : "Off"
                }]
            },
            selection2 : 
            {
                type : "boolean",
                component : "switch",
                label : "Group Row Label",
                ref : "groupByRowLabel",
                options : [{
                    value : true,
                    label : "On"
                },{
                    value : false,
                    label : "Off"
                }]
            },
            formatNumber:{
                type: "string",
                component:"radiobuttons",
                label: "Select your date format",
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
            colorByRowLabel : 
            {
                type : "boolean",
                component : "switch",
                label : "color By Row Label",
                ref : "colorByRowLabel",
                options : [{
                    value : true,
                    label : "On"
                },{
                    value : false,
                    label : "Off"
                }],
                defaultValue: "On",
            },
            stringSingleColor: {
                type: 'string',
                component: 'dropdown',
                label: 'Single Color',
                ref: 'singleColor',
                options: [{
                    value: '',
                    label: null
                }, {
                    value: '#8d8',
                    label: '#8d8'
                }, {
                    value: '#ffd',
                    label: '#ffd'
                }]
            },
        }
    };

    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************

    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            sorting: sorting,
            // measures: measures,
            appearance: appearanceSection

        }
    };

} );