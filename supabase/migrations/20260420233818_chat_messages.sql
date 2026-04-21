-- Create chat_messages table
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    message TEXT NOT NULL,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'bot', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_by_admin BOOLEAN DEFAULT FALSE
);

-- Create index for faster queries
CREATE INDEX idx_session_id ON chat_messages(session_id);
CREATE INDEX idx_created_at ON chat_messages(created_at DESC);
CREATE INDEX idx_unread ON chat_messages(read_by_admin) WHERE read_by_admin = FALSE;

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations (since this is server-side only via Edge Functions)
CREATE POLICY "Allow all operations" ON chat_messages FOR ALL USING (true);
