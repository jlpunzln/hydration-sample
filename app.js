import { createSSRApp } from 'vue'

export function createHydratedApp() {
  return createSSRApp({
    data: () => ({ count: 0 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}