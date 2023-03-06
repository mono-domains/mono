<template>
  <div class="flex">
    <input
      type="text"
      class="flex-1 border border-gray-600 rounded-l px-4 py-2 leading-none shadow-sm focus:outline-none"
      placeholder="domainhackz"
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