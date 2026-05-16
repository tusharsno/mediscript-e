"use client";

import Image from "next/image";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  size?: number;
  className?: string;
  gradient?: string;
}

export default function UserAvatar({
  name,
  image,
  size = 32,
  className = "",
  gradient = "from-blue-500 to-blue-700",
}: UserAvatarProps) {
  const initial = name?.charAt(0).toUpperCase() ?? "U";
  const fontSize = size <= 28 ? "text-xs" : size <= 36 ? "text-sm" : "text-base";

  if (image) {
    return (
      <Image
        src={image}
        alt={name ?? "User"}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-black flex-shrink-0 ${fontSize} ${className}`}
      style={{ width: size, height: size }}
    >
      {initial}
    </div>
  );
}
