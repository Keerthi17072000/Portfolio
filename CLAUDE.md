# CLAUDE.md — Personal Portfolio (permanent instructions)

This file is the standing instruction manual for Claude Code in this repository. Follow it every session.
It supersedes the older "feature branch + PR for every task" rule: the owner's current workflow is **commit locally → report → ask approval → push to `main`** (see §8).

---

## 1. Project facts (verified from the repo, not assumed)

| Item | Value |
|---|---|
| Project | Personal portfolio website of Keerthivasan R |
| Owner GitHub user | `Keerthi17072000` |
| Repo | https://github.com/Keerthi17072000/Portfolio (`origin`, HTTPS) |
| Primary branch | `main` |
| OS / env | Ubuntu Linux, Node 22 / npm 10 |
| Stack | React 19 + TypeScript + Vite 8, GSAP 3 + ScrollTrigger + `@gsap/react`, Lenis smooth scroll |
| Package manager | **npm** (`package-lock.json` is the lockfile; use `npm ci`/`npm install`, never yarn/pnpm) |
| Styling | Plain CSS in `src/styles/index.css` (design tokens in `:root`); no CSS framework |
| Deployment | GitHub Pages via GitHub Actions — **not yet configured** (see §9) |
| Tests | **None configured** (no test runner, no `test` script) |
| Lint | ESLint flat config (`eslint.config.js`, ignores `dist` and `legacy-static`) |
| Docs | `LEARN.md` = learning guide for the owner; `README.md` is currently just a title |

Scripts (`package.json`): `npm run dev` · `npm run build` (= `tsc -b && vite build`) · `npm run lint` · `npm run preview`.

### Architecture
```
index.html                 Vite entry, loads /src/main.tsx
src/main.tsx               registers GSAP plugins, imports CSS, mounts <App/>
src/App.tsx                `ready` state, Lenis, composes all sections
src/data/portfolio.ts      ALL resume/content data (edit text here, not in components)
src/types.ts               shared interfaces
src/lib/gsap.ts            single place that registers GSAP plugins; import gsap/ScrollTrigger/useGSAP from here
src/lib/scroller.ts        shared Lenis instance + scrollToTarget()
src/hooks/                 useLenis, useMagnetic
src/components/            Loader, Nav, Cursor, ProgressBar, Counter, SplitText, MagneticLink
src/sections/              Hero, Marquee, About, Skills, Work, Experience, Education, Contact
src/styles/index.css       all styles
legacy-static/            original plain HTML/CSS/JS version, kept for reference; do not edit or delete
```

### Known current gaps (report, don't silently "fix" without being asked)
- `vite.config.ts` has **no `base`**. For GitHub Pages project sites (`/Portfolio/`) the build needs `base: '/Portfolio/'`; without it the deployed site will 404 on assets. Changing it is part of deployment setup and needs explanation + approval (§9).
- `.gitignore` does not yet list `.env*`. Add `.env`, `.env.*` (keep `!.env.example`) when touching it, and tell the owner.
- No `.github/workflows/`, no tests, README is a stub.
- Local repo git `user.name` is `Keerthivasan`; the owner's expected name is `Keerthi17072000`. Email is correct. Don't change it without asking.

---

## 2. Development rules

- Understand the existing architecture first; reuse existing components, hooks, `src/data/portfolio.ts` and conventions.
- Functional components + hooks only. TypeScript strict (no `any` unless unavoidable and commented).
- Content changes go in `src/data/portfolio.ts` (typed in `src/types.ts`); components stay presentational.
- Animations: create them inside `useGSAP(..., { scope })` so they are cleaned up (StrictMode-safe). Import GSAP only from `src/lib/gsap.ts`. Don't drive scroll animations through React state.
- No unnecessary dependencies. No duplicate code. No unrelated refactors or "drive-by" optimizations.
- Keep it responsive (desktop, tablet, phone), accessible (semantic HTML, alt text, keyboard focus, sufficient contrast, `prefers-reduced-motion` respected), and fast.
- Don't remove existing features or overwrite unrelated user changes. Never touch `legacy-static/` unless asked.
- Explain important architectural changes in the report.
- Comments only where the *why* is non-obvious (the owner is learning; if you add a new concept, add a short explanation to `LEARN.md` when it is relevant to the task).

