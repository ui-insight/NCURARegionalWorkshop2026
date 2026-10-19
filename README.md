# Augmenting Research Administration with AI

**Workshop, NCURA Region VI/VII Regional Meeting (RM26)**
Sunday, November 8, 2026 · Denver, Colorado · Three hours · Room TBA

Live site: <https://ui-insight.github.io/NCURARegionalWorkshop2026/>

## Presenters

| Presenter | Affiliation | Role |
|-----------|-------------|------|
| Nathan Layman | University of Idaho, Data Scientist | Lead presenter |
| Bert Baumgaertner | University of Idaho, Department of Philosophy | Co-presenter |

## Abstract

This three-hour workshop introduces research administration professionals to foundational AI concepts and terminology, including agentic AI, generative models, and workflow automation. Participants will gain a clear understanding of how AI works, its limitations, and the complementary role it can play in research administration.

The session provides practical guidance on selecting appropriate AI models, breaking complex tasks into manageable components, and identifying areas where AI and automation can add value. Participants learn techniques for designing high-quality prompts, evaluating AI outputs for accuracy and reliability, and applying advanced strategies such as iterative refinement.

Ethical considerations including transparency, accountability, and reproducibility are explored through interactive discussions. Participants actively engage in examining institutional policies, governance, and risk management strategies for AI-assisted workflows, applying these concepts to real-world scenarios and their own work contexts.

By the end of the session, research administrators will have foundational skills to responsibly use AI in their workflows, enhancing efficiency and supporting informed decision-making while maintaining human oversight.

## Learning objectives

1. Explain foundational AI concepts and terminology relevant to research administration.
2. Identify tasks and workflows in research administration where AI and automation can add value.
3. Select appropriate AI models and break complex tasks into manageable components.
4. Design effective and accurate prompts for specific administrative tasks.
5. Evaluate AI outputs for accuracy, reliability, and appropriateness, and apply iterative refinement.
6. Discuss and address ethical, transparency, and governance considerations in AI-assisted workflows.

## Session plan

| Time | Part | Presenter |
|------|------|-----------|
| 0:00 – 1:30 | Augmenting research administration with AI (the AI4RA pitch, expanded, with hands-on prompting and evaluation) | Nathan Layman |
| 1:30 – 1:40 | Break | |
| 1:40 – 2:40 | Thinking well with AI: ethics and the MARC puzzles | Bert Baumgaertner |
| 2:40 – 3:00 | Open discussion and take-home plan | Both |

Slide decks and activities are still to be built. Track them in GitHub issues.

## Repo layout

- `docs/` is the GitHub Pages source (site HTML, CSS, JS, images, Reveal.js decks).
- `resources/` holds reference materials not served by the site (abstract, planning notes).
- Root holds only CLAUDE.md, README.md, LICENSE, and .gitignore.

Site structure and styling are carried over from [ui-insight/REACHWorkshop2026](https://github.com/ui-insight/REACHWorkshop2026).

## Local preview

```bash
python3 -m http.server 4173 -d docs
```

## Status

- [x] Workshop accepted by NCURA Region VI/VII
- [x] Presenter lineup and session split (90 min Nathan, 60 min Bert, 30 min break and discussion)
- [ ] Bert: add bio, email, and photo to `docs/presenters.html` and `docs/img/presenters/`
- [ ] Nathan: build the 90-minute deck from the REACH material
- [ ] Bert: build the 60-minute ethics and MARC deck and puzzle activity
- [ ] Decide on the hands-on activity platform and link it from Resources
- [ ] Confirm room, time, and A/V with NCURA program contacts

## License

Content is released under [CC BY-NC-SA 4.0](LICENSE).
