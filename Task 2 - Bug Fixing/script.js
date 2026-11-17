


const fetchBtn = document.getElementById("fetch-btn");

const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
const postId = document.getElementById("post-id");
const tagsContainer = document.getElementById("tags-container");
const likeBtn = document.getElementById("like-btn");
const likesCountEl = document.getElementById("likes-count");
const statusText = document.getElementById("status-text");


let likesCount = 0;

let currentPostId = 1;


async function getPostFromAPI() {
    statusText.textContent = "იტვირთება...";


    const url = "https://jsonplaceholder.typicode.com/posts/" + currentPostId;


    const response = await fetch(url);
    const data = await response.json();


    postTitle.textContent = data.title;
    postBody.textContent = data.body;
    postId.textContent = "Post #" + data.id;


    renderTags(["javascript", "web", "api"]);

    statusText.textContent = "ჩაიტვირთა წარმატებით!";
    currentPostId++;
}


function renderTags(tags) {
    tagsContainer.innerHTML = "";

    tags.forEach(function (tag) {
        const span = document.createElement("span");
        span.className = "bg-slate-700 text-sky-300 text-xs px-2.5 py-1 rounded-md font-mono";


        span.textContent = "#" + tag.toUpperCase();

        tagsContainer.appendChild(span);
    });
}


likeBtn.addEventListener("click", function () {
    likesCount = likesCount + 1;
    likesCountEl.textContent = likesCount;
});


fetchBtn.addEventListener("click", getPostFromAPI);