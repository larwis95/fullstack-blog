const commentBtn = document.querySelector('#commentBtn');
const commentModal = document.getElementById('commentModal');
const closeModal = document.querySelector('.close');
const modalBg = document.querySelector('.modal');
const commentForm = document.getElementById('commentForm');

const closeCommentModal = (e) => {
    if (e.target === modalBg || e.target === closeModal) {
        commentModal.style.display = 'none';
    }
}


const handleComment = async (e) => {
    e.preventDefault();

    const comment = document.getElementById('comment').value.trim();
    const post_id = document.querySelector('.blog-container').getAttribute('data-id');

    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
}

commentBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    commentModal.style.display = 'block';
});

closeModal.addEventListener('click', closeCommentModal);
modalBg.addEventListener('click', closeCommentModal);
commentForm.addEventListener('submit', handleComment);
