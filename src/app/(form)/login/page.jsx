import dynamic from "next/dynamic";

const Login =dynamic(()=> import("@/components/Form/Login"),{
loading:()=> <div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
}) 

const LoginPage = () => {
  return (
    <div>
      <Login/>
    </div>
  );
};

export default LoginPage;