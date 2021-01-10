<template lang="pug">
.columns.is-justify-content-center.flex-wrap.video-item
  .column.is-narrow
    a(:href='`https://youtu.be/${item.id.videoId}`' target='_blank')
      img.p-2(:src='item.snippet.thumbnails.default.url')
  .column.is-8
    a(:href='`https://youtu.be/${item.id.videoId}`' target='_blank')
      p.is-size-4.m-0 {{item.snippet.title}}
    p.is-size-6.m-0 {{item.snippet.description}}
    p.is-size-7.m-0 {{item.snippet.channelTitle}}
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
}
</script>

<style lang="sass">
.video-item
  & > *
    cursor: pointer
</style>
