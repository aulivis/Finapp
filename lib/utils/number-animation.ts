/**
 * Utility for animating number changes
 */

export function animateNumber(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 1000,
  formatter: (value: number) => string = (v) => v.toString()
) {
  const startTime = performance.now()
  const difference = end - start

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = start + difference * easeOut
    
    element.textContent = formatter(Math.round(current))
    
    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = formatter(end)
    }
  }
  
  requestAnimationFrame(update)
}
