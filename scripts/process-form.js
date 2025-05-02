const fs = require('fs');
const crypto = require('crypto');

const prBody = process.argv[2];

function extractField(label) {
  const regex = new RegExp(`\\*\\*${label}:\\*\\*\\s*\\n<!--\\s*(.*?)\\s*-->`, 'i');
  const match = prBody.match(regex);
  return match ? match[1].trim() : null;
}

const event = {
  title: extractField("Event Title"),
  date: extractField("Date \\(ISO format\\)"),
  startTime: extractField("Start Time \\(UTC\\)"),
  endTime: extractField("End Time \\(UTC\\)"),
  country: extractField("Country"),
  city: extractField("City"),
  eventType: extractField("Event Type .*"),
  gatheringType: extractField("Gathering Type .*"),
  ticket: extractField("Ticket .*"),
  capacity: extractField("Capacity .*"),
  description: extractField("Event Description"),
  link: extractField("Link .*"),
  organizer: {
    name: extractField("Organizer Name"),
    twitter: extractField("Twitter .*")
  },
  id: crypto.randomUUID()
};

let events = [];
try {
  events = JSON.parse(fs.readFileSync('events.json'));
} catch {
  console.log('No existing events.json found. Creating new one.');
}

events.push(event);

fs.writeFileSync('events.json', JSON.stringify(events, null, 2));
console.log('✅ Event added to events.json');
