import React from 'react'

const DropDownMenu = ({icon,title}) => {
  return (
    <div className='flex'>
        <div className='mt-1'>{icon}</div>
        <div className='ml-2' >{title}</div>
      
    </div>
  )
}

export default DropDownMenu
