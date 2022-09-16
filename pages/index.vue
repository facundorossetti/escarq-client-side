<template>
  <v-container class="mt-8" fluid>
    <v-row justify="center" align="center" class="mx-2">
      <v-col v-for="product in productItems" :key="product.id" cols="12" sm="6" md="4" lg="3" class="product-cards-container my-5">
        <!-- <product-card :product="product" /> -->
        <product-card-copy :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      productItems: [],
    }
  },
  async fetch() {
    const { data:products } = await this.$axios("/products");
    this.productItems = products;
  },
}
</script>

<style lang="scss" scoped>
.product-cards-container {
  min-height: 480px !important;
}
@media screen and (max-width: 600px) {
  .col-12 {
    padding-right: 20px !important;
    padding-left: 20px !important;
  }

}
</style>
