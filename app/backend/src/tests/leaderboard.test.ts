import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests /leaderboard route', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Tests if leaderboard is returned for the home teams', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Tests if leaderboard is returned for the away teams', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Tests if general leaderboard is returned', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard')

    expect(chaiHttpResponse.status).to.equal(200);
  });
});
