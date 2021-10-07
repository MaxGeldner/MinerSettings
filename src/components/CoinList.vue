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
            shownCoins: this.coins
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
                this.shownCoins = this.coins
            }
        }
    },
    methods: {
        onSearchChanged () {
            this.filter()
        },
        filter () {
            this.shownCoins = this.coins.filter(coin => {
                this.searchValue = this.searchValue.toLowerCase();
                return coin.name.toLowerCase().includes(this.searchValue) || coin.short.toLowerCase().includes(this.searchValue)
            })
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
}
</style>