(function(){
    'use strict';

    angular
        .module('BlankApp')
        .service('ProjectService', function() {
          let showDemo = false;

          return {
            getShowDemo: function() {
              return showDemo;
            },
            setShowDemo: function(a) {
              showDemo = a;
            }
          }
        });
}());
