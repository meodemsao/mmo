import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput, Card, Button, Label } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, 'Please enter role name'),
  description: z.string().min(1, 'Please enter role description'),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface PropTypes {
  defaultValues?: Partial<FormSchemaType>
  title: string
  mode: string
  disableClick?: boolean
  onSubmit: SubmitHandler<FormSchemaType>
}

export const RoleForm = (props: PropTypes) => {
  const { defaultValues, onSubmit, title } = props

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchemaType>({
    mode: 'onSubmit',
    defaultValues: defaultValues,
    resolver: zodResolver(FormSchema),
  })

  return (
    <Card title={title}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>

          <TextInput {...register('name')} />
          {errors.name && (
            <div className="mb-3 text-normal text-red-500 ">{errors.name?.message}</div>
          )}
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <TextInput {...register('description')} />
          {errors.description && (
            <div className="mb-3 text-normal text-red-500 ">{errors.description?.message}</div>
          )}
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Card>
  )
}
