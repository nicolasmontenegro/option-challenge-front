<template lang="pug">
.container
  .columns
    .column.is-12
      form.search(id='search' v-on:submit.prevent='fetchSearch')
        .field.has-addons.p-5
          .control.has-icons-right
            input.input(type='text' id='search-query' placeholder='Text input' :disabled='is_loading.input' required='true' v-model="search_box")
          .control
            button.button.is-primary(type='submit' :class='{ "is-loading": is_loading.input }' :disabled='is_loading.input') Search
  video-search-page(v-if='listQuery.length' v-for='query in listQuery' :query='query')
  .columns.next-page(v-if='listQuery.length')
    .column.is-12
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
