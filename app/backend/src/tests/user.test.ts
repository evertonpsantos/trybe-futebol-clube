import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { tokenMock } from './mocks/user.mocks';
import UserModel from '../database/models/User';

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

  it('Tests if error is returned when wrong format token is passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', 'token');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).not.to.have.property('role');
  });

  it('Tests if error is returned when invalid token is passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', 'newe4.uian44.huiha9');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).not.to.have.property('role');
  });

  it('Tests if error is returned when no user is found', async () => {
    sinon.stub(UserModel, 'findOne').resolves(undefined);
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).not.to.have.property('role');
  });

  it('Tests if role is returned when token is passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('role');
  });
});
