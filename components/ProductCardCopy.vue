<template>
  <v-card class="product-card d-flex flex-column align-center justify-space-between rounded-xl pb-4">
    <div class="d-flex align-center justify-space-between">
      <h3 class="description primary--text mr-6">${{ product.price }}</h3>
      <h3 class="description primary--text">{{ product.description }}</h3>
    </div>
    <div class="information d-flex flex-column align-center justify-center">
      <v-btn-toggle v-model="sizeSelector" mandatory color="primary">
        <v-btn v-for="size in sizes" :key="size" x-small text :disabled="product.stock.size[size] < 1">
          {{ size }}
        </v-btn>
      </v-btn-toggle>
      <div class="d-flex align-center my-4">
        <v-btn :disabled="product.stock.size[sizes[sizeSelector]] < 1 || !sizes[sizeSelector]" color="primary" fab small @click="addItemToChart({id: product.id, description: product.description, price: product.price, quantity: quantity, size: sizes[sizeSelector], imageurl: product.imageurl})">
          <v-icon >mdi-cart</v-icon>
        </v-btn>
        <v-text-field
          v-model="quantity"
          :disabled="product.stock.size[sizes[sizeSelector]] < 1 || !sizes[sizeSelector]"
          class="quantity-field-selector ml-4"
          outlined
          hide-details
          rounded
          :max="product.stock.size[sizes[sizeSelector]]"
          :min="1"
          color="primary"
          type="number"
          dense
        />
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
  cursor: grab;
  min-width: 250px;
  max-width: 300px;
  min-height: 380px;
  background-image: url(../static/card-image2.jpeg);
  background-size: cover;
  background-position: top;
  transition: all .4s ease;
  .information {
    opacity: 0;
    transition: all .4s ease;
    color: white;
    transform: translate(0, 125px);
  }
  .description {
    transition: all .4s ease;
    opacity: 0;
  }
  &:hover {
    box-shadow: 0px 0px 30px 4px rgba(0,0,0,0.4);
    min-height: 330px;
    .information {
      opacity: 1;
    }
    .description {
      transform: translateY(-40px);
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