import React from 'react';
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
    onEvents?: {
        [key in VapiEventNames]?: (event: any) => void;
    };
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
declare const VapiComponent: React.FC<VapiComponentProps>;
export default VapiComponent;
