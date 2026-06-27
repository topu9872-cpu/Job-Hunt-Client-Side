import AboutUS from "@/components/FontPage/Banner/AboutUS/AboutUS";
import Banner from "../../components/FontPage/Banner/Banner";
import Companies from "@/components/FontPage/Companies/Companies";
import PricingSection from "@/DashboardComponents/PricingSection/PricingSection";


export default function Home() {
  return (
    <div>
     <Banner/>
     <Companies/>
     <AboutUS/>
     <PricingSection/>
  
    </div>
  );
}
