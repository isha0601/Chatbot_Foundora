// Exporting a function called `log` so it can be imported and used in other files
// The function accepts any number of arguments (...args)
// `...args` collects all the arguments passed to the function into an array
export const log = (...args) => 
  // Inside the function, we call console.log
  // `new Date().toISOString()` prints the current date & time in ISO format (e.g., 2025-08-23T10:45:30.123Z)
  // Then we spread out the arguments (...args) so everything passed to log will also be printed
  console.log(new Date().toISOString(), ...args);
