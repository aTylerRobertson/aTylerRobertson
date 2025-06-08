const ringColor = document.getElementById("ringColor");
const backgroundColor = document.getElementById("backgroundColor");
const ring = document.getElementById("ring");

ringColor.addEventListener("input", (e) => {
  ring.style.stroke = e.target.value;
});

backgroundColor.addEventListener("input", (e) => {
  document.body.style.backgroundColor = e.target.value;
  ring.style.fill = e.target.value;
});