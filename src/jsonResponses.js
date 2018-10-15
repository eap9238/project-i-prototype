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

// get character list
// should calculate a 200
const getList = (request, response) => {
  let i = 0;
  const j = Object.keys(characters);
    
  /*
  const characterList = [];

  if (j.length > 0) {
    while (i < j.length) {
      characterList[i] = characters[j[i]].name;
      i++;
    }
  }
  */
    
  const characterList = {};

  if (j.length > 0) {
    while (i < j.length) {
      characterList[characters[j[i]].name] = {
          name: characters[j[i]].name,
          class: characters[j[i]].class,
      };
        
      i++;
    }
  }

  // console.log(j);
  const responseJSON = {
    characterList,
  };

    // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// get character object
// should calculate a 200
const getCharacter = (request, response, param) => {    
    // json object to send
    //console.log(param.name);
    //console.log(characters[param.name]);

    const character = characters[param.name];

    if (character) {
        const responseJSON = {
            character,
        };

        // return 200 with message
        return respondJSON(request, response, 200, responseJSON);
    }
    else {
        return notFound(request, response);
    }
};

// function just to update our object
const addCharacter = (request, response, body) => {
  const responseJSON = { message: 'Name and age are both required.' };

  if (!body.name || !body.level || !body.strength || !body.constitution) {
    if (!body.dexterity || !body.wisdom || !body.intelligence || !body.charisma) {
      responseJSON.id = 'missingParams';
      return respondJSON(request, response, 400, responseJSON);
    }
  }

  if (!characters[body.name]) {
    // console.dir('making account');
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
      charisma: body.charisma,
    };

    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, status, responseJSON);
  }
  // console.dir('updating account');
  const status = 204;
  characters[body.name].age = body.age;

  responseJSON.message = 'Updated Successfully';

  return respondJSON(request, response, status, responseJSON);
};

// set public modules
module.exports = {
  addCharacter,
  getCharacter,
  getList,
  notFound,
};
