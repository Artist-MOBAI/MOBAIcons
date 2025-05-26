export default defineCachedEventHandler(async (event) => {
  const { name } = getRouterParams(event)
  const storage = useStorage<string>('assets:icons')
  const icon = await storage.getItem(`/${aliases[name] ?? name}.svg`)
  if (icon == null) {
    throw createError({
      statusCode: 404,
      statusMessage: `Icon '${name}' not found`,
    })
  }

  return new Response(icon, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  })
})
