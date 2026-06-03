"use client";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { format } from "date-fns";
import toast from "react-hot-toast";
const Footer = () => {
  const handleSuscribe = () => {
    toast.success("Thanks for Suscribeing !", {
      position: "top-right",
    });
  };

  return (
    <footer className=" ">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Job<span className="text-info">Hunt</span>
            </h2>
            <p className="mt-4 text-sm text-gray-500">
              Find your dream job, connect with top companies, and build a
              successful career with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-primary hover:underline transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/jobs" className="hover:text-primary hover:underline transition">
                  Jobs
                </a>
              </li>
              <li>
                <a href="/companies" className="hover:text-primary hover:underline transition">
                  Companies
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary hover:underline transition">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary hover:underline transition">
                  Career Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition">
                  Interview Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get Job Alerts</h3>

            <p className="text-sm text-gray-500 mb-4">
              Subscribe to receive the latest job opportunities.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered rounded-r-none w-full"
              />
              <button
                onClick={handleSuscribe}
                className="btn btn-info text-white rounded-l-none"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-10 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {format(new Date(), "yyyy")} JobHunt. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-primary text-3xl hover:bg-white rounded-full transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="hover:text-primary text-3xl hover:bg-white p-0 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="hover:text-white text-black text-3xl bg-white hover:bg-black rounded-full transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
