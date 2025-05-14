"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Html, Line } from "@react-three/drei"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { InfoIcon, TableIcon, CuboidIcon as CubeIcon, DownloadIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos ampliados del cubo OLAP
const cubeData = [
  // Laptops
  { x: 0, y: 0, z: 0, producto: "Laptop", region: "Norte", mes: "Ene", valor: 12500 },
  { x: 0, y: 1, z: 0, producto: "Laptop", region: "Sur", mes: "Ene", valor: 10800 },
  { x: 0, y: 0, z: 1, producto: "Laptop", region: "Norte", mes: "Feb", valor: 13200 },
  { x: 0, y: 1, z: 1, producto: "Laptop", region: "Sur", mes: "Feb", valor: 11500 },
  { x: 0, y: 0, z: 2, producto: "Laptop", region: "Norte", mes: "Mar", valor: 14100 },
  { x: 0, y: 1, z: 2, producto: "Laptop", region: "Sur", mes: "Mar", valor: 12300 },

  // Smartphones
  { x: 1, y: 0, z: 0, producto: "Smartphone", region: "Norte", mes: "Ene", valor: 18200 },
  { x: 1, y: 1, z: 0, producto: "Smartphone", region: "Sur", mes: "Ene", valor: 16500 },
  { x: 1, y: 0, z: 1, producto: "Smartphone", region: "Norte", mes: "Feb", valor: 19100 },
  { x: 1, y: 1, z: 1, producto: "Smartphone", region: "Sur", mes: "Feb", valor: 17800 },
  { x: 1, y: 0, z: 2, producto: "Smartphone", region: "Norte", mes: "Mar", valor: 20500 },
  { x: 1, y: 1, z: 2, producto: "Smartphone", region: "Sur", mes: "Mar", valor: 19200 },

  // Tablets
  { x: 2, y: 0, z: 0, producto: "Tablet", region: "Norte", mes: "Ene", valor: 8700 },
  { x: 2, y: 1, z: 0, producto: "Tablet", region: "Sur", mes: "Ene", valor: 7900 },
  { x: 2, y: 0, z: 1, producto: "Tablet", region: "Norte", mes: "Feb", valor: 9200 },
  { x: 2, y: 1, z: 1, producto: "Tablet", region: "Sur", mes: "Feb", valor: 8500 },
  { x: 2, y: 0, z: 2, producto: "Tablet", region: "Norte", mes: "Mar", valor: 9800 },
  { x: 2, y: 1, z: 2, producto: "Tablet", region: "Sur", mes: "Mar", valor: 9100 },

  // Monitores
  { x: 3, y: 0, z: 0, producto: "Monitor", region: "Norte", mes: "Ene", valor: 6200 },
  { x: 3, y: 1, z: 0, producto: "Monitor", region: "Sur", mes: "Ene", valor: 5800 },
  { x: 3, y: 0, z: 1, producto: "Monitor", region: "Norte", mes: "Feb", valor: 6500 },
  { x: 3, y: 1, z: 1, producto: "Monitor", region: "Sur", mes: "Feb", valor: 6100 },
  { x: 3, y: 0, z: 2, producto: "Monitor", region: "Norte", mes: "Mar", valor: 7200 },
  { x: 3, y: 1, z: 2, producto: "Monitor", region: "Sur", mes: "Mar", valor: 6800 },

  // Auriculares
  { x: 4, y: 0, z: 0, producto: "Auriculares", region: "Norte", mes: "Ene", valor: 3500 },
  { x: 4, y: 1, z: 0, producto: "Auriculares", region: "Sur", mes: "Ene", valor: 3200 },
  { x: 4, y: 0, z: 1, producto: "Auriculares", region: "Norte", mes: "Feb", valor: 3800 },
  { x: 4, y: 1, z: 1, producto: "Auriculares", region: "Sur", mes: "Feb", valor: 3600 },
  { x: 4, y: 0, z: 2, producto: "Auriculares", region: "Norte", mes: "Mar", valor: 4200 },
  { x: 4, y: 1, z: 2, producto: "Auriculares", region: "Sur", mes: "Mar", valor: 3900 },
]

