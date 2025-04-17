"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react"; // 👈 necessário para pegar o user logado

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.date(),
  time: z.string(),
  guests: z.string(),
  specialRequests: z.string().optional(),
});

export default function RestaurantReservation() {
  const searchParams = useSearchParams();
  const restauranteId = searchParams.get("restauranteId");
  const { data: session } = useSession(); // ✅ pega o user logado
  console.log("ID do usuário logado:", session?.user?.id);

  const [restaurante, setRestaurante] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const availableTimes = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  useEffect(() => {
    if (restauranteId) {
      fetch(`/api/restaurante/${restauranteId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar restaurante");
          return res.json();
        })
        .then((data) => {
          setRestaurante(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setRestaurante(null);
          setLoading(false);
        });
    }
  }, [restauranteId]);

  function onSubmit(values) {
    const payload = {
      ...values,
      restauranteId: restauranteId || "",
      userId: session?.user?.id, // 👈 importante!
      date: new Date(values.date),
      guests: parseInt(values.guests),
    };

    console.log("Enviando payload da reserva:", payload);

    fetch("/api/reserva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => setIsSubmitted(true))
      .catch((err) => console.error("Erro ao enviar reserva:", err));
  }

  if (loading) {
    return <div className="p-10">Carregando...</div>;
  }

  if (!restaurante) {
    return <div className="p-10 text-red-500">Restaurante não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">
              {restaurante.name}
            </h1>
            <p className="text-lg text-purple-600 max-w-2xl mx-auto">
              {restaurante.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="order-2 md:order-1">
              <Card className="border-purple-200 shadow-md">
                <CardHeader className="bg-purple-100 border-b border-purple-200">
                  <CardTitle className="text-purple-800">
                    Sobre o Restaurante
                  </CardTitle>
                  <CardDescription>
                    Conheça nossa história e culinária
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="rounded-lg overflow-hidden h-48 bg-purple-200" />
                  <div>
                    <h3 className="text-lg font-medium text-purple-800 mb-2">
                      Tipo de Culinária
                    </h3>
                    <p className="text-gray-600">{restaurante.tipoCozinha}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-800 mb-2">
                      Localização
                    </h3>
                    <p className="text-gray-600">{restaurante.cidade}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="order-1 md:order-2">
              {!isSubmitted ? (
                <Card className="border-purple-200 shadow-md">
                  <CardHeader className="bg-purple-100 border-b border-purple-200">
                    <CardTitle className="text-purple-800">
                      Faça sua Reserva
                    </CardTitle>
                    <CardDescription>
                      Preencha o formulário para reservar sua mesa
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        {/* Nome */}
                        <FormField
                          name="name"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email */}
                        <FormField
                          name="email"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Telefone */}
                        <FormField
                          name="phone"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="(11) 99999-9999"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Data */}
                        <FormField
                          name="date"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Data</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? format(field.value, "PPP", {
                                            locale: ptBR,
                                          })
                                        : "Selecione uma data"}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Horário */}
                        <FormField
                          name="time"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Horário</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o horário" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableTimes.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Pessoas */}
                        <FormField
                          name="guests"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pessoas</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Número de pessoas"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Solicitações */}
                        <FormField
                          name="specialRequests"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Solicitações especiais</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Ex: alergias, preferências..."
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Botão */}
                        <Button
                          type="submit"
                          className="w-full bg-purple-700 text-white"
                        >
                          Confirmar Reserva
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-purple-200 shadow-md">
                  <CardHeader className="bg-purple-100 border-b border-purple-200">
                    <CardTitle className="text-purple-800">
                      Reserva Confirmada!
                    </CardTitle>
                    <CardDescription>
                      Sua reserva foi realizada com sucesso 🎉
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 text-center space-y-4">
                    <p className="text-purple-700">
                      Entraremos em contato pelo e-mail informado para confirmar
                      os detalhes.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false);
                        form.reset();
                      }}
                      className="text-purple-700 border-purple-300 hover:bg-purple-50"
                    >
                      Fazer outra reserva
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
