export default ({ app }, inject) => {
  // Inject $validate(form) in Vue, context and store.
  inject('validate', (form, ctx) => ctx.$refs[form].validate())
}