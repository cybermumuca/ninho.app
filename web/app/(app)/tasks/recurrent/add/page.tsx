import { useRouter } from "next/navigation";
import z from "zod";

const addRecurrentTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(100, "Título deve ter no máximo 100 caracteres"),
  annotation: z.string().max(2000, "Anotações devem ter no máximo 2000 caracteres"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  dueDate: z.string().optional(),
  estimatedDuration: z.string().optional(),
  tagIds: z.array(z.string()),
})

export default function AddRecurrentTaskPage() {
  const router = useRouter();
}