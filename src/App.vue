<template>
  <div id="app" class="c-flex full-height">
    <ListContacts />
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import ListContacts from './components/list.contacts.vue'
import MockData from './mock-data/index'

export default {
  name: 'App',
  components: {
    ListContacts
  },

  beforeCreate() {
    var mockLength = MockData.length
    for(var i = 0; i < mockLength; i++) {
      this.$store.dispatch('addContact', MockData[i])
    }
  }
}

</script>

<style lang="less">
  @import url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);
    
  html, body {
    background-color: #fff;
    color: #182128;
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
    // user-select: none;
    padding: 0;
    margin: 0;
    
    a {
      color: #039be5;
      text-decoration: none !important;
      cursor: pointer;
      user-select: none;
    }
  }
  
  .full-height {
    height: 100%;
    min-height: 0;
  }

  .c-flex {
    display: -webkit-box;      
    display: -moz-box;         
    display: -ms-flexbox;      
    display: -webkit-flex;     
    display:flex;
    flex: 1 0 0;
    min-width: 0;
  }
  .c-flex-column {
    flex-direction: column;
  }

  .c-flex-row {
    flex-direction: row;
  }

  .c-flex-end {
    align-content: flex-end;
    flex-wrap: wrap;
  }

  .scroll {
    overflow: hidden;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(82, 80, 80, 0.5);
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .no-padding {
    padding: 0 !important;
  }
  
  .no-margin {
    margin: 0 !important;
  }
  
  .img-responsive {
    width: 100%;
    display: block;
    margin: auto;
  }

  textarea, input {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }

  .btn-primary {
    border: 1px solid #c4c4c4;
    outline: 0;
    cursor: pointer;
    background-color: #fff;
    padding: 6px 14px;
    font-size: 14px;
    border-radius: 5px;
    color: #000;
  }

  .view-record-container {
    width: 100%;
    margin: 0 auto;
    padding: 24px;
    max-width: 800px;
  }

  .contact-other-information-wrapper {
    margin-top: 80px;

    .other-contact-information {
      border-top: 1px solid #c4c4c4;
      padding: 14px 8px;
      font-size: 14px;

      .contact-label {
        max-width: 150px;
        justify-content: flex-end;

        label {
          color: #c4c4c4;
          margin-right: 16px;
        }
      }

      .contact-information {
        max-width: 300px;
      }

      &:first-child {
        border: 0;
      }
    }
  }

</style>
