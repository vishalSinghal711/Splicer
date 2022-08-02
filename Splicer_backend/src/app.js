// ENTRY POINT OF THE NODE APPLICATION

const morgan = require("morgan");

// imported express framework installed using npm i express
express = require("express");
//console.log(typeof express); : returns function

//! IMPORTED cors middleware from mpm
/*Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading of resources.
 * Here we used cors becoz. our react application is running on different port and nodejs application on other port so, single-origin policy rejects resourse shareing
 */
const cors = require("cors");

const app = express(); // app represent an application
//console.log('App is ', typeof app); : returns function
// so, we know express is function
//when we run it -> it returns one more function which we stored in app
//now if we do app. then how we can use (.) operator which can only be used with functions.
//Reason -> Every Function in JS in Object

//! Adding Middlewares to every request and response
// to enable cross resourse sharing for every request,response
app.use(cors());
app.use(morgan("dev"));
// to enable Json conversion for every request,response
app.use(express.json());
//custom middleware for interruping every request (this can we used for adding , checking api keys for user and server as a user)
app.use((request, response, next) => {
  const time = Date.now();
  console.log("Request Came");
  next();
  const tm2 = Date.now();
  console.log("Response Going after ", tm2 - time, "milli-seconds");
});

// Adding Middlewares for specific matching request
app.use("/v1/", require("./routes/users/user.routes")); // / root or Home
app.use("/v1/", require("./routes/categories/category.routes"));
app.use("/v1/", require("./routes/subcategories/subcategory.routes"));
app.use('/v1/', require('./routes/vendors/vendor.routes'));

//now app knows how to handle requests and responses but it needs some place where it can work on those requests or where these requests will be listened

// we will user server for this task
//server.js doing the job for listeneing

const application = app;

module.exports = application;
