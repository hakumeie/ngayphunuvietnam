const loichuc = 'Chưa\nbiết\nnên\nviết\ngì\nvào\nđây';

const petal_imgs = [
    'assets/img/—Pngtree—peach-blossom_5405214.png'
];

let typing_timer = null;

// Tải trước các ảnh trong 'srcs', trả về Promise khi tải xong hết
function LoadImages (srcs) {
    return Promise.all(srcs.map(src => new Promise(resolve => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
    })));
};

function TypeText (text) {
    const wish = document.getElementById('wish');
    const chars = Array.from(text);
    let typed = '';
    let i = 0;
    clearInterval(typing_timer);
    wish.innerText = '';
    typing_timer = setInterval(() => {
        typed += chars[i];
        wish.innerText = typed;
        i++;
        if (i >= chars.length) clearInterval(typing_timer);
    }, 60);
};

function RainPetals () {
    const petals = document.getElementById('petals');
    setInterval(() => {
        if (document.hidden) return;
        const petal = document.createElement('img');
        petal.className = 'petal';
        petal.alt = '';
        petal.src = petal_imgs[Math.floor(Math.random() * petal_imgs.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.width = 20 + Math.random() * 20 + 'px';
        petal.style.animationDuration = 4 + Math.random() * 4 + 's';
        petals.appendChild(petal);
        petal.addEventListener('animationend', () => petal.remove());
    }, 250);
};

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-btn').classList.add('active');
    document.getElementById('thiep').classList.add('active');
    document.body.classList.add('active');
    RainPetals();
    setTimeout(() => {
        TypeText(loichuc);
    }, 900);
});

// Đợi trang, font và ảnh hoa tải xong mới cho bấm nút Start
Promise.all([
    LoadImages(petal_imgs),
    document.fonts.ready,
    new Promise(resolve => {
        if (document.readyState === 'complete') resolve();
        else window.addEventListener('load', resolve);
    })
]).then(() => {
    document.getElementById('start-btn').disabled = false;
    document.getElementById('start-btn').innerText = 'Bấm vào đây';
});