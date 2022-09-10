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
                ></v-text-field>

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
                ></v-text-field>
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
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <template #extension>
          <v-tabs
            v-model="tab"
            fixed-tabs
            color="primary"
          >
            <v-tabs-slider color="primary"></v-tabs-slider>
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
        <v-container class="py-5">
          <v-row justify="center" align="center">
            <v-col cols="12" align="center">
              <div class="d-flex flex-column">
                <div class="d-flex mb-5">
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="searchUsers"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    elevation="3"
                    hide-details
                    dense
                    solo
                    class="rounded-lg flex-grow-0 flex-shrink-0"
                  ></v-text-field>
                </div>
                <v-dialog
                  v-model="createProductDialog"
                  max-width="650px"
                  :full-screen="$vuetify.breakpoint.xsOnly"
                >
                  <v-card class="pa-8 rounded-lg">
                    <v-form
                      v-model="validCreateProduct"
                      lazy-validation
                    >
                      <v-row>
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
                            class="rounded-lg mb-2"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="productToCreate.stock"
                            label="Cantidad"
                            type="number"
                            validate-on-blur
                            :rules="[v => !!v || 'Requerido.']"
                            class="rounded-lg"
                            outlined
                            rounded
                            required
                          ></v-text-field>
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
                            class="rounded-lg mb-2"
                          ></v-text-field>
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
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="productToCreate.color"
                            label="Color"
                            type="text"
                            validate-on-blur
                            :rules="[v => !!v || 'Requerido.']"
                            class="rounded-lg"
                            outlined
                            rounded
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="productToCreate.size"
                            label="Talle"
                            type="text"
                            validate-on-blur
                            :rules="[v => !!v || 'Requerido.']"
                            class="rounded-lg"
                            outlined
                            rounded
                            required
                          ></v-text-field>
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
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <div class="d-flex mt-3">
                        <v-btn
                          color="primary"
                          text
                          @click="createProductDialog = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          :loading="working"
                          :disabled="working || !validCreateProduct"
                          @click="createProduct"
                        >
                          Guardar
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-data-table
                  :headers="productHeaders"
                  :items="productItems"
                  :items-per-page="10"
                  :search="searchUsers"
                  dense
                  fixed-header
                  :loading="$fetchState.pending"
                  class="elevation-3 rounded-lg"
                >
                  <template #[`item.actions`]="{ item }">
                    <td class="text-right">
                      <v-icon
                        small
                        @click="deleteProduct(item.id)"
                      >
                        mdi-delete
                      </v-icon>
                    </td>
                  </template>
                </v-data-table>
                <v-btn
                  color="primary"
                  dark
                  class="mt-4 rounded-lg flex-grow-0 flex-shrink-0"
                  elevation="3"
                  @click="createProductDialog = true"
                >
                  Añadir Producto
                </v-btn>
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
                    @click="createUserDialog = true"
                  >
                    Crear usuario
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="searchUsers"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    elevation="3"
                    hide-details
                    dense
                    solo
                    class="rounded-lg flex-grow-0 flex-shrink-0"
                  ></v-text-field>
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
                      ></v-text-field>
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
                      ></v-text-field>
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
                      ></v-text-field>
                      <div class="d-flex mt-3">
                        <v-btn
                          color="primary"
                          text
                          @click="createUserDialog = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
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
                  dense
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
        <v-container class="py-10">
          <v-row justify="center" align="center">
            <v-col cols="12" align="center">
              2
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
  data() {
    return {
      email: '',
      password: '',
      showPasswordIcon: false,
      valid: false,
      validCreateUser: false,
      validCreateProduct: false,
      working: false,
      createUserDialog: false,
      createProductDialog: false,
      searchUsers: '',
      logged: true,
      rules: {
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres',
        // emailMatch: (v) => v === "hola@hola.com" || 'No existe ningun usuario con ese correo',
      },
      userHeaders: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Name',
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Editar/Eliminar', value: 'actions', align: 'right', sortable: false},

      ],
      userItems: [],
      productHeaders: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Tipo',
          value: 'type',
        },
        {
          text: 'Descripcion',
          value: 'description',
        },
        {
          text: 'Talle',
          value: 'size',
        },
        {
          text: 'Color',
          value: 'color',
        },
        { text: 'Cant. stock', value: 'stock' },
        { text: 'Precio', value: 'price' },
        { text: 'Editar/Eliminar', value: 'actions', align: 'right', sortable: false},
      ],
      productItems: [],
      userToCreate: {
        name: '',
        email: '',
        password: '',
      },
      productToCreate: { 
        type: '', 
        description: '', 
        size: '', 
        color: '', 
        stock: '', 
        price: '', 
        imageurl: '', 
      },
      tab: null,
      items: [
        'productos', 'usuarios', 'ordenes de compra'
      ]
      
    }
  },
  async fetch() {
    const { data:users } = await this.$axios('/users');
    const { data:products } = await this.$axios('/products');
    this.userItems = users;
    this.productItems = products;
  },
  methods: {
    login() {
      if (this.valid) {
        this.logged = true;
      }
    },
    async createUser() {
      if( this.validCreateUser ) {
        this.working = true;
        await this.$axios.post('/users', this.userToCreate)
          .then( res => {
            this.$fetch();
            this.createUserDialog = false;
          })
        this.working = false;
      };
    },
    async deleteUser(id) {
      await this.$axios.delete(`/users/${id}`)
        .then( res => {
          this.$fetch();
        });
    },
    async deleteProduct(id) {
      await this.$axios.delete(`/products/${id}`)
        .then( res => {
          this.$fetch();
        });
    },
    async createProduct() {
      if( this.validCreateProduct ) {
        this.working = true;
        await this.$axios.post('/products', this.productToCreate)
          .then( res => {
            this.$fetch();
            this.createProductDialog = false;
          })
        this.working = false;
      };
    },
  },
}
</script>
