"use client";

import { TopicType } from "@/lib/types";
import { DEBATE_TOPICS } from "@/lib/constants/topics";

export default function Topics({ 
  onSelectTopic, 
  selectedTopic 
}: { 
  onSelectTopic: (topic: TopicType) => void;
  selectedTopic: TopicType | null;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {DEBATE_TOPICS.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onSelectTopic(topic)}
          className={`p-4 rounded-lg text-left transition-all ${
            selectedTopic?.id === topic.id
              ? "bg-blue-50 border-2 border-blue-500"
              : "bg-white border border-gray-200 hover:border-blue-300"
          }`}
        >
          <h3 className="font-semibold text-gray-900">{topic.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
        </button>
      ))}
    </div>
  );
}