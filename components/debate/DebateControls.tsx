import { ArrowRight } from "lucide-react";

type Props = {
  isStarted: boolean;
  isLoading: boolean;
  onStart: () => void;
  onGenerateResponse: () => void;
  topic: string;
  nextSide: "for" | "against";
  canGenerateMore: boolean;
};

export default function DebateControls({ 
  isStarted, 
  isLoading, 
  onStart, 
  onGenerateResponse,
  topic,
  nextSide,
  canGenerateMore
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-900">
        Debate: {topic}
      </h2>
      <div className="flex gap-4">
        {!isStarted ? (
          <button
            onClick={onStart}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Starting Debate..." : "Start Debate"}
          </button>
        ) : canGenerateMore && (
          <button
            onClick={onGenerateResponse}
            disabled={isLoading}
            className={`px-4 py-2 flex items-center gap-2 text-white rounded-md disabled:opacity-50 ${
              nextSide === "for" 
                ? "bg-emerald-600 hover:bg-emerald-700" 
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? (
              "Generating..."
            ) : (
              <>
                Generate {nextSide === "for" ? "Supporting" : "Opposing"} Response
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}