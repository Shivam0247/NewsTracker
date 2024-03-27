import React from 'react'
import Loader from './Loader.gif'

const Loading = ()=> {
    return (
      <div className="text-center my-3">
            <img src={Loader} alt="loading" style={{width:"3%"}}/>
      </div>
    )
}

export default Loading