import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";
// import type { ColumnType } from "antd/es/table";
import type { ColumnsType } from "antd/es/table";

interface User {
  id: number;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const [data, setData] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editing) {
        setData((prev) =>
          prev.map((item) =>
            item.id === editing.id ? { ...item, ...values } : item,
          ),
        );
      } else {
        setData((prev) => [...prev, { id: Date.now(), ...values }]);
      }
      setOpen(false);
      setEditing(null);
      form.resetFields();
    });
  };

  const handleEdit = (record: User) => {
    setEditing(record);
    setOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const columns: ColumnsType<User> = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 20 }}
      />

      <Modal
        open={open}
        title={editing ? "Edit User" : "Add User"}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
