const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const framesPerSecond = 30;
let secondsWaiting = 0;
let endGameMessage = "";

const colours = ["#25CCF7","#EAB543","#55E6C1","#CAD3C8","#F97F51","#1B9CFC","#F8EFBA","#58B19F","#2C3A47","#B33771","#3B3B98","#FD7272","#9AECDB","#D6A2E8","#6D214F","#182C61","#FC427B","#BDC581","#82589F"];
let queue = [];
for (let i = 0; i < 810; i++) {
  queue[i] = {
    id: i,
    distance: i+1, // distance from queen in meters
    moving: false,
    waiting: 0,
    x: Math.round(Math.random()*400)-400, // x variance in the queue
    height: Math.round(Math.random()*100)+90, // height in cm
    hair: colours[Math.floor(Math.random()*colours.length)],
    skin: colours[Math.floor(Math.random()*colours.length)],
    jumper: colours[Math.floor(Math.random()*colours.length)],
    trousers: colours[Math.floor(Math.random()*colours.length)]
  }
}
queue.sort((a,b) => a.distance - b.distance);

const you = {
  queueing: true,
  distance: queue.length + 2,
  height: 175,
  canEat: true,
  hunger: 0,
  thirst: 0,
  toilet: 0,
  lean: 0,
  speed: 1/framesPerSecond
}

