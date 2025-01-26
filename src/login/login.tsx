import { useState } from 'react'



function Login () {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
        <img 
            className="flex w-[87.69%] h-[14.28%]" 
            src="/images/logo.png" 
        />
        <div id='kakao'></div>
        <div id='naver'></div>
        <div id='google'></div>
    </div>
  )
}

export default Login;