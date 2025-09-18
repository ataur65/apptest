'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '@/components/Table';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setContacts(response.data);
      } catch (err: any) {
        setError(err);
        toast.error('Failed to fetch contacts.');
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`/api/contacts/${id}`);
        setContacts(contacts.filter((contact) => contact._id !== id));
        toast.success('Contact deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete contact.');
        console.error('Error deleting contact:', err);
      }
    }
  };

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Subject', accessor: 'subject' },
    { Header: 'Message', accessor: 'message' },
    { Header: 'Created At', accessor: 'createdAt', render: (item: Contact) => new Date(item.createdAt).toLocaleDateString() },
  ];

  const tableActions = [
    {
      name: 'Delete',
      onClick: (item: Contact) => handleDelete(item._id),
      icon: FaTrash,
      className: 'text-red-600 hover:text-red-800',
    },
  ];

  if (loading) {
    return <div className="text-center py-4">Loading contacts...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contacts</h2>
      {contacts.length === 0 ? (
        <div className="text-center py-4 text-gray-600">No contacts found.</div>
      ) : (
        <Table columns={columns} data={contacts} actions={tableActions} />
      )}
    </div>
  );
};

export default ContactsPage;