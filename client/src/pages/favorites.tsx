import { useQuery } from "@tanstack/react-query";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

import { Header } from "@/components/header";
import { NicknameCard } from "@/components/nickname-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Nickname } from "@shared/schema";

export default function Favorites() {
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["/api/nicknames/favorites"],
    queryFn: async () => {
      const response = await fetch("/api/nicknames/favorites");
      if (!response.ok) throw new Error("Failed to fetch favorites");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              className="bg-dark-tertiary border-gray-600 text-gray-300 hover:border-electric-blue"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

        <Card className="bg-dark-secondary border-dark-tertiary">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Heart className="text-red-400 mr-3 h-6 w-6 fill-current" />
              Meus Favoritos
            </CardTitle>
            <p className="text-gray-400">
              {favorites.length} {favorites.length === 1 ? "nickname favorito" : "nicknames favoritos"}
            </p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-dark-tertiary rounded-lg p-4 animate-pulse">
                    <div className="h-6 bg-gray-600 rounded mb-2"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-600 rounded w-16"></div>
                      <div className="h-4 bg-gray-600 rounded w-8"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Nenhum favorito ainda
                </h3>
                <p className="text-gray-400 mb-6">
                  Favorite alguns nicknames para vê-los aqui!
                </p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue hover:to-electric-blue text-white">
                    Gerar Nicknames
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favorites.map((nickname: Nickname, index: number) => (
                  <NicknameCard
                    key={nickname.id}
                    nickname={nickname}
                    index={index}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}