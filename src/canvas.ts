export default class Canvas {
  static defaultColor = 'white'
  static width = 100;
  static height = 75;

  colors: {[key: string]: string} = {}

  color = (x: number, y: number): string => (colorIndex(x, y) in this.colors) ? this.colors[colorIndex(x, y)] : Canvas.defaultColor
}

const colorIndex = (x: number, y: number): string => {
  if (x < 0 || x >= Canvas.width || y < 0 || y >= Canvas.height) {
    throw new Error('Out of bounds')
  }
  return x.toString() + ':' + y.toString()
}
