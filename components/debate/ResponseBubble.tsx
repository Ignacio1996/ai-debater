import { Response } from "@/lib/types";

export default function ResponseBubble({ response, side }: { response: Response; side: "for" | "against" }) {
  const bgColor = side === "for" ? "bg-emerald-50" : "bg-red-50";
  const borderColor = side === "for" ? "border-emerald-100" : "border-red-100";

  return (
    <div className={`${bgColor} p-4 rounded-lg border ${borderColor}`}>
      <p className="text-gray-800 whitespace-pre-wrap">{response.content}</p>
    </div>
  );
}