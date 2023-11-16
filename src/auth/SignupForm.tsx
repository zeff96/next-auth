"use client"

import React, {useState} from "react"
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

const SignupForm = () => {
  const[state, formAction] = useFormState(registration, initialState)
  const[show, setShow] = useState(false)

  return(
    <form action={formAction}>
      <label htmlFor="username">
        Username
        <input type="text" name="username" id="username" placeholder="Enter name" required />
      </label>
      <label htmlFor="email">
        Email
        <input type="email" name="email" id="email" placeholder="Enter email" required />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" name="password" id="password" placeholder="Enter password" required />
      </label>
      <label htmlFor="password_confirmation">
        Password confirmation
        <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm password" required />
      </label>
      <SubmitButton />
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </form>
  )
}