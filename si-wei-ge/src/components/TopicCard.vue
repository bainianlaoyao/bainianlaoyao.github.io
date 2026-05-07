<template>
  <div class="topic-card">
    <div @click="$emit('select')">
      <div class="card-portraits">
        <div
          v-for="sp in displaySpeakers"
          :key="sp.id"
          :class="['card-portrait', sp.type === 'initial' ? 'initial-type' : '']"
          :style="portraitStyle(sp)"
        >{{ sp.type === 'initial' ? sp.initial : '' }}</div>
      </div>
      <h3 class="card-topic-title">{{ topic.meta.title }}</h3>
      <div class="card-meta">
        {{ displaySpeakers.map(s => s.name).join(' · ') }}
        <span>{{ topic.messages.length }}条对话</span>
      </div>
      <svg class="card-squiggle squiggle-line" viewBox="0 0 200 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,3.5 Q10,1 20,3.5 T40,3.5 T60,3.5 T80,3.5 T100,3.5 T120,3.5 T140,3.5 T160,3.5 T180,3.5 T200,3.5" stroke="#a68b55" stroke-width="0.7" fill="none"/>
      </svg>
      <div class="card-hint">点击浏览对话 →</div>
    </div>
    <div v-if="topic.meta.raw" class="card-raw-btn" @click.stop="$emit('selectRaw')">
      原始讨论
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  topic: { type: Object, required: true }
})

defineEmits(['select', 'selectRaw'])

const displaySpeakers = computed(() => {
  return props.topic.speakers.slice(0, 3)
})

function portraitStyle(sp) {
  if (sp.type === 'image') {
    return { backgroundImage: `url(${sp.src})` }
  }
  return { backgroundColor: sp.color }
}
</script>
