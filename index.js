const language = require('@google-cloud/language');

const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const target = 'en';

async function translateText(text) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let translations = await translate.translate(text, target);
  console.log('Translations:',translations[0]);
  return translations[0];
 
  }


// Creates a client
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following line to run this code.
 */
async function fetchResult (){
const text = "La maladie est une altération des fonctions ou de la santé d'un organisme vivant.On parle aussi bien de la maladie, se référant à l'ensemble des altérations de santé, que d'une maladie, qui désigne alors une entité particulière caractérisée par des causes, des symptômes, une évolution et des possibilités thérapeutiques propres. Un ou une malade est une personne souffrant d'une maladie, qu'elle soit déterminée ou non. Lorsqu'elle fait l’objet d'une prise en charge médicale, on parle alors de patient(e).";
const translatedText=await translateText(text);
// Prepares a document, representing the provided text
const document = {
  content: translatedText,
  type: 'PLAIN_TEXT',
};


const [result] = await client.analyzeEntities({document});

const entities = result.entities;
entities.sort(function(a, b){return b.salience-a.salience});
console.log('Entities:');
entities.forEach(entity=>{
    console.log(entity.name,entity.salience);
});



const [classification] = await client.classifyText({document});
console.log('Categories:');
classification.categories.forEach(category => {
  console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
});
};
fetchResult();

