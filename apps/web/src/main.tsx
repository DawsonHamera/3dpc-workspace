import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from "@/components/ui/tooltip"
import './index.css'
import App from './App.tsx'

import {
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryClient } from './lib/queryClient.ts'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
        <App />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>,
);
