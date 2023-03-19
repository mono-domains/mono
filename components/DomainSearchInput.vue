<template>
  <div class="relative">
    <input
      type="text"
      class="w-full bg-neutral-50 text-2xl shadow-md shadow-neutral-200 hover:shadow-lg focus:shadow-lg transition-shadow duration-300 rounded pl-14 pr-5 py-4 tracking-wide leading-none focus:outline-none"
      placeholder="e.g. mono domains"
      @input="onInput" />

    <button class="absolute left-5 w-6 h-full mt-px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-full">
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
    onInput(e) {
      const inputValue = e.target.value
      this.input = inputValue.replace(/\s/g, '')

      this.$emit('onInput', this.input)
    }
  }
}
</script>