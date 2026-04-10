import React from 'react'

function Events({ events }: { events: any[] }) {
  return (
    <ul>
      {events.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  )
}

export default Events