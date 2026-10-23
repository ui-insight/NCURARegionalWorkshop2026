# CLAUDE.md, NCURARegionalWorkshop2026

## Project

This is the companion site for the NCURA Region VI/VII Regional Meeting 2026 workshop: **Augmenting Research Administration with AI** (Sunday, November 8, 2026, Denver, Colorado, three hours). Presenters are Nathan Layman and Bert Baumgaertner, both University of Idaho.

## Before you start

1. **Pull first.** Always run `git pull` before starting work. This repo has multiple contributors and CLAUDE.md itself may have been updated.
2. **Review open issues.** Run `gh issue list --state open` and read them before making changes. Issues track what's done, what's in progress, and what's been decided.
3. **Check remote branches.** Run `git fetch --all` and review any branches ahead of main before starting new work, to avoid conflicts or duplicating effort.
4. **Coordinate.** Review open branches and issues before making independent changes.

## Repo boundaries

- You may edit code in **this repo only** (NCURARegionalWorkshop2026).
- Sibling repos (REACHWorkshop2026, ai-literacy, promptulus, vandalizer, etc.) are **read-only for context**. If changes are needed in those repos, raise a GitHub issue instead.

## Repo layout

- `docs/` is the GitHub Pages source (all site HTML, CSS, JS, images, Reveal.js)
- `resources/` holds reference materials not served by the site
- Root holds only CLAUDE.md, README.md, LICENSE (Apache 2.0, code), LICENSE-CONTENT.md (CC BY 4.0, content), NOTICE, .gitignore

## Writing style

- Never use em dashes. Use commas, periods, or "and" instead.

## Local preview

```bash
python3 -m http.server 4173 -d docs
```
