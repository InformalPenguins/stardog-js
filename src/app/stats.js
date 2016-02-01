/**
 * Stats Class
 */

export default class Stats {
  constructor(achievements) {
    this.achievements = achievements;
    this.load();
  }

  save() {
    let hash = JSON.stringify(this);
    localStorage.setItem('sd.stats', hash);
  }

  load() {
    let hash = localStorage.getItem('sd.stats');
    let obj = JSON.parse(hash) || {};

    this.currentCredit = obj.currentCredit || 0;
    this.globalScore = obj.globalScore || 0;
    this.bestScore = obj.bestScore || 0;
    this.taps = obj.taps || 0;
    this.meteorsKilled = obj.meteorsKilled || 0;
    this.powerUpsTaken = obj.powerUpsTaken || 0;
    this.deaths = obj.deaths || 0;
    this.runs = obj.runs || 0;
    this.shieldsDestroyed = obj.shieldsDestroyed || 0;

    return this;
  }

  increase(property, value) {
    this[property] += value || 1;

    for (let achievement in this.achievements) {
      if (this.achievements[achievement]['prop'] === property) {
        if (this.achievements[achievement]['value'] <= this[property]) {
          console.log(achievement);
        }
      }
    }
  }
}
