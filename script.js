const abrir = document.getElementById("abrir");
const fechar = document.getElementById("fechar");
const menu = document.getElementById("menu");


// welcome
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise(r => setTimeout(r, 2000)); // espera 2s antes de iniciar

  const welcome = document.getElementById("welcome");
  if (!welcome) return;

  const h4 = welcome.querySelector("h4");
  const p  = welcome.querySelector("p");

  function fadeOut(element, duration) {
    return new Promise(resolve => {
      const initial = parseFloat(getComputedStyle(element).opacity) || 1;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        element.style.opacity = initial * (1 - progress);

        if (progress < 1) requestAnimationFrame(frame);
        else resolve();
      }

      requestAnimationFrame(frame);
    });
  }

  // 1) some os filhos ao mesmo tempo (2s)
  await Promise.all([
    h4 && fadeOut(h4, 3000),
    p  && fadeOut(p, 3000)
  ]);

  // 2) depois some o pai (3s)
  await fadeOut(welcome, 3100);

  welcome.remove();
});



// animacao de entrada do site

abrir.addEventListener("click", () => menu.classList.add("show"));
fechar.addEventListener("click", () => menu.classList.remove("show"));

var rellax = new Rellax(".rellax", {});

window.addEventListener("load", function () {
  rellax && typeof rellax.refresh === "function" && rellax.refresh();
});

// contato whatsapp
document.getElementById("sendBtn").addEventListener("click", function () {
  let name = document.getElementById("name").value.trim();
  let message = document.getElementById("message").value.trim();
  let hasError = false;

  // Remove erros antes de validar
  document.getElementById("error-name").classList.remove("error");
  document.getElementById("error-message").classList.remove("error");

  // Valida nome
  if (name === "") {
    document.getElementById("error-name").classList.add("error");
    hasError = true;
  }

  // Valida mensagem
  if (message === "") {
    document.getElementById("error-message").classList.add("error");
    hasError = true;
  }

  if (hasError) return;

  let phoneNumber = "554797708815";
  // Mensagem
  let whatsappMessage = `Olá, eu sou ${name}, vim pelo site e gostaria de falar: ${message}`;

  // Abre WhatsApp
  let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  window.open(whatsappURL, "_blank");
});

