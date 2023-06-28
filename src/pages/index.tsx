import Head from "next/head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "$/components/ui/tabs";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "$/components/ui/label";
import { Input } from "$/components/ui/input";
import { Button } from "$/components/ui/button";
import { cn } from "$/lib/utils";
import { Separator } from "$/components/ui/separator";

const Form: React.FC<React.ComponentPropsWithoutRef<"form">> = ({ className, ...props }) => (
  <form className={cn("flex flex-col gap-4", className)} {...props} />
);

const Error: React.FC<
  Omit<React.ComponentPropsWithoutRef<"span">, "children"> & {
    message: unknown;
  }
> = ({ className, ...props }) => {
  if (typeof props.message !== "string") return null;

  return (
    <span className={cn("text-destructive", className)} {...props}>
      {props.message}
    </span>
  );
};

const tabs = ["Planeta", "Astronauta", "Camión", "Mensajería"] as const;

const PlanetForm: React.FC = () => {
  const [result, setResult] = React.useState<number | null>(null);
  const schema = z.object({
    initialVelocity: z.number({
      required_error: "La velocidad inicial debe ser un número",
      invalid_type_error: "La velocidad inicial debe ser un número",
    }),
    angle: z.number({
      required_error: "El ángulo debe ser un número",
      invalid_type_error: "El ángulo debe ser un número",
    }),
    distance: z.number({
      required_error: "La distancia debe ser un número",
      invalid_type_error: "La distancia debe ser un número",
    }),
  });
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    defaultValues: {
      initialVelocity: undefined,
      angle: undefined,
      distance: undefined,
    },
    resolver: zodResolver(schema),
    shouldUnregister: false,
  });

  function handleSubmit(values: FormValues) {
    const radians = (values.angle * Math.PI) / 180;
    const agrav =
      (2 * values.initialVelocity ** 2 * Math.sin(radians) * Math.cos(radians)) / values.distance;
    const parse = z.number().safeParse(agrav);

    if (parse.success) {
      setResult(parse.data);
    } else {
      form.setError("root", {
        type: "manual",
        message: "Error al calcular la aceleración",
      });
      setResult(null);
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4">
      <Label>
        <span>Velocidad inicial (m/s)</span>
        <Input
          type="number"
          step="any"
          {...form.register("initialVelocity", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.initialVelocity?.message} />
      </Label>

      <Label>
        <span>Ángulo (grados)</span>
        <Input
          type="number"
          step="any"
          {...form.register("angle", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.angle?.message} />
      </Label>

      <Label>
        <span>Distancia (m)</span>
        <Input
          type="number"
          step="any"
          {...form.register("distance", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.distance?.message} />
      </Label>

      <Button type="submit">Calcular</Button>

      {result && (
        <>
          <Separator />

          <span className="text-center font-medium text-green-500">{result}</span>
        </>
      )}

      {form.formState.errors.root && (
        <span className="text-destructive">{form.formState.errors.root.message}</span>
      )}
    </Form>
  );
};

const AstronautForm: React.FC = () => {
  const schema = z.object({
    astronautHeight: z.number({
      required_error: "La altura del astronauta debe ser un número",
      invalid_type_error: "La altura del astronauta debe ser un número",
    }),
    gravity: z.number({
      required_error: "La gravedad debe ser un número",
      invalid_type_error: "La gravedad debe ser un número",
    }),
    angle: z.number({
      required_error: "El ángulo debe ser un número",
      invalid_type_error: "El ángulo debe ser un número",
    }),
    initialVelocity: z.number({
      required_error: "La velocidad inicial debe ser un número",
      invalid_type_error: "La velocidad inicial debe ser un número",
    }),
    hoopHeight: z.number({
      required_error: "La altura del aro debe ser un número",
      invalid_type_error: "La altura del aro debe ser un número",
    }),
  });
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    defaultValues: {
      astronautHeight: undefined,
      gravity: undefined,
      angle: undefined,
      initialVelocity: undefined,
      hoopHeight: undefined,
    },
    resolver: zodResolver(schema),
    shouldUnregister: false,
  });

  const [result, setResult] = React.useState<number | null>(null);

  function handleSubmit(values: FormValues) {
    // x = Vo^2 * sin(2* a) / g
    const radians = (values.angle * Math.PI) / 180;
    const parse = z
      .number()
      .safeParse((values.initialVelocity ** 2 * Math.sin(2 * radians)) / values.gravity);

    if (parse.success) {
      setResult(parse.data);
    } else {
      form.setError("root", {
        type: "manual",
        message: "Error al calcular la distancia",
      });
      setResult(null);
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4">
      <Label>
        <span>Altura del astronauta (m)</span>
        <Input
          type="number"
          step="any"
          {...form.register("astronautHeight", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.astronautHeight?.message} />
      </Label>

      <Label>
        <span>Gravedad (m/s)^2</span>
        <Input
          type="number"
          step="any"
          {...form.register("gravity", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.gravity?.message} />
      </Label>

      <Label>
        <span>Ángulo (grados)</span>
        <Input
          type="number"
          step="any"
          {...form.register("angle", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.angle?.message} />
      </Label>

      <Label>
        <span>Velocidad inicial (m/s)</span>
        <Input
          type="number"
          step="any"
          {...form.register("initialVelocity", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.initialVelocity?.message} />
      </Label>

      <Label>
        <span>Altura del aro (m)</span>
        <Input
          type="number"
          step="any"
          {...form.register("hoopHeight", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.hoopHeight?.message} />
      </Label>

      <Button type="submit">Calcular</Button>

      {result && (
        <>
          <Separator />

          <span className="text-center font-medium text-green-500">{result}</span>
        </>
      )}

      {form.formState.errors.root && (
        <span className="text-destructive">{form.formState.errors.root.message}</span>
      )}
    </Form>
  );
};

const MessengerForm: React.FC = () => {
  const schema = z.object({
    angle: z.number({
      required_error: "El ángulo debe ser un número",
      invalid_type_error: "El ángulo debe ser un número",
    }),
    height: z.number({
      required_error: "La altura debe ser un número",
      invalid_type_error: "La altura debe ser un número",
    }),
    friction: z.number({
      required_error: "La fricción debe ser un número",
      invalid_type_error: "La fricción debe ser un número",
    }),
    acceleration: z.number({
      required_error: "La aceleración debe ser un número",
      invalid_type_error: "La aceleración debe ser un número",
    }),
    mass: z.number({
      required_error: "La masa debe ser un número",
      invalid_type_error: "La masa debe ser un número",
    }),
  });
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    defaultValues: {
      angle: undefined,
      height: undefined,
      friction: undefined,
      acceleration: undefined,
      mass: undefined,
    },
    resolver: zodResolver(schema),
  });

  const [result, setResult] = React.useState<number | null>(null);

  function handleSubmit(values: FormValues) {
    // F = m * g * sen(θ) + u * m * g * cos(θ) + m * a
    const radians = (values.angle * Math.PI) / 180;
    const force =
      values.mass * 9.81 * Math.sin(radians) +
      values.friction * values.mass * 9.81 * Math.cos(radians) +
      values.mass * values.acceleration;
    const parse = z.number().safeParse(force);

    if (parse.success) {
      setResult(parse.data);
    } else {
      form.setError("root", {
        type: "manual",
        message: "Error al calcular la fuerza",
      });
      setResult(null);
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4">
      <Label>
        <span>Ángulo (grados)</span>
        <Input
          type="number"
          step="any"
          {...form.register("angle", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.angle?.message} />
      </Label>

      <Label>
        <span>Altura (m)</span>
        <Input
          type="number"
          step="any"
          {...form.register("height", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.height?.message} />
      </Label>

      <Label>
        <span>Fricción</span>
        <Input
          type="number"
          step="any"
          {...form.register("friction", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.friction?.message} />
      </Label>

      <Label>
        <span>Aceleración</span>
        <Input
          type="number"
          step="any"
          {...form.register("acceleration", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.acceleration?.message} />
      </Label>

      <Label>
        <span>Masa</span>
        <Input
          type="number"
          step="any"
          {...form.register("mass", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.mass?.message} />
      </Label>

      <Button type="submit">Calcular</Button>

      {result && (
        <>
          <Separator />

          <span className="text-center font-medium text-green-500">{result}</span>
        </>
      )}

      {form.formState.errors.root && (
        <span className="text-destructive">{form.formState.errors.root.message}</span>
      )}
    </Form>
  );
};

const TruckForm: React.FC = () => {
  const schema = z.object({
    mass: z.number({
      required_error: "La masa debe ser un número",
      invalid_type_error: "La masa debe ser un número",
    }),
    friction: z.number({
      required_error: "La fricción debe ser un número",
      invalid_type_error: "La fricción debe ser un número",
    }),
  });
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    defaultValues: {
      mass: undefined,
      friction: undefined,
    },
    resolver: zodResolver(schema),
  });

  const [result, setResult] = React.useState<number | null>(null);

  function handleSubmit(values: FormValues) {
    // the result is atan(friction) which results in radians, which is then converted to degrees
    const parse = z.number().safeParse(Math.atan(values.friction) * (180 / Math.PI));

    if (parse.success) {
      setResult(parse.data);
    } else {
      form.setError("root", {
        type: "manual",
        message: "Error al calcular el ángulo",
      });
      setResult(null);
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4">
      <Label>
        <span>Masa (kg)</span>
        <Input
          type="number"
          step="any"
          {...form.register("mass", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.mass?.message} />
      </Label>

      <Label>
        <span>Fricción</span>
        <Input
          type="number"
          step="any"
          {...form.register("friction", {
            valueAsNumber: true,
          })}
        />
        <Error message={form.formState.errors.friction?.message} />
      </Label>

      <Button type="submit">Calcular</Button>

      {result && (
        <>
          <Separator />

          <span className="text-center font-medium text-green-500">{result}</span>
        </>
      )}

      {form.formState.errors.root && (
        <span className="text-destructive">{form.formState.errors.root.message}</span>
      )}
    </Form>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Sustentacion Fisica Poli</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-background p-8">
        <Tabs defaultValue={tabs[0]}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger value={tab} key={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={tabs[0]}>
            <PlanetForm />
          </TabsContent>

          <TabsContent value={tabs[1]}>
            <AstronautForm />
          </TabsContent>

          <TabsContent value={tabs[2]}>
            <TruckForm />
          </TabsContent>

          <TabsContent value={tabs[3]}>
            <MessengerForm />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
