export default defineCachedEventHandler(async (event) => {
  const { json } = getQuery(event)

  const storage = useStorage('assets:icons')
  const keys = await storage.getKeys()
    .then(keys => keys.map(key => key.replace('.svg', '')))
    .then(keys => keys.sort())

  return json != null ? keys : keys.join(',')
}, {
  maxAge: 60 * 60 * 24 * 5, // 5 days
  swr: true,
})
