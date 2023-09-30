//@ts-nocheck ts cant treat groupBy properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupBy<S extends Record<string, any>>(arr: S[], key: keyof S) {
  return arr.reduce(
    (acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as Record<string, S[]>
  );
}
