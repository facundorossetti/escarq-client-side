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
  async updateProduct ({ commit, dispatch }, {id, sizes}) {
    await this.$axios.patch('/updateProduct', { id, sizes })
      .then((r) => dispatch('getProducts'))
      .catch((error) => console.log(error))
    commit('editProductDialogHandler', false)
  },
  async createProduct ({ commit, dispatch, state }) {
    // if (state.validCreateProduct) {
    //   await this.$axios.post('/products', state.productToCreate)
    //   dispatch('getProducts')
    //   commit('createProductDialogHandler', false)
    // };
  },
  async deleteProduct ({ dispatch }, id) {
    await this.$axios.delete(`/products/${id}`)
      .then(() => dispatch('getProducts'))
      .catch((error) => console.log(error))
  }
}
