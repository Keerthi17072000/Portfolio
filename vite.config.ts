import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite = dev server + bundler. The react() plugin enables JSX + fast refresh.
// `base` is the sub-path GitHub Pages serves this repo from:
// https://keerthi17072000.github.io/Portfolio/
export default defineConfig({ base: '/Portfolio/', plugins: [react()] })