const drawQueue = () => {
  if (you.queueing) {
    // Draw the horizon
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#70a1ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height/2);
    
    // ground 
    ctx.fillStyle = "#2f3640";
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height);
    
    // Pavement
    ctx.beginPath();
    ctx.fillStyle = "#a4b0be";
    ctx.moveTo((canvas.width/2)-(30/you.distance),canvas.height/2);
    ctx.lineTo((canvas.width/2)+(30/you.distance),canvas.height/2);
    ctx.lineTo((canvas.width/2)+400+(you.lean/2), canvas.height);
    ctx.lineTo((canvas.width/2)-200+(you.lean/2), canvas.height);
    ctx.closePath();
    ctx.fill();
    
    for (const person of queue) {
      const distanceFromYou = you.distance - person.distance;
      ctx.setTransform(1/(distanceFromYou/2),0,0,1/(distanceFromYou/2),(canvas.width/2)+(person.x/distanceFromYou)+(you.lean/distanceFromYou*2),(canvas.height/2)-600/(distanceFromYou));
      ctx.fillStyle = person.hair;
      ctx.beginPath();
      const headRadius = 120;
      const x = (canvas.width/2)+person.x;
      ctx.arc(x, canvas.height/2, headRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = person.jumper;
      ctx.arc(x, (canvas.height/2)+(headRadius*2.35), headRadius*1.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillRect(x-(headRadius*1.5), (canvas.height/2)+(headRadius*2.35), (headRadius*1.5)*2, (headRadius*1.5)*2);
      ctx.closePath();
    }
    
    ctx.setTransform(1,0,0,1,0,0);
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.font = "15px Arial";
    let hoursWaiting = Math.floor(secondsWaiting/3600);
    let minutesWaiting = Math.floor(secondsWaiting/60)-(hoursWaiting*60);
    ctx.fillText(`You've been waiting for ${hoursWaiting} hour${hoursWaiting == 1 ? '' : 's'} and ${minutesWaiting} minute${minutesWaiting == 1 ? '' : 's'}`, 10, 20);
    ctx.fillText(`Hunger:`,10,40);
    ctx.fillText(`Thirst:`,10,60);
    ctx.fillText(`Toilet:`,10,80);
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(68,28,you.hunger,15);
    ctx.rect(68,28,100,15);
    ctx.fillRect(68,48,you.thirst,15);
    ctx.rect(68,48,100,15);
    ctx.fillRect(68,68,you.toilet,15);
    ctx.rect(68,68,100,15);
    ctx.stroke();
    ctx.closePath();

    if (you.distance <= 0) {
      endGame("Press F to pay respects");
    }
  } else {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(endGameMessage, canvas.width/2, (canvas.height/2)-15);
    let hoursWaiting = Math.floor(secondsWaiting/3600);
    let minutesWaiting = Math.floor(secondsWaiting/60)-(hoursWaiting*60);
    ctx.fillText(`You waited for ${hoursWaiting} hour${hoursWaiting == 1 ? '' : 's'} and ${minutesWaiting} minute${minutesWaiting == 1 ? '' : 's'}`, canvas.width/2, (canvas.height/2)+15);
  }
}

const moveUp = () => {
  for (const [index, person] of queue.entries()) {
    // if (index == queue.length-1) console.log(person.distance);
    const walkingSpeed = 1/(framesPerSecond-(Math.random()*framesPerSecond)+1);
    if (index == 0) {
      if (person.distance <= 0) {
        if (person.moving) { 
          person.waiting = 60*framesPerSecond;
          person.moving = false;
        } else {
          if (person.waiting > 0) {
            person.waiting -= 1;
          } else {
            queue.splice(0,1);
          }
        }
      } else {
        person.moving = true;
      }
    } else {
      const distanceToNextPerson = person.distance - queue[index-1].distance;
      person.moving = queue[index-1].moving == false && distanceToNextPerson > 1;
    }
    if (person.moving) person.distance -= walkingSpeed;
  }
}

const endGame = (message) => {
  you.queueing = false;
  endGameMessage = message;
}

const increasePlayerNeeds = () => {
  you.hunger += 100/(framesPerSecond*60*60);
  if (you.hunger >= 100) endGame("You got too hungry and left the queue!");
  you.thirst += 100/(framesPerSecond*60*30);
  if (you.thirst >= 100) endGame("You got too thirsty and left the queue!");
  you.toilet += Math.round(Math.random())/(framesPerSecond*60);
  if (you.toilet >= 100) endGame("You couldn't hold it anymore!");
  if (queue.length > 0) {
    if (you.distance - queue[queue.length-1].distance > 5) {
      endGame("You took too long to move up, and people went around you!");
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (you.queueing) {
    if (e.key == 'w' || e.key == 'ArrowUp') {
      e.preventDefault();
      const distanceToNextPerson = queue.length == 0 ? -1 : queue[queue.length-1].distance + 1;
      if (you.distance - you.speed > distanceToNextPerson) {
        you.distance -= you.speed;
      }
    }
    if (e.key == 'd' || e.key == 'ArrowRight') {
      e.preventDefault();
      you.lean -= 5;
      if (you.lean < -1*canvas.width) endGame("You left the queue!");
    }
    if (e.key == 'a' || e.key == 'ArrowLeft') {
      e.preventDefault();
      you.lean += 5;
      if (you.lean > canvas.width) endGame("You left the queue!");
    }
    if (e.key == 't' && you.canEat) {
      e.preventDefault();
      you.canEat = false;
      you.thirst -= 15;
      you.toilet += Math.round(Math.random()*20);
      if (you.thirst < 0) you.thirst = 0;
    }
    if ((e.key == 's' || e.key == 'v') && you.canEat) {
      e.preventDefault();
      you.canEat = false;
      you.hunger -= 25;
      you.toilet += Math.round(Math.random()*10);
      if(you.hunger < 0) you.hunger = 0;
    }
    if (e.key == 'i') {
      e.preventDefault();
      you.toilet -= 100/(framesPerSecond * 90);
      if (you.toilet < 0) you.toilet = 0;
    }
  }
});

document.addEventListener("keyup", (e) => {
  you.canEat = true;
});

const queueing = setInterval(() => {
  if (you.queueing) {
    secondsWaiting += 1/framesPerSecond;
    increasePlayerNeeds();
    moveUp();
  }
  drawQueue();
}, 1000/framesPerSecond)
