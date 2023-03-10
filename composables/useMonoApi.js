const requestCache = {
  search: {},
  whois: {}
}

export const useMonoApi = () => {
  const runtimeConfig = useRuntimeConfig()

  const makeApiCall = async (path) => {
    const apiRequest = await fetch(runtimeConfig.public.apiBase + path)

    if (!apiRequest.ok) {
      throw new Error('Error fetching results from API')
    }

    return apiRequest
  }

  const getSearchResultsFromApi = async (search) => {
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

  const getWhoisResultFromApi = async (domain) => {
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

  return {
    getSearchResultsFromApi,
    getWhoisResultFromApi
  }
}