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

            <div class="c-flex other-contact-information">
              <div class="c-flex contact-label">
                <label>phone</label>
              </div>

              <div class="c-flex contact-information">
                <input type="tel"  v-model="contact.phone" />
              </div>
            </div>

            <div class="c-flex other-contact-information">
              <div class="c-flex contact-label">
                <label>email</label>
              </div>

              <div class="c-flex contact-information">
                <input type="email"  spellcheck="false" v-model="contact.email" />
              </div>
            </div>

            <div class="c-flex other-contact-information">
              <div class="c-flex contact-label">
                <label>address</label>
              </div>

              <div class="c-flex contact-information">
                <textarea-autosize
                  spellcheck="false"
                  ref="myTextarea"
                  v-model="contact.address"
                  :min-height="30"
                  :max-height="350"
                />
              </div>
            </div>

            <div class="c-flex other-contact-information">
              <div class="c-flex contact-label">
                <label>notes</label>
              </div>

              <div class="c-flex contact-information">
                <textarea-autosize
                  spellcheck="false"
                  ref="myTextarea"
                  v-model="contact.notes"
                  :min-height="30"
                  :max-height="350"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <ContactFooter view="edit" @save="saveContact"/>
    </template>
  </div>
</template>

<script>
import ContactFooter from '../components/ContactFooter'
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
    name: 'EditOrCreate',
    components: {
        ContactFooter
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
        this.getContact(routeParams.id)
      } else {
        this.contact = ContactObj()
        this.load = false
      }
    },

    beforeRouteUpdate: function(to, from, next) {
      if(from.name === 'editContact') {
        if(this.getEditModeStatus()) {  
          this.$store.dispatch('toggleContactEditMode', from.params.id)
        }
      } 

      next()
    },

    beforeRouteLeave(to, from, next) {
      if(to.name !== 'editContact') {
        this.$store.dispatch('toggleContactEditMode', from.params.id)
      }

      next()
    },

    computed: {
      ...mapGetters([
        'getContactById',
        'getEditModeStatus'
      ])
    },

    methods: {
      getContact() {
        let gotContact = this.getContactById(this.$route.params.id)
        
        if(gotContact) {          
          this.$store.dispatch('toggleContactEditMode', gotContact.uid)
          this.contact = JSON.parse(JSON.stringify(gotContact))

          if(!this.getEditModeStatus()) {
            this.$store.dispatch('setEditMode', true)
          }
          this.load = false
        } else {
          this.$router.push({
            name: 'createContact'
          })
        }
        
      },

      saveContact () {
        if(this.view == 'new') {
          this.$store.dispatch('addContact', this.contact)
          this.contact = ContactObj()
        } else {
          this.$store.dispatch('editContact', this.contact)
          this.$store.dispatch('setEditMode', false)

          this.$router.push({
            name: 'viewContact',
            params: {
              id: this.$route.params.id
            }
          })
        }        
      }
    }
}
</script>

<style lang="less" scoped>
  .form-input {
    display: inline-block;
    margin-right: 16px;
    position: relative;

    input {
      font-size: 2em;
      font-weight: 400;
      border: 1px solid #c4c4c4;
      border-radius: 3px;
      
    }

    label {
      display: block;
      font-size: 14px;
      color: #c4c4c4;
      position: absolute;
      bottom: -20px;
    }
  }

  .contact-information {
    input {
      width: 100%;
      border: 1px solid #c4c4c4;
      border-radius: 3px;
      font-size: 14px;
    }

    textarea {
      width: 100%;
      border: 1px solid #c4c4c4;
      border-radius: 3px;
      resize: none;
      font-size: 14px;
    }
  }

</style>
