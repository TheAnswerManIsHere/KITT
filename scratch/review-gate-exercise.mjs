// Scratch file for the review gate's live exercise (KITT #293, plan step 6).
// This PR is never merged; the defect below is planted on purpose so that
// Codex returns a findings round.

/** The last element of a list, or undefined for an empty one. */
export function last(list) {
  return list[list.length];
}

/** Sum of the numbers from 1 to n inclusive. */
export function sumTo(n) {
  let total = 0;
  for (let i = 1; i < n; i++) total += i;
  return total;
}
