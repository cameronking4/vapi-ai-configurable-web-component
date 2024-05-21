// vapi-demo/pages/index.tsx
"use client";
import React from 'react';
import { VapiComponent, TranscriptEntry } from 'vapi-web';

const Home = () => {
  const handleEvents = {
    'call-start': () => console.log('Call started'),
    'call-end': () => console.log('Call ended'),
    'speech-start': () => console.log('Speech started'),
    'speech-end': () => console.log('Speech ended'),
    'volume-level': (volume: number) => console.log(`Volume level: ${volume}`),
    'message': (message: any) => console.log('Message received:', message),
    'error': (error: Error) => console.error('Error:', error),
  };

  const handleTranscriptUpdate = (transcripts: TranscriptEntry[]) => {
    console.log('Transcript updated:', transcripts);
  };

  const handleFunctionCall = (functionName: string, functionArgs: any) => {
    console.log(`Function called: ${functionName} with arguments:`, functionArgs);
    if (functionName === 'exampleFunction') {
      // Handle the function call
      alert(`Function called with args: ${JSON.stringify(functionArgs)}`);
    }
  };

  const assistantConfig = {
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    model: {
      provider: "openai",
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant with advanced capabilities.",
        },
      ],
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    name: "Advanced Assistant with Functions",
  };

  const customStyles = {
    container: { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' },
    buttonContainer: { marginBottom: '10px', display: 'flex', gap: '10px' },
    startButton: { backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    stopButton: { backgroundColor: '#f44336', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    muteButton: { backgroundColor: '#008CBA', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    statusContainer: { marginTop: '10px' },
    transcriptContainer: { marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '4px' },
  };

  return (
    <div>
      <h1>Advanced Vapi Voice Assistant with AutoStart and Functions</h1>
      <br/>
      <VapiComponent
        publicKey="your-public-key"
        assistantConfig={assistantConfig}
        onEvents={handleEvents}
        startButtonLabel="Initiate Call"
        stopButtonLabel="End Call"
        muteButtonLabel="Mute Audio"
        unmuteButtonLabel="Unmute Audio"
        callStatusLabel="Current Call Status"
        transcriptLabel="Live Transcript"
        onStart={() => console.log('Call started')}
        onStop={() => console.log('Call stopped')}
        onMuteToggle={(isMuted) => console.log(`Mute toggled: ${isMuted}`)}
        onTranscriptUpdate={handleTranscriptUpdate}
        onFunctionCall={handleFunctionCall}
        autoStart={false}  // Automatically starts the call
        logActionMessage='The user has pressed the button, get their attention back nicely.'
        styles={customStyles}
      />
    </div>
  );
};

export default Home;
