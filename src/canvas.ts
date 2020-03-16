export interface canvas {[key: string]: string}

export const width = 100
export const height = 75

export const create = (): canvas => ({})
export const getColor = (canvas: canvas, x: number, y: number): string => (colorIndex(x, y) in canvas) ? canvas[colorIndex(x, y)] : defaultColor
export const setColor = (canvas: canvas, x: number, y: number, color: string): canvas => ({ ...canvas, [colorIndex(x, y)]: color })

const defaultColor = 'white'

const colorIndex = (x: number, y: number): string => {
  if (x < 0 || x >= width || y < 0 || y >= height) {
    throw new Error('Out of bounds')
  }
  return x.toString() + ':' + y.toString()
}
