export const state = () => ({
  loadingProducts: false,
  productItems: [],
  selectedProducts: [],
  searchProducts: '',
  editProductDialog: false,
  createProductDialog: false,
  validCreateProduct: false,
  validUpdateProduct: false,
})

export const mutations = {
  searchProductsHandler (state, value) {
    state.searchProducts = value
  },
  selectedProductsHandler (state, value) {
    state.selectedProducts = value
  },
  editProductDialogHandler (state, value) {
    state.editProductDialog = value
  },
  validUpdateProductHandler (state, value) {
    state.validUpdateProduct = value
  },
  validCreateProductHandler (state, value) {
    state.validCreateProduct = value
  },
  createProductDialogHandler (state, value) {
    state.createProductDialog = value
  },
  loadingProductsHandler (state, value) {
    state.loadingProducts = value;
  },
  populateProducts (state, products) {
    state.productItems = products
  }
}

export const getters = {
  selectedProductsIds (state) {
    return state.selectedProducts.map(product => product.id)
  }
}

export const actions = {
  async getProducts ({ commit }) {
    commit('loadingProductsHandler', true)
    await this.$axios('/products')
      .then((r) => commit('populateProducts', r.data))
      .catch((error) => console.log(error))
    commit('loadingProductsHandler', false)
  },
  async updateProductPrice ({ commit, dispatch }, {id, price}) {
    await this.$axios.patch('/updateProductPrice', {id, price})
      .then((r) => dispatch('getProducts'))
      .catch((error) => console.log(error))
    commit('editProductDialogHandler', false)
  },
  async updateProductStock ({ commit, dispatch }, {id, stock}) {
    await this.$axios.patch('/updateProductStock', {id, stock})
      .then((r) => dispatch('getProducts'))
      .catch((error) => console.log(error))
    commit('editProductDialogHandler', false)
  },
  async createProduct ({ commit, dispatch, state }, product) {
    if (state.validCreateProduct) {
      await this.$axios.post('/products', product)
        .then(() => dispatch('getProducts'))
        .catch((error) => console.log(error))
      commit('createProductDialogHandler', false)
    };
  },
  async deleteProduct ({ dispatch }, id) {
    await this.$axios.delete(`/products/${id}`)
      .then(() => dispatch('getProducts'))
      .catch((error) => console.log(error))
  }
}
