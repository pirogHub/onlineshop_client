import { FieldErrors, UseFormRegister } from "react-hook-form"

export interface IInputs {
    name: string
    email: string
    password: string
}


export interface IAuthPageInput {
    register: UseFormRegister<IInputs>
    errors: FieldErrors<IInputs>
}


export interface ISingUpFx {
    url: string
    username: string
    email: string
    password: string

}

export interface ISingInFx {
    url: string
    username: string
    password: string

}
