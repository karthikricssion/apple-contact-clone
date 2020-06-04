import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var getNextLetterIndex = function(index) {
  if (index === 25) {
      return 0;
  } else {
      return index+1;
  }
};

const state = {
  editMode: false,
  letters:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  contacts: []
}

const mutations = {
  addContact(state, contact) {
    state.contacts.push(contact)
  },

  editContact(state, contact) {
    state.contacts = state.contacts.map(item => {
      if (item.uid === contact.uid) {
        return contact
      }
      return item
    })
  },

  removeContact(state, contact) {
    state.contacts.splice(state.contacts.indexOf(contact), 1)
  },

  toggleContactEditMode(state, contact) {
    state.contacts = state.contacts.map(item => {
      if (item.uid === contact.id) {
        item.isEditing = !item.isEditing
        return item
      }      
      return item
    })
  },

  setEditMode(state, { status }) {
    state.editMode = status
  },
}

const actions = {
  addContact ({ commit }, contact) {
    commit('addContact', {
      ...contact,
      uid: contact.uid || (Date.now()).toString(),      
      isEditing: false
    })
  },

  editContact ({ commit }, contact) {
    commit('editContact', {
      ...contact
    })
  },

  removeContact ({ commit }, contact) {
    commit('removeContact', contact)
  },

  toggleContactEditMode ({ commit }, id) {
    commit('toggleContactEditMode', {
      id
    })
  },

  setEditMode ({ commit }, status) {
    commit('setEditMode', {
      status
    })
  }
}

const getters = {
  getContactById: (state) => (id) => {
    return state.contacts.find(contact => contact.uid === id)
  },

  getEditModeStatus: (state) => () => {
    return state.editMode
  },

  getLetters: (state) => () => {
    return state.letters
  },

  getContactsByLetter: (state) => (letter) => {
    return state.contacts.filter(i=> { return i.name.lastName.toLowerCase().indexOf(letter.toLowerCase()) === 0; });
  },

  getNextLetterWithContacts: (state, getters) => (index) => {
    var children = [];
    var nextLetter;
    while (children.length === 0) { // iterate until we find a letter with children
        // this loop can go forever incase of empty contacts
        // but empty contacts case is handled by the callee, so no risk.
        index = getNextLetterIndex(index);
        var getLetters = state.letters
        nextLetter = getLetters[index];
        children = getters.getContactsByLetter(nextLetter);
    }

    return nextLetter;
},
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
