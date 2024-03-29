const squaresContainer = document.querySelector('#flex-container');

createSquare(0);

function createSquare(i) {
    if (i < 256) {
        let square = document.createElement('div');
        square.classList.add('flex-square');
        square.addEventListener('mouseover', (e) => {
            e.target.classList.add('red-bg');
        });
        squaresContainer.appendChild(square);
        console.log('calling crateSquare with: '+i);
        createSquare(i + 1);
    }
    return;
}