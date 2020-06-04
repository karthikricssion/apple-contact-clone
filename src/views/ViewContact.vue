<template>
  <div class="c-flex c-flex-column full-height">
    <template v-if="!load">
      <div class="c-flex full-height contact-view-edit-content-wrapper scroll">
        <div class="view-record-container">
          <div class="contact-name-wrapper">
            <h1>{{contact.name.firstName}}</h1>
            <h1>{{contact.name.lastName}}</h1>
          </div>
          <div class="contact-other-information-wrapper">
            <div class="c-flex other-contact-information">
              <div class="c-flex contact-label">
                <label>phone</label>
              </div>
              <div class="c-flex contact-information">{{contact.phone}}</div>
            </div>

            <div class="c-flex other-contact-information">
              <div class="c-flex contact-label">
                <label>email</label>
              </div>
              <div class="c-flex contact-information">
                <a v-bind:href="'mailto:' + contact.email">{{contact.email}}</a>
              </div>
            </div>

            <div class="c-flex other-contact-information">
              <div class="c-flex contact-label">
                <label>address</label>
              </div>
              <div class="c-flex contact-information">{{contact.address}}</div>
            </div>

            <div class="c-flex other-contact-information">
              <div class="c-flex contact-label">
                <label>note</label>
              </div>
              <div class="c-flex contact-information">{{contact.notes}}</div>
            </div>

          </div>
        </div>
      </div>
      <ContactFooter view="view" @edit="editContactDetails" />
    </template>
  </div>
</template>

<script>
import ContactFooter from '../components/ContactFooter'
import { mapGetters } from 'vuex'

export default {
    name: 'ViewContact',
    components: {
      ContactFooter
    },
    
    data() {
        return {
            load: true,
            contact: {}
        }
    },

    created() {
      this.getContact(this.$route.params.id)
    },

    beforeRouteUpdate (to, from, next) {
      this.getContact(to.params.id)
      next()
    },

    computed: {
      ...mapGetters([
        'getContactById'
      ])
    },

    methods: {
      getContact(id) { 
        this.contact = this.getContactById(id)
        if(this.contact) {
          this.load = false
        }
      },

      editContactDetails() {
        this.$router.push({ name: 'editContact', params: { id: this.contact.uid } })
      }
    }
}
</script>

<style lang="less" scoped>
    .contact-name-wrapper {
      h1 {
        display: inline;  
        margin-right: 16px;
        font-weight: 400;
      }
    }

    .other-contact-information {
      .contact-information {
        a {
          text-decoration: underline !important;
        }

        white-space: pre-wrap;
      }
    }
</style>