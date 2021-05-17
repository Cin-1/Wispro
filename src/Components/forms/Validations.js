export default function validate(values) {
  let errors = {}
  if (!values.email) {
    errors.email = "Email address is required"
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is required"
  }
  if (!values.name) {
    errors.name = "Name is required"
  }

  if (!values.adress) {
    errors.adress = "Adress is required"
  }
  if (!values.password) {
    errors.password = "Password is required"
  }

  if (!values.lastName) {
    errors.lastName = "Lastname is required"
  }
  if (!values.dni) {
    errors.dni = "DNI is required"
  }

  return errors
}
