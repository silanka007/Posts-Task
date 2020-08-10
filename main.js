const postSection = document.querySelector('.posts');

const fetchPost = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const showPost = (posts, parentElem) => {
    posts.forEach(post => {
        const el = document.createElement('div');
        const title = document.createElement('h2');
        const body = document.createElement('p');
        title.textContent = post.title;
        body.textContent = post.body;
        el.className = 'post';
        el.appendChild(title);
        el.appendChild(body);
        parentElem.appendChild(el);
    })
}

window.addEventListener('load', async(e) => {
    const postsData = await fetchPost('https://jsonplaceholder.typicode.com/posts');
    const firstTenPost = postsData.filter((post, index) => index < 10);
    showPost(firstTenPost, postSection);
})