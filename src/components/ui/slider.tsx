
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/**
 * Componente Slider
 * 
 * Um controle deslizante interativo que permite aos usuários selecionar um valor ou intervalo de valores.
 * Utiliza o Radix UI Slider como base para funcionalidade acessível.
 * 
 * Props:
 * - defaultValue: Valor inicial do slider
 * - min: Valor mínimo permitido
 * - max: Valor máximo permitido
 * - step: Incremento entre valores
 * - orientation: Orientação do slider (horizontal ou vertical)
 * - minStepsBetweenThumbs: Número mínimo de steps entre thumbs para sliders com múltiplos thumbs
 * - className: Classes CSS adicionais
 * - ...props: Outras propriedades do Radix Slider
 * 
 * Exemplo de uso:
 * <Slider defaultValue={[50]} min={0} max={100} step={1} />
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-brand-green-light/30">
      <SliderPrimitive.Range className="absolute h-full bg-brand-green" />
    </SliderPrimitive.Track>
    {props.defaultValue?.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-5 w-5 rounded-full border-2 border-brand-green bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
