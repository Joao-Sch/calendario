"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import { FormCalendar } from "../formCalendar/formCalendar";
import { EventList } from "../EventList/eventList";
import "./myCalendar.css";

export type Event = {
  id: string;
  date: Date;
  title: string;
  description: string;
};

// Função para criar eventos mock com datas válidas
const createMockEvents = (): Event[] => [
  { id: "1", date: new Date(2025, 1, 21), title: "Evento 1", description: "Descrição do Evento 1" },
  { id: "2", date: new Date(2025, 1, 22), title: "Evento 2", description: "Descrição do Evento 2" },
  { id: "3", date: new Date(2025, 1, 23), title: "Evento 3", description: "Descrição do Evento 3" },
  { id: "4", date: new Date(2025, 1, 24), title: "Evento 4", description: "Descrição do Evento 4" },
];

export const MyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>(createMockEvents());
  const [showForm, setShowForm] = useState<boolean>(false);

  // Manipula a mudança de data no calendário
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDateChange = (value: Date | Date[] | [Date, Date] | null, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else {
      setSelectedDate(value && Array.isArray(value) && value[0] ? value[0] : null); // Se for um array, pega a primeira data
    }
  };

  // Verifica se uma data tem evento
  const isDateWithEvent = (date: Date) => events.some((event) => event.date.toDateString() === date.toDateString());

  // Função para adicionar novos eventos ao estado
  const handleAddEvent = (title: string, description: string) => {
    if (selectedDate) {
      const newEvent = {
        id: (events.length + 1).toString(),
        date: selectedDate,
        title,
        description,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]); // Adiciona o novo evento ao array dos eventos bolados
      localStorage.setItem("eventArray", JSON.stringify(events))
      console.log(events);
      console.log(localStorage.getItem("eventArray"));
      setShowForm(false); // Fecha o formulário após adicionar oevento bolado
    }
  };

  return (
    <div className="calendar-container">
      <h1>Meu Calendário</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date }) => isDateWithEvent(date) && <div className="event-pointer"></div>}
      />
      <div className="Form-toggle">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "Adicionar Evento"}
        </button>
      </div>
      {showForm && <FormCalendar handleAddEvent={handleAddEvent} />}
      <EventList events={events.filter((event) => event.date.toDateString() === selectedDate?.toDateString())} />
    </div>
  );
};
