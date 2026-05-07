const rawModules = import.meta.glob('../../data/raw/*.md', { eager: true, query: '?raw' })

const rawByTextId = {}
for (const [path, mod] of Object.entries(rawModules)) {
  const filename = path.split('/').pop().replace('.md', '')
  rawByTextId[filename] = mod.default || mod
}

export function useRawLoader() {
  function getRawById(id) {
    return rawByTextId[id] || null
  }

  return { getRawById }
}
