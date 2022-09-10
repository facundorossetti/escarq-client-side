<template>
  <v-app>
    <v-lazy transition="fade-transition" >
      <v-main>
        <TheAdvisor></TheAdvisor>
        <TheHero></TheHero>
        <Nuxt />
      </v-main>
    </v-lazy>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
