interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  ringColor?: string;
  className?: string;
  onClick?: () => void;
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

export function Avatar({
  src,
  alt,
  size = "md",
  ringColor,
  className = "",
  onClick,
}: AvatarProps) {
  const ringStyle = ringColor
    ? { boxShadow: `0 0 0 3px ${ringColor}` }
    : undefined;

  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`${onClick ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2" : ""} rounded-full`}
      {...(onClick && { type: "button" as const })}
    >
      <img
        src={src}
        alt={alt}
        style={ringStyle}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    </Component>
  );
}
