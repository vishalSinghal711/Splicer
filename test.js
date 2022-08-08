const UserModel = require("./Splicer_backend/src/db/models/user/user.mongo");

async function test() {
  // const obj = {
  //   name: "ABC pvt ltd",
  //   category: 1,
  //   address: "123, Street xyz",
  //   product_image: ["", ""],
  //   address_image: ["", ""],
  //   address_latitude: 92.23,
  //   address_longitude: 98.12,
  //   age: 30,
  // };
  // console.log(JSON.stringify(obj));

  console.log(/^[0-9]+$/.test("123"));
  console.log(/^[0-9]+$/.test("123f"));
}
test();
