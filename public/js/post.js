const handlePost = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
        const warning = document.createElement('p');
        warning.innerHTML = 'Error: Please try again.';
        warning.style.color = 'red';
        setTimeout(() => {
          warning.remove();
        }, 3000);
    }
  }
};

document.querySelector('#post-form').addEventListener('submit', handlePost);