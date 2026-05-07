import { computed } from 'vue'
import { parseTopicMarkdown } from '../utils/markdown.js'

const thoughtModules = import.meta.glob('../../data/thoughts/*/thought.json', { eager: true })
const topicModules = import.meta.glob('../../data/topics/*.md', { eager: true, query: '?raw' })

const thoughtMetas = Object.entries(thoughtModules).map(([path, mod]) => {
  return mod.default || mod
})

const allParsedTopics = Object.values(topicModules).map(raw => {
  return parseTopicMarkdown(raw.default || raw)
})

const topicByThought = {}
for (const topic of allParsedTopics) {
  const thoughtId = topic.meta.thought
  if (!thoughtId) continue
  if (!topicByThought[thoughtId]) topicByThought[thoughtId] = []
  topicByThought[thoughtId].push(topic)
}

const allThoughts = thoughtMetas.map(meta => {
  return {
    ...meta,
    topics: topicByThought[meta.id] || []
  }
})

export function useThoughtLoader() {
  const thoughts = computed(() => allThoughts)

  function getThoughtById(id) {
    return allThoughts.find(t => t.id === id)
  }

  return { thoughts, getThoughtById }
}
