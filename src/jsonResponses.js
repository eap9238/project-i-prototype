const characters = {};

const respondJSON = (request, response, status, object) => {
  // send response with json object
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to show not found error
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};
// get user object
// should calculate a 200
const getList = (request, response) => {
  // json object to send
  const responseJSON = {
    characters,
  };

    // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// function just to update our object
const addCharacter = (request, response, body) => {
  const responseJSON = { message: 'Name and age are both required.' };

  if (!body.name || !body.level || !body.strength || !body.constitution || !body.dexterity || !body.wisdom || !body.intelligence || !body.charisma) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (!characters[body.name]) {
    //console.dir('making account');
    const status = 201;

    characters[body.name] = {
      name: body.name,
      level: body.level,
      class: body.class,
      race: body.race,
      strength: body.strength,
      constitution: body.constitution,
      dexterity: body.dexterity,
      wisdom: body.wisdom,
      intelligence: body.intelligence,
      charisma: body.charisma
    };

    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, status, responseJSON);
  }
  //console.dir('updating account');
  const status = 204;
  characters[body.name].age = body.age;

  responseJSON.message = 'Updated Successfully';

  return respondJSON(request, response, status, responseJSON);
};

// set public modules
module.exports = {
  addCharacter,
  getList,
  notFound,
};