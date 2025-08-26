import { footerSocials } from "../data/footerSocials.js";

export function renderFooterSocials(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  footerSocials.forEach(social => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = social.link;
    a.title = social.name;
    a.innerHTML = social.svg;

    li.appendChild(a);
    container.appendChild(li);
  });
}
