<template>
  <div class="w-full max-w-5xl mx-auto px-6 py-44">
    <h1 class="text-8xl font-bold leading-none -ml-0.5 mb-4">all extensions.</h1>
    <p class="text-xl leading-relaxed mb-2">
      here's a list of the
      <span class="font-semibold">{{ formatNumber(extensionsCount) }}</span>
      different extensions that mono has pricing data for.
    </p>

    <ExtensionsList :extensions="extensions" />
  </div>

  <PageFooter />
</template>

<script>
export default {
  name: 'ExtensionsPage',
  async setup() {
    const { getAllExtensionsFromApi } = useMonoApi()

    const allExtensions = await getAllExtensionsFromApi()

    const extensions = {}

    // We want to now group these into alphabetical order
    allExtensions.results.forEach((extension) => {
      const extensionName = extension.name
      const extensionStart = extensionName.substring(1, 2)

      let extensionPointer = null

      if (extensionName.startsWith('.xn--') || !extensionStart.match(/[a-z]/)) {
        extensionPointer = '#'
      } else {
        extensionPointer = extensionStart
      }

      if (extensions[extensionPointer]) {
        extensions[extensionPointer].push(extension)
      } else {
        extensions[extensionPointer] = [extension]
      }
    })

    return {
      extensions,
      extensionsCount: allExtensions.results.length
    }
  },
  methods: {
    formatNumber(value, maximumFractionDigits = 2) {
      return parseFloat(value).toLocaleString(undefined, { maximumFractionDigits })
    }
  }
}
</script>