// sources
// https://nodejs.org/en/docs/
// https://expressjs.com/en/guide/routing.html
// UDEMY olika kurser
// https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU
// https://www.youtube.com/watch?v=pKd0Rpw7O48

var express = require('express'),
path = require('path'),
app = express()
app.set('port', 5000);


const {random, countVowel} = require('./utils')
// middleware
app.use(express.static(path.join(__dirname, "public")))

// gör så att man kan returnera svaret från det man skriver i en form 
// detta använde jag för mina extra uppgifter
app.use(express.urlencoded({extended: true}))


// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/'))
    
})

app.get('/testing', (req, res) => {
    res.send('testing that endpoints work')
})

// returnerara en ett random nummer i json format
// funktionerna ligger i utils och hämtas in högst upp
app.get("/api/random", (req, res) => {
    res.send({ "number": random(0, 1023) });
  }); 

  // om man skickar med params så returnerars JSON automatiskt med res.send()
  // sätter in en variabel som num och hämtar resultatate från det man skriver som endpoint efter custom_random/ "skriver siffran"
  app.get("/api/custom_random/:num", (req, res) => {
    let num = req.params.num;
    res.send({ num: random(0, num) });
    /* console.log({num: random(0,num)}); */
  });


// gör en extra route endpoint med en fråga om ett ord
// tar in info via post req som lagras
app.get("/extra", (req, res) => {
  res.send(`
  <div style="width:100%;height: 100%; background: whitesmoke; color:#282828;">
  <h3>Please enter one word</h3>
  <form action="/extra/result" method="POST">
  <input type="text" name="input"/>
  <button>Submit</button>
  </form>
  </div>`);
}); 

// använder input för att sedan lägga in svaret i en funktion
//funktionen tar använder sen svaret för att räkna ut antalet vokaler i ordet man skrev
app.post("/extra/result", (req, res) => {
  let result = countVowel(req.body.input)
  res.send(`
      <div style="display: flex; align-items: center; background: linear-gradient(to right, #121212, aqua, #fafafa);">
      <span style="color:#f8f8f8;font-size:2rem; margin: 1rem 2rem;">${result}</span>
  <h5 style="color:#fafafa;font-size:1rem;text-shadow: 1px 1px 2px black;">The number of vowels you had in you word</h5>
      </div>
      `)
})

// Extra uppgift gjorde formulär där man skriver in nummer och sen returneras svaret
 app.get("/input", (req, res) => {
    res.send(`
    <div style="width:100%;height: 100%; background: #121212; color:#f4f4f8;">
    <h3>Please enter a number</h3>
    <form action="/input/random" method="POST">
    <input type="text" name="inputNum"/>
    <button>Submit</button>
    </for
    </div>`);
  }); 
 
  // skriver ut svaret på ny sida input/random 
  // svaret tas in och sätts in i funktionen random och görs om till en siffra mellan 0 och random
   app.post("/input/random", (req, res) => {
    let result = req.body.inputNum
    res.send(`
        <div>
        <h2>Your given number is <span style="color:blue;font-size:46px;">${result}</span><h2>
        <h2>A random number between 0 and your given number <span style="color:blue;font-size:46px;">${random(0, result)}</span></h2>
    <h2 style="color:red;font-size:30px;">Is the custom random number</h2>
        </div>
        `)
  }) 



app.listen(5000) 