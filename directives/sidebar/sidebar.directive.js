(function() {
  "use strict";

  angular.module("BlankApp")
  .directive('sideBarLeft', function() {
    return {
        templateUrl: 'directives/sidebar/sidebar.html',
        bindToController: true,
        controller: function(SideBarService, $location, $rootScope) {
          let vm = this;

          vm.links = SideBarService.getLinks();

          vm.isSelected = function(link) {
            let path = $location.path();
            return path === '/'+link.url;
          }


          vm.dropdownaboutmeopened = true;
          vm.dropdownprojectopened = true;

          //initSideBarOpen();
          //vm.dropdownprojectopened = !vm.dropdownaboutmeopened;

          $rootScope.$on('$routeChangeStart', function($event, next, current) { 
            initSideBarOpen();
          });

          function initSideBarOpen() {
            for (let i = 0; i < vm.links.aboutLinks.length; i++) {
              if (vm.isSelected(vm.links.aboutLinks[i])) {
                vm.dropdownaboutmeopened = true;
                break;
              }
            }   
            for (let i = 0; i < vm.links.projectLinks.length; i++) {
              if (vm.isSelected(vm.links.projectLinks[i])) {
                vm.dropdownprojectopened = true;
                break;
              }
            }   
          }
        },
        controllerAs: "vm",
    };
  });
})();
