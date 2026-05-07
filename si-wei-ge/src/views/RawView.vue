<template>
  <div class="raw-page">
    <main class="raw-reader">
      <header class="raw-topbar">
        <button class="top-icon-btn" @click="router.back()">‹</button>
        <div class="raw-title">{{ topicTitle }}</div>
        <div class="top-icon"></div>
      </header>

      <section v-if="rawContent" class="raw-content" ref="contentRef">
        <div
          v-for="(block, i) in blocks"
          :key="i"
          :class="['raw-block', block.type === 'Q' ? 'q-block' : 'a-block']"
        >
          <span class="raw-block-label">{{ block.type }}</span>
          <div class="raw-block-text">{{ block.text }}</div>
        </div>
      </section>

      <div v-else class="raw-not-found">
        <p>原始讨论未找到</p>
        <RouterLink to="/">返回首页</RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useRawLoader } from '../composables/useRawLoader.js'
import { useTopicLoader } from '../composables/useTopicLoader.js'
import '../styles/raw.css'

const route = useRoute()
const router = useRouter()
const contentRef = ref(null)

const { getRawById } = useRawLoader()
const { getTopicById } = useTopicLoader()

const topicId = computed(() => route.params.id)
const topic = computed(() => getTopicById(topicId.value))
const topicTitle = computed(() => topic.value?.meta?.title || '原始讨论')

const rawContent = computed(() => getRawById(topicId.value))

const blocks = computed(() => {
  if (!rawContent.value) return []
  const text = rawContent.value
  const result = []
  // Split on "# Q:" and "# A:" markers
  const regex = /#\s*([QA])\s*:\s*\n([\s\S]*?)(?=\n#\s*[QA]\s*:|$)/g
  let match
  while ((match = regex.exec(text)) !== null) {
    result.push({
      type: match[1],
      text: match[2].trim()
    })
  }
  return result
})
</script>
