import React from 'react'
import BtnLogin from './BtnLogin'

const OAuth = () => {
  return (
    <div>
      <BtnLogin 
        provider={"google"}
        bgColor='#f2573f'
      />
      {/* <BtnLogin 
        provider={providers.facebook}
        bgColor='#0404be'
        csrfToken={csrfToken}
      />
      <BtnLogin 
        provider={providers.github}
        bgColor='#444'
        csrfToken={csrfToken}
      /> */}
    </div>
  )
}

export default OAuth