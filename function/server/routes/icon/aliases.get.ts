import { aliases } from '~/utils/aliases'

export default defineCachedEventHandler(async () => {
  return aliases
}, {
  maxAge: 60 * 60 * 24 * 5, // 5 days
  swr: true,
})
