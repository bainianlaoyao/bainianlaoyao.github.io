import { computed } from 'vue'
import { parseTopicMarkdown } from '../utils/markdown.js'

// Vite glob import — path relative to this file (src/composables/ → two levels up to project root)
const rawModules = import.meta.glob('../../data/topics/*.md', { eager: true, query: '?raw' })

// Parse all topics once at module load time (build-time)
const allTopics = Object.values(rawModules).map(raw => {
  return parseTopicMarkdown(raw.default || raw)
})

export function useTopicLoader() {
  const topics = computed(() => allTopics)

  function getTopicById(id) {
    return allTopics.find(t => t.meta.id === id)
  }

  return { topics, getTopicById }
}
