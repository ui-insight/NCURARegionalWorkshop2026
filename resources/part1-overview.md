# Where AI fits in research administration: Part 1 overview

Nathan Layman, University of Idaho, AI4RA. NCURA Region VI/VII Regional Meeting, Denver, Sunday, November 8, 2026. The first ninety minutes of a three-hour workshop; after a break, Bert Baumgaertner, a philosopher, leads an hour on thinking well with AI. Nathan presents Part 1 alone.

**How to read this.** This is the plan for a talk, not a manual. Read it as someone deciding whether the talk works: does each part lead to the next, is each idea clear to a research administrator with no technical background, and is anything missing that the goals promise? Timing is planned separately and is left out on purpose; this document covers order and content only.

## Goals

By the end of the ninety minutes, someone in the room should:

1. Understand how a language model produces an answer, well enough to predict when it will be wrong: it picks the most likely next word, learned from a large library of human writing it was trained on.
2. Hold the distinction between recalled knowledge, what the model remembers from training, and accessed knowledge, what it reads from a source you hand it, and prefer accessed answers for anything that matters.
3. Know that how much and what context you give a model is the real skill of prompting, and have practiced it on a task from their own desk.
4. See that the data underneath matters more than which model you pick: structured versus unstructured data, what AI does well with text, and why a shared data model helps.
5. Keep accountability with a person: know the four ways AI output goes wrong, verify everyone's work, human or not, and know that a machine cannot be held accountable.
6. Leave with a way to judge their institution's AI guidance, sponsor AI rules to check, a place to keep sharing what they find, and three small things to try on Monday.

**Which goals matter most:** 2 (recalled versus accessed) and 5 (a person stays accountable) are the ideas an attendee most needs on Monday; 1 (how the model works) is what makes them believable; 3, 6 and 4 build on those.

How the room shows it got there: a one-line exit question on the closing slide, "Name one task you would hand to AI on Monday, and how you would check its answer." A good answer names a task, a source to hand over, and a check. That tests goals 2, 3 and 5; goals 1 and 4 are checked in the room as it happens, by whether the tally surprises anyone and whether people spot the dropped departments in the Carl demo. Open question: whether the exit question is answered aloud by a few volunteers or collected on the end-of-session survey; the survey would let the answers be read later.

The thread through all of it is "augment, not replace": AI prepares, a person decides.

**A disclosure the room should hear early.** Promptulus, Remembering Thamus, Data Crawler Carl, Vandalizer and the AI4RA Unified Data Model are open-source tools built by the presenters' own NSF-funded project, AI4RA. The talk says so on the opening slides and asks the room to judge the tools by the checks it teaches, not by who is showing them.

## Audience

Research administrators from universities in NCURA Regions VI and VII: pre-award and post-award staff, sponsored programs officers, research compliance staff, and some managers. Mixed experience with AI, from people who have never used a chatbot at work to people using one daily. Most are not technical. They bring laptops. Their work runs on federal regulations, sponsor terms and audits, so they are trained to be careful, and that caution is an asset.

## Format

