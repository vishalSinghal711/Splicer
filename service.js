const { workerData, parentPort } = require("worker_threads");
var events = require("events");

let fibonacci = (n) => {
  if (n == 1) {
    return 1;
  }
  if (n <= 0) {
    return 0;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

async function run() {
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

  let ans = fibonacci(40);
  console.log({ result_is: ans });
  eventEmitter.emit("done");
  ans = fibonacci(40);
  console.log({ result_is: ans });
  eventEmitter.emit("done");
  ans = fibonacci(40);
  console.log({ result_is: ans });
  eventEmitter.emit("done");
  ans = fibonacci(40);
  console.log({ result_is: ans });
  eventEmitter.emit("done");
  ans = fibonacci(40);
  console.log({ result_is: ans });
  eventEmitter.emit("done");
  ans = fibonacci(40);
  console.log({ result_is: ans });
  eventEmitter.emit("done");
  ans = fibonacci(40);
  console.log({ result_is: ans });
  eventEmitter.emit("done");
}

run();

// parentPort.postMessage({ result_is: fibonacci(workerData) });
