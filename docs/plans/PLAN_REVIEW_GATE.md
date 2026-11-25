# Plan — the review gate (Devon): a required check that blocks a merge when a findings round lacks its two assessments

*Named for Devon Miles, who signs off on every mission before KITT rolls. The plain name, used
everywhere it matters, is **review gate**.*

Workstream: KITT #293. Scope agreed by David 2026-11-11. Astra's scope exchange:
`.agents/reviews/review-gate/round-0.md` (RG-1, RG-2).

```plan-oracle
# Oracle — a required check that blocks a merge when a findings round lacks its assessments

Agreed with David, 2026-11-11 (scope banner in session; his reply: "go ahead"), after the image
tracing build report found that Overhype.me PR #915's round 1 was answered with no assessment
posted, and David ruled: "Please don't skip reviewers! That's a critical part of our process that
should not be allowed." He then asked: "Yes, plan the KITT check that blocks merges."

## Direction
The rule "both independent assessments before any fix" stops depending on the builder's memory
and becomes something GitHub enforces, in every consumer repository.

## Product intent
1. A check reads every Codex review round on a pull request that returned findings, and requires,
   for each, an Astra assessment and a Fable assessment of that exact reviewed commit, posted after
   that review. A failed dispatch does not count.
2. Order is enforced: any commit pushed after that review must come after both assessments, so
   "before any fix is written" is a fact the check verifies, not a promise.
3. It runs as a required status check on the pull request's head commit, and re-runs whenever a
   review or comment lands. (The builder's comments are posted under David's account, so they
   trigger it.)
4. A failure names exactly what is missing: which round, and which assessor.

## Must not change
- A clean round owes nothing.
- Trivial, sync and phase-registry pull requests, and prototype-phase pull requests, keep their
  exemptions; the Documentation class keeps its one-batch flow, which the check counts.
- Nothing else about how a merge happens changes.

## Settled (David, 2026-11-11, on the builder's recommendation)
- Exemptions are read from the pull request, not guessed: an exempt class carries a fixed line in
  the PR body (e.g. `Review class: trivial`, with David's declaration quoted), and the check trusts
  that line and nothing else.
- An escape hatch exists for when the assessors genuinely cannot run: a `review-gate: waived by
  David` label, with a one-line reason, which the check accepts. Its threat model is the builder's
  own mistakes, not deliberate bypass.

## Now / next / never
- Now: the check script, its workflow template, tests, and the contract text in KITT; then rolled
  out to Overhype.me and DojoOS through the normal sync.
- Next: a private-path pull request's one-time assessment on a clean round (KITT #206).
- Never: counting rounds, or any other gate.

## David's part, after it is built
In each repository's ruleset (`main` → required status checks), add the new check — a person must
make that change; it is about a minute per repository.

## Ceremony
Full plan with Astra's review: this changes the review loop itself, and a broken check would block
merges across the fleet.
```

## Amendment 1 (2026-11-25): a push before a round's assessments is a note, not a failure

Agreed with David, 2026-11-25; the amendment's oracle is
`.agents/reviews/review-gate-push-note/oracle-review-gate-push-note.md`, and its text is below.
The original oracle above is kept as it was agreed: it is the record of 2026-11-11. Where this
amendment and the sections below disagree, this amendment holds. Decisions 2 and 5, approval item 2,
the *Runtime Behavior* bullet on a push before the assessments, and the push-history `error` path in
*Risks* are superseded as stated here.

**Why.** On Overhype.me PR #1263 the builder pushed an unrelated commit (test comments and a
decisions entry) 24 seconds after Codex's findings landed. Both assessments were then posted, and the
gate stayed failed until David waived it. He also waived #915, whose early push was the fixes. His
words: *"We need to modify KITT so that we don't keep running into the need to waive the review
gate. I'm always going to waive it in this circumstance."* Asked whether that covers a push of fixes
too (Q30), he answered yes.

Three facts make the failing verdict worthless once its only release is always given. The gate
cannot tell a fix from an unrelated commit or a base merge (decision 5 says so). A waiver cannot
undo a fix already pushed; it only releases the PR. And the property David's 2026-11-11 ruling is
about, that no reviewer is skipped, is fully carried by the presence check: each round still needs
both assessments of the reviewed commit, posted after the review, before the PR can pass. What the
order check added was evidence that the assessments came first, and that evidence survives as a
note in the gate's own output and the builder's disclosure, read by the same people who read the
failure.

