// Variables
const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
let body;
let timer;
let container;
let quotedisplay;
let nevercalledagain;
let textfield;
let quote;
let seconds;
let tset;
let timeanzeige;
let ID;
let correct;
let count;
let wpm;

let overlay;
let wpm_card;

let i;
let word;
let sentence;

let wordlist;
let wordamount;
// Themes

let Themes_QuoteLeaf_Button;
let Themes_Link_Button;
let Themes_Selected;
// Value after loaded window
window.onload = function () {
  timer = document.getElementById("timer");
  container = document.getElementById("container");
  quotedisplay = document.getElementById("quotedisplay");
  textfield = document.getElementById("textfield");

  // Eventlistener
  textfield.addEventListener("input", corinc);
  seconds = 1;
  tset = 10;
  timeanzeige = document.getElementById("timer");
  correct = true;

  overlay = document.getElementById("card_container");
  wpm_card = document.getElementById("card_wpm");

  i = 0;
  word = null;
  sentence = "";
  // Themes
  Themes_Selected = "QuoteLeaf"
  Themes_QuoteLeaf_Button = document.getElementById("Themes_QuoteLeaf");
  Themes_Link_Button = document.getElementById("Themes_Link"); 
  body = document.body
  // Wordlist
  wordlist = [
    "the",
    "of",
    "and",
    "a",
    "to",
    "in",
    "is",
    "you",
    "that",
    "it",
    "he",
    "was",
    "for",
    "on",
    "are",
    "as",
    "with",
    "his",
    "they",
    "I",
    "at",
    "be",
    "this",
    "have",
    "from",
    "or",
    "one",
    "had",
    "by",
    "word",
    "but",
    "not",
    "what",
    "all",
    "were",
    "we",
    "when",
    "your",
    "can",
    "said",
    "there",
    "use",
    "an",
    "each",
    "which",
    "she",
    "do",
    "how",
    "their",
    "if",
    "will",
    "up",
    "other",
    "about",
    "out",
    "many",
    "them",
    "then",
    "these",
    "so",
    "some",
    "her",
    "would",
    "make",
    "like",
    "him",
    "into",
    "time",
    "has",
    "look",
    "two",
    "more",
    "write",
    "go",
    "see",
    "number",
    "no",
    "way",
    "could",
    "people",
    "my",
    "than",
    "first",
    "water",
    "been",
    "call",
    "who",
    "oil",
    "its",
    "now",
    "find",
    "long",
    "down",
    "day",
    "did",
    "get",
    "come",
    "made",
    "may",
    "part",
  ];
  wordamount = 10;
  // Call function to gen new quote
  renderNew();
};

// Generate random quote
function getRandomQuote() {
  if(wordamount == 10 || wordamount == 25 || wordamount == 50) {
    let sentence = "";
    for (i = 0; i <= wordamount; i++) {
      word = wordlist[Math.floor(Math.random() * wordlist.length)];
      if(i>0){
        sentence = sentence + " "+ word;
      }else{
        sentence = sentence + word;
      }
      
    }
    return sentence;
   
  }
  return "";
}

// Render new quote
async function renderNew() {
  quote = await getRandomQuote();
  textfield.value = null;
  quotedisplay.innerHTML = " ";
  seconds = 0;
  nevercalledagain = undefined;
  // Save every single letter
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quotedisplay.appendChild(characterSpan);
  });
}

// Render new Quote & reset timer/textfield
function tabbed() {
  if (event.which === 9) {
    event.preventDefault();
    renderNew();
    window.clearInterval(ID);
    textfield.focus();
    seconds = 0;
    timeanzeige.innerHTML = seconds + "s";
    textfield.style.background = "var(--textfield)";
    overlay.style = "display:none;";
  }
}

function reset() {
  renderNew();
  window.clearInterval(ID);
  textfield.focus();
  seconds = 0;
  timeanzeige.innerHTML = seconds + "s";
  textfield.style.background = "var(--textfield)";
}

