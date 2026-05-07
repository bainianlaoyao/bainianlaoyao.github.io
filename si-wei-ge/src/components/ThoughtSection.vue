<template>
  <section v-for="thought in thoughts" :key="thought.id" class="thought-section">
    <div class="thought-header">
      <div class="thought-marker"></div>
      <span class="thought-label">思 想</span>
    </div>
    <h2 class="thought-name">{{ thought.name }}</h2>
    <p v-if="thought.description" class="thought-desc">{{ thought.description }}</p>
    <svg class="thought-underline squiggle-line" viewBox="0 0 240 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2,5 Q15,1 30,5 T60,5 T90,5 T120,5 T150,5 T180,5 T210,5 T238,5" stroke="#c9a96e" stroke-width="1" fill="none" stroke-linecap="round"/>
    </svg>
    <div class="topics-grid">
      <TopicCard
        v-for="topic in thought.topics"
        :key="topic.meta.id"
        :topic="topic"
        @select="$emit('selectTopic', topic.meta.id)"
        @selectRaw="$emit('selectRaw', topic.meta.id)"
      />
    </div>
  </section>
</template>

<script setup>
import TopicCard from './TopicCard.vue'

defineProps({
  thoughts: { type: Array, required: true }
})

defineEmits(['selectTopic', 'selectRaw'])
</script>
