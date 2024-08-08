import { NextApiRequest, NextApiResponse } from 'next';
import { EventDataTypes } from '@/types';

let eventsData: EventDataTypes[] = [
  {
    id: 0,
    title: 'Planning Meeting',
    description: '',
    date: '2024-05-29',
    startTime: '13:30',
    endTime: '14:00',
    allDay: false,
  },
];

export default async function calendar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      return res.status(200).json(eventsData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else if (req.method === 'POST') {
    try {
      let newEventData = req.body;
      newEventData.eventId = eventsData.length;
      eventsData.push(newEventData);

      return res.status(201).json(newEventData);
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
