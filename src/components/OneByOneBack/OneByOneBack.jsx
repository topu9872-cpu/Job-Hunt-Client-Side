'use client'
import { useRouter } from "next/navigation";

import { GoArrowLeft } from "react-icons/go";
const OneByOneBack = () => {
  const router=useRouter()
  return (
    <div>
       <button onClick={()=>router.back()} className="flex items-center text-xl hover:text-info hover-3d">
        <GoArrowLeft />
       
        </button> 
    </div>
  );
};

export default OneByOneBack;