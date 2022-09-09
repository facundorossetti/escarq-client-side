export const state = () => ({
  chart: [],
})

export const mutations = {
  addItemToChart(state, item) {
    const repeat = state.chart.find((e) => e.id === item.id)
    if (repeat) {
      state.chart.forEach((item) => {
        if (repeat.id === item.id) {
          item.cantidad++
        }
      })
    } else {
      state.chart.push(item)
    }
  },
}

export const getters = {
  getChartItems(state) {
    return state.chart
  },
  getTotalItems(state) {
    let items = 0
    state.chart.forEach((item) => {
      items += item.cantidad
    })
    return items
  },
}
