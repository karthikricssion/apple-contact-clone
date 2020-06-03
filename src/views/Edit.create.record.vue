<template>
  <div class="c-flex c-flex-column full-height">
    <template v-if="!load">
      <div class="c-flex full-height contact-view-edit-content-wrapper scroll">
        <div class="view-record-container">
          <div class="contact-name-wrapper">

            <div class="form-input">
              <input type="text"  v-model="contact.name.firstName" />
              <label>First name</label>
            </div>

            <div class="form-input">
              <input type="text" v-model="contact.name.lastName" />
              <label>Last name</label>
            </div>

          </div>
          <div class="contact-other-information-wrapper">
            <div class="other-form-inputs">
              <div class="input-label-holder">
                <label>phone</label>
              </div>

              <div class="input-holder">
                <input type="text"  v-model="contact.phone" />
              </div>
            </div>
            <div class="other-form-inputs">
              <div class="input-label-holder">
                <label>email</label>
              </div>

              <div class="input-holder">
                <input type="emaik" v-model="contact.email" />
              </div>
            </div>
            <div class="other-form-inputs">
              <div class="input-label-holder">
                <label>address</label>
              </div>

              <div class="input-holder">
                <textarea v-model="contact.address"></textarea>
              </div>
            </div>
            <div class="other-form-inputs">
              <div class="input-label-holder">
                <label>notes</label>
              </div>

              <div class="input-holder">
                <textarea v-model="contact.notes"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <recordFooter view="edit" @save="saveRecord"/>
    </template>
  </div>
</template>

<script>
import recordFooter from '../components/record.footer'
import { mapGetters } from 'vuex'

function ContactObj() {
  return {
    name: {
        firstName: '',
        lastName: ''
    },
    phone: '',
    email: '',
    address: '',
    notes: ''
  }
}

export default {
    name: 'EditCreate',
    components: {
        recordFooter
    },

    data() {
        return {
          view: 'new',
          contact: ContactObj(),
          load: true
        }
    },
    
    beforeMount() {
      let routeParams = this.$route.params
      if(Object.prototype.hasOwnProperty.call(routeParams, 'id')) {
        this.view = 'edit'
        this.getRecord(routeParams.id)
      } else {
        this.contact = ContactObj()
        this.load = false
      }
    },

    beforeDestroy() {
      this.$store.dispatch('updateIsEdit', this.contact)
    },

    computed: {
      ...mapGetters([
        'getRecordById'
      ])
    },

    methods: {
      getRecord() {
        this.contact = this.getRecordById(this.$route.params.id)
        if(this.contact) {
          this.$store.dispatch('updateIsEdit', this.contact)
          this.load = false
        } else {
          this.$router.push({
            name: 'createRecord'
          })
        }
        
      },

      saveRecord () {
        if(this.view == 'new') {
          this.$store.dispatch('addRecord', this.contact)
        } else {
          this.$store.dispatch('editRecord', this.contact)
        }
        
        this.contact = ContactObj()
      }
    }
}
</script>

<style lang="less" scoped>
  .form-input {
    display: inline-block;
    margin-right: 16px;

    input {
      font-size: 2em;
      font-weight: 500;
      border: 1px solid #c4c4c4;
      border-radius: 3px;
      margin-bottom: 4px;
    }

    label {
      display: block;
      font-size: 14px;
      color: #c4c4c4;
    }
  }

  .other-form-inputs {
    border-top: 1px solid #c4c4c4;
  }
</style>
