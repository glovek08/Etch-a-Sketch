const squaresContainer = document.querySelector('#grid-container');
const popup = document.querySelector('#popup-text-span');
const randomModeCheckbox = document.querySelector('#random-mode-checkbox');
const randomModeLabel = document.querySelector('#random-mode-label');

const DEFAULT_BG = '#d8a841';
const DEFAULT_HOVER_BG = '#FF3C38'; // Vermillion.


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
randomModeCheckbox.addEventListener('change', () => {
    if (randomModeCheckbox.checked) {
        const checked_bg = getComputedStyle(document.documentElement).getPropertyValue('--checked');
        randomModeLabel.style.backgroundColor = checked_bg;
    } else {
        const unchecked_bg = getComputedStyle(document.documentElement).getPropertyValue('--white-1');
        randomModeLabel.style.background = unchecked_bg;
    }
});

function createSquares(i, width) {
    if (i < width * width) {
        const square = document.createElement('div');
        square.id = i;
        square.classList.add('flex-square');
        square.addEventListener('mouseover', (e) => {
            console.log(`Square#${i} hovered`);
            if (randomModeCheckbox.checked) {
                let randomBgColor = generateRandomColor();
                e.target.style.backgroundColor = randomBgColor;
                console.log(`Square#e.target.id bg: ${randomBgColor}`);
            }
            else {
                e.target.style.backgroundColor = DEFAULT_HOVER_BG;
                console.log(`Square#${e.target.id} DEFAULT_HOVER_BG`);
            }
            let currentOpacity = parseFloat(e.target.style.opacity);
            console.log(`Square#${square.id} opacity = ${currentOpacity}`);
            if (isNaN(currentOpacity)) {
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
}
function deleteGrid() {
    const squareItems = squaresContainer.querySelectorAll('.flex-square');
    squareItems.forEach(el => squaresContainer.removeChild(el));
    console.log('Grid Deleted');
    return;
}
function resetGrid() {
    const squareItems = squaresContainer.querySelectorAll('.flex-square');
    squareItems.forEach(e => {
        e.style.backgroundColor = DEFAULT_BG;
        e.style.opacity = 1.35;
    });
    console.log('Grid Reset.')
    return;
}
function generateRandomColor() {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}
/*TODO:
    Control the input, e.g. No more than 50 for the grid size.
    Add keyframes 'enter' for submit.
    Aria labels.
    main's outline shows on top of the grid on smaller viewports.
    Remove logs.
*/