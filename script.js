//API key from NewsAPI (you must replace with your own key if needed)
const API_KEY = "c3aa07d8c1034128917a2ce5f17fdd8e";
//Base URL for fetching news data
const url = "https://newsapi.org/v2/everything?q=";

//When the website loads, it will automatically show news about "India"
window.addEventListener("load", () => fetchNews("India"));

//Function to reload the page
function reload() {
    window.location.reload();
}

//Function to fetch news from the API based on the search query
 async function fetchNews(query) {
     
     // Fetch data from the API using the query and API key
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);

    // Convert the response into JSON format
    const data = await res.json();
    // Send the fetched articles to display on the page
    bindData(data.articles);
}

//Function to display (bind) the fetched articles as cards on the web page
function bindData(articles){
    
    const cardsContainer = document.getElementById('cards-container'); // Container for news cards
    const newsCardTemplate = document.getElementById('template-news-card'); // Template for each news card
    cardsContainer.innerHTML = '';    // Clear old news before showing new ones

    // Loop through each article and create a news card
    articles.forEach(article => {
        
        if(!article.urlToImage) return; // Skip if the article has no image
        const cardClone = newsCardTemplate.content.cloneNode(true); // Copy the template
        fillDataInCard(cardClone, article);  // Fill the data inside the copied card
        cardsContainer.appendChild(cardClone);   // Add the card to the container


    });
}

// Function to fill article data inside each news card
function fillDataInCard(cardClone, article) {
   // Get the HTML elements inside the news card 
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    // Set the news image, title, and description
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // Format and show the publish date and source
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

     // When someone clicks the card, open the full article in a new tab
    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
// Keeps track of the currently selected navigation item (like "Sports", "Tech", etc.)
let curSelectedNav = null; 

//Function that runs when a navigation item is clicked
function onNavItemClick(id) {
    fetchNews(id); // Fetch news related to that category
    const navItem = document.getElementById(id); // Get the clicked nav item
    curSelectedNav?.classList.remove("active");  // Remove 'active' style from old nav
    curSelectedNav = navItem;    // Save the current nav               
    curSelectedNav.classList.add("active");  // Highlight the new active nav
}

//Search feature elements
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

// When user clicks the search button
searchButton.addEventListener("click", () => {
    const query = searchText.value; //Get text from search input
    if (!query) return;   // Do nothing if input is empty
    fetchNews(query);     // Fetch news for the entered topic
    curSelectedNav?.classList.remove("active");  // Remove active nav highlight
    curSelectedNav = null; // Reset active navigation

});
