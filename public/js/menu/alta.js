class FormAddNew {
  inputsConValidacion = null;
  inputsSinValidacion = null;

  form = null;
  button = null;
  camposValidos = [false, false, false, false];
  regExpValidar = [
    /^.+$/, // regexp nombre
    /^.+$/, // regexp marca
    /^[0-9-]+$/, // regexp precio
    /^[0-9-]+$/, // regexp stock
    // /^[0-9-]+$/, // regexp categoria
    // /^.+$/, // regexp detalle
    // /^.+$/, // regexp foto
  ];

  /* -------------  drag and drop  -----------------*/
  dropArea = null;
  progressBar = null;
  imagenSubida = "";
  /* ---------------------------------------------- */

  constructor(addTableRender, guardarProducto) {
    this.inputsConValidacion = document.querySelectorAll("main form input");
    this.inputsSinValidacion = document.querySelectorAll(
      "main form select, main form textarea"
    );
    this.form = document.querySelector(".alta-container__form");
    this.button = document.getElementById("button-add");

    this.button.disabled = true;
    this.button.classList.add(
      "alta-container__form__buttons__button__disabled"
    );

    this.inputsConValidacion.forEach((input, index) => {
      if (input.type != "checkbox" && input.type != "file") {
        input.addEventListener("input", () => {
          this.validar(input.value, this.regExpValidar[index], index);
          if (addTableRender)
            addTableRender(
              !this.algunCampoNoValido(),
              productController.productos
            );
        });
      }
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      let producto = this.productReadForm();

      this.formClean();

      if (guardarProducto) guardarProducto(producto);
    });

    /* -------------  drag and drop  -----------------*/
    this.dropArea = document.getElementById("drop-area");
    this.progressBar = document.getElementById("progress-bar");
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      this.dropArea.addEventListener(eventName, (e) => e.preventDefault());
      document.body.addEventListener(eventName, (e) => e.preventDefault());
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      this.dropArea.addEventListener(eventName, () =>
        this.dropArea.classList.add("highlight")
      );
    });
    ["dragleave", "drop"].forEach((eventName) => {
      this.dropArea.addEventListener(eventName, () =>
        this.dropArea.classList.remove("highlight")
      );
    });

    this.dropArea.addEventListener("drop", (e) => {
      var dt = e.dataTransfer;
      var files = dt.files;
      this.handleFiles(files);
    });

    /* ---------------------------------------------- */
  }

  setCustomValidityJS = function (mensaje, index) {
    let divs = document.querySelectorAll(".alta-container__form__input__error");
    divs[index].innerHTML = mensaje;
    divs[index].style.display = mensaje ? "block" : "none";
  };

  algunCampoNoValido() {
    let valido =
      this.camposValidos[0] &&
      this.camposValidos[1] &&
      this.camposValidos[2] &&
      this.camposValidos[3];

    return !valido;
  }

  validar(valor, validador, index) {

    if (!validador.test(valor)) {
      this.setCustomValidityJS("Este campo no es válido", index);
      this.camposValidos[index] = false;
      this.button.disabled = true;
      this.button.classList.add(
        "alta-container__form__buttons__button__disabled"
      );
      return null;
    }

    this.camposValidos[index] = true;
    this.button.disabled = this.algunCampoNoValido();
    this.button.classList.remove(
      "alta-container__form__buttons__button__disabled"
    );

    this.setCustomValidityJS("", index);
    return valor;
  }

  productReadForm() {
    return {
      nombre: this.inputsConValidacion[0].value,
      marca: this.inputsConValidacion[1].value,
      precio: this.inputsConValidacion[2].value,
      stock: this.inputsConValidacion[3].value,
      envio: this.inputsConValidacion[4].checked,
      categoria: this.inputsSinValidacion[0].value,
      detalles: this.inputsSinValidacion[1].value,
      foto: this.inputsConValidacion[5].value,
    };
  }

  formClean() {
    this.inputsConValidacion.forEach((input) => {
      if (input.type != "checkbox") input.value = "";
      else if (input.type == "checkbox") input.checked = false;
    });

    this.inputsSinValidacion.forEach((input) => {
      if (input.type != "checkbox") input.value = "";
      else if (input.type == "checkbox") input.checked = false;
    });

    this.button.disabled = true;
    this.camposValidos = [false, false, false, false];

    let img = document.querySelector("#gallery img");
    img.src = "";

    this.progressInitialize();

    this.imagenSubida = "";
  }

  /* -------------  drag and drop  -----------------*/
  progressInitialize() {
    this.progressBar.value = 0;
  }

  progressUpdate(porcentaje) {
    this.progressBar.value = porcentaje;
  }

  previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.querySelector("#gallery img");
      img.src = reader.result;
    };
  }

  handleFiles = (files) => {
    let file = files[0];

    this.progressInitialize();
    this.uploadFile(file);
    this.previewFile(file);
  };

  uploadFile = (file) => {
    var url = "/upload";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.addEventListener("progress", (e) => {
      this.progressUpdate((e.loaded * 100) / e.total || 100);
    });

    xhr.addEventListener("load", () => {
      if (xhr.status == 200) {
        this.imagenSubida = JSON.parse(xhr.response).nombre;
      }
    });

    var formdata = new FormData();
    formdata.append("foto", file);
    xhr.send(formdata);
  };
  /* ---------------------------------------------- */
}

function addTableRender(validos, productos) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "plantillas/alta.hbs");
  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      let plantillaHbs = xhr.response;

      var template = Handlebars.compile(plantillaHbs);
      let html = template({ productos, validos });
      document.getElementById("product-list-container__list").innerHTML = html;
    }
  });
  xhr.send();
}

/* ------------------------------------------------------------ */
/*      Inicializaciones para el funcionamiento del módulo      */
/* ------------------------------------------------------------ */
let formAddNewProduct = null;

async function initAlta() {
  formAddNewProduct = new FormAddNew(
    addTableRender,
    productController.guardarProducto
  );

  let productos = await productController.productGetAll();
  addTableRender(null, productos);
}
