# KITT decisions record — the story behind the contract

`core/.agents/core/claude-core.md` states rules only. This file is where the
reasons live: who decided what, when, what it replaced, and what was
measured. It is read on demand, never loaded every session, and it never
ships — consumers' own `decisions.md` files are about their products.

**The full prior wording of every rule, history inline, is the contract as it
stood before the 2026-11-25 diet:**
`git show ccf6467:core/.agents/core/claude-core.md`. Where this record is
terse, that text and the PRs it cites are the evidence. A rule here that
disagrees with the live contract is history; the contract wins.

## 2026-11-25 — the contract diet

David: *"We're burning through tokens like crazy… The only thing I
experience that should be adjusted is how verbose you are."* Phase 1 was the
output budget (interaction rule 5, KITT #322). Phase 2 rewrote the contract,
which every session re-reads on every model step, as rules only and moved the
history here; no rule was meant to change, and a per-slice cold-reader audit
checked that each survived.

## Interaction preferences

- **Rule 4, static question IDs** (2026-11-14): *"when you ask me questions,
  they should have some type of ID that is static until they've been
  answered"*; the `Q` form because *"it's easier for me to type"*. Until
  then the rule read "numbered questions, never lettered (1, 2, 3)"; one
  session showed him four separate 1-2-3 lists and his "1. No" fitted more
  than one. UAT steps took the same shape on 2026-11-23 (`T1`, `R1`, …).
- **Rule 5, sparse chat** (2026-11-25): *"Everything that shows up in chat,
  all the descriptions of what you're doing on every step, they're all quite
  wordy."*
- **Rule 6, four blocking asks** (2026-10-21): *"9/10 times you ask me a
  question and give me a recommendation, I go with your recommendation. That
  means that asking me is futile."* The alert hook (2026-10-30) exists
  because 4 of 12 sampled asks had no `PushNotification` call and the tool
  reports only *"Mobile push requested."*, never delivery. Ringing was
  narrowed on 2026-11-02 (*"what I really need alerting on is … when there is
  something where I will be holding you up"*), after a period (2026-10-30 to
  11-02) when every hand-back, build report and FYI rang, idle ones repeated
  for up to three hours. "One ask rings once" followed on 2026-11-03, after a
  session re-rang an unanswered ask on every hand-back. The plan-done ring was
  added 2026-11-04 (*"that's a pretty important milestone"*). Until 2026-11-04
  the hook also parsed a four-field hand-back footer. `/status`'s full replay
  of open asks: 2026-10-23. The two-review limit, its ask-to-reopen and the
  review-loop PR's hand triage were retired 2026-10-21.
- **Rule 7, FYIs** (2026-10-21, bold summaries: *"quickly scrolling through
  hundreds of lines needs to be as easy as possible"*); the workstream-issue
  comment, 2026-10-23, because the chat compacts and a fresh session never saw
  it; FYIs stopped ringing 2026-11-02.
- **Rule 11, the review trigger** (2026-08-21; revised 2026-09-13). A bare
  trigger reliably starts a review; trigger-plus-prose sometimes also started
  a code-writing task (#490, #539, #472 yes; #503's seven requests no). A
  cloud harness's attribution footer cannot be suppressed; four footered
  triggers all still started reviews. The connector prepared a PR on #490.
- **Rule 13, quote his message**: he could not tell which question an answer
  belonged to across a dozen tool calls.
- **Rule 14, number and title** (2026-10-23): *"Quoting PR or Issue numbers
  at me is useless. … The number alone is never helpful or sufficient."*
- **Rule 15, state the reading** (2026-11-14): first *"prove to me that you
  understand … say it back to me in plain english"*, which from KITT #302
  became a wait on a confirm-or-correct banner; then *"Don't ask me new
  questions to verify that you understood my answer … If you got it wrong,
  I'll tell you."*, after such questions *"created a feedback loop"*.

## A reversible choice proceeds

The rule (2026-10-10) covered choices inside an approved plan; 2026-10-11
added the bugfix tier oracle; 2026-10-21 widened it to every decision I would
otherwise bring him. The plain-English hand-back summary replaced the per-turn
spend line and the `Done:` / `Next:` / `Needs you:` / `Spend:` footer on
2026-11-04: *"the goal is to make it very easy for me to see where we're at …
without having to read pages of text"*, *"when not possible, that you properly
alert me"*, and *"getting a spend count on every turn is not necessary"*.

## Load-bearing claims

Scope by consequence: 2026-09-16 (KITT #113). The *verified* / *unable to
verify* terms were the plan-review schema's fields until that schema went with
the verdict-driven design on 2026-09-18.

## Modes and ceremony

"Don't default upward": 2026-10-21 — the expensive mistake had been
over-ceremony; until then an unclear class was a numbered question.

## Planning

- Rule 2 routes to the whole Preflight because an earlier version named two of
  its four checks, and a partial list invites skipping the rest.
- Rule 3 (2026-10-12) retired the 2026-09-09 rule that a plan is never
  published: it left the plan in one container's working tree, and a plan died
  with that container (Overhype.me #631).
- Rule 4's end-to-end authority (2026-10-21): *"once we've built and agreed on
  a plan, even if it has many phases, you should be able to autonomously
  complete all the steps in the plan from start to finish"*.
- Rule 5: a three-option question to him until 2026-10-21.
- Rule 6 (2026-09-18) retired the private Artifact page of 2026-09-09, which
  had replaced the plan-review PR.
- Rule 7 opened with "genuine product/design forks escalate" until 2026-09-18,
  contradicting its own tie-break (Astra caught it). Until 2026-10-21 such
  choices were separate questions; Overhype.me #744 measured two interrupts on
  a plan whose settled decisions already answered them. `settled-over-dissent`
  replaced the 2026-09-09 two-consecutive-rounds escalation.

## Review loops

- **Trivial and Documentation classes** (2026-09-25), **prototype phase**
  (2026-09-26; *"What we're cutting out is the code review loop once we've
  built it."*, 2026-09-28). Registry PRs as Trivial: 2026-09-28. Sync PRs as
  Trivial: 2026-11-04. A Trivial P1 held the merge for him until 2026-10-21.
  Prototype registry PRs read Codex for nothing (2026-10-20: *"I'm not sure why
  you keep listening to Codex during prototyping."*). Documentation's one
  Astra and Fable pass: 2026-10-04, after a seven-PR trial without it.
- **Write-gate** (2026-08-22). Measured 2026-09-19 across five loops: 57% of
  findings from round two on landed on lines an earlier fix had just changed,
  and 67% were written for. That bounded internal tooling at two reviews until
  David retired the limit on 2026-10-21: *"everything that stops you from
  working is a problem for me"*.
- **Ship gate** (2026-09-19). Measured on #131: five rounds, twelve findings;
  rounds 4–5 argued a label's wording, cost about a quarter of the loop's
  dispatched tokens, and changed nothing; both assessments had said the
  oracle was met from round 3 on. The banned phrase appeared verbatim in two
  #131 assessments (*"clearly over the line in a round already being
  written"*). Reach-across-PRs: #140 round 1. Review-loop PRs and the gate:
  #134 round 1. Such PRs went to David after their second review from
  2026-09-23 until 2026-10-21. *"If reviews are clean, there's nothing for me
  to interpret"* (2026-09-25).
- **Internal tier by consequence**: until 2026-09-23 the text let the category
  settle what the home only weighs (#148), and an early fix dropped
  recoverability. Codex, #140 round 2, found the tier still assigned by
  directory. The decline-quota rubric was retired 2026-09-17. The private-path
  plan's one full-text assessment: 2026-10-12; its FYI form, 2026-10-21.
- **Shared judgement** (2026-09-17, replacing the binding-disposition design of
  the day before). Triaging alone produced 41 fixes for 41 findings on #109;
  the first correction told the judge to decline most, the same quota
  reversed. The `review-action` class sweep: 2026-10-10. The review gate
  (2026-11-11, KITT #293): *"Please don't skip reviewers! That's a critical
  part of our process that should not be allowed."* The six-hour clock of
  #120 was retired 2026-10-21: *"I'm not sure how the six-hour clock really
  helps."*
- **The #89 cut** (2026-09-16): over PR #91's ten rounds the round budget,
  adjudicator and receipts changed no decision; twelve thousand lines made the
  process measurable without making it shorter. Rule 4 used to read "no
  re-request without a behavioural change", which blocked a prose-only fix on
  #125 for a week (Astra, 2026-09-19). Flip conditions as observables: KITT
  #85 (2026-09-13), measured one loop each way, #83 and #85. The four-line
  decline form was retired 2026-09-17.
- **Build report** (2026-10-21) replaced the round translation: *"an AI
  summary in plain english of exactly what happened from start to finish in
  the build"*. Four translations on #131 had been the loop's single largest
  token line. The 200-word target: 2026-11-25. Its ring was retired
  2026-11-02. The session line and hand-off: 2026-11-17. The private-path
  rule: #227. The delivery-page ban dates from 2026-09-16: #109 round 3 found
  the page was HTML in a gitignored path nobody could open. A builder-written
  account beside it is *"not an issue at all"* (2026-09-16).

## Pull requests and close-out

- Bugfixes never stacked: 2026-08-20. Rule 1 is the explicit PR request:
  2026-09-10.
- Rule 4's `Oracle source:` read `trivial` until 2026-09-25; the fenced
  `plan-provenance` block and its parser were retired that day (#103, #110).
- The UAT section replaced the `docs/tests/UAT/` file: 2026-10-21. `/uat`
  walkthroughs: 2026-08-21.
- `pr-ready.mjs` went with the #89 cut, having never run. New clean-pass
  shapes went to David until 2026-10-21. Stall-to-outage: 2026-10-29.
- The Repl sync on every merge: 2026-09-04, after one was skipped on a
  settings-only merge to a paused repo.
- No PR waits for his click: 2026-09-14 — the click was never once withheld
  and cost a round trip each time.

## Git constraints

All-branches force-push block: 2026-09-16 (#106), closing a one-day gap the
#89 cut opened; the separate `claude/**` ruleset (#94) was removed 2026-10-03
as redundant. Measured 2026-10-03 on DojoOS: `--force-with-lease` refused with
GH013 on `claude/ruleset-probe` and `probe/ruleset-probe`. Every change to
`main` through a PR, and the Admin bypass removed everywhere: 2026-10-03
(*"Yes, everything goes through a pull request."*); his direct Replit pushes
were sanctioned until then. The shell guard went in #94: no accidental
destructive command is on record, and the only force-push event is one where
the guard prevented fixing a corrupted commit message.

## Waiting

Rule 0 (2026-10-21), after a turn ended on *"Starting #730 now"* with no tool
call. Rule 4 (2026-10-29), after Overhype.me #781's review read Running for 78
minutes and a bare re-request finished it in under four; 56 pairs across
Overhype.me and DojoOS (2026-10-20 to 10-29) had median 1.5, p95 6.0, longest
7.8 minutes.

## Model and routing

Fable to explore, Opus to build: 2026-08-28, superseding 2026-08-15's
constant tier. Opus for all building: 2026-10-03 (*"Now that Opus 5.5 is out,
it's strong enough for any development work"*); Opus the ceiling: 2026-10-04.
#582 is the one-line change that broke everything. The `opus` pin was
measured not to prove the running tier on 2026-08-28. Named judgements were
narrowed from "every judgement" (2026-08-17) on 2026-10-04; the adjudicator
went in the #89 cut. Double binding of Claude roles: #126 — two roles named
for Fable had run as the dispatching session's model. Both loops advise:
2026-09-17 (code) and 2026-09-18 (planning). `tools:` as an upper bound and
definition caching: measured 2026-09-16; a tool list was once described as
read-only with a write tool on it (#109). The model self-report over
observation: David, 2026-09-19 (an observation is available per the harness,
measured 2026-09-18, and judged not worth building).

## Connectors

Replit Agent billing by last-typed mode: measured 2026-11-01. Astra by name:
2026-09-17. Sign-in first: 2026-10-29 (*"As soon as you set up for any work
in any repo, the first thing you should do is have me sign in to Astra."*);
the background-command wake measured that day (KITT #252). Code in its own
fenced block: 2026-09-25. An obsolete plan-assessment description was left
three hundred lines below the rule contradicting it (Codex, #124 round 8).

## Standing rituals

Always sweep prose: 2026-09-27 (*"Always use the sweep tool with prose"*). #168
measured a hand sweep across twelve files missing the canonical plan rule in
`agent-working-rules.md`. The #89 cut removed every ledger the process-health
numbers used to come from; adjudicator verdicts and guard incidents were
dropped rather than re-sourced.
