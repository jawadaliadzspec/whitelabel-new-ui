// ~/composables/usePageMeta.ts
import { useRuntimeConfig, useHead } from '#imports'

/**
 * Set the page title and meta description dynamically.
 * @param {string} title - Page-specific title part (before app name).
 * @param {string} [description] - Optional meta description.
 */
export function usePageMeta(title: string, description?: string) {
    const config = useRuntimeConfig()
    const appName = config.public.appName || 'Veckans R'
    useHead({
        title: `${title} | ${appName}`,
        meta: description
            ? [{ name: 'description', content: description }]
            : []
    })
}
