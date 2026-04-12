import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiGet, apiPost } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import Loader from '../components/Loader';
import './Inbox.css';

const Inbox = () => {
  const [searchParams] = useSearchParams();
  const queryUserId = searchParams.get('user');
  const queryName = searchParams.get('name');
  const queryRideId = searchParams.get('ride');

  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(queryUserId ? { id: Number(queryUserId), name: queryName || 'Commuter' } : null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');

  const fetchConversations = async () => {
    const data = await apiGet(API_ENDPOINTS.MESSAGES);
    setConversations(data);
    return data;
  };

  const fetchConversation = async (targetUserId) => {
    if (!targetUserId) {
      setMessages([]);
      return;
    }

    const data = await apiGet(`${API_ENDPOINTS.MESSAGES}/${targetUserId}`);
    setMessages(data);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchConversations();
        if (!selectedUser && data.length) {
          setSelectedUser({ id: data[0].id, name: data[0].name });
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (selectedUser?.id) {
      fetchConversation(selectedUser.id);
    }
  }, [selectedUser]);

  const handleSend = async (event) => {
    event.preventDefault();
    if (!selectedUser?.id || !draft.trim()) return;

    await apiPost(API_ENDPOINTS.MESSAGES, {
      receiverId: selectedUser.id,
      rideId: queryRideId ? Number(queryRideId) : null,
      text: draft.trim(),
    });

    setDraft('');
    await fetchConversations();
    await fetchConversation(selectedUser.id);
  };

  if (loading) return <Loader />;

  return (
    <div className="inbox-page">
      <div className="container">
        <div className="page-header">
          <h1>Community Inbox</h1>
          <p>Coordinate pickups, ask route questions, and stay in touch with trusted commuters.</p>
        </div>

        <div className="inbox-layout">
          <aside className="card inbox-sidebar">
            <h2>Conversations</h2>
            <div className="conversation-list">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  className={`conversation-item ${selectedUser?.id === conversation.id ? 'active' : ''}`}
                  onClick={() => setSelectedUser({ id: conversation.id, name: conversation.name })}
                >
                  <strong>{conversation.name}</strong>
                  <span>{conversation.latestMessage}</span>
                  <small>{formatDate(conversation.latestAt)}</small>
                </button>
              ))}
              {!conversations.length && !selectedUser ? <p>No messages yet.</p> : null}
            </div>
          </aside>

          <section className="card inbox-thread">
            <div className="thread-header">
              <h2>{selectedUser?.name || 'Select a commuter'}</h2>
              {queryRideId ? <span>Ride reference #{queryRideId}</span> : null}
            </div>

            <div className="thread-messages">
              {messages.map((message) => (
                <div key={message.id} className={`thread-bubble ${message.senderId === selectedUser?.id ? 'incoming' : 'outgoing'}`}>
                  <p>{message.text}</p>
                  <small>{formatDate(message.createdAt)}</small>
                </div>
              ))}
              {!messages.length && selectedUser ? (
                <p className="thread-empty">Start the conversation about pickup points, safety, or bike handover details.</p>
              ) : null}
            </div>

            {selectedUser ? (
              <form className="thread-form" onSubmit={handleSend}>
                <textarea
                  className="input-field"
                  rows="3"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write your message..."
                />
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
