(function(){
    'use strict';

    angular
        .module('BlankApp')
        .service('SideBarService', function() {
          let aboutLinks = [
            {title: "Presentation", url: "home"},
            {title: "CV", url: "cv"},
            {title: "Hobbies", url: "hobbies"},
          ];
          let projectLinks = [
            {title: "Snake QLearning", url: "snake"},
            {title: "Images with genetic algorithm", url: "geneticimage"},
            {title: "Salesman problem", url: "salesman"},
            {title: "Random Forest", url: "randomforest"},
            {title: "Guitar Chords", url: "guitarchords"},
            {title: "Shape Similarity", url: "shapesimilarity"},
            {title: "Shape Similarity with genetic", url: "shapesimilaritygenetic"},
            {title: "2048", url: "2048"},
            {title: "Sudoku", url: "sudoku"},
            {title: "Takuzu", url: "takuzu"},
            {title: "MineSweeper", url: "minesweeper"},
            {title: "TapMe", url: "tapme"},
          ];

          return {
            getLinks: function() {
              return {
                aboutLinks: aboutLinks,
                projectLinks: projectLinks
              };
            }
          }
        });
}());
