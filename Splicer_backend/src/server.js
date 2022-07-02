//!IMPORTANT
// os module for interacting and getting info of machine through the os in which the server in running
//const os = require("os");

// cluster module used to create worker threads which diides the load and prevents blocking of event loop as much as it can
//const cluster = require("cluster");

//fork is method to create worker process when it found that we are in master process
//const { fork } = require("child_process");

//driver for mongoDB
const mongoose = require("mongoose");

// IMPORTED dotenv package to get access  on .env file
const dotenv = require("dotenv");
//  configured dotenv - just like initialization
dotenv.config();

// required the app from app.js which can handle requests and responses
const app = require("./app");

//  required the server package which allows listening
const http = require("http");

// creating the server with the app which knows how to react to requests
const server = http.createServer(app);

//!IMPORTANT
//Commented becoz we will use pm2 but here written theory

//* Used clustering to devide the load on 1 master process and 3 working processes which are using other cores of our cpu
//for each core server will start and any cost
//*process.pid gives the id of the current process
//cluster.isMaster returns whether the current executing process is master process
//*uses round robin approach
//*provide parallelism and good concurrency to server

//* CODE
// console.log("Server is starting for ", process.pid, cluster.isMaster);
// if (cluster.isMaster) {
//   //count the number of threads machine has available
//   const noOfCores = os.cpus().length;

//   //using all the threads to maximize the parallelism
//   for (var i = 0; i < noOfCores; i++) {
//   //this method helps in creating number of working threads
//     cluster.fork();
//   }
// } else {
//   // listening at port 2345 and if there is err consoling it
//   const port = server.listen(2345, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("port is = ", port.address().port);
//     }
//   });
// }

async function connectMongoDbAndServer() {
  //* first connecting to Mongo ATlas
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });

  //*started listening
  const port = server.listen(process.env.PORT || 8000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("port is = ", port.address().port);
    }
  });
} ;
connectMongoDbAndServer();

//callbacks on connecting with mongoDB
mongoose.connection.on("open", () => {
  console.log("Mongoose Connection is Ready to Bang...");
});
mongoose.connection.on("err", (err) => {
  console.log("Connection failed due to ", `${err}`);
});

//!IMPORTANT
// we can use pm2 Tool also for clustering which uses this cluster module under the hood and also provides the cluster manager to work with the different processes
//pm2 is Great during development and monitoring purposes
// pm2 can provide zero downtime reloads on all server
//checking all servers using monitoring

//TODO MULTITHREADING - TO BE LEARNT - Used when some work has to be done on main thread like sorting,searching etc (Cpu Intensive Tasks)
// const { isMainThread , workerData , Worker } = require('worker_threads');
