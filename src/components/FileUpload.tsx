"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    setUploading(true);
    try {
      // ১. সুপাবেজ স্টোরেজে ফাইল আপলোড
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `reports/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('medical-reports')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // ২. ফাইলের পাবলিক ইউআরএল নেওয়া
      const { data: { publicUrl } } = supabase.storage
        .from('medical-reports')
        .getPublicUrl(filePath);

      // ৩. আমাদের ডাটাবেসে (Prisma) ফাইলের তথ্য সেভ করা
      await axios.post("/api/vault", {
        fileName: file.name,
        fileUrl: publicUrl,
      });

      alert("File uploaded and saved to vault!");
      window.location.reload(); // পেজ রিফ্রেশ করে আপডেট দেখা
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border-2 border-dashed border-blue-200 rounded-lg text-center">
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Confirm Upload"}
      </button>
    </div>
  );
}