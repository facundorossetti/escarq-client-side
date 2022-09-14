<template>
  <div class="TheHero">
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="4" align="start"> 
          <NuxtLink to="/admin">ADMIN</NuxtLink>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="4" align="center" class="navigation-menu d-flex">
          <NuxtLink to="/">Buzos</NuxtLink>
          <NuxtLink to="/">Remeras</NuxtLink>
          <NuxtLink to="/">Joggers</NuxtLink>
          <NuxtLink to="/">Shorts</NuxtLink>
          <NuxtLink to="/">Accesorios</NuxtLink>
        </v-col>
        <v-col cols="4" align="end">
          <v-badge
            color="pink"
            :content="getTotalItems"
            overlap
          >
          <v-btn color="primary" small fab @click="chartModalHandler(true)">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </v-col>
      </v-row>
    </v-container>
    <v-custom-side-menu></v-custom-side-menu>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "TheHero",
  data() {
    return {
      working: false,
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
}
</style>
