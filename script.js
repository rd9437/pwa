// Add Install App button to the DOM and handle PWA install prompt
window.addEventListener('DOMContentLoaded', () => {
  // Inject CSS for shiny animation
  const style = document.createElement('style');
  style.textContent = `
    #installAppBtn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
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
      position: fixed;
      bottom: 20px;
      right: 20px;
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

  // Create the button
  const installBtn = document.createElement('button');
  installBtn.id = 'installAppBtn';
  installBtn.style.display = 'none';
  installBtn.style.padding = '12px 20px 12px 20px';
  installBtn.style.background = '#7b74c6'; // violet
  installBtn.style.color = '#fff';
  installBtn.style.border = '2px solid #7b74c6';
  installBtn.style.borderRadius = '8px';
  installBtn.style.boxShadow = '0 2px 8px rgba(123,116,198,0.3)';
  installBtn.style.fontFamily = 'Poppins, "Comic Sans MS", sans-serif';
  installBtn.style.fontWeight = '600';
  installBtn.style.letterSpacing = '0.5px';
  installBtn.style.cursor = 'pointer';
  installBtn.style.alignItems = 'center';
  installBtn.style.gap = '8px';
  installBtn.style.marginLeft = '12px'; // space from Enter Neostream

  // Add text span
  const btnText = document.createElement('span');
  btnText.textContent = 'Install App';
  installBtn.appendChild(btnText);

  // Add small cross button
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '✕';
  closeBtn.style.fontSize = '13px';
  closeBtn.style.marginLeft = '10px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.background = 'rgba(0,0,0,0.12)';
  closeBtn.style.borderRadius = '50%';
  closeBtn.style.width = '18px';
  closeBtn.style.height = '18px';
  closeBtn.style.display = 'inline-flex';
  closeBtn.style.alignItems = 'center';
  closeBtn.style.justifyContent = 'center';
  closeBtn.style.color = '#fff';
  closeBtn.style.position = 'relative';
  closeBtn.style.top = '-1px';
  closeBtn.setAttribute('title', 'Dismiss');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    installBtn.style.display = 'none';
  });
  installBtn.appendChild(closeBtn);

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
