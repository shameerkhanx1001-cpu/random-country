import { useState } from "react";
import { Globe, MapPin, Users, Languages, Coins, Maximize2, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { CountryDisplay } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import CountryMap from "@/components/country-map";

export default function Home() {
  const [currentCountry, setCurrentCountry] = useState<CountryDisplay | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { toast } = useToast();

  const generateCountryMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/random-country");
      if (!response.ok) {
        throw new Error("Failed to fetch country");
      }
      return response.json() as Promise<CountryDisplay>;
    },
    onSuccess: (data) => {
      setCurrentCountry(data);
      setHasGenerated(true);
      setTimeout(() => {
        document.getElementById("country-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load country data. Please try again.",
      });
    },
  });

  const handleGenerateCountry = () => {
    generateCountryMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      {!hasGenerated ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 mb-4 shadow-lg">
                <Globe className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Discover the World
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Explore countries around the globe one random discovery at a time. Learn about flags, capitals, populations, languages, and more.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Badge variant="secondary" className="text-xs">Premium Content</Badge>
                <Badge variant="secondary" className="text-xs">195+ Countries</Badge>
                <Badge variant="secondary" className="text-xs">Real-time Data</Badge>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleGenerateCountry}
              disabled={generateCountryMutation.isPending}
              className="w-full max-w-md text-lg font-semibold rounded-xl shadow-lg h-14"
              data-testid="button-generate-country"
            >
              {generateCountryMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Discovering...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Random Country
                </>
              )}
            </Button>

            {generateCountryMutation.isError && (
              <p className="text-destructive text-sm" data-testid="text-error">
                Failed to load country. Please try again.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="container px-4 md:px-6 py-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-end">
              <Button
                onClick={handleGenerateCountry}
                disabled={generateCountryMutation.isPending}
                className="rounded-lg"
                data-testid="button-generate-another"
              >
                {generateCountryMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Generate Another
                  </>
                )}
              </Button>
            </div>
          </div>

          <main className="container px-4 md:px-6 pb-8 md:pb-12 max-w-4xl mx-auto">
            {generateCountryMutation.isPending ? (
              <div className="space-y-6">
                <Card className="overflow-hidden rounded-2xl shadow-xl">
                  <Skeleton className="w-full aspect-[3/2]" />
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <Skeleton className="h-10 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-20" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : currentCountry ? (
              <div className="space-y-6 animate-in fade-in duration-500" id="country-card">
                <Card className="overflow-hidden rounded-2xl shadow-xl" data-testid="card-country">
                  <div className="relative w-full aspect-[3/2] overflow-hidden bg-muted">
                    <img
                      src={currentCountry.flag}
                      alt={currentCountry.flagAlt || `Flag of ${currentCountry.name}`}
                      className="w-full h-full object-cover"
                      data-testid="img-flag"
                    />
                  </div>

                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight" data-testid="text-country-name">
                        {currentCountry.name}
                      </h2>
                      <p className="text-muted-foreground text-base" data-testid="text-official-name">
                        {currentCountry.officialName}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <InfoCard
                        icon={<MapPin className="w-5 h-5" />}
                        label="Capital"
                        value={currentCountry.capital}
                        testId="text-capital"
                      />
                      <InfoCard
                        icon={<Globe className="w-5 h-5" />}
                        label="Region"
                        value={currentCountry.region}
                        testId="text-region"
                      />
                      <InfoCard
                        icon={<Users className="w-5 h-5" />}
                        label="Population"
                        value={currentCountry.population}
                        testId="text-population"
                      />
                      <InfoCard
                        icon={<Languages className="w-5 h-5" />}
                        label="Languages"
                        value={currentCountry.languages}
                        testId="text-languages"
                      />
                      <InfoCard
                        icon={<Coins className="w-5 h-5" />}
                        label="Currency"
                        value={currentCountry.currencies}
                        testId="text-currency"
                      />
                      <InfoCard
                        icon={<Maximize2 className="w-5 h-5" />}
                        label="Area"
                        value={currentCountry.area}
                        testId="text-area"
                      />
                    </div>

                    {currentCountry.subregion && (
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <Badge variant="secondary" className="text-sm" data-testid="badge-subregion">
                          {currentCountry.subregion}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {currentCountry.coordinates && (
                  <Card className="overflow-hidden rounded-2xl shadow-xl">
                    <CardHeader className="pb-4">
                      <h3 className="text-xl md:text-2xl font-semibold font-heading flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Location on Map
                      </h3>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CountryMap
                        coordinates={currentCountry.coordinates}
                        countryName={currentCountry.name}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : null}
          </main>
        </div>
      )}
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  testId?: string;
}

function InfoCard({ icon, label, value, testId }: InfoCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-muted/50 hover-elevate">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-base md:text-lg font-semibold" data-testid={testId}>
        {value}
      </p>
    </div>
  );
}
