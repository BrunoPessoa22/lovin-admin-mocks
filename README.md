# Lovin Admin mockups

Two static mockups of the Lovin Malta admin, same screens and sample data, two design systems:

- `site/mock1/` Preline UI (Tailwind CSS v4 + Preline component classes and theme tokens) -> https://mock1.brunopessoa.com
- `site/mock2/` HeroUI v3 (`@heroui/styles` 3.2.4 compiled stylesheet + theme tokens) -> https://mock2.brunopessoa.com

`site/shared/data.js` holds the content, `site/shared/app.js` composes the sections from a
UI contract, and each `ui.js` implements that contract in its design system. Served by nginx
(`Dockerfile`, `nginx.conf`: the host picks the mock). Deployed through Coolify on push.

Local preview: `python3 -m http.server 8032 --directory site` then open `/mock1/` or `/mock2/`.
