import { MessageCircle } from "lucide-react";

type Props = {
  forTitle: string;
  againstTitle: string;
  forTitleColor: string;
  againstTitleColor: string;
  forBgColor: string;
  againstBgColor: string;
};

export default function DebateHeader({
  forTitle,
  againstTitle,
  forTitleColor,
  againstTitleColor,
  forBgColor,
  againstBgColor,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={`${forBgColor} p-4 rounded-lg`}>
        <h3 className={`font-semibold ${forTitleColor} flex items-center gap-2`}>
          <MessageCircle className="w-5 h-5" />
          {forTitle}
        </h3>
      </div>
      <div className={`${againstBgColor} p-4 rounded-lg`}>
        <h3 className={`font-semibold ${againstTitleColor} flex items-center gap-2`}>
          <MessageCircle className="w-5 h-5" />
          {againstTitle}
        </h3>
      </div>
    </div>
  );
}