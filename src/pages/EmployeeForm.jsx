import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const EmployeeForm = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    const employeeData = {
      f_Name: values.fName,
      f_Email: values.fEmail,
      f_Mobile: values.fMobile,
      f_Designation: values.fDesignation,
      f_gender: values.fGender,
      f_Course: values.fCourse,
    };

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponseData(data);
      message.success('Employee added successfully!');
    } catch (error) {
      setError(error.message);
      message.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <Form.Item
          label="Full Name"
          name="fName"
          rules={[{ required: true, message: 'Please input the full name!' }]}
        >
          <Input className="border border-gray-300 rounded p-2" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="fEmail"
          rules={[{ required: true, message: 'Please input a valid email!', type: 'email' }]}
        >
          <Input className="border border-gray-300 rounded p-2" />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="fMobile"
          rules={[{ required: true, message: 'Please input the mobile number!' }]}
        >
          <Input className="border border-gray-300 rounded p-2" />
        </Form.Item>
        <Form.Item
          label="Designation"
          name="fDesignation"
          rules={[{ required: true, message: 'Please input the designation!' }]}
        >
          <Input className="border border-gray-300 rounded p-2" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="fGender"
          rules={[{ required: true, message: 'Please input the gender!' }]}
        >
          <Input className="border border-gray-300 rounded p-2" />
        </Form.Item>
        <Form.Item
          label="Course"
          name="fCourse"
          rules={[{ required: true, message: 'Please input the course!' }]}
        >
          <Input className="border border-gray-300 rounded p-2" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Add Employee
          </Button>
        </Form.Item>
      </Form>
      {responseData && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Employee Added:</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      {error && <div className="mt-4 text-red-500">Error: {error}</div>}
    </div>
  );
};

export default EmployeeForm;
