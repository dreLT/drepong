'use strict';

/**
 * @ngdoc directive
 * @name DreBong.directive:pongBoard
 * @description
 * # pong
 */
var DrePong = angular.module('DrePong', []);

DrePong.controller('landingController', ['$scope', '$window', 'PlayerService', function($scope, $window, PlayerService) {

  $scope.keysDown = {};

$window.addEventListener('keydown', function (event) {
          keysDown[event.keyCode] = true;
        });

        $window.addEventListener('keyup', function (event) {
          delete keysDown[event.keyCode];
        });

}]);

DrePong.directive('pongBoard', ['$window', 'PaddleService', 'ComputerService', 'PlayerService', 'BallService',
    function ($window, PaddleService, ComputerService, PlayerService, BallService) {
    return {
      template: '<div></div>',
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {

        var animate = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame || function (callback) {
          $window.setTimeout(callback, 1000 / 60);
        };
        var canvas = element[0];
        var width = 400;
        var height = 600;
        var context = canvas.getContext('2d');

        //console.log(ComputerService.Computer.test);
        
        var player = new PlayerService.Player();
        var computer = new ComputerService.Computer();
        var ball = new BallService.Ball(200, 300);
        var winningPoint = 2;

        

        //console.log(PlayerService.Player.render());

        var render = function () {
          context.fillStyle = '#FF00FF';
          context.fillRect(0, 0, width, height);
          PlayerService.render();
          ComputerService.render();
          BallService.render();
        };

        console.log(scope.keysDown);
        var keysDown = scope.keysDown;
        var update = function() {
          PlayerService.update(keysDown);
          ComputerService.update(ball);
          BallService.update(player.paddle, computer.paddle);
        };

        var step = function () {
          update();
          render();
          if(scope.computer != winningPoint && scope.player!= winningPoint){
             animate(step);
          }
        };
        
        scope.computer = 0;
        scope.player = 0;


        animate(step);

      }
    };
  }]);

DrePong.service('PaddleService', function() {
  
  return {
    Paddle: function(x, y, width, height) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.xSpeed = 0;
          this.ySpeed = 0;
    } 
  }

        Paddle.prototype.render = function () {
          context.fillStyle = '#0000FF';
          context.fillRect(this.x, this.y, this.width, this.height);
        };

        Paddle.prototype.move = function (x, y) {
          this.x += x;
          this.y += y;
          this.xSpeed = x;
          this.ySpeed = y;
          if (this.x < 0) {
            this.x = 0;
            this.xSpeed = 0;
          } else if (this.x + this.width > 400) {
            this.x = 400 - this.width;
            this.xSpeed = 0;
          }
        };

});

DrePong.service('ComputerService', ['PaddleService', function(PaddleService) {

  var computerPaddle;

  return {
    
    // test: function() {
    //   this.a = b;
    // },

    Computer: function() {
          this.paddle = new PaddleService.Paddle(175, 10, 50, 10);
          computerPaddle = this.paddle;
        },
  
    render: function () {
          context.fillStyle = '#0000FF';
          context.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);
        },

    update: function (ball) {
          var xPos = ball.x;
          var diff = -((computerPaddle.x + (computerPaddle.width / 2)) - xPos);
          if (diff < 0 && diff < -4) {
            diff = -5;
          } else if (diff > 0 && diff > 4) {
            diff = 5;
          }
          computerPaddle.move(diff, 0);
          if (computerPaddle.x < 0) {
            computerPaddle.x = 0;
          } else if (computerPaddle.x + computerPaddle.width > 400) {
            computerPaddle.x = 400 - computerPaddle.width;
          }
        }

  }
        
}]);

DrePong.service('PlayerService', ['PaddleService', function(PaddleService) {

var playerPaddle;

return {

  Player: function() {
            this.paddle = new PaddleService.Paddle(175, 580, 50, 10);
            playerPaddle = this.paddle;
          },
  render: function() {
          context.fillStyle = '#0000FF';
          context.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
          },
  update: function(keysDown) {
    console.log(keysDown);
    for (var key in keysDown) {
            var value = Number(key);
            if (value === 37) {
              playerPaddle.move(-4, 0);
            } else if (value === 39) {
              playerPaddle.move(4, 0);
            } else {
              playerPaddle.move(0, 0);
            }
          }
  }          

  // Player.prototype.render: function () {
  //         this.paddle.render();
  //       };  
}

  // Player.prototype.render = function () {
  //         this.paddle.render();
  //       };

        // Player.prototype.update = function () {
          
        // };

}]);


DrePong.service('BallService', ['PaddleService', function(PaddleService) {

  return {
  
    Ball: function(x, y) {

          this.x = x;
          this.y = y;
          this.xSpeed = 0;
          this.ySpeed = 3;
        },
  
    render: function () {
      context.beginPath();
      context.arc(this.Ball.x, this.Ball.y, 5, 2 * Math.PI, false);
      context.fillStyle = '#000000';
      context.fill();
    
    }

  }

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