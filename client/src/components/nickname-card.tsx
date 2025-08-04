import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Nickname } from "@shared/schema";

interface NicknameCardProps {
  nickname: Nickname;
  index?: number;
}

const algorithmColors = {
  random: "text-electric-blue bg-electric-blue",
  syllabic: "text-neon-purple bg-neon-purple", 
  thematic: "text-neon-green bg-neon-green",
};

export function NicknameCard({ nickname, index = 0 }: NicknameCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/nicknames/${nickname.id}/favorite`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/nicknames"] });
      queryClient.invalidateQueries({ queryKey: ["/api/nicknames/favorites"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const copyMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/nicknames/${nickname.id}/copy`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(nickname.name);
      copyMutation.mutate();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copiado!",
        description: `"${nickname.name}" copiado para a área de transferência!`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao copiar nickname",
        variant: "destructive",
      });
    }
  };

  const handleFavorite = () => {
    toggleFavoriteMutation.mutate();
  };

  const algorithmColor = algorithmColors[nickname.algorithm as keyof typeof algorithmColors] || algorithmColors.random;
  const isFavorite = nickname.isFavorite;

  return (
    <div
      className={`group ${
        isFavorite 
          ? "bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 border border-electric-blue/30 hover:border-electric-blue" 
          : "bg-dark-tertiary border border-gray-600 hover:border-electric-blue"
      } rounded-lg p-4 hover:shadow-lg hover:shadow-electric-blue/10 transition-all duration-300 animate-slide-up cursor-pointer`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={handleCopy}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-gaming text-lg font-semibold text-electric-blue">
          {nickname.name}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleFavorite();
          }}
          disabled={toggleFavoriteMutation.isPending}
          className={`opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 transition-all ${
            isFavorite ? "opacity-100" : ""
          }`}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-400 text-red-400" : "text-gray-400 hover:text-red-400"
            }`}
          />
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${algorithmColor.split(' ')[1]}/20 ${algorithmColor.split(' ')[0]}`}>
            {nickname.algorithm === "random" ? "Aleatório" : 
             nickname.algorithm === "syllabic" ? "Silábico" :
             nickname.algorithm === "thematic" ? "Temático" : nickname.algorithm}
          </span>
          <span className="text-xs text-gray-400">
            {nickname.length} chars
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="p-2 hover:bg-gray-600 transition-colors group"
        >
          <Copy
            className={`h-4 w-4 transition-colors ${
              copied 
                ? "text-neon-green" 
                : "text-gray-400 group-hover:text-electric-blue"
            }`}
          />
        </Button>
      </div>
    </div>
  );
}
