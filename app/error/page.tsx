export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Authentication Error</h1>
        <p className="text-gray-600 mb-8">
          Sorry, something went wrong with your authentication.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}
