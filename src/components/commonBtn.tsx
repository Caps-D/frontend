interface CommonBtnProps {
    id?: string;
    type?: string;
    text: string;
    status: number; // 0: 비활성화, 1: 활성화
    onClick?: (...args: any[]) => any;
    hasNav?: boolean; // hasNav prop 추가
}

const CommonBtn: React.FC<CommonBtnProps> = ({ text, status, onClick, hasNav }) => {
    
    const cn = status ? "bg-[#FF801E] text-white" : "bg-[#989C93] text-white";

    return (
        <button 
            onClick={onClick} 
            className={ "fixed bottom-[20px] w-[90%] max-w-[460px] h-[50px] rounded-[30px] font-['NeoDunggeunmo'] text-[20px] " + cn }
            style={{ marginBottom: hasNav ? "75px" : "0" }} // hasNav가 있으면 padding-bottom을 75px로 설정
        >
            {text}
        </button>
    );
};

export default CommonBtn;
