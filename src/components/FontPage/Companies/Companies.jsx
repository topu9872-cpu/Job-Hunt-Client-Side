// import Image from "next/image";
import Marquee from "react-fast-marquee";

const companies = [
  {
    name: "Google",
    logo: "https://cdn.simpleicons.org/google",
  },

  {
    name: "Apple",
    logo: "https://cdn.simpleicons.org/apple",
  },
  {
    name: "Meta",
    logo: "https://cdn.simpleicons.org/meta",
  },
  {
    name: "Netflix",
    logo: "https://cdn.simpleicons.org/netflix",
  },
  {
    name: "Tesla",
    logo: "https://cdn.simpleicons.org/tesla",
  },
  {
    name: "NVIDIA",
    logo: "https://cdn.simpleicons.org/nvidia",
  },
  {
    name: "Spotify",
    logo: "https://cdn.simpleicons.org/spotify",
  },
  {
    name: "Airbnb",
    logo: "https://cdn.simpleicons.org/airbnb",
  },
];

const Companies = () => {
  return (
    <>
   <h1 className="text-4xl text-center font-bold mt-18"> Companies</h1>
    <section className="mt-10 overflow-hidden">
      <Marquee speed={100} gradient={false}>
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-4 flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100/50 backdrop-blur-sm px-5 py-3 shadow-sm hover:scale-105 transition-all duration-300"
          >
            <img
              src={company?.logo}
              alt={company.name}
              width={40}
              height={40}
              className="object-contain"
            />

            <span className="font-medium whitespace-nowrap">
              {company.name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
    </>
  );
};

export default Companies;
