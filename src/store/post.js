import Api from '~/api/postApi'

const state = () => ({
  list: {}
})

const mutations = {
  setPost (state, { data, id, take, page }) {
    if (page === 1) {
      state.list[id] = {
        data: [],
        bangumi: data.bangumi
      }
    }
    data.list.forEach(item => {
      item.state = {
        openCommit: false,
        loading: false,
        comment: '',
        replying: false,
        page: 1,
        take: 5 // 帖子评论的个数在服务端写死是5个
      }
      state.list[id].data.push(item)
    })
    state.list[id].noMore = data.list.length < take
  },
  setState (state, { id, index, key, value }) {
    state.list[id].data[index].state[key] = value
  },
  setComment (state, { id, index, data }) {
    state.list[id].data[index].comments.push(data)
  }
}

const actions = {
  async getPost ({ commit }, { id, ctx, take, page }) {
    const api = new Api(ctx)
    const data = await api.show({ id, page, take })
    commit('setPost', { data, id, take, page })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
