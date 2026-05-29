import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";

import { Route, Switch } from "wouter";

import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import Home from "./pages/Home";
import NewInteraction from "./pages/NewInteraction";
import Session from "./pages/Session";
import Baseline from "./pages/Baseline";
import Memory from "./pages/Memory";
import Reflection from "./pages/Reflection";
import Debug from "./pages/Debug";
import Export from "./pages/Export";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/new"} component={NewInteraction} />
      <Route path={"/session/:id"} component={Session} />
      <Route path={"/baseline"} component={Baseline} />
      <Route path={"/memory"} component={Memory} />
      <Route path={"/reflect/:id"} component={Reflection} />
      <Route path={"/debug/:id"} component={Debug} />
      <Route path={"/export"} component={Export} />
      <Route path={"/404"} component={NotFound} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
