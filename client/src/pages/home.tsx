import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ArrowUpDown, List, Plus, Heart } from "lucide-react";
import { Link } from "wouter";

import { Header } from "@/components/header";
import { GenerationControls } from "@/components/generation-controls";
import { StatsPanel } from "@/components/stats-panel";
import { NicknameCard } from "@/components/nickname-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type Nickname } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 24;

  // Set session ID for stats tracking
  const sessionId = "user-session";
  
  const { data: nicknames = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/nicknames", { limit, offset, search: searchQuery }],
    queryFn: async () => {
      const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
      const response = await fetch(`/api/nicknames?limit=${limit}&offset=${offset}${searchParam}`, {
        headers: {
          "x-session-id": sessionId,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch nicknames");
      return response.json();
    },
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ["/api/nicknames/favorites"],
    queryFn: async () => {
      const response = await fetch("/api/nicknames/favorites", {
        headers: {
          "x-session-id": sessionId,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch favorites");
      return response.json();
    },
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setOffset(0);
  };

  const handleLoadMore = () => {
    setOffset(prev => prev + limit);
  };

  const handleGenerate = () => {
    setOffset(0);
    refetch();
  };

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Controls */}
          <div className="lg:col-span-4 space-y-6">
            <GenerationControls onGenerate={handleGenerate} />
            <StatsPanel />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Search and Filters */}
            <Card className="bg-dark-secondary border-dark-tertiary">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar nicknames gerados..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 bg-dark-tertiary border-gray-600 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="bg-electric-blue bg-opacity-20 border-electric-blue text-electric-blue hover:bg-opacity-30"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-dark-tertiary border-gray-600 text-gray-300 hover:border-gray-500"
                    >
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Ordenar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Nicknames Grid */}
            <Card className="bg-dark-secondary border-dark-tertiary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <List className="text-electric-blue mr-2 h-5 w-5" />
                    Nicknames Gerados
                  </CardTitle>
                  <span className="text-sm text-gray-400">
                    {nicknames.length} resultados
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="bg-dark-tertiary rounded-lg p-4 animate-pulse">
                        <div className="h-6 bg-gray-600 rounded mb-2"></div>
                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-600 rounded w-16"></div>
                          <div className="h-4 bg-gray-600 rounded w-8"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : nicknames.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      {searchQuery ? "Nenhum nickname encontrado para sua busca." : "Nenhum nickname gerado ainda."}
                    </div>
                    <Button
                      onClick={() => setSearchQuery("")}
                      variant="outline"
                      className="bg-dark-tertiary border-gray-600 text-gray-300 hover:border-gray-500"
                    >
                      {searchQuery ? "Limpar busca" : "Gere alguns nicknames para começar"}
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {nicknames.map((nickname: Nickname, index: number) => (
                        <NicknameCard
                          key={nickname.id}
                          nickname={nickname}
                          index={index}
                        />
                      ))}
                    </div>
                    
                    {nicknames.length === limit && (
                      <div className="text-center">
                        <Button
                          onClick={handleLoadMore}
                          variant="outline"
                          className="bg-dark-tertiary border-gray-600 text-gray-300 hover:border-gray-500"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Carregar Mais
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Favorites Section */}
            {favorites.length > 0 && (
              <Card className="bg-dark-secondary border-dark-tertiary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <Heart className="text-red-400 mr-2 h-5 w-5 fill-current" />
                      Favoritos
                    </CardTitle>
                    <Link href="/favorites">
                      <Button
                        variant="ghost"
                        className="text-sm text-gray-400 hover:text-white"
                      >
                        Ver todos
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.slice(0, 6).map((nickname: Nickname, index: number) => (
                      <NicknameCard
                        key={nickname.id}
                        nickname={nickname}
                        index={index}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
