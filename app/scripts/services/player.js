DrePong.factory('PlayerService', ['PaddleService', function(PaddleService) {

function Player() {
          PaddleService.paddle = new Paddle(175, 580, 50, 10);
        }

        Player.prototype.render = function () {
          this.paddle.render();
        };

        Player.prototype.update = function () {
          for (var key in keysDown) {
            var value = Number(key);
            if (value === 37) {
              this.paddle.move(-4, 0);
            } else if (value === 39) {
              this.paddle.move(4, 0);
            } else {
              this.paddle.move(0, 0);
            }
          }
        };

}]);
