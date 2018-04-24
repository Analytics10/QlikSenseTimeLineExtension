# QlikSenseTimeLineExtension

This proyect is based in Google Chart API and extension TimeLineChart by KAI https://github.com/kai/qlik-sense-timeline

# [Qlik Sense](http://global.qlik.com/uk/explore/products/sense) Timeline Chart

- GitHub URL: https://github.com/Analytics10/QlikSenseTimeLineExtension
- Qlik Branch URL: 

## Screenshot

![image](https://www.analytics10.com/lab/extensiondoc/presentacion.png)

## Overview

Provider an easy-to-understand history and help viewers to understand past and ongoing trends.
A timeline is the presentation of a chronological sequence of events along a drawn line that enables a viewer to understand temporal relationships quickly.

The Qlik Sense Time Line Extension is a chart extension for the use in [Qlik Sense](http://global.qlik.com/uk/explore/products/sense) Desktop or Server. 
It is versatile chart that allows you to depict how multiple artifacts, be they projects or resources, are active/used over time in relation to each other.


The Qlik Sense timeline extension uses the [Google Chart API](https://developers.google.com/chart/interactive/docs/gallery/timeline).

## Usage
To use the extension you must have the following loading order of dimensions:

Use 3 or 4 dimensions (no measures):

- Dim 1 (required): Main dimension and row label
- Dim 2 (optional): Bar label
- Dim 3 (required): start date, format YYYY-MM-DD (ISO)
- Dim 4 (required): end date, format YYYY-MM-DD (ISO)

Example configuration using four dimensions (with optional bar labels):

![image](https://www.analytics10.com/lab/extensiondoc/ordenDim.png)

If you do not have YYYY-MM-DD (ISO) format, you can select the format in the appearance options:
![image](https://www.analytics10.com/lab/extensiondoc/tipoFecha.png)

## Custom settings:

Additional parameters can be set to change the appearance of the chart:

- Show row name: Shows or hides the row labels in column 1.
- Group rows: Groups labels with the same name into a single row.
- Date format: Select the date format in which your data is found.
- Color by row name: By default it is found with the colors of A10, if it is selected you can choose a color for all the rows.
- Background color: Select a background color.
- Avoid overlapping lines: You can avoid overlapping grid lines.
- Row text style: You can select the row text size.
- Bar text style: You can select the bar text size.
- Min / Max years: You can set minimum year to show, and maximum year to show.
 
![image](https://www.analytics10.com/lab/extensiondoc/opciones.png)


