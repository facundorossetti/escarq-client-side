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
            :content="chartItems"
            overlap
          >
          <v-btn color="primary" small fab>
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TheHero',
  computed: {
    chartItems() {
      return this.$store.getters.getTotalItems;
    },
  },
}
</script>

<style lang="scss" scoped>
.TheHero {
  height: 600px;
  background-image: url(@/static/clothes.jpg);
  background-position: center;
  background-size: cover;
  color: azure;
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
