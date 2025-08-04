import { Settings, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";

export function Header() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-dark-secondary border-b border-dark-tertiary sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-neon-purple rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 4V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h.5c.8 0 1.5.7 1.5 1.5S14.3 7 13.5 7H13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7h-.5C5.7 7 5 6.3 5 5.5S5.7 4 6.5 4H7zm2 0h2V3H9v1z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
                GameName Generator
              </h1>
              <p className="text-xs text-gray-400">Gerador de Nicknames</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="bg-dark-tertiary border-gray-600 hover:border-electric-blue text-electric-blue"
            >
              <Palette className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="bg-dark-tertiary border-gray-600 hover:border-gray-500 text-gray-400"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
