<template>
  <div v-if="!logged">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="6" align="center">
          <v-hover v-slot="{ hover }">
            <v-card class="pa-10 mt-16 rounded-lg transition-swing" :elevation="hover ? 6 : 2">
              <v-form
                ref="loginForm"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="email"
                  :rules="[
                    v => !!v || 'Requerido.',
                    v => v.length >= 8 || 'Minimo 8 caracteres',
                    v => /.+@.+\..+/.test(v) || 'E-mail invalido',
                  ]"
                  label="E-mail"
                  autofocus
                  validate-on-blur
                  outlined
                  rounded
                  required
                  type="email"
                  class="rounded-lg mb-2"
                />

                <v-text-field
                  v-model="password"
                  :type="showPasswordIcon ? 'text' : 'password'"
                  :rules="[v => !!v || 'Por favor ingrese una contraseña.', v => v.length >= 8 || 'Minimo 8 caracteres']"
                  label="Contraseña"
                  :append-icon="showPasswordIcon ? 'mdi-eye' : 'mdi-eye-off'"
                  class="rounded-lg"
                  outlined
                  rounded
                  required
                  @click:append="showPasswordIcon = !showPasswordIcon"
                />
                <v-btn
                  color="primary"
                  class="mt-3 rounded-lg"
                  block
                  :loading="working"
                  :disabled="working || !valid"
                  @click="login"
                >
                  INGRESAR
                </v-btn>
              </v-form>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-container class="pt-0">
      <v-toolbar color="white" elevation="3" class="rounded-lg">
        <v-toolbar-title>Administrador</v-toolbar-title>
        <v-spacer />
        <v-app-bar-nav-icon />
        <v-btn @click="showInConsole">
          MAIN PAGE
        </v-btn>
        <template #extension>
          <v-tabs
            v-model="tab"
            fixed-tabs
            color="primary"
          >
            <v-tabs-slider color="primary" />
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-container>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <admin-tab-products />
      </v-tab-item>

      <v-tab-item>
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
                    @click="createUserDialog = true"
                  >
                    Crear usuario
                  </v-btn>
                  <v-spacer />
                  <v-text-field
                    v-model="searchUsers"
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
                  v-model="createUserDialog"
                  max-width="400px"
                >
                  <v-card class="pa-8 rounded-lg">
                    <v-form
                      v-model="validCreateUser"
                      lazy-validation
                    >
                      <v-text-field
                        v-model="userToCreate.name"
                        :rules="[v => !!v || 'Requerido.']"
                        label="Nombre"
                        autofocus
                        validate-on-blur
                        outlined
                        rounded
                        required
                        type="text"
                        class="rounded-lg mb-2"
                      />
                      <v-text-field
                        v-model="userToCreate.email"
                        :rules="[
                          v => !!v || 'Requerido.',
                          v => /.+@.+\..+/.test(v) || 'E-mail invalido'
                        ]"
                        label="E-mail"
                        validate-on-blur
                        outlined
                        rounded
                        required
                        type="email"
                        class="rounded-lg mb-2"
                      />
                      <v-text-field
                        v-model="userToCreate.password"
                        label="Contraseña"
                        type="password"
                        validate-on-blur
                        :rules="[v => !!v || 'Requerido.', v => v.length >= 8 || 'Minimo 8 caracteres']"
                        class="rounded-lg"
                        outlined
                        rounded
                        required
                      />
                      <div class="d-flex mt-3">
                        <v-btn
                          color="primary"
                          text
                          @click="createUserDialog = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-spacer />
                        <v-btn
                          color="primary"
                          :loading="working"
                          :disabled="working || !validCreateUser"
                          @click="createUser"
                        >
                          Guardar
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-data-table
                  :headers="userHeaders"
                  :items="userItems"
                  :search="searchUsers"
                  hide-default-footer
                  fixed-header
                  :loading="$fetchState.pending"
                  class="elevation-3 rounded-lg"
                >
                  <template #[`item.actions`]="{ item }">
                    <td class="text-right">
                      <v-icon
                        small
                        @click="deleteUser(item.id)"
                      >
                        mdi-delete
                      </v-icon>
                    </td>
                  </template>
                </v-data-table>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item>
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
                    @click="modifyOrderStatusDialog = true"
                  >
                    Modificar estado
                  </v-btn>
                  <v-spacer />
                  <v-text-field
                    v-model="searchOrders"
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
                  v-model="modifyOrderStatusDialog"
                  max-width="600px"
                >
                  <v-card class="pa-8 rounded-lg">
                    <v-select
                      v-model="selectOrderToUpdateStatus"
                      :items="ordersId"
                      multiple
                      label="Selecciona las ordenes que deseas modificar"
                      autofocus
                      :menu-props="{ top: true, offsetY: true }"
                      outlined
                      rounded
                      required
                      class="rounded-lg mb-2"
                    />
                    <v-select
                      v-model="selectStatusOrdersToUpdate"
                      :items="orderStatuses"
                      label="Selecciona el nuevo estado"
                      :menu-props="{ top: true, offsetY: true }"
                      outlined
                      rounded
                      required
                      class="rounded-lg mb-2"
                    />
                    <div class="d-flex mt-3">
                      <v-btn
                        color="primary"
                        text
                        @click="modifyOrderStatusDialog = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-spacer />
                      <v-btn
                        color="primary"
                        :loading="working"
                        :disabled="working || !selectOrderToUpdateStatus"
                        @click="prepareOrderForChangeStatus"
                      >
                        Guardar
                      </v-btn>
                    </div>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="orderModal"
                >
                  <v-card class="pa-8 rounded-lg">
                    <v-list>
                      <v-list-item-group
                        color="primary"
                      >
                        <div class="d-flex align-start justify-space-between">
                          <div>
                            <h2>Orden numero: {{ orderModalItems.id }}</h2>
                            <h3 class="mb-5">
                              Estado de entrega: {{ orderModalItems.status }}
                            </h3>
                          </div>
                          <div>
                            <v-btn icon color="primary" @click="orderModal = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </div>
                        </div>
                        <v-list-item
                          v-for="(orderItem, i) in orderModalItems.items"
                          :key="i"
                        >
                          <v-list-item-icon>
                            <v-img :src="orderItem.picture_url" :width="100" :height="100" contain />
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>Descripcion: {{ orderItem.title }}</v-list-item-title>
                            <v-list-item-title>Talle: {{ orderItem.description }}</v-list-item-title>
                            <v-list-item-title>Cantidad: {{ orderItem.quantity }}</v-list-item-title>
                            <v-list-item-title>Precio Unitario: $ {{ orderItem.unit_price }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card>
                </v-dialog>
                <v-data-table
                  :headers="ordersHeaders"
                  :items="orders"
                  :items-per-page="10"
                  :search="searchOrders"
                  fixed-header
                  item-key="id"
                  :loading="$fetchState.pending"
                  class="elevation-3 rounded-lg"
                >
                  <template #[`item.actions`]="{ item }">
                    <td class="text-right">
                      <v-icon
                        @click="openOrderModal(item)"
                      >
                        mdi-eye
                      </v-icon>
                    </td>
                  </template>
                  <template #[`item.amount`]="{ item }">
                    <td>
                      $ {{ item.amount }}
                    </td>
                  </template>
                  <template #[`item.status`]="{ item }">
                    <td>
                      <v-chip :color="item.status === 'pendiente' ? 'red' : 'green'">
                        <span class="white--text">{{ item.status }}</span>
                      </v-chip>
                    </td>
                  </template>
                </v-data-table>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-container class="py-5">
          <v-row justify="center" align="center">
            <v-col cols="12" align="center">
              <div class="d-flex flex-column">
                <div class="d-flex mb-5">
                  <v-spacer />
                  <v-text-field
                    v-model="searchPayments"
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
                  v-model="paymentsDialog"
                >
                  <v-card class="pa-8 rounded-lg">
                    <v-list>
                      <v-list-item-group
                        color="primary"
                      >
                        <div class="d-flex align-start justify-space-between">
                          <h2 class="mb-5">
                            Detalles del pago numero: {{ paymentDialogItems.id }}
                          </h2>
                          <v-spacer />
                          <div>
                            <v-btn icon color="primary" @click="paymentsDialog = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </div>
                        </div>
                        <v-list-item>
                          <v-list-item-content v-if="paymentDialogItems.orderdata">
                            <v-list-item-title>Orden de compra: {{ paymentDialogItems.orderdata.id }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content v-if="paymentDialogItems.payer">
                            <h3>Datos del cliente:</h3>
                            <v-list-item-title>Nombre: {{ paymentDialogItems.payer.first_name }}</v-list-item-title>
                            <v-list-item-title>Apellido: {{ paymentDialogItems.payer.last_name }}</v-list-item-title>
                            <v-list-item-title>Email: {{ paymentDialogItems.payer.email }}</v-list-item-title>
                            <v-list-item-title>Telefono: {{ paymentDialogItems.payer.phone.area_code }} {{ paymentDialogItems.payer.phone.number }}</v-list-item-title>
                            <v-list-item-title>DNI: {{ paymentDialogItems.payer.identification.number }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card>
                </v-dialog>
                <v-data-table
                  :headers="paymentsHeaders"
                  :items="payments"
                  :items-per-page="10"
                  :search="searchPayments"
                  fixed-header
                  item-key="id"
                  :loading="$fetchState.pending"
                  class="elevation-3 rounded-lg"
                >
                  <template #[`item.actions`]="{ item }">
                    <td class="text-right">
                      <v-icon
                        @click="openPaymentsDialog(item)"
                      >
                        mdi-eye
                      </v-icon>
                    </td>
                  </template>
                  <template #[`item.amount`]="{ item }">
                    <td>
                      $ {{ item.amount }}
                    </td>
                  </template>
                  <template #[`item.detail`]="{ item }">
                    <td>
                      <v-chip :color="item.detail === 'accredited' ? 'green' : 'red'">
                        <span class="white--text">{{ item.detail }}</span>
                      </v-chip>
                    </td>
                  </template>
                </v-data-table>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

export default {
  name: 'AdminPage',
  layout: 'user',
  data () {
    return {
      selectOrderToUpdateStatus: null,
      selectStatusOrdersToUpdate: null,
      orderStatuses: ['Pendiente', 'Entregado'],
      ordersListSelection: 1,
      expanded: [],
      selectedProducts: [],
      selectOptionToModifyProduct: 'Stock',
      singleExpand: false,
      email: '',
      password: '',
      showPasswordIcon: false,
      valid: false,
      validCreateUser: false,
      validCreateProduct: false,
      validUpdateProduct: false,
      working: false,
      createUserDialog: false,
      createProductDialog: false,
      modifyOrderStatusDialog: false,
      editProductDialog: false,
      paymentsDialog: false,
      searchUsers: '',
      searchOrders: '',
      searchPayments: '',
      paymentDialogItems: [],
      logged: true,
      rules: {
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres'
        // emailMatch: (v) => v === "hola@hola.com" || 'No existe ningun usuario con ese correo',
      },
      userHeaders: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          class: 'table-header-custom'
        },
        {
          text: 'Name',
          value: 'name',
          class: 'table-header-custom'
        },
        { text: 'Email', value: 'email', class: 'table-header-custom' },
        { text: 'Editar/Eliminar', value: 'actions', align: 'right', sortable: false, class: 'table-header-custom' }

      ],
      userItems: [],
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
      productItems: [],
      userToCreate: {
        name: '',
        email: '',
        password: ''
      },
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
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0
          }
        },
        price: null
      },
      tab: null,
      items: [
        'productos', 'usuarios', 'ordenes de compra', 'pagos'
      ],
      payments: [],
      ordersHeaders: [
        {
          align: 'start',
          text: 'Estado de entrega',
          value: 'status',
          class: 'table-header-custom'
        },
        {
          text: 'Número',
          value: 'id',
          class: 'table-header-custom'
        },
        {
          text: 'Fecha de Creacion',
          value: 'date',
          class: 'table-header-custom'
        },
        {
          text: 'Monto',
          value: 'amount',
          class: 'table-header-custom'
        },
        {
          text: 'Estado de pago',
          value: 'paymentStatus',
          class: 'table-header-custom'
        },
        { text: 'Ver órden', value: 'actions', align: 'right', sortable: false, class: 'table-header-custom' }
      ],
      orders: [],
      orderModalItems: [],
      orderModal: false,
      paymentsHeaders: [
        {
          align: 'start',
          text: 'Estado',
          value: 'status',
          class: 'table-header-custom'
        },
        {
          align: 'start',
          text: 'Detalles',
          value: 'detail',
          class: 'table-header-custom'
        },
        {
          text: 'Número',
          value: 'id',
          class: 'table-header-custom'
        },
        {
          text: 'Fecha de Creacion',
          value: 'date',
          class: 'table-header-custom'
        },
        {
          text: 'Monto',
          value: 'amount',
          class: 'table-header-custom'
        },
        {
          text: 'Orden de compra',
          value: 'orderdata.id',
          class: 'table-header-custom'
        },
        { text: 'Ver Datos del Cliente', value: 'actions', align: 'right', sortable: false, class: 'table-header-custom' }
      ]
    }
  },
  async fetch () {
    const { data: users } = await this.$axios('/users')
    const { data: products } = await this.$axios('/products')
    const { data: orders } = await this.$axios('/orders')
    const { data: payments } = await this.$axios('/payments')
    this.payments = payments
    this.orders = orders.map((order) => {
      const isPaymentStatus = this.payments.find((payment) => {
        return payment.orderdata.id === order.id
      })
      if (isPaymentStatus) {
        order.paymentStatus = isPaymentStatus.detail
      } else {
        order.paymentStatus = 'NO INFO'
      }
      return order
    })
    this.userItems = users
    this.productItems = products
  },
  computed: {
    ordersId () {
      return this.orders.map(order => order.id)
    },
    selectedProductsIds () {
      return this.selectedProducts.map(product => product.id)
    }
  },
  methods: {
    async updateProduct (id, sizes) {
      await this.$axios.patch('/updateProduct', { id, sizes })
        .then((res) => {
          this.$fetch()
        })
      this.working = false
      this.editProductDialog = false
      this.productToUpdate.stock.size = {
        xs: 0,
        s: 0,
        m: 0,
        l: 0,
        xl: 0
      }
    },
    createProductToUpdate () {
      this.working = true
      const sizes = this.cleanObject(this.productToUpdate.stock.size)
      this.selectedProductsIds.forEach((id) => {
        this.updateProduct(id, sizes)
      })
    },

    // Clean object from null values and convert string to number
    cleanObject (obj) {
      for (const propName in obj) {
        if (!obj[propName]) {
          delete obj[propName]
        } else {
          obj[propName] = parseFloat(obj[propName])
        }
      }
      return obj
    },
    showInConsole () {
      
    },
    async changeOrderStatus (id, status) {
      await this.$axios.patch(`/order/${id}/${status}`)
    },
    prepareOrderForChangeStatus () {
      this.working = true
      this.orders.forEach((order) => {
        this.selectOrderToUpdateStatus.forEach((id) => {
          if (order.id === id) {
            this.changeOrderStatus(order.id, this.selectStatusOrdersToUpdate)
            this.$fetch()
          };
        })
      })
      this.selectOrderToUpdateStatus = null
      this.selectStatusOrdersToUpdate = null
      this.modifyOrderStatusDialog = false
      this.working = false
    },
    login () {
      if (this.valid) {
        this.logged = true
      }
    },
    async createUser () {
      if (this.validCreateUser) {
        this.working = true
        await this.$axios.post('/users', this.userToCreate)
          .then((res) => {
            this.$fetch()
            this.createUserDialog = false
          })
        this.working = false
      };
    },
    async deleteUser (id) {
      await this.$axios.delete(`/users/${id}`)
        .then((res) => {
          this.$fetch()
        })
    },
    async deleteProduct (id) {
      await this.$axios.delete(`/products/${id}`)
        .then((res) => {
          this.$fetch()
        })
    },
    async createProduct () {
      if (this.validCreateProduct) {
        this.working = true
        await this.$axios.post('/products', this.productToCreate)
          .then((res) => {
            this.$fetch()
            this.createProductDialog = false
          })
        this.working = false
      };
    },
    openOrderModal (order) {
      this.orderModalItems = order
      this.orderModal = true
    },
    openPaymentsDialog (payment) {
      this.paymentDialogItems = payment
      this.paymentsDialog = true
    }
  }
}
</script>

<style lang="scss">
.table-header-custom {
  font-size: 16px !important;
  font-weight: bold !important;
}
</style>
