<template>
  <v-container class="py-5">
    <v-row justify="center" align="center">
      <v-col cols="12" align="center">
        <div class="d-flex flex-column">
          <v-row class="mb-5" align="center" justify="space-between">
            <v-col cols="12" sm="3" align="end">
              <v-text-field
                v-model="isSearchProducts"
                append-icon="mdi-magnify"
                label="Buscar"
                elevation="3"
                hide-details
                dense
                solo
                class="rounded-lg flex-grow-0 flex-shrink-0"
              />
            </v-col>
            <v-col cols="12" sm="3" align="start">
              <v-btn
                block
                color="primary"
                class="rounded-lg flex-grow-0 flex-shrink-0"
                elevation="3"
                :disabled="!selectedProductsIds.length"
                @click="editProductDialogHandler(true)"
              >
                Editar productos
              </v-btn>
            </v-col>
          </v-row>
          <v-dialog
            v-model="isCreateProductDialog"
            max-width="650px"
            :full-screen="$vuetify.breakpoint.xsOnly"
          >
            <v-card class="pa-8 rounded-lg">
              <v-form
                v-model="isValidCreateProduct"
                lazy-validation
              >
                <v-row>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="productToCreate.id"
                      type="number"
                      :rules="[v => !!v || 'Requerido.']"
                      label="ID"
                      autofocus
                      validate-on-blur
                      outlined
                      rounded
                      required
                      class="rounded-lg"
                    />
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      v-model="productToCreate.imageurl"
                      label="Link de imagen del producto"
                      type="text"
                      :rules="[v => !!v || 'Requerido.']"
                      class="rounded-lg"
                      outlined
                      rounded
                      required
                    />
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="productToCreate.description"
                      :rules="[v => !!v || 'Requerido.']"
                      label="Descripcion"
                      validate-on-blur
                      outlined
                      rounded
                      required
                      type="text"
                      class="rounded-lg"
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="productToCreate.stock"
                      label="Stock"
                      type="number"
                      :rules="[v => !!v || 'Requerido.', v => v > 0 || 'Precio no puede ser 0.']"
                      class="rounded-lg"
                      outlined
                      rounded
                      required
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model.number="productToCreate.price"
                      label="Precio"
                      type="number"
                      prefix="$"
                      :rules="[v => !!v || 'Requerido.', v => v > 0 || 'Precio no puede ser 0.']"
                      class="rounded-lg"
                      outlined
                      rounded
                      required
                    />
                  </v-col>
                </v-row>

                <div class="d-flex mt-3">
                  <v-btn
                    color="primary"
                    text
                    @click="createProductDialogHandler(false)"
                  >
                    Cancelar
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    :loading="loadingProducts"
                    :disabled="loadingProducts || !validCreateProduct"
                    @click="createProduct(productToCreate)"
                  >
                    Guardar
                  </v-btn>
                </div>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="isEditDialog"
            max-width="650px"
            :full-screen="$vuetify.breakpoint.xsOnly"
          >
            <v-card class="pa-8 rounded-lg">
              <v-form
                v-model="isValidUpdateProduct"
                lazy-validation
              >
                <v-row align="center">
                  <v-col cols="6">
                    <h2>Modificar {{ selectOptionToModifyProduct }}</h2>
                  </v-col>
                  <v-spacer />
                  <v-col cols="4">
                    <v-select
                      v-model="selectOptionToModifyProduct"
                      hide-details
                      outlined
                      class="rounded-lg"
                      :items="['Stock', 'Precios']"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-chip-group
                      multiple
                    >
                      <v-chip
                        v-for="id in selectedProductsIds"
                        :key="id"
                        color="primary"
                      >
                        {{ id }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-if="selectOptionToModifyProduct === 'Precios'">
                    <v-text-field
                      v-model.number="productToUpdatePrice.price"
                      label="Precio"
                      type="number"
                      prefix="$"
                      :rules="[v => !!v || 'Requerido.', v => v > 0 || 'Precio no puede ser 0.']"
                      class="rounded-lg"
                      outlined
                      rounded
                      required
                    />
                  </v-col>
                  <v-col v-else>
                    <v-text-field
                      v-model.number="productToUpdateStock.stock"
                      label="Stock"
                      type="number"
                      :rules="[v => !!v || 'Requerido.', v => v > 0 || 'Precio no puede ser 0.']"
                      class="rounded-lg"
                      outlined
                      rounded
                      required
                    />
                  </v-col>
                </v-row>

                <div class="d-flex mt-3">
                  <v-btn
                    color="primary"
                    text
                    @click="editProductDialogHandler(false)"
                  >
                    Cancelar
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    :loading="loadingProducts"
                    :disabled="loadingProducts || !validUpdateProduct"
                    @click="createProductToUpdate"
                  >
                    Guardar
                  </v-btn>
                </div>
              </v-form>
            </v-card>
          </v-dialog>
          <v-data-table
            :disable-sort="$vuetify.breakpoint.xsOnly"
            v-model="isSelectedProducts"
            :headers="productHeaders"
            :items="productItems"
            :loading="loadingProducts"
            show-select
            :items-per-page="10"
            :search="isSearchProducts"
            fixed-header
            item-key="id"
            class="elevation-3 rounded-lg"
          >
            <template #[`item.actions`]="{ item }">
              <td class="text-right">
                <v-icon
                  @click="deleteProduct(item.id)"
                >
                  mdi-delete
                </v-icon>
              </td>
            </template>
            <template #[`item.price`]="{ item }">
              <td>
                <span>$ {{ item.price }}</span>
              </td>
            </template>
          </v-data-table>
          <v-btn
            color="primary"
            class="mt-4 rounded-lg flex-grow-0 flex-shrink-0"
            elevation="3"
            @click="createProductDialogHandler(true)"
          >
            Añadir Producto
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      expanded: [],
      selectOptionToModifyProduct: 'Stock',
      singleExpand: false,
      productToCreate: {
        description: '',
        stock: 1,
        price: null,
        imageurl: ''
      },
      productToUpdatePrice: {
        id: '',
        price: null
      },
      productToUpdateStock: {
        id: '',
        stock: 1
      },
      productHeaders: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          class: 'table-header-custom'
        },
        {
          text: 'Cantidad stock',
          value: 'stock',
          class: 'table-header-custom'
        },
        {
          text: 'Descripcion',
          value: 'description',
          class: 'table-header-custom'
        },
        { text: 'Precio', value: 'price', class: 'table-header-custom' },
        { text: 'Eliminar', value: 'actions', align: 'right', sortable: false, class: 'table-header-custom' }
      ],
    }
  },
  
  mounted() {
    this.getProducts();
  },

  watch: {
    isEditDialog(val) {
      if(!val) {
        this.productToUpdate = {
          id: '',
          stock: 1,
          price: null
        }
      }
    }
  },

  computed: {
    ...mapState('products', ['productItems', 'selectedProducts', 'searchProducts', 'editProductDialog',  'createProductDialog', 'validCreateProduct', 'validUpdateProduct', 'loadingProducts']),
    ...mapGetters('products', ['selectedProductsIds']),
    isSearchProducts: {
      get() {
        return this.searchProducts;
      },
      set(value) {
        this.searchProductsHandler(value);
      },
    },
    isSelectedProducts: {
      get() {
        return this.selectedProducts;
      },
      set(value) {
        this.selectedProductsHandler(value);
      },
    },
    isEditDialog: {
      get() {
        return this.editProductDialog;
      },
      set(value) {
        this.editProductDialogHandler(value);
      },
    },
    isValidUpdateProduct: {
      get() {
        return this.validUpdateProduct;
      },
      set(value) {
        this.validUpdateProductHandler(value);
      },
    },
    isValidCreateProduct: {
      get() {
        return this.validCreateProduct;
      },
      set(value) {
        this.validCreateProductHandler(value);
      },
    },
    isCreateProductDialog: {
      get() {
        return this.createProductDialog;
      },
      set(value) {
        this.createProductDialogHandler(value);
      },
    }
  },

  methods: {
    ...mapMutations('products', ['populateProducts', 'searchProductsHandler', 'selectedProductsHandler', 'editProductDialogHandler', 'validUpdateProductHandler', 'createProductDialogHandler', 'validCreateProductHandler']),
    ...mapActions('products', ['getProducts', 'updateProductPrice', 'updateProductStock', 'createProduct', 'deleteProduct']),
    createProductToUpdate () {
      if (this.selectOptionToModifyProduct === 'Precios') {
        const { price } = this.productToUpdatePrice;
        const selectedProductsIds = this.selectedProducts.map(product => product.id)
        selectedProductsIds.forEach((id) => {
          this.updateProductPrice({id, price})
        })
      } else if (this.selectOptionToModifyProduct === 'Stock') {
        const { stock } = this.productToUpdateStock;
        const selectedProductsIds = this.selectedProducts.map(product => product.id)
        selectedProductsIds.forEach((id) => {
          this.updateProductStock({id, stock})
        })
      }
    },
  }
}
</script>