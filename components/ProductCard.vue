<template>
  <v-card class="product-card d-flex flex-column align-center justify-end rounded-xl">
    <img :src="product.imageurl" width="100%" height="100%" alt="">
    <div class="d-flex align-center justify-center my-2 w-100 px-2">
      <div class="d-flex flex-column align-center justify-space-around w-100">
        <h3 class="description secondary--text">{{ product.description }}</h3>
        <h3 class="price secondary--text">${{ product.price }}</h3>
      </div>
      <div class="add-cart-button">
        <v-btn color="secondary" depressed fab small @click="addItemToChart({id: product.id, description: product.description, price: product.price, quantity: quantity, size: sizes[sizeSelector], imageurl: product.imageurl})">
          <v-icon color="#000000">mdi-cart</v-icon>
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
      sizes: ['l'],
    };
  },
  methods: {
    ...mapMutations("chart", ["addItemToChart"]),
    console() {
      console.log(this.product);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-card {
  min-width: 250px;
  max-width: 320px;
  min-height: 385px;
  background-color: #000000;  
  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.4) !important;
  transition: all 0.6s ease;
    .description {
      transform: translateY(20px);
      transition: all 0.6s ease;
      font-family: 'GothicUltraTrendy';
      font-size: 32px;
    }
    .price {
      opacity: 0;
      transition: all 0.6s ease;
    }
  &:hover {
    box-shadow: 0px 0px 20px 4px rgba(255, 255, 255, 0.45) !important;
    transform: scale(1.05);
    .description {
      transform: translateY(5px);
    }
    .price {
      opacity: 1;
      transform: translateY(-5px);
    }
  }
}
@media screen and (max-width: 600px) {
  .product-card {
    max-width: 100%;
  }
}
.add-cart-button {
  flex-basis: 40%;
}
.w-100 {
  width: 100%;
}
</style>