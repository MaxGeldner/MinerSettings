<template>
    <va-card class="card" color="#4006bfdd" :bordered="false" square>
        <va-card-title class="card-title">Select a coin</va-card-title>
        <va-card-content>
            <va-input class="mb-4 coin-search" v-model="searchValue" placeholder="Search for any coin" @input="onSearchChanged">
                <template #prependInner>
                    <va-icon name="search"/>
                </template>
            </va-input>
            <div class="coin-list">
                <coin v-for="coin in shownCoins" :key="coin.id" :name="coin.name" :short="coin.short" :id="coin.id" :image="coin.image" />
            </div>
            <va-button v-if="coins.length > coinsInFirstRow" :icon="allCoinsShown ? 'expand_less' : 'expand_more'" flat class="show-more" @click="onShowAllCoins">Show {{ allCoinsShown ? 'less' : 'more' }}</va-button>
        </va-card-content>
    </va-card>
</template>

<script>
import Coin from './Coin.vue'

export default {
    components: {
        Coin
    },
    data () {
        return {
            searchValue: '',
            shownCoins: this.coins,
            allCoinsShown: false,
            coinsInFirstRow: 8
        }
    },
    computed: {
        coins () {
            return this.$store.state.coins
        }
    },
    watch: {
        coins () {
            if (this.searchValue) {
                this.filter()
            } else {
                this.shownCoins = this.coins.slice(0, this.coinsInFirstRow)
            }
        }
    },
    methods: {
        onSearchChanged () {
            this.filter()
        },
        onShowAllCoins() {
            this.shownCoins = this.allCoinsShown ? this.coins.slice(0, this.coinsInFirstRow) : this.coins
            this.allCoinsShown = !this.allCoinsShown
            this.filter()
        },
        filter () {
            this.shownCoins = this.coins.filter(coin => {
                this.searchValue = this.searchValue.toLowerCase();
                return coin.name.toLowerCase().includes(this.searchValue) || coin.short.toLowerCase().includes(this.searchValue)
            })
            this.shownCoins = !this.allCoinsShown ? this.shownCoins.slice(0, this.coinsInFirstRow) : this.shownCoins
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    color: white;
    box-shadow: none !important;
    border-bottom: 1px solid #eeeeee22;

    .card-title {
        font-size: medium;
    }

    .coin-search {
        width: 40vw;
        margin: 0 auto;
    }

    .coin-list {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .show-more {
        margin-top: 10px;
        color: white !important;

        &:hover {
            background: none !important;
        }
    }
}
</style>