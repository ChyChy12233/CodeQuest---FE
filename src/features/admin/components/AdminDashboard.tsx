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
  Tabs,
  Upload,
  Badge,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RcFile } from "antd/es/upload";
import {
  Edit,
  Trash2,
  CirclePlus,
  FlaskConical,
  UploadCloud,
  CodeXml,
  CircleCheckBig,
} from "lucide-react";
import { Button } from "../../../components/common/Button";

interface ChallengeData {
  _id?: string | { $oid: string };
  categoryId: string;
  challengeType: "coding" | "multiple_choice";
  title: string;
  slug?: string;
  difficult: "easy" | "medium" | "hard";
  description: string;
  testcasePath: string;
  isActive: boolean;
  testcases: TestCase[];
}

interface TestCase {
  id: string;
  type: "sample" | "edge_case" | "random" | "stress_test";
  input: string;
  expected_output: string;
}

interface JsonTestCaseStructure {
  type?: "sample" | "edge_case" | "random" | "stress_test";
  input?: string;
  expected_output?: string;
}

interface JsonFileStructure {
  problem_name?: string;
  type?: string;
  module?: number;
  test_cases?: JsonTestCaseStructure[];
}

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<ChallengeData[]>([
    {
      _id: "6a2eb206dc19c28c1a63fc1e",
      title: "ARR01 - Tìm số lớn nhất và nhỏ nhất trong mảng",
      description:
        "Hãy viết chương trình tìm số lớn nhất và nhỏ nhất trong mảng gồm N phần tử.",
      categoryId: "65f123456789abcdef012345",
      challengeType: "coding",
      difficult: "easy",
      testcasePath:
        "challenge/arr01_-_tim_so_lon_nhat_va_nho_nhat_trong_mang.json",
      isActive: true,
      testcases: [],
    },
    {
      _id: "6a2eb206dc19c28c1a63fc1f",
      title: "Longest Substring Without Repeating Characters",
      description:
        "Find the length of the longest substring without repeating characters.",
      categoryId: "65f123456789abcdef012346",
      challengeType: "coding",
      difficult: "medium",
      testcasePath: "challenge/longest_substring.json",
      isActive: true,
      testcases: [],
    },
  ]);

  const [open, setOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<ChallengeData | null>(null);
  const [form] = Form.useForm();
  const [isTestCaseModalOpen, setIsTestCaseModalOpen] =
    useState<boolean>(false);
  const [currentChallenge, setCurrentChallenge] =
    useState<ChallengeData | null>(null);
  const [isSubFormOpen, setIsSubFormOpen] = useState<boolean>(false);
  const [editingTestCase, setEditingTestCase] = useState<TestCase | null>(null);
  const [subForm] = Form.useForm();

  const handleSubmit = (): void => {
    form.validateFields().then((formValues) => {
      if (editing && editing._id) {
        setData((prev) =>
          prev.map((item) =>
            item._id === editing._id ? { ...item, ...formValues } : item,
          ),
        );
        message.success("Cập nhật challenge thành công!");
      } else {
        const newChallenge: ChallengeData = {
          _id: "mock_" + Date.now(),
          isActive: true,
          testcases: [],
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

  const handleEdit = (record: ChallengeData): void => {
    setEditing(record);
    setOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: string): void => {
    setData((prev) => prev.filter((item) => item._id !== id));
    message.success("Đã xóa thử thách thành công!");
  };

  const handleOpenTestCases = (record: ChallengeData): void => {
    setCurrentChallenge(record);
    setIsTestCaseModalOpen(true);
  };

  const handleOpenSubForm = (testcase?: TestCase): void => {
    if (testcase) {
      setEditingTestCase(testcase);
      subForm.setFieldsValue(testcase);
    } else {
      setEditingTestCase(null);
      subForm.resetFields();
    }
    setIsSubFormOpen(true);
  };

  const handleSubFormSubmit = (): void => {
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

  const handleDeleteTestCase = (testCaseId: string): void => {
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

  const handleImportJsonFiles = (fileList: RcFile[]): void => {
    if (!currentChallenge) return;
    let newImportedTestCases: TestCase[] = [];
    let completedFiles = 0;
    let successFilesCount = 0;

    fileList.forEach((file: RcFile) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        let isFileValid = false; // Biến cờ kiểm tra trạng thái đọc của file này

        try {
          const resultString = e.target?.result as string;
          const json = JSON.parse(resultString) as JsonFileStructure;

          if (json && Array.isArray(json.test_cases)) {
            const parsedCases: TestCase[] = json.test_cases.map(
              (tc: JsonTestCaseStructure) => ({
                id: `tc_json_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                type: tc.type || "random",
                input: tc.input || "",
                expected_output: tc.expected_output || "",
              }),
            );
            newImportedTestCases = [...newImportedTestCases, ...parsedCases];
            successFilesCount++;
            isFileValid = true; 
            message.success(`Đọc thành công dữ liệu từ file: ${file.name}`);
          } else {
            message.error(
              `File ${file.name} sai cấu trúc (thiếu mảng test_cases).`,
            );
          }
        } catch (catchError: unknown) {
          const errorMessage =
            catchError instanceof Error
              ? catchError.message
              : "Định dạng JSON không hợp lệ";
          message.error(
            `File ${file.name} lỗi định dạng hoặc không phải JSON chuẩn. Chi tiết: ${errorMessage}`,
          );
        } finally {
          completedFiles++;

          if (completedFiles === fileList.length) {
            if (newImportedTestCases.length > 0) {
              const finalTestCases = [
                ...(currentChallenge.testcases || []),
                ...newImportedTestCases,
              ];

              let newPath = currentChallenge.testcasePath;
              if (!newPath) {
                newPath = `challenge/${fileList[0].name.toLowerCase()}`;
              }

              setData((prevData) =>
                prevData.map((item) => {
                  if (item._id === currentChallenge._id) {
                    return {
                      ...item,
                      testcases: finalTestCases,
                      testcasePath: newPath,
                    };
                  }
                  return item;
                }),
              );

              setCurrentChallenge({
                ...currentChallenge,
                testcases: finalTestCases,
                testcasePath: newPath,
              });

              message.open({
                type: "success",
                content: `Đã nạp thành công ${newImportedTestCases.length} testcase từ ${successFilesCount}/${fileList.length} file JSON.`,
                duration: 4,
              });
            } else if (!isFileValid && completedFiles === fileList.length) {
              message.warning("Không có testcase nào hợp lệ để thêm vào.");
            }
          }
        }
      };

      reader.onerror = () => {
        message.error(`Không thể đọc file ${file.name} từ bộ nhớ thiết bị.`);
        completedFiles++;
      };

      reader.readAsText(file);
    });
  };

  const columns: ColumnsType<ChallengeData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "25%",
      render: (text: string, record: ChallengeData) => {
        const parts = text.split(/\s*-\s(.*)/);
        const filteredTitle = parts.length > 1 ? parts[1] : text;

        return (
          <div className="flex items-center gap-2">
            {record.challengeType === "coding" ? (
              <CodeXml size={16} className="text-blue-400 shrink-0" />
            ) : (
              <CircleCheckBig size={16} className="text-emerald-400 shrink-0" />
            )}
            <span className="font-medium text-slate-200">{filteredTitle}</span>
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "20%",
    },
    {
      title: "Category ID",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Difficulty",
      dataIndex: "difficult",
      key: "difficult",
      render: (text: string) => {
        let color = "green";
        let label = "Dễ";
        if (text && text.toLowerCase() === "medium") {
          color = "orange";
          label = "Thường";
        }
        if (text && text.toLowerCase() === "hard") {
          color = "red";
          label = "Khó";
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "Testcase Path",
      dataIndex: "testcasePath",
      key: "testcasePath",
      width: "20%",
      ellipsis: true,
      render: (text: string) => (
        <code className="text-xs text-slate-400">{text || "N/A"}</code>
      ),
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Badge
            count={record.testcases?.length || 0}
            showZero={false}
            overflowCount={99}
            offset={[4, 12]}
            style={{
              color: "#ffffff",
              fontSize: "9px",
              height: "12px",
              minWidth: "12px",
              lineHeight: "12px",
              padding: 0,
            }}
          >
            <FlaskConical
              size={16}
              className="text-orange-500 hover:text-orange-400 cursor-pointer transition-colors"
              onClick={() => handleOpenTestCases(record)}
            />
          </Badge>
          <Edit
            size={16}
            className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors"
            onClick={() => handleEdit(record)}
          />
          <Trash2
            size={16}
            className="text-red-500 hover:text-red-400 cursor-pointer transition-colors"
            onClick={() => {
              const idString =
                typeof record._id === "object" &&
                record._id !== null &&
                "$oid" in record._id
                  ? record._id.$oid
                  : (record._id as string);
              handleDelete(idString);
            }}
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
          rowKey={(record) => {
            if (typeof record._id === "object" && record._id !== null) {
              return record._id.$oid;
            }
            return record._id || "key_" + Math.random();
          }}
          pagination={{ pageSize: 8 }}
          className="bg-[#111827] rounded-lg overflow-hidden shadow-2xl border border-zinc-800/50 mt-4"
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
            <div className="flex gap-4">
              <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[
                  { required: true, message: "Tiêu đề không được để trống" },
                ]}
                className="flex-2"
              >
                <Input placeholder="Nhập tên bài tập cụ thể" />
              </Form.Item>

              <Form.Item
                name="challengeType"
                label="Loại hình thử thách"
                initialValue="coding"
                rules={[{ required: true, message: "Vui lòng chọn loại hình" }]}
                className="flex-1"
              >
                <Select placeholder="Chọn loại hình">
                  <Select.Option value="coding">Coding</Select.Option>
                  <Select.Option value="multiple_choice">
                    Trắc nghiệm (Multiple Choice)
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex gap-4">
              <Form.Item
                name="categoryId"
                label="ID danh mục"
                rules={[
                  {
                    required: true,
                    message: "ID danh mục không được để trống",
                  },
                ]}
                className="flex-1"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="difficult"
                label="Độ khó"
                rules={[{ required: true, message: "Vui lòng chọn độ khó" }]}
                className="flex-1"
              >
                <Select placeholder="Chọn độ khó">
                  <Select.Option value="easy">Dễ</Select.Option>
                  <Select.Option value="medium">Thường</Select.Option>
                  <Select.Option value="hard">Khó</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="testcasePath"
              label="Đường dẫn lưu trữ file Testcase"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đường dẫn file testcase",
                },
              ]}
            >
              <Input placeholder="Ví dụ: challenge/arr01_-_tim_so_lon_nhat_va_nho_nhat_trong_mang.json" />
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
          <Tabs
            defaultActiveKey="1"
            className="mt-2"
            items={[
              {
                key: "1",
                label: "Dữ liệu cấu hình thủ công",
                children: (
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
                          title: "Expected output",
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
                          title: "Action",
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
                ),
              },
              {
                key: "2",
                label: "Nhập dữ liệu từ file JSON",
                children: (
                  <div className="mt-4 py-4">
                    <div className="mb-6">
                      <h3 className="text-white text-base font-medium mb-1">
                        Tải lên testcase
                      </h3>
                    </div>

                    <Upload.Dragger
                      multiple={true}
                      accept=".json"
                      showUploadList={false}
                      beforeUpload={(
                        file: RcFile,
                        fileList: RcFile[],
                      ): boolean => {
                        if (file === fileList[0]) {
                          handleImportJsonFiles(fileList);
                        }
                        return false;
                      }}
                      className="border-dashed border-2 border-zinc-700 bg-zinc-900/30 rounded-2xl hover:border-blue-500 transition-colors py-8"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-4 bg-zinc-800/80 rounded-full text-blue-500">
                          <UploadCloud size={32} />
                        </div>
                        <p className="ant-upload-text text-slate-200 font-medium">
                          Nhấp hoặc kéo thả file JSON vào đây để tải lên
                        </p>
                        <p className="ant-upload-hint text-slate-500 text-xs">
                          Chỉ chấp nhận định dạng file .json chứa mảng
                          test_cases (Ví dụ: DP01.json)
                        </p>
                      </div>
                    </Upload.Dragger>
                  </div>
                ),
              },
            ]}
          />
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
