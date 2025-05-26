import { aliases } from './aliases'

const textDecoder = new TextDecoder()

export async function fetchIcons(names?: string[]): Promise<string[]> {
  const storage = useStorage<string>('assets:icons')

  return names != null
    ? Promise.all(names.map(async (name) => {
        const icon = await storage.getItem(`/${name}.svg`)
        if (!icon) {
          throw new Error(`Icon '${name}' not found`)
        }
        return typeof icon === 'string' ? icon : textDecoder.decode(icon)
      }))
    : storage.getKeys()
        .then(
          keys => Promise.all(keys.map(
            key => storage.getItem(key)
              .then(icon => typeof icon === 'string' ? icon : textDecoder.decode(icon))
              .catch(() => null)
            )
          )
      )
}

export function parseQuery(query: string, duplicate = false): string[] {
  if (!/^(?:[a-z0-9\-]+,)+[a-z0-9\-]+|[a-z0-9\-]+$/i.test(query)) {
    throw new Error('Invalid query')
  }

  const words = query.toLowerCase().trim().split(',').map(word => aliases[word] ?? word)
  return duplicate ? words : [...new Set(words)]
}
