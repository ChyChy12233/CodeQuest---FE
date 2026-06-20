import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Select,
  InputNumber,
  ConfigProvider,
  theme,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Edit, Trash2, CirclePlus } from "lucide-react";

interface Lesson {
  _id?: string;
  title: string;
  difficulty: "nhập môn" | "cơ bản" | "nâng cao" | "thử thách";
  xpReward: number;
  description: string;
  task: string;
  requirements: string;
  codeTemplate: string;
}

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<Lesson[]>([
    {
      _id: "6673bc123456789abcdef001",
      title: "Phương thức .map()",
      difficulty: "cơ bản",
      xpReward: 200,
      description: "Phương thức map() giúp bạn duyệt qua từng phần tử...",
      task: "Giả sử bạn đang làm tính năng Giỏ hàng. Hãy dùng .map()...",
      requirements:
        "Sử dụng phương thức products.map()\nTrả về một object mới giá x2\nLưu kết quả vào biến saleProducts",
      codeTemplate:
        "function apDungKhuyenMai(products) {\n  // Viết code ở đây\n}",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lesson | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editing) {
        setData((prev) =>
          prev.map((item) =>
            item._id === editing._id ? { ...item, ...values } : item,
          ),
        );
      } else {
        setData((prev) => [...prev, { _id: "mock_" + Date.now(), ...values }]);
      }
      setOpen(false);
      setEditing(null);
      form.resetFields();
    });
  };

  const handleEdit = (record: Lesson) => {
    setEditing(record);
    setOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item._id !== id));
  };

  const columns: ColumnsType<Lesson> = [
    {
      title: "Tiêu đề bài học",
      dataIndex: "title",
      key: "title",
      width: "25%",
    },
    {
      title: "Độ khó",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (text: string) => {
        let color = "blue";
        if (text === "cơ bản") color = "green";
        if (text === "nâng cao") color = "orange";
        if (text === "thử thách") color = "red";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "XP",
      dataIndex: "xpReward",
      key: "xpReward",
      render: (val) => (
        <span style={{ color: "#fadb14", fontWeight: "bold" }}>{val} XP</span>
      ),
    },
    {
      title: "Mô tả hàm",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "30%",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            style={{ color: "#1677ff" }}
            icon={<Edit size={16} />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record._id!)}
          />
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#fadb14",
          colorBgContainer: "#1e1e1e",
          colorBgElevated: "#2d2d2d",
        },
      }}
    >
      <div
        style={{
          padding: "24px",
          minHeight: "calc(100vh - 64px)",
          background: "#0f0f0f",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#fff", margin: 0 }}>Quản lý bài học</h2>
          <Button
            type="primary"
            icon={<CirclePlus size={18} />}
            onClick={() => setOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              height: 40,
              fontWeight: 600,
              color: "#000",
            }}
          >
            Thêm bài học mới
          </Button>
        </div>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 8 }}
          style={{
            background: "#1e1e1e",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />

        <Modal
          open={open}
          title={editing ? "Cập nhật bài học" : "Tạo bài học mới"}
          onCancel={() => {
            setOpen(false);
            setEditing(null);
            form.resetFields();
          }}
          onOk={handleSubmit}
          width={800}
          okText="Lưu bài học"
          cancelText="Hủy"
          centered
        >
          <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
            <Form.Item
              name="title"
              label="Tiêu đề bài học"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input placeholder="Ví dụ: Phương thức .map()" />
            </Form.Item>

            <div style={{ display: "flex", gap: 16 }}>
              <Form.Item
                name="difficulty"
                label="Độ khó"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <Select placeholder="Chọn độ khó">
                  <Select.Option value="nhập môn">Nhập môn</Select.Option>
                  <Select.Option value="cơ bản">Cơ bản</Select.Option>
                  <Select.Option value="nâng cao">Nâng cao</Select.Option>
                  <Select.Option value="thử thách">Thử thách</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="xpReward"
                label="Kinh nghiệm (XP)"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="200"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label="Mô tả lý thuyết"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={2}
                placeholder="Giải thích ngắn gọn cách hàm hoạt động..."
              />
            </Form.Item>

            <Form.Item
              name="task"
              label="Đề bài nhiệm vụ"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Mô tả ngữ cảnh bài toán..."
              />
            </Form.Item>

            <Form.Item
              name="requirements"
              label="Yêu cầu (mỗi dòng 1 ý)"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Yêu cầu 1&#10;Yêu cầu 2..."
              />
            </Form.Item>

            <Form.Item
              name="codeTemplate"
              label="Code gợi ý ban đầu"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={6}
                style={{
                  fontFamily: "Fira Code, monospace",
                  fontSize: "13px",
                  background: "#111",
                }}
                placeholder="function main() { ... }"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
