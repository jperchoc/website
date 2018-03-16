(function() {
  "use strict";

  angular.module("BlankApp")
  .directive('demo', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/demo/demo.html',
        scope: {
          width:   '@',
          height: '@',
          src: '@'
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: function(ProjectService, $sce) {
          let vm = this;
          vm.url = "html/iframes/" + vm.src;//"//embed.plnkr.co/"+vm.src+"?show=preview";
          vm.url = $sce.trustAsResourceUrl(vm.url);
          console.log(vm.url);
          vm.getShowDemo = function() {
            return ProjectService.getShowDemo();
          } 
          vm.commuteDemo = function() {
            return ProjectService.setShowDemo(!ProjectService.getShowDemo());
          } 
        }
    };
  });
})();
