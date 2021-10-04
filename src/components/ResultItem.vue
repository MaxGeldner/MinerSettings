<template>
    <va-card class="result-card" color="#682beb" :bordered="true" square outlined>
        <va-card-title class="result-title">
            <va-button-group class="vote-buttons vertical">
                <va-button class="vote-down" icon="expand_more" @click="vote(-1)" />
                <va-button class="vote-up" icon="expand_less" @click="vote(1)" />
            </va-button-group>
            <va-chip :color="getRatingColor(rating)">{{ rating }}</va-chip>
            <va-divider vertical />
            {{ gpu }}: {{ title }}
        </va-card-title>
        <va-card-content>
            <div class="result-description">
                {{ description }}
            </div>
            <div class="result-chips">
                <va-chip class="result-chip" color="primary">{{ efficiency }} Mh/Watt</va-chip>
                <va-chip class="result-chip" color="primary">{{ hashrate / (1000 * 1000)}} Mh/s</va-chip>
                <va-chip class="result-chip" color="primary">{{ wattage }} W</va-chip>
            </div>
        </va-card-content>
    </va-card>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            default: -1
        },
        title: {
            type: String,
            default: 'Result title'
        },
        gpu: {
            type: String,
            default: 'GPU'
        },
        description: {
            type: String,
            default: 'No description'
        },
        rating: {
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
    data () {
        return {
            efficiency: ((this.hashrate / (1000 * 1000)) / this.wattage).toFixed(2)
        }
    },
    methods: {
        async vote (value) {
            console.log(value)
            await fetch('http://localhost:3000/rate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        id: this.id,
                        upvote: value > 0,
                        downvote: value < 0
                    }
                )
            });
        },
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

        .vote-buttons {
            transform: rotate(0.75turn) scale(0.45, 1);
            margin: -20px -20px -20px -40px;

            .vote-up {
                transform: rotate(-0.75turn) scale(1, 1.3) translate(8%, 0px);
            }

            .vote-down {
                transform: rotate(-0.75turn) scale(1, 1.3) translate(-8%, 0px);
            }
        }
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