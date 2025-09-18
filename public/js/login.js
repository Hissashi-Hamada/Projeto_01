document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("inputPassword");

    // Toggle de senha
    togglePassword.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        togglePassword.textContent = type === "password" ? "Mostrar" : "Ocultar";
    });

    // Validação do formulário
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        // Simulação de login
        alert("Login realizado com sucesso!");
    });
});
