const root = document.querySelector('.root');

class Game {
  constructor(number, picture) {
    this.number = number;
    this.picture = picture;
    this.url = null;
    this.arr = null;
    this.value = null;
    this.current = null;
    this.count = 0;
    this.point = number;
    this.size = null;
  }

  choice() {
    switch (this.picture) {
      case 1:
        this.url = 'one-skirt';
        break;
      case 2:
        this.url = 'two-skirt';
        break;
      case 3:
        this.url = 'three-skirt';
        break;
      default:
    }

    switch (this.number) {
      case 10:
        this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
        this.size = 'big';
        break;
      case 18:
        this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
        this.size = 'medium';
        break;
      case 24:
        this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7,
          8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
        this.size = 'small';
        break;
      default:
    }
  }

  build() {
    root.classList.add('wrapper');
    root.innerHTML = `<div class="timer"><span id="minutes"></span>:
    <span id="seconds"></span>
        </div>`;
    while (this.number > 0) {
      this.value = Math.round(Math.random() * (this.arr.length - 1));
      root.innerHTML += `<div class="container ${this.size}">
            <div class="card" num=${this.arr[this.value]}>
              <div class="front ${this.url}"></div>
              <div class="back">${this.arr[this.value]}</div>
            </div>
          </div>`;
      this.arr.splice(this.value, 1);
      this.number = this.number - 1;
    }
  }

  handle() {
    root.addEventListener('click', (event) => {
      let target = event.target;
      while (target !== root) {
        if (target.classList.contains('card')) {
          if (this.count === 2) {
            return false;
          }

          target.classList.add('flipped');
          this.count = this.count + 1;
          if (this.count === 1) {
            this.current = target;
          }

          if (target === this.current) {
            this.count = 1;
          }

          if (this.count === 2) {
            if (this.current.getAttribute('num') === target.getAttribute('num')) {
              setTimeout(() => {
                this.current.classList.add('hide');
                target.classList.add('hide');
                this.point = this.point - 2;
                this.count = 0;
                if (this.point === 0) {
                  this.win();
                }
              }, 1000);
            } else {
              setTimeout(() => {
                this.current.classList.remove('flipped');
                target.classList.remove('flipped');
                this.count = 0;
              }, 1000);
            }
          }
          return;
        }
        target = target.parentNode;
      }
    });
  }

  timer() {
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');
    let min = 0;
    let sec = 0;
    setInterval(() => {
      sec += 1;
      if (sec === 60) {
        min += 1;
        sec = 0;
      }
      seconds.innerHTML = this.formatNumber(sec);
      minutes.innerHTML = this.formatNumber(min);
    }, 1000);
  }

  formatNumber(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  win() {
    root.classList.remove('wrapper');
    root.innerHTML = `<h2 class="win_title">Congratulations! You do it!</h2>
                      <button class="win btn">Restart game</button>`;

    const win = document.querySelector('.win');
    win.addEventListener('click', () => {
      root.innerHTML = '';
      begin = new Start();
      begin.build();
      begin.handle();
    });
  }

  init() {
    this.choice();
    this.build();
    this.handle();
    this.timer();
  }
}

class Start {
  constructor() {
    this.rules = `<div class="info"><h3 >Description</h3>

       <p>Your task is to match numbers under the cards</p>
       <p>All numbers are hidden. Good luck</p></div>
       <div class="rules"><h3 >To play:</h3>
       <ol class="rules__item">
         <li>Select two cards trying to match the numbers.</li>
         <li>If you match the numbers you can go again.</li>
         <li>If they don't match, they turn around.</li>
         <li>The player that finds all pairs wins!</li>
         <li>Have fun!</li>
       </ol></div>`;
    this.diff = `<div class="game_diff"><h3 >Game Difficulty</h3>
        <form class="diff_form">
       <label about="20">
         <input type="radio" name="diff" value="10" >
         Low (5x2)
       </label>
       <label abc="20">
         <input type="radio" name="diff" value="18">
         Medium (6x3)
       </label>
       <label abc="20">
         <input type="radio" name="diff" value="24">
         High (8x3)
       </label>
     </form></div>`;
    this.skirt = `<div class="skirt_cards"> <h3 >Skirt Cards</h3>
        <form class="skirt_form">
     <label>
         <input type="radio" name="skirt" value="1">
         <img src="img/card_1.jpg" width="200" height="250" alt="First skirt">
       </label>
       <label>
         <input type="radio" name="skirt" value="2">
         <img src="img/card_2.jpg" width="200" height="250" alt="Second skirt">
       </label>
       <label>
         <input type="radio" name="skirt" value="3">
         <img src="img/card_3.jpg" width="200" height="250" alt="Third skirt">
       </label>
        </form></div>`;
    this.button = '<button class="start btn">Start Game</button>';
    this.number = 10;
    this.picture = 1;
  }

  build() {
    root.innerHTML = this.rules;
    root.innerHTML += this.diff;
    root.innerHTML += this.skirt;
    root.innerHTML += this.button;
  }

  handle() {
    const formDiff = document.querySelector('.diff_form');
    const formSkirt = document.querySelector('.skirt_form');
    const startGame = document.querySelector('.start');
    formDiff.addEventListener('click', (event) => {
      this.number = Number(event.target.value);
    });
    formSkirt.addEventListener('click', (event) => {
      this.picture = Number(event.target.value);
    });
    startGame.addEventListener('click', (event) => {
      event.stopPropagation();
      root.innerHTML = '';
      const initGame = new Game(this.number, this.picture);
      initGame.init();
    });
  }
}

let begin = new Start();
begin.build();
begin.handle();
