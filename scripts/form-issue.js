const fs = require('fs');
const crypto = require('crypto');

// Get the issue JSON file path from command line arguments
const issueFilePath = process.argv[2];

if (!issueFilePath) {
  console.error('Usage: node from-issue.js <issue-json-file>');
  process.exit(1);
}

// Read the issue body from the JSON file
let issueBody;
try {
  issueBody = JSON.parse(fs.readFileSync(issueFilePath, 'utf8'));
} catch (error) {
  console.error('Error reading issue file:', error);
  process.exit(1);
}

// Function to extract field values from the issue body
function extractField(body, fieldName) {
  // Match patterns like "### Event Title\n\nVision Pro Developer Meetup"
  const regex = new RegExp(`### ${fieldName}\\s*\\n\\s*([^\\n#]+)`, 'i');
  const match = body.match(regex);
  return match ? match[1].trim() : null;
}

// Extract all the fields
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

// Create PR body with the event data in the format expected by process-form.js
let prBody = `Adding new WWDC community event

**Event Title:**
<!--${event.title}-->

**Date (ISO format):**
<!--${event.date}-->

**Start Time (UTC):**
<!--${event.startTime}-->

**End Time (UTC):**
<!--${event.endTime}-->

**Country:**
<!--${event.country}-->

**City:**
<!--${event.city}-->

**Event Type:**
<!--${event.eventType}-->

**Gathering Type:**
<!--${event.gatheringType}-->

**Ticket Required?:**
<!--${event.ticket}-->

**Capacity:**
<!--${event.capacity}-->

**Event Description:**
<!--${event.description}-->

**Link:**
<!--${event.link}-->

**Organizer Name:**
<!--${event.organizer.name}-->

**Twitter (optional):**
<!--${event.organizer.twitter || ''}-->
`;

// Create or update events.json
let events = [];
try {
  if (fs.existsSync('events.json')) {
    events = JSON.parse(fs.readFileSync('events.json', 'utf8'));
  }
} catch (error) {
  console.log('No existing events.json found or error reading it. Creating new one.');
}

// Add new event
events.push(event);

// Save updated events to events.json
fs.writeFileSync('events.json', JSON.stringify(events, null, 2));

// Also save the PR body to a file for the GitHub action to use
fs.writeFileSync('tmp/pr-body.txt', prBody);

console.log('✅ Event processed and added to events.json');
console.log('✅ PR body created');