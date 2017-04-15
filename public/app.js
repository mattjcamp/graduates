"use strict";

var grads = {};

grads.overviewView = function(data) {
  var view = $('.templates .overviewView').clone();
  return view;
}

grads.show_table = function() {
  var vlSpec = {
    "data": {
        "url": "data/grads_us.csv"
      },
      "width": 400,
      "mark": "line",
      "encoding": {
          "x": {
          "timeUnit": "year",
          "field": "year"
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
  if (hashParts[0] == "#overviewView")
    grads.show_table();
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
