class Board {
  constructor(x, y, width, height, peixe ) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, width, height, options);

    this.width = width;
    this.height = height;
    this.image = loadImage(peixe);

    World.add(world, this.body);
  }
  removes(index) {
    this.isRemoved = true;
    Matter.World.remove(world, this.body);
    delete enemies[index];
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pos.x--;
    pop();
  }
}
