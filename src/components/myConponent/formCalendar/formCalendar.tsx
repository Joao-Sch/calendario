import React, { ChangeEvent, FormEvent, useState } from "react";
import "./formCalendar.css";

interface FormCalendarProps {
    handleAddEvent: (title: string, description: string) => void;
}

export const FormCalendar: React.FC<FormCalendarProps> = ({ handleAddEvent }) => {
    const [eventTitle, setEventTitle] = useState<string>("");
    const [eventDescription, setEventDescription] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleEventTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEventTitle(e.target.value);
        setError("");
    };

    const handleEventDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEventDescription(e.target.value);
        setError("");
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (eventTitle.trim() === "" || eventDescription.trim() === "") {
            setError("Preencha todos os campos");
            return;
        }

        handleAddEvent(eventTitle, eventDescription);
        setEventTitle("");
        setEventDescription("");
        setError("");
    };

    return (
        <div className="form-calendar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="event-title">Titulo do evento</label>
                <input
                    type="text"
                    id="event-title"
                    value={eventTitle}
                    onChange={handleEventTitleChange}
                />
                <label htmlFor="event-description">Descrição do evento</label>
                <textarea
                    id="event-description"
                    value={eventDescription}
                    onChange={handleEventDescriptionChange}
                ></textarea>

                <button type="submit" >Adicionar o Evento</button>
            </form>
            {error && <p className="error-msg">{error}</p>}
        </div>
    );
};
