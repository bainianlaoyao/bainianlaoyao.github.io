<template>
  <div class="pavilion">
    <PavilionHeader />
    <ThoughtSection
      :thoughts="thoughts"
      @selectTopic="goToChat"
      @selectRaw="goToRaw"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PavilionHeader from '../components/PavilionHeader.vue'
import ThoughtSection from '../components/ThoughtSection.vue'
import { useThoughtLoader } from '../composables/useThoughtLoader.js'
import { useLiving } from '../composables/useLiving.js'
import '../styles/pavilion.css'
import '../styles/animations.css'

const router = useRouter()
const { thoughts } = useThoughtLoader()

useLiving()

function goToChat(id) {
  router.push('/chat/' + id)
}

function goToRaw(id) {
  router.push('/raw/' + id)
}
</script>
