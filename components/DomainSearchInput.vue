<template>
  <div class="flex">
    <input
      type="text"
      class="flex-1 bg-neutral-50 text-2xl shadow-md shadow-neutral-200 hover:shadow-lg focus:shadow-lg transition-shadow duration-300 rounded px-5 py-4 tracking-wide leading-none focus:outline-none"
      placeholder="e.g mono domains"
      @input="onInput" />
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