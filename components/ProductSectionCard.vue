<template>
  <div class="product-section-cards-container d-flex flex-wrap mt-5">
    <div v-for="product in productSectionItems" :key="product.id" class="ma-2">
      <v-hover v-slot="{ hover }">
        <v-card class="product-section-cards rounded-lg transition-swing px-4 py-2" :elevation="hover ? 8 : 2">
          <div class="d-flex">
            <v-img
              v-if="product.imageurl !== ''"
              :src="product.imageurl"
              :width="220"
              :height="250"
              contain
              class="transition-swing mr-4"
            />
            <div class="d-flex flex-column align-end justify-space-between">
              <v-btn
                icon
                color="pink"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <h2 class="mb-4">{{ product.type }}</h2>
              <v-btn color="primary" :elevation="3">Ver mas</v-btn>
              <v-spacer></v-spacer>
            </div>
          </div>
        </v-card>
      </v-hover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSectionCard',
  props: {
    productSectionItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
};
</script>