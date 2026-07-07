import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { HearingAidEditor } from "@/components/admin/HearingAidEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/catalogo/$id")({
  head: () => ({ meta: [{ title: "Editar audífono · Admin" }, { name: "robots", content: "noindex" }] }),
  component: EditPage,
});

function EditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm"><Link to="/admin/catalogo"><ArrowLeft className="size-4 mr-1" /> Volver</Link></Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <HearingAidEditor aidId={id} onBack={() => navigate({ to: "/admin/catalogo" })} onDeleted={() => navigate({ to: "/admin/catalogo" })} />
      </div>
    </div>
  );
}
