<template>
  <v-card class="product-card d-flex flex-column align-center justify-space-between rounded-xl">
    <div class="d-flex align-center justify-space-between">
      <h3 class="description primary--text mr-10">${{ product.price }}</h3>
      <h3 class="description primary--text">{{ product.description }}</h3>
    </div>
    <div class="information d-flex flex-column align-center justify-center">
      <v-btn-toggle v-model="sizeSelector" mandatory color="primary">
        <v-btn v-for="size in sizes" :key="size" x-small text :disabled="product.stock.size[size] < 1">
          {{ size }}
        </v-btn>
      </v-btn-toggle>
      <div class="d-flex align-center my-2">
        <v-text-field
          v-model="quantity"
          :disabled="product.stock.size[sizes[sizeSelector]] < 1 || !sizes[sizeSelector]"
          class="quantity-field-selector mr-4"
          outlined
          hide-details
          rounded
          :max="product.stock.size[sizes[sizeSelector]]"
          :min="1"
          color="primary"
          type="number"
          dense
        />
        <v-btn :disabled="product.stock.size[sizes[sizeSelector]] < 1 || !sizes[sizeSelector]" color="primary" fab small @click="addItemToChart({id: product.id, description: product.description, price: product.price, quantity: quantity, size: sizes[sizeSelector], imageurl: product.imageurl})">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";

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
    ...mapMutations("chart", ["addItemToChart"]),
  }
};
</script>

<style lang="scss" scoped>
.product-card {
  min-width: 250px;
  max-width: 300px;
  min-height: 328px;
  background-image: url(../static/card-image2.jpeg);
  background-size: contain;
  background-position: top;
  transition: all 0.6s ease;
  .description {
    transition: all 0.6s ease;
    opacity: 0;
  }
  .information {
    transition: all 0.6s ease;
    opacity: 0;
  }
  &:hover {
    box-shadow: 0px 0px 30px 4px rgba(0,0,0,0.4);
    transform: scale(1.05);
    min-height: 412px;
    .description {
      transform: translateY(-30px);
      opacity: 1;
    }
    .information {
      opacity: 1;
    }
  }
}
.scale-image {
  transform: scale(1.1);
}
.quantity-field-selector {
  width: 65px;
}
</style>