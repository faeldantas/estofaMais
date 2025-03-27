
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
 * 
 * Substituição por API:
 * Este componente de UI não precisa de substituição por API, pois é um componente puramente de interface.
 * Ele pode ser usado em conjunto com valores obtidos de APIs.
 * 
 * Os valores selecionados por este componente podem ser enviados para o backend em operações de formulário
 * ou filtragem, por exemplo:
 * - POST /api/quotes com os valores de preço mínimo e máximo selecionados
 * - GET /api/products?minPrice=X&maxPrice=Y para filtrar produtos por faixa de preço
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
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#e0e0b6]/50">
      <SliderPrimitive.Range className="absolute h-full bg-[#87b091]" />
    </SliderPrimitive.Track>
    {props.defaultValue?.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-5 w-5 rounded-full border-2 border-[#87b091] bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4d4ab] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
