import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = import.meta.env.VITE_API_URL;

interface AddCopyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sachId: number;
  onCreated: (newCopy: any) => void;
}

export const AddCopyDialog = ({
  open,
  onOpenChange,
  sachId,
  onCreated,
}: AddCopyDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    ma_vach: "",
    trang_thai: "AVAILABLE",
    ngay_mua: "",
    gia_tri: "",
    ke_sach: ""
  });

  const handleSubmit = async () => {
    if (!form.ma_vach || !form.ngay_mua) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/copy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sach_id: sachId,
          ...form,
        }),
      });

      if (res.status === 401) {
        alert("Phiên đăng nhập đã hết hạn");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Không thể thêm bản sao");
      }

      const createdCopy = await res.json();
      onCreated(createdCopy);

      setForm({ ma_vach: "", trang_thai: "AVAILABLE", ngay_mua: "", gia_tri: "", ke_sach: "" });
      onOpenChange(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Thêm bản sao</DialogTitle>
        </DialogHeader>

        {/* Mã vạch */}
        <div className="space-y-2">
          <Label>Mã vạch</Label>
          <Input
            value={form.ma_vach}
            onChange={(e) =>
              setForm({ ...form, ma_vach: e.target.value })
            }
          />
        </div>

        {/* Trạng thái */}
        <div className="space-y-2">
          <Label>Trạng thái</Label>
          <select
            className="w-full border rounded-md px-3 py-2"
            value={form.trang_thai}
            onChange={(e) =>
              setForm({ ...form, trang_thai: e.target.value })
            }
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
            <option value="DAMAGED">DAMAGED</option>
          </select>
        </div>

        {/* Ngày mua */}
        <div className="space-y-2">
          <Label>Ngày mua</Label>
          <Input
            type="date"
            value={form.ngay_mua}
            onChange={(e) =>
              setForm({ ...form, ngay_mua: e.target.value })
            }
          />
        </div>

        {/* Giá trị */}
        <div className="space-y-2">
          <Label>Giá trị (VNĐ)</Label>
          <Input
            type="number"
            placeholder="Ví dụ: 50000"
            value={form.gia_tri}
            onChange={(e) =>
              setForm({ ...form, gia_tri: e.target.value })
            }
          />
        </div>
        
        {/* Kệ sách */}
        <div className="space-y-2">
          <Label>Kệ sách</Label>
          <Input
            placeholder="Ví dụ: Kệ A3"
            value={form.ke_sach}
            onChange={(e) =>
              setForm({ ...form, ke_sach: e.target.value })
            }
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? "Đang thêm..." : "Thêm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
