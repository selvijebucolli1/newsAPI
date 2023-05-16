const API_BASE_URL = "https://balkaninsight.com/wp-json/wp/v2/posts";

const newsContainer = document.querySelector(".news");
const loader = document.querySelector(".loader");
const loadBtn = document.querySelector(".load-news__btn");
const loader2 = document.querySelector(".load-news__loader");
const ctgButtons = document.querySelectorAll(".category-button");

ctgButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let lastCtg = +btn.getAttribute("value");
    sessionStorage.setItem("lastCtg", lastCtg);
    fetchNews(lastCtg);
  });
});
const albId = 206;
let currentCategory = window.sessionStorage.getItem("lastCtg") || albId;
const lists = document.querySelectorAll("li");

lists.forEach((list) => {
  list.addEventListener("click", function () {
    lists.forEach((li) => {
      li.classList.remove("active");
    });
    this.classList.add("active");
  });
});
if (currentCategory) {
  lists.forEach((li) => {
    if (li.getAttribute("value") == currentCategory) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}


const displayLoaders =function(loadName,arg){
  if(arg=="show"){
    loadBtn.classList.add("hide");
  loadName.classList.remove("hide");
  }else if (arg=="hide"){
    loadName.classList.add("hide");
  loadBtn.classList.remove("hide");
  }else{
    console.log(rrarra)
  }
}

function renderNews(data) {
  data.forEach((res) => {
    let html = `<a href="single.html?post_id=${res.id}">
<article class="news__articles">
<h3 class="news__title">${res.title.rendered}</h3>
<img src="${res.yoast_head_json.og_image[0].url}" alt="This is an image." class="news__img" loading="lazy" />
<div class="news__info">
    <p class="news__date">${res.date.slice(0, 10).split("-").join("/")}</p>
    <p class="news__description">${res.yoast_head_json.description}</div>
</article>
</a>`;
    newsContainer.insertAdjacentHTML("beforeend", html);
  });
}
const fetchNews = async function (id = currentCategory) {
  try {
    currentCategory = id;
    newsContainer.innerHTML = "";
    displayLoaders(loader,"show");
    categoryID = id;
    const res = await fetch(`${API_BASE_URL}?page=1&_embed=1&categories=${id}`);
    const data = await res.json();
    renderNews(data);
    displayLoaders(loader,"hide");
  } catch (err) {
    console.error("This went wrong:", err);
  }
};

//Load more
let page = 1;
fetchLoadMore = async function () {
  try {
    displayLoaders(loader2,"show");
    page++;
    const res = await fetch(
      `${API_BASE_URL}?page=${page}&_embed=1&categories=${categoryID}`
    );
    const data = await res.json();
    renderNews(data);
    displayLoaders(loader2,"hide");
  } catch (err) {
    console.error("This went wrong:", err);
  }
};
loadBtn.addEventListener("click", fetchLoadMore);

fetchNews();
