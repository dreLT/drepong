DrePong.factory('ComputerService', ['PaddleService', function(PaddleService) {

function Computer() {
          PaddleService.paddle = new Paddle(175, 10, 50, 10);
        }

        Computer.prototype.render = function () {
          this.paddle.render();
        };

        Computer.prototype.update = function (ball) {
          var xPos = ball.x;
          var diff = -((this.paddle.x + (this.paddle.width / 2)) - xPos);
          if (diff < 0 && diff < -4) {
            diff = -5;
          } else if (diff > 0 && diff > 4) {
            diff = 5;
          }
          this.paddle.move(diff, 0);
          if (this.paddle.x < 0) {
            this.paddle.x = 0;
          } else if (this.paddle.x + this.paddle.width > 400) {
            this.paddle.x = 400 - this.paddle.width;
          }
        };

}]);