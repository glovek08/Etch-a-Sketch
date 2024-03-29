

document.addEventListener('DOMContentLoaded', () => {
    const squaresContainer = document.querySelector('#flex-container');
    for (let i = 0; i < 256; i++) {
        let square = document.createElement('div');
        square.classList.add('flex-square');
        squaresContainer.appendChild(square);
    }
});