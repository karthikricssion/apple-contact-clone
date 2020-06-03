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
            <div class="other-contact-information">
              <span>phone</span>
              <span>{{contact.phone}}</span>
            </div>

            <div class="other-contact-information">
              <span>email</span>
              <span>{{contact.email}}</span>
            </div>

            <div class="other-contact-information">
              <span>address</span>
              <span>{{contact.address}}</span>
            </div>

            <div class="other-contact-information">
              <span>notes</span>
              <span>{{contact.notes}}</span>
            </div>
          </div>
        </div>
      </div>
      <recordFooter view="view" @edit="editRecord" />
    </template>
  </div>
</template>

<script>
import recordFooter from '../components/record.footer'
import { mapGetters } from 'vuex'

export default {
    name: 'ViewRecord',
    components: {
      recordFooter
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
        'getRecordById'
      ])
    },

    methods: {
      getContact(id) { 
        this.contact = this.getRecordById(id)
        if(this.contact) {
          this.load = false
        }
      },

      editRecord() {
        this.$router.push({ name: 'editRecord', params: { id: this.contact.uid } })
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
      border-top: 1px solid #c4c4c4;

      &:first-child {
        border: 0;
      }
    }
</style>