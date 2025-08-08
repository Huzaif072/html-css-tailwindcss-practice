import './styles/styles.css';

let count = Number(localStorage.getItem('count')) || 0;

const html = document.documentElement;
const countEl = document.getElementById('count-el');
const countBtn = document.getElementById('count-btn');
const resetBtn = document.getElementById('reset-btn');
const stepInput = document.getElementById('step-input');

countEl.textContent = count;
if (count > 10) {
    countEl.classList.add('text-blue-500');
}

countBtn.addEventListener('click', () => {
    let stepValue = Number(stepInput.value) || 1;
    count += stepValue;
    if (count > 10 && !countEl.classList.contains('text-blue-500')) {
        countEl.classList.add('text-blue-500');
    }
    else if (count <= 10 && countEl.classList.contains('text-blue-500')) {
        countEl.classList.remove('text-blue-500');
    }
    if (count > 20 && !html.classList.contains('text-yellow-200')) {
        html.classList.add('bg-yellow-200');
    }
    else if (count <= 20 && html.classList.contains('text-yellow-200')) {
        html.classList.remove('bg-yellow-200');
    }  
    if(count > 50) {
        count = 50;
    }
    localStorage.setItem('count', count);
    countEl.textContent = count;
})

resetBtn.addEventListener('click', () => {
    count = 0;
    countEl.textContent = count;
    countEl.classList.remove('text-blue-500');
    html.classList.remove('bg-yellow-200');
    localStorage.setItem('count', count);
})