const squaresContainer = document.querySelector('#grid-container');
const popup = document.querySelector('#popup-text-span');
const DEFAULT_BG = '#FF3C38'; // Vermillion.


createSquares(0, 8); //Initialize with 0 and 8

document.addEventListener('click', (e) => {
    let target = e.target;
    switch (target.id) {
        case 'reset-grid-btn':
            resetGrid();
            break;
        case 'show-popup':
            newGridPopup(true);
            break;
        case 'submit-new-grid':
            const userInputWidth = document.querySelector('#grid-width').value;
            console.log(`User Input Width: ${userInputWidth}, --grid-width: ${getComputedStyle(document.documentElement).getPropertyValue('--grid-width')}`);
            document.documentElement.style.setProperty('--grid-width', userInputWidth);
            console.log(`--grid-width now: ${getComputedStyle(document.documentElement).getPropertyValue('--grid-width')}`);
            deleteGrid();
            createSquares(0, userInputWidth);
            newGridPopup(false);
            break;
        case 'cancel-new-grid':
            newGridPopup(0);
            document.querySelector('#grid-width').value = '';
            break;
    }
})
// resetGridBtn.addEventListener('click', () => resetGrid());
// showPopupBtn.addEventListener('click', () => newGridPopup(true));

// newGridSubmitBtn.addEventListener('click', () => {
//     const userInputWidth = document.querySelector('#grid-width').value;
//     console.log(`User Input Width: ${userInputWidth}, --grid-width: ${getComputedStyle(document.documentElement).getPropertyValue('--grid-width')}`);
//     document.documentElement.style.setProperty('--grid-width', userInputWidth);
//     console.log(`--grid-width now: ${getComputedStyle(document.documentElement).getPropertyValue('--grid-width')}`);
//     deleteGrid();
//     createSquares(0, userInputWidth);
//     newGridPopup(false);
// });

// newGridCancelBtn.addEventListener('click', () => {
//     newGridPopup(0);
//     document.querySelector('#grid-width').value = '';
// });

function createSquares(i, width) {
    if (i < width * width) {
        const square = document.createElement('div');
        square.id = i;
        square.classList.add('flex-square');
        square.addEventListener('mouseover', (e) => {
            console.log(`Square#${i} hovered`);
            e.target.classList.add('red-bg');
            let currentOpacity = parseFloat(e.target.style.opacity);
            console.log(`Square#${square.id} opacity = ${currentOpacity}`);
            if (isNaN(currentOpacity))  {
                e.target.style.opacity = 1;
            }
            else if (currentOpacity > 0) {
                currentOpacity -= 0.35;
            } else if (currentOpacity <= 0) {
                currentOpacity = 0;
            }
            e.target.style.opacity = currentOpacity;
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