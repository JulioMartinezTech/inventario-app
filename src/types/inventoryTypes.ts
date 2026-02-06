export interface UnitType {
  id: number
  label: string
  value: 'und' | 'cj' // Restringimos los strings posibles
}

export interface ItemSelection {
  unit: UnitType['value'] // Reutilizamos el tipo de UnitType para coherencia
  quantity: number | null
}

export interface Item {
  id: number
  name: string
  location: string
  selection: ItemSelection
}

export interface ItemCardProps {
  item: Item // Pasamos el objeto completo para evitar prop-drilling de campos sueltos
  unitTypes: UnitType[]
}
