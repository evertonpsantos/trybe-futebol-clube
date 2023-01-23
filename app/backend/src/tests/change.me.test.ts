import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests login route', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Checks if a token is returned if everything goes right', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: 'annatorvin@gmail.com', password: 'goneIn60'});

    expect(chaiHttpResponse.body).to.have.property('token');
  });
});
