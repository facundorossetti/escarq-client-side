<template>
  <div>
    <v-snackbar
      v-model="isSnackbar"
      :timeout="3000"
      color="green"
      transition="scroll-y-transition"
    >
      Producto Añadido
    </v-snackbar>
    <v-app-bar
      app
      height="70"
      color="transparent"
      elevation="0"
      scroll-target="#scrolling-techniques-8"
    >
      <v-container>
        <v-row justify="space-between" align="center">
          <!-- <v-col cols="3" align="start">
            <img src="../static/logo.png" width="100px" height="50px" />
          </v-col> -->
          <v-col cols="12" align="end">
            <v-badge
              v-if="getTotalItems"
              color="pink"
              :content="getTotalItems"
              overlap
            >
              <v-btn color="primary" depressed small fab @click="chartModalHandler(true)">
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-badge>
            <v-btn v-else color="primary" depressed small fab @click="chartModalHandler(true)">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <img src="../static/banner.png" width="100%" :height="$vuetify.breakpoint.xsOnly ? '380px' : '100%'" class="TheHero" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

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
    ...mapState("chart", ["snackbar"]),
    ...mapGetters("chart", ["getTotalItems"]),
    isSnackbar: {
      get() {
        return this.snackbar
      },
      set(value) {
        this.showSnackbar(value);
      }
    }
  },
  methods: {
    ...mapMutations("chart", ["chartModalHandler", "showSnackbar"]),
  }
}
</script>

<style lang="scss" scoped>
.TheHero {
  margin-bottom: -10px;
}
.pointer-none {
  pointer-events: none;
}
// .v-app-bar {
//   background: url(../static/banner.png);
//   background-position: top;
//   background-size: cover;
// }
</style>
