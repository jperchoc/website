(function() {
  "use strict";

  angular.module("BlankApp")
  .directive('codeExemple', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'directives/codeexemple/codeexemple.html',
        controllerAs: 'vm',
        scope: {
          language: '@'
        },
        bindToController: true,
        controller: function() {
          let vm = this;
          vm.showcode = true;
        }
    };
  });
})();
