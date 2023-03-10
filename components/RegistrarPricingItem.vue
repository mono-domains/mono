<template>
  <li
    class="relative w-28 mr-3 mb-3 rounded rounded bg-neutral-50 shadow-md shadow-neutral-200 hover:shadow-lg transition-shadow duration-300 text-sm leading-normal text-center">
    <a :href="registrar.registerUrl" class="block py-1">
      <p>{{ registrar.name }}</p>
      <p>${{ registrar.registerPrice }}</p>
    </a>

    <div v-if="registrar.isOnSale" class="absolute top-0 right-0 flex justify-center items-center leading-none w-5 h-5 bg-red-500 font-semibold text-xs text-white rounded-full translate-x-1/2 -translate-y-1/2 -rotate-6">
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
    }
  }
}
</script>