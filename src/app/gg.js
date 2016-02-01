import when from 'when';

class Achievements {
  constructor() {
    this.notification = document.getElementById('notification');
    window.signinCallback = this.signinCallback.bind(this);
    this.signedIn = false;
  }

  signinCallback(auth) {
    if (auth && auth.error == null) {
      this.auth = auth;
      this.signedIn = true;

      this.loadGame()
        .then(function () {
          this.loadPlayerData().then(function (player) {
            this.player = player;
            this.loadAchievements().then(function (achievements) {
              this.achievements = achievements;
            }.bind(this));
          }.bind(this));
        }.bind(this));

      //hideMyGamesSignInButton();
      //loadLeaderboardsAndAchievements();
    } else {
      // Common reasons are immediate_failed and user_signed_out
      if (auth && auth.hasOwnProperty('error')) {
        console.log('Sign in failed because: ', auth.error);
      }
      //showMyGamesSignInButton();
    }
  }

  tryLogIn() {
    console.log('TRY');
    gapi.auth.signIn();
  }

  unlock(achievement) {
    this.notification.style.bottom = 0;

    setTimeout(function () {
      this.notification.style.bottom = '-80px'
    }.bind(this), 2000);
  }

  loadGame() {
    let deferred = when.defer();

    gapi.client.load('games', 'v1', function () {
      deferred.resolve();
    }.bind(this));

    return deferred.promise;
  }

  loadPlayerData() {
    let deferred = when.defer();

    gapi.client.games.players.get({playerId: 'me'}).execute(function (player) {
      deferred.resolve(player);
    }.bind(this));

    return deferred.promise;
  }

  loadAchievements() {
    let deferred = when.defer();

    gapi.client.games.achievementDefinitions.list({playerId: this.player.playerId}).execute(function (response) {
      deferred.resolve(response.items);
    }.bind(this));

    return deferred.promise;
  }
}

export default new Achievements()
