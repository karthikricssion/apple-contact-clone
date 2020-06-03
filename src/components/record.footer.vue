<template>
    <div class="c-flex contact-view-edit-footer-wrapper">
        <div class="view-record-container">
            <div class="c-flex view-record-actions">
                
                <router-link to="/new" class="btn-primary">+</router-link>
                
                <template v-if="view != 'no-result'">

                    <template v-if="view == 'view'">
                        <button class="btn-primary" @click="$emit('edit')">Edit</button>
                    </template>

                    <template v-else>
                        <button class="btn-primary" @click="$emit('save')">Done</button>
                    </template>

                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['view'],
    name: 'RecordFooter'
}
</script>

<style lang="less" scoped>
    .contact-view-edit-footer-wrapper {
        flex: 0 80px;

        .view-record-actions {
            justify-content: space-between;
        }
    }
</style>