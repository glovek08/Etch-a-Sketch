const squaresContainer = document.querySelector('#flex-container');
const resetGridBtn = document.querySelector('#reset-grid-btn');
const DEFAULT_BG = '#FF3C38'; // Vermillion.

createSquare(0);
resetGridBtn.addEventListener('click', () => {
    resetGrid();
});

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
function resetGrid() {
    let squareItems = squaresContainer.querySelectorAll('.flex-square');
    squareItems.forEach(e => e.classList.remove('red-bg'));
}

//TODO: Create button that will prompt the use for a new grid and will reset the current grid to the specified one.
//For the randomizer we could use Math.random to generate a new rgb code.
/*For the new grid size we could use the current createSquare function to define a new size, instead of 256 we need
to specify the result of the desired grid to the power of 2 (Math.pow(base, exp)) */
//Instead of a prompt we could create a popup div.