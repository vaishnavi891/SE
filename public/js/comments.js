document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
  
    // Fetch and display comments for a post
    async function fetchComments(postId, commentsContainer) {
      const response = await fetch(`/api/comments/post/${postId}`);
      if (response.ok) {
        const comments = await response.json();
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
          const commentItem = document.createElement('div');
          commentItem.classList.add('comment');
          commentItem.innerHTML = `
            <div class="comment-content">
              <p><strong>${comment.user.name}</strong> ${comment.comment_text}</p>
              <small>${new Date(comment.created_at).toLocaleString()}</small>
            </div>
          `;
          commentsContainer.appendChild(commentItem);
        });
      } else {
        commentsContainer.innerHTML = '<p>Failed to load comments.</p>';
      }
    }
  
    // Handle new comment submission
    async function handleCommentSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const postId = form.dataset.postId;
      const commentText = form.querySelector('textarea').value.trim();
      if (!commentText) {
        alert('Please enter a comment.');
        return;
      }
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text: commentText, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        form.querySelector('textarea').value = '';
        const commentsContainer = form.nextElementSibling;
        fetchComments(postId, commentsContainer);
      } else if (response.status === 401) {
        alert('You must be logged in to comment.');
      } else {
        alert('Failed to add comment.');
      }
    }
  
    // Add comment form and comments container to each post
    function addCommentSection(postItem, postId) {
      const commentForm = document.createElement('form');
      commentForm.dataset.postId = postId;
      commentForm.classList.add('comment-form');
      commentForm.innerHTML = `
        <div class="comment-box">
          <textarea class="comment-textarea" placeholder="Add a comment..." required></textarea>
          <button type="submit" class="comment-button">Post</button>
        </div>
      `;
      commentForm.addEventListener('submit', handleCommentSubmit);
  
      const commentsContainer = document.createElement('div');
      commentsContainer.classList.add('comments-container');
  
      postItem.appendChild(commentForm);
      postItem.appendChild(commentsContainer);
  
      fetchComments(postId, commentsContainer);
    }
  
    // Fetch posts and attach comment section
    async function fetchPosts() {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const posts = await response.json();
        postList.innerHTML = '';
        posts.forEach(post => {
          const postItem = document.createElement('div');
          postItem.classList.add('post-box');
          postItem.innerHTML = `
            <div class="post-header" style="display: flex; align-items: center; gap: 10px;">
              <img src="${post.user.avatar || '/images/default-avatar.png'}" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
              <p><strong>${post.user.name}</strong></p>
            </div>
            <div class="post-content">
              <p>${post.content}</p>
            </div>
            <div class="post-time">
              <small>${new Date(post.created_at).toLocaleString()}</small>
            </div>
          `;
          postList.appendChild(postItem);
          addCommentSection(postItem, post.id);
        });
      } else {
        postList.innerHTML = '<p>Failed to load posts.</p>';
      }
    }
  
    fetchPosts();
  });
  