import React from 'react';
import Table from './Table';

const TableIndex = () => {
    const columns = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Age', accessor: 'age' },
        { Header: 'Email', accessor: 'email' },
    ];

    const data = [
        { name: 'John Doe', age: 28, email: 'john@example.com' },
        { name: 'Jane Smith', age: 34, email: 'jane@example.com' },
        { name: 'Mike Johnson', age: 45, email: 'mike@example.com' },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Table</h1>
            <Table columns={columns} data={data} />
        </div>
    );
};

export default TableIndex;