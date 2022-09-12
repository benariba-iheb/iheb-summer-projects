const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');


const speakBtn = document.getElementById('speaker');
const copyBtn = document.getElementById('copy');
const twitterBtn = document.getElementById('twitter');

const quoteBtn = document.getElementById('quote-btn');



window.onload = randomquote;

function randomquote() {
     quoteBtn.classList.add('loading');

     fetch("https://api.quotable.io/random").then(response => response.json()).then(data => {
               console.log(data);
               quoteText.innerText = data.content;
               quoteAuthor.innerText = `_ _${data.author}`; 
          }
     );
     quoteBtn.classList.remove('loading');
 }

quoteBtn.addEventListener("click" , randomquote)


speakBtn.addEventListener("click", () => {
     const utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${quoteAuthor.innerText.slice(3)}`);
     utterance.rate = 1;
     utterance.pitch = 0.5;
     utterance.volume = 0.8;
     speechSynthesis.speak(utterance);
});


copyBtn.addEventListener("click", () => {
     const text = quoteText.innerText;
     navigator.clipboard.writeText(text);
});

twitterBtn.addEventListener("click", () => {
     let tweet  = `https://twitter.com/intent/tweet?text=${quoteText.innerText} by ${quoteAuthor.innerText.slice(3)}`;
     window.open(tweet , "_blank");
});

