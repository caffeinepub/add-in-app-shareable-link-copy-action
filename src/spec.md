# Specification

## Summary
**Goal:** Add a new authenticated Chat/Messages page with an input composer that supports sending text plus camera/photo, voice recording, and file attachments.

**Planned changes:**
- Add a new “Chat” (or “Messages”) tab to the authenticated app’s bottom navigation and route it to a new Chat screen.
- Build the Chat screen UI with a scrollable message history area and a sticky composer for typing and sending text messages (session-only behavior is acceptable).
- Add attachment actions in the composer: camera/photo capture or image selection with preview/removal before send, and render sent image messages in the list.
- Add voice recording in the composer: start/stop recording with clear recording state, preview with playback/removal before send, and render sent audio messages with an audio player.
- Add file upload/share in the composer: select files, preview filename/size (and type when available) with removal before send, and render sent files as downloadable attachment items; handle unsupported types gracefully.

**User-visible outcome:** Authenticated users can open a new Chat/Messages tab, view an in-session message history, send text messages, and send messages with image, voice recording, or file attachments from the chat input.
