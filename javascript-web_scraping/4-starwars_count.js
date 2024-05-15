#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];
const characterId = '18';

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  if (response.statusCode !== 200) {
    console.error(`Error: Status code ${response.statusCode}`);
    return;
  }
  
  const filmsData = JSON.parse(body).results;
  const moviesWithWedge = filmsData.filter(film =>
    film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)
  );

  console.log(moviesWithWedge.length);
});
