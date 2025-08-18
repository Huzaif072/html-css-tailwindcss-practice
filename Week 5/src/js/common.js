// Partials
import announcementBarPartial from '../partials/announcementBar.html';
import headerPartial from '../partials/header.html';
import footerPartial from '../partials/footer.html';

// Assets
import logo from '../assets/icons/Dawn_logo.png';

// Data & Components
import { initNavbar } from "../components/navbar.js";
import { renderFooterCards } from "../components/renderFooterCards.js";
import { renderFooterSocials } from "../components/renderFooterSocials.js";

export function loadCommonPartials() {
  const htmlPartials = {
    'announcement-bar-placeholder': announcementBarPartial,
    'header-placeholder': headerPartial,
    'footer-placeholder': footerPartial
  };

  const images = { 'logo': logo };

  // Inject HTML partials
  Object.entries(htmlPartials).forEach(([id, content]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = content;
  });

  // Inject images
  Object.entries(images).forEach(([id, src]) => {
    const el = document.getElementById(id);
    if (el) el.src = src;
  });

  initNavbar();

  renderFooterCards("#footer-cards");
  renderFooterSocials("#footer-socials");
}