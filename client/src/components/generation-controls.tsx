import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Sliders, 
  Dice1, 
  SpellCheck, 
  Wand2, 
  Crown, 
  Rocket, 
  Crosshair, 
  Heart, 
  Skull, 
  Globe,
  RotateCcw,
  Download
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { generationParameters, type GenerationParameters } from "@shared/schema";

const algorithmIcons = {
  random: Dice1,
  syllabic: SpellCheck,
  thematic: Wand2,
};

const themeIcons = {
  fantasy: Crown,
  "sci-fi": Rocket,
  military: Crosshair,
  cute: Heart,
  edgy: Skull,
  neutral: Globe,
};

interface GenerationControlsProps {
  onGenerate?: () => void;
}

export function GenerationControls({ onGenerate }: GenerationControlsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<GenerationParameters>({
    resolver: zodResolver(generationParameters),
    defaultValues: {
      algorithm: "random",
      theme: "fantasy",
      minLength: 4,
      maxLength: 12,
      includeNumbers: true,
      includeSpecialChars: false,
      useCapitalization: true,
      count: 24,
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (params: GenerationParameters) => {
      const response = await apiRequest("POST", "/api/nicknames/generate", params);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/nicknames"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Sucesso!",
        description: `${form.getValues("count")} novos nicknames gerados!`,
      });
      onGenerate?.();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao gerar nicknames",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: GenerationParameters) => {
    generateMutation.mutate(data);
  };

  const handleClear = () => {
    form.reset();
    queryClient.invalidateQueries({ queryKey: ["/api/nicknames"] });
  };

  const handleExport = async () => {
    try {
      const response = await apiRequest("GET", "/api/nicknames?limit=1000");
      const nicknames = await response.json();
      
      const csvContent = nicknames.map((n: any) => `${n.name},${n.theme},${n.algorithm},${n.length}`).join('\n');
      const blob = new Blob([`Name,Theme,Algorithm,Length\n${csvContent}`], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nicknames.csv';
      a.click();
      
      URL.revokeObjectURL(url);
      toast({
        title: "Exportado!",
        description: "Lista de nicknames exportada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao exportar nicknames",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-dark-secondary border-dark-tertiary animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Sliders className="text-electric-blue mr-2 h-5 w-5" />
          Configurações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Algorithm Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-3 block">
                Algoritmo de Geração
              </Label>
              <FormField
                control={form.control}
                name="algorithm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-1 gap-2">
                        {(["random", "syllabic", "thematic"] as const).map((algo) => {
                          const Icon = algorithmIcons[algo];
                          const isSelected = field.value === algo;
                          return (
                            <Button
                              key={algo}
                              type="button"
                              variant="outline"
                              className={`p-3 justify-start ${
                                isSelected
                                  ? "bg-electric-blue bg-opacity-20 border-electric-blue text-electric-blue"
                                  : "bg-dark-tertiary border-gray-600 text-gray-300 hover:border-gray-500"
                              }`}
                              onClick={() => field.onChange(algo)}
                            >
                              <Icon className="mr-2 h-4 w-4" />
                              {algo === "random" && "Aleatório"}
                              {algo === "syllabic" && "Silábico"}
                              {algo === "thematic" && "Temático"}
                            </Button>
                          );
                        })}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Theme Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-3 block">
                Tema do Jogo
              </Label>
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-2 gap-2">
                        {(["fantasy", "sci-fi", "military", "cute", "edgy", "neutral"] as const).map((theme) => {
                          const Icon = themeIcons[theme];
                          const isSelected = field.value === theme;
                          return (
                            <Button
                              key={theme}
                              type="button"
                              variant="outline"
                              size="sm"
                              className={`p-3 ${
                                isSelected
                                  ? "bg-neon-purple bg-opacity-20 border-neon-purple text-neon-purple"
                                  : "bg-dark-tertiary border-gray-600 text-gray-300 hover:border-gray-500"
                              }`}
                              onClick={() => field.onChange(theme)}
                            >
                              <Icon className="mr-1 h-3 w-3" />
                              {theme === "fantasy" && "Fantasy"}
                              {theme === "sci-fi" && "Sci-Fi"}
                              {theme === "military" && "Military"}
                              {theme === "cute" && "Cute"}
                              {theme === "edgy" && "Edgy"}
                              {theme === "neutral" && "Neutro"}
                            </Button>
                          );
                        })}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Length Settings */}
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-3 block">
                Comprimento
              </Label>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="minLength"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm text-gray-400">Mínimo</Label>
                        <span className="text-sm text-electric-blue font-gaming">
                          {field.value}
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          min={3}
                          max={15}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="range-slider"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxLength"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm text-gray-400">Máximo</Label>
                        <span className="text-sm text-electric-blue font-gaming">
                          {field.value}
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          min={form.watch("minLength") + 1}
                          max={20}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="range-slider"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Character Options */}
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-3 block">
                Caracteres
              </Label>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="includeNumbers"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-electric-blue data-[state=checked]:border-electric-blue"
                        />
                      </FormControl>
                      <Label className="text-sm text-gray-300">Números</Label>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeSpecialChars"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-electric-blue data-[state=checked]:border-electric-blue"
                        />
                      </FormControl>
                      <Label className="text-sm text-gray-300">Caracteres especiais</Label>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="useCapitalization"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-electric-blue data-[state=checked]:border-electric-blue"
                        />
                      </FormControl>
                      <Label className="text-sm text-gray-300">Capitalização</Label>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Number of nicknames to generate */}
            <div>
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-300">Quantidade</Label>
                      <span className="text-sm text-neon-green font-gaming">
                        {field.value}
                      </span>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={50}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="range-slider"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Generation Controls */}
            <div className="space-y-3">
              <Button
                type="submit"
                disabled={generateMutation.isPending}
                className="w-full bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue hover:to-electric-blue text-white font-semibold py-3 px-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Dice1 className="mr-2 h-4 w-4" />
                {generateMutation.isPending ? "Gerando..." : "Gerar Nicknames"}
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="bg-dark-tertiary border-gray-600 text-gray-300 hover:border-gray-500"
                >
                  <RotateCcw className="mr-1 h-4 w-4" />
                  Limpar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExport}
                  className="bg-dark-tertiary border-gray-600 text-gray-300 hover:border-gray-500"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
