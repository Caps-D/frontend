import CommonBtn from "../../components/commonBtn";
import { useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import { useNavigate } from "react-router-dom";
import { PostSignup } from "../../api/signup/postSignup";

function Signup () {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [gender, setgender] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const handleButtonClick = (gender: string) => {
        setActiveButton(gender);
        setgender(gender);
      };

      const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNickname(e.target.value);
    };

    const handleNextClick = async() => {
        if (!activeButton) {
          alert("성별을 선택해주세요.");
        } else {

         try {
            console.log(`성별 업데이트: ${gender}`);
            const response = await PostSignup(gender,nickname);
            console.log(`회원가입 결과: ${response}`);
            const code = response.status
            navigate('/main');
           
        } catch (error) {
            console.error("회원가입 실패", error);
            alert(error);
            //alert('이메일 혹은 비밀번호가 틀립니다. 다시 시도해주세요.');
        }
          }
        };
      
    
  
    return (
        <div className="flex flex-col items-center justify-start w-full h-full">
        <Header>
          <Header.Title>{`회원가입`}</Header.Title>
          <Header.BackButton />
        </Header>
        <DefaultBody hasHeader={1}>
          <div className="w-[100%] mt-[20px] flex items-center justify-center text-[24px] font-normal text-black font-['NeoDunggeunmo']">
            정보를 입력해주세요.
          </div>
      
          <p className="mt-[18%] flex w-[100%] justify-start items-center ml-[5%] mb-[6px] font-['NeoDunggeunmo'] text-[19px]">닉네임을 입력해주세요!</p>
          <div className="w-[100%] flex  justify-center items-start ">
      
                <input
                    className=" border border-[3px] rounded-x border-black w-[90%] h-[45px] flex font-['NeoDunggeunmo']  px-[5px]"
                    id="nickname"
                    placeholder="닉네임 입력"
                    value= {nickname}
                    onChange={handleNicknameChange}
                    />
          </div>
          <p className="mt-[12%] flex w-[100%] justify-start items-center ml-[5%] font-['NeoDunggeunmo'] text-[19px]"> 성별을 선택해주세요!</p>

          <div id="buttonCont" className="flex mt-[-80px] w-[100%] h-[50%] flex-row items-center justify-center">
            
          <button
            className={`w-[40.93%] h-[40.61%] text-[200%] font-normal leading-[36px] text-white font-['NeoDunggeunmo'] ${gender === "male" ? "bg-[#FF801E]" : "bg-[#989C93]"}`}
            onClick={() => handleButtonClick("male")}
          >
            <div className="">남성</div>
          </button>

          <button
            className={`ml-[20px] w-[40.93%] h-[40.61%] text-[200%] font-normal leading-[36px] text-white font-['NeoDunggeunmo'] ${gender === "female" ? "bg-[#FF801E]" : "bg-[#989C93]"}`}
            onClick={() => handleButtonClick("female")}
          >
            <div className="">여성</div>
          </button>
        </div>
         
          <div className="flex w-[100%] mt-19 center">
            <CommonBtn status={1} text="다음" onClick={handleNextClick} />
          </div>
        </DefaultBody>
      </div>
    );
  }
  
  export default Signup;