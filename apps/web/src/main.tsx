import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from "@/components/ui/tooltip"
import './index.css'
import App from './App.tsx'

import {
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryClient } from './lib/queryClient.ts'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
         <TooltipProvider>
        <App />
        </TooltipProvider>
      </QueryClientProvider>
  </StrictMode>,
);
