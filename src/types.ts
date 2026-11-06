// Shared TypeScript shapes. Components receive data that matches these,
// so the editor warns you if you forget a field or mistype one.

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Project {
  code: string // 2-letter badge shown big on the card
  name: string
  subtitle: string
  period: string
  description: string
  tags: string[]
  hue: number // HSL hue used to tint the card
}

export interface Experience {
  period: string
  role: string
  company: string
  points: string[]
}

export interface Fact {
  value?: number // when set, the number counts up
  suffix?: string
  text?: string // static value such as "NL"
  label: string
}

export interface Education {
  period: string
  title: string
  institute: string
  badge: string
  badgeLabel: string
}
