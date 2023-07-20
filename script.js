const API_KEY = "f4f09b66c74c477cbeecd5d77b39e2ad";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data);
}

function reload(){
    window.location.reload();
}

function bindData(articles)
{
    const cardcontainer =document.getElementById('card-container');
    const newscardtemplate = document.getElementById('template-news-card');

    cardcontainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return
        const cardclone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        cardcontainer.appendChild(cardclone);
        
    });
}

function fillDataInCard(cardclone, article){
    const newsImg = cardclone.querySelector('#news-img');
    const newsTitle = cardclone.querySelector('#news-title');
    const newsSource = cardclone.querySelector('#news-source');
    const newsDesc = cardclone.querySelector('#news-desc');

    newsImg.src =article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{  
    timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardclone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");
    });
}

let currentSelectedNav =null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text')

searchButton.addEventListener('click', ()=>{
    const query= searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active')
    currentSelectedNav =null;
} )