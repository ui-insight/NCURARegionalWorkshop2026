# Where AI fits in research administration: the Part 1 story, for review

This is the narrative plan for the first ninety minutes of a three-hour NCURA Region VI/VII workshop (Denver, Sunday, November 8, 2026; time and room are in the NCURA program and on the companion site). It is written for a research administrator who will be in the seat, and it is here to be judged on two things: does the story flow, one block handing off to the next, and does the talk cover what you would need in order to act on it afterward. Logistics, slides, the exercise sheets, and the start-small recipes are all on the companion site, **https://ui-insight.github.io/NCURARegionalWorkshop2026/**, and stay there after the day; the materials are open (CC BY 4.0), so take and reuse them.

**How to read this.** You are not being asked to build anything from this page. Read it as the person in the seat and answer four questions: Where does the story lose you? What would you need to hear that is not here? Is any block in the wrong place? And at the end, do you know what to do differently on Monday, and why?

Part 1 is led by Nathan Layman, a data scientist at the University of Idaho on AI4RA, an NSF-funded project (award 2427549) that builds open-source AI tools for research administration offices. "ui-insight" in the links below is the GitHub organization of the University of Idaho research data team that builds them. After a ten-minute break, Bert Baumgaertner, a philosopher at the same university, leads an hour on thinking well with AI: reasoning puzzles where a story carries the rule a grid leaves open, arguments by analogy, and a structured ethical discussion format you can run at your own institution. The last half hour is open discussion with both.

## The spine

One sentence runs through all ninety minutes: **augment, not replace. AI prepares, a person decides.** Each block adds one reason that sentence is true and one skill for living by it.

1. The model guesses the most likely next word, so it is a crowd, not an expert. Skill: know what to ask a crowd.
2. The crowd answers better when you tell it what you want. Skill: prompt with intent, hands-on.
3. The crowd's memory is stale, so give it the record. Skill: recognize recalled versus accessed, and know that the record you hand it travels.
4. Only a person can be accountable. Skill: four questions and a sort.
5. Start with what is on your desk. Skill: three small things this month.
6. A reusable workflow can be checked once and trusted many times. Skill: three ways to check output you did not write.

## Before you arrive

Bring a laptop and one real task from your desk; you will paste it into a web app, so pick something you could post on a bulletin board. A rule of thumb for the room, which the presenter repeats before the hands-on starts: PI names, sponsor names, award titles, deadlines, and public solicitation text are fine. Salaries, student or patient information, export-controlled technical detail, and anything a sponsor's terms mark confidential are not. If you are unsure, bring the public version of the task. The full treatment of where data may go comes in Block 3, deliberately after you have already handed a model something and felt the question.

Nothing needs an account or an install. In the room, Promptulus and Data Crawler Carl run on a shared workshop key delivered by QR code, which expires after the day. On Monday you use your own key. A free Google Gemini key takes two minutes at https://aistudio.google.com/app/apikey, and both tools have a box to paste it into. If your institution runs its own model gateway, meaning the university licenses or hosts a model endpoint and issues staff keys, use that instead. If it has neither, a personal key with public or de-identified data is acceptable for everything in this talk, and nothing restricted ever goes through a personal key.

## The tools

