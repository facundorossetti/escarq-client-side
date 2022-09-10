<template>
  <v-app>
    <v-lazy transition="fade-transition">
      <v-main>
        <Nuxt />
      </v-main>
    </v-lazy>
  </v-app>
</template>

<script>
export default {
  name: 'UserLayout',
}
</script>