
const  loadPosts = () =>{
    const url ='https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
    .then(res =>res.json())
    .then(data => displayPost(data))
}

const displayPost =(posts) =>{
//console.log(posts)
    const postsContainer =document.getElementById('navbarNavDropdown');
    for(const post of posts.data.news_category){  
        const postDiv = document.createElement('div');
           postDiv.innerHTML=`
                <ul class="navbar-nav  fs-5 fw-normal">
                  <li class="nav-item me-4">
                    <a class="nav-link " aria-current="page" onclick="loadNewsDetails('${post.category_id}')"  href="#">${post.category_name}</a>
                  </li>
                 </ul>
              `;
       postsContainer.appendChild(postDiv);
    }
    
}

loadPosts();

function loadNewsDetails(id){
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res =>res.json())
    .then(data => displaypage(data))
}

function displaypage(posts){ 
    const postsContainer =document.getElementById('news-card');
    const countData = document.getElementById("count");
    countData.innerText=posts.data.length;
    postsContainer.textContent = '';
    if(posts.data.length === 0){
        // console.log('not found')
        postsContainer.innerHTML =` <h2 class="text-2xl mt-5 pt-5 text-warning text-center">Not Found</h2>`

        return;
    }
    for(const post of posts.data){
        const postDiv = document.createElement('row');
        postDiv.innerHTML=`
            <div class="row my-4  p-2  " style="max-width: 100%; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
            <div class="col-md-4">
                <img src=${post.image_url} class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text"> ${post.details.slice(0, 300)}</p>
                <div class="d-flex justify-content-between mt-5">
                <h5 class="card-text"><img src="${post.author.img}" alt="mdo" width="32" height="32" class="rounded-circle">
                 ${post.author.name}</h5>
                    <p> <i class="fa-regular fa-eye"></i> ${post.total_view}</p>
                    <button onclick="newsDeteles('${post._id}')" href="#" class="btn" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
                </div>
            </div>
            </div>
       `;
       postsContainer.appendChild(postDiv);
    }
    toggleSpinner(false); 
   
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const newsDeteles =(id) =>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res =>res.json())
    .then(data => displayNewsDetails(data))
}


const displayNewsDetails = news =>{

    for(const post of news.data){
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = post.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
        <img src=${post.image_url} class="img-fluid rounded-start" alt="...">
        <p> ${post.details} </p>
    `
}

}




