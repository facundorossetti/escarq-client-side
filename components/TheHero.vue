<template>
  <div class="TheHero">
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="4" align="start"> Logo </v-col>
        <v-col cols="4" align="center" class="navigation-menu d-flex">
          <NuxtLink to="/">Buzos</NuxtLink>
          <NuxtLink to="/">Remeras</NuxtLink>
          <NuxtLink to="/">Joggers</NuxtLink>
          <NuxtLink to="/">Shorts</NuxtLink>
          <NuxtLink to="/">Accesorios</NuxtLink>
        </v-col>
        <v-col cols="4" align="end">
          <v-badge
            color="pink"
            :content="$store.getters.getTotalItems"
            overlap
          >
          <v-btn color="primary" small fab @click="openChart">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </v-col>
      </v-row>
    </v-container>
    <v-navigation-drawer
      v-model="chartModal"
      width="450"
      absolute
      right
      temporary
    >
    <v-container v-if="$store.state.chart.length" class="px-4">
      <v-row align="center" justify="center">
        <v-col cols="12" align="center">
          <h2>Carrito de compras</h2>
        </v-col>
      </v-row>

      <div v-if="$store.state.chart.length" :class="{'chart-list px-2 pt-4': $store.state.chart.length > 3}">
        <v-row v-for="(product, index) in $store.state.chart" :key="index" align-center>
          <v-col cols="12">
            <small-product-card :product="product" @clickOnDelete="deleteProduct"></small-product-card>
          </v-col>
        </v-row>
      </div>

      <v-row align="center" justify="center" class="mt-10">
        <v-col cols="6" align="start">
          <h3>SUBTOTAL:</h3>
        </v-col>
        <v-col cols="6" align="end">
          <h3>$ {{ getTotalPrice }}</h3>
        </v-col>
        <v-col cols="12" align="center">
          <v-btn color="primary" block text>Ver carrito</v-btn>
        </v-col>
        <v-col cols="12" align="center">
          <v-btn color="primary" block>Pagar</v-btn>
        </v-col>
      </v-row>
    </v-container>
    
    <v-container v-else class="px-4">
      <v-row align="center" justify="center">
        <v-col cols="12" align="center">
          <h2>Carrito de compras</h2>
        </v-col>
        <v-col cols="12" align="center">
          <h2>Sin productos en el carrito.</h2>
        </v-col>
      </v-row>
    </v-container>

    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: 'TheHero',
  data() {
    return {
      chartModal: false,
    };
  },
  computed: {
    getTotalPrice() {
      return this.$store.getters.getTotalPrice;
    }
  },
  // mounted() {
  //   const mpIntegration = document.createElement('script');
  //   mpIntegration.setAttribute('src', 'https://sdk.mercadopago.com/js/v2');
  //   document.head.appendChild(mpIntegration);
  //   console.log(mpIntegration);
  //   const mp = new MercadoPago('PUBLIC_KEY', {
  //     locale: 'es-AR'
  //   });
  //   console.log(mp);
  // },
  methods: {
    openChart() {
      this.chartModal = true;
    },
    deleteProduct(product) {
      this.$store.commit('removeItemFromChart', product);
    }
  }
}
</script>

<style lang="scss" scoped>
.TheHero {
  height: 600px;
  background-image: url(@/static/clothes.jpg);
  background-position: center;
  background-size: cover;
  .navigation-menu {
    gap: 20px;
    a {
      color: azure;
      text-decoration: none;
      text-transform: uppercase;
    }
  }
  .chart-list {
    max-height: 560px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