Seven blocks after three short opening slides: how language models work; memory and the record; context, with hands-on Promptulus; the data underneath; accountability and guidance; start small; and Vandalizer; then a close. There is one hands-on block (Promptulus, on attendees' laptops) and several live demos from the podium (the token builder, a pachinko board, Remembering Thamus, Data Crawler Carl).

## Changes this plan proposes to the current deck

The slide-by-slide below describes the talk as proposed. It differs from the current deck in these ways:

1. One name, "Unified Data Model," on slide 4.
2. The error modes and IBM slides (28 and 29) move from the middle of Block 4 to open Block 5.
3. A closing slide (47) after the Vandalizer slide, with the exit question and the handoff to Bert.
4. Before the hands-on block, a short slide or spoken rule on what to paste, and where it goes (see below).
5. One line on slide 19 about which record to hand a model.
6. Block 7 shrinks from three slides to one: how to join the Vandalizer demo and how to start its certification course. The two podium demos (slides 45 and 46) come out; Vandalizer has been demonstrated at earlier AI4RA sessions, so a pointer is enough.
7. The deck already points to the AI4RA community forum (groups.ai4ra.uidaho.edu, a groups.io list) on slides 31 and 36. Make each pointer land on a hashtag: slides 36 and 40 link to the guidance hashtag, where attendees post sponsor rules and guidance documents and the collection stays current after the talk; slide 31 links to the UDM hashtag for feedback on the data model. No institution has to be named on a slide.
8. The companion site offers one sample task, a public solicitation to paste into Promptulus, for anyone who arrives without a task they can paste.

## Where attendee text goes in our own tools

The talk asks the room to judge AI4RA's tools by the checks it teaches, so it owes them the facts. With the workshop key, Promptulus, Thamus and Carl send what you type to the University of Idaho's own model gateway, which runs open models on university servers and logs each request; nothing goes to a commercial AI company. Carl keeps the spreadsheet's rows in the browser and sends only the column names and the question. Even so, the rule for the hands-on block is the bulletin-board rule: paste only what you could post publicly. Award titles, sponsors, deadlines and solicitation text are fine; salaries, student or patient data, export-controlled detail and unfunded proposal text are not. The gateway's logs record who sent a request, which model answered and how much it used; whether the text of a prompt is kept depends on the university's configured policy, and model answers are not kept. Open question to settle before November: what that setting is for the workshop key, and how long the key stays valid. A careful room will ask both, and the answer should be one sentence on the slide. The bulletin-board rule does not wait on that answer: it is written to be safe even if every prompt is kept. The logs exist so the institution can account for its AI use, which is the audit trail the talk recommends. Say this before anyone opens a laptop.

## Where things live

- **Deck and companion site:** ui-insight.github.io/NCURARegionalWorkshop2026, with the QR code for the workshop key on its home page.
- **Promptulus:** ai4ra.github.io/promptulus
- **Remembering Thamus:** nate-layman.github.io/thamus
- **Data Crawler Carl:** ui-insight.github.io/data-crawler-carl, with the sample awards file the presenter uploads.
- **Unified Data Model:** ui-insight.github.io/AI4RA-UDM
- **Vandalizer:** vandalizer.uidaho.edu
- **Community forum:** groups.ai4ra.uidaho.edu, with hashtags for the topics the talk sends people to.
- **Sponsor AI pages:** NSF at nsf.gov/policies/ai and NIH at osp.od.nih.gov/policies/artificial-intelligence.

## Before the session, and if something fails

- **Tell people in advance.** Ask the NCURA program contacts to send registrants one line before the meeting: bring a laptop and one real task from your work that you could post publicly, such as a solicitation or a routine email. Repeat it on the title slide.
- **A one-page handout,** printed and on the companion site: the four questions, the two test questions, the bulletin-board and two-tier rules, and the three Monday prompts. It carries the talk if a demo fails or someone cannot see the screen.
- **Re-run the demos the morning of the talk.** The numbers quoted here come from rehearsal; if the room's results differ, use the room's.

- **Keys.** The workshop key reaches attendees through a QR code on the companion site's home page. It arrives on the link's address, is kept only in that browser tab, and is removed from the address bar; every Promptulus, Thamus and Carl link in the deck carries it onward. An attendee who closes the tab rescans the code. The Vandalizer slide needs no workshop key; it points to Vandalizer's own sign-up. Test the QR from a phone on the venue network.
- **Pages to open in advance.** Remembering Thamus (it loads a model of about 23 MB once), Carl with the awards file ready on the desktop, and Promptulus.
- **If the network fails.** Each live demo has a spoken fallback in the speaker notes: the Thamus answers (memory says 10 percent, the live read says 15 percent with the citation), and Carl's dropped departments (about 2.7 million dollars of federal funding). The token builder, pachinko board, tally and context slider run without a network.
- **If half the room cannot get into Promptulus.** Nathan presents Part 1 alone, with no one else to walk the room, so the fix is set up to run without him: before the work starts, ask everyone who is in to raise a hand, and anyone who is not joins the nearest raised hand. Troubleshoot the key once, from the podium, not table by table. If too few are in, pair people up on the laptops that work. If that fails too, the presenter takes one volunteer's task and works it on screen with the room calling out answers to the coach's questions; the debrief runs as a discussion either way.
- **Live, not staged.** Every demo runs live. Vandalizer is a pointer slide, not a demo. The numbers in this document (a spike on 7, 10 percent from memory against 15 percent from the regulation, the dropped departments) are what the demos showed in rehearsal, not recordings; the fallbacks use them only if the network fails.
- **Why Vandalizer comes last.** It is the most optional part of the talk: everything it would teach (extraction, a source next to every value, comparing documents) has already been said, so it is a pointer for people who want to go further. The closing slide follows it either way.

## The interactive demos

A short review of each, as it stands.

- **Token builder** (slide 6). The presenter clicks the next word of a sentence while bars show how likely each choice was, and a chart shows every sentence that could have come out. It makes "picks the next likely word" visible. Risk: the attention weights and gradient descent sidebar add technical detail most of this audience does not need, and the pachinko board that follows teaches the same idea more physically.
- **Pachinko board** (slide 7). A tall board of nails with five word bins. Balls fall from a funnel and pile up in bins; chips change the previous word, which moves the funnel; nails can be dragged sideways; "Shift the nails" rearranges them into a banana that sends most balls to "funded." It shows randomness, how context shifts the odds, and what training does, all on one screen. Risk: it carries three lessons at once. The fix is to teach them one click at a time: drop balls (randomness), then change the word (context), then shift the nails (training), and let the next slide explain the shift.
- **Random number tally** (slide 9). The room asks a fresh chat for a random number and the presenter taps each answer into a bar chart. Nearly always a spike on 7. Strong and participatory. Risk: depends on the room having laptops or phones. Fallback: the presenter runs it on screen in three different chatbots, a fresh chat each time; the next slide's chart makes the point either way.
- **Remembering Thamus** (slide 17). A separate web page, opened full screen. One compliance question, usually the de minimis indirect cost rate (under 2 CFR 200.414(f) as revised in the 2024 Uniform Guidance update, up to 15 percent of modified total direct costs since October 1, 2024; 10 percent before that, which is what most training data says), answered five ways by the same model: from memory, from pasted text, from a web search, from a vector index of the regulation, and from the regulation read live with a citation. The research administrator is framed as a quiz show contestant who gives an answer before any "lifeline." The memory answer is typically outdated; the live read is current and cited. The teaching moment is the difference between the five: memory guesses; pasting works only if you pasted the right version; web search finds a blog post as happily as the rule; a vector index finds passages that look similar, which can be the wrong one; reading the regulation itself gives the current rule with its citation. The goal is recalled versus accessed, not the mechanics of each method. Risk: needs the network and the workshop key; the presenter must cache the page before the session.
- **Data Crawler Carl** (slide 18). A separate web page. Upload a spreadsheet, ask in plain English, and see the database query the model wrote, the rows, and its narrative. Asked for federal funding by department on a sample awards table, it silently drops awards with a blank department. Risk: Carl's built-in sample is an unrelated salary table, so the presenter must upload the awards file.
- **Context window slider** (slide 20). A bar split into intent, information, instructions and conversation, with draggable handles, four presets (compliance review, drafting a description, iterative editing, scoping a new task), and hover tooltips. Clear and quick. Risk: low; it is explanatory rather than a task.
- **Promptulus** (slides 21 to 23). The only hands-on block. For attendees who already use AI daily, a stretch challenge: take a prompt they use every week and get Veridex, the evaluation coach, to rate it, then write down the check they would run on its output. Attendees open a separate site on their laptops, pick one of nine coaching characters, and work a real task from their desk; each character rates their request and names one principle to fix. Work time, then a debrief. The four challenges: describe the task to Sequita (does it need a paper trail?); give your real prompt to Promptulus and apply the one principle it names; ask Mnemos what the model would need to see; ask Veridex how you would check the output. Risk: getting a whole room onto a site with a key, and four different characters can be a lot to follow.
- **Model quiz and aside** (slide 24). The room picks "the most important model" from a list; the answer is "your data model." A small button opens a popup on model bias with three documented cases. Risk: the popup is optional and could be skipped or could derail. The bias point itself does not depend on it: slide 8 says training data is not a neutral choice, and slide 19 says accessed answers leave less room for that bias.
- **Vandalizer** (slide 44). Not demonstrated live in this talk (proposed change 6). One slide with a one-line description (a document extraction and review platform where every value points back to the passage it came from), a link and QR code to join the demo instance, and how to start the Vandal Workflow Architect certification: a self-paced course of modules inside Vandalizer that ends in a badge and a printable certificate. Risk: low.

## Slide by slide

Slide numbers follow the current deck, so a moved slide keeps its number. In the proposed order the talk runs 1 to 27, 30 to 33, 28 and 29, 34 to 44, then 47; slides 45 and 46 are gone.

### Opening

1. **Title.** "Where AI fits in research administration," with the presenter's photo.
2. **The next ninety minutes.** The seven blocks, in order.
3. **Augment, not replace.** Three cards: use the output but check the work; keep people in the loop for decisions, signatures and PI conversations; let tools handle routine work so people have time for judgment. Callout: the question is not whether AI can do the work, but whether it helps you do it better, and how you know.
4. **Interactive open-source demos today.** Four cards: Promptulus, Remembering Thamus, Data Crawler Carl, and the Unified Data Model (proposed change 1).

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
18. **AI analyzes what you give it.** Live demo of Data Crawler Carl: asked for federal funding by department, it writes a correct query that silently drops awards with a blank department. It sits in Block 2 on purpose: right after Thamus shows that reading the source beats remembering, Carl shows that reading the source is not enough when the source has holes. Block 4 opens by calling back to it (slide 25).
19. **Two kinds of knowing: recalled and accessed.** Plus one line on which record to hand over: the current version, from the system of record, not a copy from someone's downloads (proposed change 5). Recalled is frozen, blurred, and fills gaps confidently; this is where hallucination and hidden bias live. Accessed is current, citable, and checkable, with less room for training-data bias, though how much less is an open question.

### Block 3. Context: hands-on with Promptulus

20. **Your AI has a page limit.** Opens with the paste rule and where text goes (proposed change 4). What a context window is, and a slider showing four things that share it: intent, information, instructions, conversation, with presets and hover tooltips.
21. **The AI literacy companions.** What Promptulus is, and its nine coaching characters.
22. **Bring a task from your desk.** Hands-on challenges with four of the characters, and a link to open Promptulus.
23. **What did you notice?** Debrief questions, and the takeaway that prompting is the small part: deciding whether to use AI, giving it what it needs, and knowing how you will check it outlast any prompt trick.

### Block 4. The data underneath
24. **Which is the most important one?** A quiz listing AI model types, plus Claude, Gemini and Grok. A small "An aside" button opens a popup, "All models are biased," with three documented cases about Grok.
25. **Wrong!** The most important model is your data model. The argument is the Carl demo the room just saw: the same capable model gave a confidently wrong total because the table was not ready. A better model would not have fixed it; a required department field would have.
26. **Structured and unstructured data.** Tables versus documents; most of an office's knowledge is in documents, most of its reporting needs tables.
27. **What AI does well with text.** Extraction, summarization, transformation, generation, classification and comparison, each with a research administration example.
30. **What is a data model?** A small diagram of award, sponsor, person and department, and the four parts: things, details, connections, rules.
31. **Why research administration needs a common language.** Same data, different names in every system; a shared model means map once, reuse everywhere. The AI4RA Unified Data Model is a draft; help evaluate it, with a QR code. The slide already shows the forum address; proposed change 7 points it at the UDM hashtag.
32. **Why the record needs one governed home.** Keep the raw sources, translate each source once, answer from the reconciled copy.
33. **Data sovereignty: where does the model run?** Cloud, local or hybrid. The two-tier rule: a personal account on a free chatbot is for public text only, the kind you could post on a bulletin board, because free tiers may train on what you type; anything from your institution's systems goes only into an account your institution has vetted.

### Block 5. Accountability and guidance

*The error modes and the IBM slide open this block (proposed change 2), leading straight into the four questions.*

28. **Four ways an answer goes wrong.** Hallucination is better called confabulation, and people do it too. Missed it, made it up, changed a detail, put it in the wrong place. Callout: people tend to trust models more than people; verify everyone's work and ask for sources.
29. **The IBM quote.** "A computer can never be held accountable; therefore a computer must never make a management decision." A machine cannot be held accountable. You are the authority.

34. **Four questions before you give a task to AI.** Can you give it everything it needs? Can you check the answer cheaply? Who is accountable? Does it have to be the same tomorrow?
35. **Does it matter how the work got done?** A continuum from process-critical to output-driven, with two test questions: if someone asked how this was done, would the answer matter? Could a colleague re-run it and get the same result? If both answers are "not really," AI can lead; if either is yes, a person stays in the loop.
36. **Check the sponsor before you check the tool.** NSF, NIH (including its notice that reviewers may not use generative AI on applications, NOT-OD-23-149), and going up to a parent agency when a sponsor has no policy, with links. The slide already asks people to share updates on the forum; proposed change 7 points that at the guidance hashtag.
37. **Your AI guidance is probably out of date.** A review of twenty institutions' policies against a 61-item checklist (open question: the slide should say whose review it is and where to read it, without naming the institutions reviewed): the best covered 39; research and sponsored programs averaged 16 percent. Three kinds of guidance: physical, technical, behavioral. AI guidance is just data guidance.
38. **How strict should it be?** Five levels from principles to strict, with examples.
39. **Ten sections of a strong policy:** governance and scope; tools and procurement; data protection; disclosure and attribution; human oversight; research integrity; research and sponsored programs; special uses such as meeting recorders and agents, meaning AI that takes actions on its own; training and communication; maintenance. Below them, the items that land on a research administrator's desk: the PI certifies AI-assisted proposal content, no AI in confidential peer review, check sponsor rules, controlled data, whether AI tool costs can be charged to awards.
40. **Start the policy. One page.** Three people in a room, start from what you already have, and one page; check your policy against the ten sections and bring the gaps to leadership. New in this plan: a link to the forum's guidance hashtag, where attendees post and find sponsor rules and guidance (proposed change 7).

### Block 6. Start small

41. **Three small starts you can try Monday.** Three prompts, each ending in a check:
    - "List every deadline, page limit, eligibility rule and required document in this solicitation. For each one, quote the sentence it comes from." Check two quotes against the document.
    - "List the reporting due dates, cost share, prior-approval requirements and any special terms in this award notice. Quote the clause for each one." Confirm each quote before it goes in the file.
    - "Rewrite this for a PI who has never managed an award. Keep every requirement. Do not add any." Compare the two versions one requirement at a time.
    None asks the model to do math. Each passes the four questions from Block 5: the document gives the model what it needs, the quote makes checking cheap, the person who files the result is accountable, and the result does not need to be reproducible because the document is the record. Each also works in any chatbot, not only AI4RA's tools.
42. **Where it saves a research administrator time this month.** Six examples, each naming what AI does and what the person does.
43. **Each rung needs the one below it.** A ladder of five rungs: a prompt you keep, a shared prompt library, an artifact or add-in, a connected tool, a governed data layer, each needing the one below; start at the bottom and write down the rung you can reach this month.

### Block 7. Vandalizer

44. **Vandalizer: try it yourself.** What it is in one line, a link and QR code to join the demo instance, and the three steps to start the Vandal Workflow Architect certification: sign in, open the certification from your profile menu, and begin the first module.

### Close

47. **What to take with you** (proposed change 3). It pulls the thread together: the model predicts likely words; hand it the record; the data underneath matters most; a person stays accountable. Then the exit question, and the handoff: "The machine's half is to look things up instead of remembering. Your half is to keep enough in your own head to judge what comes back. That is Bert's hour, after the break."
