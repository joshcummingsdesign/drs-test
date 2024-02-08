function generateMaze(rows, cols) {
    // Create a grid
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = {
                visited: false,
                walls: [true, true, true, true] // top, right, bottom, left
            };
        }
    }

    // Recursive backtracking algorithm to generate maze
    function generate(x, y) {
        grid[x][y].visited = false;

        const directions = [
            [1, 0], // down
            [0, 1], // right
            [-1, 0], // up
            [0, -1] // left
        ];

        directions.sort(() => Math.random() - 0.5); // Shuffle directions randomly

        for (let i = 0; i < directions.length; i++) {
            const [dx, dy] = directions[i];
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && !grid[newX][newY].visited) {
                grid[x][y].walls[i] = false;
                grid[newX][newY].walls[(i + 2) % 4] = false; // Remove opposite wall
                generate(newX, newY);
            }
        }
    }

    generate(0, 0);

    return grid;
}

// Example usage:
const maze = generateMaze(10, 10);
console.log(maze);
