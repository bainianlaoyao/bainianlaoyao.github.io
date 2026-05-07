<template>
  <div :class="['typing-row', side]">
    <div
      v-if="side === 'left'"
      class="avatar initial-type"
      style="background-color: #444"
    ></div>

    <div :class="['typing', side]">
      <span></span><span></span><span></span>
    </div>

    <div
      v-if="side === 'right'"
      class="avatar initial-type"
      style="background-color: #444"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  side: { type: String, required: true, validator: v => ['left', 'right'].includes(v) }
})
</script>
