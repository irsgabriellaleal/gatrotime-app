"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function EditarReservaDialog({ reserva, onClose, onSave }) {
  const [reservaEditada, setReservaEditada] = useState({
    dataReserva: reserva.dataReserva?.split("T")[0] || "",
    horario: reserva.horario || "",
    pessoas: reserva.pessoas || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservaEditada((prev) => ({
      ...prev,
      [name]: name === "pessoas" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/reserva/${reserva.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaEditada),
      });

      if (!response.ok) throw new Error("Erro ao atualizar reserva");

      const data = await response.json();
      onSave(data); // ← Atualiza o histórico com o novo dado
    } catch (error) {
      console.error("Erro ao atualizar reserva:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-purple-900">Editar Reserva</DialogTitle>
          <DialogDescription className="text-purple-700">
            Altere os detalhes da sua reserva.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="dataReserva"
              className="text-purple-800 flex items-center gap-2"
            >
              <Calendar className="h-4 w-4 text-purple-600" />
              Data
            </Label>
            <Input
              type="date"
              id="dataReserva"
              name="dataReserva"
              value={reservaEditada.dataReserva}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="horario"
              className="text-purple-800 flex items-center gap-2"
            >
              <Clock className="h-4 w-4 text-purple-600" />
              Hora
            </Label>
            <Input
              type="time"
              id="horario"
              name="horario"
              value={reservaEditada.horario}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pessoas"
              className="text-purple-800 flex items-center gap-2"
            >
              <Users className="h-4 w-4 text-purple-600" />
              Número de Pessoas
            </Label>
            <Input
              id="pessoas"
              name="pessoas"
              type="number"
              min="1"
              value={reservaEditada.pessoas}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="endereco"
              className="text-purple-800 flex items-center gap-2"
            >
              <MapPin className="h-4 w-4 text-purple-600" />
              Endereço (visualização apenas)
            </Label>
            <Input
              id="endereco"
              value={reserva.restaurant?.location || "Endereço não disponível"}
              disabled
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 text-white">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
