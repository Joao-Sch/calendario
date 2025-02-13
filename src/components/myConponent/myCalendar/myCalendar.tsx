"use client";

import React, { useEffect, useState } from "react";
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

type EventType = {
  id: string;
  title: string;
  description: string;
  date: string; // Se a data estiver armazenada como string no localStorage
};

interface MyCalendarProps {
  currentUser: { email: string }; // adapte conforme sua estrutura de usuário
}

export const MyCalendar: React.FC<MyCalendarProps> = ({ currentUser }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Carrega os eventos do usuário do localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem(`events_${currentUser.email}`);
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      const eventsWithDate = parsedEvents.map((event: EventType) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: new Date(event.date),
      }));
      setEvents(eventsWithDate);
    }
  }, [currentUser.email]);

  // Salva os eventos sempre que houver alteração
  useEffect(() => {
    localStorage.setItem(`events_${currentUser.email}`, JSON.stringify(events));
  }, [events, currentUser.email]);

  const handleDateChange = (value: Date | Date[] | null) => {
    if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(value);
    }
  };

  const handleAddEvent = (title: string, description: string) => {
    if (!selectedDate) return;

    const newEvent = {
      id: (events.length + 1).toString(), // Para testes; considere usar uma lib como uuid
      date: selectedDate,
      title,
      description,
    };

    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const isDateWithEvent = ({ date }: { date: Date }) => {
    return events.some(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const filteredEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="calendar-container">
      <h1>Meu Calendário</h1>
      <Calendar
        onChange={(value) => handleDateChange(value as Date | Date[] | null)}
        value={selectedDate}
        tileContent={({ date }) =>
          isDateWithEvent({ date }) && <div className="event-pointer"></div>
        }
      />
      <div className="Form-toggle">
        <button onClick={toggleForm}>
          {showForm ? "Cancelar" : "Adicionar Evento"}
        </button>
      </div>
      {showForm && <FormCalendar handleAddEvent={handleAddEvent} />}
      <EventList events={filteredEvents} />
    </div>
  );
};