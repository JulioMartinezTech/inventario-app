import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Item } from '@/types/inventoryTypes'

export function useInventoryExport() {
  const generatePDF = (items: Item[]): void => {
    // 1. Filtrar solo los items que tienen una cantidad ingresada
    const itemsToExport = items.filter(
      (item) => item.selection.quantity !== null && item.selection.quantity > 0,
    )

    if (itemsToExport.length === 0) {
      alert('No hay datos para exportar. Ingresa al menos una cantidad.')
      return
    }

    const doc = new jsPDF()
    const date = new Date().toLocaleDateString('es-CO') // Formato local

    // --- Diseño del Encabezado ---
    doc.setFontSize(18)
    doc.setTextColor(40)
    doc.text('Reporte de Inventario - Colombiapan', 14, 20)

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Fecha de generación: ${date}`, 14, 28)

    // --- Preparación de Datos ---
    // Mapeamos el objeto Item a una estructura de filas [col1, col2, col3...]
    const body = itemsToExport.map((item) => [
      item.name,
      item.selection.quantity,
      item.selection.unit.toUpperCase(),
      item.location,
    ])

    // --- Generación de Tabla ---
    autoTable(doc, {
      startY: 35,
      head: [['Producto', 'Cant.', 'Unidad', 'Ubicación']],
      body: body,
      theme: 'striped',
      headStyles: {
        fillColor: [230, 126, 34], // Un naranja acorde al logo de panadería
        textColor: 255,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      columnStyles: {
        1: { halign: 'center' }, // Cantidad centrada
        2: { halign: 'center' }, // Unidad centrada
      },
    })

    // --- Salida ---
    doc.save(`Inventario_${date.replace(/\//g, '-')}.pdf`)
  }

  return {
    generatePDF,
  }
}
