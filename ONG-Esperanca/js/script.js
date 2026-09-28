document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
            });
        });
    }

    const form = document.getElementById("cadastroForm");
    const message = document.getElementById("formMessage");

    if (form && message) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const nome = document.getElementById("nome").value.trim();
            message.textContent = `Obrigado, ${nome}! Seu cadastro foi enviado com sucesso. Em uma aplicação real, os dados seriam encaminhados para a equipe da ONG.`;
            message.className = "form-message success";

            form.reset();
        });
    }
});
