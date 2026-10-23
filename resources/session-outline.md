# Where AI fits in research administration: attendee guide to Part 1

NCURA Region VI/VII Regional Meeting, Denver. Sunday, November 8, 2026. A three-hour workshop in two parts. This guide covers the first ninety minutes, led by Nathan Layman, a data scientist at the University of Idaho who works on AI4RA, an NSF-funded project (award 2427549) that builds open-source AI tools for research administration offices. After a ten-minute break, Bert Baumgaertner, a philosopher at the same university, leads an hour on thinking well with AI. The last half hour is open discussion with both presenters.

Everything linked here is also on the companion site: **https://ui-insight.github.io/NCURARegionalWorkshop2026/**. A QR code for it will be on screen throughout.

## Before you arrive

- **Bring a laptop.** One block is you at a keyboard. A phone works for the polls but not for the hands-on block.
- **Bring one real task from your desk.** An email you have to write, a notice you have to summarize, a budget you have to check. You will use it in the Promptulus block. Choose something that contains no personal, financial, or restricted data, because you will paste it into a web app.
- **No account or install is needed.** Every tool used in the room is a web page. The one that needs a key gets it from a QR code in the room, and the key expires after the workshop.

## The tools, and what you can do with each after today

| Tool | What it is | In the room | On Monday |
|---|---|---|---|
| [Promptulus](https://ai4ra.github.io/promptulus/) | A prompt-training web app with a set of coaching characters that critique your prompt before the model answers it | You use it on your laptop | Open source, free. Use it with your own Google Gemini key or an institutional key |
| [Data Crawler Carl](https://ui-insight.github.io/data-crawler-carl/) | Upload a spreadsheet, ask questions in plain English, and watch the database query the model writes to answer them | Live demo from the podium | Open source, free, runs in your browser. Your data never leaves your machine; only the column names go to the model |
| Remembering Thamus | A page that asks one compliance question three ways: from the model's memory, from a search index, and from a live lookup of the regulation | Live demo from the podium | In development at [github.com/nate-layman/thamus](https://github.com/nate-layman/thamus). The README tells the story even before the page is live |
| [Vandalizer](https://vandalizer.uidaho.edu) | A document-extraction and review platform built for research administrators: pull facts out of award notices, check proposals against solicitations, chain tasks into reusable workflows | Live demo from the podium | A free trial is available at the site. Open source at [github.com/ui-insight/vandalizer](https://github.com/ui-insight/vandalizer) |
| [AI4RA Unified Data Model](https://ui-insight.github.io/AI4RA-UDM/) | A draft shared vocabulary for research administration data: forty tables covering proposals, awards, finance, effort, compliance, people and organizations | Shown, with a request for your help evaluating it | Read it, then tell us where it gets your reality wrong on the [AI4RA community list](https://groups.ai4ra.uidaho.edu/g/main/join) |

Nothing in Part 1 asks you to buy, install, or sign a contract for anything.

## The ninety minutes

### Opening (3 minutes)

The one rule for the day: augment, not replace. AI prepares, a person decides. Every tool you see today follows that pattern, and so does every recommendation.

### Block 1. How language models work (17 minutes)

A language model builds a sentence one word at a time by picking the most likely next word. Two exercises make that visible: the room builds a sentence together, one word per person, and everyone picks a random number between 1 and 10, which shows that a model's picks cluster the same way a room's do. The mental model to carry out of the block: asking an AI is like asking a crowd of a thousand well-read non-experts. The crowd is excellent on consensus knowledge and unreliable on anything specialized, local, or recent. The block ends with a spot-the-fabrication exercise and one practical limit: the model can only read so many pages at once.

### Block 2. Promptulus, hands-on (15 minutes)

You open Promptulus on your laptop, pick a coach, and work your real task. The coaches ask what you want, who it is for, and what a good answer would contain before the model writes anything. Four minutes to get everyone in, eight minutes to work, three minutes of debrief: what did the coach make you say that you had not thought to say?

### Block 3. Remembering Thamus (22 minutes)

The centerpiece, and the reason the companion page is named what it is.

It opens with a story from Plato's *Phaedrus*. The god Theuth invents writing and presents it to King Thamus as a remedy for memory. Thamus disagrees: people will trust the marks on the page and stop remembering for themselves, and writing is a remedy not for memory but for reminding. He meant that as the flaw.

Then the lesson is turned onto the machine. A model's memory is its training: enormous, confident, frozen on a date, and stale after it. So the fix for a machine is exactly the reminding Thamus refused. The live demo asks one question three ways: what de minimis indirect cost rate may a recipient without a negotiated rate charge?

- **From memory,** the model says 10 percent. That was the rule in most of what it read. It is wrong today.
- **From a search index** of the regulation, the model gets close, but cannot show you which passage it leaned on.
- **From a live lookup,** the model searches the eCFR, reads one paragraph, and answers 15 percent of modified total direct costs, citing 2 CFR 200.414(f) as in force on the day of the lookup. You can check it yourself at https://www.ecfr.gov/current/title-2/section-200.414. The rate changed on October 1, 2024, when the revised Uniform Guidance took effect; the equipment capitalization threshold ($5,000 to $10,000) and the subaward portion counted toward MTDC ($25,000 to $50,000) changed the same day, and both make good second questions.

Watch for one thing: the model sounds equally sure in all three columns. Confidence is not evidence.

A second demo, with Data Crawler Carl, shows the same lesson on structured data. Asked for total federal funding by department on a small awards table, Carl writes a correct query that silently drops every award whose department was left blank, and nothing in its narrative says so. The model did nothing wrong. The table was not ready to answer the question.

That failure opens the back half of the block:

- **Why research administration needs a common language.** Every office tracks the same things, a sponsor, a PI, an award, a budget, and every system names them differently, so every report starts by reconciling them and nothing built at one institution runs at the next. A shared data model is the fix. The AI4RA UDM is a draft of one, written by a small team at one institution, and we are asking for readers, not adopters: does it describe an award the way you would, what does your office track that is missing, what do you call differently. Feedback goes to the AI4RA community list.
- **Why that data needs one governed home.** Keep the raw sources so you can prove what they said, translate each one to the shared model once, and let the model answer from the reconciled copy rather than from whichever spreadsheet was open. The difference is between a tool that is confidently wrong and a pipeline that is honestly incomplete.
- **Reminding has a cost.** Everything you hand the model to remind it, it reads. For Thamus the cost of the record was forgetting; for a machine, the cost is exposure. So: where does the model run? Vendor cloud, which has the best models and the least visibility; local, where data never leaves the building; or a hybrid. If you use a cloud model, use your institution's enterprise agreement, never a consumer account, because only the agreement gives you data protection terms, no training on your inputs, and an audit trail. And some data may not leave under any agreement. The usual list: student records under FERPA, health information under HIPAA, export-controlled technical data, personally identifiable information, and anything a sponsor's terms restrict. Your institution's data classification policy is the authority; if you do not know where to find it, that is the first thing to look up on Monday.

The block ends on the reveal. Thamus warned that writing would ruin memory. He is remembered only because Plato wrote him down.

### Block 4. Accountability (9 minutes)

Four questions to ask before any task goes to a model, in thirty seconds:

1. Can you hand it everything it needs? If the answer depends on your award terms, your policy, or your data, those have to be in the question. If you cannot put them there, the task is "data first," not "AI now."
2. Can you check the answer cheaply? Against a source, a known sample, a second run, or your own eyes, in under a minute. If checking costs as much as doing, you have saved nothing and added a risk.
3. Who is accountable for the result? A name, a role, a signature. If the honest answer is "the AI," stop.
4. Does it have to be the same tomorrow? Audit samples, determinations, and anything a reviewer might repeat need a reproducible method. The model gives a different answer each run, so reproducibility has to come from the method.

Then a sorting exercise. You get a list of real research administration tasks and place each on a line from process-critical (financial audits, effort certification, misconduct investigations, where who did each step and how is the point) through human-in-the-loop (budget flag review, subrecipient risk summaries, compliance checks, where the model does the legwork and a professional signs) to output-driven (boilerplate drafting, formatting, where only the result is judged). Two test questions place any task: if someone asked how this was done, would the answer matter? Could a colleague re-run it and get the same result? Where both answers are "not really," AI can lead. Where either is "yes," a person stays in the loop. You leave with your own sort, on paper, to compare with your office's practice.

### Block 5. Start small (7 minutes)

Three things an office can try this month, each with a recipe on the companion site:

- A portfolio dashboard built in an afternoon with a chat model that produces a web page from a spreadsheet export.
- AI inside the spreadsheet you already use, through the add-in your institution's Microsoft 365 or Google Workspace agreement already covers, for the formulas and summaries you write by hand today.
- The one task from your desk you worked in Promptulus, run for real on Monday with a colleague checking the result.

Each bigger step depends on the one below it: a clean spreadsheet before a dashboard, a dashboard before a shared data model, a shared model before any tool that runs across offices.

### Block 6. Vandalizer (11 minutes)

Two demos. Extract the PI, the dates, the budget, and the terms from an award notice into a structured record. Then check a proposal against its solicitation and catch the mismatch. Vandalizer shows its sources for every extracted value, which is the point: a reusable workflow can be checked once and trusted many times. The block ends with three ways to check output you did not write: inspect it directly against the source, keep the trail of how it was produced, and test the tool on cases where you already know the answer before trusting it on ones where you do not.

### Close (3 minutes)

Three bins for every task on your desk: automate, augment, or leave alone. One thing to take home from the start-small list. Then the handoff to Bert, whose hour is the other half of the same problem. The machine needs to remember less and look things up more. People need to keep enough in their own heads to judge what comes back.

## What a good Monday looks like

- You have found your institution's AI guidance and data classification policy, or confirmed there is none and told someone.
- You have run your Promptulus task for real, with a colleague checking the result.
- You have sorted five tasks from your own desk onto the process-critical to output-driven line and talked about one of them with your supervisor.
- You have read the UDM for ten minutes and sent one sentence about it to the AI4RA community list.

## Questions, feedback, and staying in touch

- Companion site: https://ui-insight.github.io/NCURARegionalWorkshop2026/
- AI4RA project and community list: https://ai4ra.uidaho.edu and https://groups.ai4ra.uidaho.edu/g/main/join
- Nathan Layman, nlayman@uidaho.edu. Bert Baumgaertner, bbaum@uidaho.edu.
