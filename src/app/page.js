import AboutUS from "@/components/FontPage/Banner/AboutUS/AboutUS";
import Banner from "../components/FontPage/Banner/Banner";
import SubscriptionPlans from "@/components/FontPage/SubscriptionCard/SubscriptionCard";


export default function Home() {
  return (
    <div>
     <Banner/>
     <AboutUS/>
     <SubscriptionPlans/>
    </div>
  );
}
