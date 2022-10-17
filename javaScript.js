const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-qoute");
const loader = document.getElementById("loader");

let apiQuotes = [];
// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// show new quotes
function newQuote() {
    // pick random qoute from api array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if the author field is blank and replace with 'unkown'
    if (quote.author === null) {
        quote.author = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //  check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
}


// get qoute from API

async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // this is how to catch error
    }
}

// tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// onload
getQuotes();
