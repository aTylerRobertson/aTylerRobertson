document.querySelector("#thing").addEventListener("input",(e) => {
  update(e.target.value);
});

const update = (thing) => {
  const newValue = thing == "" ? "anything" : thing;
  const fillins = document.querySelectorAll(".fill-in");
  for (const fill of fillins) {
    console.log(fill);
    fill.innerText = newValue;
    fill.classList.add("changed");
  }
}

const queryString = window.location.search;
if (queryString.length > 0) {
  const urlParams = new URLSearchParams(queryString);
  const thing = urlParams.get('this');
  document.querySelector("#thing").value = thing;
  update(thing);
}