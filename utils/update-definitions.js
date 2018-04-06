var https = require('https');
var fs = require('fs');
var path = require('path');

let languages = [
  'de',
  'en',
  'es',
  'es-mx',
  'fr',
  'it',
  'ja',
  'pl',
  'pt-br',
  'ru',
  'zh-cht'
]
let definitions = [
  'DestinyActivityDefinition',
  'DestinyActivityModeDefinition',
  'DestinyClassDefinition',
  'DestinyRaceDefinition'
]

try {
  fs.mkdirSync('./utils/defs');
} catch (e) { console.log('error creating folder'); }

languages.forEach(language => {
  noHyphen = language;
  if (language[2]) {
    noHyphen = language.slice(0,2) + language.slice(3);
  }
  definitions.forEach(definition => {
    try {
      fs.unlinkSync('./utils/defs/' + noHyphen + '/' + definition + '.json');  
    } catch (e) { console.log('error deleting file'); }
  });
  try {
    fs.rmdirSync('./utils/defs/' + noHyphen);
  } catch (e) { console.log('error deleting folder'); }
  try {
    fs.mkdirSync('./utils/defs/' + noHyphen);
  } catch (e) { console.log('error creating folder'); }
  definitions.forEach(definition => {
    try {
      let file = fs.createWriteStream('./utils/defs/' + noHyphen + '/' + definition + '.json');
      https.get('https://destiny.plumbing/' + language + '/raw/' + definition + '.json', response => {
        response.pipe(file);
      });
    } catch (e) { console.log(e); }
  });
  try {
    let file = fs.createWriteStream('./utils/defs/en/Emblem.json');
    https.get('https://destiny.plumbing/en/items/Emblem.json', response => {
      response.pipe(file);
    });
  } catch (e) { console.log(e); }
})