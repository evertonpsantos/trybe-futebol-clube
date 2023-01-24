import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamsModel from '../database/models/Team';

import { app } from '../app';

import { Response } from 'superagent';
import { allTeamsMock, oneTeamMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests /teams route', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Tests if team list is returned on /teams', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeamsMock as TeamsModel[]);
    chaiHttpResponse = await chai.request(app)
    .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeamsMock);
  });

  it('Tests one team is returned on /teams/:id', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves(oneTeamMock as any);
    chaiHttpResponse = await chai.request(app)
    .get('/teams/16');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(oneTeamMock);
  });
});
