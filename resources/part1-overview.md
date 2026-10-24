# Where AI fits in research administration: Part 1 overview

Nathan Layman, University of Idaho, AI4RA. NCURA Region VI/VII Regional Meeting, Denver, Sunday, November 8, 2026. The first ninety minutes of a three-hour workshop; after a break, Bert Baumgaertner, a philosopher, leads an hour on thinking well with AI.

**How to read this.** This is the plan for a talk, not a manual. Read it as someone deciding whether the talk works: does each part lead to the next, is each idea clear to a research administrator with no technical background, and is anything missing that the goals promise?

## Goals

By the end of the ninety minutes, someone in the room should:

1. Understand how a language model produces an answer, well enough to predict when it will be wrong: it picks the most likely next word, learned from a large library of human writing it was trained on.
2. Hold the distinction between recalled knowledge, what the model remembers from training, and accessed knowledge, what it reads from a source you hand it, and prefer accessed answers for anything that matters.
3. Know that how much and what context you give a model is the real skill of prompting, and have practiced it on a task from their own desk.
4. See that the data underneath matters more than which model you pick: structured versus unstructured data, what AI does well with text, the ways it goes wrong, and why a shared data model helps.
5. Keep accountability with a person: verify everyone's work, human or not, and know that a machine cannot be held accountable.
6. Leave with a way to judge their institution's AI guidance, sponsor AI rules to check, and three small things to try on Monday.

The thread through all of it is "augment, not replace": AI prepares, a person decides.

## Audience

Research administrators from universities in NCURA Regions VI and VII: pre-award and post-award staff, sponsored programs officers, research compliance staff, and some managers. Mixed experience with AI, from people who have never used a chatbot at work to people using one daily. Most are not technical. They bring laptops. Their work runs on federal regulations, sponsor terms and audits, so they are trained to be careful, and that caution is an asset.

## Format

