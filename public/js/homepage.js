document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('post-form');
  const postList = document.getElementById('post-list');

  // Fetch and display posts
  async function fetchPosts() {
    const response = await fetch('/api/posts');
    if (response.ok) {
      const posts = await response.json();
      postList.innerHTML = '';
      posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('box');
        postItem.innerHTML = `
        <p><img src="${post.user.avatar ? post.user.avatar : '/images/default-avatar.png'}" alt="avatar" style="width: 30px; height: 30px; border-radius: 50%; vertical-align: middle; margin-right: 8px;"> <strong><a href="/profile/${post.user.id}" style="color: inherit; text-decoration: none;">${post.user.name}</a></strong> says:</p>
        <p>${post.content}</p>
        <p><small>${new Date(post.created_at).toLocaleString()}</small></p>
        `;
        postList.appendChild(postItem);
      });
    } else {
      postList.innerHTML = '<p>Failed to load posts.</p>';
    }
  }

  // Handle new post submission
  postForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = document.getElementById('post-content').value.trim();
    if (!content) {
      alert('Please enter some content for your post.');
      return;
    }
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.getElementById('post-content').value = '';
      fetchPosts();
    } else if (response.status === 401) {
      alert('You must be logged in to post.');
    } else {
      alert('Failed to create post.');
    }
  });

  // Initial fetch of posts
  fetchPosts();
});
