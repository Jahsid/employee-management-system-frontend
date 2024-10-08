import { useState } from 'react';
import { Form, Input, Button, Select, Radio, Upload, message } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const EmployeeForm = ({ employee = {}, isEdit = false }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/api/employees/${employee._id}`, values);
                message.success('Employee updated');
            } else {
                await axios.post('/api/employees', values);
                message.success('Employee created');
            }
        } catch (error) {
            message.error('Error in submission');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="bg-white p-8 shadow-lg rounded-md w-96"
                initialValues={employee}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isEdit ? 'Edit Employee' : 'Create Employee'}
                </h2>

                <Form.Item
                    name="f_Name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input employee name!' }]}
                >
                    <Input placeholder="Enter name" />
                </Form.Item>

                <Form.Item
                    name="f_Email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                    name="f_Mobile"
                    label="Mobile"
                    rules={[{ required: true, message: 'Please input mobile number!' }]}
                >
                    <Input placeholder="Enter mobile number" />
                </Form.Item>

                <Form.Item
                    name="f_Designation"
                    label="Designation"
                    rules={[{ required: true, message: 'Please select designation!' }]}
                >
                    <Select placeholder="Select designation">
                        <Option value="HR">HR</Option>
                        <Option value="Manager">Manager</Option>
                        <Option value="Sales">Sales</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="f_gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Radio.Group>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="f_Course"
                    label="Course"
                    rules={[{ required: true, message: 'Please input course!' }]}
                >
                    <Input placeholder="Enter course" />
                </Form.Item>

                <Form.Item
                    name="f_Image"
                    label="Upload Image"
                >
                    <Upload
                        name="f_Image"
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false} // Disable automatic upload
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        {isEdit ? 'Update Employee' : 'Create Employee'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EmployeeForm;
