import { useEffect, useState } from "react";
import { Form, Input, Button, message, Select, Radio, Checkbox, Upload } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditEmployee = () => {
  const { id: f_Id } = useParams();
  console.log(f_Id);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/employees/${f_Id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        message.error("Failed to load employee details");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [f_Id]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
  
    if (fileList.length > 0) {
      formData.append("f_Image", fileList[0].originFileObj);
    }
  
    try {
      await fetch(`http://localhost:5000/api/employees/${f_Id}`, {
        method: "PUT",
        body: formData,
      });
      message.success("Employee updated successfully");
      navigate("/employees");
    } catch (error) {
      message.error("Failed to update employee");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      {loading ? (
        <p>Loading...</p>
      ) : employee ? (
        <Form
          layout="vertical"
          initialValues={{
            f_Name: employee.f_Name || "",
            f_Email: employee.f_Email || "",
            f_Mobile: employee.f_Mobile || "",
            f_Designation: employee.f_Designation || "",
            f_gender: employee.f_gender || "",
            f_Course: employee.f_Course || "",
            f_Image: employee.f_Image || "",
          }}
          onFinish={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <Form.Item
            label="Full Name"
            name="f_Name"
            rules={[{ required: true, message: "Please input the full name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="f_Email"
            rules={[
              {
                required: true,
                message: "Please input a valid email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="f_Mobile"
            rules={[
              { required: true, message: "Please input the mobile number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Designation"
            name="f_Designation"
            rules={[
              { required: true, message: "Please input the designation!" },
            ]}
          >
            <Select placeholder="Select designation">
              <Option value="HR">HR</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Sales">Sales</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="f_gender"
            rules={[{ required: true, message: "Please input the gender!" }]}
          >
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Course"
            name="f_Course"
            rules={[{ required: true, message: "Please input the course!" }]}
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
            rules={[{ required: true, message: "Please upload an image!" }]}
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
            <Button type="primary" htmlType="submit">
              Update Employee
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>No employee data found.</p>
      )}
    </div>
  );
};

export default EditEmployee;
