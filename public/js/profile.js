document.addEventListener('DOMContentLoaded', () => {
  const postList = document.querySelectorAll('.delete-post-button');

  postList.forEach(button => {
    button.addEventListener('click', async (event) => {
      const postId = event.target.dataset.postId;
      const confirmed = confirm('Are you sure you want to delete this post?');
      if (!confirmed) return;

      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the post card from the DOM
        const postCard = event.target.closest('.column.is-one-third');
        if (postCard) {
          postCard.remove();
        }
      } else if (response.status === 403 || response.status === 404) {
        alert('You are not authorized to delete this post.');
      } else {
        alert('Failed to delete post.');
      }
    });
  });
});
