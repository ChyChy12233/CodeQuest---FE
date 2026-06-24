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
import { Edit, Trash2, CirclePlus, FlaskConical } from "lucide-react";
import { Button } from "../../../components/common/Button";

interface ChallengeData {
  _id?: string;
  title: string; // chọn title bên mongo hoặc problem_name bên json_file
  description: string; // có bên mongo hoặc không bên json_file
  module?: number; // không bên mongo hoặc có bên json_file
  topic: string; // chọn topic bên mongo hoặc type bên json_file
  difficulty: "Easy" | "Medium" | "Hard"; // có bên mongo hoặc không bên json_file
  optimalPattern: string; // có bên mongo hoặc không bên json_file
  testcases: TestCase[];
}

interface TestCase {
  id: string;
  type: "sample" | "edge_case" | "random" | "stress_test";
  input: string;
  expected_output: string;
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
      testcases: [],
    },
    {
      _id: "6a2eb206dc19c28c1a63fc1f",
      title: "Longest Substring Without Repeating Characters",
      description:
        "Find the length of the longest substring without repeating characters.",
      topic: "Sliding Window",
      difficulty: "Medium",
      optimalPattern: "sliding window",
      testcases: [],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ChallengeData | null>(null);
  const [form] = Form.useForm();
  const [isTestCaseModalOpen, setIsTestCaseModalOpen] = useState(false);
  const [currentChallenge, setCurrentChallenge] =
    useState<ChallengeData | null>(null);
  const [isSubFormOpen, setIsSubFormOpen] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState<TestCase | null>(null);
  const [subForm] = Form.useForm();

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

  // 1. Mở modal testcase của câu hỏi được chọn
  const handleOpenTestCases = (record: ChallengeData) => {
    setCurrentChallenge(record);
    setIsTestCaseModalOpen(true);
  };

  // 2. Mở form nhỏ để thêm mới hoặc sửa 1 testcase cụ thể
  const handleOpenSubForm = (testcase?: TestCase) => {
    if (testcase) {
      setEditingTestCase(testcase);
      subForm.setFieldsValue(testcase);
    } else {
      setEditingTestCase(null);
      subForm.resetFields();
    }
    setIsSubFormOpen(true);
  };

  const handleSubFormSubmit = () => {
    subForm.validateFields().then((formValues) => {
      if (!currentChallenge) return;
      let updatedTestCases = [...(currentChallenge.testcases || [])];
      if (editingTestCase) {
        updatedTestCases = updatedTestCases.map((tc) =>
          tc.id === editingTestCase.id ? { ...tc, ...formValues } : tc,
        );
        message.success("Cập nhật testcase thành công!");
      } else {
        const newTestCase: TestCase = {
          id: "tc_" + Date.now(),
          ...formValues,
        };
        updatedTestCases.push(newTestCase);
        message.success("Thêm testcase thành công!");
      }
      const updatedData = data.map((item) =>
        item._id === currentChallenge._id
          ? { ...item, testcases: updatedTestCases }
          : item,
      );
      setData(updatedData);
      setCurrentChallenge({ ...currentChallenge, testcases: updatedTestCases });
      setIsSubFormOpen(false);
      subForm.resetFields();
    });
  };

  const handleDeleteTestCase = (testCaseId: string) => {
    if (!currentChallenge) return;
    const updatedTestCases = (currentChallenge.testcases || []).filter(
      (tc) => tc.id !== testCaseId,
    );
    const updatedData = data.map((item) =>
      item._id === currentChallenge._id
        ? { ...item, testcases: updatedTestCases }
        : item,
    );
    setData(updatedData);
    setCurrentChallenge({ ...currentChallenge, testcases: updatedTestCases });
    message.success("Đã xóa testcase!");
  };

  const columns: ColumnsType<ChallengeData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "25%",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
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
          <FlaskConical
            size={16}
            className="text-orange-500 hover:text-orange-400 cursor-pointer transition-colors"
            onClick={() => handleOpenTestCases(record)}
          />
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
          colorPrimary: "#3b82f6",
          colorBgContainer: "#111827",
          colorBgElevated: "#1f2937",
        },
      }}
    >
      <div className="p-6 min-h-[calc(100vh-64px)] bg-[#050816]">
        <Button
          onClick={() => setOpen(true)}
          className=" flex items-center gap-2 px-5 py-3 mx-1 rounded-xl bg-linear-to-r from-[#2563eb] border-none ring-0 outline-none focus:ring-0 focus:outline-none   to-[#3b82f6] text-white"
        >
          <CirclePlus size={18} />
          Thêm câu hỏi mới
        </Button>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 8 }}
          className="bg-[#111827] rounded-lg overflow-hidden shadow-2xl border border-zinc-800/50"
        />

        <Modal
          open={open}
          title={editing ? "Cập nhật câu hỏi" : "Tạo câu hỏi mới"}
          onCancel={() => {
            setOpen(false);
            setEditing(null);
            form.resetFields();
          }}
          onOk={handleSubmit}
          width={850}
          okText="Lưu"
          cancelText="Hủy"
          centered
        >
          <Form form={form} layout="vertical" className="mt-6">
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[
                { required: true, message: "Tiêu đề không được để trống" },
              ]}
            >
              <Input />
            </Form.Item>

            <div className="flex gap-4">
              <Form.Item
                name="topic"
                label="Chủ đề"
                rules={[
                  { required: true, message: "Chủ đề không được để trống" },
                ]}
                className="flex-1"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="difficulty"
                label="Độ khó"
                rules={[{ required: true, message: "Vui lòng chọn độ khó" }]}
                className="flex-1"
              >
                <Select placeholder="Chọn độ khó">
                  <Select.Option value="Easy">Dễ</Select.Option>
                  <Select.Option value="Medium">Thường</Select.Option>
                  <Select.Option value="Hard">Khó</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="optimalPattern"
              label="Cấu trúc tối ưu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô hình tối ưu bạn muốn hướng tới",
                },
              ]}
            >
              <Input placeholder="VD: hash map lookup, Kadane's Algorithm, Dijkstra" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Nội dung chi tiết"
              rules={[
                { required: true, message: "Nội dung không được để trống" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          open={isTestCaseModalOpen}
          title={`Danh sách Testcase: ${currentChallenge?.title || ""}`}
          onCancel={() => {
            setIsTestCaseModalOpen(false);
            setCurrentChallenge(null);
          }}
          footer={null}
          width={900}
          centered
        >
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={() => handleOpenSubForm()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white border-none"
              >
                <CirclePlus size={16} />
                Thêm Testcase
              </Button>
            </div>

            <Table
              dataSource={currentChallenge?.testcases || []}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              columns={[
                {
                  title: "Loại",
                  dataIndex: "type",
                  key: "type",
                  width: "15%",
                  render: (type: string) => {
                    const colors: Record<string, string> = {
                      sample: "blue",
                      edge_case: "purple",
                      random: "cyan",
                      stress_test: "volcano",
                    };
                    return (
                      <Tag color={colors[type] || "default"}>
                        {type.toUpperCase()}
                      </Tag>
                    );
                  },
                },
                {
                  title: "Input",
                  dataIndex: "input",
                  key: "input",
                  ellipsis: true,
                  render: (text: string) => (
                    <code className="bg-zinc-800 px-2 py-1 rounded text-xs">
                      {text}
                    </code>
                  ),
                },
                {
                  title: "Kết quả (Expected Output)",
                  dataIndex: "expected_output",
                  key: "expected_output",
                  ellipsis: true,
                  render: (text: string) => (
                    <code className="bg-zinc-800 px-2 py-1 rounded text-xs">
                      {text}
                    </code>
                  ),
                },
                {
                  title: "Hành động",
                  key: "action",
                  align: "center",
                  width: "15%",
                  render: (_, record: TestCase) => (
                    <Space size="middle">
                      <Edit
                        size={14}
                        className="text-blue-500 hover:text-blue-400 cursor-pointer"
                        onClick={() => handleOpenSubForm(record)}
                      />
                      <Trash2
                        size={14}
                        className="text-red-500 hover:text-red-400 cursor-pointer"
                        onClick={() => handleDeleteTestCase(record.id)}
                      />
                    </Space>
                  ),
                },
              ]}
            />
          </div>
        </Modal>
        <Modal
          open={isSubFormOpen}
          title={editingTestCase ? "Cập nhật Testcase" : "Tạo Testcase mới"}
          onCancel={() => setIsSubFormOpen(false)}
          onOk={handleSubFormSubmit}
          okText="Lưu Testcase"
          cancelText="Hủy"
          width={600}
          centered
        >
          <Form form={subForm} layout="vertical" className="mt-4">
            <Form.Item
              name="type"
              label="Phân loại Testcase"
              rules={[
                { required: true, message: "Vui lòng chọn loại testcase" },
              ]}
            >
              <Select placeholder="Chọn loại dữ liệu mẫu">
                <Select.Option value="sample">Sample</Select.Option>
                <Select.Option value="edge_case">Edge case</Select.Option>
                <Select.Option value="random">Random</Select.Option>
                <Select.Option value="stress_test">Stress test</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="input"
              label="Dữ liệu đầu vào"
              rules={[
                { required: true, message: "Dữ liệu input không được trống" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Ví dụ: 5\n1 5 3 9 2"
                style={{ fontFamily: "monospace" }}
              />
            </Form.Item>

            <Form.Item
              name="expected_output"
              label="Expected output"
              rules={[
                { required: true, message: "Dữ liệu output không được trống" },
              ]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Ví dụ: 1 9"
                style={{ fontFamily: "monospace" }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
