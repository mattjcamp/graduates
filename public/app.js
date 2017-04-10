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

grads.problemView = function(data) {
  var problemNumber = parseInt(data, 10);
  var view = $('.templates .problem-view').clone();
  var problemData = grads.problems[problemNumber - 1]; 
  var resultFlash = view.find('.result'); 

  function checkAnswer() { 
    var answer = view.find('.answer').val();
    var test = problemData.code.replace('__', answer) + '; problem();';
    return eval(test);
  }

  function checkAnswerClick() {
    if (checkAnswer()) {
      var correctFlash = grads.template('correct-flash'); 
      correctFlash.find('a').attr('href', '#problem-' + (problemNumber + 1)); 
      grads.flashElement(resultFlash, correctFlash);
    } else {
      grads.flashElement(resultFlash, 'Incorrect!');
    }
    return false; 
  }

  view.find('.check-btn').click(checkAnswerClick); 
  view.find('.title').text('Problem #' + problemNumber);
  grads.applyObject(problemData, view);

  if (problemNumber < grads.problems.length) {
    var buttonItem = grads.template('skip-btn'); 
    buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1)); $('.nav-list').append(buttonItem);
  
    view.bind('removingView', function() {
        buttonItem.remove();
      });
  }

  return view;
}

grads.showView = function(hash) {
  var routes = {
    '#problem': grads.problemView,
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

grads.flashElement = function(elem, content) { 
  elem.fadeOut('fast', function() {
    elem.html(content);
    elem.fadeIn();
  });
}

grads.template = function(name) {
  return $('.templates .' + name).clone();
}

grads.buildCorrectFlash = function (problemNum) {
  
  var correctFlash = grads.template('correct-flash');
  var link = correctFlash.find('a');
  
  if (problemNum < grads.problems.length) {
    link.attr('href', '#problem-' + (problemNum + 1));
  } else {
    link.attr('href', '');
    link.text("You're Finished!");
  }
    
  return correctFlash;

}

grads.landingView = function() {
  return grads.template('landing-view');
}

grads.triggerEvent = function(name, args) { $('.view-container>*').trigger(name, args);
}
