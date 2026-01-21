import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Salesforce MCE Custom Entry Source
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A Next.js application for Marketing Cloud Engagement Journey Builder
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              API Endpoints
            </h2>
            <div className="space-y-3">
              <EndpointItem
                method="GET"
                path="/api/entry-source/config"
                description="Configuration endpoint for Journey Builder"
              />
              <EndpointItem
                method="POST"
                path="/api/entry-source/execute"
                description="Execute endpoint to fetch contacts"
              />
              <EndpointItem
                method="POST"
                path="/api/entry-source/validate"
                description="Validate activity configuration"
              />
              <EndpointItem
                method="POST"
                path="/api/entry-source/publish"
                description="Called when journey is published"
              />
              <EndpointItem
                method="POST"
                path="/api/entry-source/stop"
                description="Called when journey is stopped"
              />
              <EndpointItem
                method="POST"
                path="/api/entry-source/save"
                description="Save activity configuration"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/config-modal"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Config Modal Preview
              </Link>
              <Link
                href="/api/entry-source/config"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                View Config JSON
              </Link>
              <Link
                href="/api/entry-source/execute"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                View Mock Data
              </Link>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Setup Instructions
            </h2>
            <ol className="list-decimal list-inside text-amber-700 dark:text-amber-300 space-y-2 text-sm">
              <li>Deploy this application to Vercel</li>
              <li>
                In Marketing Cloud, go to Setup → Installed Packages → New
              </li>
              <li>Add Component → Custom Activity</li>
              <li>
                Set Endpoint URL to:{" "}
                <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">
                  https://your-app.vercel.app
                </code>
              </li>
              <li>Save and use in Journey Builder</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

function EndpointItem({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  const methodColor =
    method === "GET"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
      <span
        className={`px-2 py-1 text-xs font-mono font-semibold rounded ${methodColor}`}
      >
        {method}
      </span>
      <div>
        <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
          {path}
        </code>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}
