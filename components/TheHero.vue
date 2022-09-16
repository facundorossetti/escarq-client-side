<template>
  <div>
    <v-app-bar
      app
      height="70"
      color="white"
      scroll-target="#scrolling-techniques-8"
    >
      <v-container>
        <v-row justify="space-between" align="center">
          <v-col cols="2" align="start">
            <img src="../static/logo.png" width="100px" height="50px" />
          </v-col>
          <v-col cols="9" align="end">
            <v-btn class="pt-1" color="primary" small text>
              Seguir tu pedido
            </v-btn>
            <v-badge
              v-if="getTotalItems"
              color="pink"
              :content="getTotalItems"
              overlap
            >
              <v-btn color="primary" small fab @click="chartModalHandler(true)">
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-badge>
            <v-btn v-else color="primary" small fab @click="chartModalHandler(true)">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <div class="TheHero"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "TheHero",
  async fetch() {
    const { data:products } = await this.$axios("/products");
    this.productItems = products;
  },
  data() {
    return {
      working: false,
      productItems: [],
    };
  },
  computed: {
    ...mapGetters("chart", ["getTotalItems"]),
  },
  methods: {
    ...mapMutations("chart", ["chartModalHandler"]),
  }
}
</script>

<style lang="scss" scoped>
.pointer-none {
  pointer-events: none;
}
.TheHero {
  background-image: url(../static/banner_1.webp);
  background-size: cover;
  background-position: 50% 40%;
  min-height: 600px;
  max-height: 700px;
}
</style>
