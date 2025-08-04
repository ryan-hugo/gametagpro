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

const themeColors = {
  fantasy: "text-neon-purple bg-neon-purple",
  "sci-fi": "text-electric-blue bg-electric-blue",
  military: "text-gray-300 bg-gray-600",
  cute: "text-pink-400 bg-pink-400",
  edgy: "text-red-400 bg-red-400",
  neutral: "text-green-400 bg-green-400",
};

const themeGradients = {
  fantasy: "from-neon-purple/10 to-pink-500/10 border-neon-purple/20 hover:border-neon-purple",
  "sci-fi": "from-electric-blue/10 to-cyan-500/10 border-electric-blue/20 hover:border-electric-blue",
  military: "from-gray-500/10 to-gray-600/10 border-gray-500/20 hover:border-gray-400",
  cute: "from-pink-500/10 to-pink-400/10 border-pink-500/20 hover:border-pink-400",
  edgy: "from-red-500/10 to-pink-500/10 border-red-500/20 hover:border-red-400",
  neutral: "from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400",
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

  const themeColor = themeColors[nickname.theme as keyof typeof themeColors] || themeColors.neutral;
  const gradientClass = themeGradients[nickname.theme as keyof typeof themeGradients] || themeGradients.neutral;
  const isFavorite = nickname.isFavorite;

  return (
    <div
      className={`group bg-gradient-to-br ${
        isFavorite ? gradientClass : "bg-dark-tertiary border border-gray-600 hover:border-electric-blue"
      } rounded-lg p-4 hover:shadow-lg hover:shadow-electric-blue/10 transition-all duration-300 animate-slide-up cursor-pointer`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={handleCopy}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`font-gaming text-lg font-semibold ${
          isFavorite ? themeColor.split(' ')[0] : "text-electric-blue"
        }`}>
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
          <span className={`text-xs px-2 py-1 rounded-full ${themeColor.split(' ')[1]}/20 ${themeColor.split(' ')[0]}`}>
            {nickname.theme === "sci-fi" ? "Sci-Fi" : 
             nickname.theme.charAt(0).toUpperCase() + nickname.theme.slice(1)}
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
