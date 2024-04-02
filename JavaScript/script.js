const squaresContainer = document.querySelector('#grid-container');
const resetGridBtn = document.querySelector('#reset-grid-btn');
const popupDiv = document.querySelector('#new-grid-popup');
const newGridSubmitBtn = document.querySelector('#submit-new-grid');

const DEFAULT_BG = '#FF3C38'; // Vermillion.


createSquare(0, 8); //Initialize with 0 and 8

resetGridBtn.addEventListener('click', () => resetGrid());

popupDiv.addEventListener('click', () => {
    const popup = document.querySelector('#popup-text-span'); //Could use event to hide when mouse is out.
    popup.classList.add("show");
});

newGridSubmitBtn.addEventListener('click', () => {
    const userInputWidth = document.querySelector('#grid-width').value;
    console.log(`User Input Width: ${userInputWidth}, --grid-width: ${getComputedStyle(document.documentElement).getPropertyValue('--grid-width')}`);
    document.documentElement.style.setProperty('--grid-width', userInputWidth);
    console.log(`--grid-width now: ${getComputedStyle(document.documentElement).getPropertyValue('--grid-width')}`);
    deleteGrid();
    createSquare(0, userInputWidth);
});

function createSquare(i, width) {
    if (i < width * width) {
        const square = document.createElement('div');
        square.classList.add('flex-square');
        square.addEventListener('mouseover', (e) => {
            e.target.classList.add('red-bg');
        });
        squaresContainer.appendChild(square);
        console.log('calling createSquare with: ' + i);
        createSquare(i + 1, width);
    }
    return;
}

function deleteGrid() {
    const squareItems = squaresContainer.querySelectorAll('.flex-square');
    squareItems.forEach(el => squaresContainer.removeChild(el));
    console.log('Grid Deleted');
}
function resetGrid() {
    const squareItems = squaresContainer.querySelectorAll('.flex-square');
    squareItems.forEach(e => e.classList.remove('red-bg'));
    console.log('Grid Reset.')
}

//TODO: Create button that will prompt the use for a new grid and will reset the current grid to the specified one.
//For the randomizer we could use Math.random to generate a new rgb code.
/*For the new grid size we could use the current createSquare function to define a new size, instead of 256 we need
to specify the result of the desired grid to the power of 2 (Math.pow(base, exp)) */
//Instead of a prompt we could create a popup div.