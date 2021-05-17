import { useState, useEffect } from "react"

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    lastName: "",
    dni: 0,
    password: "",
    adress: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const reset = () => {
    setValues({
      email: "",
      name: "",
      lastName: "",
      dni: 0,
      password: "",
      adress: "",
    })
    setIsSubmitting(false)
  }

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrors(validate(values))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors, callback, isSubmitting])

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    reset,
  }
}
export default useForm
