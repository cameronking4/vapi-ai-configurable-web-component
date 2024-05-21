import React, { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';

// Define the types for use in other parts of the application
export type VapiEventNames = 'call-start' | 'call-end' | 'speech-start' | 'speech-end' | 'volume-level' | 'message' | 'error';

export interface TranscriptEntry {
  timestamp: string;
  role: string;
  text: string;
}

export interface VapiComponentProps {
  publicKey: string;
  assistantId?: string;
  assistantConfig?: object;
  assistantOverrides?: object;
  onEvents?: { [key in VapiEventNames]?: (event: any) => void };
  startButtonLabel?: string;
  stopButtonLabel?: string;
  muteButtonLabel?: string;
  unmuteButtonLabel?: string;
  logActionButtonLabel?: string;
  logActionMessage?: string;
  showLogActionButton?: boolean;
  callStatusLabel?: string;
  transcriptLabel?: string;
  onStart?: () => void;
  onStop?: () => void;
  onMuteToggle?: (isMuted: boolean) => void;
  onTranscriptUpdate?: (transcripts: TranscriptEntry[]) => void;
  showTranscript?: boolean;
  autoStart?: boolean;
  onFunctionCall?: (functionName: string, functionArgs: any) => void;
  styles?: {
    container?: React.CSSProperties;
    buttonContainer?: React.CSSProperties;
    startButton?: React.CSSProperties;
    stopButton?: React.CSSProperties;
    muteButton?: React.CSSProperties;
    logActionButton?: React.CSSProperties;
    statusContainer?: React.CSSProperties;
    transcriptContainer?: React.CSSProperties;
    transcriptEntry?: React.CSSProperties;
  };
}

const VapiComponent: React.FC<VapiComponentProps> = ({
  publicKey,
  assistantId,
  assistantConfig,
  assistantOverrides,
  onEvents,
  startButtonLabel = "Start Call",
  stopButtonLabel = "Stop Call",
  muteButtonLabel = "Mute",
  unmuteButtonLabel = "Unmute",
  logActionButtonLabel = "Log Action",
  logActionMessage = "The user has pressed the button, say peanuts",
  showLogActionButton = true,
  callStatusLabel = "Call Status",
  transcriptLabel = "Transcript",
  onStart,
  onStop,
  onMuteToggle,
  onTranscriptUpdate,
  showTranscript = true,
  autoStart = false,
  onFunctionCall,
  styles = {},
}) => {
  if (!assistantId && !assistantConfig) {
    throw new Error('Either assistantId or assistantConfig must be provided.');
  }

  const [vapi, setVapi] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState('Disconnected');
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);

  useEffect(() => {
    const vapiInstance = new Vapi(publicKey);
    setVapi(vapiInstance);

    if (onEvents) {
      (Object.keys(onEvents) as VapiEventNames[]).forEach(event => {
        if (onEvents[event]) {
          vapiInstance.on(event, onEvents[event]!);
        }
      });
    }

    vapiInstance.on('call-start', () => {
      setCallStatus('Connected');
      setTranscripts([]);  // Reset transcripts on new call
    });

    vapiInstance.on('call-end', () => setCallStatus('Disconnected'));

    vapiInstance.on('message', (message: any) => {
      console.log('Message received:', message);
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newEntry: TranscriptEntry = {
          timestamp: message.timestamp,
          role: message.role,
          text: message.transcript
        };
        setTranscripts(prev => {
          const updatedTranscripts = [...prev, newEntry];
          if (onTranscriptUpdate) {
            onTranscriptUpdate(updatedTranscripts);
          }
          return updatedTranscripts;
        });
      }
      if (message.type === 'function') {
        const { functionName, functionArgs } = message;
        if (onFunctionCall) {
          onFunctionCall(functionName, functionArgs);
        }
      }
    });

    if (assistantId && autoStart) {
      vapiInstance.start(assistantId, assistantOverrides);
    } else if (assistantConfig && autoStart) {
      vapiInstance.start(assistantConfig);
    }

    return () => {
      vapiInstance.stop();
    };
  }, [publicKey, assistantId, assistantConfig, assistantOverrides, onEvents, onTranscriptUpdate, autoStart, onFunctionCall]);

  const handleMuteToggle = () => {
    if (vapi) {
      vapi.setMuted(!isMuted);
      setIsMuted(!isMuted);
      if (onMuteToggle) onMuteToggle(!isMuted);
    }
  };

  const handleStartCall = () => {
    if (vapi && assistantId) {
      vapi.start(assistantId, assistantOverrides);
      if (onStart) onStart();
    } else if (vapi && assistantConfig) {
      vapi.start(assistantConfig);
      if (onStart) onStart();
    } else {
      console.error('Either assistantId or assistantConfig must be provided.');
    }
  };

  const handleStopCall = () => {
    if (vapi) {
      vapi.stop();
      if (onStop) onStop();
    }
  };

  const logUserAction = () => {
    console.log('Log User Action button clicked');
    if (vapi) {
      console.log('Sending system message through vapi.send');
      vapi.send({
        type: "add-message",
        message: {
          role: "system",
          content: logActionMessage,
        },
      });
      const newEntry: TranscriptEntry = {
        timestamp: new Date().toISOString(),
        role: "system",
        text: logActionMessage,
      };
      setTranscripts(prev => {
        const updatedTranscripts = [...prev, newEntry];
        if (onTranscriptUpdate) {
          onTranscriptUpdate(updatedTranscripts);
        }
        return updatedTranscripts;
      });
    } else {
      console.error('Vapi instance is not available');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        {!autoStart && <button style={styles.startButton} onClick={handleStartCall}>{startButtonLabel}</button>}
        <button style={styles.stopButton} onClick={handleStopCall}>{stopButtonLabel}</button>
        <button style={styles.muteButton} onClick={handleMuteToggle}>{isMuted ? unmuteButtonLabel : muteButtonLabel}</button>
        {showLogActionButton && (
          <button style={styles.logActionButton} onClick={logUserAction}>{logActionButtonLabel}</button>
        )}
      </div>
      <div style={styles.statusContainer}>
        <p>{callStatusLabel}: {callStatus}</p>
      </div>
      {showTranscript && (
        <div style={styles.transcriptContainer}>
          <p>{transcriptLabel}:</p>
          <div>
            {transcripts.length > 0 ? transcripts.map((entry, index) => (
              <div key={index} style={styles.transcriptEntry}>
                <strong>{entry.timestamp}</strong> [{entry.role}]: {entry.text}
              </div>
            )) : 'No transcript available'}
          </div>
        </div>
      )}
    </div>
  );
};

export default VapiComponent;
