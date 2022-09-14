<template>
  <v-hover v-slot="{ hover }">
    <v-card class="rounded-lg transition-swing px-4 py-2" :elevation="hover ? 8 : 2">
      <div class="d-flex align-center justify-space-between">
        <v-img
          v-if="product.imageurl !== ''"
          :src="product.imageurl"
          :width="150"
          :height="150"
          contain
          class="transition-swing"
          :class="{'scale-image': hover}"
        />
        <div class="d-flex flex-column align-center justify-center">
          <h3>{{ product.description }}</h3>
          <h4 class="my-2 text-uppercase">
            Talle: {{ product.size }}
          </h4>
          <div class="d-flex align-center">
            <h3>${{ product.price }} x {{ product.quantity }} </h3>
            <v-btn class="ml-8" color="primary" icon @click="$emit('clickOnDelete', {id: product.id, size: product.size})">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
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
