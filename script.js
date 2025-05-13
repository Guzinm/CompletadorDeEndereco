document.getElementById("CEP").addEventListener("blur", (evento) => {

    const CEP = evento.target.value
    
    if (!(CEP.length == 8)) {
        return;
    }

    fetch(`https://viacep.com.br/ws/${CEP}/json/`)
        .then(response => response.json())
        .then(data =>{

            if(!data.error){
                document.getElementById('Logradouro').value = data.logradouro
                document.getElementById('Bairro').value = data.bairro
                document.getElementById('Cidade').value = data.localidade
                document.getElementById('Estado').value = data.uf
            }else{
                alert("CEP INVALIDO")
            }

        })
        .catch(error => console.error("Erro ao buscar CEP: ", error));

})

document.getElementById("mode").addEventListener("click", () => {

    const TemaAtual = localStorage.getItem("tema");
    const NovoTema = TemaAtual === "dark" ? "light" : "dark";
    localStorage.setItem("tema", NovoTema);

    document.body.classList.toggle("light");
    document.getElementById("formulario").classList.toggle("light");
    document.getElementById("botaoEnvio").classList.toggle("light");
    document.getElementById("mode").classList.toggle("Temalight");

})

document.addEventListener("DOMContentLoaded", () => {

    const TemaSalvo = localStorage.getItem("tema");

    if (TemaSalvo === 'light') {
        document.body.classList.toggle("light");
        document.getElementById("formulario").classList.toggle("light");
        document.getElementById("botaoEnvio").classList.toggle("light");
        document.getElementById("mode").classList.toggle("Temalight");
    }

})