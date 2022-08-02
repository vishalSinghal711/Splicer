const { Worker } = require("worker_threads");
var events = require("events");

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./service.js", { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function run() {
  //Using worker threads achieved 7 fib of 40 in approx 2.8 seconds which take approx 11.5 seconds synchrounously

  let counter = 0;
  const timeNow = Date.now();
  let timeEnd = Date.now();
  var eventEmitter = new events.EventEmitter();
  eventEmitter.addListener("done", () => {
    console.log("Innnnnn", counter);
    if (counter == 6) {
      timeEnd = Date.now();
      console.log("Differnce time ", timeEnd - timeNow + " ms");
    } else {
      counter = counter + 1;
    }
  });

  runService(40).then((result) => {
    console.log(result);
    eventEmitter.emit("done");
  });
  runService(40).then((result) => {
    console.log(result);
    eventEmitter.emit("done");
  });
  runService(40).then((result) => {
    console.log(result);
    eventEmitter.emit("done");
  });
  runService(40).then((result) => {
    console.log(result);
    eventEmitter.emit("done");
  });
  runService(40).then((result) => {
    console.log(result);
    eventEmitter.emit("done");
  });
  runService(40).then((result) => {
    console.log(result);
    eventEmitter.emit("done");
  });
  runService(40).then((result) => {
    console.log(result);
    eventEmitter.emit("done");
  });
}

run().catch((err) => console.error(err));
