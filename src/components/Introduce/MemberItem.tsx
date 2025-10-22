"use client";
import React from "react";
import Image from "next/image";

const MemberItem = ({
  member,
}: {
  member: any;
}) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center mb-4">
        <Image src={member.photo} alt={member.name} className="rounded-full aspect-square object-cover" width={250} height={250} />
      </div>

      <h3 className="w-full flex items-center justify-center font-medium text-dark ease-out duration-200 mb-1.5">
        {member.name}
      </h3>
    </div>
  );
};

export default MemberItem;
