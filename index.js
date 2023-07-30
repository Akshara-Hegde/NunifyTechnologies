

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function moveRobot(x, y, direction, instructions) {
  const directions = ["N", "E", "S", "W"];
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  let currDirIndex = directions.indexOf(direction);

  for (const instruction of instructions) {
    if (instruction === "L") {
      currDirIndex = (currDirIndex + 3) % 4;
    } else if (instruction === "R") {
      currDirIndex = (currDirIndex + 1) % 4;
    } else if (instruction === "M") {
      x += dx[currDirIndex];
      y += dy[currDirIndex];
    }
  }

  return { x, y, direction: directions[currDirIndex] };
}

function processRobots() {
  rl.question(
    "Enter the upper-right coordinates of the warehouse (e.g.: 5 5): ",
    (sizeInput) => {
      const [maxX, maxY] = sizeInput.split(" ").map(Number);

      function processRobot() {
        rl.question(
          "Enter the current robot's position (e.g., 1 0 N): ",
          (positionInput) => {
            rl.question(
              "Enter the instructions for the robot for path (e.g.: MMRMMLMMR): ",
              (instructions) => {
                const [x, y, direction] = positionInput.split(" ");
                const {
                  x: finalX,
                  y: finalY,
                  direction: finalDirection,
                } = moveRobot(Number(x), Number(y), direction, instructions);
                if(finalX>maxX||finalY>maxY||finalX<0||finalY<0){
                  console.log('Instructions not correct(Robot out of defined area)')
                }
                else
                  console.log(`${finalX} ${finalY} ${finalDirection}`);

                rl.question(
                  "Want to control another robot? (Enter y if yes): ",
                  (answer) => {
                    if (answer.toUpperCase() === "Y") {
                      processRobot();
                    } else {
                      rl.close();
                    }
                  }
                );
              }
            );
          }
        );
      }

      processRobot();
    }
  );
}
try{
processRobots();
}catch(err){
  console.log('Error occurred:  '+err)
}

