<template>
    <div class="c-flex full-height record-list-wrapper scroll">
        <div class="record-list">
            <div v-for="(letter, index) in getLetters()" :key="index" class="alphabetical-records">
                <template v-if="getContactsByLetter(letter).length">
                    <h4>{{ letter }}</h4>
                    <ul>
                        <li v-for="(contact, idx) in getContactsByLetter(letter)" :key="idx">
                            <router-link :to="{ name: frameRoute() , params: { id: contact.uid } }">
                                {{contact.name.firstName}} {{contact.name.lastName}} 
                            </router-link>
                            <template v-if="contact.isEditing">
                                <span @click="deleteContact(contact, idx, letter, index)" class="delete-icon">-</span>
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

export default {
    name: 'ListContacts',
    computed: {
        ...mapGetters([
            'getEditModeStatus',
            'getContactsByLetter',
            'getLetters',
            'getNextLetterWithContacts'
        ])
    },

    methods: {

        deleteContact: function(contact, idx ,letter, index) {
            this.$store.dispatch('removeContact', contact)
            let children = this.getContactsByLetter(letter)
            
            /* case 1:
                After removing a contact, if the contact in store 
                is empty. It should redirected to home page.
            */
            if (!this.$store.state.contacts.length) { // we've exhausted all contacts
                this.$router.push({
                    name: 'home'
                })
            
            /* case 2:
                After removing a contact, if index of deleted 
                contact is still less than children then routing 
                it to contact.
            */
            } else if (children.length && idx < children.length) { // we haven't exhausted the current letter yet
                this.$router.push({
                    name: 'editContact',
                    params: {
                        id: children[idx].uid
                    }
                })
                
            /* case 3:
                After removing a contact, if index and the children
                length are equal, then we need to look for the next
                letter which has childern in it. 
            */
            } else { // childrens.length === 0 i.e we exhausted the current letter
                // go to next letter with contacts
                var nextLetter = this.getNextLetterWithContacts(index);
                var nextChildren = this.getContactsByLetter(nextLetter);
                this.$router.push({
                    name: 'editContact',
                    params: {
                        id: nextChildren[0].uid
                    }
                })
            }        
        },

        frameRoute() {
            if(this.getEditModeStatus()) {
                return 'editContact'
            } else {
                return 'viewContact'
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
                            user-select: none;
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