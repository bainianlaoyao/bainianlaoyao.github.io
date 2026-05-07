<template>
  <footer class="player">
    <div class="progress-line">
      <div class="progress">
        <div class="bar" :style="{ width: (progress * 100) + '%' }"></div>
      </div>
      <span>{{ current }} / {{ total }}</span>
    </div>
    <div class="buttons">
      <button class="primary" @click="$emit('toggle')">{{ playing ? '暂停' : '继续' }}</button>
      <button class="secondary" @click="$emit('next')">下一条</button>
      <button class="secondary" @click="$emit('restart')">重播</button>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  progress: { type: Number, required: true },
  playing: { type: Boolean, required: true }
})

defineEmits(['toggle', 'next', 'restart'])
</script>
