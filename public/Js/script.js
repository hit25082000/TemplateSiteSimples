const gg = function (a) { var d = "area base br col embed hr img input keygen link meta param source track wbr".split(" "); if (a) { a.style ? a.style = a.style.split("\n").join(" ") : se = 0; a.tag ? se = 0 : a.tag = "div"; var b = "<" + a.tag, c; for (c in a) "tag" != c && "html" != c ? b += " " + c + "='" + a[c] + "'" : se = 0; d.includes(a.tag) ? a = b + "/>" : (b = a.html ? b + (">" + a.html) : b + ">", a = b + ("</" + a.tag + ">")); return a } };
const analytics = firebase.analytics();
const db = firebase.firestore();
var storage = firebase.storage();
var HTML = {}
var Produtos = []

class Item {
  constructor(nome, valor, imagem, detalhes) {
    this.nome = nome,
      this.valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      this.imagem = imagem,
      this.detalhes = detalhes,
      this.quantidade = 1
  }
}

const Local = {
  get(data) {
    return JSON.parse(localStorage.getItem(data));
  },

  set(local, data) {
    return localStorage.setItem(local, JSON.stringify(data))
  }

}

const Cart = {
  cart: JSON.parse(localStorage.getItem('cart')),

  LoadCart() {
    var cartOffCanvas = document.querySelector('.offcanvas-body');
    var cartIconNotification = document.querySelector('.cartIconNotification');
    var cart = JSON.parse(localStorage.getItem('cart'));

    cartOffCanvas.innerHTML = ''

    var countNotification = (count) => gg({
      tag: "span",
      class: "position-absolute top-0 start-100  translate-middle badge rounded-pill bg-danger",
      html: `${count} ${gg({
        tag: 'span',
        class: 'visually-hidden',
        html: 'unread messages'
      })}`
    })

    if (cart != null && cart.length > 0) {
      cartIconNotification.innerHTML += countNotification(cart.length)
    } else {
      cartIconNotification.innerHTML = 'Cart'
      cart = []
    }

    cart.forEach(e => {
      cartOffCanvas.innerHTML +=
        `<div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="https://source.unsplash.com/random"
            class="img-fluid rounded-start" alt="imgProduct">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${e.nome}
            ${countNotification(e.quantidade)}
          </h5>
            <p class="card-text">${e.valor}</p>
            <button class="btn btn-danger" onclick="Cart.RemoveItem('${e.nome}')">Remover</button>
          </div>
        </div>
      </div>
    </div>`
    })
  },

  AddItem(productIndex) {
    var cart = JSON.parse(localStorage.getItem('cart'));

    if (cart == null)
      cart = []

    const alreadyHave = cart.some(obj => obj.nome === Produtos[parseInt(productIndex)].nome);

    if (alreadyHave) {
      cart.forEach(e => {
        if (e.nome == Produtos[parseInt(productIndex)].nome)
          e.quantidade++
      })
    } else {
      cart.push(Produtos[parseInt(productIndex)])
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    this.LoadCart();
  },

  RemoveItem(productNome) {
    var cart = Local.get('cart')

    if (cart == null)
      cart = []

    cart.forEach(e => {
      if (e.nome == productNome)
        e.quantidade--
      if (e.quantidade == 0)
        cart.splice(cart.indexOf(e), 1);
    })

    Local.set('cart', cart)

    this.LoadCart();
  },
}

const Theme = {

  LightTheme(load, button) {
    document.documentElement.setAttribute('data-bs-theme', 'light');

    load.forEach(function (node) {
      node.style.backgroundColor = "black";
    });

    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="grey" class="bi bi-moon-fill" viewBox="0 0 16 16">
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
      </svg>`
  },

  DarkTheme(load, button) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');

    load.forEach(function (node) {
      node.style.backgroundColor = "white";
    });

    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="yellow" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
  </svg>`
  },

  RenderTheme() {
    var loadAnim = document.querySelectorAll(".loadChild");
    var button = document.getElementById("btnMudarTema");
    var theme = localStorage.getItem('theme');

    if (JSON.parse(theme) == 'dark') {
      this.DarkTheme(loadAnim, button)
    }
    else {
      this.LightTheme(loadAnim, button)
    }
  },

  SwitchTheme() {
    Local.get('theme') == 'dark' ? Local.set('theme', 'ligth') : Local.set('theme', 'dark')

    this.RenderTheme();
  },

}

const App = {
  Init() {
    this.LoadCache();
    this.LoadInfo();
    this.LoadItems();
    this.LoadAds();
  },

  LoadCache() {
    Theme.RenderTheme();
    Cart.LoadCart();
  },

  LoadInfo() {
    var empresaIcone = document.querySelector("#empresaIcone")
    var empresaNome = document.querySelector("#EmpresaNome")
    var empresaFacebook = document.querySelector("#EmpresaFacebook")
    var empresaInstagram = document.querySelector("#EmpresaInstagram")
    var empresaWhatsApp = document.querySelector("#EmpresaWhatsApp")


    db.collection("Informações").doc("Empresa").get().then((doc) => {
      if (doc.exists) {

        empresaIcone.innerHTML = `<img src="${doc.data().logo}" width="50px">`

        empresaNome.innerHTML = doc.data().nome;
        empresaFacebook.href = doc.data().facebook
        empresaWhatsApp.href = doc.data().whatsapp;
        empresaInstagram.href = doc.data().instagram;

      } else {
        console.log("Cliente Não Encontrado");
      }

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  },

  LoadItems() {
    var produtosHtml = document.querySelector('.produtos');

    db.collection("Produtos").get().then((querySnapshot) => {

      produtosHtml.innerHTML = '';    

      querySnapshot.forEach((doc) => {
        Produtos.push(new Item(doc.data().nome, doc.data().valor, doc.data().imagem, doc.data().detalhes))
      });

      Produtos.forEach((e, i) => {
        produtosHtml.innerHTML += `
        <div class="col">
      <div class="card shadow-sm ">
      <img src="${e.imagem}" width="100%" height="100%" xmlns="https://source.unsplash.com/random"
      aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" alt="">
        <div class="card-body">
        <p class="card-text">${e.detalhes}</p>
        <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-secondary">Detalhes</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="Cart.AddItem('${i}')" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling">Comprar</button>
        </div>
        <small class="text-body-secondary">${e.valor}</small>
        </div>
        </div>
        </div>
        </div>
        `
      })
    });

  },

  LoadAds() {
    this.LoadCarrossel();
    this.LoadHome();
    this.LoadAbout();
  },

  LoadCarrossel() {
    var carrosselHTML = document.querySelector('.carousel');

    var slideBtns = ''
    var carrosselItems = `<div class="carousel-inner">`

    var carrossel = (slideBtns) => gg({
      tag: "div",
      class: "carousel-indicators",
      html: `${slideBtns}`
    })

    db.collection("Carrossel").get().then((querySnapshot) => {
      carrosselHTML.innerHTML = ''

      i = 0

      querySnapshot.forEach((doc) => {

        var active = (i == 0 ? active = "active" : active = "")

        slideBtns += `<button type="button" class="${active}"  data-bs-target="#myCarousel" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>`

        let textPosition = ""

        if (doc.id == "Esquerda") {
          textPosition = "text-start"
        }

        if (doc.id == "Direita") {
          textPosition = "text-end"
        }

        carrosselItems += `<div class="carousel-item ${active}" >
        <img src="${doc.data().imagem}" width="100%" xmlns="https://source.unsplash.com/random"
        aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" alt="">
        <div class="container">
        <div class="carousel-caption ${textPosition}">
        <h1>${doc.data().titulo}</h1>
        <p>${doc.data().descricao}</p>
        <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
        </div>
        </div>
        </div>`

        i++
      });

      carrosselItems += `</div> <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>`

      carrosselHTML.innerHTML = carrossel(slideBtns) + carrosselItems;

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  },

  LoadHome() {
    var homeHTML = document.querySelector('.home');

    var slideBtns = ''
    var carrosselItems = `<div class="carousel-inner">`

    var carrossel = (slideBtns) => gg({
      tag: "div",
      class: "carousel-indicators",
      html: `${slideBtns}`
    })

    db.collection("Carrossel").get().then((querySnapshot) => {
      carrosselHTML.innerHTML = ''

      i = 0

      querySnapshot.forEach((doc) => {

        var active = (i == 0 ? active = "active" : active = "")

        slideBtns += `<button type="button" class="${active}"  data-bs-target="#myCarousel" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>`

        let textPosition = ""

        if (doc.id == "Esquerda") {
          textPosition = "text-start"
        }

        if (doc.id == "Direita") {
          textPosition = "text-end"
        }

        carrosselItems += `<div class="carousel-item ${active}" >
        <img src="${doc.data().imagem}" width="100%" xmlns="https://source.unsplash.com/random"
        aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" alt="">
        <div class="container">
        <div class="carousel-caption ${textPosition}">
        <h1>${doc.data().titulo}</h1>
        <p>${doc.data().descricao}</p>
        <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
        </div>
        </div>
        </div>`

        i++
      });

      carrosselItems += `</div> <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>`

      carrosselHTML.innerHTML = carrossel(slideBtns) + carrosselItems;

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

}

App.Init();