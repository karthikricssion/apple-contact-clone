<template>
    <div class="c-flex full-height record-list-wrapper scroll">
        <div>
            <div v-for="(letter, index) in letters" :key="index" >
                <template v-if="alphaContacts(letter).length">
                    <h2>{{ letter }}</h2>
                    <ul>
                        <li v-for="contact in alphaContacts(letter)" :key="contact.uid">
                            <router-link :to="{ name: 'viewRecord', params: { id: contact.uid } }">
                                {{contact.name.firstName}} {{contact.name.lastName}} {{contact.isEditing}}
                            </router-link>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListRecords',
    data() {
        return {
            letters:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        }
    },

    computed: {
        records() {
            return this.$store.state.records
        }
    },

    methods: {
        alphaContacts:function(l) {
            return this.records.filter(i=> { return i.name.lastName.toLowerCase().indexOf(l.toLowerCase()) === 0; });
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