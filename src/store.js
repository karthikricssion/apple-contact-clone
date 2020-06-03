import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  records: []
}

const mutations = {
  addRecord(state, contact) {
    state.records.push(contact)
  },

  updateIsEdit(state, { contact, isEditing = contact.isEditing }) {
    contact.isEditing = isEditing
  },

  editRecord(state, editRecord) {
    state.records = state.records.map(record => {
      if (record.uid === editRecord.uid) {
        return Object.assign({}, record, editRecord)
      }
      return record
    })
  }
}

const actions = {
  addRecord ({ commit }, contact) {
    commit('addRecord', {
      ...contact,
      uid: (Date.now()).toString(),      
      isEditing: false
    })
  },

  editRecord ({ commit }, contact) {
    commit('editRecord', {
      ...contact,
      isEditing: !contact.isEditing
    })
  },

  updateIsEdit ({ commit }, contact) {
    commit('updateIsEdit', {
      contact, isEditing: !contact.isEditing
    })
  }
}

const getters = {
  getRecordById: (state) => (id) => {
    return state.records.find(record => record.uid === id)
  }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
