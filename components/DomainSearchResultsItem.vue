<template>
  <li class="py-1 text-2xl">
    <button class="w-full text-left flex">
      <div class="flex-1">
        <span v-if="result.subdomains" class="opacity-25">{{ result.subdomains }}</span>
        <span class="opacity-75">{{ result.domain }}</span>
        <span>{{ result.extension }}</span>
      </div>
      
      <span :class="{
        'text-amber-400': domainAvailability === '???',
        'text-red-400': domainAvailability === 'no',
        'text-green-400': domainAvailability === 'yes' 
      }">
        {{ domainAvailability }}
      </span>
    </button>
  </li>
</template>

<script>
export default {
  name: 'DomainSearchResultsItem',
  setup() {
    const { getWhoisResultFromApi } = useMonoApi()

    return { getWhoisResultFromApi }
  },
  props: {
    result: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isWhoisSearchComplete: false,
      isDomainAvailable: null,
      whoisInfo: null
    }
  },
  computed: {
    domainAvailability() {
      if (!this.isWhoisSearchComplete) {
        return '...'
      }

      if (this.isDomainAvailable === null) {
        return '???'
      }

      return this.isDomainAvailable ? 'yes' : 'no'
    }
  },
  async mounted() {
    const domain = this.result.domain + this.result.extension

    try {
      const { isDomainAvailable, whoisInfo, error } = await this.getWhoisResultFromApi(domain)

      this.isWhoisSearchComplete = true
      this.isDomainAvailable = isDomainAvailable,
      this.whoisInfo = whoisInfo
    } catch (e) {
      alert(e)
    }
  }
}
</script>