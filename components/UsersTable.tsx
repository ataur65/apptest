"use client";
import React from 'react';
import Table from './Table';
import Image from 'next/image';
import { User } from '@/lib/interfaces';

interface UsersTableProps {
  users: User[];
  onDelete: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onDelete }) => { // Accept users and onDelete as props
  const columns = [
    {
      Header: 'Username',
      accessor: 'username',
      Cell: ({ row }: { row: User }) => (
        <div className="flex items-center gap-3">
          {/* Assuming no avatar for now, or add a placeholder */}
          {/* <Image className="h-8 w-8 rounded-full object-cover" src={row.avatar || '/img/placeholder.jpg'} alt={row.name} width={32} height={32} /> */}
          {row.username}
        </div>
      ),
    },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }: { row: User }) => (
        <>
          {/* You can add edit/delete buttons here later */}
          <button className="ml-4 bg-green-500/20 text-green-300 text-xs font-semibold py-1 px-3 rounded-md hover:bg-green-500/40">View</button>
          <button onClick={() => onDelete(row._id)} className="ml-2 bg-red-500/20 text-red-300 text-xs font-semibold py-1 px-3 rounded-md hover:bg-red-500/40">Delete</button>
        </>
      ),
    },
  ];

  return (
    <Table columns={columns} data={users} className="min-w-[800px]" />
  );
};

export default UsersTable;