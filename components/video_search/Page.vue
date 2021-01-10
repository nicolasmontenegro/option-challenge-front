<template lang="pug">
.columns.results
  .column.is-12
    video-search-item(v-for='item in query.items' :item="item")
</template>

<script>
export default {
  props: {
    query: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
}
</script>
