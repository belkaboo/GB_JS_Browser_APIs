const images = [
    'img/image1.jpg',
    'img/image2.jpg',
    'img/image3.jpg',
    'img/image4.jpg',
    'img/image5.jpg'
];


const currentImage = document.getElementById('currentImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentIndex = 0;

function showImage(index) {
    currentImage.src = images[index];
    updateDots(index);
};


function updateDots(index) {
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i == index);
    });
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function createDots() {
    images.forEach((_, index) => {
        const dot = document.createElement('span');

        dot.classList.add('slider-dot');
        sliderDots.appendChild(dot);

        dot.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });
}


prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

createDots();
showImage(currentIndex);



// для красоты
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});