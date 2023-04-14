<template>
  <div>
    <p class="text-l sm:text-xl leading-relaxed mb-12">
      jump to:
      <span class="ml-1 space-x-1 sm:space-x-1.5">
        <a
          v-for="(section, i) of sections"
          :key="section + i"
          :href="`#${section}`"
          class="text-sky-700 decoration-1 underline underline-offset-4 decoration-transparent hover:decoration-current transition-colors duration-300"
          @click.prevent="jumpToSection(section)">
          {{ section }}
        </a>
      </span>
    </p>

    <div v-for="(section, i) of sections" :key="section + i">
      <h2 :id="section" class="text-2xl sm:text-3xl font-bold tracking-wide mb-6">
        {{ section }}
      </h2>

      <ul class="flex flex-wrap mb-6">
        <ItemPricing
          v-for="(extension) of extensions[section]"
          :key="extension.extension"
          :isExtension="true"
          :isLarge="true"
          :pricing="extension"
          :prefetch="false"
          class="mr-4 mb-6" />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExtensionsList',
  props: {
    extensions: {
      type: Object,
      default: null
    }
  },
  computed: {
    sections() {
      const keys = Object.keys(this.extensions)

      const sortedKeys = keys.sort((a, b) => {
        if (a < b) {
          return -1
        }

        if (a > b) {
          return 1
        }

        return 0
      })

      return sortedKeys
    }
  },
  methods: {
    jumpToSection(section) {
      const sectionHeader = this.$el.querySelector(`#${section}`)

      window.scrollTo({
        top: sectionHeader.offsetTop - 32,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>