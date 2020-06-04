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
import { mapGetters } from 'vuex'

export default {
    name: 'Home',
    components: {
        recordFooter
    },

    beforeCreate() {
        if(this.$store.state.records.length != 0) {
            // beforeCreate is called
            // before mapGetters get initialized
            // component, its returns undefined / not a function
            // therefore directly accessing this.$store

            var letters = this.$store.getters.getLetters()
            var getInitialContact = this.$store.getters.getNextLetterWithContacts(letters.indexOf('a'))
            var getLetterContacts = this.$store.getters.getContactsByLetter(getInitialContact)

            this.$router.push({
                name: 'viewRecord',
                params: {
                    id: getLetterContacts[0].uid
                }
            })
        }
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
