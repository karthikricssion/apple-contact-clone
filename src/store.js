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
  records: []
}

const mutations = {
  addRecord(state, contact) {
    state.records.push(contact)
  },

  updateIsEdit(state, contact) {
    state.records = state.records.map(record => {
      if (record.uid === contact.id) {
        record.isEditing = !record.isEditing
        return record
      }      
      return record
    })
  },

  removeRecord(state, contact) {
    state.records.splice(state.records.indexOf(contact), 1)
  },

  toggleEditMode(state) {
    state.editMode = !state.editMode
  },

  editRecord(state, editRecord) {
    state.records = state.records.map(record => {
      if (record.uid === editRecord.uid) {
        return editRecord
      }
      return record
    })
  }
}

const actions = {
  addRecord ({ commit }, contact) {
    commit('addRecord', {
      ...contact,
      uid: contact.uid || (Date.now()).toString(),      
      isEditing: false
    })
  },

  editRecord ({ commit }, contact) {
    commit('editRecord', {
      ...contact
    })
  },

  removeRecord ({ commit }, contact) {
    commit('removeRecord', contact)
  },

  updateIsEdit ({ commit }, id) {
    commit('updateIsEdit', {
      id
    })
  },

  toggleEditMode ({ commit }) {
    commit('toggleEditMode')
  }
}

const getters = {
  getRecordById: (state) => (id) => {
    return state.records.find(record => record.uid === id)
  },

  getEditModeStatus: (state) => () => {
    return state.editMode
  },

  getLetters: (state) => () => {
    return state.letters
  },

  getContactsByLetter: (state) => (letter) => {
    return state.records.filter(i=> { return i.name.lastName.toLowerCase().indexOf(letter.toLowerCase()) === 0; });
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
