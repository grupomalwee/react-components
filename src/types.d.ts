// src/types.d.ts
declare module "class-variance-authority" {
  type ConfigSchema = {
    [variant: string]: {
      [value: string]: string;
    };
  };

  type CVAFunction = {
    <T extends ConfigSchema>(
      base?: string,
      config?: {
        variants?: T;
        defaultVariants?: Partial<{ [K in keyof T]: keyof T[K] }>;
      }
    ): (props?: Partial<{ [K in keyof T]: keyof T[K] }> & { className?: string }) => string;
  };

  export const cva: CVAFunction;

  export type VariantProps<T> = T extends (props?: infer P) => any ? P : never;
}
