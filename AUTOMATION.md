# Development workflow

Canonical automation for agents and humans. Also mirrored globally in `~/.cursor/rules/dev-deploy-workflow.mdc`.

---

## Dev server

If not already running on port 3000 for this project:

```bash
npm run dev
```

- URL: http://localhost:3000
- If port 3000 is busy **for this repo**, use the existing server — do not start duplicates.

---

## After implementation (auto-deploy)

**Always** run at the end of agent work (unless the user says not to push):

```bash
npm run deploy
```

Equivalent to `git add .` → `git commit -m "changed practice data format"` → `git push`. Vercel deploys from `main`.

**Cursor hook:** `.cursor/hooks.json` runs the same deploy on agent `stop` (each completed run).

**Agent rule:** `.cursor/rules/auto-deploy.mdc` (`alwaysApply: true`).

---

## Checks before push

- No secrets in staged files (`.env`, `.env.local`).
- `npm run build` passes if the change is non-trivial.
- Test `POST /api/generate` with sample `workingOn` if generator or API changed.

---

## One-shot script (Windows)

```powershell
& "$env:USERPROFILE\.cursor\scripts\dev-and-deploy.ps1" -ProjectPath "C:\path\to\tiktok-hook-generator"
```
