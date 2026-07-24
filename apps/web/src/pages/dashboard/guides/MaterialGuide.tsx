import {
  Layers,
  Droplets,
  Thermometer,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function MaterialGuide() {

  const materials = [
    {
      name: "PLA",
      description:
        "Best beginner filament. Easy to print and great for most projects.",
      temp:
        "190-220°C nozzle",
    },
    {
      name: "PETG",
      description:
        "Stronger and more heat resistant than PLA.",
      temp:
        "230-250°C nozzle",
    },
    {
      name: "TPU",
      description:
        "Flexible filament used for rubber-like parts.",
      temp:
        "210-230°C nozzle",
    },
  ];


  return (
    <div className="container mx-auto max-w-5xl px-6 py-10">

      <h1 className="text-4xl font-bold">
        Material Guide
      </h1>

      <p className="mt-3 text-lg text-muted-foreground">
        Choosing the right material is one of the most
        important parts of successful 3D printing.
      </p>


      <div className="mt-8 grid gap-6">

        {materials.map((material) => (
          <Card key={material.name}>

            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                {material.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">

              <p>
                {material.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Thermometer className="h-4 w-4" />
                {material.temp}
              </div>

            </CardContent>

          </Card>
        ))}


        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Droplets className="h-5 w-5 text-primary"/>
              Storage Tips
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>Keep filament away from moisture</li>
              <li>Use dry boxes when available</li>
              <li>Replace damaged spools</li>
            </ul>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}