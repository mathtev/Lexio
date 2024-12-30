import { Sidebar } from "./sidebar";

export const PageContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div className={`absolute inset-0 flex ${className}`}>
      <Sidebar className="h-full w-[300px]" />
      <div className="h-full w-full overflow-auto p-8">{children}</div>
    </div>
  );
};
