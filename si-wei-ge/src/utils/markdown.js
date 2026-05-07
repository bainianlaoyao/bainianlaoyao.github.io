import yaml from 'js-yaml'

/**
 * Browser-compatible frontmatter parser.
 * Splits on --- delimiters, parses YAML with js-yaml.
 */
function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: rawContent }
  return { data: yaml.load(match[1]) || {}, content: match[2] }
}

/**
 * Parse a topic Markdown file into structured data.
 * Frontmatter (YAML) contains meta + speakers definition.
 * Body uses ## SpeakerName as message delimiters.
 *
 * @param {string} rawContent - Raw markdown content
 * @returns {{ meta: object, speakers: Array, messages: Array }}
 */
export function parseTopicMarkdown(rawContent) {
  const { data: meta, content } = parseFrontmatter(rawContent)

  const speakerMap = {}
  if (meta.speakers) {
    for (const s of meta.speakers) {
      speakerMap[s.name] = s
    }
  }

  const messages = []
  const lines = content.split('\n')
  let currentSpeakerName = null
  let currentTextLines = []

  function flushMessage() {
    if (currentSpeakerName === null) return
    const text = currentTextLines.join('\n').trim()
    if (text.length === 0) return

    const speaker = speakerMap[currentSpeakerName]
    if (!speaker) return

    const avatar = speaker.avatar || (
      speaker.type === 'image'
        ? { type: 'image', src: speaker.src }
        : { type: 'initial', initial: speaker.initial, color: speaker.color }
    )
    if (speaker.faction) {
      avatar.faction = speaker.faction
    }

    messages.push({
      speaker: speaker.id,
      side: speaker.side,
      avatar,
      text
    })
  }

  for (const line of lines) {
    const match = line.match(/^## (.+)$/)
    if (match) {
      flushMessage()
      currentSpeakerName = match[1].trim()
      currentTextLines = []
    } else {
      currentTextLines.push(line)
    }
  }
  flushMessage()

  return { meta, speakers: meta.speakers || [], messages }
}
