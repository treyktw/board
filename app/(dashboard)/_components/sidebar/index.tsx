import { Button } from '@/components/ui/button'
import React from 'react'
import NewButton from './new-button'
import { List } from './list'

type Props = {}

const SidebarComponent = (props: Props) => {
  return (
    <aside className='fixed z-[1] left-0 bg-blue-950 w-[60px] h-full flex-col flex gap-y-4 text-white p-3 '>
      <List />
      <NewButton />
    </aside>
  )
}

export default SidebarComponent