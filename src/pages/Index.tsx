import { Header } from "@/components/Header";
import { PriceChart } from "@/components/PriceChart";
import { TechnicalIndicators } from "@/components/TechnicalIndicators";
import { TrainingPanel } from "@/components/TrainingPanel";
import { EDAPanel } from "@/components/EDAPanel";
import { SignalsPanel } from "@/components/SignalsPanel";
import { VolumeChart } from "@/components/VolumeChart";
import { ModelArchitecture } from "@/components/ModelArchitecture";
import { goldData, trainingMetrics, tradingSignals, edaStats } from "@/lib/tradingData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Brain, BarChart3, Activity } from "lucide-react";

const Index = () => {
  const currentData = goldData[goldData.length - 1];
  const previousData = goldData[goldData.length - 2];
  const priceChange = ((currentData.close - previousData.close) / previousData.close) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header currentPrice={currentData.close} priceChange={priceChange} />
      
      <main className="container py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="glass-card p-1 bg-card/50">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Activity className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LineChart className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="model" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Brain className="h-4 w-4" />
              Model
            </TabsTrigger>
            <TabsTrigger value="eda" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="h-4 w-4" />
              EDA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PriceChart data={goldData} />
              </div>
              <div>
                <SignalsPanel signals={tradingSignals} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TechnicalIndicators data={currentData} />
              <VolumeChart data={goldData} />
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Model Performance</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                    <span className="text-sm text-success">Win Rate</span>
                    <span className="font-mono font-bold text-success">67.8%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                    <span className="text-sm text-primary">Profit Factor</span>
                    <span className="font-mono font-bold text-primary">1.85</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/30">
                    <span className="text-sm text-accent">Sharpe Ratio</span>
                    <span className="font-mono font-bold text-accent">1.42</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                    <span className="text-sm text-destructive">Max Drawdown</span>
                    <span className="font-mono font-bold text-destructive">-12.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6 animate-fade-in">
            <PriceChart data={goldData} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TechnicalIndicators data={currentData} />
              <VolumeChart data={goldData} />
            </div>
          </TabsContent>

          <TabsContent value="model" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrainingPanel metrics={trainingMetrics} />
              <SignalsPanel signals={tradingSignals} />
            </div>
            <ModelArchitecture />
          </TabsContent>

          <TabsContent value="eda" className="space-y-6 animate-fade-in">
            <EDAPanel stats={edaStats} data={goldData} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VolumeChart data={goldData} />
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Dataset Info</h2>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground">Total Samples</span>
                    <span className="font-mono font-medium">{goldData.length}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground">Features</span>
                    <span className="font-mono font-medium">12</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground">Timeframe</span>
                    <span className="font-mono font-medium">1H</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground">Train/Val Split</span>
                    <span className="font-mono font-medium">80/20</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground">Missing Values</span>
                    <span className="font-mono font-medium text-success">0</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-4 mt-8">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <p>LSTM Gold Trading Bot • Neural Network Powered</p>
          <p>Data is simulated for demonstration purposes</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
