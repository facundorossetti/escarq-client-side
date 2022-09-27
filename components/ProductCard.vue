<template>
  <v-card class="product-card d-flex flex-column align-center justify-end rounded-xl">
    <img :src="product.imageurl" width="100%" height="100%" alt="">
    <div class="d-flex align-center justify-center my-1 w-100 px-2">
      <div class="d-flex flex-column align-center justify-space-around w-100">
        <h3 class="description secondary--text normal-text-light">{{ product.description }}</h3>
        <h3 class="price secondary--text normal-text-light">${{ product.price }}</h3>
      </div>
      <div class="add-cart-button">
        <v-btn color="primary" depressed fab small @click="addItemToChart({id: product.id, description: product.description, price: product.price, quantity: quantity, imageurl: product.imageurl}), showSnackbar(true)">
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
    };
  },
  methods: {
    ...mapMutations("chart", ["addItemToChart", "showSnackbar"]),
  }
};
</script>

<style lang="scss" scoped>
.product-card {
  width: 250px;
  min-height: 355px;
  background-color: #000000;  
  box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.4) !important;
  transition: all 0.6s ease;
    .description {
      transform: translateY(15px);
      transition: all 0.6s ease;
    }
    .price {
      opacity: 0;
      transition: all 0.6s ease;
    }
  &:hover {
    box-shadow: 0px 0px 15px 2px rgba(255, 255, 255, 0.45) !important;
    transform: scale(1.05);
    .description {
      transform: translateY(0);
    }
    .price {
      opacity: 1;
      transform: translateY(-3px);
    }
  }
}
@media screen and (max-width: 600px) {
  .product-card {
    width: 80%;
    &:hover {
      box-shadow: 0px 0px 15px 2px rgba(255, 255, 255, 0.45) !important;
      transform: scale(1.02);
    }
  }
}
.add-cart-button {
  flex-basis: 40%;
}
.w-100 {
  width: 100%;
}
</style>