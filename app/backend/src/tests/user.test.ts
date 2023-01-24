import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../database/models/User';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests login route', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Tests if error is returned if password is not passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com'});

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  it('Tests if error is returned if email is not passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ password: 'wrong_password' });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  it('Tests if error is returned if wrong password is passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'wrong_password'});

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

  it('Tests if error is returned if email is passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: 'wrong@email.com', password: 'wrong_password'});

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

  it('Tests if a token is returned if right information is passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin'});

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Tests if error is returned when no token is found', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).not.to.have.property('role');
  });

  it('Tests if role is returned when token is passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0NTE1MjE3LCJleHAiOjE2NzQ2MDE2MTd9.vADIB5zEiCYb_Y0SyNxkREky2gX4uGjcIzJCH54vMgY');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('role');
  });
});
