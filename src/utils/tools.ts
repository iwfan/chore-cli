interface Indexable<T> {
  [index: string]: T
}

export const isObject = (val: unknown): val is Indexable<unknown> => {
  return val != null && typeof val === 'object'
}

export const isArrayLike = (val: unknown): val is ArrayLike<unknown> => {
  if (Array.isArray(val)) return true

  if (!isObject(val)) return false

  return typeof (val as unknown as Iterable<unknown>)[Symbol.iterator] !== 'function'
}

export const takeFirst = <T = unknown>(list: unknown): T | undefined => {
  if (isArrayLike(list)) {
    return list[0] as unknown as T
  }
}
