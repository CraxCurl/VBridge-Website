# VBridge-Website

![VBridge Logo](assets/app_icon.png)

**VBridge** is an ultra‑low latency audio relay system that streams crystal‑clear 48 kHz PCM audio from any Android phone to a Windows laptop (and Bluetooth earbuds) over Wi‑Fi. This repository hosts the **product landing page** for VBridge – a modern, high‑converting website built with a Moz‑style aesthetic.

---

## Table of Contents
- [Features](#features)
- [Live Demo](#live-demo)
- [Installation & Usage](#installation--usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [References](#references)

---

## Features
- **Sub‑millisecond latency** – under 4 ms round‑trip time via UDP streaming.
- **Full‑resolution PCM** – 48 kHz, 16‑bit, loss‑less audio.
- **Instant QR Pairing** – Pay‑style camera scanner for one‑tap connection.
- **Simultaneous Mixing** – Listen to PC and phone audio on the same Bluetooth earbuds.
- **Zero‑cloud** – Peer‑to‑peer on the local network; no data leaves your room.
- **Cross‑platform** – Windows 10/11 installer, portable binary, and Android APK.

---

## Live Demo
You can view the deployed website at: **https://github.com/CraxCurl/VBridge-Website** (GitHub Pages) or run it locally:
```bash
# From the repository root
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

---

## Installation & Usage
The website provides direct download links for the three VBridge binaries:
| Platform | File | Size |
|---|---|---|
| **Windows Installer** | `downloads/VBridge-Setup.exe` | 54.7 MB |
| **Windows Portable** | `downloads/VBridge.exe` | 28.1 MB |
| **Android APK** | `downloads/VBridge.apk` | 13.8 MB |

All files are served from the `/downloads` folder and are **100 % static** – no server‑side processing required.

---

## Development
The site uses plain HTML, vanilla CSS, and JavaScript. No build tools are required, but the following folder structure is enforced:
```
VBridge-Website/
├─ assets/          # Images, icons, favicons
├─ css/            # style.css (custom design system)
├─ js/             # main.js (interactive UI)
├─ downloads/      # Binary artefacts (excluded via .gitignore)
├─ .gitignore      # Excludes OS files, builds, IDE configs, and /downloads
└─ README.md
```
To modify the design, edit `css/style.css`. UI logic resides in `js/main.js`.

---

## Contributing
Feel free to open issues or submit pull requests. Please follow these guidelines:
1. Fork the repository and create a feature branch.
2. Keep the design consistent with the existing **Moz‑style** palette.
3. Run `npm run lint` (if you add any tooling) before submitting.
4. Ensure the website builds and functions locally (`python -m http.server`).

---

## License
This website is released under the **MIT License** – see the [LICENSE](https://github.com/CraxCurl/VBridge-Website/blob/main/LICENSE) file for details.

---

## References
- Main VBridge project repository: <https://github.com/CraxCurl/VBridge>
- Original source code location on this machine: `C:\Users\vinay\Desktop\git-reps\VBridge`
- Design inspiration: <https://moz.com/> (Moz‑style dark theme, gradient accents, interactive components).

---

*Built with love for low‑latency audio enthusiasts.*
