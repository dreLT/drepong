DrePong.factory('PaddleService', function() {
  
function Paddle(x, y, width, height) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.xSpeed = 0;
          this.ySpeed = 0;
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