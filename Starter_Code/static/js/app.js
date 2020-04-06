
d3.json("samples.json").then(function(data){
    console.log(data)

    buildPlots(0)
    function buildPlots(i){
        var sampleValues = data.samples[i].sample_values.slice(0, 10).reverse();
        var labels = data.samples[i].otu_ids.slice(0,10).reverse();
        var TenLabels = labels.map((otu =>"OTU"+otu));
        var hoverData = data.samples[i].otu_labels.slice(0,10).reverse
        
        var trace1 ={
            x: sampleValues,
            y: TenLabels,
            text: hoverData,
            type: "bar",
            orientation: "h"
        }

        var barData = [trace1]

        var layout1 = {
            title: "Top Ten OTUs",
            }
        Plotly.newPlot("bar", barData, layout1);
        
        trace2 = {
            x: labels,
            y: sampleValues,
            text: hoverData,
            mode: "markers",
            marker: {
                color: labels,
                size: sampleValues
                }
             }

        var bubbleData =[trace2]
        var layout2 = {
            title: 'OTU Frequency'
            }

            Plotly.newPlot("bubble", bubbleData, layout2)

            var dKeys = Object.keys(data.metadata[i]);
            var dValues = Object.values(data.metadata[i])
            var Table = d3.select('#sample-metadata');
            Table.html("");
        for (var i = 0; i < dKeys.length; i++) {
          Table.append("p").text(`${dKeys[i]}: ${dValues[i]}`);
        };
        

    d3.selectAll("#selDataset").on("change", dropDownRefresh)
    var sampleNums = data.names
    for (var i =0; i<sampleNums.length; i++){
        dropdown = d3.select("#selDataset").append("option").text(sampleNums[i])
    }
    function dropDownRefresh(){
        var selectionID = d3.select("#selDataset").property("value");
      for (var i = 0; i < sampleNums.length; i++) {
        if (selectionID === sampleNums[i]) {
          buildPlots(i);
          return
            }
        }  
    
    }
}
   
})



