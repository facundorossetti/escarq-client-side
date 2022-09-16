<template>
  <div>
    <TheHero></TheHero>
    <v-container class="mt-12" fluid>
      <v-row justify="center" align="center" class="mx-2">
        <v-col align="center" v-for="product in productItems" :key="product.id" cols="12" sm="6" md="4" lg="3" class="product-cards-container">
          <product-card-copy :product="product" />
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="isChartModal"
      max-width="1100px"
    >
      <v-card class="pa-8 rounded-lg">
        <v-btn v-if="$vuetify.breakpoint.xsOnly" fab x-small absolute left top depressed class="mt-8" color="primary" @click="checkoutModalHandler(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-row align="center" :class="{'mt-6': $vuetify.breakpoint.xsOnly}">
          <v-col v-for="(product, index) in chart" :key="index" cols="12" align="center">
            <checkout-small-product-card :product="product" @clickOnDelete="removeItemFromChart(product)"></checkout-small-product-card>
          </v-col>
          <v-col cols="12" md="10" align="center">
            <v-form
              ref="checkoutForm"
              v-model="isValidCheckout"
              lazy-validation
              :class="{'mt-8': $vuetify.breakpoint.xsOnly}"
            > 
              <v-row align="center">
                <v-col cols="12" md="6" align="center">
                  <v-text-field
                    v-model="payerInfo.name"
                    :rules="[v => !!v || 'Requerido.']"
                    label="Nombre"
                    placeholder="Ej. Vicente"
                    validate-on-blur
                    outlined
                    hide-details
                    rounded
                    required
                    type="text"
                    class="rounded-lg mb-2"
                  />
                </v-col>
                <v-col cols="12" md="6" align="center">
                  <v-text-field
                    v-model="payerInfo.surname"
                    :rules="[v => !!v || 'Requerido.']"
                    label="Apellido"
                    placeholder="Ej. Lopez"
                    validate-on-blur
                    outlined
                    hide-details
                    rounded
                    required
                    type="text"
                    class="rounded-lg mb-2"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="payerInfo.email"
                    :rules="[
                      v => !!v || 'Requerido.',
                      v => /.+@.+\..+/.test(v) || 'E-mail invalido'
                    ]"
                    label="E-mail"
                    placeholder="Ej. email@email.com"
                    validate-on-blur
                    outlined
                    rounded
                    hide-details
                    required
                    type="email"
                    class="rounded-lg mb-2"
                  />
                </v-col>
                <v-col cols="5" md="3">
                  <v-text-field
                    v-model="payerInfo.phone.area_code"
                    :rules="[v => !!v || 'Requerido.']"
                    label="Cod. area"
                    placeholder="Ej. 011"
                    validate-on-blur
                    outlined
                    rounded
                    hide-details
                    required
                    hide-spin-buttons
                    type="number"
                    class="rounded-lg mb-2"
                  />
                </v-col>
                <v-col cols="7" md="3">
                  <v-text-field
                    v-model="payerInfo.phone.number"
                    :rules="[v => !!v || 'Requerido.']"
                    label="Telefono"
                    placeholder="Ej. 1112345678"
                    validate-on-blur
                    outlined
                    hide-details
                    rounded
                    required
                    hide-spin-buttons
                    type="number"
                    class="rounded-lg mb-2"
                  />
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    v-model="payerInfo.address.street_name"
                    :rules="[v => !!v || 'Requerido.']"
                    label="Dirección"
                    placeholder="Ej. Av. siempre viva"
                    validate-on-blur
                    outlined
                    rounded
                    hide-details
                    required
                    type="email"
                    class="rounded-lg mb-2"
                  />
                </v-col>
                <v-col cols="7" md="3">
                  <v-text-field
                    v-model="payerInfo.address.street_number"
                    :rules="[v => !!v || 'Requerido.']"
                    label="Numero"
                    placeholder="Ej. 1234"
                    validate-on-blur
                    hide-details
                    outlined
                    rounded
                    required
                    hide-spin-buttons
                    type="number"
                    class="rounded-lg mb-2"
                  />
                </v-col>
                <v-col cols="5" md="4">
                  <v-text-field
                    v-model="payerInfo.address.zip_code"
                    :rules="[v => !!v || 'Requerido.']"
                    label="Codigo postal"
                    placeholder="Ej. 1430"
                    validate-on-blur
                    hide-details
                    outlined
                    rounded
                    required
                    hide-spin-buttons
                    type="number"
                    class="rounded-lg mb-2"
                  />
                </v-col>
              </v-row>
              
            </v-form>
          </v-col>
          <v-col cols="12" md="2" align="end">
            <img v-if="$vuetify.breakpoint.xsOnly" src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/online/468X60.jpg" 
              title="Mercado Pago - Medios de pago" alt="Mercado Pago - Medios de pago" 
              width="308" height="50"/>
            <img v-else src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/online/120X240.jpg" 
              title="Mercado Pago - Medios de pago" alt="Mercado Pago - Medios de pago" 
              width="120" height="240"/>
          </v-col>
          <v-col v-if="$vuetify.breakpoint.xsOnly" cols="12" md="2" align="center">
            <h3 class="mr-4 primary--text">Total a pagar: $ {{ getTotalPrice }}</h3>
          </v-col>
        </v-row>
        <div class="d-flex align-center mt-5">
          <v-btn
            color="primary"
            text
            @click="checkoutModalHandler(false)"
          >
            Cancelar
          </v-btn>
          <v-spacer />
          <h3 v-if="!$vuetify.breakpoint.xsOnly" class="mr-4 primary--text">Total a pagar:</h3>
          <h3 v-if="!$vuetify.breakpoint.xsOnly" class="primary--text">$ {{ getTotalPrice }}</h3>
          <v-spacer />
          <v-btn
            color="primary"
            :disabled="!checkoutValidation && !!chart.length"
            @click="validateForm('checkoutForm')"
          >
            Pagar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
  
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: "IndexPage",
  data() {
    return {
      payerInfo: {
        name: null,
        surname: null,
        email: null,
        phone: {
            area_code: null,
            number: null
        },
        address: {
            street_name: null,
            street_number: null,
            zip_code: null
        }
      }
    }
  },
  computed: {
    ...mapGetters('chart', ['getTotalPrice']),
    ...mapState('chart', ['checkoutModal', 'chart', 'checkoutValidation']),
    ...mapState('products', ['productItems']),
    
    isChartModal: {
      get() {
        return this.checkoutModal
      },
      set(value) {
        this.checkoutModalHandler(value);
      }
    },
    isValidCheckout: {
      get() {
        return this.checkoutValidation;
      },
      set(value) {
        this.checkoutValidationHandler(value);
      }
    }
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    ...mapMutations('chart', ['checkoutModalHandler', 'checkoutValidationHandler', 'removeItemFromChart']),
    ...mapActions('chart', ['buyChartItems']),
    ...mapActions('products', ['getProducts']),
    validateForm(form) {
      if (this.$validate(form, this)) {
        this.buyChartItems(this.payerInfo);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-cards-container {
  min-height: 500px !important;
}
.payment-dialog-information {
  border: 1px solid #303030;
}
@media screen and (max-width: 600px) {
  .col-12, .col-3, .col-5, .col-7, .col-4 {
    padding-right: 4px !important;
    padding-left: 4px !important;
  }

}
</style>
