<template>
  <div class="TheHero">
    <v-container style="position: relative;">
      <v-row justify="space-between" align="start">
        <v-col cols="4" align="start"> 
          <img src="../static/logo.png" width="100px" height="60px" />
        </v-col>
        <v-col cols="4" align="end">
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
      <client-only v-if="productItems.length">
        <VueSlickCarousel v-bind="settings">
          <v-col v-for="product in productItems" :key="product.id" >
            <img :src="product.imageurl" width="350px" height="350px" class="pointer-none" />
          </v-col>
        </VueSlickCarousel>
      </client-only>
    </v-container>
    <v-custom-side-menu></v-custom-side-menu>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from "vuex";
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: "TheHero",
  components: { VueSlickCarousel },
  async fetch() {
    const { data:products } = await this.$axios("/products");
    this.productItems = products;
  },
  data() {
    return {
      working: false,
      productItems: [],
      settings: {
        "centerMode": true,
        "centerPadding": "20px",
        "focusOnSelect": true,
        "infinite": true,
        "slidesToShow": 3,
        "speed": 1000
      }
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
  .navigation-menu {
    gap: 20px;
    a {
      color: azure;
      text-decoration: none;
      text-transform: uppercase;
    }
  }
}
.slider-cover {
  background-color: transparent; 
  border: 100px solid white; 
  width: 100%; 
  height: 95%;
  border-radius: 50%; 
  position: absolute; 
  left: 0; 
  top: 10%; 
  z-index: 999;
  pointer-events: none;
  &::before {
    content: '';
    position: absolute;
    left: -10%;
    top: -8%;
    width: 100px;
    height: 120%;
    background: white;
  }
  &::after {
    content: '';
    position: absolute;
    right: -10%;
    top: -8%;
    width: 100px;
    height: 120%;
    background: white;
  }
}
</style>
