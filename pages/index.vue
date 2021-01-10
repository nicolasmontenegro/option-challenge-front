<template lang="pug">
.container
  .columns
    .column.is-12
      form.search(id='search' v-on:submit.prevent="onSubmit")
        .field.has-addons.p-5
          .control.has-icons-right
            input.input(type='text' id='search-query' placeholder='Text input' v-model="search_box")
            span.icon.is-small.is-right(v-if='is_loading')
              font-awesome-icon.fa-pulse(icon='spinner')
          .control
            button.button.is-primary(type='submit') Search
  .columns.results(v-if='query')
    .column.is-12
      a(v-for='item in query.items' :href='`https://youtu.be/${item.id.videoId}`' target='_blank')
        .columns.is-justify-content-center.flex-wrap
          .column.is-narrow
            img.p-2(:src='item.snippet.thumbnails.default.url')
          .column.is-8
            p.is-size-4.m-0 {{item.snippet.title}}
            p.is-size-6.m-0 {{item.snippet.description}}
            p.is-size-7.m-0 {{item.snippet.channelTitle}}
</template>

<script>
export default {
  data() {
    return {
      search_box: '',
      query: null,
      is_loading: false,
    }
  },
  computed: {
    urlQuery() {
      const urlQuery = new URL(`${this.$config.urlApi}/yt`)
      urlQuery.searchParams.set('search_query', this.search_box)
      return urlQuery
    },
  },
  methods: {
    async onSubmit(e) {
      this.is_loading = true
      this.query = await this.$axios.$get(this.urlQuery)
      this.is_loading = false
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
