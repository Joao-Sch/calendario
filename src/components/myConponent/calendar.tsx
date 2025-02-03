import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configurar o localizador de datas para usar Moment.js
const localizer = momentLocalizer(moment);

// Definição da interface para os eventos do calendário
interface Event extends BigCalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

export const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const holidays: Event[] = [
      { id: 1, title: 'Ano Novo', start: new Date(2025, 0, 1), end: new Date(2025, 0, 1), color: '#ff0000' },
      { id: 2, title: 'Natal', start: new Date(2025, 11, 25), end: new Date(2025, 11, 25), color: '#008000' },
    ];

    const leaves: Event[] = [
      { id: 3, title: 'Folga João', start: new Date(2025, 1, 10), end: new Date(2025, 1, 12), color: '#0000FF' },
    ];

    setEvents([...holidays, ...leaves]);
  };

  return (
    <div style={{ height: 500, margin: '50px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        eventPropGetter={(event) => ({
          style: { backgroundColor: event.color },
        })}
      />
    </div>
  );
};