About ninety minutes in seven blocks: three short opening slides, then Block 1 (how language models work, 15 minutes), Block 2 (memory and the record, 16), Block 3 (context and Promptulus, 17), Block 4 (the data underneath, 13), Block 5 (accountability and guidance, 9), Block 6 (start small, 7), Block 7 (Vandalizer, 10). There is one hands-on block (Promptulus, on attendees' laptops) and several live demos from the podium (the token builder, a pachinko board, Remembering Thamus, Data Crawler Carl, Vandalizer). The talk is allowed to run a little long.

## The interactive demos

A short review of each, as it stands.

- **Token builder** (slide 6). The presenter clicks the next word of a sentence while bars show how likely each choice was, and a chart shows every sentence that could have come out. It makes "picks the next likely word" visible. Risk: the attention weights and gradient descent sidebar add technical detail most of this audience does not need.
- **Pachinko board** (slide 7). A tall board of nails with five word bins. Balls fall from a funnel and pile up in bins; chips change the previous word, which moves the funnel; nails can be dragged sideways; "Shift the nails" rearranges them into a banana that sends most balls to "funded." It shows randomness, how context shifts the odds, and what training does, all on one screen. Risk: it carries three lessons at once, and the "Shift the nails" step needs the training slide that follows it to make sense.
- **Random number tally** (slide 9). The room asks a fresh chat for a random number and the presenter taps each answer into a bar chart. Nearly always a spike on 7. Strong and participatory. Risk: depends on the room having laptops or phones and calling answers out quickly.
- **Remembering Thamus** (slide 17). A separate web page, opened full screen. One compliance question, such as the de minimis rate, answered five ways by the same model: from memory, from pasted text, from a web search, from a vector index of the regulation, and from the regulation read live with a citation. The research administrator is framed as a quiz show contestant who gives an answer before any "lifeline." The memory answer is typically outdated; the live read is current and cited. Risk: needs the network and the workshop key; the presenter must cache the page before the session.
- **Data Crawler Carl** (slide 18). A separate web page. Upload a spreadsheet, ask in plain English, and see the database query the model wrote, the rows, and its narrative. Asked for federal funding by department on a sample awards table, it silently drops awards with a blank department. Risk: Carl's built-in sample is an unrelated salary table, so the presenter must upload the awards file; three prompts can run long.
- **Context window slider** (slide 20). A bar split into intent, information, instructions and conversation, with draggable handles, four presets, and hover tooltips. Clear and quick. Risk: low; it is explanatory rather than a task.
- **Promptulus** (slides 21 to 23). The only hands-on block. Attendees open a separate site on their laptops, pick one of nine coaching characters, and work a real task from their desk; each character rates their request and names one principle to fix. Eight minutes of work, then a debrief. Risk: getting a room of people onto a site with a key takes time, and the four challenges name four different characters, which can be a lot to follow.
- **Model quiz and aside** (slide 24). The room picks "the most important model" from a list; the answer is "your data model." A small button opens a popup on model bias with three documented cases. Risk: the popup is optional and could be skipped or could derail.
- **Vandalizer** (slides 44 to 46). Two podium demos on synthetic documents: extract an award notice with every value linked to its source, including asking for a field that is not there; and compare a budget, its justification and a research strategy for mismatches. Risk: these are the last slides, so they get cut first if time runs short, and the talk ends on a demo rather than a conclusion.

## Slide by slide

### Opening

1. **Title.** "Where AI fits in research administration," with the presenter's photo.
2. **The next ninety minutes.** The seven blocks and their minutes.
3. **Augment, not replace.** Three cards: use the output but check the work; keep people in the loop for decisions, signatures and PI conversations; let tools handle routine work so people have time for judgment. Callout: the question is not whether AI can do the work, but whether it helps you do it better, and how you know.
4. **Interactive open-source demos today.** Four cards: Promptulus, Remembering Thamus, Data Crawler Carl, and the Universal Data Model.

### Block 1. How language models work

5. **What we mean by AI.** Nested boxes: artificial intelligence, machine learning, deep learning, large language models. An LLM is trained on an enormous amount of text to predict the next word.
6. **Build a sentence one token at a time.** An interactive token builder: click the next word, watch the probabilities shift, see that the same prompt gives different output. A sidebar explains gradient descent.
7. **Drop a ball, get a word.** A pachinko board for "The proposal was ___." Balls fall from a funnel through nails into word bins. Chips change the word before the blank, which moves the funnel. A "Shift the nails" button rearranges the nails into a banana shape that sends most balls to "funded."
8. **How do we know where the nails should go?** Training in three steps: take a real sentence, hide the next word, nudge the nails toward the real word, billions of times. Callout: a big enough board makes a statistical machine that sounds like a person; it learns what is likely to be written, not what is true, and the training data is not a neutral choice.
9. **Pick a random number between 1 and 10.** Everyone opens a brand-new chat and asks; the presenter tallies the room's answers. Then: did it pick a random number, or one that sounds random?
10. **Three ways to pick a number.** Random, human and LLM distributions; the model's spike on 7.
11. **When "most likely" isn't good enough in research administration.** Asking for random and getting "most likely": audit samples, quality reviews, training quizzes. The fixes: use a real random function, or have the model run code and show it.
12. **You are asking a crowd of a thousand non-experts.** The mental model: well-read, no expertise, one confident voice, has read none of your files.
13. **When to ask the crowd, and when not to.** Ask the crowd: consensus facts, summarizing, drafting from a pattern, brainstorming, finding things. Not alone: niche or local knowledge, anything recent, novel claims, judgment calls, anything that must match twice.

### Block 2. What the model remembers, and what it reads

14. **Who here has worried that using AI will make us dumber?** A show of hands, then: is this a worry people have had before, or strictly modern?
15. **An ancient tale, written down by Plato 2,400 years ago.** King Thamus's verdict on the god Theuth's gift of writing, in full: writing will create forgetfulness and the appearance of wisdom without the reality. Callout: Thamus thought writing would weaken memory and reasoning; but writing helps you remember, and a fact you look up is one you can trust.
16. **Would you trust someone else's memory alone to answer a compliance question?** Then: do you ever have to look up the answer? If you would not trust a person's memory, why trust an AI's? The solution is to let AI look things up too, which is called context. An aside: agents are helpers that go look things up for the main model.
17. **Remembering Thamus.** The irony: we only know Thamus's story because Plato wrote it down. A link out to the Remembering Thamus page, which answers one compliance question five ways: memory, pasted text, web search, a vector index, and the regulation read live. Speaker notes carry the presenter's own hope and fear about AI and a handoff to Bert's hour.
18. **AI analyzes what you give it.** Live demo of Data Crawler Carl: asked for federal funding by department, it writes a correct query that silently drops awards with a blank department.
19. **Two kinds of knowing: recalled and accessed.** Recalled is frozen, blurred, and fills gaps confidently; this is where hallucination and hidden bias live. Accessed is current, citable, and checkable, with less room for training-data bias, though how much less is an open question.

### Block 3. Context: hands-on with Promptulus

20. **Your AI has a page limit.** What a context window is, and a slider showing four things that share it: intent, information, instructions, conversation, with presets and hover tooltips.
21. **The AI literacy companions.** What Promptulus is, and its nine coaching characters.
22. **Bring a task from your desk.** Eight minutes of hands-on challenges with four of the characters, and a link to open Promptulus.
23. **What did you notice?** Debrief questions, and the takeaway that prompting is the small part: deciding whether to use AI, giving it what it needs, and knowing how you will check it outlast any prompt trick.

### Block 4. The data underneath

24. **Which is the most important one?** A quiz listing AI model types, plus Claude, Gemini and Grok. A small "An aside" button opens a popup, "All models are biased," with three documented cases about Grok.
25. **Wrong!** The most important model is your data model.
26. **Structured and unstructured data.** Tables versus documents; most of an office's knowledge is in documents, most of its reporting needs tables.
27. **What AI does well with text.** Extraction, summarization, transformation, generation, classification and comparison, each with a research administration example.
28. **Four ways an answer goes wrong.** Hallucination is better called confabulation, and people do it too. Missed it, made it up, changed a detail, put it in the wrong place. Callout: people tend to trust models more than people; verify everyone's work and ask for sources.
29. **The IBM quote.** "A computer can never be held accountable; therefore a computer must never make a management decision." A machine cannot be held accountable. You are the authority.
30. **What is a data model?** A small diagram of award, sponsor, person and department, and the four parts: things, details, connections, rules.
31. **Why research administration needs a common language.** Same data, different names in every system; a shared model means map once, reuse everywhere. The AI4RA Unified Data Model is a draft; help evaluate it, with a QR code.
32. **Why the record needs one governed home.** Keep the raw sources, translate each source once, answer from the reconciled copy.
33. **Data sovereignty: where does the model run?** Cloud, local or hybrid, with a two-tier rule on personal keys and institutional accounts.

### Block 5. Accountability and guidance

34. **Four questions before you give a task to AI.** Can you give it everything it needs? Can you check the answer cheaply? Who is accountable? Does it have to be the same tomorrow?
35. **Does it matter how the work got done?** A continuum from process-critical to output-driven, with two test questions.
36. **Check the sponsor before you check the tool.** NSF, NIH (including no generative AI in peer review), and going up to a parent agency when a sponsor has no policy, with links.
37. **Your AI guidance is probably out of date.** A review of twenty institutions' policies against a 61-item checklist: the best covered 39; research and sponsored programs averaged 16 percent. Three kinds of guidance: physical, technical, behavioral. AI guidance is just data guidance.
38. **How strict should it be?** Five levels from principles to strict, with examples.
39. **Ten sections of a strong policy,** and the items that land on a research administrator's desk.
40. **Start the policy. One page.** Three people in a room, start from what you already have, and one page; check your policy against the ten sections and bring the gaps to leadership.

### Block 6. Start small

41. **Three small starts you can try Monday.** Prompts that ask the model to quote its source: a solicitation into a checklist, an award notice into setup notes, sponsor terms in plain language. None asks the model to do math.
42. **Where it saves a research administrator time this month.** Six examples, each naming what AI does and what the person does.
43. **Each rung needs the one below it.** A ladder from a prompt you keep up to a governed data layer; start at the bottom and write down the rung you can reach this month.

### Block 7. Vandalizer

44. **Vandalizer.** A document extraction and review platform where every value has a source.
45. **Extract an award notice.** A demo with three synthetic notices and challenges, including asking for a field that is not there.
46. **Catch the mismatch.** A demo comparing a budget, its justification and a research strategy.

The deck ends here; the break and Bert's hour follow.
