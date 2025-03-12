
interface CommonBtnProps {
    id?: string;
    type?: string;
    text: string;
    status: number; // 0:비활성화, 1:활성화
    onClick?: (...args: any[]) => any;
}

const CommonBtn: React.FC<CommonBtnProps> = ({ text, status, onClick }) => {
    
    const cn = status? "bg-[#FF801E] text-white" : "bg-[#989C93] text-white";

    return (
        <button onClick={onClick} className={ "w-[100%] h-[50px] rounded-[30px] font-['NeoDunggeunmo'] text-[20px] "+ cn }>
            {text}
        </button>
    );
};

export default CommonBtn;
