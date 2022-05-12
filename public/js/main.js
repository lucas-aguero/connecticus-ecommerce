class Main {
  async ajax(url, metodo = "get") {
    return await fetch(url, { method: metodo }).then((r) => r.text());
  }

  filenameViewGet(id) {
    return "vistas/" + id + ".html";
  }

  menuItemVisitedLinkMark(id) {
    let menuLinks = document.querySelectorAll(".menu-item");
    menuLinks.forEach((menuItemLink) => {
      if (menuItemLink.id == id) {
        menuItemLink.classList.add("menu-item__active");
      } else {
        menuItemLink.classList.remove("menu-item__active");
      }
    });
  }

  initJS(id) {
    if (id == "alta") {
      initAlta();
    } else if (id == "inicio") {
      initInicio();
    } else if (id == "nosotros") {
      initNosotros();
    } else if (id == "contacto") {
      initContacto();
    }
  }

  async viewTemplateLoad(id) {
    let filename = this.filenameViewGet(id);

    let template = await this.ajax(filename);
    let main = document.querySelector("main");

    main.innerHTML = template;

    this.initJS(id);
  }

  async templatesLoad() {
    let id = location.hash.slice(1) || "inicio";
    this.menuItemVisitedLinkMark(id);
    await this.viewTemplateLoad(id);

    let menuLinks = document.querySelectorAll(".menu-item");

    menuLinks.forEach((menuItemLink) => {
      menuItemLink.addEventListener("click", (e) => {
        e.preventDefault();
        let id = menuItemLink.id;
        location.hash = id;
      });
    });

    window.addEventListener("hashchange", async () => {
      let id = location.hash.slice(1) || "inicio";
      this.menuItemVisitedLinkMark(id);
      await this.viewTemplateLoad(id);
    });
  }

  async start() {
    await this.templatesLoad();
  }
}

const main = new Main();

main.start();
