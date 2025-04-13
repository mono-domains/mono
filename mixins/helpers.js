export const helpers = {
  methods: {
    formatNumber(value, minimumFractionDigits = 2, maximumFractionDigits = 2) {
      return parseFloat(value)
        .toLocaleString(undefined, {
          minimumFractionDigits,
          maximumFractionDigits,
        })
        .replace('.00', '')
    },
    getTextDirection(text) {
      const arabicRegex = /[\u0600-\u06FF]/
      const isTextArabic = arabicRegex.test(text)

      return isTextArabic ? 'rtl' : 'ltr'
    },
  },
}
