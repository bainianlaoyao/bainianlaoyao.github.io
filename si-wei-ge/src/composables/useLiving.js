import { onMounted, onUnmounted } from 'vue'

const HAND_FONTS = [
  '"Ma Shan Zheng", "STKaiti", "KaiTi", cursive',
  '"ZCOOL KuaiLe", "YouYuan", "STXihei", cursive',
  '"Liu Jian Mao Cao", "STXingkai", "FangSong", cursive',
  '"Zhi Mang Xing", "STXingkai", "KaiTi", cursive',
  '"STXingkai", "STHupo", "YouYuan", cursive',
  '"FangSong", "STFangsong", "KaiTi", serif',
]

const BR_SETS = [
  '14px 8px 16px 8px / 12px 15px 9px 14px',
  '10px 14px 9px 13px / 15px 10px 14px 9px',
  '16px 9px 13px 10px / 10px 14px 11px 15px',
  '8px 15px 11px 14px / 14px 9px 15px 10px',
  '13px 7px 15px 9px / 11px 14px 9px 12px',
]

function makeSquiggleD(w, h, startX, endX) {
  const baseY = h / 2
  const amp = h * 0.7
  const steps = Math.max(5, Math.floor(w / 14))
  const seg = (endX - startX) / steps
  let d = 'M' + startX + ',' + baseY
  for (let i = 0; i < steps; i++) {
    const cx = startX + seg * i + seg / 2
    const cy = baseY + (Math.random() - 0.5) * amp * 2
    const ex = startX + seg * (i + 1)
    d += ' Q' + cx.toFixed(1) + ',' + cy.toFixed(1) + ' ' + ex.toFixed(1) + ',' + baseY
  }
  return d
}

export function useLiving() {
  const timers = []

  function addTimer(fn, ms) {
    const id = setTimeout(fn, ms)
    timers.push(id)
    return id
  }

  function clearAll() {
    timers.forEach(id => clearTimeout(id))
    timers.length = 0
  }

  onMounted(() => {
    // --- Font cycling for title characters ---
    const titleChars = document.querySelectorAll('.title-char')
    function tickTitleChars() {
      if (titleChars.length === 0) return
      const chosenFont = HAND_FONTS[Math.floor(Math.random() * HAND_FONTS.length)]
      titleChars.forEach(span => { span.style.fontFamily = chosenFont })
      addTimer(tickTitleChars, 200 + Math.random() * 200)
    }
    addTimer(tickTitleChars, 800)

    // --- Squiggle path regeneration ---
    const squigglePaths = []
    document.querySelectorAll('.squiggle-line').forEach(svg => {
      const path = svg.querySelector('path')
      if (!path) return
      const vb = svg.getAttribute('viewBox')
      const parts = vb ? vb.split(' ') : ['0', '0', '200', '7']
      squigglePaths.push({
        el: path,
        w: parseFloat(parts[2]) || 200,
        h: parseFloat(parts[3]) || 7
      })
    })

    function tickSquiggles() {
      squigglePaths.forEach(sp => {
        sp.el.setAttribute('d', makeSquiggleD(sp.w, sp.h, 2, sp.w - 2))
      })
      addTimer(tickSquiggles, 150 + Math.random() * 100)
    }
    addTimer(tickSquiggles, 1000)

    // --- Card border-radius jitter ---
    const cards = document.querySelectorAll('.topic-card')
    function tickBorderRadius() {
      cards.forEach(card => {
        card.style.borderRadius = BR_SETS[Math.floor(Math.random() * BR_SETS.length)]
      })
      addTimer(tickBorderRadius, 2500 + Math.random() * 500)
    }
    addTimer(tickBorderRadius, 1400)
  })

  onUnmounted(clearAll)
}
