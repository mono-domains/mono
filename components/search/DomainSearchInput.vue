<template>
  <div class="relative">
    <input
      v-model="input"
      type="text"
      class="w-full bg-neutral-50 text-xl sm:text-2xl shadow-md shadow-neutral-200 hover:shadow-lg focus:shadow-lg transition-shadow duration-300 rounded pl-12 sm:pl-14 pr-5 py-4 tracking-wide leading-none focus:outline-none"
      placeholder="e.g. mono domains"
      @input="emitEvent(input)" />

    <button
      class="absolute top-0 left-0 w-12 sm:w-14 h-full pt-0.5 pl-0.5 flex items-center justify-center"
       aria-label="Search"
      @click="emitEvent(input)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-5 sm:w-6">
        <path d="m23.809 21.646-6.205-6.205a9.68 9.68 0 0 0 1.857-5.711C19.461 4.365 15.096 0 9.73 0 4.365 0 0 4.365 0 9.73c0 5.366 4.365 9.73 9.73 9.73a9.678 9.678 0 0 0 5.487-1.698L21.455 24l2.354-2.354zM2.854 9.73c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877A6.884 6.884 0 0 1 2.854 9.73z"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'DomainSearchInput',
  data() {
    return {
      input: ''
    }
  },
  methods: {
    emitEvent(value) {
      this.$emit('onInput', value)
    }
  }
}
</script>