const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#menu-principal");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const toast = document.querySelector("#toast");
let toastTimeout;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 3500);
}

// Filtro acessível para a página de projetos.
const projectFilter = document.querySelector("#filtro-projetos");
const projectCards = [...document.querySelectorAll(".project-card")];
const filterStatus = document.querySelector("#resultado-filtro");
const emptyState = document.querySelector("#sem-resultados");

if (projectFilter && projectCards.length) {
  const applyProjectFilter = () => {
    const selected = projectFilter.value;
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const visible = selected === "todos" || card.dataset.category === selected;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (filterStatus) {
      filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "projeto disponível" : "projetos disponíveis"}.`;
    }
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  };

  projectFilter.addEventListener("change", applyProjectFilter);
}

// Formulário demonstrativo: validação, feedback e armazenamento local.
const form = document.querySelector("#cadastroForm");

if (form) {
  const params = new URLSearchParams(window.location.search);
  const initialInterest = params.get("interesse");
  if (initialInterest === "doacao" || initialInterest === "voluntariado") {
    const radio = form.querySelector(`input[name="interesse"][value="${initialInterest}"]`);
    if (radio) radio.checked = true;
  }

  const messageField = form.querySelector("#mensagem");
  const counter = form.querySelector("#contador");

  if (messageField && counter) {
    const updateCounter = () => { counter.textContent = String(messageField.value.length); };
    messageField.addEventListener("input", updateCounter);
    updateCounter();
  }

  const setError = (id, message) => {
    const element = document.querySelector(`#${id}`);
    if (element) element.textContent = message;
  };

  const clearErrors = () => {
    ["erro-nome", "erro-email", "erro-interesse", "erro-consentimento"].forEach((id) => setError(id, ""));
    form.querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const name = form.elements.nome;
    const email = form.elements.email;
    const interest = form.querySelector("input[name='interesse']:checked");
    const consent = form.elements.consentimento;
    let valid = true;

    if (name.value.trim().length < 3) {
      setError("erro-nome", "Informe seu nome completo (mínimo de 3 caracteres).");
      name.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!email.validity.valid || !email.value.trim()) {
      setError("erro-email", "Informe um endereço de e-mail válido.");
      email.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!interest) {
      setError("erro-interesse", "Selecione como deseja ajudar.");
      valid = false;
    }

    if (!consent.checked) {
      setError("erro-consentimento", "É necessário concordar com o armazenamento local demonstrativo.");
      consent.setAttribute("aria-invalid", "true");
      valid = false;
    }

    const feedback = document.querySelector("#form-feedback");
    if (!valid) {
      if (feedback) {
        feedback.className = "form-feedback error";
        feedback.textContent = "Revise os campos destacados antes de continuar.";
        feedback.focus();
      }
      return;
    }

    const record = {
      nome: name.value.trim(),
      email: email.value.trim(),
      telefone: form.elements.telefone.value.trim(),
      interesse: interest.value,
      mensagem: form.elements.mensagem.value.trim(),
      criadoEm: new Date().toISOString()
    };

    try {
      const key = "ongEsperancaCadastros";
      const previous = JSON.parse(localStorage.getItem(key) || "[]");
      previous.push(record);
      localStorage.setItem(key, JSON.stringify(previous));

      if (feedback) {
        feedback.className = "form-feedback success";
        feedback.textContent = "Cadastro demonstrativo salvo neste navegador. Obrigada por querer ajudar!";
        feedback.focus();
      }
      showToast("Cadastro salvo neste navegador.");
      form.reset();
      if (counter) counter.textContent = "0";
    } catch (error) {
      if (feedback) {
        feedback.className = "form-feedback error";
        feedback.textContent = "Não foi possível salvar neste navegador. Verifique as configurações de armazenamento.";
        feedback.focus();
      }
    }
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      clearErrors();
      const feedback = document.querySelector("#form-feedback");
      if (feedback) {
        feedback.className = "form-feedback";
        feedback.textContent = "";
      }
      if (counter) counter.textContent = "0";
    }, 0);
  });
}
