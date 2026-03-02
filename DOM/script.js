const activeElements = document.querySelectorAll(".inactive");
const button = document.querySelector(".toggle");

const length = activeElements.length;
let index = 0;

button.onclick = () => {
  activeElements[index % length].classList.toggle("active");
  index++;
};

const container = document.getElementById("boxes");
console.log("container", container);
console.log("USING INNER TEXT", container.innerText);
console.log("USING TEXT CONTENT", container.textContent);
console.log("USING INNER HTML", container.innerHTML);

const btn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

const len = boxes.length;
let i = 0;
btn.onclick = () => {
  btn.style.visibility = "hidden";
  setInterval(() => {
    boxes[i % len].classList.toggle("active-color");
    i++;
  }, 1000);
};
