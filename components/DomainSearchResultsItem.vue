<template>
  <li class="py-2">
    <button class="w-full text-left flex transition-opacity duration-300 text-2xl" :class="{ 'opacity-50': isDomainAvailable === false }">
      <div class="flex-1">
        <span v-if="result.subdomains" class="text-neutral-300">{{ result.subdomains }}</span>
        <span>{{ result.domain }}</span>
        <span class="text-neutral-700">{{ result.extension.extension }}</span>
      </div>
      
      <span :class="{
        'text-amber-500': domainAvailability === '???',
        'text-red-500': domainAvailability === 'no',
        'text-green-500': domainAvailability === 'yes'
      }">
        {{ domainAvailability }}
      </span>
    </button>

    <div v-if="whoisSearchStatus !== 'pending'" class="py-4 ml-4">
      <!-- Domain is taken -->
      <div v-if="isDomainAvailable === false">
        <p class="text-xl mb-4">this domain is taken 😔</p>
        <pre class="max-w-3xl max-h-60 rounded bg-neutral-50 px-8 py-6 text-sm shadow-md shadow-neutral-200 overflow-auto whitespace-pre-line">{{ whoisInfo }}</pre>
      </div>

      <!-- Domain is available/unknown -->
      <div v-else>
        <p v-if="domainAvailability === '???'" class="text-xl mb-4">this domain might be available!</p>
        <p v-else class="text-xl mb-4">this domain is available!</p>

        <RegistrarPricing :registrars="result.extension.registrars" />
      </div>
    </div>
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
      whoisSearchStatus: 'pending',
      isDomainAvailable: null,
      whoisInfo: null
    }
  },
  computed: {
    domainAvailability() {
      if (this.whoisSearchStatus === 'pending') {
        return '...'
      }

      if (this.whoisSearchStatus === 'error') {
        return '???'
      }

      return this.isDomainAvailable ? 'yes' : 'no'
    }
  },
  mounted() {
    this.setDomainAvailabilityInfo()
  },
  methods: {
    async setDomainAvailabilityInfo() {
      const domain = this.result.domain + this.result.extension.extension

      try {
        const { success, isDomainAvailable, whoisInfo, error } = await this.getWhoisResultFromApi(domain)

        if (!success) {
          this.whoisSearchStatus = 'error'

          return
        }

        this.whoisSearchStatus = 'success'
        this.isDomainAvailable = isDomainAvailable,
        this.whoisInfo = whoisInfo.trim()
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>