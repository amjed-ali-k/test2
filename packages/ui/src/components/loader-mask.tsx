import { Slot, type SlotProps } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils.js";

interface Props {
    isLoading?: boolean;
    children?: React.ReactNode;
  }
  
  const Loader = ({ className, ...props }: SlotProps) => {
    return (
      <Loader2
        className={cn(className, "animate-spin")}
      />
    );
  };
  
  export const WithLoaderIcon = ({ isLoading, ...props }: Props) => {
    const Comp = isLoading ? Loader : Slot;
  
    return <Comp {...props} />;
  };
  
  export const WithLoaderText = ({ isLoading, ...props }: Props) => {
    return isLoading ? (
      <Loader2 className="mr-2 size-4 animate-spin" />
    ) : (
      props.children
    );
  };
  