```plan-oracle
# Oracle — amendment 1 to the review gate: a push before a round's assessments is noted, not failed

Agreed with David, 2026-11-25. His request, from an Overhype.me session: "We need to modify KITT so
that we don't keep running into the need to waive the review gate. I'm always going to waive it in
this circumstance." The circumstance: Overhype.me PR #1263, where an unrelated commit was pushed 24
seconds after Codex's findings landed and before both assessments, which were then posted; the
gate failed and only his waiver released it. Scope agreed in this session, with Q30 answered
"q30 yes": the note applies to every push before a round's assessments, fixes included (the #915
case, which he also waived).

## Direction
The review gate keeps enforcing what David set up on 2026-11-11 ("Please don't skip reviewers!"):
every Codex findings round gets both an Astra and a Fable assessment. It stops asking David for a
waiver he always gives.

## Product intent
1. A push to the PR branch after a findings review and before both of its assessments no longer
   fails the gate. It is reported as a non-failing note in the status and the run summary, naming
   the push.
2. Everything else the gate requires is unchanged: for each findings round, an Astra and a Fable
   assessment of the reviewed commit, posted after the review, covering every finding, not a failed
   dispatch; an unrecognised findings review still fails.
3. Push history that cannot be read no longer turns the gate to `error`: the note says push order
   was not checked.
4. Upstream, the working rule stays: hold every push until both assessments are in. A push that
   lands before them anyway is disclosed by the builder in that round's `review-action` block.
5. The waiver remains, for when the assessors genuinely cannot run; it is no longer the recovery for
   an early push. Every place the contract states the waiver-for-push rule says the new rule.

## Must not change
- A clean round owes nothing; exempt classes and the Documentation flow behave as today.
- The rule that no fix is written before both assessments (the write-gate rule) is unchanged.
- The gate's lifecycle (pending first, head re-read before posting, default-branch copy) is unchanged.

## Ceremony
Plan amendment with Astra's review, then one PR in the standard loop, internal tier (review-loop
machinery; loosening the gate is undone by a revert). Prose sweep; `/sync-fleet` once merged.
```

### Design

- **`decide()`** keeps its order: waiver, exemption, rounds. A round fails only for a missing
  assessor (or an unrecognised findings review). For each push after a round's review that
  preceded either assessment, the summary lists a note: `push <sha7> at <time> preceded the <assessor>
  assessment(s) (noted, not failing)`, and the description of a passing status counts them, e.g.
  `2 findings rounds assessed; 1 push preceded its assessments`. A failing status's description is
  unchanged in kind: the first missing item and a count.
- **Push history is read only to write the note.** Unavailable, empty or incomplete history no
  longer yields `error`; the summary says push order was not checked, and the status description
  says so in a few words. `error` remains for a failed read of anything the verdict depends on
  (the PR, comments, reviews, review comments).
- **The recovery line** for a failing round says: post the missing assessment; if the assessors
  genuinely cannot run, David's waiver. No recovery line names a push.
- **The waiver** keeps its mechanics (label plus a `Review gate waived:` comment with a reason) and
  its precedence; it is described everywhere as the release for assessors that cannot run.
- **Upstream (`pr-watch` step 3)**: both assessments are posted before the first push of anything,
  as now. A push that lands before them anyway (a race with a review that arrives seconds earlier,
  or a mistake) is disclosed in that round's `review-action` block: the commit, what it contained,
  and whether it touched any line a finding names. An early push of a fix is still a breach of the
  write-gate rule and is reported as one in the build report; it no longer goes to David.
- **The build report (Astra, RG-A2).** The `review-action` disclosure names an early push of a
  fix as a breach of the unchanged working rule. The build-report role
  (`fable-build-report`) reports that disclosed breach, says that the gate's passing status no
  longer certifies push order, and asks no waiver for it.
- **No mechanical pre-push check.** The session cannot read the PR's reviews through the REST API
  (implementation step 1), and a check before a push still races a review that lands after it, which
  is how #1263 happened; the note covers the race either way.

### Affected surface (the prose sweep's starting inventory)

