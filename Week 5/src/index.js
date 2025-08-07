import './styles/styles.css';

let countEl = document.getElementById('count-el'); 

let count = 0

const increment = () => {
    count++;
    countEl.innerText = count;
}


document.getElementById('increment-btn').addEventListener("click", increment);