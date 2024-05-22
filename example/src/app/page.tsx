"use client";
import React from 'react';
import { VapiComponent } from 'vapi-web';

const styleSets = [
  {
    name: 'Classic Theme',
    styles: {
      container: { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff' },
      buttonContainer: { marginBottom: '10px', display: 'flex', gap: '10px' },
      startButton: { backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      stopButton: { backgroundColor: '#f44336', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      muteButton: { backgroundColor: '#008CBA', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      logActionButton: { backgroundColor: '#FFA500', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      statusContainer: { marginTop: '10px', color: '#333' },
      transcriptContainer: { marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '4px', color: '#333' },
    }
  },
  {
    name: 'Dark Mode',
    styles: {
      container: { padding: '20px', border: '1px solid #444', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#333' },
      buttonContainer: { marginBottom: '10px', display: 'flex', gap: '10px' },
      startButton: { backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      stopButton: { backgroundColor: '#f44336', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      muteButton: { backgroundColor: '#008CBA', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      logActionButton: { backgroundColor: '#FFA500', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      statusContainer: { marginTop: '10px', color: '#ddd' },
      transcriptContainer: { marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#444', padding: '10px', borderRadius: '4px', color: '#ddd' },
    }
  },
  {
    name: 'Modern Minimalist',
    styles: {
      container: { padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9' },
      buttonContainer: { marginBottom: '10px', display: 'flex', gap: '10px' },
      startButton: { backgroundColor: '#007BFF', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      stopButton: { backgroundColor: '#DC3545', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      muteButton: { backgroundColor: '#6C757D', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      logActionButton: { backgroundColor: '#FFC107', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      statusContainer: { marginTop: '10px', color: '#333' },
      transcriptContainer: { marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', color: '#333' },
    }
  },
  {
    name: 'Vibrant Theme',
    styles: {
      container: { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' },
      buttonContainer: { marginBottom: '10px', display: 'flex', gap: '10px' },
      startButton: { backgroundColor: '#28a745', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' },
      stopButton: { backgroundColor: '#dc3545', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' },
      muteButton: { backgroundColor: '#17a2b8', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' },
      logActionButton: { backgroundColor: '#ffc107', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' },
      statusContainer: { marginTop: '10px', color: '#333' },
      transcriptContainer: { marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '4px', color: '#333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' },
    }
  },
  {
    name: 'Professional Theme',
    styles: {
      container: { padding: '20px', border: '1px solid #007BFF', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff' },
      buttonContainer: { marginBottom: '10px', display: 'flex', gap: '10px' },
      startButton: { backgroundColor: '#007BFF', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      stopButton: { backgroundColor: '#DC3545', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      muteButton: { backgroundColor: '#6C757D', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      logActionButton: { backgroundColor: '#FFC107', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      statusContainer: { marginTop: '10px', color: '#007BFF' },
      transcriptContainer: { marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '4px', color: '#007BFF' },
    }
  },
  {
    name: 'Elegant Theme',
    styles: {
      container: { padding: '20px', border: '1px solid #d1d1d1', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f7f7f7' },
      buttonContainer: { marginBottom: '10px', display: 'flex', gap: '10px' },
      startButton: { backgroundColor: '#9b59b6', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      stopButton: { backgroundColor: '#e74c3c', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      muteButton: { backgroundColor: '#3498db', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      logActionButton: { backgroundColor: '#f39c12', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
      statusContainer: { marginTop: '10px', color: '#2c3e50' },
      transcriptContainer: { marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#ecf0f1', padding: '10px', borderRadius: '4px', color: '#2c3e50' },
    }
  }
];

const handleEvents = {
  'call-start': () => console.log('Call started'),
  'call-end': () => console.log('Call ended'),
  'speech-start': () => console.log('Speech started'),
  'speech-end': () => console.log('Speech ended'),
  'volume-level': (volume: number) => console.log(`Volume level: ${volume}`),
  'message': (message: any) => console.log('Message received:', message),
  'error': (error: Error) => console.error('Error:', error),
};

const App: React.FC = () => {
  return (
    <div className="p-12">
      <h1>VapiComponent Style Showcase</h1>
      <hr />
      {styleSets.map((styleSet, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h2>{styleSet.name}</h2>
          <VapiComponent
            publicKey={process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ""}
            assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ""}
            onEvents={handleEvents}
            startButtonLabel="Initiate Call"
            stopButtonLabel="End Call"
            muteButtonLabel="Mute Audio"
            unmuteButtonLabel="Unmute Audio"
            callStatusLabel="Current Call Status"
            transcriptLabel="Live Transcript"
            styles={styleSet.styles}
          />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
