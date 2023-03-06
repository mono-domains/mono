export const debounce = {
  data() {
    return {
      debounceTimeouts: {}
    }
  },
  methods: {
    debounce(func, time) {
      // Generate a unique name for the timeout
      const timeoutName = func.name + time

      // If there's already a timeout called that, clear it
      if (this.debounceTimeouts[timeoutName]) {
        clearTimeout(this.debounceTimeouts[timeoutName])
      }

      // Then create a new timeout under that name
      this.debounceTimeouts[timeoutName] = setTimeout(func, time)
    }
  }
}
