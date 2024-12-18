
# Project Visualizer

**Project Visualizer** is a powerful and flexible **Node.js CLI tool** to visualize directory structures and export them to formats like JSON. With optional metadata (file sizes, last modified dates, and line counts), it's perfect for analyzing, documenting, or sharing project structures.

---

## Features

- **Visualize Directory Structures**: Recursively scan directories and generate structured outputs.
- **Optional Metadata**: Include details like file size, type, last modified date, and line count.
- **Simple Mode**: Use `-s` for clean output without metadata.
- **Supports `.gitignore`**: Automatically skips files and directories ignored by `.gitignore`.
- **Default Behavior**:
  - **Input**: The current directory is scanned if no path is specified.
  - **Output**: The JSON file is saved to the current directory.

---

## Installation

Install **Project Visualizer** globally using NPM:

```bash
npm install -g project-visualizer
```

---

## Usage

### Basic Command
Visualize the directory structure (scans the current directory by default and saves output in the current directory):

```bash
pvis
```

### Specify a Target Directory
Provide a specific directory to scan:
```bash
pvis <path_to_directory>
```

### Simple Mode (No Metadata)
Use the `-s` or `-simple` flag to produce a lightweight JSON without metadata:

```bash
pvis <path_to_directory> -s
```

---

## Examples

### 1. Default Mode (With Metadata)
```bash
pvis ./my-project
```
**Output**:
```json
{
  "src": {
    "index.js": {
      "size": 1024,
      "type": "js",
      "lastModified": "2024-06-17T12:34:56Z",
      "lines": 50
    },
    "styles.css": {
      "size": 500,
      "type": "css",
      "lastModified": "2024-06-17T10:12:00Z",
      "lines": 20
    }
  },
  "README.md": {
    "size": 1024,
    "type": "md",
    "lastModified": "2024-06-17T08:00:00Z",
    "lines": 40
  }
}
```

### 2. Simple Mode (No Metadata)
```bash
pvis ./my-project -s
```
**Output**:
```json
{
  "src": {
    "index.js": null,
    "styles.css": null
  },
  "README.md": null
}
```

---

## Defaults

- **Input**: If no path is specified, the current working directory is scanned.  
- **Output**: The JSON file is saved to the current directory as `<project-name>-visualizer.json`.

---

## Output Formats

- **Directories**: Represented as nested objects.
- **Files**:
  - With Metadata: Includes `size`, `type`, `lastModified`, and `lines`.
  - In Simple Mode: Files are represented as `null`.

---

## Flags

| Flag         | Description                                |
|--------------|--------------------------------------------|
| `-s`        | Outputs a simplified JSON (no metadata).    |
| `-simple`   | Same as `-s`, produces clean JSON output.   |

---

## Requirements

- **Node.js** v12 or later.

---

## Installation and Testing Locally

For local development or testing:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/project-visualizer.git
   cd project-visualizer
   ```
2. Link the CLI tool locally:
   ```bash
   npm link
   ```
3. Test it:
   ```bash
   pvis ./your-directory
   ```

---

## Contributing

1. Fork this repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Make your changes.
4. Submit a pull request.

---

## License

This project is licensed under the **MIT License**.

---

## Author

Developed by [Your Name](https://github.com/your-username).  
Feel free to reach out for feedback, suggestions, or contributions.

---
