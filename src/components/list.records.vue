<template>
    <div class="c-flex full-height record-list-wrapper">
        <div>
            <router-link v-for="(val, index) in records" :key="index" :to="{ name: 'viewRecord', params: { id: val.uid } }">
                {{val.name.firstName}} {{val.name.lastName}} {{val.isEditing}}
            </router-link> 
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListRecords',
    computed: {
        records() {
            return this.$store.state.records
        }
    }
}
</script>

<style lang="less" scoped>
    .record-list-wrapper {
        flex: 0 250px;
        background-color: #e1e2e4;

        a {
            display: block;
        }
    }
</style>