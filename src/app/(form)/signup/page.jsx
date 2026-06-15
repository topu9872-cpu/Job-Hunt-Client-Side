import dynamic from "next/dynamic";

const SignupForm = dynamic(() => import("@/components/Form/Siginup"), {
  loading: () => (
    <div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  ),
});

const SignUpPage = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignUpPage;
