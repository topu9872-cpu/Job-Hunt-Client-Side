import Image from "next/image";
import Marquee from "react-fast-marquee";

const Companies = () => {

const companies = [
   {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com"
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com"
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com"
  },
  {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com"
  },
  {
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com"
  },
  {
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com"
  },
  {
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com"
  },
  {
    name: "NVIDIA",
    logo: "https://logo.clearbit.com/nvidia.com"
  },
  {
    name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com"
  },
  {
    name: "Airbnb",
    logo: "https://logo.clearbit.com/airbnb.com"
  },
  {
    name: "Uber",
    logo: "https://logo.clearbit.com/uber.com"
  },
  {
    name: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com"
  },
  {
    name: "LinkedIn",
    logo: "https://logo.clearbit.com/linkedin.com"
  },
  {
    name: "GitHub",
    logo: "https://logo.clearbit.com/github.com"
  },
  {
    name: "Slack",
    logo: "https://logo.clearbit.com/slack.com"
  },
  {
    name: "Zoom",
    logo: "https://logo.clearbit.com/zoom.us"
  },
  {
    name: "Shopify",
    logo: "https://logo.clearbit.com/shopify.com"
  },
  {
    name: "Stripe",
    logo: "https://logo.clearbit.com/stripe.com"
  },
 
  {
    name: "Apple",
    logo: "https://cdn.simpleicons.org/apple"
  },
  {
    name: "Meta",
    logo: "https://cdn.simpleicons.org/meta"
  },
  {
    name: "Netflix",
    logo: "https://cdn.simpleicons.org/netflix"
  },
  {
    name: "Tesla",
    logo: "https://cdn.simpleicons.org/tesla"
  },
  {
    name: "NVIDIA",
    logo: "https://cdn.simpleicons.org/nvidia"
  },
  {
    name: "Spotify",
    logo: "https://cdn.simpleicons.org/spotify"
  },
  {
    name: "Airbnb",
    logo: "https://cdn.simpleicons.org/airbnb"
  },
 
  
];

  return (
    <div className="flex mt-10 overflow-hidden gap-5">
          <Marquee>
        {companies.map((company, ind)=>
             <div key={ind} className="flex card w-30 mx-4  items-center border opacity-70 hover:opacity-100 transition">
        <Image src={company.logo} fill alt={company.name} className="w-8 h-8" />
        <span className="text-sm font-medium">{company.name}</span>
      </div>
        )}
        </Marquee>
    </div>
  );
};

export default Companies;