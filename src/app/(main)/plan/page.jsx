"use client";
import OneByOneBack from "@/components/OneByOneBack/OneByOneBack";
import React, { useState } from "react";
import { FiCheck, FiUser, FiBriefcase, FiZap } from "react-icons/fi";

const PricingSection = () => {
  // 'seekers' or 'recruiters' state to toggle content
  const [activeTab, setActiveTab] = useState("seekers");

  const jobSeekersPlans = [
    {
      id:'seeker_free',
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started and exploring opportunities.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile setup",
        "Standard email alerts",
      ],
    },
    {
       id:'seeker_pro',
      name: "Pro",
      price: "$19.99",
      period: "month",
      description: "For active job seekers looking for a competitive edge.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Detailed application tracking",
        "In-depth salary insights",
      ],
      isPopular: true,
    },
    { id:'seeker_premium',
      name: "Premium",
      price: "$39.99",
      period: "month",
      description:
        "Maximum visibility and ultimate tools for landing the role.",
      features: [
        "Everything in Pro included",
        "Unlimited job applications",
        "Profile boost to recruiters",
        "Early access to new jobs",
        "Priority customer support",
      ],
    },
  ];

  const recruitersPlans = [
    {
       id:'recruters_free',
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Ideal for small startups or your first year of hiring.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
      ],
    },
    {
       id:'recruters_growth',
      name: "Growth",
      price: "$49.99",
      period: "month",
      description: "Designed for expanding companies scaling their teams.",
      features: [
        "Up to 10 active job posts",
        "Full applicant tracking system",
        "Basic hiring analytics",
        "Email customer support",
      ],
      isPopular: true,
    },
    {
       id:'recruters_enterprise',
      name: "Enterprise",
      price: "$149",
      period: "month",
      description: "Complete suites for high-volume recruitment needs.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings",
        "Team collaboration tools",
        "Custom corporate branding",
        "24/7 Priority support",
      ],
    },
  ];

  const currentPlans =
    activeTab === "seekers" ? jobSeekersPlans : recruitersPlans;

  return (
    <section className="py-16 px-4 min-h-screen font-sans">
      <OneByOneBack />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Transparent Pricing for Everyone
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Choose the perfect plan tailored to support your career growth or
            hiring milestones.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className=" p-1 rounded-xl flex items-center shadow-inner">
            <button
              onClick={() => setActiveTab("seekers")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "seekers" && "bg-white text-blue-600 shadow-sm"
              }`}
            >
              <FiUser className="w-4 h-4" />
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("recruiters")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "recruiters" && "bg-white text-blue-600 shadow-sm"
              }`}
            >
              <FiBriefcase className="w-4 h-4" />
              For Recruiters
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {currentPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border transition-all duration-300 relative flex flex-col h-full ${
                plan.isPopular
                  ? "border-blue-500 shadow-xl ring-2 ring-blue-500 ring-opacity-10 scale-105 z-10 md:-translate-y-2"
                  : "border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Popular Ribbon Tag */}
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <FiZap className="w-3 h-3 fill-current" /> Most Popular
                </span>
              )}

              {/* Title & Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 min-h-10 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-1 mb-8 border-b border-gray-100 pb-6">
                <span className="text-4xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-sm">/{plan.period}</span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8 grow">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-gray-600 leading-normal"
                  >
                    <span className="shrink-0 w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mt-0.5">
                      <FiCheck className="w-3 h-3 stroke-3" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Action Button */}
              <form action="/api/checkout_sessions" method="POST">
                <section>
                  <input type="hidden" name="plan_id" value={plan.id}/>
                  <input type="hidden" name="price" value={plan.price} />
                  <button
                    type="submit"
                    role="link"
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 ${
                      plan.isPopular
                        ? "btn btn-info text-white shadow-md shadow-blue-200"
                        : "btn btn-info btn-soft text-white"
                    }`}
                  >
                    Get Started with {plan.name}
                  </button>
                </section>
              </form>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
