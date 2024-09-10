import { Sidebar } from "@/app/components/Sidebar";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar avatar="" />
      <div className="p-10 w-full">
        {children}
      </div>
    </div>
  );
}
