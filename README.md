# wwdc-community-events

This repository maintains a JSON representation of WWDC (Worldwide Developers Conference) events taking place globally. Whether you're looking for informal meetups, keynote watch parties, or developer conferences, this curated list provides a comprehensive overview of community-driven initiatives.

## Credits

This project is inspired by [Paul Hudson](https://github.com/twostraws)'s [WWDC repository](https://github.com/twostraws/wwdc/), which served as the initial reference for structuring the event data.

## How It Works

Events are contributed via GitHub pull requests using a structured form. Once submitted, an automated GitHub Action extracts the event information, validates it, and updates the main `events.json` file. All changes to the event list require manual approval by a maintainer.

- 📝 Submit events through a **form-based pull request**.
- ⚙️ A GitHub Action **extracts and validates** the event data.
- 🔐 Direct edits to `events.json` are **not allowed**.
- 📦 The final JSON file is used dynamically in apps and websites.

## Sample Schema (2025)

Each entry in the JSON file follows this structure:

```json
{
  "date": "2025-06-08T00:00:00.000Z",
  "events": [
    {
      "title": "Informal Pre-WWDC 25 Gathering in San Pedro Square",
      "description": "lorem ipsum",
      "link": "https://pre-wwdc25-gathering.something.com",
      "eventType": "watchParty",
      "startTime": "2025-06-08T06:00:00.000Z",
      "endTime": "2025-06-08T8:00:00.000Z",
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
````

## Schema Definitions

### `eventType`

* **watchParty**: Event organized for watching keynote or sessions together.
* **conference**: Formal conference or summit.
* **workshop**: Hands-on workshop or tutorial.
* **meetup**: Informal gathering of developers.
* **hackathon**: Coding event focused on building software solutions.

### `gatheringType`

* **formal**: Official or structured gathering.
* **informal**: Casual or spontaneous meetup.

### `capacity`

* **unlimited**: No restriction on the number of attendees.
* **limited**: Limited number of seats or tickets available.

## Contributing

If you're hosting or know about a WWDC community event, you can contribute it to this repository!

### ✍️ How to Submit an Event

1. Open a new [pull request](../../pulls).
2. Fill out the **event form** shown in the PR template.
3. A GitHub Action will automatically:

   * Parse the event details from your form
   * Validate them
   * Add it to the correct date section in `events.json`
4. A maintainer will manually review and approve your PR.

Please **do not manually edit `events.json`**—all updates are automated from your PR form submission.

### 🛠 Guidelines

* Double-check your dates, times, and links.
* Use exact values for `eventType`, `gatheringType`, and `capacity`.
* Avoid including speculative or rumor-based events.
* One PR per event is recommended.

### 🐛 Reporting Issues

If you find incorrect event info, you can [open an issue](../../issues) and the maintainers will investigate and update as needed.

## License

This repository is licensed under the [MIT License](LICENSE), which means you're free to use, modify, and distribute the content as long as you include the original copyright.
