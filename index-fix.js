// Find this section in index.html and replace it

// Around line where checkForAdminReplies is defined, change it to:
async function checkForAdminReplies() {
    if (!sessionId) return;

    try {
        const { data, error } = await supabaseClient
            .from('chat_messages')
            .select('*')
            .eq('session_id', sessionId)
            .eq('sender', 'admin')
            .order('created_at');

        if (data && data.length > 0) {
            // Get IDs of messages already shown
            const existingMsgs = Array.from(messagesContainer.querySelectorAll('.message.admin'))
                .map(el => el.dataset.msgId);
            
            // Show only new admin messages
            data.forEach(msg => {
                if (!existingMsgs.includes(msg.id)) {
                    const msgEl = addMessage(msg.message, 'admin');
                    msgEl.dataset.msgId = msg.id;
                }
            });
        }
    } catch (error) {
        console.error('Error checking for admin replies:', error);
    }
}
