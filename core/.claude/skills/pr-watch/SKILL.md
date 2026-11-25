---
name: pr-watch
description: Use after opening or being re-engaged on any PR, and whenever a github-webhook-activity event arrives for a watched PR. Implementation PRs only — plan review runs in-session and opens no PR.
---

<!-- SYNCED FROM KITT — do not edit in a consumer repo. Local edits are overwritten by the next sync and their reasoning is lost; change KITT instead. -->

# Watching the PRs I open

**Not a prototype-phase PR.** It merges in the same turn it opens (or, on a
`prototype/<feature>` branch, there is no PR; on `main` its body carries
`Review class: prototype` for the review gate, `claude-core.md`, *Shared
judgement on a review round*), so nothing here fires for it:
no subscription, no labels, no rounds — save step 7's build report, which
the `prototype` skill dispatches at each version's close-out, whichever
regime the version ships under. **Nor one of the phase's one-line
registry PRs** — at a prototype's start under the branch regime, at its flip
and at its abandonment — which are Trivial by David's phase declaration,
carry `Refs #N` rather than `Workstream: #N`, carry `Review class: registry`
for the review gate, and own no lifecycle: no subscription, no labels. The
rule is working-modes.md, *The prototype phase, per feature*.

Budget cadence, receipt shapes, snapshot recipes, round-count recovery and
adjudicator dispatch are gone, with the scripts they drove; none is rebuilt.
The two assessments are step 3; neither of them binds, and what happens next
is the action step 6 states. Every PR opens non-draft with its `## UAT`
section in the body (`uat-doc-format.md`). The class-level sweep that
`claude-core.md` review-loop rule 6 points at is stated here only, in step 5. A
step below that reads thin is thin on purpose.

**Two classes do not run this loop** (the rule is in `claude-core.md`, *Two
classes and a phase that leave the loop*). I still subscribe to them (step
1) — except the phase's registry PRs, top of this file — and every Codex
thread is still resolved, because the ruleset requires it.

- **Trivial**, declared by David alone: no review requested of anyone. Read
  Codex's automatic pass for a P1 only; a P1 I judge and report — fixed in a
  named commit, or merged with the reason in the merge report — except on a
  phase registry PR, where the pass is read for nothing, P1s included
  (`working-modes.md`, *The prototype phase, per feature*). A sync PR
  delivering KITT's payload is Trivial by his standing declaration
  (`working-modes.md`, *Trivial*; the `sync-fleet` skill). Its body carries
  `Review class: trivial` or `Review class: sync` on a line of its own, or
  the review gate fails it (`claude-core.md`, *Shared judgement on a review
  round*). Resolve each thread with one line citing his ruling, then merge on
  green CI.
- **Documentation**: one pass, `review-proxy.mjs --documentation --round 1`,
  with the Fable assessor dispatched on the same package (`--prompt-only
  --source fable`). Wait for Codex's automatic pass first — its review-summary
  row reading **Completed**; a draft is reviewed only once marked ready — and
  pass its inline findings as `--findings-file` (step 3's findings shape), so
  both assessors weigh them, or `--codex-clean` when it reported Completed with
  none. The script refuses a pass given neither. It never proceeds without
  that pass: a pass still Running at its 15-minute check-in gets the one
  bare re-request, and a second stall is the outage in *One standing stop*,
  below (step 6, *A stalled pass*). The range is derived from where the
  reviewed commit left `main`; nothing is typed. **The oracle file is the
  decision the prose records, quoted** — David's words, or the issue or
  merged PR where the rule changed — so a docs sweep needs no new agreement
  from David, and step 3's 🛑 on a missing oracle applies only when no such
  decision can be quoted. Both assessments are posted verbatim (step 3's
  mechanics, using its documentation render command, with the same
  `--findings-file` or `--codex-clean`). I write one batch, answer each Codex
  thread as review rule 6 answers any finding — fixed in a named commit, or
  declined with the reason and the assessment it rests on — resolve it, and
  merge on green CI. No second pass. The merge report says what the batch
  changed, in my words, and the build report follows it (step 7).

## The loop

1. **Subscribe, immediately, on whatever tier the session is on.** There is
   no model gate and no tier gate. An open PR I created and am not yet
   watching gets subscribed the moment I notice it, without David re-asking.

   **Three exceptions, and none is optional.** A prototype-phase PR is never
   subscribed, and neither is one of the phase's one-line registry PRs (top
   of this file). And a `/document` harvest PR is subscribed only at step 5 of
   [`documentation-workflow.md`](../../../docs/ai-context/documentation-workflow.md),
   after the workstream issue exists and the PR body's `Workstream:` line
   points at it. Subscribing performs label writes, so subscribing early
   labels an untracked draft against a missing or wrong issue.

