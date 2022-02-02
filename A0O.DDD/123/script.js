class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '│█║▌☽⑉𐐒𐐚∞࿐ྂ.ೃ࿔✼✿•̩̩͙‧̍̊·ೃ⁀➷↶*ೃ✧❃↷⌇ׂׂૢ✧‧̥ ̩̥˚̩̩̥͙°̩̥˚⁺‧͙-+★*☆ஓ๑ෆ*̑˟♡･ﾟׂׂૢ་༘Ƹ̵̡Ӝ̵̨̄༊Ʒ˚̑꒷꒦ ༘';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update(5);
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }

}

const phrases = [
    'A0O.',
    '(stopped⑉../',
    '..이게 뭐야',
    '(骤然的イコールsuddenly)',
    'cest...as i said:',
    'A0OÖ.DDD',
    '',
    'Wh3rE @Re W3',
    'N口w',
    ''
];


const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 5;
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 800);
    });
    counter = (counter + 1) % phrases.length;
};

next();