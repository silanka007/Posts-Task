const postSection = document.querySelector('.posts');

// making GET request using the fetch api
const fetchPost = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// displaying posts
const showPost = (posts, parentElem) => {
    posts.forEach(post => {
        const el = document.createElement('div');
        const title = document.createElement('h2');
        const body = document.createElement('p');
        title.textContent = `${post.id} - ${post.title}`;
        body.textContent = post.body;
        el.className = 'post';
        title.className = 'post-title';
        el.appendChild(title);
        el.appendChild(body);
        parentElem.appendChild(el);
    })
}

// eventhandler for fetching and displaying the first 10 posts on page load
window.addEventListener('load', async(e) => {
    const postsData = await fetchPost('https://jsonplaceholder.typicode.com/posts');
    const firstTenPost = postsData.filter((post, index) => index < 10);
    showPost(firstTenPost, postSection);

    // scroll eventlistener for displaying additional 10 posts on scroll end
    let pageNum = 2;
    window.addEventListener('scroll', e => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        if(Math.ceil(scrolled) === Math.ceil(scrollable)){
            const nextTenPost = postsData.filter((post, index) => index >= (10 * (pageNum - 1)) && index < (10 * pageNum));
            showPost(nextTenPost, postSection)
            pageNum++;
        }
    })
})
