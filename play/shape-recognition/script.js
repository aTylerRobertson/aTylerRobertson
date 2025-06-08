const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const castSpell = document.querySelector("#castSpell");
const input = document.querySelector("#spellName");
const spellList = document.querySelector("#spellList");

// When the user draws on the canvas, really we're just saving a list of x,y coordinates
let drawing = [];

// Distance between each vector in a drawing,
// and the tolerance while checking against existing drawings
const resolution = 30;

// Grab existing drawings from storage
const spells = JSON.parse(localStorage.getItem('spells')) || [];

// Get the X and Y of either mouse or touch events
const getX = (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX || e.touches[0].clientX;
  return x - rect.left;
}
const getY = (e) => {
  const rect = e.target.getBoundingClientRect();
  const y = e.clientY || e.touches[0].clientY;
  return y - rect.top;
}

// Clean up the most recent drawing,
// and check it against existing ones
const checkDrawing = () => {
  // Zero out the X and Y coordinates of the first vector,
  // and redraw the shape from there
  const cleanedDrawing = [{x: 0, y: 0}];
  for (let i = 1; i < drawing.length; i++) {
    const dx = drawing[i].x - drawing[i-1].x;
    const dy = drawing[i].y - drawing[i-1].y;
    cleanedDrawing.push({x: cleanedDrawing.at(-1).x + dx, y: cleanedDrawing.at(-1).y + dy});
  }
  
  // If the drawing is named and there's a drawing there, save it to our list
  if (input.value.length > 0 && cleanedDrawing.length > 2) {
    saveSpell(input.value, cleanedDrawing);
    input.value = "";
  } else {
    // If there is no name provided, check the drawing against our list
    for (const shape of spells) {
      let probability = 0;
      // Compare the vectors of each drawing against this new one,
      // adding 1 point for each vector that is reasonably close to one in the drawing
      for (const vector of shape.vectors) {
        probability += cleanedDrawing.filter(v => Math.sqrt(Math.pow(v.x - vector.x, 2)+Math.pow(v.y - vector.y,2)) < resolution).length;
      }
      
      castSpell.innerText = "";
      document.body.style.backgroundColor = "white";
      
      // If at least 85% of a drawing is reasonably close to the new one,
      // stop searching and announce success
      if (probability >= shape.vectors.length*0.85 && Math.abs(cleanedDrawing.length - shape.vectors.length) <= 10) {
        castSpell.innerText = "You cast " + shape.name + "!";
        document.body.style.backgroundColor = "lightgreen";
        setTimeout(() => {
          castSpell.innerText = "";
          document.body.style.backgroundColor = "white";
        }, 3000);
        break;
      }
    }
  }
}

// Draw the drawing on the canvas
const draw = () => {
  // The canvas is cleared each time we draw, so previous draws are erased
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Then we draw a thick red line between all vectors in the drawing
  context.strokeStyle = "red";
  context.lineWidth = 5;
  for (let i = 1; i < drawing.length; i++) {
    context.moveTo(drawing[i-1].x, drawing[i-1].y);
    context.lineTo(drawing[i].x, drawing[i].y);
    context.stroke();
  }
  context.closePath();
}

// Mouse click or touch
const start = (e) => {
  e.preventDefault();
  const x = getX(e);
  const y = getY(e);
  drawing.push({x, y});
}

// Dragging the cursor/finger
const move = (e) => {
  e.preventDefault();
  if (drawing.length > 0) {
    const x = getX(e);
    const y = getY(e);
    context.beginPath();
    context.moveTo(drawing.at(-1).x, drawing.at(-1).y);
    context.lineTo(x, y);
    const distance = Math.sqrt(Math.pow(x - drawing.at(-1).x, 2)+Math.pow(y - drawing.at(-1).y, 2));
    if (distance > resolution) {
      drawing.push({x, y});
    }
    draw();
  }
}

// Releasing the mouse / lifting finger
const end = (e) => {
  // Check the drawing or save it
  checkDrawing();
  // Delete the drawing
  drawing.length = 0;
  draw();
}

// Create the list of saved drawings below the canvas
const displaySpells = () => {
  spellList.innerHTML = "";
  
  // We're going to be drawing the saved drawings at a smaller size,
  // so we need to define a scale here so we can stick with it.
  const scale = 0.5;
  for (const [index, spell] of spells.entries()) {
    // Create a div that wraps around the saved drawing
    const wrapper = document.createElement("div");
    wrapper.classList.add("spell");
    
    // Scale the saved drawing accordingly
    const vectors = spell.vectors.map(vector => {
      return { x: vector.x*scale, y: vector.y*scale }
    });
    
    // Find the top-most and left-most vectors
    const v = vectors.slice(0);
    const top = v.sort((a,b)=>a.y-b.y)[0].y;
    const left = v.sort((a,b)=>a.x-b.x)[0].x;
    // (This is done because if you start a drawing then move left or up,
    // the second point will actually be negative. So if we find these points,
    // we can make sure to adjust the canvas accordingly, to show the whole drawing.)
    
    // Create a new canvas and size it according to the drawing
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    c.width = v.sort((a,b)=>b.x-a.x)[0].x-left;
    c.height = v.sort((a,b)=>b.y-a.y)[0].y-top;
    
    // Draw the scaled shape
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 1; i < vectors.length; i++) {
      ctx.moveTo(vectors[i-1].x-left, vectors[i-1].y-top);
      ctx.lineTo(vectors[i].x-left, vectors[i].y-top);
      ctx.stroke();
    }
    ctx.closePath();
    
    // Draw a circle at the starting point,
    // since the shape needs to be drawn in the same way each time
    ctx.fillStyle = "orange";
    ctx.arc(vectors[0].x-left, vectors[0].y-top, 5, 0, Math.PI*2);
    ctx.fill();
    wrapper.appendChild(c);
    
    // Add drawing name
    const n = document.createElement("h2");
    n.innerText = spell.name;
    wrapper.appendChild(n);
    
    // Add edit button
    const edit = document.createElement("a");
    edit.innerText = "edit";
    edit.href = "#";
    edit.onclick = () => editSpell(index);
    wrapper.appendChild(edit);
    
    // Add delete button
    const del = document.createElement("a");
    del.innerText = "delete";
    del.href = "#";
    del.onclick = () => deleteSpell(index);
    wrapper.appendChild(del);
    
    spellList.appendChild(wrapper);
  }
}

// Save the new drawing
const saveSpell = (name, vectors) => {
  // First, check to see if it should replace an existing drawing instead
  const existing = spells.findIndex(s => s.name.toLowerCase() == name.toLowerCase());
  if (existing > -1) {
    spells[existing].vectors = vectors;
  } else {
    spells.push({
      name,
      vectors
    });
  }
  
  // Save the updated list to localStorage, and re-display the list on the page
  saveLocally();
  displaySpells();
}

// Fills the input field with the drawing's name, 
// so it gets replaced when the user draws something new
const editSpell = (id) => {
  input.value = spells[id].name;
}

// Remove the drawing from the list
const deleteSpell = (id) => {
  spells.splice(id,1);
  saveLocally();
}

// Save the full list of drawings to local storage
const saveLocally = () => {
  localStorage.setItem('spells', JSON.stringify(spells));
  displaySpells();
}

// Add event listeners for mouse and touch events
canvas.addEventListener("mousedown", start);
canvas.addEventListener("touchstart", start);
canvas.addEventListener("mousemove", move);
canvas.addEventListener("touchmove", move);
canvas.addEventListener("mouseup", end);
canvas.addEventListener("touchend", end);

// Display the list of spells
displaySpells();