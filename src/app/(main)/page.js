import AboutUS from "@/components/FontPage/Banner/AboutUS/AboutUS";
import Banner from "../../components/FontPage/Banner/Banner";
import SubscriptionPlans from "@/components/FontPage/SubscriptionCard/SubscriptionCard";
import Companies from "@/components/FontPage/Companies/Companies";


export default function Home() {
  return (
    <div>
     <Banner/>
     <Companies/>
     <AboutUS/>
     <SubscriptionPlans/>
    </div>
  );
}
