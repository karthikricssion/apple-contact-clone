<template>
    <div class="c-flex c-flex-column full-height">
        <div class="c-flex">
            <div class="no-results">
                <span>No Results</span>
            </div>
        </div>
        <recordFooter view="no-result" />
    </div>
</template>

<script>
import recordFooter from '../components/record.footer'

export default {
    name: 'Home',
    components: {
        recordFooter
    }
}
</script>

<style lang="less" scoped>
    .no-results {
        margin: auto;

        span {
            font-size: 16px;
            font-weight: 500;
        }
    }
</style>