// Dimensiones únicas
const productos = [...new Set(cubeData.map((item) => item.producto))]
const regiones = [...new Set(cubeData.map((item) => item.region))]
const meses = [...new Set(cubeData.map((item) => item.mes))]

// Valor máximo para normalización
const maxValor = Math.max(...cubeData.map((item) => item.valor))

// Componente para el cubo completo
function OlapCube({ data, showLabels, highlightMode, transparency, showGrid }) {
  // Tamaño del cubo
  const xSize = productos.length
  const ySize = regiones.length
  const zSize = meses.length

  return (
    <group>
      {/* Marco del cubo */}
      <group visible={showGrid}>
        {/* Líneas de la estructura del cubo */}
        <Line
          points={[
            [0, 0, 0],
            [xSize, 0, 0],
            [xSize, ySize, 0],
            [0, ySize, 0],
            [0, 0, 0],
          ]}
          color="black"
          lineWidth={1.5}
        />
        <Line
          points={[
            [0, 0, zSize],
            [xSize, 0, zSize],
            [xSize, ySize, zSize],
            [0, ySize, zSize],
            [0, 0, zSize],
          ]}
          color="black"
          lineWidth={1.5}
        />
        <Line
          points={[
            [0, 0, 0],
            [0, 0, zSize],
          ]}
          color="black"
          lineWidth={1.5}
        />
        <Line
          points={[
            [xSize, 0, 0],
            [xSize, 0, zSize],
          ]}
          color="black"
          lineWidth={1.5}
        />
        <Line
          points={[
            [xSize, ySize, 0],
            [xSize, ySize, zSize],
          ]}
          color="black"
          lineWidth={1.5}
        />
        <Line
          points={[
            [0, ySize, 0],
            [0, ySize, zSize],
          ]}
          color="black"
          lineWidth={1.5}
        />

        {/* Líneas de cuadrícula para cada dimensión */}
        {Array.from({ length: xSize + 1 }).map((_, i) => (
          <Line
            key={`grid-x-${i}`}
            points={[
              [i, 0, 0],
              [i, ySize, 0],
              [i, ySize, zSize],
              [i, 0, zSize],
            ]}
            color="gray"
            lineWidth={0.5}
          />
        ))}
        {Array.from({ length: ySize + 1 }).map((_, i) => (
          <Line
            key={`grid-y-${i}`}
            points={[
              [0, i, 0],
              [xSize, i, 0],
              [xSize, i, zSize],
              [0, i, zSize],
            ]}
            color="gray"
            lineWidth={0.5}
          />
        ))}
        {Array.from({ length: zSize + 1 }).map((_, i) => (
          <Line
            key={`grid-z-${i}`}
            points={[
              [0, 0, i],
              [xSize, 0, i],
              [xSize, ySize, i],
              [0, ySize, i],
            ]}
            color="gray"
            lineWidth={0.5}
          />
        ))}
      </group>

      {/* Celdas del cubo */}
      {data.map((item, index) => {
        // Normalizar el valor para el color
        const normalizedValue = item.valor / maxValor

        // Colores según el valor normalizado
        const color =
          highlightMode === "heat"
            ? `rgb(255, ${Math.floor(255 * (1 - normalizedValue))}, 0)`
            : `hsl(${210 + normalizedValue * 150}, 80%, 50%)`

        return (
          <group key={index} position={[item.x + 0.5, item.y + 0.5, item.z + 0.5]}>
            <mesh>
              <boxGeometry args={[0.9, 0.9, 0.9]} />
              <meshStandardMaterial
                color={color}
                transparent={true}
                opacity={transparency}
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
            {showLabels && (
              <Html distanceFactor={10} center>
                <div className="bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">{item.valor}</div>
              </Html>
            )}
          </group>
        )
      })}

      {/* Etiquetas de los ejes */}
      <group position={[xSize / 2, -1.2, -0.8]}>
        <Text fontSize={0.5} color="black" anchorX="center">
          Productos
        </Text>
      </group>
      <group position={[-1.8, ySize / 2, -0.8]}>
        <Text fontSize={0.5} color="black" rotation={[0, 0, Math.PI / 2]} anchorX="center">
          Regiones
        </Text>
      </group>
      <group position={[-0.8, -1.3, zSize / 2]}>
        <Text fontSize={0.5} color="black" rotation={[0, Math.PI / 2, 0]} anchorX="center">
          Meses
        </Text>
      </group>

      {/* Etiquetas de los valores en los ejes */}
      {productos.map((producto, index) => (
        <Text
          key={`x-${producto}`}
          position={[index + 0.5, -0.5, -0.5]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.3}
          color="black"
          anchorX="center"
          maxWidth={1}
        >
          {producto}
        </Text>
      ))}
      {regiones.map((region, index) => (
        <Text key={`y-${region}`} position={[-0.5, index + 0.5, -0.5]} fontSize={0.4} color="black" anchorX="center">
          {region}
        </Text>
      ))}
      {meses.map((mes, index) => (
        <Text key={`z-${mes}`} position={[-0.5, -0.5, index + 0.5]} fontSize={0.4} color="black" anchorX="center">
          {mes}
        </Text>
      ))}
    </group>
  )
}

