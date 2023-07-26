// Bot scraping 
//Refresh et envoie message(whatsapp)

const puppeteer = require("puppeteer");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function envoyerSms(message) {
  const accountSid = 'Sid number';
  const authToken = 'auth number';
  const client = require("twilio")(accountSid, authToken);

  client.messages.create({
    body: message,
    from: 'whatsapp:+ twilio phone',
    to: 'whatsapp:+ your phone'
  }, (err, message) => { //Gestion d'erreur, num Sid si ça marche
    if (err) {
      console.error(err);
    } else {
      console.log(message.sid);
    }
  });
}


//Pour automatiser mettre TOUTE la fonction ASYNC dans verfierDate(){...};
async function verifierDate(){
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto(
    "https://www.nike.com/fr/t/chaussure-air-force-1-07-pour-GjGXSP/CW2288-111"
  );

  await sleep(2000);

  await page.click("button[aria-label='Tout refuser']"); //Captcha

  await sleep(4000);

  // let paireRecherchee = 'input.visually-hidden[value="25634221:9"]'; //42.5
  let paireRecherchee = 'input[name="skuAndSize"][value="25634211:9.5"]'; //43
  if (await page.$eval(paireRecherchee, (el) => el.disabled === false )) {
    await envoyerSms(
      "Ta paire est dispo, COURS !" +
        "Le lien ;) : https://www.nike.com/fr/t/chaussure-air-force-1-07-pour-GjGXSP/CW2288-111"
    );
    console.log("Dispo");
  } else {
    console.log("Aucune paire");
  }


  // Close browser.
  await browser.close();
};

verifierDate(); //Appel de la fonction
setInterval(verifierDate,1000*60*10) //Actualise toutes les 10min