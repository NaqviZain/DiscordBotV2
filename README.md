⚙️ Frameworks, Libraries & APIs
Core Frameworks / Libraries

discord.js
 → main framework powering the bot (commands, interactions, embeds).

@discordjs/voice → Discord voice connections (VC features).

discord-html-transcripts → generates HTML-based ticket/chat transcripts.

dotenv → loads secrets from .env (tokens, MongoDB URI, etc).

mongoose + mongodb → database layer for staff logs, tickets, economy, and user data.

pm2 + @pm2/io → process manager for production hosting and monitoring.

fdir → fast file system crawler for loading commands/events dynamically.

fuzzysort → fuzzy searching (likely for user/vehicle lookups).

node-cron → scheduled tasks like resets, reminders, or auto-cleanups.

node-fetch → making API calls to third-party services.

ms → time formatting utility.

APIs & Integrations

Roblox API → used in startup-one.cmd.js and profile.cmd.js to fetch Roblox player data, session details, etc.

Bloxlink API → Roblox ↔ Discord account verification (seen in startup-one, profile, config.js).

Google APIs (Apps Script / Forms) → hooks for automation and form response handling (spotted references).

Custom APIs → Several commands/events make outbound API calls (economy, tickets, reinvites, etc).

Features & Systems

Ticket System → interactive select menus & buttons for creating/closing tickets; transcripts saved.

Economy System → balance, work, shop, leaderboard, ticket-pay commands.

Staff Tools → warnings, mute, DM management, delete warn logs.

Hosting Tools → startup, early hosting, reinvites, session tools (roleplay hosting support).

Membership / Role Management → auto-accept/decline role buttons.

Logging & Monitoring → MongoDB logs + transcript generation.

Jail/Detection Events → auto-handling via jailedDetector.evt.js.

Process Scaling → PM2 for running the bot in production.

📌 Basically, this bot ties together Discord + Roblox + Bloxlink + Google automation, with MongoDB persistence, all wrapped inside a modular Discord.js v14 bot.
