import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import http from 'http';
import app from '../../lib/app';

const server = http.createServer(app);
const request = chai.request(server);

after(() => server.close());

module.exports = request; 