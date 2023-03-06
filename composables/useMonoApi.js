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
    const apiRequest = await makeApiCall(`/search/${search}`)

    return await apiRequest.json()
  }

  const getWhoisResultFromApi = async (domain) => {
    const apiRequest = await makeApiCall(`/availability/${domain}`)

    return await apiRequest.json()
  }

  return {
    getSearchResultsFromApi,
    getWhoisResultFromApi
  }
}