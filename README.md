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
| 0:00 – 1:30 | Where AI fits in research administration: how LLMs work, where they fail, hands-on with Promptulus and Vandalizer, a live Data Crawler Carl demo, and the data lakehouse | Nathan Layman |
| 1:30 – 1:40 | Break | |
| 1:40 – 2:40 | Thinking well with AI: an ethical discussion mini-workshop and the [NARC](https://narc.insight.uidaho.edu/) reasoning puzzles | Bert Baumgaertner |
| 2:40 – 3:00 | Open discussion and take-home plan | Both |

### NARC — Narrate

The [Narrate](https://narc.insight.uidaho.edu/narrate) tab on the NARC site is an invitation-only research study where participants write the story that lets an AI model solve a reasoning puzzle. Participants enter an invite code from their invitation (everyone invited through the same event or mailing uses the same code), write a narrative, test it against a model, and revise — typically 20 to 90 minutes per puzzle. Adults 18 or older; no account or email required. Narrate data are stored in a separate database readable only by the principal investigator.

Bert plans to use an invite code for workshop participants, so the workshop group's Narrate submissions are traceable to the event.

Both decks are drafted: `docs/slides-where-ai-fits.html` (Nathan, Part 1) and `docs/slides-thinking-well.html` (Bert, Part 2). Press `S` in either for speaker notes. Track work in GitHub issues.

## Repo layout

- `docs/` is the GitHub Pages source (site HTML, CSS, JS, images, Reveal.js decks).
- `resources/` holds reference materials not served by the site (abstract, planning notes).
- Root holds only CLAUDE.md, README.md, LICENSE, and .gitignore.

Site structure and styling are carried over from [ui-insight/REACHWorkshop2026](https://github.com/ui-insight/REACHWorkshop2026).

## Local preview

```bash
python3 -m http.server 4173 -d docs
```

### Workshop key for Promptulus

Same mechanism as REACH 2026, with a University of Idaho MindRouter key in place of a Gemini key. The key is workshop-scoped and sits in two places in this repo: the QR image and the `WORKSHOP_KEY_LINK` constant in `docs/index.html`. Rotate it on MindRouter after Denver.

1. The QR code, `docs/img/workshop_QR_code.png`, encodes this site's address with `?key=mr2_...` appended. The modal's clickable link (`WORKSHOP_KEY_LINK`) is the same URL, for laptop users who cannot scan. After the key is rotated both still open the site, but Promptulus will reject the old token until a new one is pasted in the home page modal.
2. `docs/app.js` reads `?key=` on any page, stores it in tab-scoped sessionStorage, and strips it from the address bar.
3. `docs/js/key-manager.js` appends the stored key to every Promptulus link at click time. Promptulus fills its key box on load and routes `mr2_` keys to MindRouter with nothing else to set.
4. The home page has an "Enable interactive activities" button that opens the key modal (QR code, keyed link, paste box) and an "Expand for audience" view for projecting. Every page shows a badge saying whether the key is loaded in this tab, and a toast confirms it the moment it arrives via the URL.

Rotate the key on MindRouter after the workshop.

### Localizing Part 1 assets

`docs/slides-where-ai-fits.html` currently points at images and sample documents hosted on the REACH workshop site (`https://ui-insight.github.io/REACHWorkshop2026/`). To serve them from this repo instead, copy them from the sibling checkout and strip the prefix:

```bash
R=../REACHWorkshop2026/docs
mkdir -p docs/img/promptulus docs/img/diagrams
cp $R/img/promptulus/*.png docs/img/promptulus/
cp $R/img/logos/vandalizer.png $R/img/logos/data-lake.svg docs/img/logos/
cp $R/img/diagrams/gradient_descent.png $R/img/diagrams/data-model.png docs/img/diagrams/
cp $R/files/nsf_award_notice_*.pdf $R/files/fbu_* docs/files/
sed -i '' 's#https://ui-insight.github.io/REACHWorkshop2026/##g' docs/slides-where-ai-fits.html
```

The gradient descent image is used by the token builder's sidebar in `docs/slides-interactive.js`, which already expects it at `img/diagrams/gradient_descent.png`.

## Status

- [x] Workshop accepted by NCURA Region VI/VII
- [x] Presenter lineup and session split (90 min Nathan, 60 min Bert, 30 min break and discussion)
- [x] Bert: add bio, email, and photo to `docs/presenters.html` and `docs/img/presenters/` (#1)
- [x] Nathan: draft the 90-minute deck, `docs/slides-where-ai-fits.html` (how LLMs work and fail, Promptulus and Vandalizer hands-on, sorting the work, the data underneath)
- [ ] Nathan: localize deck assets now hosted on the REACH site (Promptulus mascots, Vandalizer logo, data-model diagram, sample PDFs). See the note under Local preview.
- [x] Nathan: mint the MindRouter key and the QR code (`docs/img/workshop_QR_code.png`)
- [ ] Nathan: rotate the MindRouter key after Denver
- [ ] Nathan: arrange Vandalizer workshop logins for the hands-on block
- [ ] Nathan: update [data-crawler-carl](https://github.com/ui-insight/data-crawler-carl) to route `mr2_` keys to MindRouter the way Promptulus's `api.js` does (it currently sends every key to Google Gemini), so the live demo on the awards-table slide works with the workshop key
- [x] Bert: draft the 60-minute deck, `docs/slides-thinking-well.html` (NARC puzzles, Narrate, arguments by analogy, a workshop in miniature)
- [x] Shareable discussion instrument: `docs/instrument.html`, with `docs/files/ai4ra-discussion-instrument.pdf` (printed from that page) and `.docx` (built from `resources/discussion-instrument.md` with pandoc). Keep the three in sync.
- [ ] Bert: review the deck and speaker notes
- [ ] Bert: create the Narrate invite code `NCURA2026` on the NARC server, valid through November 30, 2026 (the slides advertise it)
- [ ] Link Bert's [NARC](https://narc.insight.uidaho.edu/) activity from Resources once it is cleared for public use
- [ ] Confirm room, time, and A/V with NCURA program contacts

## License

Content is released under [CC BY-NC-SA 4.0](LICENSE).
