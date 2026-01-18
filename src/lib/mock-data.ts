import { Contact } from "@/types/entry-source";

// Mock contacts data
const mockContacts: Contact[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1-555-0101",
    customerId: "CUST001",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1-555-0102",
    customerId: "CUST002",
    createdAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    email: "bob.wilson@example.com",
    firstName: "Bob",
    lastName: "Wilson",
    phone: "+1-555-0103",
    customerId: "CUST003",
    createdAt: "2024-01-17T09:15:00Z",
  },
  {
    id: "4",
    email: "alice.johnson@example.com",
    firstName: "Alice",
    lastName: "Johnson",
    phone: "+1-555-0104",
    customerId: "CUST004",
    createdAt: "2024-01-18T16:45:00Z",
  },
  {
    id: "5",
    email: "charlie.brown@example.com",
    firstName: "Charlie",
    lastName: "Brown",
    phone: "+1-555-0105",
    customerId: "CUST005",
    createdAt: "2024-01-19T11:00:00Z",
  },
];

export class MockDataService {
  /**
   * Get all contacts
   */
  static getContacts(): Contact[] {
    return mockContacts;
  }

  /**
   * Get a contact by ID
   */
  static getContactById(id: string): Contact | undefined {
    return mockContacts.find((contact) => contact.id === id);
  }

  /**
   * Get a contact by email
   */
  static getContactByEmail(email: string): Contact | undefined {
    return mockContacts.find((contact) => contact.email === email);
  }

  /**
   * Get contacts with pagination
   */
  static getContactsPaginated(
    page: number = 1,
    limit: number = 10
  ): { contacts: Contact[]; total: number; page: number; totalPages: number } {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedContacts = mockContacts.slice(start, end);

    return {
      contacts: paginatedContacts,
      total: mockContacts.length,
      page,
      totalPages: Math.ceil(mockContacts.length / limit),
    };
  }

  /**
   * Search contacts by query (searches in email, firstName, lastName)
   */
  static searchContacts(query: string): Contact[] {
    const lowerQuery = query.toLowerCase();
    return mockContacts.filter(
      (contact) =>
        contact.email.toLowerCase().includes(lowerQuery) ||
        contact.firstName.toLowerCase().includes(lowerQuery) ||
        contact.lastName.toLowerCase().includes(lowerQuery)
    );
  }
}
