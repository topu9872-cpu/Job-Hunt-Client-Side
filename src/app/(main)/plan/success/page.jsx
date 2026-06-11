import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSubcreptions } from "@/app/api/Server/Server";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const {
        status,
        customer_details: { email: customerEmail },
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });
  
  // const status = session?.status;
  // const customerEmail = session?.customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    const res = await getSubcreptions(subInfo);
  
    return (
      <main className="min-h-[85vh] flex mt-20  items-center justify-center px-4 font-sans">
        <div className="max-w-md w-full mb-10  rounded-2xl p-8 text-center shadow-xl shadow-gray-100/70 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {/* Top Decorative Success Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />

          {/* Success Checkmark Icon Badge */}
          <div className="w-16 h-16  text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-50/50">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* Text Headers */}
          <h1 className="text-2xl font-black tracking-tight mb-2">
            Payment Successful!
          </h1>
          <p className="text-sm mb-6">
            Thank you for your purchase. Your account features have been
            unlocked.
          </p>

          {/* Order Details Confirmation Box */}
          <div className="rounded-xl p-4 border border-gray-100 text-left mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1.5">
              Receipt & Confirmation
            </p>
            <p className="text-sm leading-relaxed">
              We appreciate your business! A confirmation email and tax invoice
              are being routed to:
            </p>
            <div className="mt-2 inline-block border border-gray-200 rounded-lg px-3 py-1 text-sm font-semibold shadow-sm">
              {customerEmail || "your registered email"}
            </div>
          </div>

          {/* Action Navigation Layout */}
          <div className="space-y-3">
            <Link
              href="/jobs"
              className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-bold rounded-xl text-white btn btn-info shadow-md shadow-blue-100 transition-all duration-200"
            >
              Start Applying to Jobs
            </Link>

            <a
              href="mailto:orders@example.com"
              className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-xl hover:underline transition-colors duration-200"
            >
              Need assistance? Contact support
            </a>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
