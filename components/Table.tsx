'use client';

import React from 'react';

interface Column<T> {
  accessor: keyof T | string;
  Header: string;
  Cell?: ({ row, value }: { row: T; value: any }) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: { name: string; onClick: (row: T) => void }[];
  className?: string;
}

const Table = <T extends object>({ columns, data, actions, className = '' }: TableProps<T>) => {
  return (
    <div className="bg-custom-surface rounded-lg mt-8 overflow-x-auto">
      <table className={`w-full text-left ${className}`}>
        <thead>
          <tr className="border-b border-gray-700">
            {columns.map((column) => (
              <th key={column.accessor as string} className="p-4 font-semibold text-sm text-custom-text-secondary">
                {column.Header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="p-4 font-semibold text-sm text-custom-text-secondary">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td key={column.accessor as string} className="p-4 text-sm text-custom-text-primary">
                  {column.Cell ? column.Cell({ row, value: row[column.accessor as keyof T] }) : row[column.accessor as keyof T] as React.ReactNode}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="p-4 text-sm text-custom-text-primary flex space-x-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                      className="text-blue-500 hover:underline"
                    >
                      {action.name}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;