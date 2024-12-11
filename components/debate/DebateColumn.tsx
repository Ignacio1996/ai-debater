import { MessageCircle } from "lucide-react";
import { Response } from "@/lib/types";
import ResponseBubble from "./ResponseBubble";

type Props = {
  title: string;
  side: "for" | "against";
  responses: Response[];
  titleColor: string;
  bgColor: string;
};

export default function DebateColumn({ title, side, responses, titleColor, bgColor }: Props) {
  return (
    <div className="space-y-4">
      <div className={`${bgColor} p-4 rounded-lg`}>
        <h3 className={`font-semibold ${titleColor} flex items-center gap-2`}>
          <MessageCircle className="w-5 h-5" />
          {title}
        </h3>
      </div>
      {responses
        .filter(r => r.side === side)
        .map(response => (
          <ResponseBubble key={response.id} response={response} side={side} />
        ))}
    </div>
  );
}