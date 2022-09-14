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
    const { data: products } = await this.$axios('/products');
    commit('populateProducts', products)
    commit('loadingProductsHandler', false)
  },
  async updateProduct ({ commit, dispatch }, {id, sizes}) {
    await this.$axios.patch('/updateProduct', { id, sizes })
      .then((r) => dispatch('getProducts'))
    commit('editProductDialogHandler', false)
  },
  async createProduct ({ commit, state }) {
    if (state.validCreateProduct) {
      await this.$axios.post('/products', state.productToCreate)
      commit('createProductDialogHandler', false)
    };
  },
  async deleteProduct ({ commit }, id) {
    await this.$axios.delete(`/products/${id}`)
  }
}
