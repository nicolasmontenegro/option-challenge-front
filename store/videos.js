export const state = () => ({
  list_query: [],
  search_query: '',
  page_token: null,
  url_query: null,
})

export const mutations = {
  pushQuery(state, query) {
    state.list_query.push(query)
    state.page_token = query.nextPageToken
  },
  setSearchQuery(state, searchQuery) {
    state.search_query = searchQuery
    state.list_query = []
    state.page_token = null
  },
  setURL(state) {
    const urlQuery = new URL(`${this.$config.urlApi}/yt`)
    urlQuery.searchParams.set('searchQuery', state.search_query)
    if (state.page_token)
      urlQuery.searchParams.set('pageToken', state.page_token)
    state.url_query = urlQuery
  },
}

export const actions = {
  async search({ commit, state }, searchQuery) {
    commit('setSearchQuery', searchQuery)
    commit('setURL')
    const query = await this.$axios.$get(state.url_query)
    commit('pushQuery', query)
  },
  async nextPage({ commit, state }) {
    commit('setURL')
    const query = await this.$axios.$get(state.url_query)
    commit('pushQuery', query)
  },
}
