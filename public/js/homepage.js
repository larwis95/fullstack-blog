const cards = document.querySelectorAll('.card');
const cardDiv = document.querySelector('#cards');

const handleOnMouseMove = (event) => {
    for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty('--x', x + 'px');
        card.style.setProperty('--y', y + 'px');
    };
};

const handleCardClick = (event) => {
    event.stopPropagation();
    const card = event.target.closest('.card');
    const id = card.getAttribute('data-id');
    if (card) {
        window.location = `/blog/${id}`;
    }
};

cards.forEach(card => {
    card.addEventListener('mousemove', handleOnMouseMove);
}
)

cardDiv.addEventListener('click', handleCardClick);

