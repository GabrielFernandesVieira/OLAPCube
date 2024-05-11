(function () {
    function adicionar() {
        var dados = JSON.stringify({
            name    : document.querySelector("textarea[name=txtnome]").value
        });
        // tbClientes.push(dados);
        localStorage.setItem("storage", JSON.stringify(dados));
        return true;
    }
    var form = document.querySelector("form");
    form.addEventListener("submit", function () {
        // event.preventDefault(); event
        return adicionar();
    });
})();