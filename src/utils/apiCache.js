const cache = new Map()

export const getCached = async (key, fetcher, ttl = 30000) => {
  const now = Date.now()
  const cached = cache.get(key)

  if (cached?.data !== undefined && now - cached.timestamp < ttl) {
    return cached.data
  }

  if (cached?.promise) {
    return cached.promise
  }

  const promise = fetcher()
    .then((data) => {
      cache.set(key, { data, timestamp: Date.now() })
      return data
    })
    .catch((error) => {
      cache.delete(key)
      throw error
    })

  cache.set(key, { promise })
  return promise
}

export const invalidateCache = (key) => {
  cache.delete(key)
}