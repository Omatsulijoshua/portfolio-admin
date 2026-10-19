import React from "react";
import * as Lucide from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className, size = 24 }) => {
  // Dynamically resolve the icon component
  const IconComponent = (Lucide as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name];

  if (!IconComponent) {
    // Fallback to a default folder icon if not found
    return <Lucide.Folder className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
};

export default LucideIcon;
