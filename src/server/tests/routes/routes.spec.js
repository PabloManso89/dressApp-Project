/**
 * Created by tleppako on 28/11/2016.
 */

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Routing', () => {
  let server;

  beforeEach(() => {
    delete require.cache[require.resolve('../../../../app')];
    server = require('../../../../app');
  });

  afterEach((done) => {
    server.close(done);
  });

  it('should show greeting', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('should show 404 on missing page', (done) => {
    chai.request(server)
    .get('/thisisamissingpagepleasedontadd')
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});
