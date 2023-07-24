class Produto{    
    constructor(nome,valor,imagem,detalhes){
        this.nome = nome,
        this.valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        this.imagem = imagem,
        this.detalhes = detalhes 
    }
}

const Empresa = {
  Nome: "Pastelaria do DIA",
  WhatsApp: 990091239123,
  Endereco: 'Rua x.y',
  Produtos: [
      new Produto('Pao',99,'xd','...'),
      new Produto('pasteljoaodebarro',99,'xd','...')    
  ]
}

function MudarTema(){
    var button = document.getElementById("btnMudarTema");
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light');
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="grey" class="bi bi-moon-fill" viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
      </svg>`      
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark');
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="yellow" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      </svg>`
    }
}   

db.get()

const App = {
    Init(){
        this.PopularProdutos();
    },

    PopularProdutos(){
        var produtosHtml = document.querySelector('.produtos');
        produtosHtml.innerHTML = '';
        
        Empresa.Produtos.forEach(e => {
            produtosHtml.innerHTML += `
            <div class="col">
            <div class="card shadow-sm">
              <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Produto" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">${e.nome}</text></svg>
              <div class="card-body">
                <p class="card-text">${e.detalhes}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Detalhes</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Comprar</button>
                  </div>
                  <small class="text-body-secondary">${e.valor}</small>
                </div>
              </div>
            </div>
            </div>`
        });
    }
}

App.Init();