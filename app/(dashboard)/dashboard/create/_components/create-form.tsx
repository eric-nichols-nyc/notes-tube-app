import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export const CreateForm = () => {
  return (
    <div>
        <form className="flex flex-col gap-3 w-full" action="onSubmit">
            <Input name="url" placeholder='ie. https://www.youtube.com/watch?v=SiMIBb20S7c'/>
            <Button type="submit">Summarize Now!</Button>
        </form>
    </div>
  )
}
