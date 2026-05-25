import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Select } from "../../../components/common/Select";
import { Button } from "../../../components/common/Button";

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
];

// code mẫu
const INITIAL_CODE: Record<string, string> = {
  javascript: `// Dữ liệu đầu vào: Danh sách sản phẩm trong giỏ hàng
const products = [
  { id: 1, name: "Bàn phím cơ", price: 100 },
  { id: 2, name: "Chuột Gaming", price: 50 }
];

function ápDụngKhuyếnMãi(products) {
  // Thực hiện: Sử dụng phương thức .map() để nhân đôi giá (price) của từng sản phẩm
  // Viết code của bạn ở đây:
  
}`,

  python: `# Dữ liệu đầu vào: Danh sách sản phẩm trong giỏ hàng
products = [
    {"id": 1, "name": "Bàn phím cơ", "price": 100},
    {"id": 2, "name": "Chuột Gaming", "price": 50}
]

def ap_dung_khuyen_mai(products):
    # Thực hiện: Sử dụng List Comprehension hoặc map() để nhân đôi giá (price)
    # Viết code của bạn ở đây:
    pass`,

  cpp: `#include <iostream>
#include <vector>
#include <string>

struct Product {
    int id;
    std::string name;
    int price;
};

// Dữ liệu đầu vào
std::vector<Product> products = {
    {1, "Bàn phím cơ", 100},
    {2, "Chuột Gaming", 50}
};

std::vector<Product> apDungKhuyenMai(std::vector<Product> products) {
    // Thực hiện: Duyệt qua vector và nhân đôi giá (price) của từng Product
    // Viết code của bạn ở đây:
    
}`,

  java: `import java.util.ArrayList;
import java.util.List;

class Product {
    int id;
    String name;
    int price;
    
    Product(int id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Solution {
    public List<Product> apDungKhuyenMai(List<Product> products) {
        // Thực hiện: Sử dụng Stream API (.map()) hoặc vòng lặp để nhân đôi giá (price)
        // Viết code của bạn ở đây:
        
        return products;
    }
}`
};

export const CodeEditor: React.FC = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(INITIAL_CODE["javascript"]);

  // đổi ngôn ngữ
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(INITIAL_CODE[selectedLang]);
  };

  // submit code
  const handleRunCode = () => {
    console.log(`Đang chạy code ${language}:`, code);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d111c]/60 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-[#090d16] border-b border-gray-800/80">
        <div className="flex items-center gap-3">
          <Select
            options={LANGUAGE_OPTIONS}
            value={language}
            onChange={handleLanguageChange}
            className="min-w-30 py-1! text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCode(INITIAL_CODE[language])}
          >
            Reset
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleRunCode}
            className="gap-1.5 font-semibold"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Run Code
          </Button>
        </div>
      </div>
      <div className="flex-1 h-full relative bg-[#0f1422]/40 pt-2">
        <div className="absolute inset-0 w-full h-full">
          <Editor
            height="100%" 
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
              minimap: { enabled: false },
              wordWrap: "on",
              automaticLayout: true,
              cursorBlinking: "smooth",
              lineNumbersMinChars: 3,
            }}
            loading={
              <div className="flex items-center justify-center h-full text-zinc-500 text-sm gap-2">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Đang kết nối...</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
