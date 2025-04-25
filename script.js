const container = document.querySelector("#grid-container");
const resizeBtn = document.querySelector("#resize-btn");

function getRandomColorComponents() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}
function darkenColor({ r, g, b }, level) {
    // level: 0 to 10
    const factor = 1 - (level / 10);
    return `rgb(${r * factor}, ${g * factor}, ${b * factor})`;
}


function createGrid(size){
    container.innerHTML = ""; // removes previous grid

    const totalCells = size * size;
    const cellSize = 960/size;

    for(let i = 0; i < totalCells; i++){
        const cell = document.createElement("div"); //creates a cell div
        cell.classList.add("grid-cell"); // adds grid-cell style to each cell div
        cell.style.width = `calc(100%/${size})`;
        cell.style.height = `calc(100%/${size})`;

        // Track darkening progress and base color
        cell.dataset.darkLevel = 0;
        let baseColor = getRandomColorComponents();

        // Add a mouseover event to "draw"
        cell.addEventListener("mouseover", () => {
            let level = parseInt(cell.dataset.darkLevel); 
            if (level < 10) {
                level++;
                cell.dataset.darkLevel = level;
                cell.style.backgroundColor = darkenColor(baseColor, level);
            }
        }); 

        // Reset cell color on click
        cell.addEventListener("click", () => {
            cell.style.backgroundColor = "lightgray";
        });

        container.appendChild(cell); // adds each cell to the container
    }
}

createGrid(16);

// Resize button logic
resizeBtn.addEventListener("click", () => {
    let userInput = prompt("Enter new grid size (e.g. 16 for 16x16):");
    let size = parseInt(userInput);

    if (isNaN(size) || size < 1 || size > 100) { // check if number entered is bigger than 1 and smaller than 100
        alert("Please enter a valid number between 1 and 100.");
    } else {
        createGrid(size);
    }
});
