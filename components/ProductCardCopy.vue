<template>
  <v-card class="product-card d-flex flex-column align-center justify-space-between rounded-xl pb-4">
    <div class="d-flex align-center justify-space-between">
      <h3 class="description primary--text">{{ product.description }}</h3>
    </div>
    <div class="information d-flex flex-column align-center justify-center">
      <div class="d-flex align-center">
        <h2 class="primary--text mr-6">$ {{ product.price }}</h2>
        <v-btn color="primary" fab small @click="addItemToChart({id: product.id, description: product.description, price: product.price, quantity: quantity, size: sizes[sizeSelector], imageurl: product.imageurl})">
          <v-icon >mdi-cart</v-icon>
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
  }
};
</script>

<style lang="scss" scoped>
.product-card {
  cursor: pointer;
  min-width: 250px;
  max-width: 400px;
  min-height: 330px;
  background-image: url(../static/card-image2.jpeg);
  background-size: cover;
  background-position: top;
  transition: all .4s ease;
  .information {
    opacity: 0;
    transition: all .4s ease;
    color: white;
    transform: translate(0, 70px);
  }
  .description {
    transition: all .4s ease;
    opacity: 0;
  }
  &:hover {
    box-shadow: 0px 0px 30px 4px rgba(0,0,0,0.4);
    min-height: 420px;
    .information {
      opacity: 1;
    }
    .description {
      transform: translateY(-35px);
      opacity: 1;
    }
  }
}
.scale-image {
  transform: scale(1.1);
}
.quantity-field-selector {
  width: 85px;
}
</style>