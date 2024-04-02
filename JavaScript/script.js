const squaresContainer = document.querySelector('#grid-container');
const resetGridBtn = document.querySelector('#reset-grid-btn');
const popup = document.querySelector('#popup-text-span');
const showPopupBtn = document.querySelector('#show-popup');
const newGridSubmitBtn = document.querySelector('#submit-new-grid');
const newGridCancelBtn = document.querySelector('#cancel-new-grid');
const DEFAULT_BG = '#FF3C38'; // Vermillion.


createSquares(0, 8); //Initialize with 0 and 8

resetGridBtn.addEventListener('click', () => resetGrid());
showPopupBtn.addEventListener('click', () => newGridPopup(true));

newGridSubmitBtn.addEventListener('click', () => {
    const userInputWidth = document.querySelector('#grid-width').value;
    console.log(`User Input Width: ${userInputWidth}, --grid-width: ${getComputedStyle(document.documentElement).getPropertyValue('--grid-width')}`);
    document.documentElement.style.setProperty('--grid-width', userInputWidth);
    console.log(`--grid-width now: ${getComputedStyle(document.documentElement).getPropertyValue('--grid-width')}`);
    deleteGrid();
    createSquares(0, userInputWidth);
    newGridPopup(false);
});

newGridCancelBtn.addEventListener('click', () => {
    newGridPopup(0);
    document.querySelector('#grid-width').value = '';
});

function createSquares(i, width) {
    if (i < width * width) {
        const square = document.createElement('div');
        square.classList.add('flex-square');
        square.addEventListener('mouseover', (e) => {
            e.target.classList.add('red-bg');
        });
        squaresContainer.appendChild(square);
        createSquares(i + 1, width);
    } else {
        console.log(`Grid Created, Size: ${Math.pow(width, 2)}`);
        return;
    }
}

function newGridPopup(option) { //true to show, false to hide.
    if (option) {
        popup.classList.add("show");
        console.log('Popup show');  
    }
    else {
        popup.classList.remove("show");
        console.log('Popup hide');
    } 
    //Could use event to hide when mouse is out.
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

/*TODO:
    For the randomizer we could use Math.random to generate a new rgb code.
    Style for the popup div and buttons.
    Control the input, e.g. No more than 50 for the grid size.
    Remove logs.
*/