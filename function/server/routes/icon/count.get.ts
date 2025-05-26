export default defineEventHandler(async () => {
  const storage = useStorage('assets:icons')
  const keys = await storage.getKeys()
  return { count: keys.length }
})
