import { categories } from "../data/categories.js";

export function initNavbar() {
  const dropdownButtons = document.querySelectorAll("button[data-dropdown]");

  dropdownButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.stopPropagation();

      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (menu !== button.parentElement.querySelector(".dropdown-menu")) {
          menu.classList.add("hidden");
        }
      });

      const dropdown = button.parentElement.querySelector(".dropdown-menu");
      const key = button.dataset.dropdown; 

      if (categories[key]) {
        dropdown.innerHTML = `
          <ul class="list-none m-0 p-0">
            ${categories[key]
              .map(item => `<a href="#"><li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">${item}</li></a>`)
                .join("")}
          </ul>
        `;
      }

      dropdown.classList.toggle("hidden");
    });
  });

  window.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      menu.classList.add("hidden");
    });
  });
}
