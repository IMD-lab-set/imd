# imd

This workspace contains the IMD TN Weather Station Portal.

Google Maps integration
- Copy `website-clone/gmaps-config.example.json` to `website-clone/gmaps-config.json` and set your Google Maps API key under `API_KEY`.
- The site includes `website-clone/assets/google-maps-init.js` which will load the Maps JS API and wire basic station and tour interactions.

Notes
- The repository currently serves a compiled React bundle in `website-clone/assets/index-QAA-JWSu.js`. The Google Maps integration is added as a progressive enhancement that watches for the station popup and tour form.

Security
- Do not commit your real API key to the repo. Use the example config and add `website-clone/gmaps-config.json` to `.gitignore` if needed.

Hosting (GitHub Pages)
- This repository includes a GitHub Actions workflow that will publish the `website-clone` folder to the `gh-pages` branch whenever `main` is pushed: `.github/workflows/deploy-gh-pages.yml`.
- After you push `main` to GitHub, the site will be available at: `https://<GITHUB_OWNER>.github.io/<REPO_NAME>/` (example: `https://IMD-lab-set.github.io/imd/`).

Notes about secrets
- The workflow uses the built-in `GITHUB_TOKEN` so no extra secrets are required for standard Pages deployment.
- Ensure `website-clone/gmaps-config.json` is added locally (not committed) with your Maps API key so the site can load Maps at runtime.

