(function() {
  "use strict";

 angular.module('BlankApp', ["ngMaterial", "ngRoute", "ngSanitize", 'pascalprecht.translate'])

.directive('ngPrism', [function() {
  return {
      restrict: 'A',
      link: function($scope, element, attrs) {
          element.ready(function() {
              Prism.highlightElement(element[0]);
          });
      }
  }
}])

.config(function($mdThemingProvider, $routeProvider, $translateProvider) {
    $mdThemingProvider
      .theme("default")
      .primaryPalette("teal")
      .accentPalette("amber")
      .dark();

      $routeProvider
        .when('/home', {
          templateUrl: "html/about/home.html"
        })
        .when('/cv', {
          templateUrl: "html/about/cv.html"
        })
        .when('/hobbies', {
          templateUrl: "html/about/hobbies.html"
        })
        .when('/snake', {
          templateUrl: "html/projects/snake.html"
        })
        .when('/geneticimage', {
          templateUrl: "html/projects/genetic_images.html"
        })
        .when('/salesman', {
          templateUrl: "html/projects/salesman.html"
        })
        .when('/randomforest', {
          templateUrl: "html/projects/random_forest.html"
        })
        .when('/guitarchords', {
          templateUrl: "html/projects/guitar_chords.html"
        })
        .when('/shapesimilarity', {
          templateUrl: "html/projects/shape_similarity.html"
        })
        .when('/shapesimilaritygenetic', {
          templateUrl: "html/projects/shape_similarity_genetic.html"
        })
        .when('/2048', {
          templateUrl: "html/projects/2048.html"
        })
        .when('/sudoku', {
          templateUrl: "html/projects/sudoku.html"
        })
        .when('/takuzu', {
          templateUrl: "html/projects/takuzu.html"
        })
        .when('/tapme', {
          templateUrl: "html/projects/tapme.html"
        })
        .otherwise({redirectTo: '/home'});

        $translateProvider.useStaticFilesLoader({
          prefix: 'i18n/locale-',
          suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  })

  .run(function($translate) {
    $translate.use('fr_FR');
  })

.controller("AppController", function($rootScope, ProjectService) {
    let vm = this;
    vm.message = "Hello World !";
   
    $rootScope.$on('$routeChangeStart', function($event, next, current) { 
      ProjectService.setShowDemo(false);
    });
  })
})();
