<template>
  <div>
    <TheHero></TheHero>
    <v-container class="mt-12" fluid>
      <v-row justify="center" align="center" class="mx-2">
        <v-col align="center" v-for="product in productItems" :key="product.id" cols="12" sm="6" md="4" lg="3" class="product-cards-container">
          <product-card-copy :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </div>
  
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
  min-height: 500px !important;
}
@media screen and (max-width: 600px) {
  .col-12 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

}
</style>
