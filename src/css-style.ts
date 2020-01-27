export class CSSStyle {
  private readonly id = `${Date.now()}-${~~(Math.random() * 1000)}`

  private property(name: string): string {
    return `--${name}-${this.id}`
  }

  public get(property: string): string {
    return document.body.style.getPropertyValue(this.property(property))
  }

  public set(property: string, value: string): this {
    document.body.style.setProperty(this.property(property), value)
    return this
  }

  public bind(style: CSSStyleDeclaration, ...properties: string[]): void {
    properties.forEach(property => {
      style.setProperty(property, `var(${this.property(property)})`)
    })
  }
}
