import SessionCheck from "@/components/Common/SessionCheck";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionCheck>
      {children}
    </SessionCheck>
  );
}