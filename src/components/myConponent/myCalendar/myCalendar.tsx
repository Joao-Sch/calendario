import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FormCalendar } from "../formCalendar/formCalendar";
import { EventList } from "../EventList/eventList";
import "./myCalendar.css";

// Defina o tipo Event
type Event = {
  id: string;
  date: Date;
  title: string;
  description: string;
};

export const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/events");
            const data = await response.json();

            const transformedEvents = data.map((event: { id: string; title: string; body: string }) => {
                const { id, title, body: description } = event;
                const generatedRandomDate = new Date(
                    `${new Date().toLocaleDateString("pt-BR", { month: "short" })} ${Math.floor(Math.random() * 28) + 1} ${new Date().getFullYear()} ${new Date().toTimeString()}`
                );
                return {
                    id,
                    date: generatedRandomDate,
                    title,
                    description,
                };
            });

            setEvents(transformedEvents);
        } catch (error) {
            console.error("deu caca na API fetch ve ai:", error);
        }
    };

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
            id: (events.length + 1).toString(), // Gera um id simples
            date: selectedDate,
            title,
            description,
        };

        setEvents([...events, newEvent]);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const isDateWithEvent = ({ date }: { date: Date }) => {
        return events.some((event) => event.date.toDateString() === date.toDateString());
    };

    const filteredEvents = events.filter(
        (event) => event.date.toDateString() === selectedDate?.toDateString()
    );

    return (
        <div className="calendar-container">
            <h1>Meu Calendario</h1>
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
