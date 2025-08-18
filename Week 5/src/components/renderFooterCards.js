import { footerCards } from "../data/footerCards.js";

export function renderFooterCards(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  footerCards.forEach(card => {
    const li = document.createElement("li");
    li.innerHTML = card.svg;
    li.setAttribute("title", card.name);
    container.appendChild(li);
  });
}
