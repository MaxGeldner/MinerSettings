<template>
    <va-navbar color="primary" shape class="site-header mb-2">
        <template #left>
            <a class="nav-point">Imprint</a>
            <va-divider vertical />
            <a class="nav-point" href="mailto:support@minersettings.com">Contact</a>
            <va-divider vertical />
            <a class="nav-point" href="https://github.com/MaxGeldner/MinerSettings" target="blank">GitHub</a>
            <va-divider vertical />
        </template>
        <template #center>
            <div>Miner Settings</div>
        </template>
    </va-navbar>
</template>

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
</style>

<style lang="scss">
.va-navbar__left {
    width: 40%;
}

.va-navbar__right {
    width: 40%;
}
</style>