import z from 'zod'
import { fetchIcons, parseQuery } from '~/utils/icons'
import { generateSvgGrid } from '~/utils/svg'

const querySchema = z.object({
  perline: z.coerce.number().optional(),
  duplicate: z.coerce.boolean().optional(),
})

export default defineCachedEventHandler(async (event) => {
  const { names } = getRouterParams(event)
  const query = await getValidatedQuery(
    event,
    data => querySchema.parseAsync(data),
  )
  const icons = await fetchIcons(parseQuery(names, query.duplicate))
  const svg = generateSvgGrid(icons, query)
  return new Response(optimizeSvg(svg), {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  })
}, {
  swr: true,
})
