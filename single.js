const API_BASE_URL="https://balkaninsight.com/wp-json/wp/v2/posts";

const singleNewsContainer = document.querySelector('.single-page');
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('post_id');
const loader=document.querySelector('.loader');

const fetchSingleNews = async function(post_id){
    try{
        loader.style.display='block';
 const res = await fetch(`${API_BASE_URL}/${post_id}?_embed=1`);
 const data= await res.json();
 renderSingleNews(data);
 loader.style.display='none';
    console.log(data);
    }catch(err){
        console.error(err);

    }
};
const renderSingleNews = function(res){
const html = `<article class="single-news">
<h3 class="single-news__title">${res.yoast_head_json.title}</h3>
<img src="${res.yoast_head_json.og_image[0].url}" alt="" class="single-news__img" />
<div class="single-news__info">    
<p class="single-news__date">${res.date.slice(0,10)}</p>
    <div class="single-news__content">${res.content.rendered}</div>             
</div>
</article>`
singleNewsContainer.insertAdjacentHTML('beforeend',html);
};

fetchSingleNews(postId);