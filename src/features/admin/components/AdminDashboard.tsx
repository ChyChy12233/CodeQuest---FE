import React, { useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Space,
  Select,
  ConfigProvider,
  theme,
  Tag,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Edit, Trash2, CirclePlus } from "lucide-react";
import { Button } from "../../../components/common/Button";

interface ChallengeData {
  _id?: string;
  title: string;
  description: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  optimalPattern: string;
}

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<ChallengeData[]>([
    {
      _id: "6a2eb206dc19c28c1a63fc1e",
      title: "Two Sum",
      description: "Find two numbers that add up to a target sum.",
      topic: "Two Pointers",
      difficulty: "Easy",
      optimalPattern: "hash map lookup",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ChallengeData | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((formValues) => {
      if (editing && editing._id) {
        setData((prev) =>
          prev.map((item) =>
            item._id === editing._id ? { ...item, ...formValues } : item,
          ),
        );
        message.success("Cập nhật thử thách thành công!");
      } else {
        const newChallenge: ChallengeData = {
          _id: "mock_" + Date.now(),
          ...formValues,
        };
        setData((prev) => [...prev, newChallenge]);
        message.success("Thêm thử thách thành công!");
      }
      setOpen(false);
      setEditing(null);
      form.resetFields();
    });
  };

  const handleEdit = (record: ChallengeData) => {
    setEditing(record);
    setOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item._id !== id));
    message.success("Đã xóa thử thách thành công!");
  };

  const columns: ColumnsType<ChallengeData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "25%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "30%",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (text: string) => <Tag color="blue">{text ? text : "N/A"}</Tag>,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (text: string) => {
        let color = "green";
        if (text === "Medium") color = "orange";
        if (text === "Hard") color = "red";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Optimal Pattern",
      dataIndex: "optimalPattern",
      key: "optimalPattern",
      width: "20%",
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Edit
            size={16}
            className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors"
            onClick={() => handleEdit(record)}
          />
          <Trash2
            size={16}
            className="text-red-500 hover:text-red-400 cursor-pointer transition-colors"
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
          colorBgContainer: "#111827",
          colorBgElevated: "#1f2937",
        },
      }}
    >
      <div className="p-6 min-h-[calc(100vh-64px)] bg-[#050816]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold m-0">
            Quản lý ngân hàng câu hỏi
          </h2>
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center h-10 font-semibold text-black transition-all hover:opacity-90 bg-[#fadb14] px-4 rounded-md"
          >
            <CirclePlus size={18} className="mr-2" />
            Thêm câu hỏi mới
          </Button>
        </div>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 8 }}
          className="bg-[#111827] rounded-lg overflow-hidden shadow-2xl border border-zinc-800/50"
        />

        <Modal
          open={open}
          title={
            editing ? "Cập nhật dữ liệu câu hỏi" : "Tạo cấu trúc câu hỏi mới"
          }
          onCancel={() => {
            setOpen(false);
            setEditing(null);
            form.resetFields();
          }}
          onOk={handleSubmit}
          width={850}
          okText="Lưu dữ liệu"
          cancelText="Hủy"
          centered
        >
          <Form form={form} layout="vertical" className="mt-6">
            <Form.Item
              name="title"
              label="Tiêu đề bài toán"
              rules={[
                { required: true, message: "Vui lòng nhập tiêu đề bài toán" },
              ]}
            >
              <Input placeholder="Nhập tên bài tập cụ thể" />
            </Form.Item>

            <div className="flex gap-4">
              <Form.Item
                name="topic"
                label="Chủ đề thuật toán"
                rules={[{ required: true, message: "Vui lòng nhập chủ đề" }]}
                className="flex-1"
              >
                <Input placeholder="Ví dụ: Two Pointers, Array, Graph" />
              </Form.Item>

              <Form.Item
                name="difficulty"
                label="Mức độ phân loại"
                rules={[{ required: true, message: "Vui lòng chọn mức độ" }]}
                className="flex-1"
              >
                <Select placeholder="Chọn độ khó">
                  <Select.Option value="Easy">Easy</Select.Option>
                  <Select.Option value="Medium">Medium</Select.Option>
                  <Select.Option value="Hard">Hard</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="optimalPattern"
              label="Mô hình cấu trúc tối ưu"
              rules={[
                { required: true, message: "Vui lòng nhập mô hình giải thuật" },
              ]}
            >
              <Input placeholder="Ví dụ: hash map lookup, Kadane's Algorithm, Dijkstra" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Yêu cầu chi tiết nội dung đề bài"
              rules={[
                { required: true, message: "Vui lòng nhập nội dung mô tả" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Nhập phần giải thích ngữ cảnh bài toán cần thực thi giải thuật"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
