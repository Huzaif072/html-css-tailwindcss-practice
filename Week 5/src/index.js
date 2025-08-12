import './styles/styles.css';

async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("navbar", "./src/components/navbar.html");
loadComponent("footer", "./src/components/footer.html");

async function loadCards() {
  const container = document.getElementById("cards-container");
  for (let i = 0; i < 6; i++) {
    const res = await fetch("./src/components/card.html");
    const html = await res.text();
    container.innerHTML += html;
  }
}
loadCards();

document.addEventListener('click', (e) => {
  if (e.target.id === 'dark-toggle-btn') {
    document.documentElement.classList.toggle('dark');
  }
});
