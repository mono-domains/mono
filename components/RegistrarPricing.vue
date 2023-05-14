<template>
  <ul class="flex flex-wrap -mb-3">
    <component
      :is="extension ? 'h2' : 'h3'"
      class="w-full font-semibold tracking-wide text-xl sm:text-2xl mb-4">
      cheapest {{ extension }} registration
    </component>
    <ItemPricing
      :isLarge="true"
      :pricing="cheapestRegistrar" />

    <template v-if="otherRegistrars.length">
      <h3 class="w-full font-semibold tracking-wide text-l sm:text-xl mt-5 mb-4">other registrars</h3>
      <ItemPricing
        v-for="(registrar, key) in otherRegistrars" :key="registrar + key"
        :pricing="registrar" />
    </template>
  </ul>
</template>

<script>
export default {
  name: 'RegistrarPricing',
  props: {
    extension: {
      type: String,
      default: ''
    },
    registrars: {
      type: Array,
      default: null
    }
  },
  computed: {
    cheapestRegistrar() {
      return this.registrars[0]
    },
    otherRegistrars() {
      return this.registrars.slice(1)
    }
  }
}
</script>