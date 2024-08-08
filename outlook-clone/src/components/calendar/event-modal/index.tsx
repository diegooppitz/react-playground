import React, { useEffect, useState } from 'react';
import './eventModal.scss';
import { EventModalProps, EventDataTypes } from '@/types';
import { mockEventData } from '@/utils/dates/get_infos';

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  suggestedDate,
}) => {
  const [formData, setFormData] = useState<EventDataTypes>({
    ...mockEventData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;

    const updatedValue = type === 'checkbox' ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
      ...adjustTimes(name, updatedValue, prevState),
    }));
  };

  const adjustTimes = (name: string, value: any, prevState: EventDataTypes) => {
    const updates: Partial<EventDataTypes> = {};

    if ((name === 'allDay' && value === true) || prevState.allDay) {
      updates.startTime = '';
      updates.endTime = '';
    }

    return updates;
  };

  const updateFormData = async () => {
    setFormData((prevState) => ({
      ...prevState,
      date: suggestedDate.selectedDate,
      startTime: suggestedDate.startTime,
      endTime: suggestedDate.endTime,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      window.location.reload();
    } catch (error) {
      console.error('request error:', error);
    }

    onClose();
  };

  useEffect(() => {
    updateFormData();
  }, [suggestedDate]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span className="close" onClick={onClose}></span>
          <h2>New Event</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Add a title"
              className="input-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <div className="date-configs">
              <div className="inputs-date-config">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  disabled={formData.allDay}
                />

                <div className="input-all-day">
                  <input
                    type="checkbox"
                    id="allDay"
                    name="allDay"
                    checked={formData.allDay}
                    onChange={handleChange}
                  />
                  <label htmlFor="allDay">All Day</label>
                </div>
              </div>

              <div className="inputs-date-config">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  disabled={formData.allDay}
                />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  disabled={formData.allDay}
                />
              </div>
            </div>

            <label htmlFor="eventDescription">Event Description:</label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <div className="modal-footer">
              <button className="SubmitButton">Create</button>
              <button className="cancelButton" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
