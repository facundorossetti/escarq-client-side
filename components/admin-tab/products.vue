<template>
  <v-container class="py-5">
    <v-row justify="center" align="center">
      <v-col cols="12" align="center">
        <div class="d-flex flex-column">
          <div class="d-flex mb-5">
            <v-btn
              color="primary"
              dark
              class="rounded-lg flex-grow-0 flex-shrink-0"
              elevation="3"
              :disabled="!selectedProductsIds.length"
              @click="editProductDialogHandler(true)"
            >
              Editar productos
            </v-btn>
            <v-spacer />
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
          </div>
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
                  <v-col cols="4">
                    <v-text-field
                      v-model="productToCreate.id"
                      :rules="[v => !!v || 'Requerido.']"
                      label="ID"
                      autofocus
                      validate-on-blur
                      outlined
                      rounded
                      required
                      type="text"
                      class="rounded-lg"
                    />
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="productToCreate.type"
                      :rules="[v => !!v || 'Requerido.']"
                      label="Tipo"
                      autofocus
                      validate-on-blur
                      outlined
                      rounded
                      required
                      type="text"
                      class="rounded-lg"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
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
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="productToCreate.price"
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
                  <v-col>
                    <v-text-field
                      v-model="productToCreate.color"
                      label="Color"
                      type="text"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="productToCreate.stock.size.xs"
                      label="Talle XS"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="productToCreate.stock.size.s"
                      label="Talle S"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="productToCreate.stock.size.m"
                      label="Talle M"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="productToCreate.stock.size.l"
                      label="Talle L"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="productToCreate.stock.size.xl"
                      label="Talle XL"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
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
                    @click="createProduct"
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
                <v-row v-if="selectOptionToModifyProduct === 'Stock'">
                  <v-col>
                    <v-text-field
                      v-model="productToUpdate.stock.size.xs"
                      label="Talle XS"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="productToUpdate.stock.size.s"
                      label="Talle S"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="productToUpdate.stock.size.m"
                      label="Talle M"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="productToUpdate.stock.size.l"
                      label="Talle L"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="productToUpdate.stock.size.xl"
                      label="Talle XL"
                      type="number"
                      class="rounded-lg"
                      outlined
                      rounded
                    />
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col>
                    <v-text-field
                      v-model="productToUpdate.price"
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
            v-model="isSelectedProducts"
            :headers="productHeaders"
            :items="productItems"
            :loading="loadingProducts"
            show-expanded
            show-select
            :items-per-page="10"
            :search="isSearchProducts"
            fixed-header
            item-key="id"
            class="elevation-3 rounded-lg"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            show-expand
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
            <template #expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="text-center">
                <div class="d-flex align-center justify-space-around full-widt">
                  <p class="ma-0 font-weight-medium">
                    STOCK:
                  </p>
                  <p class="ma-0 font-weight-medium" :class="[item.stock.size.xs < 1 ? 'red--text' : 'green--text']">
                    XS: {{ item.stock.size.xs }}
                  </p>
                  <p class="ma-0 font-weight-medium" :class="[item.stock.size.s < 1 ? 'red--text' : 'green--text']">
                    S: {{ item.stock.size.s }}
                  </p>
                  <p class="ma-0 font-weight-medium" :class="[item.stock.size.m < 1 ? 'red--text' : 'green--text']">
                    M: {{ item.stock.size.m }}
                  </p>
                  <p class="ma-0 font-weight-medium" :class="[item.stock.size.l < 1 ? 'red--text' : 'green--text']">
                    L: {{ item.stock.size.l }}
                  </p>
                  <p class="ma-0 font-weight-medium" :class="[item.stock.size.xl < 1 ? 'red--text' : 'green--text']">
                    XL: {{ item.stock.size.xl }}
                  </p>
                  <p class="ma-0" />
                </div>
              </td>
            </template>
          </v-data-table>
          <v-btn
            color="primary"
            dark
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
        type: '',
        description: '',
        color: '',
        stock: {
          size: {
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0
          },
          price: '',
          imageurl: ''
        }
      },
      productToUpdate: {
        id: '',
        stock: {
          size: {
            xs: null,
            s: null,
            m: null,
            l: null,
            xl: null
          }
        },
        price: null
      },
      productHeaders: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          class: 'table-header-custom'
        },
        {
          text: 'Tipo',
          value: 'type',
          class: 'table-header-custom'
        },
        {
          text: 'Descripcion',
          value: 'description',
          class: 'table-header-custom'
        },
        {
          text: 'Color',
          value: 'color',
          class: 'table-header-custom'
        },
        { text: 'Precio', value: 'price', class: 'table-header-custom' },
        { text: 'Editar/Eliminar', value: 'actions', align: 'right', sortable: false, class: 'table-header-custom' }
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
          stock: {
            size: {
              xs: null,
              s: null,
              m: null,
              l: null,
              xl: null
            }
          },
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
    ...mapActions('products', ['getProducts', 'updateProduct', 'createProduct', 'deleteProduct']),
    createProductToUpdate () {
      function cleanObject (obj) {
        for (const propName in obj) {
          if (!obj[propName]) {
            delete obj[propName]
          } else {
            obj[propName] = parseFloat(obj[propName])
          }
        }
        return obj
      }
      const sizes = cleanObject(this.productToUpdate.stock.size)
      const selectedProductsIds = this.selectedProducts.map(product => product.id)
      selectedProductsIds.forEach((id) => {
        this.updateProduct({id, sizes})
      })
    },
  }
}
</script>