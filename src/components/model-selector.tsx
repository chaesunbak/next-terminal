"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModels } from "@/hooks/use-models";
import { useModelStore } from "@/store/model-store";
import { Skeleton } from "@/components/ui/skeleton";

export function ModelSelector() {
  const { models, isLoading } = useModels();
  const { selectedModel, setSelectedModel } = useModelStore();

  // 모델 목록이 로드되고 선택된 모델이 없을 때 첫 번째 모델을 선택
  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0].name);
    }
  }, [models, selectedModel, setSelectedModel]);

  if (isLoading) {
    return <Skeleton className="h-10 w-[200px]" />;
  }

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.name} value={model.name}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
