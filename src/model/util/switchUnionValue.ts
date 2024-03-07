type UnionRecord<A extends { kind: string }, R> = {
  [T in A as T['kind']]: (value: Extract<A, T>) => R;
};

export function switchUnionValue<A extends { kind: string }>(value: A) {
  return <R>(cases: UnionRecord<A, R>): R => {
    const type: A['kind'] = value.kind;
    const f = cases[type];
    return f(value);
  };
}
