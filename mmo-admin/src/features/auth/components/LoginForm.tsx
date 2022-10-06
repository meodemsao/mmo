import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button, Spinner, TextInput, Label } from 'flowbite-react'
import { useAuth } from 'lib/auth'
import { LoginInput } from 'generated/graphql'

const schema = z.object({
  username: z.string().min(1, 'Minimum length should be 4'),
  password: z.string().min(8, 'Minimum length should be 8'),
})

type LoginValues = {
  username: string
  password: string
}

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth()
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting, isValid },
  // } = useForm()
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginInput>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })

  function onSubmit(values: any) {
    console.log('values...................', values)
    login(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username">User name</Label>
        </div>
        <TextInput id="username" placeholder="username" {...register('username')} />
        {errors.username && (
          <div className="mb-3 text-normal text-red-500 ">{errors.username?.message}</div>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Password</Label>
        </div>
        <TextInput id="password" type="password" placeholder="password" {...register('password')} />
        {errors.password && (
          <div className="mb-3 text-normal text-red-500 ">{errors.password?.message}</div>
        )}
      </div>

      <Button type="submit">
        {isLoggingIn || isSubmitting ? (
          <>
            <div className="mr-3">
              <Spinner size="sm" light={true} />
            </div>
            Loading ...
          </>
        ) : (
          'Login'
        )}
      </Button>
    </form>
  )
}
