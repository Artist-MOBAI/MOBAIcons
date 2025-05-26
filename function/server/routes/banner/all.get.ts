import z from 'zod'
import { fetchIcons } from '~/utils/icons'
import { generateSvgGrid } from '~/utils/svg'

const querySchema = z.object({
  perline: z.coerce.number().optional().optional(),
})

export default defineCachedEventHandler(async (event) => {
  const query = await getValidatedQuery(
    event,
    data => querySchema.parseAsync(data),
  )
  const icons = await fetchIcons()
  console.log(icons)
  const svg = generateSvgGrid(icons, query)
  return new Response(optimizeSvg(svg), {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  })
}, {
  swr: true,
})
