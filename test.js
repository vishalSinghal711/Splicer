const UserModel = require("./Splicer_backend/src/db/models/user/user.mongo");

async function test() {
  try {
    const k = await UserModel.findOne(
      { phn_no: '8800425592' },
      { _id: 0, __v: 0 }
    );
    console.log(k);
  } catch (err) {
    console.log(err.message);
  }
}
test();
