<template>
    <va-card class="card" color="#682beb" :bordered="false" square outlined>
        <va-card-title>Select a coin</va-card-title>
        <va-card-content>
            <va-input class="mb-4 coin-search" v-model="searchValue" placeholder="Search for any coin" @input="onSearchChanged" />
            <div class="coin-list">
                <coin v-for="coin in shownCoins" :key="coin.short" :name="coin.name" :short="coin.short" />
            </div>
        </va-card-content>
    </va-card>
</template>

<script>
import Coin from './Coin.vue'

export default {
    components: {
        Coin
    },
    props: {
        coins: {
            type: Array,
            default () {
                return [
                    { name: 'Ergo', short: 'ERG' },
                    { name: 'Raven', short: 'RVN' },
                    { name: 'Conflux', short: 'CFX' },
                    { name: 'Bitcoin', short: 'BTC' },
                    { name: 'Ethereum', short: 'ETH' },
                    { name: 'Ethereum Classic', short: 'ETC' },
                ]
            }
        }
    },
    data () {
        return {
            searchValue: '',
            shownCoins: this.coins
        }
    },
    methods: {
        onSearchChanged () {
            this.shownCoins = this.coins.filter(coin => coin.name.includes(this.searchValue) || coin.short.includes(this.searchValue))
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    color: white;

    .coin-search {
        width: 10vw;
    }

    .coin-list {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>