<template>
    <div class="c-flex full-height record-list-wrapper scroll">
        <div class="record-list">
            <div v-for="(letter, index) in letters" :key="index" class="alphabetical-records">
                <template v-if="alphaContacts(letter).length">
                    <h4>{{ letter }}</h4>
                    <ul>
                        <li v-for="(contact, idx) in alphaContacts(letter)" :key="idx">
                            <router-link :to="{ name: frameRoute() , params: { id: contact.uid } }">
                                {{contact.name.firstName}} {{contact.name.lastName}} 
                            </router-link>
                            <template v-if="contact.isEditing">
                                <span @click="deleteRecord(contact, idx, letter, index)" class="delete-icon">-</span>
                            </template>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

var getNextLetterIndex = function(index) {
    if (index === 25) {
        return 0;
    } else {
        return index+1;
    }
};

export default {
    name: 'ListRecords',
    data() {
        return {
            letters:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            count: 0
        }
    },

    computed: {
        records() {
            return this.$store.state.records
        },

        ...mapGetters([
            'getEditModeStatus'
        ])
    },

    methods: {
        alphaContacts:function(l) {
            return this.records.filter(i=> { return i.name.lastName.toLowerCase().indexOf(l.toLowerCase()) === 0; });
        },

        deleteRecord: function(contact, idx ,letter, index) {
            this.$store.dispatch('removeRecord', contact)
            let children = this.alphaContacts(letter)

            if (!this.$store.state.records.length) { // we've exhausted all contacts
                this.$router.push({
                    name: 'home'
                })
            } else if (children.length && idx < children.length) { // we haven't exhausted the current letter yet
                this.$router.push({
                    name: 'editRecord',
                    params: {
                        id: children[idx].uid
                    }
                })
            } else { // childrens.length === 0 i.e we exhausted the current letter
                // go to next letter with contacts
                var nextLetter = this.getNextLetterWithContacts(index);
                var nextChildren = this.alphaContacts(nextLetter);
                this.$router.push({
                    name: 'editRecord',
                    params: {
                        id: nextChildren[0].uid
                    }
                })
            }        
        },

        getNextLetterWithContacts: function(index) {
            var children = [];
            var nextLetter;
            while (children.length === 0) { // iterate until we find a letter with children
                // this loop can go forever incase of empty contacts
                // but empty contacts case is handled by the callee, so no risk.
                index = getNextLetterIndex(index);
                nextLetter = this.letters[index];
                children = this.alphaContacts(nextLetter);
            }

            return nextLetter;
        },

        frameRoute() {
            if(this.getEditModeStatus()) {
                return 'editRecord'
            } else {
                return 'viewRecord'
            }
            
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

        .record-list {
            width: 100%;

            .alphabetical-records {
                margin-top: 16px;

                h4 {
                    color: #88888a;
                    text-transform: uppercase;
                    margin: 0;
                    border-bottom: 1px solid #cccdcd;
                    margin-left: 16px;
                    padding-left: 4px;
                    font-weight: 400;
                }

                ul {
                    
                    list-style: none;
                    margin: 0;
                    padding: 0;

                    li {
                        position: relative;

                        a {
                            color: #000;
                            font-size: 14px;
                            padding: 8px;
                            padding-left: 40px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            padding-right: 32px;

                            &.router-link-exact-active, &.router-link-active {
                                color: #fff;
                                background-color: #0e63e1;
                            }
                        }

                        .delete-icon {
                            background-color: #f03832;
                            width: 20px;
                            display: block;
                            height: 20px;
                            text-align: center;
                            border-radius: 50%;
                            position: absolute;
                            top: 6px;
                            right: 10px;
                            font-size: 34px;
                            line-height: 0.5;
                            cursor: pointer;
                            color: #fff;
                        }
                    }
                }

                &:last-child {
                    margin-bottom: 48px;
                }
            }
        }
    }
</style>