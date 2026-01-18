"use client";

import { useEffect, useState } from "react";

interface Contact {
  contactKey: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  customerId: string;
}

export default function ConfigModal() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/entry-source/execute");
      const data = await response.json();
      if (data.status === "ok") {
        setContacts(data.data);
      } else {
        setError(data.message || "Failed to fetch contacts");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // Send message to parent window (Journey Builder)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "save",
          data: {
            configured: true,
            contactCount: contacts.length,
          },
        },
        "*"
      );
    }
  };

  const handleCancel = () => {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "cancel" }, "*");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Custom Entry Source Configuration
        </h1>
        <p className="text-gray-600 mb-6">
          This entry source will inject contacts from your external system into
          the Journey.
        </p>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Available Contacts Preview
          </h2>

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading contacts...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-4 text-sm text-gray-500">
                Total contacts: {contacts.length}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Customer ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.slice(0, 5).map((contact) => (
                      <tr key={contact.contactKey}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {contact.email}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {contact.customerId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {contacts.length > 5 && (
                <p className="mt-2 text-sm text-gray-500">
                  ...and {contacts.length - 5} more contacts
                </p>
              )}
            </>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Output Fields</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <code>contactKey</code> - Unique identifier
            </li>
            <li>
              • <code>email</code> - Contact email address
            </li>
            <li>
              • <code>firstName</code> - First name
            </li>
            <li>
              • <code>lastName</code> - Last name
            </li>
            <li>
              • <code>phone</code> - Phone number
            </li>
            <li>
              • <code>customerId</code> - External customer ID
            </li>
          </ul>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
