"use strict";

var grads = {};

grads.overviewView = function(data) {
  var view = $('.templates .overviewView').clone();
  return view;
}

grads.show_data_table = function() {

  var data_table = WCL_Data_Table();

  d3.csv("data/grads_us.csv", function(data) {
    data_table(d3.select("#datatable").datum(data));
  });
}

grads.show_table = function() {
  var vlSpec = {
    "data": {
        "url": "data/grads_us.csv"
      },
    "transform": [
        {"calculate": "datum.year", "as": "ay"},
        {"filter": "datum.ay < 2012"}],
      "width": 400,
      "mark": "line",
      "encoding": {
          "x": {
          "timeUnit": "year",
          "field": "ay",
          "axis": {
            "ticks":true,
            "tickCount":10
            },
          },
          "y": {
          "aggregate": "sum",
          "field": "n"
        }
      }

  };
  var opt = {
    "mode": "vega-lite",
    "actions" : false
  };
  vega.embed("#vis", vlSpec, opt, function(error, result) {
    // Callback receiving the View instance and parsed Vega spec
    // result.view is the View, which resides under the '#vis' element

  });

}

grads.showView = function(hash) {
  var routes = {
    '#overviewView': grads.overviewView,
    '#': grads.landingView,
    '': grads.landingView
  };
  var hashParts = hash.split('-');
  var viewFn = routes[hashParts[0]];
  
  if (viewFn) {
    grads.triggerEvent('removingView', []); 
    $('.view-container').empty().append(viewFn(hashParts[1]));
  }
  console.log(hashParts[0]);
  if (hashParts[0] == "#overviewView"){
    grads.show_table();
    //grads.show_data_table();
  }

}

grads.appOnReady = function() {
  window.onhashchange = function() {
    grads.showView(window.location.hash);
  };
  grads.showView(window.location.hash);
}

grads.template = function(name) {
  return $('.templates .' + name).clone();
}

grads.landingView = function() {
  return grads.template('landing-view');
}

grads.triggerEvent = function(name, args) { 
  $('.view-container>*').trigger(name, args);
}
