<template>
  <div :class="['msg', message.side]">
    <div
      v-if="message.side === 'left'"
      :class="['avatar', message.avatar.type === 'initial' ? 'initial-type' : 'image-type']"
      :style="avatarStyle"
    >{{ avatarContent }}</div>

    <div class="main">
      <div class="name" :style="nameStyle">{{ speakerName }}</div>
      <div class="bubble-line">
        <div class="bubble" v-html="highlightedText"></div>
        <span class="stamp">{{ timeFor(index) }}</span>
      </div>
    </div>

    <div
      v-if="message.side === 'right'"
      :class="['avatar', message.avatar.type === 'initial' ? 'initial-type' : 'image-type']"
      :style="avatarStyle"
    >{{ avatarContent }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FACTION_COLORS, highlightMentions } from '../utils/factions.js'

const props = defineProps({
  message: { type: Object, required: true },
  speakerName: { type: String, default: '' },
  speakers: { type: Array, default: () => [] },
  index: { type: Number, required: true }
})

const avatarStyle = computed(() => {
  if (props.message.avatar.type === 'image') {
    const base = { backgroundImage: `url(${props.message.avatar.src})` }
    const faction = props.message.avatar?.faction
    if (faction && FACTION_COLORS[faction]) {
      base.boxShadow = `0 0 0 2px ${FACTION_COLORS[faction]}60`
    }
    return base
  }
  const base = { backgroundColor: props.message.avatar.color }
  const faction = props.message.avatar?.faction
  if (faction && FACTION_COLORS[faction]) {
    base.boxShadow = `0 0 0 2px ${FACTION_COLORS[faction]}60`
  }
  return base
})

const avatarContent = computed(() => {
  if (props.message.avatar.type === 'initial') {
    return props.message.avatar.initial
  }
  return ''
})

const nameStyle = computed(() => {
  const faction = props.message.avatar?.faction
  if (faction && FACTION_COLORS[faction]) {
    return { color: FACTION_COLORS[faction] }
  }
  return {}
})

const highlightedText = computed(() => {
  return highlightMentions(props.message.text, props.speakers)
})

function timeFor(i) {
  const minute = 7 + Math.floor(i / 4)
  return '20:' + String(minute).padStart(2, '0')
}
</script>
