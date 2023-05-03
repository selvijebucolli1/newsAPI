
const newsContainer = document.querySelector('.news');
const btnAlb=document.querySelector('.btnAlbania');
const btnBlg=document.querySelector('.btnBulgaria');
const btnCrt=document.querySelector('.btnCroatia');
const loader=document.querySelector('.loader');
const loadBtn=document.querySelector('.loadMore__btn');
const loader2=document.querySelector('.loadMore__loader')

const ctgButtons=document.querySelectorAll(".category-button")
ctgButtons.forEach(btn=>{
    btn.addEventListener("click",()=>{
    let lastCtg=+btn.getAttribute("value");
    localStorage.setItem("lastCtg",lastCtg);
    fetchNews(lastCtg);
})
});
const albId = 206;
let currentCategory=window.localStorage.getItem("lastCtg") || albId;
const lists = document.querySelectorAll('li');

lists.forEach(list =>{
    list.addEventListener('click',function(){
        lists.forEach(li =>{
            li.classList.remove('active');
        });
        this.classList.add('active');
    });
});
if(currentCategory){
    lists.forEach(li => {
        if( li.getAttribute("value")==currentCategory){
            li.classList.add('active');
        }
        else {
            li.classList.remove('active');
        }
    })
    
}
const displayLoaders = function(loadName){
    loadBtn.style.display='none'
    loadName.style.display='block';
}
const hideLoaders = function(loadName){
    loadName.style.display='none';
    loadBtn.style.display='block';
}

const renderNews= function(data){
    data.forEach(res =>{
let html = `<a href="single.html?post_id=${res.id}" style="text-decoration:none">
<article class="news__articles">
<h3 class="news__title">${res.title.rendered}</h3>
<img src="${res.yoast_head_json.og_image[0].url}" alt="" class="news__img" />
<div class="news__info">
    <p class="news__date">${res.date.slice(0,10).split('-').join('/')}</p>
    <p class="news__description">${res.yoast_head_json.description}</div>
</article>
</a>`;
newsContainer.insertAdjacentHTML('beforeend',html);

});
};


const fetchNews= async function(id=currentCategory){
    try{
        currentCategory=id;
    newsContainer.innerHTML = '';
    displayLoaders(loader);
    categoryID=id;
    const res = await fetch(`https://balkaninsight.com/wp-json/wp/v2/posts?page=1&_embed=1&categories=${id}`);
    const data= await res.json();
    renderNews(data);
    hideLoaders(loader);
    }catch(err){
        console.log("EROR LALALALALA",err);
    }

};


//Load more button
let page=1;
fetchLoadMore = async function(){
    try{
    displayLoaders(loader2);
    page++;
    const res = await fetch(`https://balkaninsight.com/wp-json/wp/v2/posts?page=${page}&_embed=1&categories=${categoryID}`);
    const data= await res.json();
    renderNews(data);
    hideLoaders(loader2);
    }catch(err){
        console.log("ERROR LALALALALALA",err)
    }
}
loadBtn.addEventListener('click',fetchLoadMore);

fetchNews();
