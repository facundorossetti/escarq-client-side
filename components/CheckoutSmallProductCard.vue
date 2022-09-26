<template>
  <v-hover v-slot="{ hover }">
    <v-card class="rounded-lg transition-swing py-2 px-4" :elevation="hover ? 6 : 2">
      <div class="d-flex align-center justify-space-between">
        <img
          v-if="product.imageurl !== ''"
          :src="product.imageurl"
          :width="35"
          :height="50"
          class="transition-swing"
          :class="{'scale-image': hover}"
        />
        <div class="d-flex flex-column align-center justify-center">
          <h3>{{ product.description }}</h3>
          <h3>$ {{ product.price }} x {{ product.quantity }}</h3>
        </div>
        <v-btn color="primary" fab x-small depressed @click="$emit('clickOnDelete', {id: product.id, size: product.size})">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-hover>
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
.scale-image {
  transform: scale(1.1);
}
.quantity-field-selector {
  max-width: 90px;
}
</style>
