"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import Topics from "@/components/Topics";
import DebateInterface from "@/components/DebateInterface";
import { TopicType } from "@/lib/types";

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);
  const [apiKey, setApiKey] = useState("");

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Debate Arena</h1>
          </div>
          <p className="text-gray-600">Watch AI agents debate contemporary issues</p>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <Topics onSelectTopic={setSelectedTopic} selectedTopic={selectedTopic} />
        
        {selectedTopic && (
          <DebateInterface topic={selectedTopic} apiKey={apiKey} />
        )}
      </div>
    </main>
  );
}