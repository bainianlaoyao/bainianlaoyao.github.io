<template>
  <header class="header">
    <svg class="sigil" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="24" stroke="#c9a96e" stroke-width="1.5" opacity="0.5"/>
      <circle cx="26" cy="18" r="6" stroke="#c9a96e" stroke-width="1.2" fill="none" opacity="0.7"/>
      <path d="M14 34 Q20 30 26 34 Q32 38 38 34" stroke="#c9a96e" stroke-width="1.2" fill="none" opacity="0.5"/>
      <line x1="26" y1="24" x2="26" y2="38" stroke="#c9a96e" stroke-width="1" opacity="0.35"/>
    </svg>
    <h1 class="title">
      <span v-for="(char, i) in titleChars" :key="i" class="title-char">{{ char }}</span>
    </h1>
    <p class="subtitle">—— 存放思想的角落 ——</p>
    <svg class="ornament squiggle-line" viewBox="0 0 180 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,7 Q12,1 24,7 T48,7 T72,7 T96,7 T120,7 T144,7 T168,7 T180,7" stroke="#c9a96e" stroke-width="0.9" fill="none"/>
    </svg>
  </header>
</template>

<script setup>
const titleChars = ['思', ' ', '维', ' ', '阁']
</script>
