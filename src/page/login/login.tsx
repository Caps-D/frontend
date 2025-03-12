


function Login () {

  const handleKakao = () => {
      window.location.href = "http://34.47.97.192:3000/auth/kakao"
  }

  const handleNaver = () => {
    window.location.href = "http://34.47.97.192:3000/auth/naver"
}

const handleGoogle = () => {
  window.location.href = " http://34.47.97.192:3000/auth/google"
}

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">

        {/*로고*/}
        <img 
            className="flex w-[87.69%] h-[14.28%] mt-[30.4%] mb-[35.27%]" 
            src="/images/logo.svg" 
        />

        <button id='kakao' className="flex w-[87.4%] h-[6.6%] mb-[2.46%]" onClick={handleKakao}>
            <img
              className="flex w-full h-full"
              src="/images/카카오.svg"></img>
        </button>
        <button id='naver' className="flex w-[87.4%] h-[6.6%] mb-[2.46%]" onClick={handleNaver}>
          <img
              className="flex w-full h-full"
              src="/images/네이버.svg"></img>
        </button>
        <button id='google' className="flex w-[87.4%] h-[6.6%] " onClick={handleGoogle}>
          <img
              className="flex w-full h-full"
              src="/images/구글.svg"></img>
        </button>
    </div>
  )
}

export default Login;