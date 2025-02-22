"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import { FormCalendar } from "../formCalendar/formCalendar";
import { EventList } from "../EventList/eventList";
import "./myCalendar.css";
import { User } from "@/types/user";

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

// Função para carregar eventos do localStorage
const loadEventsFromLocalStorage = (userId: string): Event[] => {
  const storedEvents = localStorage.getItem(`eventArray_${userId}`);
  if (storedEvents) {
    return JSON.parse(storedEvents).map((event: Event) => ({
      ...event,
      date: new Date(event.date),
    }));
  }
  return createMockEvents();
};

interface MyCalendarProps {
  currentUser: User;
}

export const MyCalendar: React.FC<MyCalendarProps> = ({ currentUser }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>(loadEventsFromLocalStorage(currentUser.id.toString()));
  const [showForm, setShowForm] = useState<boolean>(false);

  // Manipula a mudança de data no calendário
  const handleDateChange = (value: Date | Date[] | [Date, Date] | null) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else {
      setSelectedDate(value && Array.isArray(value) && value[0] ? value[0] : null); // Se for um array, pega a primeira data
    }
  };

  // Verifica se tem evento nessa data
  const isDateWithEvent = (date: Date) => events.some((event) => event.date.toDateString() === date.toDateString());

  // Função para adicionar novos eventos ao state
  const handleAddEvent = (title: string, description: string) => {
    if (selectedDate) {
      const newEvent = {
        id: (events.length + 1).toString(),
        date: selectedDate,
        title,
        description,
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents); // Adiciona o novo evento ao array dos eventos bolados
      localStorage.setItem(`eventArray_${currentUser.id}`, JSON.stringify(updatedEvents));
      console.log(updatedEvents);
      console.log(localStorage.getItem(`eventArray_${currentUser.id}`));
      setShowForm(false); // Fecha o formulário após adicionar o evento bolado
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