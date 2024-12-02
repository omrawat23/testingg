'use client';

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="text-xs flex items-center -ml-1"
    >
      <ChevronLeftIcon width={13} height={13} />
      back
    </button>
  );
}

