export const state = () => ({
  chart: [],
})

export const mutations = {
  addItemToChart(state, item) {
    const duplicated = state.chart.find((e) => (e.id === item.id && e.size === item.size));
    if(duplicated) {
      state.chart.forEach((e) => {
        if(e.id === duplicated.id && e.size === duplicated.size) {
          e.quantity = parseFloat(e.quantity) + parseFloat(duplicated.quantity);
        }
      });
    } else {
      state.chart.push(item);
    }
  },
  removeItemFromChart(state, product) {
    const itemToRemove = state.chart.find((e) => (e.id === product.id && e.size === product.size));
    state.chart = state.chart.filter(item => {
      return item !== itemToRemove;
    });
  }
}

export const getters = {
  getChartItems(state) {
    return state.chart
  },
  getTotalItems(state) {
    return state.chart.reduce((total, item) => total + parseFloat(item.quantity), 0);
  },
  getTotalPrice(state) {
    return state.chart.reduce((total, item) => {
      const quantity = parseFloat(item.quantity);
      const price = parseFloat(item.price);
      const totalProduct = quantity * price;
      return total + totalProduct;
    }, 0);
  }
}
