const display = (e) => {
  const display = document.querySelector(".display-container");
  display.innerText = document.querySelector("#input").value;
  console.log(e.target.value);
};

const main = (e) => {
  const container = document.querySelector(".container");
  container.innerHTML = '<input type="text" name="sample-input" id="input">';
  const input = document.querySelector("#input");
  input.onchange = display;
};

onload = main;
