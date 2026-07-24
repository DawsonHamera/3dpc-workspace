import {
  Printer,
  Settings,
  Wrench,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function PrinterGuide() {
  return (
    <div className="container mx-auto max-w-5xl px-6 py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          3D Printer Guide
        </h1>

        <p className="mt-3 text-lg text-muted-foreground">
          New to 3D printing? This guide covers the basics
          of using, maintaining, and troubleshooting our printers.
        </p>
      </div>


      <div className="grid gap-6 md:grid-cols-2">

        <Card>
          <CardHeader>
            <Printer className="h-8 w-8 text-primary" />
            <CardTitle>
              Before Your First Print
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <p>
              Always check the basics before starting a print:
            </p>

            <ul className="space-y-2">
              <li>✓ Correct filament loaded</li>
              <li>✓ Build plate is clean</li>
              <li>✓ Printer has enough material</li>
              <li>✓ Correct print settings selected</li>
            </ul>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <Settings className="h-8 w-8 text-primary" />
            <CardTitle>
              Understanding Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <p>
              The most important slicer settings are:
            </p>

            <ul className="space-y-2">
              <li>
                <strong>Layer Height:</strong> detail vs speed
              </li>
              <li>
                <strong>Infill:</strong> strength vs material
              </li>
              <li>
                <strong>Supports:</strong> printing overhangs
              </li>
              <li>
                <strong>Temperature:</strong> material dependent
              </li>
            </ul>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <Wrench className="h-8 w-8 text-primary" />
            <CardTitle>
              Common Problems
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                First layer not sticking → clean plate / level bed
              </li>
              <li>
                Stringing → adjust temperature or retraction
              </li>
              <li>
                Failed print → check supports and adhesion
              </li>
            </ul>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <CardTitle>
              Printer Etiquette
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>Leave machines cleaner than you found them</li>
              <li>Remove completed prints</li>
              <li>Ask before changing advanced settings</li>
              <li>Report problems instead of ignoring them</li>
            </ul>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}