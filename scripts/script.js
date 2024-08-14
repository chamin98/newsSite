
  const apikey = "";
  const blogContainer = document.getElementById("blog-container");
  const searchField = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');


 
  async function fetchRandomNews() { //Fetach function
    try {
      const apiUrl = 
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=15&apikey=${apikey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error("Error fetching", error);
      return [];
    }
  }

  searchButton.addEventListener('click', async () => {  //Event listner for search button
    const query = searchField.value.trim();
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch (error) {
            console.log('Error fetching news by query', error);
        }
    }
  })

  async function fetchNewsQuery(query){   //Fetch search results
    try {
        const apiUrl = 
        `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
      } catch (error) {
        console.error("Error fetching", error);
        return [];
      }
  }

  function displayBlogs(articles) {  //Display function
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      const img = document.createElement("img");
      img.src = article.urlToImage || "https://placehold.co/600x400"; // Fallback image URL
      img.alt = article.title;

      const title = document.createElement("h2");
      const truncatedTitle =
        article.title.length > 30
          ? article.title.slice(0, 30) + "....."
          : article.title;
      title.textContent = truncatedTitle;

      const description = document.createElement("p");
      

      const truncatedDes =
      article.description.length > 120
        ? article.description.slice(0, 120) + "....."
        : article.description;
        description.textContent = truncatedDes;


      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(description);
      blogCard.addEventListener("click", () =>{
        window.open(article.url, "_blank")
      })
      blogContainer.appendChild(blogCard);
    });
  }

  (async () => {
    try {
      const articles = await fetchRandomNews();
      displayBlogs(articles);
    } catch (error) {
      console.error("Error fetching", error);
    }
  })();

