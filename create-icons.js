const fs = require('fs');
const path = require('path');

const base64Icons = {
  'home.png': 'iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABjSURBVHhe7dCxDQAgDMSw/3d6gJIO4IKsyJqR/gcAAAAAAAAAAACg/x6R2O/7m9gP+/0oImLfiEjdJRJ1l0jUXSJRd4lE3SUSdZdI1F0iUXeJRN0lEnWXSNRdIlF3iUTdJRJ1l0jUXSJRd4lE3SUSdZdI1F3+AQAAAAAAAAAAAPgPW4kV/4xZq3IAAAAASUVORK5CYII=',
  'home-active.png': 'iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABjSURBVHhe7dAxDQAgDMSw/3d6gJIO4IKsyJqR/gcAAAAAAAAAAACg/x6R2O/7m9gP+/0oImLfiEjdJRJ1l0jUXSJRd4lE3SUSdZdI1F0iUXeJRN0lEnWXSNRdIlF3iUTdJRJ1l0jUXSJRd4lE3SUSdZdI1F3+AQAAAAAAAAAAAPgPW4kV/4xZq3IAAAAASUVORK5CYII=',
};

const iconsDir = path.join(__dirname, 'assets', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

Object.entries(base64Icons).forEach(([filename, base64Data]) => {
  const filepath = path.join(iconsDir, filename);
  fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
  console.log(`Created: ${filename}`);
});

console.log('Icons created successfully!');
