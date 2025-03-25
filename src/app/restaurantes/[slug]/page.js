"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { CalendarIcon, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z
    .string()
    .min(10, { message: "Por favor, insira um número de telefone válido." }),
  date: z.date({ required_error: "Por favor, selecione uma data." }),
  time: z.string({ required_error: "Por favor, selecione um horário." }),
  guests: z.string({
    required_error: "Por favor, selecione o número de convidados.",
  }),
  specialRequests: z.string().optional(),
});

const dadosRestaurantes = {
  "vila-sabor": {
    nome: "Restaurante Vila Sabor & Arte",
    descricao:
      "Uma experiência gastronômica única com sabores autênticos em um ambiente elegante e acolhedor.",
    culinaria:
      "pratos contemporâneos com influências da culinária mediterrânea e brasileira",
    endereco: "Rua das Violetas, 123 - Jardim Botânico, São Paulo, SP",
  },
};

export default function RestaurantReservation() {
  const { slug } = useParams();
  const restaurante = dadosRestaurantes[slug];
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  function onSubmit(values) {
    fetch("/api/reserva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        restaurante: slug,
        date: new Date(values.date), // transforma string para Date real
        guests: parseInt(values.guests), // caso esteja como string
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Reserva enviada:", data);
        setIsSubmitted(true);
      })
      .catch((err) => console.error("Erro ao enviar reserva:", err));
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
              {restaurante.nome}
            </h1>
            <p className="text-lg text-purple-600 max-w-2xl mx-auto">
              {restaurante.descricao}
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
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden h-48 bg-purple-200" />

                    <div>
                      <h3 className="text-lg font-medium text-purple-800 mb-2">
                        Nossa Culinária
                      </h3>
                      <p className="text-gray-600">
                        Oferecemos uma seleção de {restaurante.culinaria},
                        preparados com ingredientes frescos e sazonais.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-purple-800 mb-2">
                        Horário de Funcionamento
                      </h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>Segunda a Quinta: 18:00 - 22:30</li>
                        <li>Sexta e Sábado: 18:00 - 23:30</li>
                        <li>Domingo: 18:00 - 22:00</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-purple-800 mb-2">
                        Localização
                      </h3>
                      <p className="text-gray-600">{restaurante.endereco}</p>
                    </div>
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
                        <FormField
                          control={form.control}
                          name="name"
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
                        <FormField
                          control={form.control}
                          name="email"
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
                        <FormField
                          control={form.control}
                          name="phone"
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
                        <FormField
                          control={form.control}
                          name="date"
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
                        <FormField
                          control={form.control}
                          name="time"
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
                        <FormField
                          control={form.control}
                          name="guests"
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
                        <FormField
                          control={form.control}
                          name="specialRequests"
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
