import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import http from 'node:http';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const livereloadServer = livereload.createServer();
livereloadServer.watch(path.join(__dirname, '../_site'));

const serve = serveStatic(path.join(__dirname, '../_site'), { 'index': ['index.html', 'index.htm'], extensions: ['html'] })

const server = http.createServer((req, res) => {
  connectLivereload()(req, res, () => {
    const done = finalhandler(req, res);
    serve(req, res, done);
  });
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});