const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// function to handle posts
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname !== '/addCharacter') return;

  const res = response;
  const body = [];

  // if error, present error and send 400 error
  request.on('error', (e) => {
    console.dir(e);
    res.statusCode = 400;
    res.end();
  });

  request.on('data', (data) => {
    body.push(data);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    jsonHandler.addCharacter(request, res, bodyParams);
  });
};

// function to handle requests
const handleGet = (request, response, parsedUrl) => {
    //console.log(parsedUrl);

    //grab the query parameters (?key=value&key2=value2&etc=etc)
    //and parse them into a reusable object by field name
    const params = query.parse(parsedUrl.query);
    
    switch (parsedUrl.pathname) {
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/getList':
      jsonHandler.getList(request, response, 200);
      break;
    case '/':
    case '/client.html':
      htmlHandler.getIndex(request, response);
      break;
      case '/getCharacter':
      jsonHandler.getCharacter(request, response, params);
      break;
    default:
      jsonHandler.notFound(request, response, 404);
      break;
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  switch (request.method) {
    case 'GET':
      handleGet(request, response, parsedUrl);
      break;
    case 'POST':
      handlePost(request, response, parsedUrl);
      break;
    default:
      jsonHandler.notFound(request, response);
      break;
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
