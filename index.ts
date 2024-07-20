#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";



// PLAYER OOP CLASS OBJECT WITH FUNCTION.
class Player {
  name: string;
  health: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  Easymood() {
    let health = this.health - 20;
    this.health = health;
  }
  mediuMood() {
    let health = this.health - 30;
    this.health = health;
  }
  hardMood() {
    let health = this.health - 50;
    this.health = health;
  }
  maxHealth() {
    let hp = (this.health = 100);
    this.health = hp;
  }
}
// ENEMY OOP CLASS OBJECT WITH FUNCTION.
class Enemy {
  name: string;
  health: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  mediuMood() {
    let health = this.health - 30;
    this.health = health;
  }
  hardMood() {
    let health = this.health - 50;
    this.health = health;
  }
}
// GAME STRATING POINT.
// wellcome message
function printCentered(text: string, width: number = 90) {
  const lines = text.split('\n');
  lines.forEach(line => {
      const padding = Math.max(0, Math.floor((width - line.length) / 2));
      console.log(' '.repeat(padding) + chalk.bold.magenta.bgCyanBright (line));
  });
}

const text = `
******************************************************
*                                                    *
*     Welcome to the Rock-Paper-Scissors Game        *
*                                                    *
*       Get ready to challenge the Computer!         *
*                                                    *
******************************************************
`;

printCentered(text);

console.log(
  chalk.red.bold.italic(`\n\tNOTE: `) +
    chalk.magenta.bold.italic(
      `YOU HAVE 3 MODES IN THE GAME. EASY, MEDEIUM, HARD.\n\tTHERE ARE DIFFERENT MONSTERS ON EACH MODE.\n\tIF THE GAME LEVELS ARE HARD, THE MONSTERS WILL BE HARD TO HIT.\n`
    )
);
console.log("\n\t\t==================================================================================");

