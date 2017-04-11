"use strict";

var grads = {};

grads.problems = [
  {
    description: "What is truth?",
    code: "function problem() { return __; }"
  },
  {
    description: "Simple Math",
    code: "function problem() { return 42 === 6 * __; }"
  }
];

grads.applyObject = function(obj, elem) {
  for (var key in obj) {
    elem.find('[data-name="' + key + '"]').text(obj[key]);
  }
};

grads.dataTableView = function(data) {
  var problemNumber = parseInt(data, 10);
  var view = $('.templates .dataTableView').clone();
  
  return view;
}

grads.showView = function(hash) {
  var routes = {
    '#dataTableView': grads.dataTableView,
    '#': grads.landingView,
    '': grads.landingView
  };
  var hashParts = hash.split('-');
  var viewFn = routes[hashParts[0]];
  if (viewFn) {
    grads.triggerEvent('removingView', []); 
    $('.view-container').empty().append(viewFn(hashParts[1]));
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

grads.triggerEvent = function(name, args) { $('.view-container>*').trigger(name, args);
}
