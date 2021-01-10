<template lang="pug">
.container
  .columns
    .column.is-12
      form.search(id='search' v-on:submit.prevent='fetchSearch')
        .field.has-addons.p-5
          .control.has-icons-right
            input.input(type='text' id='search-query' placeholder='Text input' :disabled='is_loading.input' v-model="search_box")
          .control
            button.button.is-primary(type='submit' :class='{ "is-loading": is_loading.input }' :disabled='is_loading.input') Search
  video-search-page(v-if='list_query.length' v-for='query in list_query' :query='query')
  .columns.next-page(v-if='list_query.length')
    .column.is-12
      button(class='button' @click='fetchPage' :class='{ "is-loading": is_loading.button }' :disabled='is_loading.button')
        | More results
</template>

<script>
export default {
  data() {
    return {
      list_query: [],
      search_box: '',
      query: null,
      page_token: null,
      is_loading: {
        input: false,
        button: false,
      },
    }
  },
  computed: {
    urlQuery() {
      const urlQuery = new URL(`${this.$config.urlApi}/yt`)
      urlQuery.searchParams.set('searchQuery', this.search_box)
      if (this.page_token)
        urlQuery.searchParams.set('pageToken', this.page_token)
      return urlQuery
    },
  },
  methods: {
    async fetchSearch(e) {
      this.is_loading.input = true
      this.list_query = []
      this.page_token = null
      await this.callQuery()
      this.is_loading.input = false
    },
    async fetchPage(e) {
      this.is_loading.button = true
      await this.callQuery()
      this.is_loading.button = false
    },
    async callQuery() {
      const query = await this.$axios.$get(this.urlQuery)
      this.page_token = query.nextPageToken
      this.list_query.push(query)
    },
  },
}
</script>

<style lang="sass">
.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
.results *
  &:not(hover)
    color: initial
</style>
