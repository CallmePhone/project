'use client';

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useUser } from "@clerk/nextjs";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Vehicles() {
  const { user } = useUser();

  const [formData, setFormData] = useState<any>({
    vehicleType: "",
    vehicleName: "",
    vehicleModel: "",
    vehicleYear: "",
    imageFile: null,
  });

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingVehicle, setEditingVehicle] = useState<any | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data, error } = await supabase.from("vehicles").select("*");
      if (!error) setVehicles(data || []);
      setIsLoading(false);
    };
    fetchData();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">
        กำลังโหลดข้อมูลรถผู้ใช้งาน...
      </p>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (e.target.type === "file") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openAddForm = () => {
    setFormData({ vehicleType: "", vehicleName: "", vehicleModel: "", vehicleYear: "", imageFile: null });
    setEditingVehicle(null);
    setShowAddForm(true);
  };

  const openEditForm = (vehicle: any) => {
    setFormData({
      vehicleType: vehicle.vehicle_type,
      vehicleName: vehicle.vehicle_name,
      vehicleModel: vehicle.vehicle_model,
      vehicleYear: vehicle.vehicle_year,
      imageFile: null,
    });
    setEditingVehicle(vehicle);
    setShowAddForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { vehicleType, vehicleName, vehicleModel, vehicleYear, imageFile } = formData;
    if (!vehicleType || !vehicleName || !vehicleModel || !vehicleYear) {
      alert("Please fill in all required fields.");
      return;
    }

    let imageUrl = editingVehicle?.vehicle_image || "";

    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = `public/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("vehicle-images").upload(filePath, imageFile);

      if (uploadError) {
        alert("❌ Image upload failed: " + uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage.from("vehicle-images").getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }

    if (editingVehicle) {
      const { data, error } = await supabase
        .from("vehicles")
        .update({
          vehicle_type: vehicleType,
          vehicle_name: vehicleName,
          vehicle_model: vehicleModel,
          vehicle_year: vehicleYear,
          vehicle_image: imageUrl
        })
        .eq("id", editingVehicle.id)
        .select();

      if (!error && data) {
        setVehicles(prev => prev.map(v => (v.id === editingVehicle.id ? data[0] : v)));
        alert("✏️ Vehicle updated.");
      }
    } else {
      const { data, error } = await supabase
        .from("vehicles")
        .insert([{
          vehicle_type: vehicleType,
          vehicle_name: vehicleName,
          vehicle_model: vehicleModel,
          vehicle_year: vehicleYear,
          vehicle_image: imageUrl
        }])
        .select();

      if (!error && data) {
        setVehicles(prev => [...prev, ...data]);
        alert("✅ Vehicle added.");
      }
    }

    setShowAddForm(false);
    setEditingVehicle(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (!error) {
      setVehicles(prev => prev.filter(v => v.id !== id));
      alert("🗑️ Vehicle deleted.");
    }
  };

  const filteredVehicles = vehicles.filter(v =>
    v.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />

      <div className="pt-24 px-6 sm:px-12 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            🚗 รายการรถของ {user.firstName}
          </h1>

          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="🔍 Search รายการรถ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="text-center">
            <button
              onClick={openAddForm}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition cursor-pointer"
            >
              ➕ Add Vehicle
            </button>
          </div>

          {isLoading ? (
            <p className="text-center text-gray-500 text-lg">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedVehicles.map(v => (
                <div key={v.id} className="bg-white p-4 rounded shadow">
                  {v.vehicle_image && (
                    <img
                      src={v.vehicle_image}
                      alt={v.vehicle_name}
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                  <h2 className="text-lg font-bold mt-2">
                    {v.vehicle_name} ({v.vehicle_model})
                  </h2>
                  <p>📛 Type: {v.vehicle_type}</p>
                  <p>📅 Year: {v.vehicle_year}</p>
                  <div className="mt-2 flex justify-between">
                    <button onClick={() => openEditForm(v)} className="text-indigo-600 hover:underline text-sm cursor-pointer">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(v.id)} className="text-red-600 hover:underline text-sm cursor-pointer">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingVehicle(null);
              }}
              className="absolute top-3 right-4 text-2xl text-red-600 hover:text-orange-500 cursor-pointer"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-center text-indigo-700 mb-4 cursor-pointer">
              {editingVehicle ? "✏️ Edit Vehicle" : "➕ Add Vehicle"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
              </select>

              <input
                type="text"
                name="vehicleName"
                placeholder="Vehicle Name"
                value={formData.vehicleName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                name="vehicleModel"
                placeholder="Model"
                value={formData.vehicleModel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="number"
                name="vehicleYear"
                placeholder="Year"
                value={formData.vehicleYear}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full cursor-pointer"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 cursor-pointer"
              >
                ✅ {editingVehicle ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
