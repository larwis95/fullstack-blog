const handleLogin = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const warning = document.createElement('h2');
            warning.textContent = 'Incorrect email or password, please try again';
            warning.style.color = 'red';
            document.querySelector('#loginForm').appendChild(warning);
            setTimeout(() => {
                warning.remove();
            }, 1000);
        }
    }
}

const handleSignup = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#signupName').value.trim();
    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const warning = document.createElement('h2');
            warning.textContent = 'Error: Please try again';
            warning.style.color = 'red';
            document.querySelector('#signupForm').appendChild(warning);
            setTimeout(() => {
                warning.remove();
            }, 1000);
        }
    }
}

const updateActiveNav = () => {
    if (document.querySelector('.active')) {
        document.querySelector('.active').classList.remove('active');
    }
    const login = document.querySelector('#navLogin');
    login.classList.add('active');
}

document.querySelector('#loginForm').addEventListener('submit', handleLogin);
document.querySelector('#signupForm').addEventListener('submit', handleSignup);
document.addEventListener('DOMContentLoaded', updateActiveNav);
