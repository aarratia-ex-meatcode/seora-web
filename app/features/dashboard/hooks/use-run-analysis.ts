import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { runAeoAnalysis } from "~/features/dashboard/api/analysis"

export function useRunAnalysis() {
    return useMutation({
        mutationFn: runAeoAnalysis,
        onSuccess: () => {
            toast.success("Análisis ejecutado correctamente")
        },
        onError: (error: any) => {
            toast.error(error.message || "Error al ejecutar el análisis")
        },
    })
}
