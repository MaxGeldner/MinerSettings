<template>
    <va-card class="card" color="#682beb" :bordered="false" square outlined>
        <va-card-title>Results {{ searchedCoin ? `for ${searchedCoin}` : '' }} </va-card-title>
        <va-card-content>
            <!--<va-card class="result-filter" square outlined>
                <va-card-title>Filter Results</va-card-title>
                <va-card-content>
                    Wattage:
                    <va-slider v-model="wattageSliderRange" range @change="onWattageChange">
                        <template #prepend>
                            <va-input v-model="lowWattage" readonly />
                        </template>
                        <template #append>
                            <va-input v-model="highWattage" readonly />
                        </template>
                    </va-slider>
                </va-card-content>
            </va-card>-->
            <va-button-group class="mb-4">
                <va-button :rounded="false" @click="sortBy('rating')" disabled>Sort By: </va-button>
                <va-button :rounded="false" @click="sortBy('rating')">Score</va-button>
                <va-button :rounded="false" @click="sortBy('eff')">Efficiency</va-button>
                <va-button :rounded="false" @click="sortBy('hashrate')">Hashrate</va-button>
                <va-button :rounded="false" @click="sortBy('wattage')">Wattage</va-button>
            </va-button-group>
            <div v-if="shownResults.length > 0" class="results">
                <result-item v-for="result in shownResults" :key="result.id"
                    :title="result.title" :rating="result.rating || 0" :efficiency="result.efficiency || 0" :hashrate="result.hashrate || 0" :wattage="result.wattage || 0"
                />
            </div>
            <div v-else>
                No results for this coin! Be the first one to add one!<br><br>
                <va-button rounded @click="sortBy('wattage')">+ Add setting for "{{ searchedCoin }}"</va-button>
            </div>
        </va-card-content>
    </va-card>
</template>

<script>
import ResultItem from './ResultItem.vue'

export default {
    components: {
        ResultItem
    },
    props: {
        results: {
            type: Array,
            default () {
                return [
                    { title: 'Top ERGO Hashes/Watt setup!', coin: 'ERG', rating: 72, id: 0 },
                    { title: 'My Ethereum Setup', coin: 'ETH', rating: 87, id: 1 },
                    { title: 'Found these settings for RVN', coin: 'RVN', rating: 22, id: 2 },
                    { title: 'Awesome Hashes/Watt for RVN!', coin: 'RVN', rating: 51, id: 3 },
                    { title: 'Good setting.', coin: 'CFX', rating: 73, id: 4 },
                ]
            }
        }
    },
    data () {
        return {
            /*wattageSliderRange: [0, 100],
            lowWattage: 0,
            highWattage: 100,
            maxWattage: 1000,*/
            shownResults: this.results,
            sortDir: 0
        }
    },
    computed: {
        searchedCoin () {
            console.log('recomputed searchedCoin')
            return this.$store.state.searchedCoin
        }
    },
    watch: {
        searchedCoin (newValue) {
            console.log('searchedCoin changed')
            this.shownResults = this.results.filter(setting => setting.coin === newValue)
            this.sortBy('rating')
        }
    },
    created () {
        this.sortBy('rating')
    },
    methods: {
        onWattageChange (evt) {
            this.lowWattage = evt[0] * this.maxWattage
            this.highWattage = evt[1] * this.maxWattage
        },
        sortBy (prop) {
            const results = [ ...this.shownResults ]
            if (this.sortDir === -1 || this.sortDir === 0) {
                this.shownResults = results.sort((a, b) => (a[prop] > b[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0))
                this.sortDir = 1
            } else if (this.sortDir === 1) {
                this.shownResults = results.sort((a, b) => (a[prop] > b[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0)).reverse()
                this.sortDir = -1
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    color: white;
    height: 100%;
    float: left;
    width: 100vw;

    .result-filter {
        float: left;
        width: 15vw;
    }

    .results {
        width: 100vw;
        display: flex;
        gap: 10px;
        align-items: stretch;
    }
}
</style>