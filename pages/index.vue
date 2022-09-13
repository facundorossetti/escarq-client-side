<template>
  <div>
    <v-container class="products-container">
      <v-row justify="center" align="center">
          <v-col v-for="product in productItems" :key="product.id" cols="12" md="4" class="ma-2">
            <product-card 
              :product="product" 
              @clickOnAddToChart="addToChart" 
              @clickOnBuy="addToChart" 
            />
          </v-col>
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
@media screen and (max-width: 600px) {
  .col-12 {
    padding-right: 20px !important;
    padding-left: 20px !important;
  }
}
</style>
