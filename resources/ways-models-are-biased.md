# Ways models can be biased

Backup list for the bias slides in `docs/slides-where-ai-fits.html` (the mirror slide and the CoBBLEr radar). Grouped to match the mirror slide's four steps: recorded by us, selected by its makers, learned in training, reinforced by tuning.

## From what we wrote (recorded and selected)

- **Stereotypes.** Gender, race, age, names. Bloomberg's 2024 GPT résumé test; the CEO and flight attendant image example.
- **Dialect and language.** Standard written English reads as more competent (Hofmann et al., Nature 2024). Non-native writers and non-English sources are underrepresented.
- **Prestige.** Big-name institutions, famous authors and well-known journals sound more credible ("Prestige over merit," arXiv 2509.15122).
- **Popularity.** What is written about most looks most true. NIH and NSF rules are everywhere, a small foundation's terms hardly at all, so the model fills gaps with the federal default.
- **A US and Western default.** Assumes US regulations, fiscal years and norms unless told otherwise.
- **A fixed point in time.** Treats the world at its training cutoff as current: revised rules, new rates, changed policies.

## From tuning (reinforced)

- **Sycophancy.** Agrees with you. "This cost is allowable, right?" leans yes.
- **Overconfidence.** Sounds equally sure whether right or wrong.
- **Positivity.** Praises drafts and finds strengths more readily than weaknesses (Thorne et al., arXiv 2603.08281, grant review).
- **Length.** Longer answers get rated higher, so it writes long and favors long.
- **Overcorrection.** Fixes for one bias create new ones, like image models that over-diversified.

## From how you ask (the prompt)

- **Position.** Favors the first or last option in a list (CoBBLEr).
- **Anchoring.** An example in the prompt pulls every answer toward it.
- **Framing.** "Is this compliant?" and "What's wrong with this?" get different answers about the same document.
- **Bandwagon.** "Most reviewers liked this one" sways it (CoBBLEr).

## From who built it (selected)

- **The company's interests.** What it will and won't discuss, and how it is told to frame topics (the Grok aside on the model quiz).

## Most relevant to research administrators

Sycophancy, the fixed point in time, and the federal default. They show up in everyday use, not only in grant review or hiring.

## Sources

- Koo et al., CoBBLEr, ACL 2024: https://arxiv.org/abs/2309.17012
- Hofmann et al., dialect prejudice, Nature 2024: https://arxiv.org/abs/2403.00742
- Bai et al., explicitly unbiased LLMs still form biased associations, PNAS 2025: https://cocosci.princeton.edu/papers/bai2025.pdf
- Prestige over merit, LLM peer review audit: https://arxiv.org/abs/2509.15122
- Bloomberg, GPT résumé ranking, 2024: https://prod.cm.bloomberg.com/graphics/2024-openai-gpt-hiring-racial-discrimination/
- Thorne et al., LLM grant proposal review, 2026: https://arxiv.org/abs/2603.08281
- Zheng et al., Judging LLM-as-a-Judge (MT-Bench), NeurIPS 2023: https://arxiv.org/abs/2306.05685
