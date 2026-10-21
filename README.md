# Augmenting Research Administration with AI

**Workshop, NCURA Region VI/VII Regional Meeting (RM26)**
Sunday, November 8, 2026 · Denver, Colorado · Three hours · Room TBA

Live site: <https://ui-insight.github.io/NCURARegionalWorkshop2026/>

NARC (Narrative Augmented Reasoning Challenges): <https://narc.insight.uidaho.edu/>

## Presenters

| Presenter | Affiliation | Role |
|-----------|-------------|------|
| Nathan Layman | University of Idaho, Data Scientist | Lead presenter |
| Bert Baumgaertner | University of Idaho, Department of Philosophy | Co-presenter |

## Abstract

Artificial intelligence is reshaping research administration, but the value of any AI tool is bounded by the quality of the data underneath it. It is also bounded by the nature of the work itself. Research administration runs on ethical judgment, regulatory interpretation, and human relationships, much of which cannot be automated.

This workshop helps research administration professionals develop a practical understanding of where AI can support their work and where it cannot. The workshop will begin with an overview of modern AI systems, including how large language models generate output, the tasks they perform well, and the ways they fail. It will then examine which research administration activities benefit from AI assistance, which depend on institutional data infrastructure, and which should remain primarily human-driven.

Participants will gain hands-on experience with open-source tools developed through the AI4RA project, including a prompt engineering trainer, a document extraction and review workflow, and a data lakehouse architecture used to prepare institutional data for AI applications. By the end of the workshop, participants will have a practical mental model for evaluating AI-generated output, understanding institutional data readiness, and identifying appropriate patterns for verification and oversight before relying on AI-assisted results.

## Learning objectives

1. Explain how large language models generate output, which tasks they perform well, and the ways they fail.
2. Distinguish research administration activities that benefit from AI assistance, those that depend on institutional data infrastructure, and those that should remain human-driven.
3. Use open-source AI4RA tools hands-on: a prompt engineering trainer, a document extraction and review workflow, and a data lakehouse architecture.
4. Evaluate AI-generated output and judge institutional data readiness before relying on AI-assisted results.
5. Identify appropriate patterns for verification and human oversight.
6. Lead a structured ethical discussion about AI use that can be taken back to your own institution.

## Session plan

| Time | Part | Presenter |
|------|------|-----------|
| 0:00 – 1:30 | Where AI fits in research administration: how LLMs work, where they fail, and hands-on with Promptulus, Vandalizer, and the data lakehouse | Nathan Layman |
| 1:30 – 1:40 | Break | |
| 1:40 – 2:40 | Thinking well with AI: an ethical discussion mini-workshop and the [NARC](https://narc.insight.uidaho.edu/) reasoning puzzles | Bert Baumgaertner |
| 2:40 – 3:00 | Open discussion and take-home plan | Both |

### NARC — Narrate

The [Narrate](https://narc.insight.uidaho.edu/narrate) tab on the NARC site is an invitation-only research study where participants write the story that lets an AI model solve a reasoning puzzle. Participants enter an invite code from their invitation (everyone invited through the same event or mailing uses the same code), write a narrative, test it against a model, and revise — typically 20 to 90 minutes per puzzle. Adults 18 or older; no account or email required. Narrate data are stored in a separate database readable only by the principal investigator.

Bert plans to use an invite code for workshop participants, so the workshop group's Narrate submissions are traceable to the event.

Bert's deck is drafted at `docs/slides-thinking-well.html` (press `S` for speaker notes). Nathan's deck is still to be built. Track work in GitHub issues.

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
- [x] Bert: add bio, email, and photo to `docs/presenters.html` and `docs/img/presenters/` (#1)
- [ ] Nathan: build the 90-minute deck from the REACH material
- [x] Bert: draft the 60-minute deck, `docs/slides-thinking-well.html` (NARC puzzles, Narrate, arguments by analogy, a workshop in miniature)
- [x] Shareable discussion instrument: `docs/instrument.html`, with `docs/files/ai4ra-discussion-instrument.pdf` (printed from that page) and `.docx` (built from `resources/discussion-instrument.md` with pandoc). Keep the three in sync.
- [ ] Bert: review the deck and speaker notes
- [ ] Bert: create the Narrate invite code `NCURA2026` on the NARC server, valid through November 30, 2026 (the slides advertise it)
- [ ] Link Bert's [NARC](https://narc.insight.uidaho.edu/) activity from Resources once it is cleared for public use
- [ ] Confirm room, time, and A/V with NCURA program contacts

## License

Content is released under [CC BY-NC-SA 4.0](LICENSE).
