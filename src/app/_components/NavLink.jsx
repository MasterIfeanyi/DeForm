'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/icons/Icon";

export default function NavLink({ href, icon, children }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
        ${isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-muted text-muted-foreground"
        }
      `}
    >
      <Icon name={icon} className="w-4 h-4" />
      {children}
    </Link>
  );
}