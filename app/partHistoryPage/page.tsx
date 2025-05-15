'use client'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PartHistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('parts')
        .select(`
          id,
          part_name,
          brand,
          price,
          replaced_at,
          vehicle_id,
          vehicles (
            id,
            vehicle_name,
            vehicle_type,
            vehicle_image
          )
        `)

      if (error) setError(error.message)
      else {
        // จัดกลุ่มข้อมูลตาม vehicle_id
        const grouped = data.reduce((acc: any, part: any) => {
          const vId = part.vehicle_id
          if (!acc[vId]) {
            acc[vId] = {
              ...part.vehicles,
              total: 0,
              parts: []
            }
          }
          acc[vId].total += part.price
          acc[vId].parts.push(part)
          return acc
        }, {})

        setHistory(Object.values(grouped))
      }
    }

    fetchHistory()
  }, [])

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">📜 ประวัติการเปลี่ยนอะไหล่</h1>
        {error && <p className="text-red-500 text-center mb-4">🚫 {error}</p>}

        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                {item.vehicle_image && (
                  <img
                    src={item.vehicle_image}
                    alt={item.vehicle_name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold mb-1">{item.vehicle_name}</h2>
                <p className="text-gray-600 mb-2"><strong>ประเภทรถ:</strong> {item.vehicle_type}</p>
                <p className="text-green-600 font-bold mb-2">💸 รวมค่าอะไหล่: {item.total.toLocaleString()} บาท</p>

                <h3 className="text-sm font-semibold mb-1 text-gray-700">🔧 รายการอะไหล่:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {item.parts.map((part: any) => (
                    <li key={part.id} className="border-b pb-1">
                      <span className="font-medium">{part.part_name}</span> ({part.brand}) - {part.price.toLocaleString()} บาท
                      <div className="text-xs text-gray-500">📅 {new Date(part.replaced_at).toLocaleDateString()}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">ไม่มีข้อมูลประวัติการเปลี่ยนอะไหล่</p>
        )}
      </div>
      <Footer />
    </>
  )
}
