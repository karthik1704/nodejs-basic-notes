# ExpressJS

ExpessJS is

- Web Framework For NodeJs

## Installing ExpressJS

```cmd
// setup project using npm init (-y defaults yes)
> npm init -y

// install express
> npm install express
or
> npm install express --save

```

## Example

```js
//app.js
// Import Express
const express = require("express");
const app = express();

const port = 3000;

// 2 args -  route , callback(req,res)
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/test", (req, res) => {
  res.send("Hi form test page");
});

app.listen(port, () => {
  console.log(`Server Running `);
});
```

```bash
> node app.js
```

## Express Requests

```js
//get data form user
// route Parameter requests
app.get("/test/:name/:age", (req, res) => {
  //accessing params to get name and age
  // returns object -> {name:'doe' , age:24}
  req.params;
  res.send(req.params.name + ":" + req.params.age);
});

// when we use must needed parameter use route params
```

### Query String Parameter

```js
//http://localhost:3000/test?test=nodejs
// more query strings
//http://localhost:3000/test?lang=nodejs&framework=express
app.get("/test", (req, res) => {
  // ? - query string -> returns object {lang:"nodejs"}
  req.query;
  res.send(req.query.lang);
});

// when we use optional parameter use query params
```

## Serving Static Files - Express

```js
//app.js
const path = require("path");

//app.use() used to use middleware
// in this case use to create alias for static folder
// path.join() -> join path
// __dirname - gives path of app js like(.../nodejs/) and join (/nodejs/static/) ->
// create alias for static (static/index.html -> public/index.html)
app.use("/public", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});
```

## Http Post Req w/ Express and Body Parser Module

```html
<!-- index.html -->
<form action="/" method="POST">
  <div>
    <label for="email">Email </label>
    <input type="email" name="email" />
  </div>
  <div>
    <label for="password">Password </label>
    <input type="password" name="password" />
  </div>
  <button type="submit">Submit</button>
</form>
```

```cmd
> npm install body-parser
```

```js
//app.js
//body-parser use to parse url encoded data and attach to req body
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "static")));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.post("/", (req, res) => {
  console.log(req.body); // returns as object
  //DB work heree
  res.send("success");
});
```

## JSON Data - Express And BodyParser

```html
<!-- index.html - return json value via jquery AJAX -->
<form action="/" method="POST" id="form">
  <div>
    <label for="email">Email </label>
    <input type="email" name="email" />
  </div>
  <div>
    <label for="password">Password </label>
    <input type="password" name="password" />
  </div>
  <button type="submit">Submit</button>
</form>
<script src="jquery.min.js"></script>
<script>
  $(document).ready(() => {
    $("#form").submit((e) => {
      e.preventDefault();
      $.ajax({
        url: "/",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify($("#form").serializeArray()),
        success: (res) => {
          console.log("success");
        },
      });
    });
  });
</script>
```

```js
//app.js
// body-parser use to parse JSON and attach to req body
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "static")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.post("/", (req, res) => {
  console.log(req.body); // returns as object
  //DB work heree
  res.json({ success: true });
});
```

### User Input Validation - Express and JOI

```cmd
> npm install joi
```

```js
//app.js
// same index.html
const express = require("express");
const app = express();
const Joi = require("joi");
const bodyParser = require("body-parser");
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "static")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.post("/", (req, res) => {
  console.log(req.body); // returns as object
  const schema = JOi.object().key({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).max(127).required(),
  });
  // 3 args - obj want to validate, buleprint (schema), callback
  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      console.log("error");
    }
    res.send("success");
  });
  //DB work heree
});
```

### Nested Object JOI Validation

```js
const Joi =  require('joi');

const arrayString = ['banana', 'bacon', 'cheese'];
const arrayObject = [
  {example: 'example1'},
  {example: 'example2'},
  {example: 'example3'}
];

const userInput = {
  personalInfo:{
    streetAddress: '123987982',
    city : 'kjkkjk'.
    state: 'tn'
  },
  preferences: arrayString
  // preferences : arrayObject
};

const personalInfoSchema = Joi.object().key({
  streetAddress: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().length(2).required()
});

const preferencesSchema = Joi.array().items(Joi.string());
// const preferencesSchema = Joi.array().items(Joi.object().key({
//   example: Joi.string().trim().requird()
// }));

const schema = Joi.object().key({
  personalInfo : personalInfoSchema,
  preferences : preferencesSchema
});

Joi.validate(userInput, schema , (err, result)=>{
  if (err){
    console.log(err);
  }
  console.log(result);
});

```

## EJS Templates With Express

```cmd
> npm i ejs
```

```js
//app.js
// EJS - Template languages .ejs extension for file
// EJS allow to create more dynamic webpage

const express = require("express");
const app = express();
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "static")));
// setting template engine as EJS
app.set("view engine", "ejs");

// Create views folder - Exprees automatically knows if folder name as views -> defult folder for views
// create file index.ejs -> our view

app.get("/:userQuery", (req, res) => {
  // don't need to assign .ejs and folder name
  res.render("index", {
    data: {
      userQuery: req.params.userQuery,
      searchResults: ["book 1", "book 2", "book 3"],
      loggedIn: true,
      userName: "Admin",
    },
  });
});
```

```html
<!-- views/index.ejs  -->
<div>
  <!-- if you want to output <%= something %> -->
  <!-- otherwiswe <% something.forEach %> -->
  <h1>You SearchedFor: <%= data.userQuery %></h1>
  <% if(data.loggedIn) { %>
  <h2>You are login as : <%= data.userName %></h2>
  <% } %>

  <ul>
    <% data.searchResults.forEach(result => { %>
    <li><%= result %></li>
    <% }); %>
  </ul>
</div>
```

## Middleware

```js
//app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// badyParser.json() is middleware
app.use(bodyParser.json());
//creating custom middleware
// 3 args -> req,res,next
//  middleware intercept all route
// middleware can modifyed req obj into res obj
app.use((req, res, next) => {
  console.log(req.url, req.method);
  req.name = "doe";
  next();
});

//if you want to middleware intercept specfic route
app.use("/test", (req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.get("/", (req, res) => {
  console.log(req.name);
  res.send("middleware");
});

app.listen(3000);
```

## Express Router

```js
// route/people.js
const express = require(express);
const route = express.Router();

route.get("/", (req, res) => {
  res.send("Success / from people");
});

route.get("/test", (req, res) => {
  res.send("Test people from people");
});

module.exports = route;
```

```js
//app.js
const express = require("express");
const app = express();
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");

const people = require("./routes/people");

app.use("/people", people);

app.listen(3000);
```
