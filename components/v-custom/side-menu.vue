<template>
  <v-navigation-drawer
    v-model="isDialogOpen"
    width="450"
    right
    app
    temporary
    class="side-menu"
  >
    <v-container v-if="chart.length" class="px-4 pt-6">
      <v-row align="center" justify="center" class="mb-4">
        <v-col cols="12" align="center">
          <v-btn v-if="$vuetify.breakpoint.xsOnly" fab x-small absolute left top depressed class="mt-10" color="primary" @click="chartModalHandler(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <h2 class="normal-text-light">Carrito de compras</h2>
        </v-col>
      </v-row>
      <div v-if="chart.length" :class="{'chart-list px-2 pt-4': chart.length > 3}">
        <v-row v-for="(product, index) in chart" :key="index" align-center>
          <v-col cols="12">
            <small-product-card :product="product" @clickOnDelete="removeItemFromChart(product)"></small-product-card>
          </v-col>
        </v-row>
      </div>
      <v-row align="center" justify="center" class="mt-10">
        <v-col cols="6" align="start">
          <h3 class="normal-text-light">SUBTOTAL:</h3>
        </v-col>
        <v-col cols="6" align="end">
          <h3 class="normal-text-light">$ {{ getTotalPrice }}</h3>
        </v-col>
        <v-col cols="12" align="center">
          <v-btn color="primary" block :loading="working" @click="checkoutModalHandler(true), chartModalHandler(false)">Finalizar Compra</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="px-4 pt-6">
      <v-row align="center" justify="center">
        <v-col cols="12" align="center">
          <v-btn v-if="$vuetify.breakpoint.xsOnly" fab x-small absolute left top depressed class="mt-10" color="primary" @click="chartModalHandler(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <h2 class="normal-text-light">Carrito de compras</h2>
        </v-col>
        <v-col cols="12" align="center">
          <h2 class="normal-text-light">Sin productos en el carrito.</h2>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      working: false,
    };
  },
  computed: {
    ...mapGetters("chart", ["getTotalPrice"]),
    ...mapState("chart", ["chartModal", "chart"]),
    isDialogOpen: {
      get() {
        return this.chartModal;
      },
      set(value) {
        this.chartModalHandler(value);
      },
    },
  },
  methods: {
    ...mapMutations("chart", ["chartModalHandler", "removeItemFromChart", "checkoutModalHandler"]),
    ...mapActions("chart", ["buyChartItems"]),
  },
};
</script>

<style lang="scss" scoped>
.side-menu {
  background-color: #000000;
}
.chart-list {
  max-height: 560px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>