import './styles/styles.css';
import image from './assets/Image_2.png';
import image2 from './assets/Image_3.png';
import image4 from './assets/Image_5.png';
import ai_chatbots from './assets/AI Chatbots.png';
import image_6 from './assets/Image_6.jpeg';
import image_7 from './assets/Image_7.jpeg';
import image_8 from './assets/Image_8.jpeg';

document.querySelector('#image').src = image;
document.querySelector('#image_2').src = image2;
document.querySelector('#image_3').src = image2;
document.querySelector('#image_4').src = image4;
document.querySelector('#ai_chatbots').src = ai_chatbots;
document.querySelector('#image_6').src = image_6;
document.querySelector('#image_7').src = image_7;
document.querySelector('#image_8').src = image_8;
// document.querySelector('#image_9').src = image_6;
// document.querySelector('#image_10').src = image_6;
// document.querySelector('#image_11').src = image_6;

const html = document.documentElement;
const darkToggleBtn = document.getElementById('dark-toggle-btn');

if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
}
else if (localStorage.getItem('theme') === 'light') {
    html.classList.remove('dark');
}
else {
    if (window.matchMedia('(prefers-color-scheme: dark').matches) {
        html.classList.add('dark');
    }
}

darkToggleBtn.addEventListener('click', () => {
    html.classList.toggle('dark');

    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    }
    else {
        localStorage.setItem('theme', 'light');
    }
})