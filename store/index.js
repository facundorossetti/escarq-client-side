export const state = () => ({
  chart: [],
})

export const mutations = {
  addItemToChart(state, item) {
    const repeat = state.chart.find((e) => e.product.id === item.product.id);
    if (repeat) {
      state.chart.forEach((item) => {
        if (repeat.product.id === item.product.id) {
          item.quantity++
        }
      });
    } else {
      state.chart.push(item);
    }
  },
}

export const getters = {
  getChartItems(state) {
    return state.chart
  },
  getTotalItems(state) {
    return state.chart.length;
  },
}
