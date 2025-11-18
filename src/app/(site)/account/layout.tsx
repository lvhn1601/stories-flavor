import SessionCheck from "@/components/Common/SessionCheck";

export default function AccountLayout({
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