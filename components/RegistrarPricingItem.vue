<template>
  <li
    class="relative mr-3 mb-3 rounded rounded bg-neutral-50 shadow-md shadow-neutral-200 hover:shadow-lg hover:-translate-y-1 transition-all transition-shadow duration-300 leading-normal text-center"
    :class="sizeClasses">
    <a :href="registrar.registerUrl" class="block" :class="isLarge ? 'py-1.5' : 'py-1'" target="_blank" rel="noopener">
      <p class="font-semibold tracking-wide">{{ registrar.name }}</p>
      <p class="tracking-wide">${{ registrar.registerPrice }}</p>
    </a>

    <div
      v-if="registrar.isOnSale"
      class="absolute top-0 right-0 flex justify-center items-center leading-3 bg-red-500 font-semibold text-white rounded-full translate-x-1/3 -translate-y-1/3 -rotate-6"
      :class="saleRibbonSizeClasses">
      $
    </div>
  </li>
</template>

<script>
export default {
  name: 'RegistrarPricingItem',
  props: {
    registrar: {
      type: Object,
      default: null
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeClasses() {
      if (this.isLarge) {
        return 'w-32 text-base'
      }

      return 'w-28 text-sm'
    },
    saleRibbonSizeClasses() {
      if (this.isLarge) {
        return 'w-6 h-6 text-sm'
      }

      return 'w-5.25 h-5.25 text-xs'
    }
  }
}
</script>