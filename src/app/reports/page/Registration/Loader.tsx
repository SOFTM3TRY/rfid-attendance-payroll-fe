import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const Loader = ({ submitted }: { submitted: boolean }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitted) {
      setShowLoader(true);
      timer = setTimeout(() => setShowLoader(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {showLoader && <Loader2 className="h-8 w-8 animate-spin" />}
    </div>
  );
};

