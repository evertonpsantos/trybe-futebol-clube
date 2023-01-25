import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import MatchesModel from '../database/models/Match';
import { allMatchesMock, matchesWithFilter, newMatchDB, newMatchReq, oneMatchMock, sameTeamIdMock, updateScoreReq, wrongTeamIdMock } from './mocks/matches.mock';
import { allTeamsMock } from './mocks/teams.mock';
import { tokenMock } from '../tests/mocks/user.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests /matches route', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Tests if all matches list is returned', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(allMatchesMock as unknown as MatchesModel[]);
    chaiHttpResponse = await chai.request(app)
    .get('/matches')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.eq(allMatchesMock);
  });

  it('Tests if matches list returns filtered', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesWithFilter as unknown as MatchesModel[]);
    chaiHttpResponse = await chai.request(app)
    .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.eq(matchesWithFilter);
  });

  it('Tests it is possible to create a new match', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(allTeamsMock as unknown as MatchesModel[]);
    sinon.stub(MatchesModel, 'create').resolves(newMatchDB as MatchesModel);

    chaiHttpResponse = await chai.request(app)
    .post('/matches')
    .set('Authorization', tokenMock)
    .send(newMatchReq)

    expect(chaiHttpResponse.status).to.equal(201);
    expect(chaiHttpResponse.body).to.deep.eq(newMatchDB);
  });

  it('Tests if returns error when to same team ids are passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/matches')
    .set('Authorization', tokenMock)
    .send(sameTeamIdMock)

    expect(chaiHttpResponse.status).to.equal(422);
    expect(chaiHttpResponse.body.message).to.deep.eq('It is not possible to create a match with two equal teams');
  });

  it('Tests if returns error when unexisting id is passed', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/matches')
    .set('Authorization', tokenMock)
    .send(wrongTeamIdMock)

    expect(chaiHttpResponse.status).to.equal(404);
    expect(chaiHttpResponse.body.message).to.deep.eq('There is no team with such id!');
  });

  it('Tests if is possible to change inProgress attribute', async () => {
    sinon.stub(MatchesModel, 'findByPk').resolves(allMatchesMock[0] as any);
    sinon.stub(MatchesModel, 'update').resolves();
    chaiHttpResponse = await chai.request(app)
    .patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.eq('Finished');
  });

  it('Tests if error is returned when wrong match id is passed', async () => {
    sinon.stub(MatchesModel, 'findByPk').resolves(undefined);
    chaiHttpResponse = await chai.request(app)
    .patch('/matches/111/finish');

    expect(chaiHttpResponse.status).to.equal(404);
    expect(chaiHttpResponse.body).to.deep.eq('Match doesn\'t exist');
  });

  it('Tests if is possible to update match score', async () => {
    sinon.stub(MatchesModel, 'findByPk').resolves(allMatchesMock[0] as any);
    sinon.stub(MatchesModel, 'update').resolves();
    chaiHttpResponse = await chai.request(app)
    .patch('/matches/1')
    .send(updateScoreReq)

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.message).to.deep.eq('Match score updated');
  });

  it('Tests if it\'s not possible to update unexisting match', async () => {
    sinon.stub(MatchesModel, 'findByPk').resolves(undefined);
    chaiHttpResponse = await chai.request(app)
    .patch('/matches/111');

    expect(chaiHttpResponse.status).to.equal(404);
    expect(chaiHttpResponse.body.message).to.deep.eq('Match doesn\'t exist');
  });
});
