import { execSync, spawn } from 'child_process';
import colors from 'colors'


// Number of times to run the script
const numRuns = 2; // Replace with desired number of runs

for (let i = 0; i < numRuns; i++) {
 
  console.log(`Running install #${i + 1}...`.green.bold);
  execSync('npm install package-timer');
  

 
  setTimeout(() => {
    console.log(`Running uninstall #${i + 1}...`.red.bold);
    execSync('npm uninstall package-timer');
    
  }, 60000);
  
}

console.log(`Script complete!`);
