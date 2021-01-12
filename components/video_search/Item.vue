<template lang="pug">
.video-item.box.mb-4.is-clickable(@click='openLink')
  article.media
    .media-left
      a(:href='`https://youtu.be/${item.id.videoId}`' target='_blank')
        figure.image.is-16by9
          img(:src='item.snippet.thumbnails.high.url')
    .media-content
      .content
        a(:href='`https://youtu.be/${item.id.videoId}`' target='_blank')
          p.title.is-size-4.m-0 {{item.snippet.title}}
        p.channel.is-size-7.m-0.mb-2 {{item.snippet.channelTitle}}
        p.description.is-size-6.m-0 {{item.snippet.description}}
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
  methods: {
    openLink() {
      window.open(`https://youtu.be/${this.item.id.videoId}`, '_blank')
    },
  },
}
</script>

<style lang="sass">
.video-item
  &
    box-shadow: 0 0px 0 1px rgba(10, 10, 10, 0.11)
    transition: box-shadow ease 333ms
  &:hover, &:active, &:focus
    box-shadow: 0 0 1.2em -0.125em rgba(10, 10, 10, 0.3), 0 0px 0 1px rgba(10, 10, 10, 0.11)

  .media
    @media screen and (max-width: $tablet)
      flex-direction: column

      .media-left
        max-width: 222px
        padding-bottom: .75em

    .media-left
      max-width: 175px
      width: 100%

      img
        object-fit: cover
        object-position: center

    .content .description
      display: block
      text-overflow: ellipsis
      word-wrap: break-word
      overflow: hidden
      max-height: 2.4em
      line-height: 1.2em
</style>
