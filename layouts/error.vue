<template lang="pug">
  .container
    figure.image
      img(:src="`https://httpstatusdogs.com/img/${error.statusCode}.jpg`")
    .description(v-if="error.statusCode === 404")
      h1.title.is-1 Page not found
    .description(v-else)
      h1.title.is-1.has-text-centered An error occurred - {{ error.statusCode }}
      p.has-text-centered
        a(@click="reload") Reload the page
        | , (maybe) the problem will solve.
</template>

<script>
export default {
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page,
  methods: {
    reload() {
      location.reload()
    },
  },
}
</script>

<style lang="sass">
html
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box


*,
*::before, *::after
  box-sizing: border-box
  margin: 0

.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
</style>
