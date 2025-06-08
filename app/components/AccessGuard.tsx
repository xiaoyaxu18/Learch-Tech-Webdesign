"use client"
import { useState, useEffect } from "react";
import AccessCodeModal from "@/app/components/AccessCodeModal";
import { useSession } from "next-auth/react";

export default function AccessGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const accessKey = user?.email ? `accessCodeVerified:${user.email}` : null;

  const [verified, setVerified] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!accessKey) return;
    const ok = localStorage.getItem(accessKey);
    if (ok === "true") {
      setVerified(true);
    } else {
      setModalOpen(true);
    }
  }, [accessKey]);

  const handleVerify = (code: string) => {
    if (!accessKey) return;
    localStorage.setItem(accessKey, "true");
    setVerified(true);
  };

  if (!verified) {
    return (
      <div className="min-h-screen bg-[#1C1D24] text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Course Access Required</h1>
          <p className="text-gray-400 mb-8">
            Please enter your access code to view this course content.
          </p>
        </div>
        <AccessCodeModal
          isOpen={modalOpen}
          onClose={() => {}}
          onVerify={handleVerify}
        />
      </div>
    );
  }

  return <>{children}</>;
}
