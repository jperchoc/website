var genetic;
var MUTATION_CHANCE = 5;
var KEEP_ELITE_PERCENT = 30;
var NB_TOWN = 100;
var POOLSIZE = 40;
var LOOP = true;

var button;
var inputNbPoints;
var inputPoolSize;

function setup() { 
    createCanvas(400, 400);
    genetic = new Genetic(MUTATION_CHANCE, KEEP_ELITE_PERCENT, LOOP);
    

    button = createButton('RESET');
    button.position(0, 0);
    button.mousePressed(init);
    
    inputNbPoints = createInput();
    inputNbPoints.position(0, height+20);
    inputNbPoints.value(NB_TOWN);
    
    inputPoolSize = createInput();
    inputPoolSize.position(0, height+50);
    inputPoolSize.value(POOLSIZE);
    
    init();
    
    
}
function init() {
    NB_TOWN = inputNbPoints.value();
    POOLSIZE = inputPoolSize.value();
    genetic.createSpots(NB_TOWN);
    genetic.createPool(POOLSIZE);
    loop();
}

function draw() {
    genetic.draw();
    genetic.evolve();
    if(genetic.mutateChance>=100) {
        noLoop();
    }
}