| Tool | What it is | Room | After |
|---|---|---|---|
| [Promptulus](https://ai4ra.github.io/promptulus/) | A prompt-training page. You pick a coach, each named for one habit: Telosa for intent, Mnemos for context, Modulus for breaking a task into steps, Sequita for an auditable trail, Dialogos for conversation, Vitrea for transparency, Veridex for evaluation, Clarion for reporting. The coach critiques your prompt before the model answers it | Hands-on | Free, open source, your own key |
| [Data Crawler Carl](https://ui-insight.github.io/data-crawler-carl/) | Upload a spreadsheet, ask in plain English, see the database query the model wrote | Demo | Free. The rows stay in your browser; only the column names and your question go to the model, wherever your key points |
| Remembering Thamus | One compliance question answered three ways: memory, search index, live lookup | Demo | In development at [github.com/nate-layman/thamus](https://github.com/nate-layman/thamus); the README carries the story |
| [Vandalizer](https://vandalizer.uidaho.edu) | Document extraction and review workflows built for research administrators | Demo | Free trial at the site; open source; a university research project, not a vendor product, so pilot it as you would any pilot |
| [AI4RA Unified Data Model](https://ui-insight.github.io/AI4RA-UDM/) | A draft shared vocabulary for research administration data | Shown, with a request for help | Read it and reply on the [AI4RA community list](https://groups.ai4ra.uidaho.edu/g/main/join) |

## The ninety minutes

### Opening (3 minutes)

The spine sentence, said once and plainly. Then a promise: the room will meet an Egyptian king in about half an hour, and he will explain the whole day.

### Block 1. How language models work (17 minutes)

A language model builds a sentence one word at a time by picking the most likely next word. Two exercises make that visible: the room builds a sentence together, one word per person, and everyone picks a random number between 1 and 10, which shows that a model's picks cluster the way a room's do. The mental model to carry: asking an AI is like asking a crowd of a thousand well-read non-experts. Excellent on consensus knowledge, unreliable on anything specialized, local, or recent. A spot-the-fabrication exercise shows what "most likely" does to a citation. One practical limit closes the block: the model can only read so many pages at once, which matters the moment you start handing it documents.

**Hand-off:** if the model is a crowd guessing what you probably mean, the first skill is telling it what you actually mean.

### Block 2. Promptulus, hands-on (15 minutes)

You open Promptulus on your laptop, pick a coach, and work your real task. The coach asks what you want, who it is for, and what a good answer would contain before the model writes a word. Four minutes to get everyone in, eight to work, three to debrief on one question: what did the coach make you say that you had not thought to say?

**Hand-off:** a well-told prompt still gets a wrong answer when the crowd's memory is wrong. That is the next problem, and it has a very old name.

### Block 3. Remembering Thamus (22 minutes)

The centerpiece. It opens with a story from Plato's *Phaedrus*. The god Theuth invents writing and presents it to King Thamus as a remedy for memory. Thamus disagrees: people will trust the marks on the page and stop remembering for themselves. Writing, he says, is a remedy not for memory but for reminding. He meant that as the flaw.

Then the story turns onto the machine. A model's memory is its training: enormous, confident, frozen on a date, stale after it. So the fix for a machine is exactly the reminding Thamus refused.

**Demo one, three answers to one question.** What de minimis indirect cost rate may a recipient without a negotiated rate charge?

- From memory, the model says 10 percent. That was the rule in most of what it read. It is wrong today.
- From a search index of the regulation, it gets close but cannot show which passage it leaned on.
- From a live lookup, it searches the eCFR, reads one paragraph, and answers 15 percent of modified total direct costs, citing 2 CFR 200.414(f) as in force on the day of the lookup. Check it yourself: https://www.ecfr.gov/current/title-2/section-200.414. The rate changed on October 1, 2024, with the revised Uniform Guidance; the equipment threshold ($5,000 to $10,000) and the subaward portion counted toward MTDC ($25,000 to $50,000) changed the same day and make good second questions.

Watch one thing: the model sounds equally sure in all three columns. Confidence is not evidence. (Every live demo in the talk has a fixed fallback on the slide, so if the room's network fails, the lesson still lands, more slowly.)

**Demo two, the same lesson on a spreadsheet.** Data Crawler Carl is asked for total federal funding by department on a small awards table. It writes a correct query that silently drops every award whose department was left blank, and nothing in its narrative says so. The model did nothing wrong. The table was not ready to answer the question. Reminding only works if the record is right.

**So the record has to be right, and shared.** Every office tracks the same things, a sponsor, a PI, an award, a budget, and every system names them differently. Every report starts by reconciling them, and nothing built at one institution runs at the next. A shared data model is the fix. The AI4RA UDM is a draft of one, written by a small team at one institution, and the ask is for readers, not adopters: does it describe an award the way you would, what does your office track that is missing, what do you call differently.

**And the record has to live somewhere governed.** Keep the raw sources so you can prove what they said, translate each one to the shared model once, and let the model answer from the reconciled copy, not from whichever spreadsheet was open. The difference is a tool that is confidently wrong versus a pipeline that is honestly incomplete.

**And reminding has a cost.** Everything you hand the model, it reads. For Thamus the cost of the record was forgetting. For a machine, the cost is exposure. So, where does the model run? Vendor cloud, with the best models and the least visibility; local, where the data never leaves the building; or hybrid. If cloud, use your institution's enterprise agreement, never a consumer account. An enterprise agreement is the contract your university signs with the vendor; it is the only thing that gives you data protection terms, a promise of no training on your inputs, a named contact, and an audit trail, and most universities already have one for Microsoft or Google even if nobody in your office knows it. If yours has none, the rule from the start of this page holds: public or de-identified data only. And some data may not leave under any agreement: student records under FERPA, health information under HIPAA, export-controlled technical data, personally identifiable information, anything a sponsor's terms restrict. Your institution's data classification policy is the authority.

The block ends on the reveal. Thamus warned that writing would ruin memory. He is remembered only because Plato wrote him down.

**Hand-off:** the record can be right, shared, governed, and safely handed over, and the answer can still be wrong. Someone has to own it.

### Block 4. Accountability (9 minutes)

Four questions before any task goes to a model, in thirty seconds:

1. Can you hand it everything it needs? If the answer depends on your award terms, your policy, or your data, those have to be in the question. If they cannot be, the task is "data first," not "AI now."
2. Can you check the answer cheaply? Against a source, a known sample, a second run, or your own eyes, in under a minute. If checking costs as much as doing, you have saved nothing and added a risk.
3. Who is accountable for the result? A name, a role, a signature. If the honest answer is "the AI," stop.
4. Does it have to be the same tomorrow? Audit samples, determinations, and anything a reviewer might repeat need a reproducible method. The model gives a different answer each run, so reproducibility has to come from the method.

Then the sort. Nine real tasks, three bins, AI now, data first, keep human: pull deadlines and page limits out of a solicitation; draft a budget justification from a completed budget; compare a subaward budget to its justification and flag mismatches; report federal funding by department for the Vice President for Research; list every active award with an overdue effort certification; predict which proposals are most likely to be funded; decide whether a questionable cost transfer is allowable; negotiate a disputed IP clause with an industry sponsor; tell a PI their proposal missed the deadline. Two test questions place any task: if someone asked how this was done, would the answer matter? Could a colleague re-run it and get the same result? Where both answers are "not really," AI can lead. Where either is "yes," a person stays in the loop. Three of the nine land in "data first," which is the sort's own argument for the data model you just saw.

**Hand-off:** you know what the model is, how to ask it, what to hand it, and who owns the answer. Now the smallest thing you can do with that on Monday.

### Block 5. Start small (7 minutes)

Three recipes, each with the same two rules: enterprise account, not personal, and read what it wrote before you trust it.

- **An afternoon's dashboard.** Export a de-identified CSV of proposals by sponsor or awards by department. Paste it into a chat model and ask for an interactive dashboard: totals by sponsor type, awards ending within 90 days, a department filter. It writes the page in about a minute. Then check two numbers against a pivot table. It is a prototype for a conversation with leadership, not a system of record, and the blank-department lesson applies.
- **AI inside the spreadsheet you already use.** The add-in your Microsoft 365 or Google agreement already covers sits beside the open workbook. Ask it to explain an F&A formula in plain language, write a formula that flags awards ending within 90 days, classify sponsors as federal, industry, or nonprofit and list the rows it was unsure about. Read every formula. Once you have read it, it is yours.
- **Your Promptulus task, for real.** Run the task you worked in Block 2 on Monday, with a colleague checking the result.

Each bigger step depends on the one below it: a clean spreadsheet before a dashboard, a dashboard before a shared data model, a shared model before any tool that runs across offices.

**Hand-off:** small starts are checked by hand each time. When the same task repeats a hundred times, you want a workflow you can check once.

### Block 6. Vandalizer (11 minutes)

Two demos. Extract the PI, the dates, the budget, and the terms from an award notice into a structured record, with the source passage shown for every value. Then check a proposal against its solicitation and catch the mismatch. The point is the reusable workflow: same prompt, same steps, so accuracy can be measured once and trusted many times. The block ends with three ways to check output you did not write: inspect it directly against the source, keep the trail of how it was produced, and test the tool on cases where you already know the answer before trusting it on ones where you do not. As tools take more steps on their own, inspection carries less of the load and the other two carry more.

### Close (3 minutes)

Three bins for every task on your desk: automate, augment, or leave alone. One thing to take home from the start-small list. Then the handoff. The machine needs to remember less and look things up more; that was the first ninety minutes. People need to keep enough in their own heads to judge what comes back; that is Bert's hour.

## What a good Monday looks like

- You have found your institution's AI guidance and data classification policy, or confirmed there is none and said so to whoever owns research compliance at your institution.
- You have run your Promptulus task for real, with a colleague checking the result.
- You have sorted five tasks from your own desk into the three bins and talked about one with your supervisor.
- You have read the UDM for ten minutes and sent one sentence about it to the AI4RA community list.

## Contact

Nathan Layman, nlayman@uidaho.edu. Bert Baumgaertner, bbaum@uidaho.edu. AI4RA: https://ai4ra.uidaho.edu
