const requestCache = {
  search: {},
  whois: {},
  extension: {},
  allExtensions: null,
  homepageStats: null,
}

export const useMonoApi = () => {
  const runtimeConfig = useRuntimeConfig()

  const makeApiCall = async path => {
    const apiRequest = await fetch(runtimeConfig.public.apiBase + path)

    if (!apiRequest.ok) {
      throw new Error('Error fetching results from API')
    }

    return apiRequest
  }

  const getSearchResultsFromApi = async search => {
    // Check the cache first
    if (requestCache.search[search]) {
      return requestCache.search[search]
    }

    const apiRequest = await makeApiCall(`/search/${search}`)
    const apiJson = await apiRequest.json()

    // Cache the request
    requestCache.search[search] = apiJson

    return apiJson
  }

  const getWhoisResultFromApi = async domain => {
    // Check the cache first
    if (requestCache.whois[domain]) {
      return requestCache.whois[domain]
    }

    const apiRequest = await makeApiCall(`/availability/${domain}`)
    const apiJson = await apiRequest.json()

    // Cache the request
    requestCache.whois[domain] = apiJson

    return apiJson
  }

  const getExtensionPricingResultFromApi = async extension => {
    // Determine the extension category
    let extensionCategory = extension.substring(1, 2)

    if (extension.startsWith('.xn--') || !extensionCategory.match(/[a-z]/)) {
      extensionCategory = '#'
    }

    // If the allExtensions request is cached, fetch from there
    if (requestCache.allExtensions) {
      const allExtensionResults = requestCache.allExtensions.results

      return allExtensionResults[extensionCategory][extension]
    }

    // Check the cache first
    if (requestCache.extension[extension]) {
      return requestCache.extension[extension]
    }

    const apiRequest = await makeApiCall(`/extension/${extension.substring(1)}`)
    const apiJson = await apiRequest.json()

    // Cache the request
    requestCache.extension[extension] = apiJson

    return apiJson
  }

  const getAllExtensionsFromApi = async () => {
    if (requestCache.allExtensions) {
      return requestCache.allExtensions
    }

    const apiRequest = await makeApiCall(`/extension/all`)
    const apiJson = await apiRequest.json()

    requestCache.allExtensions = apiJson

    return apiJson
  }

  const getHomepageStatsFromApi = async () => {
    if (requestCache.homepageStats) {
      return requestCache.homepageStats
    }

    const apiRequest = await makeApiCall(`/homepageStats`)
    const apiJson = await apiRequest.json()

    requestCache.homepageStats = apiJson

    return apiJson
  }

  return {
    getSearchResultsFromApi,
    getWhoisResultFromApi,
    getExtensionPricingResultFromApi,
    getAllExtensionsFromApi,
    getHomepageStatsFromApi,
  }
}