### UI / performance requests
Avoid unnecessary re-renders, avoid layout shift, optimize images/assets (modern formats, explicit dimensions, lazy loading below the fold), keep JS and CSS lean, keep animations on `transform`/`opacity`, keep mobile performance and Core Web Vitals in mind. Don't make unrelated optimizations.

---

## 3. Task workflow (every development request)

1. Understand the requirement (ask only if genuinely ambiguous).
2. Inspect the relevant files; identify dependencies and impact.
3. Plan — for simple changes keep this to a sentence; don't add overhead.
4. Implement.
5. Review your own code.
6. Validate (§4). Do not stop after writing code.
7. Review the full Git diff, then commit (§6), then report (§7) and ask for push approval (§8).

## 4. Validation checklist (after every task)

Run what exists, in this order, and report real results:
1. `npx tsc -b` (TypeScript errors, broken imports, missing deps)
2. `npm run lint`
3. Tests: **none exist currently — say so; never claim tests passed if none ran.** If a test script is added later, run it.
4. `npm run build` (production build; also check output size/warnings)
5. `git diff --check` (whitespace errors)
6. Browser check where practical: start `npm run dev` (or `npm run preview`), load the page, confirm no console errors, check desktop and ~375px mobile widths, check any section you changed. Reset any emulated viewport afterwards.
7. Look for unused/broken code in the files you changed.

If something fails: find the root cause → fix → re-run the failed check → report anything unresolved honestly. Never hide errors, loosen lint/TS rules, or disable checks to make a build pass.

---

## 5. Security rules (mandatory)

