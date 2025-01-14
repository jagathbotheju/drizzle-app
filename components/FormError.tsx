import { AlertCircle } from "lucide-react";

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-destructive/70 text-secondary-foreground p-3 rounded-md">
      <AlertCircle className="w-10 h-10" />
      <p>{message}</p>
    </div>
  );
};
export default FormError;
