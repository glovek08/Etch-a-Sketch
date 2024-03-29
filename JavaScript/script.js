const squaresContainer = document.querySelector('#flex-container');

createSquare(0);

function createSquare(i) {
    if (i < 256) {
        let square = document.createElement('div');
        square.classList.add('flex-square');
        squaresContainer.appendChild(square);
        console.log('calling crateSquare with'+i);
        createSquare(i + 1);
    }
    return;
}