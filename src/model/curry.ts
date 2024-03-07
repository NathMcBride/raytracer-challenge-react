/* eslint-disable @typescript-eslint/no-explicit-any */
// inspired by https://medium.com/free-code-camp/typescript-curry-ramda-types-f747e99744ab

// T extends [any, ...any[]] means tuple type has one or more elements
type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

type Tail<T extends any[]> = ((...t: T) => any) extends (
  _: any,
  ...tail: infer TT
) => any
  ? TT
  : [];

// eslint-disable-next-line prettier/prettier
type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true;

type TupleInfer<T> = T extends [infer A, ...(infer B)[]] ? [A, B] : never;

type CurryV0<P extends any[], R> = (
  arg0: Head<P>
) => HasTail<P> extends true ? CurryV0<Tail<P>, R> : R;

function curryV0<P extends any[], R>(f: (...args: P) => R): CurryV0<P, R> {
  let remainingArgs = f.length;
  let accumulated: any[] = [];

  return function paramFunc(arg0: Head<P>) {
    remainingArgs--;
    accumulated = [...accumulated, arg0];
    return remainingArgs === 0 ? f(...(accumulated as P)) : paramFunc;
  } as CurryV0<P, R>;
}
