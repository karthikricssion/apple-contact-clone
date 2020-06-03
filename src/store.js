import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  editMode: false,
  records: []
}

const mutations = {
  addRecord(state, contact) {
    state.records.push(contact)
  },

  updateIsEdit(state, contact) {
    console.log('Hello', contact.uid)
    state.records = state.records.map(record => {
      if (record.uid === contact.uid) {
        return contact
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
      ...contact,
      isEditing: !contact.isEditing
    })
  },

  removeRecord ({ commit }, contact) {
    commit('removeRecord', contact)
  },

  updateIsEdit ({ commit }, contact) {
    commit('updateIsEdit', {
      ...contact,
      isEditing: !contact.isEditing
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
  }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
