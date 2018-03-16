(function() {
  "use strict";

  angular.module("BlankApp")
  .directive('cardContent', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'directives/cardcontent/cardcontent.html',
        controllerAs: 'vm',
        scope: {
          title: '@',
          collapsible: '=',
          openOnStart: '='
        },
        bindToController: true,
        controller: function() {
          let vm = this;
          console.log(vm.collapsible)
          let show = vm.collapsible ? vm.openOnStart: true;

          vm.getShow = function() {
            return show;
          }

          vm.commute = function() {
            if (vm.collapsible)
              show = !show;
          }
        }
    };
  });
})();
