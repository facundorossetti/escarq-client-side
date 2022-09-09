<template>
  <div class="TheAdvisor" style="background-color: #303030">
    <v-container class="py-1">
      <v-row no-gutters justify="space-between" align="center">
        <v-col cols="4" align="start"> Argentina </v-col>
        <v-col cols="4" align="center">
          Abona con todos los medios de pago
        </v-col>
        <v-col cols="4" align="end"> Segui tu envio </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TheAdvisor',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.TheAdvisor {
  background-color: #303030;
  color: azure;
  font-size: 12px;
}
</style>
