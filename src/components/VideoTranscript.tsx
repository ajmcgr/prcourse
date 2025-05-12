
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface VideoTranscriptProps {
  transcript?: string | null;
}

const VideoTranscript: React.FC<VideoTranscriptProps> = ({ transcript }) => {
  // Change the initial state to true so the transcript is expanded by default
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Add console log for debugging
  console.log('VideoTranscript received transcript:', transcript);

  if (!transcript) {
    return (
      <div className="mt-8 md:mt-10 p-5 bg-gray-100 rounded-lg">
        <p className="text-gray-500 italic">Transcript not available for this video.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-10 mb-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">Transcript</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <span>Hide Transcript</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show Transcript</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="bg-gray-50 p-5 md:p-6 rounded-lg border border-gray-200 max-h-[450px] overflow-y-auto shadow-sm">
          <p className="whitespace-pre-wrap">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VideoTranscript;
