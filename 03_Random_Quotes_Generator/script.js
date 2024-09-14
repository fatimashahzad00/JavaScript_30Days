const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteButton = document.getElementById('new-quote');
const quoteBox = document.getElementById('quote-box');

if (quoteText && quoteAuthor && newQuoteButton && quoteBox) {
    fetch('quotes.json')
        .then(response => response.json())
        .then(quotes => {
            function getRandomQuote() {
                return quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
            }

            function displayQuote() {
                const { quote, author } = getRandomQuote();
                quoteText.textContent = `"${quote}"`;
                quoteAuthor.textContent = `- ${author}`;
                quoteBox.classList.add('show-quote');
            }

            newQuoteButton.addEventListener('click', displayQuote);

            // Display a quote when the page loads
            displayQuote();
        })
        .catch(error => console.error('Error fetching quotes:', error));
} else {
    console.error('Error: One or more elements not found in the DOM');
}


