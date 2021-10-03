<template>
  <site-header />
  <!--<welcome />-->
  <coin-list />
  <result-page />
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'
// import Welcome from './components/Welcome.vue'
import CoinList from './components/CoinList.vue'
import ResultPage from './components/ResultPage.vue'

export default {
  name: 'App',
  components: {
    SiteHeader,
    // Welcome,
    CoinList,
    ResultPage
  },
  data () {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