`git grep -n -i "waiv\|push order\|push landed\|preceded the"` over the repository, excluding this
plan: `core/scripts/review-gate.mjs` and its tests; both copies of `review-gate.yml` (header
comment); `claude-core.md` (*Planning* rule 4, *The write-gate rule*, *Shared judgement on a review
round*, *Close-out*); `pr-watch`; `requesting-code-review`; `receiving-code-review`; `status-all`;
`agent-working-rules.md`; `agents-core.md`; `code-review.md`; `fable-build-report`; `working-modes.md`; `workstream-tracking.md`; the memory note
`review-round-never-answered-before-both-assessments.md`; `CLAUDE.md` (*The guard is gone*). The
`prose-sweep` skill runs over the retired reading ("only David's waiver releases a push", "stays
failed if any push landed") before the PR opens.

### Testing

- #915's real sequence with both assessments posted late: **passes**, with both pushes listed as
  notes.
- #1263's shape (findings review, an unrelated push 24 s later, both assessments after): passes with
  one note.
- #915 before the assessments existed: fails as missing, and the early pushes are listed as notes.
- Push history unavailable, empty or incomplete with all assessments present: passes, noting push
  order unchecked; with an assessment missing: fails as missing, never `error`.
- All existing presence, exemption, waiver, failed-dispatch, wrong-commit, follow-up and
  unrecognised-review fixtures unchanged in verdict.
- The I/O test that expected `error` for unavailable push history now expects `success` with the
  note.

### Done

The gate passes #1263's and #915's sequences once both assessments are posted, still fails a round
missing either, and every statement of the waiver-for-push rule in the payload says the new rule.
Synced to every consumer.

## Problem

On Overhype.me PR #915 — Image tracing, increment 2, Codex's round 1 returned two findings at
01:56 UTC; the builder pushed fixes at 02:00 with no assessment posted; the assessments arrived at
03:16, after merge, because the build report caught the skip. The rule was already in the contract
(`claude-core.md`, *The write-gate rule*; `pr-watch` step 3). Nothing enforces it: the merge bar is
read by eye (`claude-core.md`, *Close-out*: "No receipt proves any of the three now"), and the only
mechanical gates are the `main` ruleset's required checks and conversation resolution.

## Direction

See the oracle. One required status check, computed from the pull request's own record on GitHub,
using the assessment comments `review-proxy.mjs` already produces.

## Product Intent

The oracle's four items, with the boundary RG-1 draws made explicit:

- **What the order check proves is push order.** GitHub records when a commit reached the branch;
  it cannot see when a file was edited in a working tree. The gate proves *no commit was pushed
  after a findings review and before both of its assessments*. "No fix was written before them"
  remains a working rule the gate cannot see. (Approval item 1.)
- **A failure is actionable or honest.** It says which round (reviewed commit, review time, finding
  ids), which assessor is missing or late, and — for an ordering violation — that a late assessment
  cannot repair a push already made, and what the recovery is (approval item 2).

## Must Not Change

As the oracle, and concretely:

- `review-proxy.mjs`'s comment format is the input, unchanged: header `## Astra — round N` /
  `## Fable — round N[, follow-up K]`, facts line with ``Assessed at `<sha>` `` and
  ``findings `id`, `id` ``; a failed dispatch's header ends `: **dispatch failed**`
  (`core/scripts/review-proxy.mjs` 739–831).
- The merge sequence in `claude-core.md` *Close-out* is unchanged; the gate adds a status, not a
  step.
- Clean rounds, exempt classes and the Documentation flow behave as today.

## Settled Decisions

1. Exemptions: a line at the start of a line in the PR body, `Review class: trivial`,
   `Review class: sync`, `Review class: registry` or `Review class: prototype`. The gate trusts it
   (David). The skills that open such PRs write it; nothing else infers a class.
2. Waiver: the label `review-gate: waived by David` **and** a PR comment beginning
   `Review gate waived:` followed by a non-empty reason. The status then reads `waived — <reason>`.
3. **Identity of a findings round is GitHub's**: a review by the Codex connector account
   (login matching `^chatgpt-codex-connector(\[bot\])?$`) whose body carries
   ``**Reviewed commit:** `<sha>` `` and which owns at least one review comment
   (`pull_request_review_id` equal to the review's id). Its finding ids are those comments' ids.
   A later clean review never discharges an earlier round. No round is counted.
4. **An assessment satisfies a round** when it is an issue comment on the PR whose header names the
   assessor and is not a failed dispatch, whose ``Assessed at`` commit and the round's reviewed
   commit agree on their common prefix (≥ 7 hex characters), which was created after the review was
   submitted, and — across all such comments for that assessor and that round — whose ``findings``
   lists cover every finding id of the round (so a follow-up, which assesses a subset, adds to the
   cover; it never replaces it). A Documentation-pass comment is the same shape and counts the same
   way.
5. **Push order** is read from the pull request branch's push history. Every push to the head branch
   after a round's review was submitted must have happened at or after the later of its two
   satisfying assessments. Any push counts, including a merge from `main`: the gate cannot tell a
   fix from a base merge, and an unassessed round should not be receiving pushes of either kind.
   (Settled by me on the Worth rule: rare, and recoverable through the waiver if David accepts
   approval item 2.) The source is GitHub's
   repository activity API (`GET /repos/{owner}/{repo}/activity`, `activity_type=push`, filtered to
   the branch), which gives `before`, `after` and a timestamp per push; build step 1 probes it. Force pushes are already impossible on every branch (rulesets), so
   history is append-only. **There is no fallback source** (RG-4): workflow-run times record
   workflow events, not branch changes, and a push can produce no run (a `pull_request` workflow
   does not run while the PR has a merge conflict), so they cannot stand in. Unavailable or
   incomplete history yields an error status, never success. *Unverified:* the activity API's
   availability to `GITHUB_TOKEN` in these repositories and its history coverage; build step 1
   settles it, and if it cannot support the guarantee the ordering design returns to David as a plan
   amendment rather than being weakened.
6. **The result is a commit status** (context `Review gate`) posted on the pull request's current
   head SHA, never the workflow's own check run. **Its lifecycle is pending-first** (RG-3): once the
   head is read, the run posts `pending` before fetching anything else, posts `success` only after a
   complete evaluation, and posts `error` (with a link to the run) when evaluation cannot finish. So
   a failed re-evaluation, a deleted assessment, a removed exemption line or label on an unchanged
   head all withdraw an earlier success. The workflow's own job result is never the required
   signal: an `issue_comment` run is attached to the
   default branch's SHA and a review run to the merge ref, so a job result alone would not sit on
   the head commit. Runs for one PR are serialized (`concurrency` group per PR, no cancellation), each
   reads current state when it runs, and each re-reads the head immediately before posting and posts
   nothing if it moved (the newer push's own run posts).
7. **The gate always runs the default branch's copy of itself**, checked out explicitly, never the
   pull request's: a PR that edits the gate cannot grade itself.
8. The payload ships it as a managed file, `core/.github/workflows/review-gate.yml`, carrying the
   `# SYNCED FROM KITT` banner the sync already recognises (`scripts/sync.mjs` 346), so a fix
   reaches every consumer. KITT itself carries a root copy at `.github/workflows/review-gate.yml`,
   held identical by a test. The workflow finds the script at `core/scripts/review-gate.mjs` or
   `scripts/review-gate.mjs`, whichever exists.
9. Affected-surface inventory (to run at the build's first step and record): the producers of the
   input — `git grep -n "prComment\|dispatch failed" core/scripts/review-proxy.mjs`; the readers of
   the exemption classes — `git grep -n "Trivial\|phase registry\|kitt-sync" core/.claude/skills
   core/.agents/core`; the PR-body writers that must emit `Review class:` — `sync-fleet`, `prototype`,
   and the Trivial declaration in `pr-watch`/`claude-core.md`.

## Repo Context Inspected

- `core/scripts/review-proxy.mjs` (comment format, failed-dispatch shape, `--render`).
- `core/.claude/skills/pr-watch/SKILL.md` (rounds, posting order, review-action, clean shapes).
- `core/.agents/core/claude-core.md` (*Review loops*, *Close-out*, exemptions, rulesets).
- `core/docs/ai-context/working-modes.md` (Trivial, Documentation, prototype phase, registry).
- `scripts/sync.mjs` (routing, banner, `.template` seeds); KITT `.github/workflows/check.yml`.
- `core/scripts/check-uat-format.mjs` (the one shipped check that reads PR content; fail-loud).
- `core/.agents/memory/ci-guard-must-fail-loud-on-missing-inputs.md`,
  `github-actions-required-checks-job-if-vs-paths-filter.md`, `check-runs-carry-no-head-sha.md`.
- Overhype.me PR #915 (the regression record) and `.github/workflows/build.yml` (wiring precedent).

## Current Behavior

No workflow reacts to comments or reviews. Assessments are posted by the builder; nothing reads
them. The merge bar is read by eye.

## Proposed Design

**`core/scripts/review-gate.mjs`** — reads, decides, reports:

1. Reads the PR (head SHA, head ref, body, labels) and posts `pending` on that head. Then reads its
   issue comments, reviews, review comments and — only if still needed — the head branch's push
   history. Paginated to the end; any request that fails ends in `error`, never `success`.
2. Decision, in order, each step reading only what it needs: waiver (label + reason, from the PR
   and its comments) → pass, "waived"; exemption line (the PR body) → pass, "exempt: <class>"; so a
   push-history outage cannot block a waiver or an exempt PR (RG-4). Otherwise each findings round (decision 3) is checked for both assessors (decision 4)
   and push order (decision 5). All rounds satisfied → pass. Otherwise fail.
3. Report: the commit status (decision 6) with a description under 140 characters naming the first
   missing item and a count; the job summary lists every round with its state, assessor by assessor,
   and the recovery: post the missing assessment (if missing), or — for an order violation — the
   waiver path (approval item 2).
4. A pure core (`decide(facts) → result`) separated from I/O, so fixtures drive it.

**`core/.github/workflows/review-gate.yml`** — one trigger per input the decision reads (RG-5):
`pull_request` (opened, synchronize, reopened, edited, labeled, unlabeled — body, labels, pushes),
`pull_request_review` (submitted, edited, dismissed — reviews), `pull_request_review_comment`
(created, edited, deleted — finding membership), `issue_comment` (created, edited, deleted —
assessments and the waiver reason; the job exits early unless the issue is a pull request), and
`workflow_dispatch` with a PR number (re-evaluating open PRs at enrollment). Permissions: `contents: read`, `pull-requests: read`, `issues: read`, `statuses: write`,
and nothing else. Checks out the default branch, runs the script. No
`paths:` filter (a required check whose workflow never triggers waits forever).

**Contract text:**

- `claude-core.md`, *Shared judgement on a review round*: one paragraph — the review gate enforces
  the round's two assessments and their order; a failure is resolved by posting what is missing, or
  by David's waiver; never by working around the gate.
- `pr-watch` step 3: post both assessments before any push of a fix (already the rule); a failed
  gate is read and answered there.
- The skills that open exempt PRs write `Review class:` (sync-fleet, prototype, the Trivial
  declaration); `claude-core.md`'s Trivial bullet names the line.
- `docs/consuming-repos.md`: enrollment adds `Review gate` to the `main` ruleset's required checks.
- The memory note drafted in the Overhype.me session ("a review round with findings is never
  answered before both assessments are in"), as `core/.agents/memory/`.

## Runtime Behavior

- A PR with no findings rounds: `Review gate` passes on open.
- Codex posts a findings review: the gate fails ("round at <sha7>: Astra and Fable missing").
- Assessments posted: each comment re-runs it; when both cover the round and no push came between,
  it passes. A push of fixes after that: it re-runs on `synchronize` and stays green.
- A push before the assessments: it fails with "push <sha7> at <time> preceded the Fable
  assessment", and stays failed until the waiver path is used (approval item 2).
- GitHub API failure **after** `pending` is published: the status is `error`, replacing any earlier
  success. A failure **before** it (reading the PR, or writing `pending`) leaves the previous status
  standing: see the processing window.
- **The processing window (approval item 3).** The gate is asynchronous. Until a run successfully
  publishes `pending` on the current head, an earlier success may remain effective. Scheduling
  delays, or a failure to read the PR or to write the status before that point, can prolong this
  interval: there is no guaranteed seconds-long bound. After `pending` is published, an incomplete
  evaluation leaves the gate `pending` or `error`. The existing close-out step that re-reads the PR's
  live state immediately before merging remains necessary, and a failed evaluation is retried
  through the `workflow_dispatch` input. The gate is not a synchronous veto.

## Security, Permissions, and Validation

- Comment-triggered workflows are a known attack surface (`agentic-actions-auditor`). The gate
  runs only default-branch code, reads text, executes nothing from the PR, and holds no secret
  beyond the job token, whose only write is a commit status.
- Anyone who can comment can post a text that looks like an assessment. That is outside the threat
  model (decision: the builder's mistakes), and stated so in the script's header; author filtering is
  not attempted because the builder's comments carry David's login.

## Testing Plan

- Fixture tests of `decide()`:
  - **#915's real sequence** (findings review 01:56, push 02:00, clean review 02:03, assessments
    03:16) → fail, naming both the late assessments and the push;
  - a compliant two-round sequence → pass;
  - a failed dispatch only → fail;
  - an assessment of the wrong commit → fail;
  - a follow-up covering the rest of a round's findings → pass;
  - a Documentation pass → pass;
  - each exemption line → pass;
  - waiver label without a reason → fail, with the reason → pass;
  - a later clean review does not discharge an earlier round.
- I/O tests with a stubbed `fetch`: pagination; head moved before posting → no status posted;
  **transitions from an existing success on an unchanged head** (RG-3), distinguishing failures
  before `pending` is written (previous status left, run fails loudly) from failures after it
  (`error`): an input request fails after `pending` → `error`; an assessment deleted → `failure`; the exemption line removed → re-evaluated; the waiver
  label removed → re-evaluated; push history unavailable → `error`, while a waived or exempt PR still
  passes without it.
- A test that the KITT root workflow and the payload's are identical.
- **Live exercise** on a scratch PR in KITT, after the merge (the gate runs from the default
  branch): a real Codex findings round on a planted defect; the status read and recorded at each
  step — failure naming both assessors missing, the transition after each assessment, an
  inline-comment edit re-evaluating, and the status on the next pushed head.

## Implementation Steps

1. Probe push history (decision 5) from a workflow run in KITT (the session cannot reach the REST
   API directly): the activity API on Overhype.me PR #915's branch must show the violating push and
   the compliant ones with their times. If it cannot, stop and bring the ordering design back to
   David. Run the inventory (decision 9).
2. `review-gate.mjs` with `decide()` and its fixture and I/O tests.
3. The workflow, payload and KITT root copies, and the identity test.
4. Contract text and the memory note; `prose-sweep` over the retired reading ("the merge bar is
   read by eye", "no receipt proves").
5. **Bootstrap order** (RG-6): the PR merges through the existing required checks and the standard
   loop, with `Review gate` not yet required anywhere.
6. Live exercise on a scratch PR in KITT, from the default branch.
7. Sync to Overhype.me and DojoOS (Comlink); confirm each publishes `Review gate` on an open PR,
   re-evaluating open PRs with the dispatch input.
8. David adds `Review gate` to each repository's ruleset.

## Risks and Mitigations

- **A broken gate blocks every merge in the fleet.** Fail-loud on inputs, fixture coverage, the live
  exercise before David makes it required, and the waiver.
- **The connector changes its review shape.** A findings review the gate does not recognise is not
  a round, so the gate would pass it silently. Mitigation: any review by the connector account that
  owns review comments but carries no recognisable ``**Reviewed commit:**`` line fails the gate as
  "unrecognised findings review", so a shape change announces itself instead of opening a hole.
- **Comment-event volume.** Serialized per PR; each run is a handful of API calls.
- **The activity API is unavailable or incomplete.** The gate reports `error`, never success; if
  build step 1 finds it cannot support the guarantee, the ordering design returns to David.

## Questions for David

1. **What the order check proves (RG-1).** The gate proves no commit was *pushed* before both
   assessments; it cannot see edits made before them that were pushed later. Astra and I both
   recommend accepting that boundary and wording the rule's mechanical part as push order.
2. **Recovery from an out-of-order push (RG-2).** A late assessment cannot repair a push already
   made, so such a PR could never pass. Should the waiver label also release it, once both
   assessments are posted after the fact and the waiver comment explains what happened? Astra and I
   both recommend yes. Without it, the only recovery is a new pull request carrying the same
   change, which re-runs the round properly.

3. **The processing window (RG-3).** The gate is asynchronous. Until a run has marked the PR's head
   `pending`, an earlier pass can still stand: usually for seconds, but for longer if GitHub is slow
   to schedule the run or the run fails before that point, until the next run succeeds. Astra and I
   both recommend accepting this, with the limit stated plainly, covered by the existing re-read of
   the PR's live state immediately before every merge and a manual re-run, rather than building a
   synchronous merge service.

## Definition of Done

- `Review gate` posts a correct status on every PR event in KITT, Overhype.me and DojoOS, per the
  fixtures and the live exercise.
- The contract names it and the exempt-class line; the memory note ships.
- David has added it to the three rulesets; until then it reports without blocking.
