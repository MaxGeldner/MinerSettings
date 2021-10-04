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
  async created () {
    this.getAndSaveCoins()
    this.getAndSaveGPUs()
  },
  methods: {
    async getAndSaveCoins () {
      const response = await fetch('http://localhost:3000/coins')
      const coins = await response.json()
      this.$store.state.coins = coins
    },
    async getAndSaveGPUs () {
      const response = await fetch('http://localhost:3000/gpus')
      const coins = await response.json()
      this.$store.state.gpus = coins
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
