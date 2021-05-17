import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import { Line, LineChart, XAxis, YAxis } from "recharts"

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
})

function GraphicCpu() {
  const [data, setData] = useState([])

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    socket.on("cpu", (cpuPercent) => {
      setData((currentData) => [...currentData, cpuPercent])
    })
  }, [])

  return (
    <div>
      <h1>real time CPU</h1>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  )
}

export default GraphicCpu
