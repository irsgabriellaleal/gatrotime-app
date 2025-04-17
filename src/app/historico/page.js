"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditarReservaDialog from "./editar-reserva-dialog";
import CancelarReservaDialog from "./cancelar-reserva-dialog";

export default function HistoricoReservas() {
  const { data: session, status } = useSession();
  const [reservas, setReservas] = useState([]);
  const [editar, setEditar] = useState(null);
  const [cancelar, setCancelar] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/reservas?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setReservas(data))
        .catch((err) => console.error("Erro ao carregar reservas:", err));
    }
  }, [session?.user?.id]);

  if (status === "loading") {
    return <div className="p-10">Carregando...</div>;
  }

  if (!session) {
    return (
      <div className="p-10 text-center text-purple-700">
        Você precisa estar logado para ver seu histórico de reservas.
      </div>
    );
  }

  const statusBadge = {
    confirmada: "bg-green-500",
    pendente: "bg-yellow-500",
    cancelada: "bg-red-500",
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
        Histórico de Reservas
      </h1>

      {reservas.length === 0 ? (
        <p className="text-center text-purple-600">
          Nenhuma reserva encontrada.
        </p>
      ) : (
        reservas.map((reserva) => (
          <Card key={reserva.id} className="mb-6 bg-purple-50">
            <CardHeader className="flex justify-between items-start bg-purple-100">
              <div>
                <CardTitle className="text-lg text-purple-900">
                  {reserva.restaurant?.name || "Reserva"}
                </CardTitle>
              </div>
              <Badge
                className={`${
                  statusBadge[reserva.status] || "bg-gray-500"
                } text-white`}
              >
                {reserva.status?.charAt(0).toUpperCase() +
                  reserva.status?.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="flex items-center gap-2 text-purple-800">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>
                  Data:{" "}
                  {reserva.dataReserva
                    ? new Date(reserva.dataReserva).toLocaleDateString()
                    : "Indefinida"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-purple-800">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>Hora: {reserva.horario || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-800">
                <Users className="h-5 w-5 text-purple-600" />
                <span>
                  Pessoas:{" "}
                  {Number.isNaN(reserva.pessoas) ? "N/A" : reserva.pessoas}
                </span>
              </div>
              <div className="flex items-center gap-2 text-purple-800">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span>
                  Local: {reserva.restaurant?.location || "Não informado"}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 bg-purple-100">
              {reserva.status !== "cancelada" && (
                <>
                  <Button
                    variant="outline"
                    className="border-purple-400 text-purple-700 hover:bg-purple-100"
                    onClick={() => setEditar(reserva)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Editar
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => setCancelar(reserva)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Cancelar
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))
      )}

      {editar && (
        <EditarReservaDialog
          reserva={editar}
          onClose={() => setEditar(null)}
          onSave={(nova) => {
            setReservas((r) => r.map((x) => (x.id === nova.id ? nova : x)));
            setEditar(null);
          }}
        />
      )}
      {cancelar && (
        <CancelarReservaDialog
          reserva={cancelar}
          onClose={() => setCancelar(null)}
          onConfirm={() => {
            setReservas((r) =>
              r.map((x) =>
                x.id === cancelar.id ? { ...x, status: "cancelada" } : x
              )
            );
            setCancelar(null);
          }}
        />
      )}
    </div>
  );
}
