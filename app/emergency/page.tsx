'use client';

import { useState, useEffect } from 'react';
import { requestNotificationPermission } from '@/lib/firebase';

type EmergencyCategory = 'housing' | 'legal' | 'healthcare';

interface EmergencyRequest {
  id: string;
  category: EmergencyCategory;
  description: string;
  location: string;
  contact: string;
  timestamp: string;
  status: 'open' | 'in-progress' | 'resolved';
}

export default function EmergencyAssistance() {
  const [category, setCategory] = useState<EmergencyCategory>('housing');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    };
    checkNotificationPermission();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest = {
      id: Date.now().toString(),
      category,
      description,
      location,
      contact,
      timestamp: new Date().toISOString(),
      status: 'open' as const,
    };

    try {
      const response = await fetch('/api/emergency/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });

      if (response.ok) {
        setRequests([...requests, newRequest]);
        setDescription('');
        setLocation('');
        setContact('');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  const enableNotifications = async () => {
    const token = await requestNotificationPermission();
    if (token) {
      setNotificationsEnabled(true);
      // Store token in backend for this user
      await fetch('/api/notifications/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Emergency Assistance Network</h1>
        
        {!notificationsEnabled && (
          <div className="bg-yellow-50 p-4 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Enable Notifications</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Stay updated with emergency assistance requests by enabling notifications.</p>
                  <button
                    onClick={enableNotifications}
                    className="mt-2 bg-yellow-100 px-3 py-1.5 rounded-md text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Enable Notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EmergencyCategory)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="housing">Housing</option>
              <option value="legal">Legal Aid</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Describe the emergency assistance needed..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Boston area location"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Information</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="How can helpers reach you?"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Submit Request
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Requests</h2>
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {request.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(request.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{request.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Location: {request.location}</p>
                  <p>Contact: {request.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
