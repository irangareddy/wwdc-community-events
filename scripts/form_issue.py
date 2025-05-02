import re
import json
import uuid
import sys
from pathlib import Path
from jsonschema import validate, ValidationError

# Read issue body (markdown) from file
issue_file = Path(sys.argv[1])
if not issue_file.exists():
    print(f"❌ File not found: {issue_file}")
    sys.exit(1)

body = issue_file.read_text()

def extract(label):
    pattern = rf"### {re.escape(label)}\s+(.+?)(?=\n###|\Z)"
    match = re.search(pattern, body, re.DOTALL)
    return match.group(1).strip() if match else ""

event = {
    "title": extract("Event Title"),
    "date": extract("Event Date (ISO format)"),
    "startTime": extract("Start Time (UTC)"),
    "endTime": extract("End Time (UTC)"),
    "country": extract("Country"),
    "city": extract("City"),
    "eventType": extract("Event Type"),
    "gatheringType": extract("Gathering Type"),
    "ticket": extract("Ticket Required?"),
    "capacity": extract("Capacity"),
    "description": extract("Description"),
    "link": extract("Event Link"),
    "organizer": {
        "name": extract("Organizer Name"),
        "twitter": extract("Organizer Twitter Handle (optional)").replace("_No response_", "").strip()
    },
    "id": str(uuid.uuid4())
}

# Load and validate against schema
with open("schema.json") as f:
    schema = json.load(f)

try:
    validate(instance=event, schema=schema)
except ValidationError as e:
    print("❌ Schema validation error:")
    print(e)
    sys.exit(1)

# Load and append to events.json
events_file = Path("events.json")
events = []
if events_file.exists():
    with open(events_file) as f:
        events = json.load(f)

events.append(event)

# Save result
with open(events_file, "w") as f:
    json.dump(events, f, indent=2)

print("✅ Event added and validated")
