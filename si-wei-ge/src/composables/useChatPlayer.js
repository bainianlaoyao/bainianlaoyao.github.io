import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useChatPlayer(messages) {
  const currentIndex = ref(0)
  const isPlaying = ref(true)
  const isTyping = ref(false)
  let timer = null

  const visibleMessages = computed(() => messages.slice(0, currentIndex.value))
  const total = messages.length
  const progress = computed(() => total ? currentIndex.value / total : 0)
  const isFinished = computed(() => currentIndex.value >= total)

  function readingDelay(text) {
    const chars = text.replace(/\s+/g, '').length
    const marks = (text.match(/[。！？；：\n]/g) || []).length
    return Math.min(11200, Math.max(1350, chars * 155 + marks * 230))
  }

  function typingDelay(text) {
    const chars = text.replace(/\s+/g, '').length
    return Math.min(850, Math.max(260, chars * 10))
  }

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  function showNext() {
    clearTimer()
    isTyping.value = false

    if (!isPlaying.value || currentIndex.value >= total) return

    const msg = messages[currentIndex.value]
    isTyping.value = true

    timer = setTimeout(() => {
      isTyping.value = false
      currentIndex.value++
      if (isPlaying.value && currentIndex.value < total) {
        timer = setTimeout(showNext, readingDelay(msg.text))
      }
    }, typingDelay(msg.text))
  }

  function toggle() {
    isPlaying.value = !isPlaying.value
    clearTimer()
    isTyping.value = false
    if (isPlaying.value) showNext()
  }

  function next() {
    clearTimer()
    isTyping.value = false
    if (currentIndex.value >= total) return
    currentIndex.value++
  }

  function restart() {
    clearTimer()
    isTyping.value = false
    currentIndex.value = 0
    isPlaying.value = true
    setTimeout(showNext, 500)
  }

  onMounted(() => {
    setTimeout(showNext, 600)
  })

  onUnmounted(() => {
    clearTimer()
  })

  return {
    visibleMessages,
    currentIndex,
    isPlaying,
    isTyping,
    progress,
    total,
    isFinished,
    toggle,
    next,
    restart
  }
}
