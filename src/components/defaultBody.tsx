

interface DefaultBodyProps {
    hasHeader : number; // 0:헤더 없음, 1:헤더 있음
    children?: React.ReactNode;
}

const DefaultBody: React.FC<DefaultBodyProps> = ({ hasHeader, children }) => {
    
    
    const pt = hasHeader? " pt-[108px]" : "";

    return (
       
        <div 
            id="scrollbar-hidden"
            className={ "bg-white w-full h-full flex flex-col px-[20px] "+ pt }>
            {children}
        </div>
    );
};

export default DefaultBody;
