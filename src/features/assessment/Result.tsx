import { useLocation } from "react-router";
import { Header } from "./Header";
import { Award, Sparkles, Zap } from "lucide-react";
import { Button } from "../../components/common/Button";
import { useEffect, useState } from "react";
import { TopicHeader } from "./TopicHeader";
import { ICON_MAP } from "./Iconmap";

interface ResultProps {
  id: string;
  title: string;
  description: string;
  iconType: string;
}
export default function Result() {
  const location = useLocation();
  const data = location.state;
  const [topicData, setTopicData] = useState([
    {
      id: "loading-1",
      title: "Đang tải...",
      description: "Vui lòng chờ trong giây lát...",
      icon: "default",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("topics-api-mock.json");
        if (!res.ok) {
          throw new Error("Không thể kết nối với server");
        }
        const data = await res.json();

        const formattedData = data.data.map((item: ResultProps) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          icon: item.iconType,
        }));

        setTopicData(formattedData);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full mx-auto min-h-screen flex flex-col bg-[#050b17] px-4">
      <Header showProgressBar={false} showSave={false} />
      <main className="p-5 flex flex-col gap-11 m-auto items-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-fit h-fit p-5 bg-[#0b3026] rounded-2xl border border-(--accent-border) shadow-[0_0_25px_rgba(16,185,129,0.15)]">
            <Award className="text-(--accent) w-12 h-12"></Award>
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-2xl">
            Hoàn thành bài đánh giá!
          </h1>
          <p>
            CodeQuest AI đã phân tích kết quả làm bài của bạn và thiết lập một
            lộ trình học tập riêng cho bạn.
          </p>
        </div>
        <div className="flex gap-5">
          <div className="bg-(--card-bg) p-5 rounded-2xl gap-5 flex-col flex">
            <div>
              <span className="font-semibold text-(--text)">
                TRÌNH ĐỘ HIỆN TẠI
              </span>
              <div>
                <h1></h1>
                <div></div>
              </div>
              <p></p>
            </div>
            <div className="bg-[#050b18] flex gap-3 justify-center items-center p-3 rounded-2xl border border-(--border)">
              <div className="rounded-full w-11 h-11 flex justify-center items-center bg-(--accent-bg)">
                <Zap className="text-(--accent)"></Zap>
              </div>
              <div className="flex flex-col text-white text-[12px]">
                <span className="font-semibold">Phần thưởng</span>
                <span className="text-(--text-h)">
                  +{data.XP} XP nhận vào hồ sơ của bạn
                </span>
              </div>
            </div>
          </div>
          <div className="bg-(--card-bg) p-5 rounded-2xl">
            <span className="text-white font-semibold">Skill radar</span>
            <></>
          </div>
        </div>
        <div className="bg-(--card-bg) h-fit p-5">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <Sparkles className="text-violet-500"></Sparkles>
              <span className="text-white text-2xl font-bold">
                Roadmap đề xuất của CodeQuest AI
              </span>
            </div>
            <Button variant="secondary">Xem toàn bộ Lộ trình</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {topicData.map((item) => (
              <TopicHeader
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                icon={ICON_MAP[item.icon] || ICON_MAP["default"]}
              />
            ))}
          </div>
        </div>
        <Button size="lg" className="text-[#0a101f]">
          Go to Dashboard
        </Button>
      </main>
    </div>
  );
}