// Function event listener
function corinc(e) {
  let text = e.target.value;

  quotedisplay.innerHTML = "";

  for (i = 0; i < quote.length; i++) {
    // Start timer
    if (nevercalledagain === undefined) {
      ID = window.setInterval(changetimer, 10);
      nevercalledagain = true;
    }

    if (i < text.length) {
      if (text[i] == quote[i]) {
        // Richtig, wenn char gleich ist
        const characterSpan = document.createElement("span");
        characterSpan.innerText = quote[i];
        quotedisplay.appendChild(characterSpan);
        characterSpan.style.color = "var(--correct)";
        textfield.style.background = "var(--textfield)";
      } else {
        // Falsch, wenn char nicht gleich ist
        const characterSpan = document.createElement("span");
        characterSpan.innerText = quote[i];
        characterSpan.style = "color:var(--incorrect)";
        textfield.style.background = "#f47174";
        quotedisplay.appendChild(characterSpan);
      }
    } else {
      // Wenn noch nicht geschrieben
      const characterSpan = document.createElement("span");
      characterSpan.innerText = quote[i];

      quotedisplay.appendChild(characterSpan);
    }
  }

  // Vergleich ob alles geschrieben
  if (text == quote) {
    count = quote.split(" ").length + 1;

    if (seconds > 0) {
      wpm = (count / (seconds + 1)) * 60;
      overlay.style = "display:grid;";
      wpm_card.innerHTML = Math.round(wpm) + "wpm";
      reset();
    } else {
    }
  }
}

// Timer
function changetimer() {
  seconds = seconds + 0.01;
  timeanzeige.innerHTML = Math.round(seconds) + "s";
}

//word settings
function numberofwords(number) {
  if(number == 50) {
    quotedisplay.style.fontSize = "1.8rem";
  } else {
    quotedisplay.style.fontSize = "2rem";
  }

  wordamount = number;
  console.log();
  renderNew();
}

function themes() {
  Themes_container.style = "display:block;";
  SettingsArea.style = "display:none";
}
function Info() {
  Info_container.style = "display:block;";
  SettingsArea.style = "display:none";
}
function Ranking() {
  Ranking_container.style = "display:block;";
  SettingsArea.style = "display:none";
}
function closethemes() {
  Info_container.style = "display:none";
  Themes_container.style = "display:none;";
  Ranking_container.style = "display:none;";

  SettingsArea.style = "display: block";
}
function settings() {}
function guide() {
  window.open("/guide.html");
}
// Themes
function Theme_QuoteLeaf() {
  body.classList.remove(Themes_Selected);
  body.classList.add("QuoteLeaf");
  Themes_Selected = "QuoteLeaf";
  document.getElementById("particles-js").style.display = "none";

}
function Theme_Link(){

  body.classList.remove(Themes_Selected);
  body.classList.add("Link");
  document.getElementById("particles-js").style.display = "block";
  Themes_Selected = "Link";
  document.getElementById("Logo").style.display = "none"


}
function Theme_Minimal() {
  body.classList.remove(Themes_Selected);
  body.classList.add("Minimal");
  Themes_Selected = "Minimal";
  document.getElementById("Logo").style.display = "none"
  document.getElementById("particles-js").style.display = "none";

}
function Theme_Gradient() {
  body.classList.remove(Themes_Selected);
  body.classList.add("Gradient");
  Themes_Selected = "Gradient";
  document.getElementById("particles-js").style.display = "none";
  document.getElementById("Logo").style.display = "none"


}
function Theme_Vortex() {
  body.classList.remove(Themes_Selected);
  body.classList.add("Vortex");
  Themes_Selected = "Vortex";
  document.getElementById("particles-js").style.display = "none";
  document.getElementById("Logo").style.display = "none"

}
function Theme_Shadow() {
  body.classList.remove(Themes_Selected);
  body.classList.add("Shadow");
  Themes_Selected = "Shadow";
  document.getElementById("particles-js").style.display = "none";
  document.getElementById("Logo").style.display = "none"
}
function Theme_Cubes() {
  body.classList.remove(Themes_Selected);
  body.classList.add("Cubes");
  Themes_Selected = "Cubes";
  document.getElementById("particles-js").style.display = "none";
  document.getElementById("Logo").style.display = "none"
}
  
function Theme_Mountains() {
  body.classList.remove(Themes_Selected);
  body.classList.add("Mountains");
  console.log(body.classList);
  Themes_Selected = "Mountains";
  document.getElementById("particles-js").style.display = "none";
  document.getElementById("Logo").style.display = "none"
}
  
function Theme_X() {
  body.classList.remove(Themes_Selected);
  body.classList.add("X");
  Themes_Selected = "X";
  document.getElementById("particles-js").style.display = "none";
  document.getElementById("Logo").style.display = "none"
}
  