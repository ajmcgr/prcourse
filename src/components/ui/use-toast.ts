
// Import from the hooks folder instead of trying to import from itself
import { useToast as useToastHook, toast } from "@/hooks/use-toast";

export const useToast = useToastHook;
export { toast };
