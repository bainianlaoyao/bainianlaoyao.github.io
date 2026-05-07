import { describe, it, expect } from 'vitest'
import { parseTopicMarkdown } from '../markdown.js'

const SAMPLE_MD = `---
id: test-topic
title: 测试话题
subtitle: 副标题
group: 测试群(3)
announce: |
  【群公告】今晚讨论测试话题
speakers:
  - id: alice
    name: 爱丽丝
    side: right
    type: initial
    initial: 爱
    color: "#ff0000"
  - id: bob
    name: 鲍勃
    side: left
    type: image
    src: https://example.com/bob.png
---

## 爱丽丝

大家好，我先说两句。

## 鲍勃

好的，请讲。

## 爱丽丝

这就是我的观点。
非常精彩。`

describe('parseTopicMarkdown', () => {
  it('解析 frontmatter 元数据', () => {
    const result = parseTopicMarkdown(SAMPLE_MD)
    expect(result.meta.id).toBe('test-topic')
    expect(result.meta.title).toBe('测试话题')
    expect(result.meta.group).toBe('测试群(3)')
  })

  it('解析 speakers 列表', () => {
    const result = parseTopicMarkdown(SAMPLE_MD)
    expect(result.speakers).toHaveLength(2)
    expect(result.speakers[0].id).toBe('alice')
    expect(result.speakers[1].type).toBe('image')
  })

  it('按 ## 分割生成消息列表', () => {
    const result = parseTopicMarkdown(SAMPLE_MD)
    expect(result.messages).toHaveLength(3)
  })

  it('消息包含正确的角色信息', () => {
    const result = parseTopicMarkdown(SAMPLE_MD)
    const msg0 = result.messages[0]
    expect(msg0.speaker).toBe('alice')
    expect(msg0.side).toBe('right')
    expect(msg0.avatar).toEqual({ type: 'initial', initial: '爱', color: '#ff0000' })
  })

  it('image 类型头像正确解析', () => {
    const result = parseTopicMarkdown(SAMPLE_MD)
    const msg1 = result.messages[1]
    expect(msg1.speaker).toBe('bob')
    expect(msg1.avatar).toEqual({ type: 'image', src: 'https://example.com/bob.png' })
  })

  it('消息文本正确拼接', () => {
    const result = parseTopicMarkdown(SAMPLE_MD)
    expect(result.messages[0].text).toBe('大家好，我先说两句。')
    expect(result.messages[2].text).toBe('这就是我的观点。\n非常精彩。')
  })

  it('空内容不产生消息', () => {
    const emptyMd = `---
id: empty
title: 空
speakers: []
---

## 爱丽丝
`
    const result = parseTopicMarkdown(emptyMd)
    expect(result.messages).toHaveLength(0)
  })
})
