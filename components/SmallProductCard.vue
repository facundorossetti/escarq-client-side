<template>
  <v-card class="small-product-card rounded-lg">
    <div class="d-flex align-center justify-space-around">
      <img
        v-if="product.imageurl !== ''"
        :src="product.imageurl"
        height="120px"
      />
      <div class="d-flex flex-column align-center justify-center">
        <h3 class="normal-text-light">{{ product.description }}</h3>
        <div class="d-flex align-center">
          <h3 class="normal-text-light">${{ product.price }} x {{ product.quantity }} </h3>
          <v-btn class="ml-5 mb-4" color="primary" fab x-small depressed @click="$emit('clickOnDelete', {id: product.id, size: product.size})">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'SmallProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      quantity: 1,
      sizes: ['xs', 's', 'm', 'l', 'xl']
    }
  },
  methods: {
    console () {
    }
  }
}
</script>

<style lang="scss" scoped>
.small-product-card {
  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.4) !important;
  max-height: 150px;
  background: #000000;
}
</style>
