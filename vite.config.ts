import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite = dev server + bundler. The react() plugin enables JSX + fast refresh.
export default defineConfig({ plugins: [react()] })
