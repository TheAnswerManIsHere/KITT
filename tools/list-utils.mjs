// Small list helpers used by the sweep scripts' reports.

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

/** The items of `list` that appear in `other`, in `list`'s order. */
export function intersect(list, other) {
  return list.filter((x) => other.indexOf(x) > 0);
}
