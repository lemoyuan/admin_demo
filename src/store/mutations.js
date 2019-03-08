import * as types from './mutation-types'

const mutations = {
    [types.SET_LOADING]: (state, data) => {
        state.showLoading = data
    },
}

export default mutations