// Componente para la tabla 2D
function SliceTable({ data, selectedProducto, selectedRegion, selectedMes }) {
  // Determinar qué dimensiones están filtradas y cuáles están libres
  const isProductoFiltered = selectedProducto !== "todos"
  const isRegionFiltered = selectedRegion !== "todos"
  const isMesFiltered = selectedMes !== "todos"

  // Contar cuántas dimensiones están filtradas
  const filteredDimensionsCount = (isProductoFiltered ? 1 : 0) + (isRegionFiltered ? 1 : 0) + (isMesFiltered ? 1 : 0)

  // Determinar las dimensiones para filas y columnas de la tabla
  let rowDimension = ""
  let colDimension = ""
  let rowValues = []
  let colValues = []

  if (filteredDimensionsCount === 0) {
    // Sin filtros: mostrar producto vs región (mes como páginas)
    rowDimension = "producto"
    colDimension = "region"
    rowValues = productos
    colValues = regiones
  } else if (filteredDimensionsCount === 1) {
    // Un filtro: las dos dimensiones no filtradas
    if (isProductoFiltered) {
      rowDimension = "region"
      colDimension = "mes"
      rowValues = regiones
      colValues = meses
    } else if (isRegionFiltered) {
      rowDimension = "producto"
      colDimension = "mes"
      rowValues = productos
      colValues = meses
    } else {
      // Mes filtrado
      rowDimension = "producto"
      colDimension = "region"
      rowValues = productos
      colValues = regiones
    }
  } else if (filteredDimensionsCount === 2) {
    // Dos filtros: la dimensión restante como filas, valores como columnas
    if (!isProductoFiltered) {
      rowDimension = "producto"
      colDimension = "valor"
      rowValues = productos
      colValues = ["Valor"]
    } else if (!isRegionFiltered) {
      rowDimension = "region"
      colDimension = "valor"
      rowValues = regiones
      colValues = ["Valor"]
    } else {
      // Mes no filtrado
      rowDimension = "mes"
      colDimension = "valor"
      rowValues = meses
      colValues = ["Valor"]
    }
  } else {
    // Tres filtros: solo mostrar el valor único
    rowDimension = "filtro"
    colDimension = "valor"
    rowValues = ["Valor"]
    colValues = ["Valor"]
  }

  // Función para obtener el valor de una celda
  const getCellValue = (row, col) => {
    let filteredItems = [...data]

    // Aplicar filtro de fila
    if (rowDimension === "producto") {
      filteredItems = filteredItems.filter((item) => item.producto === row)
    } else if (rowDimension === "region") {
      filteredItems = filteredItems.filter((item) => item.region === row)
    } else if (rowDimension === "mes") {
      filteredItems = filteredItems.filter((item) => item.mes === row)
    }

    // Aplicar filtro de columna
    if (colDimension === "producto") {
      filteredItems = filteredItems.filter((item) => item.producto === col)
    } else if (colDimension === "region") {
      filteredItems = filteredItems.filter((item) => item.region === col)
    } else if (colDimension === "mes") {
      filteredItems = filteredItems.filter((item) => item.mes === col)
    }

    // Si no hay datos, devolver "-"
    if (filteredItems.length === 0) return "-"

    // Si hay múltiples valores, calcular la suma
    if (filteredItems.length > 1) {
      return filteredItems.reduce((sum, item) => sum + item.valor, 0)
    }

    // Devolver el valor único
    return filteredItems[0].valor
  }

  // Determinar el título de la tabla
  let tableTitle = "Slice del Cubo OLAP"
  if (isProductoFiltered) tableTitle += ` - Producto: ${selectedProducto}`
  if (isRegionFiltered) tableTitle += ` - Región: ${selectedRegion}`
  if (isMesFiltered) tableTitle += ` - Mes: ${selectedMes}`

  // Determinar la descripción de la tabla
  let tableDescription = ""
  if (filteredDimensionsCount === 0) {
    tableDescription = "Mostrando todas las dimensiones (vista general)"
  } else if (filteredDimensionsCount === 1) {
    tableDescription = `Slice por ${isProductoFiltered ? "Producto" : isRegionFiltered ? "Región" : "Mes"}`
  } else if (filteredDimensionsCount === 2) {
    tableDescription = "Slice por dos dimensiones (vista de línea)"
  } else {
    tableDescription = "Slice por tres dimensiones (valor único)"
  }

  // Función para exportar datos a CSV
  const exportToCSV = () => {
    // Crear encabezados
    let csvContent = `${rowDimension.charAt(0).toUpperCase() + rowDimension.slice(1)},${colValues.join(",")}\n`

    // Añadir filas
    rowValues.forEach((row) => {
      const rowData = [row]
      colValues.forEach((col) => {
        rowData.push(getCellValue(row, col))
      })
      csvContent += rowData.join(",") + "\n"
    })

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `olap_slice_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{tableTitle}</CardTitle>
          <CardDescription>{tableDescription}</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={exportToCSV} className="flex items-center gap-1">
          <DownloadIcon className="h-4 w-4" />
          Exportar CSV
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            {filteredDimensionsCount === 3
              ? "Valor único seleccionado"
              : `Filas: ${rowDimension}, Columnas: ${colDimension}`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">
                {rowDimension.charAt(0).toUpperCase() + rowDimension.slice(1)}
              </TableHead>
              {colValues.map((col) => (
                <TableHead key={col} className="text-center">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowValues.map((row) => (
              <TableRow key={row}>
                <TableCell className="font-medium">{row}</TableCell>
                {colValues.map((col) => (
                  <TableCell key={col} className="text-center">
                    {colDimension === "valor" ? (
                      <span className="font-semibold">{getCellValue(row, col)}</span>
                    ) : (
                      getCellValue(row, col)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Componente principal
export default function OlapCubeVisualization() {
  const [filteredData, setFilteredData] = useState(cubeData)
  const [showLabels, setShowLabels] = useState(true)
  const [highlightMode, setHighlightMode] = useState("color")
  const [selectedProducto, setSelectedProducto] = useState("todos")
  const [selectedRegion, setSelectedRegion] = useState("todos")
  const [selectedMes, setSelectedMes] = useState("todos")
  const [transparency, setTransparency] = useState(0.7)
  const [showGrid, setShowGrid] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [activeView, setActiveView] = useState("cube")

  // Función para filtrar datos
  const filterData = () => {
    let result = [...cubeData]

    if (selectedProducto !== "todos") {
      result = result.filter((item) => item.producto === selectedProducto)
    }

    if (selectedRegion !== "todos") {
      result = result.filter((item) => item.region === selectedRegion)
    }

    if (selectedMes !== "todos") {
      result = result.filter((item) => item.mes === selectedMes)
    }

    setFilteredData(result)
  }

  // Función para resetear filtros
  const resetFilters = () => {
    setSelectedProducto("todos")
    setSelectedRegion("todos")
    setSelectedMes("todos")
    setFilteredData(cubeData)
  }

  // Aplicar filtros cuando cambian las selecciones
  useEffect(() => {
    filterData()
  }, [selectedProducto, selectedRegion, selectedMes])

  return (
    <div className="w-full h-screen flex flex-col">
      <Card>
        <CardHeader className="p-2">
          <CardDescription>Grupo 1 - Enzo Cazenave - Lautaro García - Ivan Daza - Ignacio Costantini - Bautista Castro - Tomas Giardina - Juan Ignacio Dominguez</CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-1">
        <div className="w-3/4 relative bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
          <div className="p-2 border-b">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="cube" className="flex items-center">
                  <CubeIcon className="h-4 w-4 mr-2" /> Vista 3D del Cubo
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center">
                  <TableIcon className="h-4 w-4 mr-2" /> Tabla 2D del Slice
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 mt-2">
                <TabsContent value="cube" className="h-[calc(100vh-180px)] m-0 p-0 data-[state=active]:flex">
                  <Canvas camera={{ position: [8, 5, 8], fov: 50 }} className="w-full h-full">
                    <ambientLight intensity={0.7} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    {/* Cubo OLAP */}
                    <OlapCube
                      data={filteredData}
                      showLabels={showLabels}
                      highlightMode={highlightMode}
                      transparency={transparency}
                      showGrid={showGrid}
                    />

                    {/* Controles de cámara */}
                    <OrbitControls
                      enableZoom={true}
                      enablePan={true}
                      enableRotate={true}
                      minDistance={3}
                      maxDistance={20}
                      target={[productos.length / 2, regiones.length / 2, meses.length / 2]}
                    />
                  </Canvas>

                  {/* Leyenda de colores */}
                  <div className="absolute bottom-4 right-4 bg-white/80 p-3 rounded-lg shadow-md">
                    <h3 className="text-sm font-semibold mb-2">Leyenda de Valores</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-full h-6 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <div className="flex justify-between w-full text-xs">
                        <span>Bajo</span>
                        <span>Alto</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="table" className="h-[calc(100vh-180px)] m-0 p-4 overflow-auto">
                  <SliceTable
                    data={filteredData}
                    selectedProducto={selectedProducto}
                    selectedRegion={selectedRegion}
                    selectedMes={selectedMes}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        <div className="w-1/4 p-4 bg-gray-50 overflow-y-auto">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Filtros de Dimensiones</CardTitle>
              <CardDescription>Selecciona valores para filtrar el cubo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="producto">Producto (Eje X)</Label>
                <Select value={selectedProducto} onValueChange={setSelectedProducto}>
                  <SelectTrigger id="producto">
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {productos.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Región (Eje Y)</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Seleccionar región" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    {regiones.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mes">Mes (Eje Z)</Label>
                <Select value={selectedMes} onValueChange={setSelectedMes}>
                  <SelectTrigger id="mes">
                    <SelectValue placeholder="Seleccionar mes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {meses.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={resetFilters} variant="outline" className="w-full">
                Resetear Filtros
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Opciones de Visualización</CardTitle>
              <CardDescription>Ajusta cómo se muestra el cubo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-labels">Mostrar Valores</Label>
                <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-grid">Mostrar Estructura</Label>
                <Switch id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
              </div>

              <div className="space-y-2">
                <Label>Transparencia de Celdas</Label>
                <Slider
                  value={[transparency * 100]}
                  min={10}
                  max={100}
                  step={10}
                  onValueChange={(value) => setTransparency(value[0] / 100)}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Transparente</span>
                  <span>Opaco</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Modo de Coloración</Label>
                <Select value={highlightMode} onValueChange={setHighlightMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Modo de coloración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="color">Gradiente Azul-Púrpura</SelectItem>
                    <SelectItem value="heat">Mapa de Calor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
