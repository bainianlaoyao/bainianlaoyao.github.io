<template>
  <div class="chat-page">
    <ChatWindow v-if="topic" :topic="topic" />
    <div v-else class="not-found">
      <p>话题未找到</p>
      <RouterLink to="/">返回首页</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import ChatWindow from '../components/ChatWindow.vue'
import { useTopicLoader } from '../composables/useTopicLoader.js'
import '../styles/chat.css'
import '../styles/animations.css'

const route = useRoute()
const { getTopicById } = useTopicLoader()

const topic = computed(() => getTopicById(route.params.id))
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
  color: #666;
}
.not-found a {
  color: #07c160;
  text-decoration: none;
}
</style>
