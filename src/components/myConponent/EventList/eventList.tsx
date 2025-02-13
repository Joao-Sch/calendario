// components/EventList/eventList.tsx
import React from "react";
import "./eventList.css";
import { Flex } from "@chakra-ui/react";

interface Event {
  id: string;
  date: Date;
  title: string;
  description: string;
}

interface EventListProps {
  events: Event[];
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <Flex className="event-List">
      <h1>Eventos: </h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <p>
                <strong>Date: </strong> {event.date.toLocaleDateString()}
              </p>
              <p>
                <strong>Title: </strong> {event.title}
              </p>
              <p>
                <strong>Descrição: </strong> {event.description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tem evento nenhum doidão</p>
      )}
    </Flex>
  );
};
