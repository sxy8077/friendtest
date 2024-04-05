// sorry for the spaghetti code and redundant variables, i wasn't exactly a good coder back then

// 获取导航类型的信息
let navigationEntries = window.performance.getEntriesByType("navigation");
if (navigationEntries.length && navigationEntries[0].type === "reload") {
  window.location.href = "../index.html";
}
  
const cols = 3;
const main = document.getElementById('main');
let textDiv = document.getElementById('text')
let parts = [];

let images = [
  "../pic/1.jpg", //0
  "../pic/2.jpg",
  "../pic/3.jpg",
  "../pic/3.1.jpg", //3
  "../pic/4.jpg", //4
  "../pic/4.1.jpg", //5
  "../pic/6.jpg", //6
  "../pic/6.1.jpg", //7
  "../pic/6.2.jpg", //8
  "../pic/6.3.jpg", //9
  "../pic/7.jpg", //10
  "../pic/7.1.jpg", //11
  "../pic/7.2.jpg", //12
  "../pic/8.jpg", //13
  "../pic/8.1.jpg", //14
  "../pic/9.jpg", //15
  "../pic/11.jpg", //16
  "../pic/10.jpg", //17
];
let current = 0;
let playing = false;

for (let i in images) {
  new Image().src = images[i];
}

function changeText(num) {
  switch (num) {
    case 0:
      textDiv.innerHTML = "2023年12月30日 <br> 时隔一年又神奇的聊上了"
      break;
    case 1:
      textDiv.textContent = "咱就说那么有计划的女孩子谁不爱"
      break;
    case 2:
      textDiv.textContent = "学到了美拉德搭配"
      break;
    case 3:
      textDiv.innerHTML = "不多说，好看就完事了！<br>PS：挡脸不是有意的"
      break;
    case 4:
      textDiv.innerHTML = "红红火火跨新年"
      break;
    case 5:
      textDiv.innerHTML = " "
      break;
    case 6:
      textDiv.innerHTML = "看看这越来越好的厨艺"
      break;
    case 7:
      textDiv.innerHTML = "鲜汤轻松拿下！"
      break;
    case 8:
      textDiv.innerHTML = "我喜欢这虾仁"
      break;
    case 9:
      textDiv.innerHTML = "三文鱼这次迟到了"
      break;
    case 10:
      textDiv.innerHTML = "国内美食等你回来一起吃！"
      break;
    case 11:
      textDiv.innerHTML = "国内美食等你回来一起吃！"
      break;
    case 12:
      textDiv.innerHTML = "国内美食等你回来一起吃！"
      break;
    case 13:
      textDiv.innerHTML = "特别感谢你的小礼物！"
      break;
    case 14:
      textDiv.innerHTML = "特别感谢你的小礼物！"
      break;
    case 15:
      textDiv.innerHTML = "祝福最后一学期顺利毕业！"
      break;
    case 16:
      textDiv.innerHTML = "同时身材棒棒！"
      break;
    case 17:
      textDiv.innerHTML = "也希望可以更加快乐，赶走EMO！友谊长存！"
      break;
    default:
      break;
  }
}

for (let col = 0; col < cols; col++) {
  let part = document.createElement('div');
  part.className = 'part';
  let el = document.createElement('div');
  el.className = "section";
  let img = document.createElement('img');
  img.src = images[current];
  el.appendChild(img);
  part.style.setProperty('--x', -100/cols*col+'vw');
  part.appendChild(el);
  main.appendChild(part);
  parts.push(part);
}

let animOptions = {
  duration: 2.3,
  ease: Power4.easeInOut
};

function go(dir) {
  if (!playing) {
    playing = true;
    if (current + dir < 0) current = images.length - 1;
    else if (current + dir >= images.length) current = 0;
    else current += dir;
    console.log(current)
    changeText(current)
    function up(part, next) {
      part.appendChild(next);
      gsap.to(part, {...animOptions, y: -window.innerHeight}).then(function () {
        part.children[0].remove();
        gsap.to(part, {duration: 0, y: 0});
      })
    }

    function down(part, next) {
      part.prepend(next);
      gsap.to(part, {duration: 0, y: -window.innerHeight});
      gsap.to(part, {...animOptions, y: 0}).then(function () {
        part.children[1].remove();
        playing = false;
      })
    }

    for (let p in parts) {
      let part = parts[p];
      let next = document.createElement('div');
      next.className = 'section';
      let img = document.createElement('img');
      img.src = images[current];
      next.appendChild(img);

      if ((p - Math.max(0, dir)) % 2) {
        down(part, next);
      } else {
        up(part, next);
      }
    }
  }
}

window.addEventListener('keydown', function(e) {
  if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
    go(1);
  }

  else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
    go(-1);
  }
});

function lerp(start, end, amount) {
  return (1-amount)*start+amount*end
}

const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size+'px');
cursorF.style.setProperty('--size', sizeF+'px');

window.addEventListener('mousemove', function(e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX-size/2+'px';
  cursor.style.top = e.clientY-size/2+'px';
});

function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF/2 + 'px';
  cursorF.style.left = cursorX - sizeF/2 + 'px';
  requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
  gsap.to(cursor, {scale: 4.5});
  gsap.to(cursorF, {scale: .4});

  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}
function mouseup(e) {
  gsap.to(cursor, {scale: 1});
  gsap.to(cursorF, {scale: 1});

  endY = e.clientY || endY;
  if (clicked && startY && Math.abs(startY - endY) >= 40) {
    go(!Math.min(0, startY - endY)?1:-1);
    clicked = false;
    startY = null;
    endY = null;
  }
}
window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function(e) {
  if (clicked) {
    endY = e.touches[0].clientY || e.targetTouches[0].clientY;
  }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);

let scrollTimeout;
function wheel(e) {
  clearTimeout(scrollTimeout);
  setTimeout(function() {
    if (e.deltaY < -40) {
      go(-1);
    }
    else if (e.deltaY >= 40) {
      go(1);
    }
  })
}
window.addEventListener('mousewheel', wheel, false);
window.addEventListener('wheel', wheel, false);

window.onbeforeunload = function() {
  console.log(1)
  window.location.href = "../cat/index.html";
};