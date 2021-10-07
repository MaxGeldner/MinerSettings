<template>
  <site-header class="header" />
  <!--<welcome />-->
  <coin-list class="coin-list" />
  <result-page class="result-page" />
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
      const response = await fetch(`http://${process.env.VUE_APP_API_URL}/coins`)
      const coins = await response.json()
      this.$store.state.coins = coins
    },
    async getAndSaveGPUs () {
      const response = await fetch(`http://${process.env.VUE_APP_API_URL}/gpus`)
      const coins = await response.json()
      this.$store.state.gpus = coins
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-flow: column;
  height: 100vh;
  width: 100%;

  .header {
    flex: 0 1 auto;
  }

  .coin-list {
    flex: 1 1 auto;
  }

  .result-page {
    flex: 1 1 auto;
  }
}
</style>
