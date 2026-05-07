/**
 * Faction color mapping for the four DE attribute groups.
 */
export const FACTION_COLORS = {
  intellect: '#4a7ab5',   // 钴蓝
  psyche:    '#8a5aa0',   // 紫罗兰
  physique:  '#b56a2a',   // 琥珀橙
  motorics:  '#4a8a7a',   // 松石绿
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Highlight speaker name mentions in text using faction colors.
 * @param {string} text - Raw message text
 * @param {Array<{name: string, faction: string}>} speakers - All speakers
 * @returns {string} HTML string with <span class="mention"> for names
 */
export function highlightMentions(text, speakers) {
  const sorted = [...speakers]
    .filter(s => s.name && s.faction)
    .sort((a, b) => b.name.length - a.name.length)

  if (sorted.length === 0) return escapeHtml(text)

  const pattern = sorted.map(s => escapeRegex(escapeHtml(s.name))).join('|')
  const regex = new RegExp(`(${pattern})`, 'g')

  const nameToFaction = {}
  for (const s of sorted) {
    nameToFaction[escapeHtml(s.name)] = FACTION_COLORS[s.faction] || '#666'
  }

  let result = escapeHtml(text)
  result = result.replace(regex, (match) => {
    const color = nameToFaction[match] || '#666'
    return `<span class="mention" style="color:${color}">${match}</span>`
  })
  return result
}
