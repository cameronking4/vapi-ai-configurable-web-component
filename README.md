# All-in-One Vapi Component

### Integrate Vapi Voice AI into your web applications effortlessly.

Consume `<VapiWeb />` in your React or Next.js app & simplify everything with a component with all functionality you need baked-in. `<VapiWeb />` is intentionally designed for you to seamlessly integrate Vapi Voice AI services into your web applications. This component is turnkey: developers can effortlessly start and manage voice calls, handle various events, support function-calling, display live transcripts, and customize the UI.



## **Features**

- Drop-in component and get started with Vapi Voice AI.
- Manage voice calls with start, stop, and mute functionalities.
- Event handling for various call & audio events.
- Real-time transcription (display of conversation in text as it's happening).
- Customizable styles and labels for all UI elements.
- Advanced assistant configurations for function calling during a conversation



## **Installation**
To install the package, run:



```bash

npm install vapi-web

```



## **Usage**
To use the `<VapiComponent />`, import it into your application and configure it with the necessary props.



### **Props**



| Prop               | Type                       | Description                                                      | Default       |
|--------------------|----------------------------|------------------------------------------------------------------|---------------|
| `publicKey`        | `string`                   | Your Vapi public key for authentication                          |               |
| `assistantId`      | `string`                   | The ID of the pre-configured assistant                           |               |
| `assistantConfig`  | `object`                   | Inline configuration if `assistantId` is not provided            |               |
| `assistantOverrides`| `object`                  | Configuration overrides for the assistant                        |               |
| `onEvents`         | `object`                   | Handlers for various Vapi events (e.g., call-start, message)     |               |
| `startButtonLabel` | `string`                   | Label for the start call button                                  | `"Start Call"`|
| `stopButtonLabel`  | `string`                   | Label for the stop call button                                   | `"Stop Call"` |
| `muteButtonLabel`  | `string`                   | Label for the mute button                                        | `"Mute"`      |
| `unmuteButtonLabel`| `string`                   | Label for the unmute button                                      | `"Unmute"`    |
| `callStatusLabel`  | `string`                   | Label for the call status display                                | `"Call Status"`|
| `transcriptLabel`  | `string`                   | Label for the transcript display                                 | `"Transcript"`|
| `onStart`          | `function`                 | Callback when the start button is clicked                        |               |
| `onStop`           | `function`                 | Callback when the stop button is clicked                         |               |
| `onMuteToggle`     | `function`                 | Callback when the mute button is toggled                         |               |
| `onTranscriptUpdate`| `function`                | Callback when transcript updates                                 |               |
| `showTranscript`   | `boolean`                  | Show/hide transcript display                                     | `true`        |
| `autoStart`        | `boolean`                  | Automatically start the assistant when component mounts          | `false`       |
| `onFunctionCall`   | `function`                 | Callback for function calls received in messages                 |               |
| `styles`           | `object`                   | Custom styles for various elements                               | `{}`          |



## **Example**
Here’s an advanced usage example that demonstrates complex setup, custom event handling, dynamic styling, and advanced assistant configuration.

```jsx
// Example usage in a component or app/page.tsx
import React from 'react';
import VapiComponent from 'vapi-web';

const App = () => {
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
      <h1>Advanced Vapi Voice Assistant</h1>
      <VapiComponent
        publicKey="your-public-key"
        assistantId="your-assistant-id"
        assistantOverrides={{ variableValues: { name: 'John' } }}
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
        autoStart={true}  // Automatically starts the call
        styles={customStyles}
      />
    </div>
  );
};

export default App;

```

### Key Highlights:

- **State Management**: `useState` is used for managing the transcript and call duration states.
- **Event Handling**: The `handleEvents` object contains event handlers for various Vapi events, enabling features like tracking call status, updating transcript, etc.
- **Custom Styles**: The `customStyles` object allows you to apply custom styles ensuring the component matches your design language.
- **Advanced Assistant Configuration**: The `assistantConfig` object encompasses comprehensive settings, including transcriber, model, and voice configurations.


### Extending the Component

The `VapiComponent` is extremely flexible and can be adapted for numerous use cases. Customize UI elements and add functionality using provided props to build comprehensive and responsive voice-interactive applications.

By leveraging all the props, this example demonstrates creating a highly configurable and engaging Vapi Voice Assistant within a Next.js app.

## **License**

This project is licensed under the MIT License.


## **Contributing**
We welcome contributions! Please read our [contributing guide](CONTRIBUTING.md) for more details.


## **Acknowledgements**
Special thanks to the Vapi Team for their support and continuous development of the Vapi API.
