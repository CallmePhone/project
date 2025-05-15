'use client'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<any[]>([])
    const [parts, setParts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null)
    const [partName, setPartName] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [replacedAt, setReplacedAt] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        const fetchVehicles = async () => {
            const { data, error } = await supabase.from('vehicles').select('*')
            if (error) setError(error.message)
            else setVehicles(data || [])
        }
        fetchVehicles()
    }, [])

    const fetchParts = async (vehicleId: string) => {
        const { data, error } = await supabase
            .from('parts')
            .select('id, part_name, brand, price, replaced_at, vehicles(vehicle_name)')
            .eq('vehicle_id', vehicleId)
        if (error) setError(error.message)
        else setParts(data || [])
    }

    const handleAddPart = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedVehicle) return

        const { error } = await supabase.from('parts').insert([{
            vehicle_id: selectedVehicle.id,
            part_name: partName,
            brand,
            price: parseFloat(price),
            replaced_at: replacedAt,
        }])

        if (error) {
            alert('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูลอะไหล่: ' + error.message)
        } else {
            setSuccessMessage('✅ บันทึกข้อมูลอะไหล่สำเร็จ!')
            setPartName('')
            setBrand('')
            setPrice('')
            setReplacedAt('')
            fetchParts(selectedVehicle.id)
            setTimeout(() => setSuccessMessage(''), 3000)
        }
    }

    const handleDeletePart = async (id: string) => {
        const confirmed = confirm('คุณแน่ใจหรือไม่ว่าต้องการลบอะไหล่นี้?')
        if (!confirmed) return

        const { error } = await supabase.from('parts').delete().eq('id', id)

        if (error) {
            alert('❌ เกิดข้อผิดพลาดในการลบข้อมูลอะไหล่: ' + error.message)
        } else {
            setSuccessMessage('✅ ลบข้อมูลอะไหล่สำเร็จ!')
            fetchParts(selectedVehicle.id)
            setTimeout(() => setSuccessMessage(''), 3000)
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    🚘 Vehicles & Parts Management
                </h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Vehicles List */}
                    <div className="md:col-span-2">
                        {error ? (
                            <p className="text-red-500 text-center mt-6">🚫 Error: {error}</p>
                        ) : vehicles.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {vehicles.map(vehicle => (
                                    <div
                                        key={vehicle.id}
                                        onClick={() => {
                                            setSelectedVehicle(selectedVehicle?.id === vehicle.id ? null : vehicle)
                                            fetchParts(vehicle.id)
                                        }}
                                        className={`cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow ${selectedVehicle?.id === vehicle.id ? 'ring-2 ring-green-500' : ''}`}
                                    >
                                        {vehicle.vehicle_image && (
                                            <img
                                                src={vehicle.vehicle_image}
                                                alt={vehicle.vehicle_name}
                                                className="w-full h-40 object-cover rounded mb-4"
                                            />
                                        )}
                                        <h2 className="text-xl font-semibold mb-2">
                                            {vehicle.vehicle_name}
                                        </h2>
                                        <p className="text-gray-600">
                                            <strong>Type:</strong> {vehicle.vehicle_type}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No vehicles found.</p>
                        )}
                    </div>

                    {/* Parts Form */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">🔧 เพิ่มข้อมูลอะไหล่</h2>

                        {selectedVehicle ? (
                            <>
                                <p className="text-sm mb-4 text-gray-700">
                                    🚗 <strong>{selectedVehicle.vehicle_name}</strong> ({selectedVehicle.vehicle_type})
                                </p>

                                {successMessage && (
                                    <p className="text-green-600 text-sm mb-2">{successMessage}</p>
                                )}

                                <form onSubmit={handleAddPart} className="space-y-4">
                                    <div>
                                        <label className="block font-medium">ชื่ออะไหล่</label>
                                        <input
                                            type="text"
                                            className="w-full border p-2 rounded"
                                            placeholder="เช่น แบตเตอรี่, ยาง"
                                            value={partName}
                                            onChange={(e) => setPartName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium">ยี่ห้อ</label>
                                        <input
                                            type="text"
                                            className="w-full border p-2 rounded"
                                            placeholder="เช่น GS, Michelin"
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium">ราคาประมาณ (บาท)</label>
                                        <input
                                            type="number"
                                            className="w-full border p-2 rounded"
                                            placeholder="เช่น 2500"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium">เปลี่ยน ณ วันที่</label>
                                        <input
                                            type="date"
                                            className="w-full border p-2 rounded"
                                            value={replacedAt}
                                            onChange={(e) => setReplacedAt(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                                    >
                                        ✅ บันทึกข้อมูล
                                    </button>
                                </form>

                                {/* Parts List */}
                                {/* <div className="mt-6"> */}
                                    {/* <h3 className="text-lg font-semibold mb-2">รายการอะไหล่</h3> */}
                                    {/* {parts.length > 0 ? (
                                        <ul>
                                            {parts.map((part) => (
                                                <li key={part.id} className="flex justify-between items-center mb-3">
                                                    <div>
                                                        <p className="font-semibold">{part.part_name}</p>
                                                        <p>{part.brand} - {part.price} บาท</p>
                                                        <p className="text-sm text-gray-500">
                                                            📅 เปลี่ยนเมื่อ: {part.replaced_at ? new Date(part.replaced_at).toLocaleDateString() : 'ไม่ระบุ'}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => {
                                                                setPartName(part.part_name)
                                                                setBrand(part.brand)
                                                                setPrice(part.price.toString())
                                                                setReplacedAt(part.replaced_at?.split('T')[0] || '')
                                                            }}
                                                            className="text-blue-500 cursor-pointer"
                                                        >
                                                            ✏️ แก้ไข
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePart(part.id)}
                                                            className="text-red-500 cursor-pointer"
                                                        >
                                                            🗑️ ลบ
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">ยังไม่มีอะไหล่ในรถนี้</p>
                                    )} */}
                                {/* </div> */}
                            </>
                        ) : (
                            <p className="text-gray-500">👈 กรุณาเลือกรถจากรายการด้านซ้ายก่อน</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
