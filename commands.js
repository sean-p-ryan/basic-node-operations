const fs = require("fs");

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

//where we will store commands
function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
  case "echo":
   //we will add the functionality of echo next within the object commandLibrary
    commandLibrary.echo(userInputArray.slice(1).join(" "));
    break;
  case "cat":
    commandLibrary.cat(userInputArray.slice(1));
    break;
  case "head":
    commandLibrary.head(userInputArray.slice(1));
    break;
  };
};


//where we will store the logic of our commands
const commandLibrary = {
  //the echo command
  "echo": function(userInput) {
    done(userInput);
  },
  //the cat command
  "cat": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           done(data);
       });
   },
   //the head command
   "head": function(fullPath) {
     const fileName = fullPath[0];
     fs.readFile(fileName, 'utf8', (err, data) => {
         if (err) throw err;
         let lines = data.split("\n");
         for (let i=0; i <= 9; i++){
           done(lines[i]);
         };
     });
   },
   //the tail command
   "tail": function(fullPath) {
     const fileName = fullPath[0];
     fs.readFile(fileName, 'utf8', (err, data) => {
       if (err) throw err;
       let lines = data.split("\n");
       for (let i=lines.length - 1; i >= lines.length - 10; i--) {
         done(lines[i]);
       };
     });
   }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
