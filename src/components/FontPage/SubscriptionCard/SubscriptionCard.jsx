"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    desc: "Start your job journey",
    features: ["Apply to limited jobs", "Basic profile", "Community access"],
  },
  {
    name: "Pro",
    price: "$9.99",
    desc: "Best for serious job seekers",
    features: [
      "Unlimited job applications",
      "Priority in search",
      "Verified badge",
      "CV boost visibility",
    ],
    highlight: true,
  },
  {
    name: "Elite",
    price: "$19.99",
    desc: "For top professionals",
    features: [
      "Everything in Pro",
      "Direct recruiter chat",
      "Top ranking profile",
      "Interview support",
    ],
  },
];

const SubscriptionPlans = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Choose Your Plan</h2>
          <p className="text-gray-400 mt-3">
            Upgrade your career with the right subscription
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`rounded-3xl border p-8 flex flex-col h-full transition-all duration-300 shadow-sm hover:shadow-xl border-base-300 ${
                plan.highlight ? "border-info" : ""
              }`}
            >
              {/* Title */}
              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <p className="mt-1 text-sm text-gray-500">{plan.desc}</p>

              {/* Price */}
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold">
                  {plan.price}
                </span>
                {plan.price !== "Free" && <span> /mo</span>}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-info" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className="mt-auto w-full py-3 rounded-xl bg-info text-info-content font-semibold hover:opacity-90 transition">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;