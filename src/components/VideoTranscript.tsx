
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface VideoTranscriptProps {
  transcript?: string | null;
}

const VideoTranscript: React.FC<VideoTranscriptProps> = ({ transcript }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Add console log for debugging
  console.log('VideoTranscript received transcript:', transcript);

  if (!transcript) {
    return (
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500 italic">Transcript not available for this video.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
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
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[400px] overflow-y-auto">
          <p className="whitespace-pre-wrap">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VideoTranscript;
