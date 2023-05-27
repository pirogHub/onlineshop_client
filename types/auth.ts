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
    url?: string
    username: string
    email: string
    password: string

}

export interface ISingInFx {
    url?: string
    username: string
    password: string

}


export interface IUser {
    id?: number | string
    username: string
    userId: number | string
    email: string
}


export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IAuthResponse extends ITokens {
    user: IUser
}