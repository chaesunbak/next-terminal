import { useQuery } from "@tanstack/react-query";

import type { ModelsResponse, Model } from "@/types/models";

async function fetchModels(): Promise<Model[]> {
  const response = await fetch("/api/models");
  if (!response.ok) {
    throw new Error("Failed to fetch models");
  }
  const data: ModelsResponse = await response.json();
  return data.models;
}

export function useModels() {
  const {
    data: models = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
  });

  return {
    models,
    isLoading,
    error,
  };
}
