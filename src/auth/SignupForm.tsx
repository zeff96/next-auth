"use client"

import {useFormState, useFormStatus} from "react-dom"
import { registration } from "@/actions/user/new"

const initialState = {
  message: null
}

const SubmitButton = () => {
  const {pending} = useFormStatus()

  return(
    <button type="submit" aria-disabled={pending}>
      Sign up
    </button>
  )
}