2. **Read live PR state on every event.** One batched `pull_request_read`:
   threads, CI, latest commits. **Never judge a webhook event from its text
   alone** — webhooks lag, drop CI successes and arrive out of order, so
   silence is never "all clear". An echo of my own comment still gets the
   silent live-state check and produces no output on either surface.

3. **Get two independent assessments, then decide.** Every round that returns
   findings, before anything is written for them, on every tier. The rule is
   `claude-core.md`'s *Shared judgement on a review round*; what is here is how
   it runs. What ends the loop is my judgement from the two assessments, under
   the write-gate and the ship gate — never a count: the two-review limit is
   retired ([`working-modes.md`](../../../docs/ai-context/working-modes.md#the-two-review-limit-on-autonomous-iteration-david-2026-09-19)
   keeps the record) — and step 4 below is where that judgement is made. The
   write-gate rule
   ([`working-modes.md`](../../../docs/ai-context/working-modes.md#the-write-gate-rule-code-written-is-code-reviewed-david-2026-08-22))
   answers the other question — which heads must be reviewed, so that no
   commit merges unreviewed — and every step below serves both.

   **The review gate checks this from GitHub's record**: its `Review gate`
   status fails while a findings round lacks either assessment of the
   reviewed commit. Both assessments are posted before the first push of
   anything — a fix, a base merge, an unrelated commit — and the gate does
   not hold me to that: a push that lands before them anyway (a race with a
   review that arrived seconds earlier, or a mistake) is listed on the gate's
   run summary as a note, not a failure, and I disclose it in that round's
   `review-action` block (step 3.6). A failed gate is read on its run's
   summary: a missing assessment is posted, which re-runs it; David's waiver
   is asked for, as a 🛑, only when the assessors genuinely cannot run
   (`claude-core.md`, *Shared judgement on a review round*).

   **The oracle comes first, and it is agreed with David before round 1.** It
   is the outcome he agreed the work should achieve — an approved plan, an
   issue discussion, or an explicit request — recorded where it can be quoted,
   normally a comment on the workstream issue; for a plan that failed the
   disclosure check, the oracle file is the full text from the private item,
   and the assessors' brief keeps their posted quotes and paraphrases to the
   sanitized copy (`review-proxy.md`). That item is write-only to me, so a
   session that does not already hold the text asks David to paste it — a
   🛑, since the round cannot run without it — and writes it to the
   scratchpad, never the repository (`workstream-tracking.md`). **Such a PR
   is also assessed when its round comes back clean**, once before merge
   (`claude-core.md`, *Internal tooling: what is downstream*). **No script
   mode runs that assessment yet** (KITT #206), and the documentation mode is
   not a substitute: it declares the Documentation class and applies its
   rubric to code. Until the mode exists, such a PR's clean round is a 👀 FYI
   to David saying the assessment it is owed cannot run, and I decide how it
   proceeds on my recommendation and report it. `assessmentBrief` refuses
   without one. **Reaching round 1 with no agreed oracle is a 🛑 to David, not
   a package I write myself.**

   **The six sub-steps** — collect the findings (3.1), write the oracle and
   history files (3.2), dispatch both assessors on one package (3.3), post
   both verbatim (3.4), decide and say so (3.5), and state the next action in
   a `review-action` block (3.6) — are [`assessments.md`](assessments.md).
   **Read it when a round returns findings, before anything is written for
   them.**

4. **Decide what is worth writing, then batch the fixes.** No count ends
   iteration and no round sends findings to David: the two-review limit, its
   three-question shortfall exit, its ask-to-reopen and the review-loop PR's
   hand triage are all retired. What decides, every round, is the judgement
   from both assessments under the Worth rule and the ship gate: once both
   say the oracle is met, a finding is a recorded gap unless it is a
   regression or reaches outside this pull request. From the second review
   on, record-the-gap is the ordinary answer, and a further batch is written
   when the judgement says it is worth it, with the merge report saying what
   was recorded and why. A corrected head that still violates an agreed
   requirement or fails a required check does not merge: I fix it or cut it,
   and report. What goes to David is only what step 3.5 names — intended
   behaviour, an accepted user-facing shortfall, where no settled decision
   already covers them — and the review gate's waiver when the assessors
   cannot run (step 3, above), and a
   change to the review loop is judged like any other. The usual outcome is
   **recorded gaps and follow-up issues**, and the pull request goes to
   close-out like any other. **A follow-up issue is filed with its labels**:
     `gap` and the workstream's `mode:`, and **no `queue:` label** — so it
     stays out of `/next` until it has been triaged; a recorded gap is not a
     candidate for work before that. The triage is `/maintenance` step 9's,
     applied on my recommendation and reported there; that step finds every
     gap by its `gap` label, which is why the missing `queue:` label cannot
     lose one. If the finding's consequence argues for sooner, that case goes
     in the body for step 9 to propose; a user-facing consequence he has not
     accepted is his under step 3.5 and never reaches this sentence. The
     label is in the shared vocabulary
     ([`workstream-tracking.md`](../../../docs/ai-context/workstream-tracking.md));
     GitHub does not create a label on first use, so a consumer creates
     `gap` by hand once, like every other label the vocabulary names.

   - **Everything being written for goes in one push**, with
     the repo's own fast checks run first: lint, format, typecheck, the
     changed suites. One validated push beats three speculative ones, because
     each push costs a full round.

5. **Reply to every finding and resolve its thread**, right after posting that
   reply, never in a batch, and never as a standalone summary comment in place
   of per-thread replies. The shape is `claude-core.md` review-loop rule 6's and is not
   restated here. What that rule points at and states nowhere else:

   - **The sweep is class-level, always.** A fix closes the class the finding
     belongs to, not the line the reviewer happened to land on, and a decline
     answers the consequence that class reaches at its worst. **Prose that
     sounds thorough is not a check that ran.**

   - **Where a command settles the question, it runs before the reply is
     written** and its real output is transcribed. Where the class is design
     judgement or naming preference and no command can enumerate it, the reply
     says so rather than going silent. **Neither is a fixed four-line form**:
     declining must not be more burdensome to write than fixing.

   - **The prose is held to the same bar as any evidence.** A sentence
     asserting a fact about the code — that an edit applied, that a flag
     exists, that a class has no other member — is a load-bearing claim under
     `claude-core.md`'s *A load-bearing claim is quoted, or it is marked
     unverified*: it quotes what was read, or it carries `unable to verify:`.

   - **A decline is recorded, not just replied to**: a row in the PR body's
     **Recorded gaps** table naming what ships unfixed and why, so the final
     round and David can see it in one place rather than inside a resolved
     thread nobody re-reads. The body's **Decisions taken on my
     recommendation** section is the same device for the reversible choices
     the build proceeded on without asking (`claude-core.md`, *A reversible
     choice proceeds*); a round that adds one adds a line there, under the
     canonical disclosure check like every record of one
     (`workstream-tracking.md`, *Sensitive / disclosure-carve-out workstreams*).

6. **Re-request review on the actual head.**

   - **Every changed head gets its review; an unchanged one never gets a
     second.** A prose-only push is a changed head and is reviewed like any
     other. What is refused is re-requesting on a head already reviewed as it
     stands, to get a different answer; a stalled pass reviewed nothing, so
     its re-request is not one (*A stalled pass*, below).
   - **No review is the last one by number**: the second review is where
     record-the-gap becomes the ordinary answer, and a further batch is
     written when the judgement says it is worth it. Only a changed head gets
     a review, so by the time a head exists here it is always reviewable.
   - **Pre-registered flip conditions, in the request itself.** Name, before
     the round runs, what would stop the loop. **Each names an OBSERVABLE,
     never a judgement** — something read off the round ("a silent omission",
     "more findings than the last round"), not something I decide in the
     moment having just read the finding ("needs a new concept"). The second
     kind does not fire. **A condition I have to interpret is one I will
     reinterpret.**
   - **One line naming what the round costs and what it protects**, in the same
     comment, before it runs. The bill is **conditional and the condition is
     the findings**: two assessments at roughly a hundred and fifty thousand
     tokens each **only if the round returns findings**, since step 3
     dispatches neither on a clean round — save the one clean round of a PR
     whose plan took the private path, which step 3 assesses anyway; the
     build report the close-out owes, once per unit of work; and my own
     turns either way. Then what is downstream if this round finds nothing.
     When that reads "a sentence in a comment two agents read", the
     disproportion is legible to both of us *before* it is spent rather than
     after. The token counts are already reported to me on every dispatch;
     this is putting them beside what they bought, not building a ledger.
   - **A fix I would only write because a round is already being written is
     not written.** Sunk cost is not a reason: the round already happening does
     not make the next one free, it causes it — and a fix written owes a round.
   - **Name the branch head, never a specific SHA.** Codex reviews the head at
     the moment it runs, not the SHA it was told, and the
     `**Reviewed commit:**` line it emits is what binds.
   - **The re-request says what to reconcile.** A bare trigger on a fix round
     invites a review of just the new commits, so the round context names which
     findings it was meant to close and asks for each to be confirmed resolved
     in the code, not merely responded to.
   - **The trigger comment carries no prose of mine** — the defanged trigger
     `atC0dex r3view` and nothing else (`claude-core.md` interaction rule 11).
     Round context and flip conditions go in a separate defanged comment posted
     just before it.
   - **A stalled pass: check in at 15 minutes, re-request once, then it is
     an outage** (the rule is `claude-core.md`, *Waiting, and scheduled
     check-ins* item 4). In the turn a review is requested — the trigger
     posted, or the PR opened or marked ready, which requests the automatic
     pass — arm `send_later` with `delay_minutes: 15`, naming the PR, the head
     SHA and "Codex code review pending". On the wake, a named SHA that is no
     longer the head is a silent no-op — the push's request armed the head's
     own wake. Otherwise one `get_comments` and one `get_reviews`: the pass has
     returned if a `chatgpt-codex-connector[bot]` review or PR comment carries
     `**Reviewed commit:**` for the head (a clean pass arrives as a comment,
     *"Didn't find any major issues"*), or the review-summary comment (`<!--
     codex-pull-request-review-summary -->`) has its 📝 **Code Review** row
     reading **Completed** against the head's short SHA — the hidden
     `codex-review-state:v1` block says the same as `"status":"completed"`.
     Returned is a silent no-op. Anything else — the row reading **Running**,
     no row, or a row for an older commit — is a stall: post the bare
     trigger `atC0dex r3view` at once, with no round-context comment, and arm
     another 15-minute `send_later`. A second stall on the same head is the
     outage below; a push in between makes it a new head and a first stall.
     The security review's row is not read for this. 15 minutes is about
     twice the longest measured pass (7.8 minutes); re-measure if the longest
     pass seen nears 15.
   - **Verify CI on the SHA that is actually HEAD**, not the one last looked
     at. `get_check_runs` returning `total_count: 0` means checks have not
     reported yet, which is not green and must never be reported as green.

7. **The build report: one independent account per unit of work, at
   close-out** (`claude-core.md`, *Watching the PRs I open*). Nothing runs
   per round. A unit is a PR's merge, or a prototype version delivered on its
   own `prototype/<feature>` branch, which opens no PR. A Trivial PR gets
   none. It is dispatched **after** the merge report hands back, never before
   a merge, and never holds one: it is off the critical path by design.

   **The build report.** One account per unit of work — a PR's merge, or a
   prototype version delivered on its own branch — written at its close by the
   independent Fable role `fable-build-report`, reading the whole unit from
   GitHub (the workstream issue and the plan or scope it holds, every PR and
   round, or the prototype branch's commits) rather than my account, in fixed
   sections in a fixed order, under 200 words in the common case: **Needs you** —
   nothing, or the one external thing; **What was built**; **Decisions taken on
   my recommendation**, each with its undo; **Where it disagrees with the
   builder**, **Shipping unfixed** and **Overbuilt**, each only when it holds
   something; **Where we are** — what we planned, the unit just completed, what
   is next; and **Session** — continue, hand off, or archive. The session line is
   **mine, under a label saying so**: the `archive` skill's verdict, run here
   unasked (deferring to the `handoff` skill's Step 1 for hand off), with the
   `handoff` skill run after the report when the answer is hand off — it starts
   the new session itself, or hands David the prompt and a 🛑 where it cannot
   (`handoff`, Step 5); only an explicit `/archive` archives. Delivered twice,
   verbatim: in chat, where it rings nothing; and as a comment on the workstream
   issue — **except a workstream on the private path, whose report goes in chat
   only**, kept by David pasting it into the private item; its plan and decisions
   reach the role as the item's text David relays, quoted in the brief under its
   provenance, never as my summary. A Trivial PR gets none.

   **The delivery is a message in chat, and there is nothing else.**
   `chatReport` composes it from the answer's own fields and I paste that
   verbatim, saying nothing else about the unit. **No page, no Artifact, no HTML,
   no link, no receipt store** — rebuilding any of them is forbidden.

   **Fable fetches the unit from GitHub itself** — issue, threads, comments,
   reviews, diffs, with only a private item's text relayed — from a brief passed
   inline (the role holds no file-reading tool), and writes its answer to a file
   the script derives, so **the role's account reaches David unedited**. My own
   write-up of a unit is welcome beside it, labelled as mine. **It is an
   independent assessment, not a guarantee**: it defends against my being
   *wrong*, never against my being deliberately misleading, and it says what it
   verified and what it took on trust. **A dispatch that fails is disclosed in
   plain English and never blocks the loop.** Mechanics: the rest of this step;
   `core/scripts/build-report.mjs` here, `scripts/build-report.mjs` in a
   consumer.

   **The deliverable is a message in chat and the same text as a comment on
   the workstream issue — chat only on the private path (step 4). There is
   no page. Do not rebuild one** — not an Artifact, not an HTML file, not a
   receipt store, not a link.

   **How it runs** (`core/scripts/build-report.mjs` here, `scripts/` in a
   consumer):

   1. **Write the brief and prepare the answer path in one call**:
      `node <dir>/build-report.mjs brief --unit <slug> --issue <n> --issue-title "<title>" --pr <n> --pr-title "<title>" [--pr <n> --pr-title "<title>" …]`,
      or for a branch-regime prototype version
      `--branch prototype/<feature> --since <sha> --head <sha>` in place of
      the PRs: `--since` is the previous version's head, read off the
      *Evidence* line of that version's build report — on the issue, or,
      on the private path, in the private item, which David relays — or
      the branch's base for the first version. The unit's slug names the
      answer file (`pr-231`, `ingest-v2`). **Every number carries its
      title, as read from GitHub**: the coordinates come back to David as
      the report's *Evidence* line, and a bare number tells him nothing
      (`claude-core.md`, interaction rule 14), so `brief` refuses an
      `--issue` without `--issue-title` and a `--pr` without its
      `--pr-title`, in order. Preparing clears any earlier
      attempt's answer and coordinates, so a re-dispatch that writes nothing
      reads as a failure, never as its predecessor. **A workstream whose
      plan is on a private draft Project item** — no public issue at all, or
      one that turned sensitive and keeps only sanitized tracking — is
      reported from **the item's text, relayed by David**: the item
      is write-only to agents, so I ask him to paste it (the plan and the
      decisions taken on recommendation), write it
      to the scratchpad, never the repository, and pass `--private-source
      <file>` with `--private-ref <the item's reference>`, in place of
      `--issue` or beside a sanitized one. `brief` refuses a source inside
      the checkout, quotes it inline under its provenance, and marks the
      unit private; `--private yes` without a source is refused, since the
      flag alone would point the role at a sanitized issue for the plan. The role still reads the PRs or branch from GitHub
      itself; only the plan side is relayed. With no issue and no source,
      `brief` refuses by name and says to ask for the relay.
   2. **Dispatch `fable-build-report`** with `model:` set to the pin's alias
      (`dispatchModel().agentModel`, which is `fable` today), and **the
      printed brief as the whole prompt**. The role holds no file-reading
      tool, so a brief handed to it as a path is unreachable. The brief
      carries the schema for the same reason. Announce the dispatch in one
      line.
   3. **Read only after the harness reports the dispatch complete**, in the
      tool result or a later task notification. The completion signal is the
      synchronisation; `run_in_background: false` is not
      ([`backgrounded-subagent-answer-is-in-its-own-transcript.md`](../../../.agents/memory/backgrounded-subagent-answer-is-in-its-own-transcript.md)).
      The answer is the file, never the role's closing message. When no
      signal ever arrives, read once at the next event: no file is a failed
      report, never a quiet one.
   4. **Paste the report verbatim**:
      `node <dir>/build-report.mjs report --unit <slug> --session continue|"hand off"|archive --session-why "<one clause>"`,
      in chat and as a comment on the workstream issue, and say nothing else
      about the unit. **A private-path unit's report goes in chat only**,
      never as an issue comment, and the report says so at its top, asking
      David to paste it into the private item, which is where it is kept:
      the role writes a plain account of the diff, and from a relayed
      source the restricted plan too, which is what the canonical
      disclosure check keeps off GitHub (`workstream-tracking.md`,
      *Sensitive / disclosure-carve-out workstreams*). The report's
      *Evidence* line names what it covered from the brief's own
      coordinates, and for a branch unit both ends of the range — the next
      version's `--since`. The **session** line is mine and printed under a label
      saying so, because only this session can see its own context: the
      `archive` skill's verdict, run here without being asked, and when it
      says hand off, the `handoff` skill runs after the report and starts
      the new session itself, or hands David the prompt and a 🛑 where it
      cannot (the `handoff` skill, Step 5). An *archive*
      line here archives nothing; only an explicit `/archive` does.

   - **The report is the role's words, not my summary of them.** `chatReport`
     composes it from the validated answer's own fields; the only text in it
     that is not the role's is the labels and my labelled session line. My
     own account is welcome beside it, labelled as mine; editing the role's
     account, or presenting mine as it, is not.
   - **A failure is honest and never blocks.** No file, unparseable JSON and
     a schema-invalid answer are each a visible **failed** report, never
     "nothing to report". If the dispatch itself is refused — a newly added
     agent type is not dispatchable for some minutes, and an edited one may
     be served stale — say so in plain English, write the unit up myself
     labelled as my own account, and try again at the next unit.
   - **"Agrees" prints only when nothing differs, nothing shipping unfixed is
     called unreasonable, no decision drew a concern and everything reachable
     was assessed.** The model is disclosed, not observed: the role reports
     its own and the report mentions it only on a mismatch or an absence.
   - **`Write` is not path-scoped, and this role reads every comment on the
     pull request, from anyone.** A path specifier in a `tools:` list removes
     the tool rather than narrowing it, so the bare grant ships and the
     exposure is named: an injected instruction could direct the one write
     tool at any path in the checkout. What bounds it: the answer directory is
     `*`-gitignored; the container is ephemeral; and the only route to `main`
     is a commit I make. **So after every dispatch, read `git status
     --porcelain`**: an untracked file inside `.agents/reviews/` is the one
     kind of noise, and anything else — a tracked file modified anywhere,
     `.agents/reviews/.gitignore` included — is a finding.

8. **Merge, sync, report**, per `claude-core.md`'s *Close-out is mine, end to
   end*, with the `close-out` skill loaded for each step's mechanics: re-verify live state with a fresh `pull_request_read` — not cached
   green — then, for each `scripted` step in the body's `## UAT` section,
   make sure its output is recorded on the PR at this head, running and
   posting any that is missing in the shape `pr-docs` gives (a proof that
   fails here is a defect found before the merge, handled like any other),
   then squash-merge, check the Repl for its own commits and then sync and verify it (close-out step 3), execute the
   Post-merge verification section (a step that would start a paid AI run
   within David's monthly paid-run budget — $100 a calendar month across every product, no per-run cap — and asks him only for a run that would take the month past it (`uat-doc-format.md`, *Lanes*)), post the harvest-notes comment, and send
   the merge report with both SHAs, the latitude line, the PR's **Decisions
   taken on my recommendation** entries, the UAT handoff and, last, its
   plain-English summary — on the `✅ **PLAN DONE** —` line when this merge
   finished the approved work (`claude-core.md`, *A reversible choice proceeds, and every hand-back says what it did*, rule 2) — then
   dispatch the build report (step 7). In KITT, finished work whose merges
   changed `core/` runs `sync-fleet` before that line is written (KITT's
   `CLAUDE.md`, *Delivering the payload*).
   **No readiness receipt is minted or quoted** (`pr-ready.mjs` is gone); the three-item bar is read
   by eye.

## One standing stop

**A Codex code-review outage is a FULL STOP**, not the security-review
usage-limit bounce. A pass that stalls twice on the same head is one (step
6, *A stalled pass*). Stop building, tell David as a 🛑 with a push
notification, say which PRs are blocked and in what state, and wait. A
Documentation-class PR still waiting on Codex's automatic pass is one of
them; a prototype-phase PR owes Codex nothing and is not (`claude-core.md`,
*Close-out*).

## Keeping the workstream issue's labels current

Every stage and `waiting:` transition of the workstream issue, its phased
parent and anything this PR completes or unblocks is
[`labels.md`](labels.md). **Read it at each transition: the PR opening, a
round starting or returning, the close-out bar met, the merge.**
