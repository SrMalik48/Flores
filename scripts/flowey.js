class Flowey {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50; // Width of Flowey
        this.height = 50; // Height of Flowey
        this.gravity = 1; // Gravity effect
        this.jumpStrength = 15; // Jump strength
        this.isJumping = false; // Jump state
        this.velocityY = 0; // Vertical velocity
    }

    moveLeft() {
        this.x -= 5; // Move left
    }

    moveRight() {
        this.x += 5; // Move right
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityY = -this.jumpStrength; // Set initial jump velocity
        }
    }

    update() {
        if (this.isJumping) {
            this.y += this.velocityY; // Update vertical position
            this.velocityY += this.gravity; // Apply gravity

            // Check if Flowey has landed
            if (this.y >= window.innerHeight - this.height) {
                this.y = window.innerHeight - this.height; // Reset to ground level
                this.isJumping = false; // Reset jump state
                this.velocityY = 0; // Reset velocity
            }
        }
    }

    draw(context) {
        context.fillStyle = 'yellow'; // Flowey color
        context.fillRect(this.x, this.y, this.width, this.height); // Draw Flowey
    }
}