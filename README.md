# NodeJS

## Example

```js
const http = require("http");

const host = "127.0.0.1";
const port = "3000";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("content-type", "text/plain");
  res.end("Hello World");
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
```

## Run Nodejs File

```cmd
> node app.js
```

## Import/Exports

```js
//sum.js

// This is using arrow funtions
const sum = (num1, num2) => num1 + num2;

// export sum
module.exports = sum;
```

### Import

```js
//app.js

//Import sum
const sum = require("./sum");
//If you have on funtion in file
sum(2, 2);
```

### Many Exports

```js
//arithmatic.js

const sum = (num1,num2)=> num1 + num2;
const sub = (num1,num2)=> num1 - num2;

const PI = 3.14 ;

class SomeMathObject{
    constructor(){
        console.log("obj created");
    }
}

// Exports Variable , class
module.exports.sum = sum;
module.exports.PI = PI;
...
//or
module.exports = {
    sum:sum,
    sub:sub,
    PI:PI,
    SomeMathObject: SomeMathObject
}
```

```js
//app.js

//Import arithmatic
const arithmatic = require("./arithmatic");
arithmatic.sum(2, 2);
arithmatic.PI;
arithmatic.SomeMathObject();
```

## Event Module

```js
//import Event Module - nodejs built -in
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// eventEmitter.on() -> Takes 2 args, event name , listener(fn)
eventEmitter.on("tutorial", () => {
  console.log("Tutorial Event Emitted");
});

// Emit event

eventEmitter.emit("tutorial");
```

### Event Emitter With Args

```js
// event emitter with args
eventEmitter.on("sum", (num1, num2) => {
  console.log(num1 + num2);
});

// Emit event passing args

eventEmitter.emit("sum", 2, 3);
```

### Custom Object Using Event Emitter

```js
// above import

// person extends EventEmitter Class
class Person extends EventEmitter{
    constructor(name){
        super();
        this._name = name;
    }

    get name(){
        return this._name;
    }

}
// also obj is instance of EventEmitter class
let obj = new Person('Jhon Doe');
karthi.on('name', ()=>{
    console.log('My name is ' + obj.name);
}

obj.emit('name');


```

## Readline Module

```js
const readline = require("readline");

//process is global , so you don't need to import
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Your Name ? /n", userInput => {
  if (userInput == "doe") {
    rl.close();
  } else {
    rl.setPrompt("Incorrect , try again");
    rl.prompt();
    rl.on("line", userInput => {
      if (userInput == "doe") {
        rl.close();
      } else {
        rl.setPrompt(`Incorrect user ${userInput}, Try again`);
        rl.prompt();
      }
    });
  }
});

rl.on("close", () => {
  console.log("Hi Doe");
});
```

## File System Module

```js
// import file system module
const fs = require("fs");

// 3 args, file name, and what we gonna write, call back

fs.writeFile("test.txt", "this is test ", err => {
  if (err) console.log(err);
  else console.log("success");
});
```

### Read File

```js
// 3 args, file name, encode, call back
// full buffer - large size file can't use
fs.readFile("test.txt", "utf8", (err, file) => {
  if (err) console.log(err);
  else console.log(file);
});
```

### Rename File

```js
// 3 args, old file name, new file name , call back
fs.rename("test.txt", "test1.txt", err => {
  if (err) console.log(err);
  else console.log("Success");
});
```

### Append File

```js
// 3 args, file name, write , call back
fs.appendFile("test.txt", "new data appended", err => {
  if (err) console.log(err);
  else console.log("Success");
});
```

### Delete File

```js
// 2args, file name,  call back
fs.unlink("test.txt", err => {
  if (err) console.log(err);
  else console.log("Success");
});
```

### Works With Folder

```js
// 2 args, dir name, call back
fs.mkdir("testDir", err => {
  if (err) console.log(err);
  else console.log("Success");
});
```

### Delete Folder

```js
// 2 args, dir name, call back
fs.rmdir("testDir", err => {
  if (err) console.log(err);
  else console.log("Success");
});
```

### Delete Folder With Files

```js
// Delete files first then folder

fs.unlink("./testDir/test.txt", err => {
  if (err) console.log(err);
  else {
    fs.rmdir("testDir", err => {
      if (err) console.log(err);
      else console.log("Success");
    });
  }
});

// if multiple files
// 2 args, file name, callback(err,files)
fs.readdir("testDir", (err, files) => {
  if (err) console.log(err);
  else {
    for (let file in files) {
      //call unlink to delete
      fs.unlink(`./testDir/${file}`, err => {
        //...
      });
    }
  }
});
```

## Readable and Writeable Streams

```js
const fs = require("fs");

// createReadStream returns (chunk) readable streams
// large size file supported - small buffer
// read small piece of chunk (not full file)
const readStream = fs.createReadStream("./test.txt", "utf8");

// readstream inherit from EventEmitter Class
// using Listener
// event(data), callback
readStream.on("data", chunk => {
  console.log(chunk);
});
```

### Writeable Stream

```js
const fs = require("fs");

// createReadStream returns (chunk) readable streams
const readStream = fs.createReadStream("./test.txt", "utf8");
const writeStream = fs.createWriteStream("test2.txt");

// readstream inherit from EventEmitter Class
// using Listener
// event(data), callback
readStream.on("data", chunk => {
  writeStream.write(chunk);
});
```

## Pipes

```js
const fs = require("fs");

// createReadStream returns (chunk) readable streams
const readStream = fs.createReadStream("./test.txt", "utf8");
const writeStream = fs.createWriteStream("test2.txt");

// using pipe
//2 - source and destination
readStream.pipe(writeStream);
```

### Pipe Chaining

```js
const fs = require("fs");
// Compressing file module
const zlib = require("zlib");
const gzip = zlib.createGzip(); // returns transforms
// createReadStream returns (chunk) readable streams
const readStream = fs.createReadStream("./test.txt", "utf8");
const writeStream = fs.createWriteStream("test2.txt.gz");

// using pipe
//2 - source and destination
readStream.pipe(gzip).pipe(writeStream);
```

## Http Module

```js
//creating web server
const http = require("http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello from node");
    res.end();
  }
});

server.listen(port, host);
```

### Serving Static Files

```js
// static folder contains - index.html, json, png files
const http = require("http");
const fs = require("fs");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const readStream = fs.createReadStream("./static/index.html");
  // if json - application/json
  // if png -  image/png
  res.writeHead(200, { "content-type": "text/html" });
  readStream.pipe(res);
});

server.listen(port, host);
```

## NPM -> Creating Package.json

```cmd
> npm init
```

### Installing Packages Using NPM

```cmd
> npm install
or
> npm i
its creating node_modules folder
```

### Installing Package

```cmd
> npm install <package_name>
> npm install lodash
or
> npm i lodash

```

### Importing Package

```js
// importing lodash -> installed via npm
const _ = require("lodash");
```

### Uninstall module

```cmd
> npm unstall <package_name>
> npm unstall lodash

```

## Semantic Versioning

```json
{
  "dependencies": {
    // no major update , minor and path allow ^
    "lodash": "^4.17.11" // major.minor.patch 4.x.x
    // only patch ~
    "lodash": "~4.17.11" // 4.17.x
    // No update , same version
    "lodash": "4.17.11" // 4.17.11
  }
}
// patch - bug fixes
// minor - added new functionality, depercated fn...
// minor is non - breaking changes update
// major - breaking changes
// ^ means its don't update major
// rules -> no major update , minor , patch updates
// ~ means only patch update
```
