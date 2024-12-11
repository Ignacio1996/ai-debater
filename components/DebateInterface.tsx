"use client";

import { useState } from "react";
import { TopicType, Response } from "@/lib/types";
import { generateDebateResponse, OpenAIError } from "@/lib/api/openai";
import DebateControls from "./debate/DebateControls";
import DebateHeader from "./debate/DebateHeader";
import DebateRow from "./debate/DebateRow";

const MAX_RESPONSES = 20; // 10 per side

export default function DebateInterface({ 
  topic,
  apiKey 
}: { 
  topic: TopicType;
  apiKey: string;
}) {
  const [responses, setResponses] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextSide = responses.length % 2 === 0 ? "for" : "against";
  const canGenerateMore = responses.length < MAX_RESPONSES;

  const generateNextResponse = async () => {
    if (!canGenerateMore) return;
    
    const currentResponses = responses.map(r => r.content);
    
    try {
      setIsLoading(true);
      setError(null);
      
      const content = await generateDebateResponse(
        apiKey,
        topic.title,
        currentResponses,
        nextSide
      );

      const newResponse: Response = {
        id: responses.length + 1,
        content,
        side: nextSide
      };

      setResponses(prev => [...prev, newResponse]);
    } catch (error) {
      let errorMessage = "An error occurred while generating the response.";
      
      if (error instanceof OpenAIError) {
        errorMessage = error.data?.error?.message || error.message;
      }
      
      setError(errorMessage);
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startDebate = async () => {
    if (!apiKey) {
      setError("Please enter your OpenAI API key first");
      return;
    }
    
    if (apiKey.trim().length < 20) {
      setError("Please enter a valid OpenAI API key");
      return;
    }
    
    await generateNextResponse();
  };

  // Pair responses for row-based display
  const responseRows = responses.reduce<{ for?: Response; against?: Response }[]>((rows, response, index) => {
    const rowIndex = Math.floor(index / 2);
    if (!rows[rowIndex]) {
      rows[rowIndex] = {};
    }
    
    if (response.side === "for") {
      rows[rowIndex].for = response;
    } else {
      rows[rowIndex].against = response;
    }
    
    return rows;
  }, []);

  return (
    <div className="space-y-4">
      <DebateControls 
        isStarted={responses.length > 0}
        isLoading={isLoading}
        onStart={startDebate}
        onGenerateResponse={generateNextResponse}
        topic={topic.title}
        nextSide={nextSide}
        canGenerateMore={canGenerateMore}
      />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <DebateHeader
          forTitle="In Favor"
          againstTitle="Against"
          forTitleColor="text-emerald-800"
          againstTitleColor="text-red-800"
          forBgColor="bg-emerald-50"
          againstBgColor="bg-red-50"
        />
        
        {responseRows.map((row, index) => (
          <DebateRow
            key={index}
            forResponse={row.for}
            againstResponse={row.against}
          />
        ))}
      </div>
    </div>
  );
}