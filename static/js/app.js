function createCharts(subject) {
    d3.json("samples.json").then((data) => {
        let subjects = data.samples;
        let result = (subjects.filter(sample => sample.id == subject))[0];
        let sample_values = result.sample_values;
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_names = data.names;
        //Build Bar chart

        let ticks = otu_ids.slice(0, 10);
        let values = sample_values.slice(0, 10);
        let labels = otu_labels.slice(0, 10);

        let trace = {
            x: values,
            y: ticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        barChartData = [trace];

        let barLayout = {
            title: "top 10 OTUs found in Subject Culture",
            // margin: { t: 35, l: 150},
            hovermode: "closest"
        };

        Plotly.newPlot("bar", barChartData, barLayout);

        //Build Bubble Chart

        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Portland"
            }
        };

        bubbleData = [trace2];

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            xaxis: {title: "OTU ID"},
            hovermode: "closest"

        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

function init() {


    //adding values to the dropdown
    d3.json("samples.json").then((data) => {
        let names = data.names;

        //DOM manipulation 
        names.forEach((name) => {
            //adding the options for dropdown through D3 DOM selection and manipulation
            d3.select("#selDataset").append('option').attr('value', name).text(name)
        });
        //visualizations upon site startup
        createCharts(names[0])
    });
}

function optionChanged(option) {
    createCharts(option);
}

init();