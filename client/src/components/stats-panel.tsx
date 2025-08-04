import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function StatsPanel() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="bg-dark-secondary border-dark-tertiary">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <BarChart3 className="text-neon-green mr-2 h-5 w-5" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-dark-tertiary rounded"></div>
            <div className="h-4 bg-dark-tertiary rounded"></div>
            <div className="h-4 bg-dark-tertiary rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dark-secondary border-dark-tertiary">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <BarChart3 className="text-neon-green mr-2 h-5 w-5" />
          Estatísticas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Gerados hoje</span>
          <span className="text-neon-green font-gaming font-semibold">
            {stats?.generatedToday || 0}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Favoritos</span>
          <span className="text-electric-blue font-gaming font-semibold">
            {stats?.totalFavorites || 0}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Copiados</span>
          <span className="text-amber-glow font-gaming font-semibold">
            {stats?.totalCopied || 0}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
