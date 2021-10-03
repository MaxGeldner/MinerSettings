<template>
    <va-card class="result-card" color="#682beb" :bordered="true" square outlined>
        <va-card-title class="result-title">
            <va-chip :color="getRatingColor(rating)">{{ rating }}</va-chip>
            <va-divider vertical />
            {{ title }}
        </va-card-title>
        <va-card-content>
            <div class="result-description">{{ description }}</div>
            <div class="result-chips">
                <va-chip class="result-chip" color="primary">{{ efficiency }} MH/Watt</va-chip>
                <va-chip class="result-chip" color="primary">{{ hashrate / (1000 * 1000)}} MH/s</va-chip>
                <va-chip class="result-chip" color="primary">{{ wattage }} W</va-chip>
            </div>
        </va-card-content>
    </va-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Result title'
        },
        description: {
            type: String,
            default: 'Result description'
        },
        rating: {
            type: Number,
            default: 0
        },
        efficiency: {
            type: Number,
            default: 0
        },
        wattage: {
            type: Number,
            default: 0
        },
        hashrate: {
            type: Number,
            default: 0
        },
    },
    methods: {
        getRatingColor (rating) {
            if (rating >= 75) {
                return 'success'
            } else if (rating < 75 && rating >= 50) {
                return 'warning'
            } else if (rating < 50) {
                return 'danger'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.result-card {
    text-align: left;
    width: 100%;

    .result-title {
        color: white;
        font-size: large;
    }

    .result-description {
        margin-bottom: 10px;
        color: #ffffffee
    }

    .result-chip {
        margin: 5px;
    }
}
</style>