
// A simple, configurable, D3 data table

function WCL_Data_Table() {

 var alternating_row_style_id = function(d, i) {
    if ((i % 2) === 1)
      return "alt_tr";
    else
      return i;
  };

  function me(selection) {

    selection.each(function(data, i) {

      // INITIAL TABLE BUILD

      d3.select(this).selectAll('table').remove();
      var d3table = d3.select(this).append('table');
      var thead = d3table.append("thead");
      var tbody = d3table.append("tbody");

      // COLUMNS

      var columns = Object.getOwnPropertyNames(data[0]);

      thead.append("tr").selectAll("td")
           .data(columns)
           .enter()
           .append("td")
           .text(function(d) { return d });

      // ROWS
  
      var tr = tbody.selectAll("tr")
                        .data(data)
                        .enter()
                        .append("tr")
                        .attr("id", function(d, i) {
                            return(alternating_row_style_id(d, i));
                          });
  
      for (c in columns)
        tr.append('td')
          .text(function(d) {
            if(!isNaN(d[columns[c]]))
              return d3.format(",")(d[columns[c]]);
            else
              return (d[columns[c]]);
            });
 
    });
    
  }

  me.alternating_row_style_id = function(_) {
      if (!arguments.length) return alternating_row_style_id;
      alternating_row_style_id = _;
      return me;
  };

  return me;
}