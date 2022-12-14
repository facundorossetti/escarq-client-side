export const state = () => ({
  chart: [],
  chartModal: false,
  checkoutValidation: false,
  snackbar: false,
  checkoutModal: false
})

export const mutations = {
  showSnackbar (state, value) {
    state.snackbar = value;
  },
  chartModalHandler (state, value) {
    state.chartModal = value
  },
  checkoutModalHandler (state, value) {
    state.checkoutModal = value
  },
  checkoutValidationHandler (state, value) {
    state.checkoutValidation = value
  },
  addItemToChart (state, product) {
    const duplicated = state.chart.find(e => (e.id === product.id && e.size === product.size))
    if (duplicated) {
      state.chart.forEach((e) => {
        e.quantity = parseFloat(e.quantity)
        if (e.id === duplicated.id && e.size === duplicated.size) {
          e.quantity++;
        }
      })
    } else {
      state.chart.push(product)
    }
  },
  removeItemFromChart (state, product) {
    const itemToRemove = state.chart.find(e => (e.id === product.id && e.size === product.size))
    state.chart = state.chart.filter((item) => {
      return item !== itemToRemove
    })
  }
}

export const getters = {
  getChartItems (state) {
    return state.chart
  },
  getTotalItems (state) {
    return state.chart.reduce((total, item) => total + parseFloat(item.quantity), 0)
  },
  getTotalPrice (state) {
    return state.chart.reduce((total, item) => {
      const quantity = parseFloat(item.quantity)
      const price = parseFloat(item.price)
      const totalProduct = quantity * price
      return total + totalProduct
    }, 0)
  }
}

export const actions = {
  async buyChartItems ({ state }, payerInfo) {
    if(state.checkoutValidation) {
      const items = state.chart.map((e) => {
        return {
          id: e.id,
          title: e.description,
          description: e.size,
          picture_url: e.imageurl,
          quantity: e.quantity,
          unit_price: parseFloat(e.price)
        }
      })
      const { data } = await this.$axios.post('/mercadopago', { items, payerInfo})
      if (data.body.init_point) {
        window.location.href = data.body.init_point
      };
    }
  }
}
