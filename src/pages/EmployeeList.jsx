import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, message } from 'antd';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        message.error('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (f_Id) => {
    try {
      await fetch(`http://localhost:5000/api/employees/${f_Id}`, {
        method: 'DELETE',
      });
      setEmployees(employees.filter((emp) => emp.f_Id !== f_Id));
      message.success('Employee deleted successfully');
    } catch (error) {
      message.error('Failed to delete employee');
    }
  };

  const columns = [
    { title: 'Unique ID', dataIndex: 'f_Id', key: 'f_Id' },
    { title: 'Image', dataIndex: 'f_Image', key: 'f_Image' },
    { title: 'Name', dataIndex: 'f_Name', key: 'f_Name' },
    { title: 'Email', dataIndex: 'f_Email', key: 'f_Email' },
    { title: 'Mobile', dataIndex: 'f_Mobile', key: 'f_Mobile' },
    { title: 'Designation', dataIndex: 'f_Designation', key: 'f_Designation' },
    { title: 'Gender', dataIndex: 'f_gender', key: 'f_gender' },
    { title: 'Course', dataIndex: 'f_Course', key: 'f_Course' },
    { 
      title: 'Action', 
      key: 'action',
      render: (text, record) => (
        <>
          <Link to={`/employee/edit/${record.f_Id}`}>
            <Button type="link">Edit</Button>
          </Link>
          <Button type="link" danger onClick={() => handleDelete(record.f_Id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <Table
        dataSource={employees}
        columns={columns}
        rowKey="f_Id"
        loading={loading}
      />
    </div>
  );
};

export default EmployeeList;
