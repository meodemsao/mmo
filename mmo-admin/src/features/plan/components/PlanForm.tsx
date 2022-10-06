import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput, Card, Button, Label, Select } from 'flowbite-react'
import { Duration } from 'generated/graphql'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, 'Please enter plan name'),
  price: z.number().int().positive(),
  duration: z.nativeEnum(Duration),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface PropTypes {
  defaultValues?: Partial<FormSchemaType>
  title: string
  mode: string
  disableClick?: boolean
  onSubmit: SubmitHandler<FormSchemaType>
}

export const PlanForm = (props: PropTypes) => {
  const { defaultValues, onSubmit, title } = props
  const durations = Object.keys(Duration)

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
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput {...register('price', { valueAsNumber: true })} type="number" />
          {errors.price && (
            <div className="mb-3 text-normal text-red-500 ">{errors.price?.message}</div>
          )}
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="duration" value="Duration" />
          </div>

          <Select {...register('duration')}>
            {durations.map((duration, index) => (
              <option key={index}>{duration}</option>
            ))}
          </Select>

          {errors.duration && (
            <div className="mb-3 text-normal text-red-500 ">{errors.duration?.message}</div>
          )}
        </div>

        <Button type="submit">Save</Button>
      </form>
    </Card>
  )
}
