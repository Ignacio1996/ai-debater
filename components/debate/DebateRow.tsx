import { Response } from "@/lib/types";
import ResponseBubble from "./ResponseBubble";

type Props = {
  forResponse?: Response;
  againstResponse?: Response;
};

export default function DebateRow({ forResponse, againstResponse }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        {forResponse && <ResponseBubble response={forResponse} side="for" />}
      </div>
      <div>
        {againstResponse && <ResponseBubble response={againstResponse} side="against" />}
      </div>
    </div>
  );
}