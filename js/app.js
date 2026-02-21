const App = {

  navigate(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(page).classList.add("active");

    if (page === "dashboard") Dashboard.render();
    if (page === "tanques") Tanques.render();
    if (page === "financeiro") Financeiro.render();
    if (page === "metas") Metas.render();
  },

  init() {
    Dashboard.render();
  }

};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
