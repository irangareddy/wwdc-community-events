# wwdc-community-events

This repository maintains a JSON representation of WWDC (Worldwide Developers Conference) events taking place globally. Whether you're looking for informal meetups, keynote watch parties, or developer conferences, this curated list provides a comprehensive overview of community-driven initiatives.

## Credits

This project is inspired by [Paul Hudson](https://github.com/twostraws)'s [WWDC repository](https://github.com/twostraws/wwdc/), which served as the initial reference for structuring the event data.

## Schema

The structured JSON file in this repository lists various WWDC events categorized by date, including details such as event type, time, title, description, link, gathering type, capacity, and organizer information.

```json
{
  "date": "2024-06-08T00:00:00.000Z",
  "events": [
    {
      "title": "Informal Pre-WWDC 24 Gathering in San Pedro Square",
      "description": "lorem ipsum",
      "link": "https://pre-wwdc24-gathering.splashthat.com",
      "eventType": "watchParty",
      "startTime": "2024-06-08T06:00:00.000Z",
      "endTime": "2024-06-08T8:00:00.000Z",
      "requiresTicket": true,
      "capacity": "limited",
      "organizer": {
        "name": "Oraganizer Name",
        "twitter": "@TwitterHandle"
      },
      "gatheringType": "informal"
    }
  ]
}
```

## Schema Definitions

### `eventType`

- **watchParty**: Event organized for watching keynote or sessions together.
- **conference**: Formal conference or summit.
- **workshop**: Hands-on workshop or tutorial.
- **meetup**: Informal gathering of developers.
- **hackathon**: Coding event focused on building software solutions.

### `gatheringType`

- **formal**: Official or structured gathering.
- **informal**: Casual or spontaneous meetup.

### `capacity`

- **unlimited**: No restriction on the number of attendees.
- **limited**: Limited number of seats or tickets available.

## Contributing

Contributions to this repository are welcome! If you're organizing a WWDC event or know of one not listed here, please submit a pull request with the relevant details. Make sure to follow the contribution guidelines outlined below.

### Contribution Guidelines

1. Ensure that the event details are accurate and up-to-date.
2. Follow the provided JSON structure when adding new events.
3. Use the predefined values for `eventType`, `gatheringType`, and `capacity`.
4. When adding an event, ensure it is placed chronologically within its respective date category. If multiple events occur on the same date, append the new event to the existing list of events for that date.
5. Avoid adding links to articles about rumors or leaks.

## License

This repository is licensed under the [MIT License](LICENSE), which means you're free to use, modify, and distribute the content as long as you include the original copyright notice.

---

Feel free to enhance it further or let me know if you need any adjustments!
