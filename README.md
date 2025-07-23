# Official MCP Server for MeetGeek API

🚀 **The First and Only MCP Server for MeetGeek Meeting Intelligence**

This project provides a Model Context Protocol (MCP) server enabling seamless interaction with the [MeetGeek](https://meetgeek.ai/) API. As the pioneering MCP solution for MeetGeek's meeting intelligence platform, it unlocks the power of AI-driven meeting insights, transcriptions, and analytics through a standardized interface. This integration allows AI models and MCP clients to access, analyze, and derive insights from your meetings recorded and processed by MeetGeek.

## Features

* **List Meetings:** Retrieve all meetings with pagination support
* **Get Meeting Details:** Fetch comprehensive metadata for any specific meeting
* **Get Meeting Transcripts:** Access full transcriptions with speaker identification and timestamps
* **Get Meeting Highlights:** Retrieve AI-generated key moments and insights
* **Get Meeting Summaries:** Access AI-powered meeting summaries and action items
* **Team Meetings:** Retrieve meetings for specific teams with filtering capabilities
* **Upload Recordings:** Import meeting recordings directly via download URLs

## Prerequisites

* **MeetGeek Account:** A valid MeetGeek account with API access
* **MeetGeek API Key:** You need an API key from your MeetGeek account settings
* **Node.js & npm:** Node.js (v14 or higher) and npm installed on your system
* **MCP-Compatible Client:** An MCP client like Claude Desktop, Cursor, or similar

## Installation and Configuration

This MCP server runs locally using Node.js. Follow these steps to set up and configure it with your MCP client.

### Local Installation

1. **Clone or download this repository:**
   ```bash
   git clone <repository-url>
   cd meetgeek-mcp-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the server:**
   ```env
   npm run build
   ```

### Configure Your MCP Client

Update your MCP client's configuration file to include the MeetGeek server.

#### For Claude Desktop

Update your `claude_desktop_config.json` file (typically located in `~/Library/Application Support/Claude/` on macOS or `%APPDATA%\Claude\` on Windows):

```json
{
  "mcpServers": {
    "meetgeek": {
      "command": "node",
      "args": ["/absolute/path/to/your/meetgeek-mcp-server/dist/index.js"],
      "env": {
        "MEETGEEK_API_KEY": "your_meetgeek_api_key_here",
        "MEETGEEK_BASE_URL": "https://api.meetgeek.ai"
      }
    }
  }
}
```

#### For Other MCP Clients

Refer to your specific MCP client's documentation for configuration details. The general pattern is:

```json
{
  "mcpServers": {
    "meetgeek": {
      "command": "node",
      "args": ["/absolute/path/to/meetgeek-mcp-server/dist/index.js"],
      "env": {
        "MEETGEEK_API_KEY": "your_meetgeek_api_key_here",
        "MEETGEEK_BASE_URL": "https://api.meetgeek.ai"
      }
    }
  }
}
```

**Important:** Replace `/absolute/path/to/your/meetgeek-mcp-server/` with the actual absolute path to your server file and `your_meetgeek_api_key_here` with your actual MeetGeek API key.

### Getting Your MeetGeek API Key

1. Log in to your MeetGeek account
2. Navigate to Integrations
3. Look for Public API Integration
4. Generate a new API key if you don't have one
5. Copy the API key for use in your configuration

## Usage

Once configured and your MCP client is restarted, you can use the following capabilities:

### Available Functions

* **`meetgeek:meetings`** - List all meetings with optional pagination
* **`meetgeek:meetingDetails`** - Get detailed information about a specific meeting
* **`meetgeek:transcript`** - Retrieve the full transcript of a meeting
* **`meetgeek:highlights`** - Get AI-generated highlights and key moments
* **`meetgeek:summary`** - Access meeting summaries and action items
* **`meetgeek:teamMeetings`** - List meetings for a specific team
* **`meetgeek:uploadRecording`** - Upload a recording via download URL

### Example Usage

Ask your AI assistant questions like:

* "Show me my recent meetings from MeetGeek"
* "Get the transcript for meeting ID abc123"
* "What were the key highlights from yesterday's team meeting?"
* "Summarize the main action items from our project meeting"
* "Upload this recording to MeetGeek: [URL]"

## Development

### Local Development Setup

1. **Install development dependencies (if not already installed):**
   ```bash
   npm install --save-dev nodemon
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```
   or if you don't have dev script configured:
   ```bash
   npx nodemon index.js
   ```

### Testing the Server

You can test the server directly by running it from the command line:

```bash
node index.js
```

The server should start and be ready to accept MCP protocol messages.

## Troubleshooting

### Common Issues

* **Server not connecting:** Ensure the absolute path in your MCP client configuration is correct
* **API key errors:** Verify your MeetGeek API key is valid and has the necessary permissions
* **Permission denied:** Make sure the `index.js` file is executable (`chmod +x index.js`)
* **Module not found:** Ensure all dependencies are installed (`npm install`)

### Debugging

* **Check server logs:** Run the server directly to see error messages and logs
* **Verify configuration:** Double-check your MCP client configuration file syntax
* **Test API key:** Verify your API key works by making direct API calls to MeetGeek
* **Client logs:** Check your MCP client's logs for connection and error information

### Restarting After Changes

**Important:** After making any changes to the server code or configuration, you must restart your MCP client for the changes to take effect.

## API Reference

This server implements the following MeetGeek API endpoints through MCP functions:

| Function | Description | Parameters |
|----------|-------------|------------|
| `meetings` | List meetings | `cursor` (optional), `limit` (optional) |
| `meetingDetails` | Get meeting metadata | `meetingId` (required) |
| `transcript` | Get meeting transcript | `meetingId` (required), `cursor` (optional), `limit` (optional) |
| `highlights` | Get meeting highlights | `meetingId` (required) |
| `summary` | Get meeting summary | `meetingId` (required) |
| `teamMeetings` | List team meetings | `teamId` (required), `cursor` (optional), `limit` (optional) |
| `uploadRecording` | Upload recording | `download_url` (required), `language_code` (required), `template_name` (optional) |

## Learn More

* [MeetGeek Website](https://meetgeek.ai/)
* [MeetGeek API Documentation](https://meetgeek.ai/developers) *(if available)*
* [Model Context Protocol (MCP) Specification](https://modelcontextprotocol.io/introduction)
* [Claude Desktop MCP Setup Guide](https://modelcontextprotocol.io/quickstart/user)

## Support

For issues related to:
* **MCP Server:** Check the troubleshooting section above or create an issue in this repository
* **MeetGeek API:** Contact MeetGeek support
* **MCP Protocol:** Refer to the official MCP documentation

## License

This project is provided as-is for integration with MeetGeek's API through the Model Context Protocol.
