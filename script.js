/*
    showcase:

    1) Create Rover Class representing:
        - initial position for the Rover (X, Y).
        - Direction (North, East, South, West).
        - Obstacles ([1,4], [3,5], [7,4]).
        - Mapping Commands characters (F, B, L, R) to the corresponding function.
        - Mapping Directions (N, E, S, W) to the corresponding movment.
    2) Create function to update the Rover`s position by Step (forward = 1), (backwards = -1)
    3) Create function to update the Rover`s Direction by rotate value (rotateLeft = -1), (rotateRight = 1)
    4) Create Function takes the commands as input, and iterate through each command, then validate the command.
    5) if command Vaild, create function to translate the command to an instructions so Rover understand it.
    6) Create a function to check the collision with the provided obstacles, if a collision happen, Stop the Rover and return the last position.
    7) If no collision, return the current position (X, Y) direction
*/




class Rover {
    constructor(x, y, direction, obstacles) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.obstacles = obstacles;
        this.moveMapping = {
            'F': () => this.move(1),
            'B': () => this.move(-1),
            'L': () => this.rotate(-1),
            'R': () => this.rotate(1)
        };
        this.directionsMapping = {
            'N': { x: 0, y: 1 },
            'E': { x: 1, y: 0 },
            'S': { x: 0, y: -1 },
            'W': { x: -1, y: 0 }
        }

    }

    // Function to translate the input commands
    translateCommands(commands) {
        for (let command of commands) {
            if (!this.moveMapping[command]) {
                console.error(`Invalid command: ${command}`);
                continue;
            }
            if (!this.moveIfNoCollision(command)) break;
        }
        console.info(`Current position: (${this.x}, ${this.y}) ${this.direction}`);
        document.write(`<p>Current Position: (${this.x}, ${this.y}) ${this.direction} </p>`);
    }
    // Function to perform moves and directions based on the provided command
    moveIfNoCollision(command) {
        //save the last Rover`s position 
        const lastX = this.x;
        const lastY = this.y;
        this.moveMapping[command]();

        if (this.isCollision()) {
            this.x = lastX;
            this.y = lastY;
            console.info(`Current Position: (${this.x}, ${this.y}) ${this.direction} STOPPED`);
            document.write(`<p style="color:red">Current Position: (${this.x}, ${this.y}) ${this.direction} STOPPED </p>`);
            return false;
        }
        return true;

    }
    
    // Function to update the Rover position based on the current direction and steps
    move(step) {
        this.x += this.directionsMapping[this.direction].x * step;
        this.y += this.directionsMapping[this.direction].y * step;
    }

    // Funtion To update the Rover`s direction based on the rotate value (Left or Right)
    rotate(rotateVal) {
        const directions = ['N', 'E', 'S', 'W'];
        const currentIndex = directions.indexOf(this.direction);
        const newIndex = (currentIndex + rotateVal + 4) % 4;
        this.direction = directions[newIndex];
    }

    //Function to check if the rover's current position is a collision
    isCollision() {
        let collision = false;
        this.obstacles.forEach(([obstacleX, obstacleY]) => {
            if (obstacleX === this.x && obstacleY === this.y) {
                collision = true;
            }
        });
        return collision;
    }
}

// EX command...
const obstacles = [[1, 4], [3, 5], [7, 4]];

const rover = new Rover(0, 0, 'N', obstacles);

rover.translateCommands('XFLFFFRFLB'); // Output: Current position: (-2, 2) W
rover.translateCommands('FLLRRFFFRFLB'); // Output: Current Position: (-5, 3) W
rover.translateCommands('FLLRFFRFL'); // Output: Current Position: (-7, 1) S
