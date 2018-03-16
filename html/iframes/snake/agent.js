const GRID_MODE = 0;         //The input is the full grid + dist & angle to apple
const NEIGHBOURS_CELLS = 1;  //The input is the n neighbour cells & angle to apple

class Agent {

  constructor(spec) {

    this.inputMode = inputMode;
    this.neighboursCells = neighboursCells;
    this.size = size;
    this.spec = spec;
    let that = this;

    this.env = {
      getNumStates: function() { return 2 + (that.spec.inputMode === GRID_MODE ? (that.spec.size*that.spec.size) : Math.pow(1 + 2 * that.spec.neighboursCells ,2)); },
      getMaxNumActions: function() { return 4; }
    };
    // create the DQN agent
    this.agent = new RL.DQNAgent(this.env, this.spec); 
    

    this.rewards = {
      apple: 100.0,
      death: -100.0,
      farApple: -10.0,
      nearApple: 10.0
    };

    this.rewardCount = {
      nGames:0,
      gameReward:0,
      totGamesReward:0,
      totGamesMeanReward:0,
      totGamesMinReward:9999999,
      totGamesMaxReward:-999999,
      recordReward: function() {
        this.nGames++;
        this.totGamesReward += this.gameReward;
        this.totGamesMeanReward = this.totGamesReward / this.nGames;
        if (this.gameReward > this.totGamesMaxReward) this.totGamesMaxReward = this.gameReward;
        if (this.gameReward < this.totGamesMinReward) this.totGamesMinReward = this.gameReward;
        this.gameReward = 0;
      }
    }

  }

  act(input) {
    return this.agent.act(input);
  }
  learn(reward) {
    this.agent.learn(reward);
  }
}
