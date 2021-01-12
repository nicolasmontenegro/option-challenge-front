<template lang="pug">
.container
  .columns
    .column.is-12
      form.search(id='search' v-on:submit.prevent='fetchSearch')
        .field.has-addons.p-5
          .control.has-icons-right
            input.input(type='text' id='search-query' placeholder='Search' :disabled='is_loading.input' required='true' v-model="search_box")
          .control
            button.button.is-primary(type='submit' :class='{ "is-loading": is_loading.input }' :disabled='is_loading.input')
              font-awesome-icon(icon='search')
  .columns.is-justify-content-space-around.results(v-if='listQuery.length')
    .column.is-8
      p.px-5.pb-3.is-size-7
        | {{ listQuery[0].pageInfo.totalResults }} videos found for search
        strong &nbsp;{{ searchQuery }}
      video-search-page(v-for='query in listQuery' :query='query')
      .column.is-12.is-flex.is-justify-content-space-around.next-page
        button(class='button' @click='fetchPage' :class='{ "is-loading": is_loading.button }' :disabled='is_loading.button')
          | More results
</template>

<script>
export default {
  data() {
    return {
      search_box: '',
      is_loading: {
        input: false,
        button: false,
      },
    }
  },
  computed: {
    listQuery() {
      return this.$store.state.videos.list_query
    },
    searchQuery() {
      return this.$store.state.videos.search_query
    },
  },
  methods: {
    async fetchSearch(e) {
      this.is_loading.input = true
      await this.$store.dispatch('videos/search', this.search_box)
      this.is_loading.input = false
    },
    async fetchPage(e) {
      this.is_loading.button = true
      await this.$store.dispatch('videos/nextPage', this.search_box)
      this.is_loading.button = false
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
