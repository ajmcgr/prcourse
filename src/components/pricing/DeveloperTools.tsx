
import React from 'react';
import { Button } from '@/components/ui/button';

interface DeveloperToolsProps {
  handleForceSetPaid: () => Promise<void>;
  isBusinessUser: boolean;
  handleSpecialDebug: () => Promise<void>;
}

const DeveloperTools: React.FC<DeveloperToolsProps> = ({ 
  handleForceSetPaid, 
  isBusinessUser, 
  handleSpecialDebug 
}) => {
  return (
    <div className="mt-4 border-t pt-4">
      <p className="text-xs text-gray-500 mb-2">Development Tools</p>
      <div className="flex gap-2 flex-wrap">
        <Button 
          onClick={handleForceSetPaid} 
          variant="outline" 
          size="sm"
          className="text-xs"
        >
          Force Set Paid
        </Button>
        
        {isBusinessUser && (
          <Button 
            onClick={handleSpecialDebug} 
            variant="outline" 
            size="sm"
            className="text-xs bg-amber-100"
          >
            Fix Business User Access
          </Button>
        )}
      </div>
    </div>
  );
};

export default DeveloperTools;