// WHILE LOOP
let continueProgram = true;
while (continueProgram) {
  // GAME LEVEL INQUIRER
  let gameLevel = await inquirer.prompt([
    {
      name: "levels",
      type: "list",
      choices: ["EASY-MODE:", "MEDIUM-MODE:", "HARD-MODE:", "EXIT TO GAME:"],
      message: "SELECT GAME LEVEL YOU WANT TO PLAY OR EXIT.",
    },
  ]);
  // EASY MODE GAME.
  if (gameLevel.levels === "EASY-MODE:") {
    let userNameInput = await inquirer.prompt([
      {
        name: "userName",
        type: "string",
        message: "ENTER YOUR NAME.",
      },
    ]);
    while (userNameInput.userName === "") {
      console.log(
        chalk.red.bold.italic("\n\tENTER YOUR NAME FIRST THEN CONTINUE.\n")
      );
      userNameInput = await inquirer.prompt([
        {
          name: "userName",
          type: "string",
          message: "ENTER YOUR NAME.",
        },
      ]);
    }

    let opponentSelection = await inquirer.prompt([
      {
        name: "opnSelect",
        type: "list",
        choices: ["DRAGONS"],
        message: "SELECT DRAGONS TO FIGHT.",
      },
    ]);
    //   PLAYER AND ENEMY NAME STORE IN CLASS OBJECT.

    let upperCaseName = userNameInput.userName.toUpperCase();
    let player = new Player(upperCaseName);
    let opponent = new Enemy(opponentSelection.opnSelect);
    // PLAYER VS ENEMY
    console.log(chalk.yellow(`\n\t\t\t<=====================>`))
    console.log(
      chalk.green.bold.italic(`\n\t${player.name}`) +
        chalk.red.bold.italic(` VS `) +
        chalk.green.bold.italic(`${opponent.name}\n`)
    );
    console.log(chalk.yellow(`\n\t\t\t<=====================>`))
    //  => DRAGONS PART CODE <=
    if (opponentSelection.opnSelect === "DRAGONS") {
      let playerMood = await inquirer.prompt([
        {
          name: "mood",
          type: "list",
          choices: ["ATTACK ENEMY:"],
          message: 'CLICK "ATTACK ENEMY" TO FIGHT WITH MONSTER.',
        },
      ]);

      if (playerMood.mood === "ATTACK ENEMY:") {
        let continueMode: boolean = true;
        while (continueMode) {
          let number = Math.floor(Math.random() * 2); // RANDOM NUMBER GENERATE.
          if (number > 0) {
            player.Easymood(); // PLAYER EASY-MOOD FUNCTION
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.green.bold.italic(
                `\n\t${opponent.name} HEALTH IS: ${opponent.health}`
              )
            );
            console.log(
              chalk.red.bold.italic(
                `\t${player.name} HEALTH IS: ${player.health}\n`
              )
            );
            console.log(
              chalk.red.bold.italic(
                `\n\t  ${opponent.name} HITS YOUR BODY.  \nYOUR HEALTH IS GETTING LOW YOU NEED A BANDAGE.\n`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            if (player.health <= 0) {
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
              console.log(
                chalk.red.bold.italic(
                  `\n\t${player.name}: YOU LOOSE THIS GAME TRY AGAIN.\n`
                )
              );
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
              break;
            }
          } else if (number <= 0) {
            opponent.hardMood(); // ENEMY HARD-MOOD FUNCTION
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.green.bold.italic(
                `\n\t${player.name} HEALTH IS: ${player.health}`
              )
            );
            console.log(
              chalk.red.bold.italic(
                `\t${opponent.name} HEALTH IS: ${opponent.health}\n`
              )
            );

            if (opponent.health <= 0) {
              console.log(
                chalk.green.bold.italic(
                  `\n    CONGRATS => ${player.name} <= YOU WIN THIS GAME\n`
                )
              );
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
              break;
            }
          }
          // PLAYER HEALTH INQUIRER OR CONDITION.

          if (player.health < 100) {
            let maxHp = await inquirer.prompt([
              {
                name: "health",
                type: "list",
                choices: ["NEED FOR HEALTH:", "NO NEED FOR HEALTH:"],
                message:
                  "IF YOU NEED HEALTH CLICK ON OPTION 1, OTHERWISE CLICK ON OPTION 2.",
              },
            ]);
            if (maxHp.health === "NEED FOR HEALTH:") {
              player.maxHealth();
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
              console.log(
                chalk.green.bold.italic(
                  `\t\nYOUR HEALTH IS INCREASED TO => ${player.health} <=\n   YOU ARE TOTALLY PREPARED TO FIGHT WITH ${opponent.name}.\n`
                )
              );
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            } else if (maxHp.health === "NO NEED FOR HEALTH:") {
              continue;
            }
          }
          // PERMISSION TO CONTINUE FIGHT WITH MONSTER.
          let wantToContinue = await inquirer.prompt([
            {
              name: "continue",
              type: "list",
              choices: ["YES", "NO"],
              message: "DO YOU WANT TO CONTINUE FIGHT WITH DRAGONS?",
            },
          ]);
          if (wantToContinue.continue === "NO") {
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.red.bold.italic(
                `\n\t${opponentSelection.opnSelect.slice(0)} HAS DEFEATED YOU ${
                  player.name
                }.\n`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            continueMode = false;
          } else {
            continueMode = true;
          }
        }
      }
    }
    // PERMISSION TO CONTINUE GAME LEVELS.
    let wantContinue = await inquirer.prompt([
      {
        name: "continue",
        type: "list",
        choices: ["YES", "NO"],
        message: "DO YOU WANT TO PLAY ANOTHER LEVEL OF THIS GAME.",
      },
    ]);
    if (wantContinue.continue === "YES") {
      continueProgram = true;
    } else {
      console.log(chalk.yellow(`\n\t\t\t<=====================>`))
      console.log(
        chalk.yellowBright.bold.italic(`\n\tI HOPE YOU ARE ENJOYED THE GAME.\n`)
      );
      console.log(chalk.yellow(`\n\t\t\t<=====================>`))
      continueProgram = false;
    }
    // -----------------------------------------------------------------------------------------------------------------------------------------
    // MEDEIUM MODE GAME
  } else if (gameLevel.levels === "MEDIUM-MODE:") {
    let userNameInput = await inquirer.prompt([
      {
        name: "userName",
        type: "string",
        message: "ENTER YOUR NAME.",
      },
    ]);
    while (userNameInput.userName === "") {
      console.log(
        chalk.red.bold.italic("\n\tENTER YOUR NAME FIRST THEN CONTINUE.\n")
      );
      userNameInput = await inquirer.prompt([
        {
          name: "userName",
          type: "string",
          message: "ENTER YOUR NAME.",
        },
      ]);
    }

    let opponentSelection = await inquirer.prompt([
      {
        name: "opnSelect",
        type: "list",
        choices: ["GODZILLA"],
        message: "SELECT GODZILLA TO FIGHT.",
      },
    ]);
    //   PLAYER AND ENEMY NAME STORE IN CLASS OBJECT.

    let upperCaseName = userNameInput.userName.toUpperCase();
    let player = new Player(upperCaseName);
    let opponent = new Enemy(opponentSelection.opnSelect);
    // PLAYER VS ENEMY
    console.log(chalk.yellow(`\n\t\t\t<=====================>`))
    console.log(
      chalk.green.bold.italic(`\n\t${player.name}`) +
        chalk.red.bold.italic(` VS `) +
        chalk.green.bold.italic(`${opponent.name}\n`)
    );
    console.log(chalk.yellow(`\n\t\t\t<=====================>`))
    //  => GODZILLA PART CODE <=
    if (opponentSelection.opnSelect === "GODZILLA") {
      let playerMood = await inquirer.prompt([
        {
          name: "mood",
          type: "list",
          choices: ["ATTACK ENEMY:"],
          message: 'CLICK "ATTACK ENEMY" TO FIGHT WITH GODZILLA.',
        },
      ]);

      if (playerMood.mood === "ATTACK ENEMY:") {
        let continueMode: boolean = true;
        while (continueMode) {
          let number = Math.floor(Math.random() * 2); // RANDOM NUMBER GENERATE.
          if (number > 0) {
            player.mediuMood(); // PLAYER MEDEIUM-MOOD FUNCTION
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.green.bold.italic(
                `\n\t${opponent.name} HEALTH IS: ${opponent.health}`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            // PLAYER HEALTH VALUE TURN OUT OF MINUS CONDITION.
            if (player.health === -20) {
              player.health = 0;
            }
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.red.bold.italic(
                `\t${player.name} HEALTH IS: ${player.health}\n`
              )
            );
            console.log(
              chalk.red.bold.italic(
                `\n\t  ${opponent.name} HITS YOUR HEAD.  \nYOUR HEALTH IS GETTING LOW YOU NEED A BANDAGE.\n`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            if (player.health <= 0) {
              console.log(
                chalk.red.bold.italic(
                  `\n\t${player.name}: YOU LOOSE THIS GAME TRY AGAIN.\n`
                )
              );
              break;
            }
          } else if (number <= 0) {
            opponent.mediuMood(); // ENEMY MEDEIUM-MOOD FUNCTION
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.green.bold.italic(
                `\n\t${player.name} HEALTH IS: ${player.health}`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            // GODZILLA HEALTH VALUE TURN OUT OF MINUS CONDITION.
            if (opponent.health === -20) {
              opponent.health = 0;
            }
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.red.bold.italic(
                `\t${opponent.name} HEALTH IS: ${opponent.health}\n`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            if (opponent.health <= 0) {
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
              console.log(
                chalk.green.bold.italic(
                  `\n    CONGRATS => ${player.name} <= YOU WIN THIS GAME\n`
                )
              );
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
              break;
            }
          }
          // PLAYER HEALTH INQUIRER OR CONDITION.

          if (player.health < 100) {
            let maxHp = await inquirer.prompt([
              {
                name: "health",
                type: "list",
                choices: ["NEED FOR HEALTH:", "NO NEED FOR HEALTH:"],
                message:
                  "IF YOU NEED HEALTH CLICK ON OPTION 1, OTHERWISE CLICK ON OPTION 2.",
              },
            ]);
            if (maxHp.health === "NEED FOR HEALTH:") {
              player.maxHealth();
              console.log(
                chalk.green.bold.italic(
                  `\t\nYOUR HEALTH IS INCREASED TO => ${player.health} <=\n   YOU ARE TOTALLY PREPARED TO FIGHT WITH ${opponent.name}.\n`
                )
              );
            } else if (maxHp.health === "NO NEED FOR HEALTH:") {
              continue;
            }
          }
          // PERMISSION TO CONTINUE FIGHT WITH MONSTER.
          let wantToContinue = await inquirer.prompt([
            {
              name: "continue",
              type: "list",
              choices: ["YES", "NO"],
              message: "DO YOU WANT TO CONTINUE FIGHT WITH GODZILLA?",
            },
          ]);
          if (wantToContinue.continue === "NO") {
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.red.bold.italic(
                `\n\t${opponentSelection.opnSelect.slice(0)} HAS DEFEATED YOU ${
                  player.name
                }.\n`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            continueMode = false;
          } else {
            continueMode = true;
          }
        }
      }
    }
    // PERMISSION TO CONTINUE GAME LEVELS.
    let wantContinue = await inquirer.prompt([
      {
        name: "continue",
        type: "list",
        choices: ["YES", "NO"],
        message: "DO YOU WANT TO PLAY ANOTHER LEVEL OF THIS GAME.",
      },
    ]);
    if (wantContinue.continue === "YES") {
      continueProgram = true;
    } else {
      console.log(
        chalk.yellowBright.bold.italic(`\n\tI HOPE YOU ARE ENJOYED THE GAME.\n`)
      );
      continueProgram = false;
    }
    // -----------------------------------------------------------------------------------------------------------------------------------------
    // HARD MODE GAME
  } else if (gameLevel.levels === "HARD-MODE:") {
    let userNameInput = await inquirer.prompt([
      {
        name: "userName",
        type: "string",
        message: "ENTER YOUR NAME.",
      },
    ]);
    while (userNameInput.userName === "") {
      console.log(
        chalk.red.bold.italic("\n\tENTER YOUR NAME FIRST THEN CONTINUE.\n")
      );
      userNameInput = await inquirer.prompt([
        {
          name: "userName",
          type: "string",
          message: "ENTER YOUR NAME.",
        },
      ]);
    }

    let opponentSelection = await inquirer.prompt([
      {
        name: "opnSelect",
        type: "list",
        choices: ["KING-KONG"],
        message: "SELECT KING-KONG TO FIGHT.",
      },
    ]);
    //   PLAYER AND ENEMY NAME STORE IN CLASS OBJECT.

    let upperCaseName = userNameInput.userName.toUpperCase();
    let player = new Player(upperCaseName);
    let opponent = new Enemy(opponentSelection.opnSelect);
    // PLAYER VS ENEMY
    console.log(chalk.yellow(`\n\t\t\t<=====================>`))
    console.log(
      chalk.green.bold.italic(`\n\t${player.name}`) +
        chalk.red.bold.italic(` VS `) +
        chalk.green.bold.italic(`${opponent.name}\n`)
    );
    console.log(chalk.yellow(`\n\t\t\t<=====================>`))
    //  => KING-KONG PART CODE <=
    if (opponentSelection.opnSelect === "KING-KONG") {
      let playerMood = await inquirer.prompt([
        {
          name: "mood",
          type: "list",
          choices: ["ATTACK ENEMY:"],
          message: 'CLICK "ATTACK ENEMY" TO FIGHT WITH KING-KONG.',
        },
      ]);

      if (playerMood.mood === "ATTACK ENEMY:") {
        let continueMode: boolean = true;
        while (continueMode) {
          let number = Math.floor(Math.random() * 2); // RANDOM NUMBER GENERATE.
          if (number > 0) {
            player.hardMood(); // PLAYER HARD-MOOD FUNCTION
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.green.bold.italic(
                `\n\t${opponent.name} HEALTH IS: ${opponent.health}`
              )
            );
            console.log(
              chalk.red.bold.italic(
                `\t${player.name} HEALTH IS: ${player.health}\n`
              )
            );

            console.log(
              chalk.red.bold.italic(
                `\n    ${opponent.name} PICKED YOU UP AND THREW YOU.  \nYOUR HEALTH IS GETTING LOW YOU NEED A BANDAGE.\n`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            if (player.health <= 0) {
              console.log(
                chalk.red.bold.italic(
                  `\n\t${player.name}: YOU LOOSE THIS GAME TRY AGAIN.\n`
                )
              );
              break;
            }
          } else if (number <= 0) {
            opponent.mediuMood(); // ENEMY MEDEIUM-MOOD FUNCTION
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.green.bold.italic(
                `\n\t${player.name} HEALTH IS: ${player.health}`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            // KING-KONG HEALTH VALUE TURN OUT OF MINUS CONDITION.
            if (opponent.health === -20) {
              opponent.health = 0;
            }
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            console.log(
              chalk.red.bold.italic(
                `\t${opponent.name} HEALTH IS: ${opponent.health}\n`
              )
            );
            console.log(chalk.yellow(`\n\t\t\t<=====================>`))
            if (opponent.health <= 0) {
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
              console.log(
                chalk.green.bold.italic(
                  `\n    CONGRATS => ${player.name} <= YOU WIN THIS GAME\n`
                )
              );
              console.log(chalk.yellow(`\n\t\t\t<=====================>`))
              break;
            }
          }
          // PLAYER HEALTH INQUIRER OR CONDITION.

          if (player.health < 100) {
            let maxHp = await inquirer.prompt([
              {
                name: "health",
                type: "list",
                choices: ["NEED FOR HEALTH:", "NO NEED FOR HEALTH:"],
                message:
                  "IF YOU NEED HEALTH CLICK ON OPTION 1, OTHERWISE CLICK ON OPTION 2.",
              },
            ]);
            if (maxHp.health === "NEED FOR HEALTH:") {
              player.maxHealth();
              console.log(
                chalk.green.bold.italic(
                  `\t\n \t YOUR HEALTH IS INCREASED TO => ${player.health} <=\n   YOU ARE TOTALLY PREPARED TO FIGHT WITH ${opponent.name}.\n`
                )
              );
            } else if (maxHp.health === "NO NEED FOR HEALTH:") {
              continue;
            }
          }
          // PERMISSION TO CONTINUE FIGHT WITH KING KONG.
          let wantToContinue = await inquirer.prompt([
            {
              name: "continue",
              type: "list",
              choices: ["YES", "NO"],
              message: "DO YOU WANT TO CONTINUE FIGHT WITH KING-KONG?",
            },
          ]);
          if (wantToContinue.continue === "NO") {
            console.log(
              chalk.red.bold.italic(
                `\n\t${opponentSelection.opnSelect.slice(0)} HAS DEFEATED YOU ${
                  player.name
                }.\n`
              )
            );
            continueMode = false;
          } else {
            continueMode = true;
          }
        }
      }
    }
    // PERMISSION TO CONTINUE GAME LEVELS.
    let wantContinue = await inquirer.prompt([
      {
        name: "continue",
        type: "list",
        choices: ["YES", "NO"],
        message: "DO YOU WANT TO PLAY ANOTHER LEVEL OF THIS GAME.",
      },
    ]);
    if (wantContinue.continue === "YES") {
      continueProgram = true;
    } else {
      console.log(
        chalk.yellowBright.bold.italic(`\n\t\t I HOPE YOU ARE ENJOYED THE GAME.\n`)
      );
      continueProgram = false;
    }
  } else if (gameLevel.levels === "EXIT TO GAME:") {
    console.log(
      chalk.green(
        `\t<===========================================================================>`
      ) + chalk.yellow(`\t<===============>`)
    );
    console.log(
      chalk.yellow(
        `\t THANKS FOR USING THIS AN AMAZING ADVENTURE GAME,give feedback, CREATOR BY: =>`
      ) + chalk.blue(`\t "ZAKIA BASHIR"`)
    );
    console.log(
      chalk.green(
        `\t<==========================================================================>`
      ) + chalk.yellow(`\t<===============>`)
    );
    break;
  }
}