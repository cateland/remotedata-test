import { inspect } from "../funcHelper.js";

export type RemoteData<E, T> =
  | NotAsked<E, T>
  | Loading<E, T>
  | Failure<E, T>
  | Success<E, T>;

export class NotAsked<E, T> {
  constructor() { }

  isNotAsked() {
    return true;
  }

  isLoading() {
    return false;
  }

  isFailure() {
    return false;
  }

  isSuccess() {
    return false;
  }

  inspect() {
    return `NotAsked`;
  }

  map<B>(f: (value: T) => B): RemoteData<E, B> {
    return this as any;
  }

  getOrElse(a: T): T {
    return a
  }

  fold<B>(
    onNotAsked: B,
    onLoading: B,
    onFailure: (error: E) => B,
    onSuccess: (data: T) => B
  ): B {
    return onNotAsked
  }

  reduce<B>(b: B, f: (b: B, a: T) => B): B {
    return b
  }

  bimap<F, B>(f: (e: E) => F, g: (t: T) => B): RemoteData<F, B> {
    return new NotAsked<F, B>();
  }

  chain<B>(f: (t: T) => RemoteData<E, B>) : RemoteData<E, B> {
    return this as any;
  }

  extend<B>(f: (wa: RemoteData<E, T>) => B): RemoteData<E,B> {
    return this as any;
  }
}

export class Loading<E, T> {
  constructor() { }

  isNotAsked() {
    return false;
  }

  isLoading() {
    return true;
  }

  isFailure() {
    return false;
  }

  isSuccess() {
    return false;
  }

  inspect() {
    return `Loading`;
  }

  map<B>(f: (value: T) => B): RemoteData<E, B> {
    return this as any;
  }

  getOrElse(a: T): T {
    return a
  }

  fold<B>(
    onNotAsked: B,
    onLoading: B,
    onFailure: (error: E) => B,
    onSuccess: (data: T) => B
  ): B {
    return onLoading
  }

  reduce<B>(b: B, f: (b: B, a: T) => B): B {
    return b
  }

  bimap<F, B>(f: (e: E) => F, g: (t: T) => B): RemoteData<F, B> {
    return new Loading<F, B>();
  }

  chain<B>(f: (t: T) => RemoteData<E, B>) : RemoteData<E, B> {
    return this as any;
  }

  extend<B>(f: (wa: RemoteData<E, T>) => B): RemoteData<E,B> {
    return this as any;
  }
}

export class Failure<E, T> {
  constructor(readonly error: E) { }

  isNotAsked() {
    return false;
  }

  isLoading() {
    return false;
  }

  isFailure() {
    return true;
  }

  isSuccess() {
    return false;
  }

  inspect() {
    return `Failure(${inspect(this.error)})`;
  }

  map<B>(f: (value: T) => B): RemoteData<E, B> {
    return this as any;
  }

  getOrElse(a: T): T {
    return a
  }

  fold<B>(
    onNotAsked: B,
    onLoading: B,
    onFailure: (error: E) => B,
    onSuccess: (data: T) => B
  ): B {
    return onFailure(this.error)
  }

  reduce<B>(b: B, f: (b: B, a: T) => B): B {
    return b
  }

  bimap<F, B>(f: (e: E) => F, g: (t: T) => B): RemoteData<F, B> {
    return new Failure<F, B>(f(this.error))
  }

  chain<B>(f: (t: T) => RemoteData<E, B>) : RemoteData<E, B> {
    return this as any;
  }

  extend<B>(f: (wa: RemoteData<E, T>) => B): RemoteData<E,B> {
    return this as any;
  }
}

export class Success<E, T> {
  constructor(readonly value: T) { }

  isNotAsked() {
    return false;
  }

  isLoading() {
    return false;
  }

  isFailure() {
    return false;
  }

  isSuccess() {
    return true;
  }

  inspect() {
    return `Success(${inspect(this.value)})`;
  }

  map<B>(f: (value: T) => B): RemoteData<E, B> {
    return new Success(f(this.value));
  }

  getOrElse(a: T): T {
    return this.value
  }

