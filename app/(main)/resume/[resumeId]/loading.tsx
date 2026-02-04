import { Spinner } from "@/components/ui/spinner";

export default function ResumeLoading() {
  return (
    <div className="flex flex-col h-screen">
      <nav className="flex items-center justify-between px-4 py-2.5 border-b">
        <h1 className="text-xl font-bold">Coder CV</h1>
      </nav>
      <div className="flex items-center justify-center h-[calc(100vh-3.75rem)]">
        <div className="flex flex-col items-center gap-4">
          <Spinner variant="default" size={48} />
          <p className="text-muted-foreground">Loading resume...</p>
        </div>
      </div>
    </div>
  );
}
