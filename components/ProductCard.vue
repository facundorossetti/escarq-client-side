<template>
  <v-hover v-slot="{ hover }">
    <v-card class="rounded-lg transition-swing px-3 py-4" :elevation="hover ? 8 : 2">
      <div class="d-flex flex-column align-center justify-space-between">
        <v-img
          v-if="product.imageurl !== ''"
          :src="product.imageurl"
          :width="220"
          :height="250"
          contain
          class="transition-swing"
          :class="{'scale-image': hover}"
        />
        <div class="d-flex flex-column align-center justify-center">
          <h3>{{ product.description }}</h3>
          <div class="d-flex align-center my-3">
            <v-btn :disabled="product.stock.size[sizeSelector] < 1 || !sizes[sizeSelector]" color="primary" :elevation="3" class="mr-5" @click="$emit('clickOnBuy', {product: product, size: sizes[sizeSelector]})">Comprar</v-btn>
            <v-btn :disabled="product.stock.size[sizeSelector] < 1 || !sizes[sizeSelector]" color="primary" icon @click="$emit('clickOnAddToChart', {id: product.id, description: product.description, price: product.price, quantity: quantity, size: sizes[sizeSelector], imageurl: product.imageurl})">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </div>
          <div class="d-flex align-center mb-4 mt-1">
            <h3>${{ product.price }}</h3>
            <v-text-field
              v-model="quantity"
              :disabled="product.stock < 1 || !sizes[sizeSelector]"
              class="quantity-field-selector ml-4"
              outlined
              hide-details
              rounded
              color="primary"
              type="number"
              dense
            />
          </div>
          <v-btn-toggle v-model="sizeSelector" mandatory color="primary">
            <v-btn v-for="size in sizes" :key="size" small text :disabled="product.stock.size[size] < 1">
              {{ size }}
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<!-- // max stock of a product: product.stock.size[sizes[sizeSelector]] -->

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      quantity: 1,
      sizeSelector: undefined,
      sizes: ['xs', 's', 'm', 'l', 'xl'],
    };
  },
  methods: {
    console(a) {
      console.log(a);
    }
  }
};
</script>

<style lang="scss" scoped>
.scale-image {
  transform: scale(1.1);
}
.quantity-field-selector {
  max-width: 90px;
}
</style>