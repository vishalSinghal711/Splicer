const app = require('../../app');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//  configured dotenv - just like initialization
dotenv.config();

beforeAll(async () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });
});

let phnNo = 9000000000;
let pass = 'Suraj@124';

describe('Test POST  /register', () => {
  beforeEach(() => {
    phnNo += 1;
  });
  it('should not register the user due to gender validation', async () => {
    const response = await request(app)
      .post('/v1/user/register')
      .send({
        name: 'Suraj Kumar',
        gender: '',
        email_id: 'vishalsinghal711@gmail.com',
        phn_no: `${phnNo}`,
        password: 'Suraj@124',
        profile_pic: '',
        dob: '02/16/2001',
      });
    // const res = 201;
    expect(response.status).toBe(400);
  });
  it('should not register the user due to email validation', async () => {
    const response = await request(app)
      .post('/v1/user/register')
      .send({
        name: 'Suraj Kumar',
        gender: 'M',
        email_id: 'vishalsinghal711',
        phn_no: `${phnNo}`,
        password: 'Suraj@124',
        profile_pic: '',
        dob: '02/16/2001',
      });
    // const res = 201;
    expect(response.status).toBe(400);
  });
  it('should not register the user due to phn validation', async () => {
    const response = await request(app)
      .post('/v1/user/register')
      .send({
        name: 'Suraj Kumar',
        gender: 'M',
        email_id: 'vishalsinghal711@gmail.com',
        phn_no: `${phnNo / 10}`,
        password: 'Suraj@124',
        profile_pic: '',
        dob: '02/16/2001',
      });
    // const res = 201;
    expect(response.status).toBe(400);
  });
  it('should not register the user due to pass validation', async () => {
    const response = await request(app)
      .post('/v1/user/register')
      .send({
        name: 'Suraj Kumar',
        gender: 'M',
        email_id: 'vishalsinghal711@gmail.com',
        phn_no: `${phnNo}`,
        password: '',
        profile_pic: '',
        dob: '02/16/2001',
      });
    expect(response.status).toBe(400);
  });
  it('should not register the user due to dob validation', async () => {
    const response = await request(app)
      .post('/v1/user/register')
      .send({
        name: 'Suraj Kumar',
        gender: 'M',
        email_id: 'vishalsinghal711@gmail.com',
        phn_no: `${phnNo}`,
        password: 'Suraj@124',
        profile_pic: '',
        dob: '16/02/2001',
      });
    expect(response.status).toBe(400);
  });
  it('should register the user', async () => {
    const response = await request(app)
      .post('/v1/user/register')
      .send({
        name: 'Suraj Kumar',
        gender: 'M',
        email_id: 'vishalsinghal711@gmail.com',
        phn_no: `${phnNo}`,
        password: `${pass}`,
        profile_pic: '',
        dob: '02/16/2001',
      });
    expect(response.status).toBe(201);
  });
});
describe('Test POST  /login', () => {
  // tc - 1
  it('should not login with insufficient fields', async () => {
    const res = await request(app).post('/v1/user/login').send({
      phn_no: '8811421320',
    });
    expect(res.status).toEqual(400);
  });
  // tc - 2
  it('should not login with insufficient fields', async () => {
    const res = await request(app).post('/v1/user/login').send({
      password: 'oooooo',
    });
    expect(res.status).toEqual(400);
  });
  // tc - 3
  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/v1/user/login')
      .send({
        phn_no: `${phnNo}`,
        password: `${pass}abc`,
      });
    expect(res.status).toEqual(401);
  });
  // tc - 4
  it('should not login with user not found', async () => {
    const res = await request(app)
      .post('/v1/user/login')
      .send({
        phn_no: `${phnNo} + 1`,
        password: `${pass}`,
      });
    expect(res.status).toEqual(401);
  });
  // tc - 5
  it('should login with user and password', async () => {
    const res = await request(app)
      .post('/v1/user/login')
      .send({
        phn_no: `${phnNo}`,
        password: `${pass}`,
      });
    expect(res.status).toEqual(200);
  });
});
