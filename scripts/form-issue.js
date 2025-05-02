const fs = require('fs');
const crypto = require('crypto');
const Ajv = require('ajv');

// Read issue body JSON string
const issueFilePath = process.argv[2];
if (!issueFilePath) {
  console.error('Usage: node form-issue.js <issue-json-file>');
  process.exit(1);
}
let issueBody;
try {
  issueBody = JSON.parse(fs.readFileSync(issueFilePath, 'utf8'));
} catch (err) {
  console.error('Error reading issue body:', err);
  process.exit(1);
}

function extractField(body, fieldName) {
  const regex = new RegExp(`### ${fieldName}\\s*\\n\\s*([^\\n#]+)`, 'i');
  const match = body.match(regex);
  return match ? match[1].trim() : null;
}

const event = {
  title: extractField(issueBody, "Event Title"),
  date: extractField(issueBody, "Event Date \\(ISO format\\)"),
  startTime: extractField(issueBody, "Start Time \\(UTC\\)"),
  endTime: extractField(issueBody, "End Time \\(UTC\\)"),
  country: extractField(issueBody, "Country"),
  city: extractField(issueBody, "City"),
  eventType: extractField(issueBody, "Event Type"),
  gatheringType: extractField(issueBody, "Gathering Type"),
  ticket: extractField(issueBody, "Ticket Required\\?"),
  capacity: extractField(issueBody, "Capacity"),
  description: extractField(issueBody, "Description"),
  link: extractField(issueBody, "Event Link"),
  organizer: {
    name: extractField(issueBody, "Organizer Name"),
    twitter: extractField(issueBody, "Organizer Twitter Handle \\(optional\\)")
  },
  id: crypto.randomUUID()
};

// 🔍 Validate with schema
const ajv = new Ajv({ allErrors: true });
const schema = JSON.parse(fs.readFileSync('schema.json', 'utf8'));
const validate = ajv.compile(schema);

if (!validate(event)) {
  console.error('❌ Schema validation failed:');
  console.error(validate.errors);
  process.exit(1);
}

// ✅ Add to events.json
let events = [];
if (fs.existsSync('events.json')) {
  events = JSON.parse(fs.readFileSync('events.json', 'utf8'));
}
events.push(event);
fs.writeFileSync('events.json', JSON.stringify(events, null, 2));

// ✅ Write PR body
const prBody = `Adding new WWDC community event

**Event Title:**\n<!--${event.title}-->
**Date (ISO format):**\n<!--${event.date}-->
**Start Time (UTC):**\n<!--${event.startTime}-->
**End Time (UTC):**\n<!--${event.endTime}-->
**Country:**\n<!--${event.country}-->
**City:**\n<!--${event.city}-->
**Event Type:**\n<!--${event.eventType}-->
**Gathering Type:**\n<!--${event.gatheringType}-->
**Ticket Required?:**\n<!--${event.ticket}-->
**Capacity:**\n<!--${event.capacity}-->
**Event Description:**\n<!--${event.description}-->
**Link:**\n<!--${event.link}-->
**Organizer Name:**\n<!--${event.organizer.name}-->
**Twitter (optional):**\n<!--${event.organizer.twitter || ''}-->`;

fs.mkdirSync('tmp', { recursive: true });
fs.writeFileSync('tmp/pr-body.txt', prBody);
console.log('✅ Event validated, added, and PR body created');
