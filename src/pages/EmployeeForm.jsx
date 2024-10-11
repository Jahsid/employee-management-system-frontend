import { useState } from 'react';
import { Form, Input, Button, message, Select, Radio, Checkbox, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const EmployeeForm = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    
    formData.append('f_Name', values.fName);
    formData.append('f_Email', values.fEmail);
    formData.append('f_Mobile', values.fMobile);
    formData.append('f_Designation', values.fDesignation);
    formData.append('f_gender', values.fGender);
    formData.append('f_Course', values.fCourse);

    if (fileList.length > 0) {
      formData.append('f_Image', fileList[0].originFileObj);
    } else {
      message.error('Please upload an image');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponseData(data);
      message.success('Employee added successfully!');
      
      navigate('/employees');
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
          <Select placeholder="Select designation">
            <Option value="HR">HR</Option>
            <Option value="Manager">Manager</Option>
            <Option value="Sales">Sales</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Gender"
          name="fGender"
          rules={[{ required: true, message: 'Please select the gender!' }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Course"
          name="fCourse"
          rules={[{ required: true, message: 'Please select the course!' }]}
        >
          <Checkbox.Group>
            <Checkbox value="MCA">MCA</Checkbox>
            <Checkbox value="BCA">BCA</Checkbox>
            <Checkbox value="BSC">BSC</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        
        <Form.Item
          label="Upload Image"
          name="f_Image"
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload 
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Add Employee
          </Button>
        </Form.Item>
      </Form>
     
      {error && <div className="mt-4 text-red-500">Error: {error}</div>}
    </div>
  );
};

export default EmployeeForm;