  fold<B>(
    onNotAsked: B,
    onLoading: B,
    onFailure: (error: E) => B,
    onSuccess: (data: T) => B
  ): B {
    return onSuccess(this.value)
  }

  reduce<B>(b: B, f: (b: B, a: T) => B): B {
    return f(b, this.value)
  }

  bimap<F, B>(f: (e: E) => F, g: (t: T) => B): RemoteData<F, B> {
    return new Success<F, B>(g(this.value))
  }

  chain<B>(f: (t: T) => RemoteData<E, B>) : RemoteData<E, B> {
    return f(this.value);
  }

  extend<B>(f: (wa: RemoteData<E, T>) => B): RemoteData<E,B> {
    return new Success(f(this))
  }
}

export const notAsked = <E, T>(): RemoteData<E, T> => {
  return new NotAsked();
};

export const loading = <E, T>(): RemoteData<E, T> => {
  return new Loading();
};

export const failure = <E, T>(error: E): RemoteData<E, T> => {
  return new Failure(error);
};

export const success = <E, T>(data: T): RemoteData<E, T> => {
  return new Success<E, T>(data);
};

export const of = notAsked;

export const isNotAsked = <E, T>(
  fa: RemoteData<E, T>
): fa is NotAsked<E, T> => {
  return fa.isNotAsked();
};

export const isLoading = <E, T>(fa: RemoteData<E, T>): fa is Loading<E, T> => {
  return fa.isLoading();
};

export const isFailure = <E, T>(fa: RemoteData<E, T>): fa is Failure<E, T> => {
  return fa.isFailure();
};

export const isSuccess = <E, T>(fa: RemoteData<E, T>): fa is Success<E, T> => {
  return fa.isSuccess();
};

export const ap = <E, A, B>(
  fa: RemoteData<E, A>,
  fb: RemoteData<E, (value: A) => B>
): RemoteData<E, B> => {
  if (fb.isSuccess() && fa.isSuccess()) {
    const a = fb as Success<E, (value: A) => B>;
    return fa.map(a.value)
  }
  if (fb.isFailure()) {
    const a = fb as Failure<E, (value: A) => B>;
    return failure(a.error);
  }
  if (fa.isFailure()) {
    const a = fa as Failure<E, A>;
    return failure(a.error);
  }
  if (fb.isLoading() || fa.isLoading()) {
    return loading();
  }
  return notAsked();
};

export const map = <E, T, B>(
  fa: RemoteData<E, T>,
  f: (value: T) => B
): RemoteData<E, B> => {
  return fa.map(f);
};

export const map2 = <E, A, B, C>(
  fa: RemoteData<E, A>,
  fb: RemoteData<E, B>,
  f: (value1: A) => (value2: B) => C
): RemoteData<E, C> => {
  return ap(fb, fa.map(f));
};

export const map3 = <E, A, B, C, D>(
  fa: RemoteData<E, A>,
  fb: RemoteData<E, B>,
  fc: RemoteData<E, C>,
  f: (value1: A) => (value2: B) => (value3: C) => D
): RemoteData<E, D> => {
  return ap(fc, ap(fb, fa.map(f)));
}

export const append = <E, A, B>(
  fa: RemoteData<E, A>,
  fb: RemoteData<E, B>
): RemoteData<E, [A, B]> => {
  return ap(fb, fa.map((a: A) => (b: B): [A, B] => ([a, b])));
}

export const reduce = <E, A, B>(
  fa: RemoteData<E, A>,
  b: B,
  f: (b: B, a: A) => B
): B => {
  return fa.reduce(b, f)
}

export const bimap = <E, A, F, B>(
  fla: RemoteData<E, A>,
  f: (e: E) => F,
  g: (a: A) => B
): RemoteData<F, B> => {
  return fla.bimap(f, g)
}

export const chain = <E, A, B> (ma: RemoteData<E, A>, f: (a: A) => RemoteData<E, B>) : RemoteData<E, B>  => {
  return ma.chain(f);
}

export const extend = <E, A, B> (wa: RemoteData<E, A>, f: (a: RemoteData<E, A>) => B) : RemoteData<E, B>  => {
  return wa.extend(f);
}