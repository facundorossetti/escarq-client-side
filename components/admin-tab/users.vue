<template>
  <v-container class="py-5">
    <v-row justify="center" align="center">
      <v-col cols="12" align="center">
        <div class="d-flex flex-column">
          <v-row class="mb-5" align="center" justify="space-between">
            <v-col cols="12" sm="3" align="end">
              <v-btn
                block
                color="primary"
                class="rounded-lg flex-grow-0 flex-shrink-0"
                elevation="3"
                @click="createUserDialogHandler(true)"
              >
                Crear usuario
              </v-btn>
            </v-col>
            <v-col cols="12" sm="3" align="start">
              <v-text-field
                v-model="isSearchUsers"
                append-icon="mdi-magnify"
                label="Buscar"
                elevation="3"
                hide-details
                dense
                solo
                class="rounded-lg flex-grow-0 flex-shrink-0"
              />
            </v-col>
          </v-row>
          <v-dialog
            v-model="isCreateUserDialog"
            max-width="400px"
          >
            <v-card class="pa-8 rounded-lg">
              <v-form
                v-model="isValidCreateUser"
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
                    @click="createUserDialogHandler(false)"
                  >
                    Cancelar
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    :loading="loadingUsers"
                    :disabled="!validCreateUser"
                    @click="createUser(userToCreate)"
                  >
                    Guardar
                  </v-btn>
                </div>
              </v-form>
            </v-card>
          </v-dialog>
          <v-data-table
            :disable-sort="$vuetify.breakpoint.xsOnly"
            :headers="userHeaders"
            :items="userItems"
            :loading="loadingUsers"
            :search="searchUsers"
            hide-default-footer
            fixed-header
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
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
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
      userToCreate: {
        name: '',
        email: '',
        password: ''
      },
    };
  },

  mounted() {
    this.getUsers();
  },

  watch: {
    isCreateUserDialog(value) {
      if(!value) {
        this.userToCreate = {
          name: '',
          email: '',
          password: ''
        }
      }
    }
  },

  computed: {
    ...mapState('users', ['searchUsers', 'createUserDialog', 'validCreateUser', 'userItems', 'loadingUsers']),
    isCreateUserDialog: {
      get() {
        return this.createUserDialog;
      },
      set(value) {
        this.createUserDialogHandler(value);
      }
    },
    isValidCreateUser: {
      get() {
        return this.validCreateUser;
      },
      set(value) {
        this.validCreateUserHandler(value);
      }
    },
    isSearchUsers: {
      get() {
        return this.searchUsers;
      },
      set(value) {
        this.searchUsersUserHandler(value);
      }
    }
  },

  methods: {
    ...mapMutations('users', ['createUserDialogHandler', 'validCreateUserHandler', 'searchUsersUserHandler']),
    ...mapActions('users', ['getUsers', 'deleteUser', 'createUser']),

  },
};
</script>

<style lang="scss" scoped>

</style>