- Never expose, print, store, log or hardcode GitHub tokens, API keys, passwords or secrets — not in commands, scripts, files, commits, or chat.
- Use the existing credential mechanism (HTTPS with the owner's GitHub token via `gh`/git credential helper). Never ask the owner to paste a token into the conversation.
- If auth fails: explain the problem and ask the owner to authenticate securely in their own terminal (e.g. `gh auth login`); then retry.
- Never commit `.env*`, keys, credentials. Scan the staged diff for secrets before every commit.
- Don't change **global** git config. Repo-level config only.
- Never force-push, rewrite or overwrite remote history, delete branches, or run other destructive commands without explaining the impact and getting explicit approval.
- Never bypass Claude Code permission controls.
- Never push to an office/other repository.

Credential note (observed): there is no git credential helper configured; pushes have worked by passing `-c credential.helper='!gh auth git-credential'` on that single command (no config change, no token in the command). Use that form if a plain `git push` prompts for a username, and use `GIT_TERMINAL_PROMPT=0` so it fails instead of hanging.

---

## 6. Git rules

**Expected:** remote `origin` = `https://github.com/Keerthi17072000/Portfolio.git`; branch `main`; identity email `keerthivasan17072000@gmail.com`.

Before **every** Git operation check and state: current directory, `git status`, current branch, `git remote -v`, local identity (`git config user.name` / `user.email`). Verify `origin` is the personal repo above. If anything differs, stop and tell the owner.

After development:
1. `git status`; inspect `git diff`; review new, modified and deleted files.
2. Check for accidental changes and for sensitive data.
3. Stage **only** files relevant to the task (named paths, never blind `git add -A`). Don't stage unrelated user modifications.
4. Commit after validation with a meaningful Conventional-Commit message: `feat: …`, `fix: …`, `perf: …`, `style: …`, `refactor: …`, `docs: …`, `chore: …`. Never "changes"/"updates".
5. Commit trailer (required by this environment): `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

Branch policy: the owner's workflow pushes to `main` after approval. If an unmerged feature branch/PR exists (currently `feature/react-portfolio`, PR #1 into `main`), tell the owner before pushing to `main` and let them decide (merge the PR, or push on the current branch). Don't merge PRs without approval.

---

## 7. Report format (after every task)

```
DEVELOPMENT SUMMARY   what was implemented / fixed / key technical decisions
FILES CHANGED         created · modified · deleted
TESTING               tests run + results · lint results · build results (state "no tests configured" if so)
GIT                   branch · git status · commit message · commit hash · push status
DEPLOYMENT            Actions status · Pages status · live URL (only when verified)
NEXT ACTION           remaining problems; push approval request if needed
```
The pre-push report must also include: git diff summary, target repository, and deployment impact.

---

## 8. Push approval gate (mandatory)

I may commit automatically, but **I never run `git push` without the owner's explicit approval for that specific commit.**

After development, validation and committing, show the report (§7) and ask exactly:

> **Development and validation are complete. Do you approve pushing this commit to your personal GitHub repository?**

Then WAIT. After approval:
1. Re-verify branch (expected `main`, or the branch the owner approved) and that `origin` is the personal repo.
2. Run `git push origin <branch>` (never `--force`, never overwrite remote history); verify the result with `git ls-remote`/`git status`.
3. Report the commit hash and the repo URL.

Pushes to `main` that trigger deployment need approval **before** pushing, and the approval request must state the deployment impact.

---

## 9. Deployment — GitHub Pages (via GitHub Actions)

Status: **not configured** (no `.github/workflows/`, no Vite `base`). Do not claim anything is deployed until verified.

Inspect before changing: `vite.config.ts` `base`, repo name (`Portfolio` → site URL `https://keerthi17072000.github.io/Portfolio/`), existing workflows, build output dir (`dist`), Pages settings (Source must be "GitHub Actions"), workflow permissions.

When asked to set it up, prepare `.github/workflows/deploy.yml` that:
1. Triggers on push to `main` (and `workflow_dispatch`).
2. `actions/checkout`, `actions/setup-node` (Node 22, npm cache), `npm ci`.
3. `npm run lint` and `npm run build` — **the deploy job must not run if they fail**.
4. `actions/configure-pages` → `actions/upload-pages-artifact` (path `dist`) → `actions/deploy-pages`.
5. Minimal permissions: `contents: read`, `pages: write`, `id-token: write`; a `concurrency` group so deploys don't overlap; pin to current supported major versions of official actions (verify the versions rather than guessing).
Also set `base: '/Portfolio/'` in `vite.config.ts` (explain the impact: asset URLs become `/Portfolio/...`; local dev/preview still work).

Rules:
- Never change an existing workflow without explaining the impact.
- Changing GitHub Actions permissions, repo Pages settings, or other sensitive configuration requires approval (the owner enables Pages → "GitHub Actions" in repo Settings if I can't).
- After an approved push: check the run with `gh run list/view`, confirm the Pages deployment succeeded, fetch the live URL and confirm it loads. Report "deployed" only after that verification; otherwise report the actual status.
- Never deploy an unsuccessful build.

---

## 10. Permissions summary

**May do without asking:** read files; create/modify source files; run dev server, lint, type-check, build, tests; inspect git status/diff; stage and commit validated changes; install clearly necessary dependencies with the normal Claude Code permission prompt.

**Must ask first:** `git push` (always); deployment-triggering operations outside the approved workflow; destructive Git operations; removing important files; changing remotes/ownership; changing GitHub Actions permissions or Pages settings; touching sensitive configuration; adding a heavy or unnecessary dependency.

---

## 11. Typical use

1. Owner gives a prompt, e.g. "Add a testimonials section" or "Fix the mobile nav".
2. Claude analyzes, implements, validates (§4), reviews the diff, commits (§6).
3. Claude shows the report (§7) and asks the approval question (§8).
4. Owner replies "approved" (or requests changes).
5. Claude pushes, then (once deployment is configured) verifies the Actions run and the live site.
