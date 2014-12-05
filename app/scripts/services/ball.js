DrePong.factory('BallService', ['PaddleService', function(PaddleService) {

function Ball(x, y) {

          this.x = x;
          this.y = y;
          this.xSpeed = 0;
          this.ySpeed = 3;
        }

        Ball.prototype.render = function () {
          context.beginPath();
          context.arc(this.x, this.y, 5, 2 * Math.PI, false);
          context.fillStyle = '#000000';
          context.fill();
        };



        Ball.prototype.update = function (paddle1, paddle2) {
          this.x += this.xSpeed;
          this.y += this.ySpeed;
          var topX = this.x - 5;
          var topY = this.y - 5;
          var bottomX = this.x + 5;
          var bottomY = this.y + 5;

          if (this.x - 5 < 0) {
            this.x = 5;
            this.xSpeed = -this.xSpeed;
          } else if (this.x + 5 > 400) {
            this.x = 395;
            this.xSpeed = -this.xSpeed;
          }

          if (this.y < 0 || this.y > 600) {
           
            if(this.y > 600 && scope.computer != winningPoint) {
              scope.computer++;
            }
            if (this.y < 0 && scope.player != winningPoint) {
              scope.player++;
            }
            if(scope.computer == winningPoint){
              scope.alertMessage = "Congratulations Computer! You have won!!";
              
            }
            else if(scope.player == winningPoint ){
              scope.alertMessage = "Congratulations Player! You have won!!";
             
            }

            scope.$digest();
            this.xSpeed = 0;
            this.ySpeed = 3;
            this.x = 200;
            this.y = 300;
          }

          if (topY > 300) {
            if (topY < (paddle1.y + paddle1.height) && bottomY > paddle1.y && topX < (paddle1.x + paddle1.width) && bottomX > paddle1.x)             {
              this.ySpeed = -3;
              this.xSpeed += (paddle1.xSpeed / 2);
              this.y += this.ySpeed;
            }
          } else {
            if (topY < (paddle2.y + paddle2.height) && bottomY > paddle2.y && topX < (paddle2.x + paddle2.width) && bottomX > paddle2.x)             {
              this.ySpeed = 3;
              this.xSpeed += (paddle2.xSpeed / 2);
              this.y += this.ySpeed;
            }
          }
        };

}]);        