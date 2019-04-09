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

  getOrElseL(f: () => T): T {
    return f();
  }

  fold<B>(
    onNotAsked: B,
    onLoading: B,
    onFailure: (error: E) => B,
    onSuccess: (data: T) => B
  ): B {
    return onNotAsked
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

  getOrElseL(f: () => T): T {
    return f();
  }

  fold<B>(
    onNotAsked: B,
    onLoading: B,
    onFailure: (error: E) => B,
    onSuccess: (data: T) => B
  ): B {
    return onLoading
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

  getOrElseL(f: (l: E) => T): T {
    return f(this.error)
  }

  fold<B>(
    onNotAsked: B,
    onLoading: B,
    onFailure: (error: E) => B,
    onSuccess: (data: T) => B
  ): B {
    return onFailure(this.error)
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

  getOrElseL(f: (l: E) => T): T {
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

export const andMap = <E, A, B>(
  remoteValue: RemoteData<E, A>,
  remoteFunction: RemoteData<E, (value: A) => B>
): RemoteData<E, B> => {
  if (remoteFunction.isSuccess() && remoteValue.isSuccess()) {
    const a = remoteFunction as Success<E, (value: A) => B>;
    return remoteValue.map(a.value)
  }
  if (remoteFunction.isFailure()) {
    const a = remoteFunction as Failure<E, (value: A) => B>;
    return failure(a.error);
  }
  if (remoteValue.isFailure()) {
    const a = remoteValue as Failure<E, A>;
    return failure(a.error);
  }
  if (remoteFunction.isLoading() || remoteValue.isLoading()) {
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
  return andMap(fb, fa.map(f));
};

export const map3 = <E, A, B, C, D>(
  fa: RemoteData<E, A>,
  fb: RemoteData<E, B>,
  fc: RemoteData<E, C>,
  f: (value1: A) => (value2: B) => (value3: C) => D
): RemoteData<E, D> => {
  return andMap(fc, andMap(fb, fa.map(f)));
}

export const append = <E, A, B>(
  fa: RemoteData<E, A>,
  fb: RemoteData<E, B>
): RemoteData<E, [A, B]> => {
  return andMap(fb, fa.map((a: A) => (b: B): [A, B] => ([a, b])));
}
