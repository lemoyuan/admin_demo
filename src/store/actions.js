import * as types from './mutation-types'

export default {
    setLoading({commit}, data) {
        commit(types.SET_LOADING, data)
    },
}