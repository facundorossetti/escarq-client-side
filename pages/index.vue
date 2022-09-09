<template>
  <div>
    <v-container class="products-container">
      <v-row justify="center" align="center">
        <!-- <v-col cols="5" align="center">
          <div style="height: 100%">
            <img src="~/static/remera2.png" alt="remera" height="100%" />
          </div>
        </v-col> -->
        <!-- <v-btn @click="addToChart(1)">ADD TO CHART</v-btn>
        <v-btn @click="addToChart(2)">ADD TO CHART</v-btn>
        <v-btn @click="addToChart(3)">ADD TO CHART</v-btn>
        <p>ITEMS en el store:</p>
        <ul class="d-flex flex-column">
          <li v-for="item in getChartItems" :key="item.id">
            {{ item }}
          </li>
        </ul> -->
        <div class="d-flex flex-column">
          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                class="mb-4"
                v-on="on"
              >
                Create user
              </v-btn>
            </template>
            <v-card class="pa-5">
              <v-form
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="userToCreate.name"
                  label="Name"
                  :rules="[v => !!v || 'Name is required']"
                  outlined
                  required
                ></v-text-field>

                <v-text-field
                  v-model="userToCreate.email"
                  :rules="[v => !!v || 'Email is required']"
                  label="E-mail"
                  outlined
                  required
                ></v-text-field>

                <v-btn
                  color="primary"
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="primary"
                  :loading="working"
                  :disabled="working"
                  @click="createUser"
                >
                  Save
                </v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-data-table
            :headers="headers"
            :items="users"
            hide-default-footer
            fixed-header
            :loading="$fetchState.pending"
            dense
            class="elevation-1"
          >
          <template #[`item.actions`]="{ item }">
            <v-icon
              small
              @click="deleteUser(item.id)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        </div>
        
        <!-- <v-col cols="7" align="center">
          <div class="products-wrapper">
            <div class="product-card pa-2">
              <div class="product-card-inner">
                <img src="~/static/remera1.png" alt="remera" height="100%">
              </div>
            </div>
            <div class="product-card pa-2">
              <div class="product-card-inner">
                <img src="~/static/remera1.png" alt="remera" height="100%">
              </div>
            </div>
            <div class="product-card pa-2">
              <div class="product-card-inner">
                <img src="~/static/remera1.png" alt="remera" height="100%">
              </div>
            </div>
            <div class="product-card pa-2">
              <div class="product-card-inner">
                <img src="~/static/remera1.png" alt="remera" height="100%">
              </div>
            </div>
          </div>
        </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      valid: true,
      userToCreate: {
        name: '',
        email: '',
      },
      working: false,
      dialog: false,
      headers: [
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
        { text: '', value: 'actions' },

      ],
      users: [],
    }
  },
  async fetch() {
    const { data } = await this.$axios('/users');
    this.users = data;
  },
  computed: {
    // ...mapGetters(['getChartItems']),
  },
  methods: {
    async createUser() {
      if( this.userToCreate.name !== '' && this.userToCreate.email !== '' ) {
        this.working = true;
        await this.$axios.post('/users', this.userToCreate)
          .then( res => {
            this.$fetch();
            this.dialog = false;
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
    // ...mapMutations(['addItemToChart']),
    // addToChart(id) {
    //   const item = {
    //     id,
    //     title: 'remera liza',
    //     color: 'azul',
    //     talle: 'm',
    //     precio: '599',
    //     cantidad: 1,
    //   }
    //   this.addItemToChart(item)
    // },
  },
}
</script>

<style lang="scss" scoped>
.products-container {
  max-width: 100%;
  height: 600px;
  .row {
    margin: 0 !important;
    height: 100%;
    .col {
      height: 100%;
    }
  }
  .products-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    width: 100%;
    .product-card {
      width: 50%;
      height: 50%;
      &-inner {
        width: 100%;
        height: 100%;
        background: #eaeaea;
      }
    }
  }
}
</style>
