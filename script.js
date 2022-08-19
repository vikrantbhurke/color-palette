// Variables With Default Values
let colorSelected = ["#333"];
let count = 8;
let mode = "triad";
let inputColor = "333";

// Select DOM Elements
const scheme = document.getElementById("scheme");
const colorContainer = document.getElementById("color-container");
const inputColorElement = document.getElementById("input-color");
const getColorButton = document.getElementById("get-color");

// Select Color
inputColorElement.addEventListener("change", (event) => {
  event.preventDefault();
  inputColor = inputColorElement.value.slice(1);
});

console.log(inputColor);

// Select Mode
scheme.addEventListener("click", (event) => {
  event.preventDefault();
  mode = event.target.value;
});

// Get Colors On Button Click
getColorButton.addEventListener("click", () =>
  getColor(colorSelected, mode, count, inputColor)
);

// Color Palette Function
function getColor(colorSelected, mode, count, inputColor) {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${mode}&count=${count}`
  )
    .then((response) => response.json())
    .then((data) => {
      colorSelected = data.colors.map((color) => color.hex.value);

      const colorSelectedHtml = colorSelected
        .map(
          (color) =>
            `<div class="color-strip">
                <div class="color" style="background: ${color}"></div>
                <div class="hex background-color">${color}</div>
            </div>`
        )
        .join("");
      colorContainer.innerHTML = colorSelectedHtml;
    });
}

getColor(colorSelected, mode, count, inputColor);