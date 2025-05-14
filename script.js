const AllInputs = document.querySelectorAll("input");

function salvarDadosFormulario() {

    const CEP = document.getElementById('CEP').value;
    const logradouro = document.getElementById('Logradouro').value;
    const bairro = document.getElementById('Bairro').value;
    const localidade = document.getElementById('Cidade').value;
    const uf = document.getElementById('Estado').value;

    localStorage.setItem("endereco", [CEP, logradouro, bairro, localidade, uf]);
};

function carregarDadosFormulario(enderecoCarregado) {

    const DadosFormatado = enderecoCarregado.split(",")

    document.getElementById('CEP').value = DadosFormatado[0];
    document.getElementById('Logradouro').value = DadosFormatado[1];
    document.getElementById('Bairro').value = DadosFormatado[2];
    document.getElementById('Cidade').value = DadosFormatado[3];
    document.getElementById('Estado').value = DadosFormatado[4];
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
                document.getElementById('Logradouro').value = data.logradouro;
                document.getElementById('Bairro').value = data.bairro;
                document.getElementById('Cidade').value = data.localidade;
                document.getElementById('Estado').value = data.uf;

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
    
    localStorage.removeItem("endereco");
    window.location.href = "perro.html";
});