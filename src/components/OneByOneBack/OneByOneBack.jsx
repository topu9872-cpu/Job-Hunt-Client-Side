'use client'
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
const OneByOneBack = () => {
  const router=useRouter()
  return (
    <div>
       <button onClick={()=>router.back()} className="flex items-center text-xl font-bold hover:text-info hover-3d">
        <FaArrowLeft/>
        Back
        </button> 
    </div>
  );
};

export default OneByOneBack;