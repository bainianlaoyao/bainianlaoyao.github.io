<template>
  <main class="phone">
    <header class="topbar">
      <button class="top-icon-btn" @click="router.back()">‹</button>
      <div class="room-title">{{ topic.meta.group || topic.meta.title }}</div>
      <div class="top-icon">···</div>
    </header>

    <section class="chat" ref="chatRef">
      <ChatMessage
        v-for="(msg, i) in visibleMessages"
        :key="i"
        :message="msg"
        :speaker-name="getSpeakerName(msg.speaker)"
        :speakers="topic.speakers"
        :index="i"
      />

      <TypingIndicator
        v-if="isTyping"
        :side="currentMessageSide"
      />
    </section>

    <ChatPlayer
      :current="currentIndex"
      :total="total"
      :progress="progress"
      :playing="isPlaying"
      @toggle="toggle"
      @next="next"
      @restart="restart"
    />
  </main>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ChatMessage from './ChatMessage.vue'
import TypingIndicator from './TypingIndicator.vue'
import ChatPlayer from './ChatPlayer.vue'
import { useChatPlayer } from '../composables/useChatPlayer.js'

const props = defineProps({
  topic: { type: Object, required: true }
})

const router = useRouter()
const chatRef = ref(null)

const {
  visibleMessages,
  currentIndex,
  isPlaying,
  isTyping,
  progress,
  total,
  toggle,
  next,
  restart
} = useChatPlayer(props.topic.messages)

const currentMessageSide = computed(() => {
  if (currentIndex.value >= props.topic.messages.length) return 'left'
  return props.topic.messages[currentIndex.value].side
})

function getSpeakerName(speakerId) {
  const speaker = props.topic.speakers.find(s => s.id === speakerId)
  return speaker ? speaker.name : speakerId
}

function scrollBottom() {
  if (chatRef.value) {
    chatRef.value.scrollTop = chatRef.value.scrollHeight
  }
}

watch([visibleMessages, isTyping], () => {
  nextTick(scrollBottom)
})

function handleKeydown(e) {
  if (e.code === 'Space') {
    e.preventDefault()
    toggle()
  }
  if (e.key === 'ArrowRight') {
    next()
  }
  if (e.key.toLowerCase() === 'r') {
    restart()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
