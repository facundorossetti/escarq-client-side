<template>
  <div>
    <v-container class="products-container">
      <v-row justify="center" align="center">
        <div class="d-flex flex-wrap mt-5 mb-16">
          <div v-for="product in productItems" :key="product.id" class="ma-2">
            <product-card 
              :product="product" 
              @clickOnAddToChart="addToChart" 
              @clickOnBuy="addToChart" 
            />
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'IndexPage',
  data() {
    return {
      productItems: [],
      working: false,
    }
  },
  async fetch() {
    const { data:products } = await this.$axios('/products');
    this.productItems = products;
  },
  computed: {
    ...mapGetters(['getChartItems']),
  },
  methods: {
    ...mapMutations(['addItemToChart']),
    addToChart(product) {
      this.addItemToChart(product)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
