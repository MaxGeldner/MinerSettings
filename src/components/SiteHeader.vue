<template>
    <va-navbar color="primary" shape class="site-header mb-2">
        <template #left>
            <a class="nav-point" href="mailto:support@minersettings.com">Contact</a>
            <va-divider vertical />
            <a class="nav-point" href="mailto:support@minersettings.com">Bug Reports</a>
            <va-divider vertical />
            <a class="nav-point" href="https://github.com/MaxGeldner/MinerSettings" target="blank">GitHub</a>
            <va-divider vertical />
            <a class="nav-point" @click="showDonations = !showDonations">Donate</a>
        </template>
        <template #center>
            <div>Miner Settings</div>
        </template>
    </va-navbar>
    <va-modal v-model="showDonations" overlay-opacity="0.2" title="Thanks for considering to donate to our project!">
        <slot>
            <div class="donate">At the moment we accept donations only via transactions to one of our wallets:
                <ul class="wallet-list">
                    <li><b>BTC:</b> 3A2iiUvaiat5NthkNQ3gH5SX6BxtVZF8sU</li>
                    <li><b>ETH:</b> 0xBfCF72554F4d1901CD3E1241dDd556Ef6298f7BA</li>
                    <li><b>DOGE:</b> D8iUNysohiH5vHoyBgfYBxSoFwj8bjVzEJ</li>
                    <li><b>ERG:</b> 9gz32JXYuHSzNvtmhPcpUQHUBho5cmyCVkELVPRKMj7HwUA9BCX</li>
                    <li><b>RVN:</b> RAn8KgQ1CeFtC44CTWQMWtXECgziA523nL</li>
                </ul>
                <br>
                If you would like to donate via another method or want to support the project somehow else, please contact <a href="mailto:support@minersettings.com">support@minersettings.com</a>!
            </div>
        </slot>
    </va-modal>
</template>

<script>
export default {
    data () {
        return {
            showDonations: false
        }
    }
}
</script>


<style lang="scss" scoped>
.site-header {
    padding-right: 2rem !important;
    margin-bottom: 0 !important;
    font-family: var(--va-button-font-family,var(--va-font-family));
    font-weight: var(--va-button-font-weight);

    .nav-point {
        font-weight: 100;
        text-decoration: none;
        color: #eeeeeedd;

        &:hover {
            cursor: pointer;
        }
    }
}

.donate {
    font-size: larger;
    line-height: 25px;

    .wallet-list {
        margin-top: 25px;
    }
}
</style>

<style lang="scss">
.va-navbar__left {
    width: 40%;
}

.va-navbar__right {
    width: 40%;
}
</style>