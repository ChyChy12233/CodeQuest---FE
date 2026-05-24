import { Code2, Layers, Network, Share2 } from "lucide-react";

export const ICON_MAP: Record<string, React.ReactNode> = {
  recursion: <Network className="w-7 h-7" />,
  graph: <Share2 className="w-7 h-7" />,
  dynamic: <Layers className="w-7 h-7" />,
  default: <Code2 className="w-7 h-7" />,
};
