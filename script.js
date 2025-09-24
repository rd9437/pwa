// Add Install App button to the DOM and handle PWA install prompt
window.addEventListener('DOMContentLoaded', () => {
  // Inject CSS for shiny animation
  const style = document.createElement('style');
  style.textContent = `
    #installAppBtn {
      display: none;
      padding: 8px 16px;
      font-family: Poppins, "Comic Sans MS", sans-serif;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      border-radius: 8px;
      overflow: hidden;
      text-transform: uppercase;
      color: #fff;
      font-size: 14px;
      border: 2px solid #574a99;
      background: #574a99;
      box-shadow: 0 2px 8px rgba(123,116,198,0.3);
      transition: background 0.3s ease;
    }

    #installAppBtn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -75%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-20deg);
      animation: shine 2s infinite;
      pointer-events: none; /* so clicks go through */
      border-radius: 8px;
    }

    @keyframes shine {
      0% {
        left: -75%;
      }
      100% {
        left: 125%;
      }
    }

    #installAppBtn:hover {
      background: #6a63b3; /* Slightly darker violet on hover */
      border-color: #6a63b3;
    }
  `;
  document.head.appendChild(style);

  // Append the button to the .buttons div next to Enter Neostream
  const buttonsDiv = document.querySelector('.buttons');
  if (buttonsDiv) {
    buttonsDiv.appendChild(installBtn);
  } else {
    document.body.appendChild(installBtn); // fallback
  }

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        installBtn.style.display = 'none';
      }
      deferredPrompt = null;
    }
  });
});
