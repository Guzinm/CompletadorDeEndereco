const AllInputs = document.querySelectorAll("input");

const CEP = document.getElementById('CEP');
const logradouro = document.getElementById('Logradouro');
const bairro = document.getElementById('Bairro');
const localidade = document.getElementById('Cidade');
const uf = document.getElementById('Estado');

function salvarDadosFormulario() {

    const CEPValor = CEP.value;
    const logradouroValor = logradouro.value;
    const bairroValor = bairro.value;
    const localidadeValor = localidade.value;
    const ufValor = uf.value;

    localStorage.setItem("endereco", [CEPValor, logradouroValor, bairroValor, localidadeValor, ufValor]);
};

function carregarDadosFormulario(enderecoCarregado) {

    const DadosFormatado = enderecoCarregado.split(",")

    CEP.value = DadosFormatado[0];
    logradouro.value = DadosFormatado[1];
    bairro.value = DadosFormatado[2];
    localidade.value = DadosFormatado[3];
    uf.value = DadosFormatado[4];
}

document.getElementById("CEP").addEventListener("blur", (evento) => {

    const CEP = evento.target.value
    
    if (!(CEP.length == 8)) {
        return;
    };

    fetch(`https://viacep.com.br/ws/${CEP}/json/`)
        .then(response => {
            
            if (!response.ok) {
                throw new Error('response not ok');
            };
            return response.json();

        })
        .then(data =>{

            if(!data.error){
                logradouro.value = data.logradouro;
                bairro.value = data.bairro;
                localidade.value = data.localidade;
                uf.value = data.uf;

                salvarDadosFormulario();
            }else{
                alert("CEP INVALIDO");
            };

        })
        .catch(error => console.error("Erro ao buscar CEP: ", error));

});

AllInputs.forEach(element => {
    element.addEventListener("blur", () => {
        salvarDadosFormulario();
    });
}); 

function mudarTema() {
    document.body.classList.toggle("light");
    document.getElementById("formulario").classList.toggle("light");
    document.getElementById("botaoEnvio").classList.toggle("light");
    document.getElementById("mode").classList.toggle("Temalight");
};

document.getElementById("mode").addEventListener("click", () => {

    const TemaAtual = localStorage.getItem("tema");
    const NovoTema = TemaAtual === "dark" ? "light" : "dark";
    localStorage.setItem("tema", NovoTema);

    mudarTema();

});

document.addEventListener("DOMContentLoaded", () => {

    const TemaSalvo = localStorage.getItem("tema");
    const enderecoSalvo = localStorage.getItem("endereco");

    if (TemaSalvo === 'light') {
        mudarTema();
    };

    if (enderecoSalvo) {
        carregarDadosFormulario(enderecoSalvo);
    };
});

document.querySelector('#botaoEnvio').addEventListener("click", (evento) => {
    evento.preventDefault();

    window.location.href = "perro.html";
});