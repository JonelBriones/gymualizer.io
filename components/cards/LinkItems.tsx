import Link from "next/link";
import React from "react";

const LinkItems = ({ href, title, description, children }: any) => {
  return (
    <Link href={href} className="hover:bg-neutral-100 rounded-lg p-3">
      <h4>{title}</h4>
      <p>{description || children}</p>
    </Link>
  );
};

export default LinkItems;
