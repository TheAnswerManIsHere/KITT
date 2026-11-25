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

**Target and result.** The brief targeted ~40 KB. The result is 135,945 →
~95,400 bytes (−30%). Both assessors found the remaining text is rules, with
no rule lost; what is left to cut is either repetition across sections (the
same exemption lists restated in several places) or moving rules themselves
to on-demand docs. Neither is "history moved", so neither was done here; the
choice is put to David. Phase 2 did **not** meet its size target.

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
  had replaced the plan-review PR. Until 2026-11-25 it pasted the complete
  plan in chat at approval. David: *"For the version that Fable and Astra are
  working with, keep all the detail (except for duplication that is not
  necessary). For the version that I review and approve, I want the simplified
  version."* His choices, by numbered option: the Summary has six items in
  about 250 words (Problem, What you get, What it leaves out, Questions for
  David, How you'll check it, Costs and risks that are yours) and is the
  plan's first section; approving it approves the whole plan; the full plan is
  sent on request. For the detail: one copy of the scope block, no Repo
  Context Inspected, Current and Runtime Behavior folded into Proposed Design,
  sections that do not apply left out — and **Proposed Design is not capped**,
  on my recommendation that it is where the reviewer finds real problems. The
  template lets the questions run past the 250 words; he was not asked that.
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
7.8 minutes. The contract's 15 minutes is about twice that longest pass;
re-measure before re-tuning it.

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

## Skills (the 2026-11-25 diet)

The seven largest skills were rewritten rules-only the same day; what each lost as history is below. Full prior text: `git show e6e48f6:core/.claude/skills/<name>/SKILL.md`.

### pr-watch skill

History removed from `core/.claude/skills/pr-watch/SKILL.md` in the contract diet (rules unchanged).

- **Size / #89 cut.** The file was 1,182 lines before the #89 cut; most was mechanics for retired machinery (budget cadence, receipt shapes, snapshot recipes, round-count recovery, adjudicator dispatch), deleted with their scripts. The two assessments went live with #96. Shared-vocabulary references were deferred to the rulebook rewrite beside #92.
- **Draft-first flow** retired 2026-10-21 with the UAT file it existed to name; every PR now opens non-draft with `## UAT` in the body.
- **Class-level sweep restoration.** The #89 strip removed the old reply section (mostly a duplicate of `claude-core.md` rules 5-6), but the class-level sweep lived only here and rule 6 still pointed at it, so it was restored in step 5. The four-line `Class:` / `Worth:` / `Oracle:` / `Result:` reply form and its two escape valves were retired by rule 6 on 2026-09-17 (David: the form made declining more burdensome than fixing); replaced by step 5's proportionate-evidence rule.
- **Two classes outside the loop**: David, 2026-09-25. Registry PRs: no subscription/labels (Codex, #168 round 7).
- **Trivial P1**: David 2026-10-21 made a P1 mine to judge and report (until then it held the merge for him); registry PR reads the pass for nothing (David, 2026-10-20).
- **Step 1**: subscribe on any tier — David 2026-08-15, retiring the Sonnet gate. `/document` harvest PR subscription gate: Codex, PR #458 round 1.
- **Step 3**: two-review limit retired 2026-10-21 (David). Review gate: KITT #293. Private-path plan oracle / clean-round assessment: David 2026-10-12; clean-round FYI-and-decide: David 2026-10-21.
- **Step 3.3**: `fable-review-assessor` named explicitly because the step used to say "as a subagent" and every dispatch was improvised (#126). The first version of the shared brief shipped Astra's brief unchanged to the subagent, so it read that it discussed with Fable and that Fable settled ties.
- **Step 3.4**: recipe once showed one command with both scope flags optional, which posted a follow-up header naming no findings (Codex `4051974432`, #131 round 2). Model-mismatch FYI: David 2026-09-18, *"a highly visible warning"*. Before #131 round 4 the disagreement rule said to name the pin first "unless something rules it out" — a judgement where an observable was available. Effort: measured on that PR's round 1, the assessor answered `at unable to name` because its context shows reasoning effort as the number `80`.
- **Step 3.5**: follow-ups costing no commit/Codex round measured on #120 round 6, the first time either was run. The new-path requirement for Fable continuations: Codex, #120 round 7 (did not bite on the one live run only because the subagent chose that path). `k` counts attempts: Codex, #120 round 8, deferred to #122; Fable held the tie-break against clearing the destination. That asymmetry is why the Astra package took three rounds of guards and the Fable side none. The separate evidence input was removed on #120 round 6 (it flattened multi-line output under an unvalidated label). On #120 round 5 a question about David's own ruling was closed by my pre-registered default and the loop carried on.
- **Sign-in first**: David 2026-10-29. **No clock**: David 2026-10-21, retiring #120's six-hour stop: *"everything that stops you from working is a problem for me"*.
- **Step 4**: two-review limit, its three-question shortfall exit, ask-to-reopen and review-loop PR hand triage retired by David 2026-10-21: *"everything that stops you from working is a problem for me ... I'd much rather have you use up too many tokens accidentally occasionally than keep delaying our ability to build"*. Prior for record-the-gap: the 2026-09-19 measurement, 57% of later findings landed on an earlier round's fix. Gap labels without `queue:`: David 2026-09-28; until then gaps were filed `queue:later`, which `/next` read as wanted work (Codex on Overhype #622). `/maintenance` step 9 triage on my recommendation since 2026-10-21 (previously each line waited for his approval). Codex #140 round 3: this branch once escalated every second-review finding, which would have made each internal PR a David-gated stop; the limit enacted until 2026-10-21 existed because he said looping overhead slowed him down.
- **Step 5**: on #553, twenty-plus replies across five rounds read as thorough and ran zero commands. The load-bearing-prose bullet was motivated by a reply on file in KITT #113.
- **Step 6**: the rule once said a prose-only push "waits and rides the next behavioural round", so a docs correction could never merge under the write-gate (#125 waited a week); changed by Astra 2026-09-19. "No review is the last by number": David 2026-10-21. Observable flip conditions: #85, 2026-09-13 — on #83 a judgement-shaped pair was crossed twice and caught once (by the round translation), while #85's observable pair fired twice and decided both times. Branch head not SHA: David 2026-08-17. Stalled-pass rule: David 2026-10-29; clean pass as comment measured on KITT #253. Where 15 minutes comes from: 56 request-to-completion pairs, Overhype.me #736–#781 and DojoOS #36–#56, 2026-10-20 to 2026-10-29 — median 1.5 min, p90 3.8, p95 6.0, p99 7.3, longest 7.8 (Overhype.me #779, a findings round); clean passes 0.7–2, findings rounds/large diffs 2.5–8. A code-review row stayed Running on Overhype.me #781 for 78 minutes (a re-request finished in 3.5) and on three DojoOS prototype-phase PRs that merged without it, one still Running after 255 minutes.
- **Step 7**: build report per unit replaced the per-round translation (David 2026-10-21). No page: David 2026-09-16; there was one, and #109 round 3 found it was HTML written to a gitignored path nobody could open. Private-path relay: #227. Brief-as-path unreachable measured on #222's interim account (rebuilt coordinates from the PR) and #131 (wrote to a guessed filename). `run_in_background: false` measured both ways. Own account labelled as mine: David 2026-09-16. Dispatch refusal/staleness measured 2026-09-16. Model not observed: David 2026-09-19 (not worth building). `git status` after dispatch: Codex, #109 round 9, P1.
- **Step 8**: `pr-ready.mjs` (readiness receipt) is gone.
- **Labels**: self-merge at close-out: David 2026-08-15. Carve-out exception retired David 2026-09-14. No count/class sends a PR to him: David 2026-10-21. The `test-run-completion.yml` Action (built on PR #334, when file deletion was the completion signal and no agent owned the moment) retired with the TEST_RUN file pattern on 2026-08-15. Straight-to-close-out finishes to `stage:done`: David 2026-09-25 — the line once said `stage:done` was David's to set, nothing ever asked him to, so every no-UAT workstream stayed open for good. Tier A closing comment aiming David: David 2026-08-09, moved from the State of Play.

### uat skill

- **2026-08-21 (David):** the UAT script became the script Claude drives in chat; previously David read a markdown file alone beside the app, kept his own place and remembered failures. Same date: the Artifact page for the script was retired (it existed because he read alone); setup became Claude's; the fix for a failure starts immediately while context is hot; the notification carve-out for active runs; browser automation for mechanical steps first requested.
- **2026-08-22 (David; #554, #560):** one format, one rule for steps. The first version of the skill inferred coverage from each doc's shape and failed (six-plus regression-section conventions, eleven docs with no numbered steps): it passed every feature step, declared `Accepted`, never ran the sweep. A false pass made the session worse than the file it replaced. Same date: the legacy deletion rule for completed UAT files.
- **2026-10-04 (David):** "anything mechanical is truly verified by scripting" — David's share is judgement only.
- **2026-10-07 (David):** lanes decide who verifies each step.
- **2026-10-14 / 2026-10-15 (David):** asked again for browser automation after screen checks reached him; 2026-10-15 rule: lane read from `Expect` clauses and who can perform `Do` — quote: *"any tests that require checking that a button exists or an error message is showing or any other UI element testing that doesn't require taste input from me"* run automatically. Until 2026-10-15 the browser section said it waited on an admin identity that is not David's login; settled by the consumer's per-PR browser test identity (Overhype.me #631 increment 2). The setup bullet previously called the missing admin session "the same limitation that made admin click-throughs UAT-shaped". Measurement before the rule: Overhype.me #685's run, 2026-10-15, two `human` steps read from the screen in Chromium in fourteen minutes once David asked.
- **2026-10-16 (David):** the `capture` lane; Overhype.me #631 increment 8 built the first capture declaration.
- **2026-10-17 (David):** what an AI-generated image shows (beyond universal checks) is always David's judgement.
- **2026-10-21 (David):** the script moved from `docs/tests/UAT/` files to the PR body's `## UAT` section; the 2026-08-22 deletion rule retired with the file ("Nothing is deleted"). Until then discovery globbed the directory first and filtered by label second, so merged runs not at `stage:uat` surfaced as held; the second "held" query replaced that net.
- **2026-11-02 / 2026-11-04 (David):** alert-hook ring rules referenced in notification discipline.
- **2026-11-13 (David):** `/uat` runs a machine check only when nothing earlier in the lifecycle ran it — *"All the other tests that it runs should have already been run as part of the standard development lifecycle."* Until then the `ci` lane re-confirmed checks on the commit under test, repeating the gate. Same date: the `Lifecycle gaps` line (Claude's recommendation, approved: log each authoring error so `pr-docs` learns).
- **2026-11-17 (David):** *"just do what is needed"* — paid captures run within the monthly budget without asking.
- **2026-11-21 (David):** start from this session's own finished work — *"The very first thing it should do is check to see if there is work that has just been completed that needs to be tested, rather than going and searching for every possible thing that could be tested … If it's activated in a new session, then it should do what it does today."*
- **2026-11-23 (David):** static step IDs — *"the test steps should be numbered in the same way that questions you ask me are numbered so I can respond to them accurately. Let's use T1, T2, etc."*
- Teardown worked example: Overhype.me PR #443's script (budget gate failing closed) lowers `budget_limit_legendary_usd` and restores it. Durability rationale (kept in skill): written after setup, a crash between mutation and checkpoint loses both the original value and the teardown obligation.

### plan-review-loop skill

- **Pre-draft recipe.** An earlier form used the assessment command (`--kind assess --plan`) before any plan existed, so it refused; a later correction used `$S` before anything assigned it, which sent the script looking for an oracle at the filesystem root. The scope `--prompt-only` form with the oracle path written out replaced both. All three recipe failures were caught by full Codex rounds in #124, and `plan-review-recipes.test.mjs` now runs the recipes.
- **Detached launch quoting.** The `bash -c` line produced three findings in seven rounds: a space (#124 round 5), then `$` and a backtick (round 12). Measured in a directory named `repo$cash`, the inner shell expanded `$cash` to nothing, `cd` failed and the script never ran; a backtick executed part of the path. Round 5 took a pair of quotes instead of the positional shape the reviewer and Astra offered. The Fable assessor, who had recommended the quotes, later revised: *"it did not regress; it was incomplete."* Round 12 adopted positional arguments.
- **Exit marker.** It was once a single `run.exit` per slug. Round 2's launch found round 1's marker and reported completion before starting. In the loop's own live run, `run.exit` held `0` with the discussion's finish time, three minutes after the assessment it had overwritten. Per-round naming plus `rm -f` before launch fixed it. Exchange timing: 522 s hand-run and 576 s scripted at `xhigh` (~9–10 min).
- **Discussion marker.** The text once claimed "a retry cannot mistake an earlier marker for this one's completion". That held per discussion but not per attempt. Codex and both assessors caught it in #124 round 2.
- **Ledger `[]` rule.** The bullet once read "an exchange that raised nothing still writes `[]`", which would silently wipe existing concerns. Codex caught it in #124 round 9 (`4049773962`), and both assessors concurred. It is the wholesale form of round 7's rule that a concern may not drop its text.
- **Discussion changing the other party's position.** Astra raised this in #124 round 10. The discussion file was added to the next assessment's package (round 10, `4049965628`).
- **Technical fork vs David's choice.** Astra, assessing the change, found that the two instructions contradicted each other and either could fire. The fix carves technical forks out of David's choices.
- **Scope additions.** These have been taken as *next* and reported since David, 2026-10-21. Before that, every addition was a now/next/never question.
- **Feedback reading rule.** David, 2026-11-14 (claude-core interaction rule 15). It was written for readings folded into the revised plan.
- **Status labels.** The old loop had two status labels that computed "could not do the job". Prose replaced them.
- **Sign-in first.** Every session signs in first (David, 2026-10-29).
- **No page.** David, 2026-09-18, retiring the Artifact page of 2026-09-09. That brought the plan loop in line with the code-review loop. The `SendUserFile` ban belonged to the page.
- **Plan committed at approval.** David, 2026-10-12 (claude-core Planning rule 3). Under "the plan is never published" (2026-09-09 to 2026-10-12), a plan lived in one container's working tree and was lost with that container (Overhype.me #631).
- **Digest from the file, not `planSha256`.** Under the old loop the two were the same, which forced another round after every revision. Codex and both assessors raised this in #124 round 1.
- **`plan-provenance` block.** A fenced block and its parser stood until 2026-09-25, when both were retired (#103). The block never gated approval either, which #124 round 9 had already had to correct.
- **Retired-mechanism table: "why it existed" column.** The `[PLAN REVIEW]` PR existed because the reviewer was remote and diff-anchored. GitHub round counting existed because round state lived on GitHub. The budget and record scripts were keyed to a PR number and were cut in #89. The review-PR disclosure gate existed because the channel was public. The three-round minimum and the adjudicator existed because a defect-only reviewer could not say *done*. The JSON schema enforced "every section every round". `convergence()` existed because Astra's verdict drove the loop. Prior findings as ids existed because of anchoring worry. Reconcile-or-reject existed because the stop rule read the reconciliation. The fresh lens existed because convergence measured consistency, not quality. The `internal` critical-flaw threshold was a rubric that decided. The Artifact page existed because a plan had no single URL once the PR went.

### status-all skill

- **Context:** David runs ~10 concurrent sessions and can't tell which need him without opening each; the skill exists to answer that from outside any session, cold.
- **test-run-completion.yml retired (2026-08-15)** with the TEST_RUN file pattern; it had been the one automated exception to "read-only". The `stage:test-run` → `stage:uat`/`stage:close-out` transition became `pr-watch`'s close-out sequence.
- **Projects v2:** the absence of any tool that reads/writes Projects v2 field values was confirmed by direct search while building `scripts/sync-project-fields.mjs` (PR #318/#322).
- **`waiting:replit` stopped being a David-gate on 2026-08-15**: David used to run the TEST_RUN checklist and relay results; the post-merge run is now agent-driven through the Replit connector in close-out. `/status`'s five-state table made the matching move the same day; that table was retired 2026-10-23 when `/status` became a briefing for David, leaving the label as the one place the distinction lives.
- **Plan review moved in-session (2026-09-09).** Before that, the plan loop's multi-subsystem path opened one plan-review PR per subsystem and ran them in parallel, so multiple open `Workstream:` matches were expected at `stage:planning`/`stage:plan-approval`. Since then planning stages have no PR at all.
- **Planning-stage "no PR is healthy" paragraph** came from Codex, #69 round 1 (a healthy planning workstream had been read as stalled).
- **Live-session sweep (Step 3b)** was added after a `/next` in one session started a plan amendment another session was already holding for David's approval (David, 2026-11-04). Measured the same day: a session read `SESSION_STATUS_IDLE` with `SESSION_STATUS_BUCKET_WORKING`, the basis for "a working bucket does not guarantee recent activity".
- **Login vs signature:** that Claude posts under `TheAnswerManIsHere` was confirmed from the introducing PR's own reply-thread history.
- **Stall example:** #281 sat six days — Codex posted round 2, nobody replied, the session ended.
- **"Never assert a reviewer's state from a gate":** the plan-approval example once read "plan v3 delivered in chat, nothing outstanding with Astra, waiting on your approval", false under `settled-over-dissent` (Codex, #124 round 8, `4045616307`).
- **UAT location:** PRs merged before 2026-10-21 kept UAT scripts in `docs/tests/UAT/`; later ones carry a `## UAT` section in the PR body (the date is retained in the skill as a condition).

### maintenance skill

- **No model switch:** the *Fable to explore, Opus to build* rule dates from David, 2026-08-28.
- **Dispatch bar wording:** two earlier versions were wrong. The first excluded the triage judgements from *Sonnet* delegation and said nothing about Fable, which left them undefined once the always-Fable rule landed (later narrowed to the core's named judgements, 2026-10-04). The second marked them "unclassified", which would have created a standing follow-up every week (Codex, #504 rounds 2-3).
- **Step 1.3:** the merge of green grouped minor/patch PRs was originally the one merge I did myself (David, 2026-07-22). The general self-merge rule absorbed it on 2026-08-15.
- **Step 2:** the Sentry recipe was verified 2026-07-23 against Overhype.me's organization. That org was only the test case, not the slug to use.
- **Step 6a:** the batched Type 2 harvest dates from David, 2026-08-20. The mechanical window boundary came from Codex, #543 round 2, and the always-produce-a-marker rule from #543 round 3.
- **Step 6b, meta share:** this number started the 2026-08-20 review, when it ran about 70% meta over three weeks.
- **Step 6b, planning loops:** they stopped being countable from GitHub per Codex, #69 round 1, and have reached David in chat since 2026-09-18. The old dual inventory existed to stop review cost from being understated.
- **Step 6b, ledger:** the ledger was dropped in the #89 cut (2026-09-16), which also removed the receipts, verdict files and position caches.
- **Step 6b, build-report counts:** David, 2026-09-12. These replaced the round translation on 2026-10-21.
- **Step 6b, other counts:** recorded dissents date from David, 2026-09-03. Decisions taken on recommendation and reversals date from David, 2026-10-10, with the reversal-window rule from Codex, Overhype.me #639 `4243652055`, and KITT #197 item 2.
- **Step 6b, token price refresh:** David, 2026-10-11, and KITT #194 round 4.
- **Section 8:** added 2026-08-12, after a one-off audit found about 24 stale branches. They piled up while auto-delete of head branches was off; David has since turned it on. The same audit (verified 2026-08-12) found `claude/test-run-checklist-structure-lsxraz` with three PRs. `claude/pr-250-merge-conflicts-8m5oqs` had no PR, and its 4 commits were captured nowhere else.
- **Section 9.2:** David, 2026-09-16, #98. On 2026-09-25, ten issues filed over the previous eight days had no labels at all. `pr-watch` files gaps without `queue:` per David, 2026-09-28. The labelled-issue author rule came from Codex `4179907563`, #185.
- **Section 9.4 and 9.6:** before David, 2026-10-21, long chains were a park-or-continue question to him, and each line of the diff waited for his approval.
- **Section 10:** the evidence behind it is PR #488, where judgment-shaped stopping devices went 0-for-15 and mechanically collided conditions went 2-for-2. That evidence once produced the round-budget guard, which is now gone. The #89 audit deleted about twelve thousand lines of checks that never changed a decision. Step 3 was a decision item for David until 2026-10-21. The latitude-naming rule for permission and ruleset changes is David, 2026-09-14.
- **Report delivery:** this used to cite CLAUDE.md's combined Artifact-delivery paragraph. That paragraph was retired, and only its UAT-specific rule survives, as claude-core Pull requests rule 5.
- **Boundaries:** until 2026-09-25 the docs PR ran the two-review limit's Codex loop. Bugfix mode once batched. Backlog-hygiene lines needed David's approval until 2026-10-21. The no-self-wakeups rule used to rest on the blanket no-background-check-ins rule; since 2026-08-15 it rests on the bounded *Waiting, and scheduled check-ins* contract.

### next skill

- **Untriaged `gap` issues are not candidates** until triaged in `/maintenance` — David, 2026-09-28.
- **Independent open-PR sweep** (orphan PR, stale-stage PR) was added after two real misses on 2026-08-19: PRs #515 and #513.
- **Live cloud session sweep** — David, 2026-11-04, after a `/next` in one session started a plan amendment that another session was already holding for his approval.
- **One prototype environment per product; a second branch-regime prototype is Blocked, never a parallel lane** — raised by Codex in #168, round 7.
- **Unopened phase ranks at its parent's position** — the resulting order ("start Phase 5 of NCMEC" above fresh features, below a hanging code-review loop) is the ordering David asked for.

### bugfix skill

- **Routed entry** (David, 2026-08-09) replaced explicit-only `/bugfix` invocation. Ambiguous cases: "no entry design settles these; they were always going to be asked."
- **Mid-feature bugs in an isolated worktree** (David, 2026-08-09): routed entry meant bug reports could land while a feature branch had in-flight work.
- **Never `-B`**: a GitHub ruleset blocks force pushes on every branch, so the push would be refused anyway; the local reset is what loses the work.
- **Disclosure check before the workstream issue** became a shared-contract requirement rather than Claude-specific.
- **UAT-found bugs**: the most common way a bug arrives; the danger is losing the interrupted UAT. `/status-all` was deliberately left unchanged (doesn't parse `Blocked by:`), hence the `waiting:` flip. Without the parent mirror, the parent sat at `waiting:david` for the whole descent. Tier C example: the PR #213 → admin-permission shape.
- **Model tier** (David, 2026-08-28) superseded the 2026-08-15 constant-tier rule: diagnose on any tier, ask for Opus before the fix. The Tier B Opus-verification sub-bullet came from Codex review round 3, and called stopping for an Opus session "the one surviving switch ask" (survives because the work is reserved, not convenience).
- **PR immediately**: the "create the PR" gate went with batching.
- **Never draft** (2026-10-21): the draft-first flow that learned the PR number for a UAT file is retired; the UAT moved into the PR body's `## UAT` section (David, 2026-10-21) — previously a file named after the PR number, which forced draft → commit file → ready.
- **Stacked-PR retarget**: a documented prior incident (repo review-workflow notes) showed a stacked PR orphaned by merged-branch auto-deletion; that record's workflow says retarget before squash-merge. Stacking otherwise defeats the one-bug-per-PR isolation "this whole redesign is for."
- **Decisions taken on my recommendation**: *A reversible choice proceeds* dates to David, 2026-10-11; the #197 sweep found the passage stating the rule without its regression-test exclusion.
- **uat-doc-format** exists because "match the nearest merged PR's section" had accumulated six competing conventions.
- **No Artifact page** (David, 2026-08-21, retired); standalone TEST_RUN file retired 2026-08-15.
- **No model gate on PR watching** (David, 2026-08-15): the Sonnet gate and the switch-ask it forced were retired.
- **Review loop**: in-loop continue/stop, criticality gate, count trend and oscillation diagnosis retired; the external adjudicator was replaced by the shared judgement (#96). The section once carried a "never resolve threads" rule for two months after David reversed it (2026-08-06) — why it is a pointer, not a copy.
- **Review weight**: several `known-failure-patterns.md` entries were caught by review after the shipped tests passed.
- **Internal-loop bullet**: the two-review limit stood 2026-09-20 to 2026-10-21 (record in `working-modes.md`). Until 2026-09-23 the bullet read "the internal tier governs (David, 2026-08-21) … the two-review limit, the same as everywhere" — naming the tier as classifier and the limit as universal. It also once said "where only a critical flaw is written for", the tier's retired decline quota.
- **Review-findings batches** (David, 2026-08-09): PR #334, nominally a bugfix but eleven batched findings — 21 rounds, 69 findings, 72% self-inflicted, no breaker fired.

## Rules that load on demand (2026-11-25, the second pass)

David approved moving five groups of mechanics out of the always-loaded
contract (his answers to Q4 through Q8, on Fable's review of the options;
Q9, the alert hook's text, stays). Each rule's statement stays in
`claude-core.md`; what moved is how a step is carried out:

| What moved | To |
|---|---|
| Close-out's step mechanics, the unreadable-review shapes, the two reads no gate proves | the new `close-out` skill (Devon) |
| The ruleset list, the command table, the Repl-ahead and prototype-sweep procedures | `core/docs/ai-context/git-constraints.md` |
| Agent billing detail and the read/act channel mechanics | `replit-platform.md`, *Working through the connector* |
| The build report's section list, relay and trust wording | `pr-watch`, step 7 |
| The tier-check detail, the double binding, package limits, the Fable definition's tool list and caching | `model-routing`, its last section |

Measured: `claude-core.md` 95,860 to 87,934 bytes. Each moved passage went
to its destination verbatim, taken by line range from the file at `fe96604`,
so the pre-move text is `git show fe96604:core/.agents/core/claude-core.md`.
The risk accepted is the one Fable named: a moved mechanic applies only when
its home is read, so the contract keeps every rule's statement and names the
moment its home is loaded (before every merge; before any git operation
beyond a plain push).

## The build report becomes on demand (2026-11-25)

David: *"We should eliminate the build report unless I explicitly ask for it.
Maybe we should create a new skill called /buildreport … Even then, it should
be much smaller than it is now."* He then ruled on each section in turn (Q12
to Q20):

| Section | Ruling |
|---|---|
| Needs you | dropped — the 🛑 banner covers it |
| What was built | kept, at most three sentences |
| Decisions taken on my recommendation | only those the reader questions |
| Where it disagrees with the builder | kept, with "Agrees" otherwise, in simpler plain English |
| Shipping unfixed | only those the reader calls unreasonable |
| Overbuilt | kept, only when it holds something |
| Where we are | replaced by one sentence, **Next**, so `/next` need not be re-run |
| Session line | dropped; no archive check runs after a merge |
| Evidence and caveats | Evidence line dropped; the two caveats kept, only when they apply |

Decided on the builder's recommendation, not asked: the report goes to chat
only, no longer to the workstream issue; and a branch unit's lower bound
(`--since`) is now read from the previous version's merge report or
hand-back, since no earlier build report need exist.

What was given up, said to David before he decided: the build report was the
only account of a unit not written by the builder; on demand, nothing
independent checks a unit unless he asks.
