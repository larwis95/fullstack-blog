const handleLogout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        const warning = document.createElement('p');
        warning.textContent = 'Failed to log out';
        warning.style.color = 'red';
        document.querySelector('#navLogout').appendChild(warning);
        setTimeout(() => {
            warning.remove();
        }, 1000);
    }
}



document.querySelector('#navLogout')?.addEventListener('click', handleLogout);