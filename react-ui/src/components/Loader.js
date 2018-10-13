import React from 'react'
import Loading from '../styles/Loader.svg'

export default () => {
  return (
    <div className="loader">
    <img src={Loading} alt="Loading..." style={{width: '135px', height: '135px'}}/>
    </div>
  )
}
