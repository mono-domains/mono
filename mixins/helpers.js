export const helpers = {
  methods: {
    formatNumber(value, minimumFractionDigits = 2, maximumFractionDigits = 2) {
      return parseFloat(value).toLocaleString(undefined, { minimumFractionDigits, maximumFractionDigits }).replace('.00', '')
    }
  }
}