"use client";

import { motion } from "framer-motion";
import { Users, Target, ShieldCheck } from "lucide-react";

const AboutUS = () => {
  const coreValues = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Our Mission",
      description:
        "Connecting talented professionals with the right opportunities through a smarter hiring experience.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community First",
      description:
        "We focus on helping job seekers grow, connect, and succeed in their careers.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Trust & Safety",
      description:
        "Every company and job posting is carefully reviewed to maintain platform quality.",
    },
  ];

  return (
    <section className="py-24  overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-info/10 text-info font-medium mb-4">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Helping Talent Find The Right Opportunity
          </h2>

          <p className=" text-lg leading-relaxed">
            Our platform connects ambitious professionals with companies that
            value their skills. We simplify the hiring process through modern
            technology, transparency, and meaningful career matches.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-5">
              Why We Built This Platform
            </h3>

            <p className=" leading-relaxed mb-4">
              Finding the right job should be exciting, not frustrating. We
              created this platform to remove unnecessary barriers and help
              talented people discover opportunities that truly match their
              skills and ambitions.
            </p>

            <p className=" leading-relaxed">
              Whether you're searching for your first role or your next big
              career move, we're here to make the journey smoother and more
              rewarding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* OUTER SNAKE BORDER */}
           <motion.div
  initial={{ opacity: 0, x: 60 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative"
>
 <div className="relative h-80 overflow-hidden rounded-3xl p-1">
  {/* Running Border Layer */}
  <div className="absolute inset-0 animate-[spin_4s_linear_infinite] rounded-3xl">
<div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,#06b6d4_12%,#06b6d4_25%,transparent_25%,transparent_50%,#06b6d4_62%,#06b6d4_75%,transparent_75%)]" />  </div>

  {/* Content Card */}
  <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[22px] bg-base-100">
    <h3 className="text-center text-info text-3xl font-bold">
      Your Dream Job
      <br />
      Starts Here 
    </h3>
  </div>
</div>
</motion.div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Core Values
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group p-8 rounded-3xl border border-base-300  shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-info/10 text-info flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform">
                  {value.icon}
                </div>

                <h4 className="text-xl font-bold mb-3">{value.title}</h4>

                <p className="leading-relaxed text-gray-500">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUS;
