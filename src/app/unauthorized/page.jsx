import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>

        <h2 className="text-2xl font-semibold mb-2">
          Access Denied
        </h2>

        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Go Home
          </Link>

          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}