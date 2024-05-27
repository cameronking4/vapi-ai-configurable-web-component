# All-in-One Vapi Component

### Integrate Vapi Voice AI into your web applications effortlessly.

Add `<VapiComponent />` in your React or Next.js app & simplify Voice AI integrations. VapiComponent has everything you need baked-in and wraps all functionality and types for easy development. `<VapiComponent />` is intentionally designed for you to seamlessly integrate Vapi Voice AI services into your web applications. This component is turnkey: developers can effortlessly start and manage voice calls, handle various events, support function-calling, display live transcripts, and customize the UI.

[Demo](https://vapi-web-package.vercel.app)


## **Features**

- Drop-in component and get started with Vapi Voice AI.
- Manage voice calls with start, stop, and mute functionalities.
- Event handling for various call & audio events.
- Real-time transcription (display of conversation in text as it's happening).
- Customizable styles and labels for all UI elements.
- Advanced assistant configurations for function calling during a conversation

## **Blocks**
### Particle Orb
```tsx
"use client";
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

interface AudiovisualizerProps {
  red?: number;
  green?: number;
  blue?: number;
  currentVolume: number;
  startCall: () => void;
  stopCall: () => void;
  isSessionActive: boolean;
  initialSize?: number;
  activeSize?: number;
}

const Audiovisualizer: React.FC<AudiovisualizerProps> = ({
  red = 1.0,
  green = 1.0,
  blue = 1.0,
  currentVolume,
  startCall,
  stopCall,
  isSessionActive,
  initialSize = 0.75,
  activeSize = 2
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -2, 14);
    camera.lookAt(0, 0, 0);

    const params = {
      threshold: 0.5,
      strength: 0.5,
      radius: 0.8
    };

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      params.strength,
      params.radius,
      params.threshold
    );

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const outputPass = new OutputPass();
    bloomComposer.addPass(outputPass);

    const uniforms = {
      u_time: { type: 'f', value: 0.0 },
      u_frequency: { type: 'f', value: currentVolume },
      u_red: { type: 'f', value: red },
      u_green: { type: 'f', value: green },
      u_blue: { type: 'f', value: blue }
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float u_time;
        uniform float u_frequency;

        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 mod289(vec4 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 permute(vec4 x) {
          return mod289(((x * 34.0) + 10.0) * x);
        }

        vec4 taylorInvSqrt(vec4 r) {
          return 1.79284291400159 - 0.85373472095314 * r;
        }

        vec3 fade(vec3 t) {
          return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
        }

        float pnoise(vec3 P, vec3 rep) {
          vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
          vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
          Pi0 = mod289(Pi0);
          Pi1 = mod289(Pi1);
          vec3 Pf0 = fract(P); // Fractional part for interpolation
          vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 * (1.0 / 7.0);
          vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);

          vec4 gx1 = ixy1 * (1.0 / 7.0);
          vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);

          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gx1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gx1.w);

          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;

          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
          return 2.2 * n_xyz;
        }

        void main() {
          float noise = 3.0 * pnoise(position + u_time, vec3(10.0));
          float baseDisplacement = 0.5; // Base displacement value
          float displacement = baseDisplacement + (u_frequency / 30.0) * (noise / 10.0);
          vec3 newPosition = position + normal * displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }`,
      fragmentShader: `
        uniform float u_red;
        uniform float u_blue;
        uniform float u_green;

        void main() {
          gl_FragColor = vec4(vec3(u_red, u_green, u_blue), 0.5); // Set alpha to 0.5 for transparency
        }`,
      wireframe: true
    });

    const geo = new THREE.IcosahedronGeometry(isSessionActive ? activeSize : initialSize, isSessionActive ? 9 : 5); // Reduced detail level
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const clock = new THREE.Clock();
    const animate = () => {
      // Smoothly update the volume
      uniforms.u_frequency.value = THREE.MathUtils.lerp(uniforms.u_frequency.value, currentVolume, 0.1);
      if (isSessionActive) {
        uniforms.u_frequency.value += 3.5; // Intensify morphing when the call is active
      }
      mesh.rotation.x += 0.025;
      mesh.rotation.y += 0.001;
      uniforms.u_time.value = clock.getElapsedTime();
      bloomComposer.render();
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
    });

    const handleClick = () => {
      if (isSessionActive) {
        stopCall();
      } else {
        startCall();
      }
      setLoading(true);
      setTimeout(() => setLoading(false), 2000); // Simulating a delay for the loading state
    };

    mountRef.current?.addEventListener('click', handleClick);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      mountRef.current?.removeEventListener('click', handleClick);
    };
  }, [red, green, blue, currentVolume, startCall, stopCall, isSessionActive, initialSize, activeSize]);

  return (
    <div ref={mountRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} className='cursor-pointer'>
      {!isSessionActive && !loading && <div style={{ position: 'absolute', color: 'white' }}>Click to Demo</div>}
      {loading && <div style={{ position: 'absolute', color: 'white' }}>One moment...</div>}
    </div>
  );
};

export default Audiovisualizer;
```

## **Installation**
To install the package, run:



```bash

npm install vapi-web

```



## **Usage**
To use the `VapiComponent`, import it into your application and configure it with the necessary props.

```jsx
import { VapiComponent } from "vapi-web"
<VapiComponent
  publicKey="your-public-key"
  assistantId="Your AssistantId from Vapi Dashboard or API" />
```


### **Props**

| Prop                   | Type        | Description                                                              | Default                 |
|------------------------|-------------|--------------------------------------------------------------------------|-------------------------|
| `publicKey`            | `string`    | Your Vapi public key for authentication.                                 |                         |
| `assistantId`          | `string`    | The ID of the pre-configured assistant.                                  |                         |
| `assistantConfig`      | `object`    | Inline configuration if `assistantId` is not provided.                   |                         |
| `assistantOverrides`   | `object`    | Configuration overrides for the assistant.                               |                         |
| `onEvents`             | `object`    | Handlers for various Vapi events (e.g., call-start, message).            |                         |
| `startButtonLabel`     | `string`    | Label for the start call button.                                         | `"Start Call"`          |
| `stopButtonLabel`      | `string`    | Label for the stop call button.                                          | `"Stop Call"`           |
| `muteButtonLabel`      | `string`    | Label for the mute button.                                               | `"Mute"`                |
| `unmuteButtonLabel`    | `string`    | Label for the unmute button.                                             | `"Unmute"`              |
| `logActionButtonLabel` | `string`    | Label for the log action button.                                         | `"Log Action"`          |
| `logActionMessage`     | `string`    | Message that will be logged when log action button is pressed.           | `"The user has pressed the button, say peanuts"` |
| `showLogActionButton`  | `boolean`   | Whether to show the log action button or not.                            | `true`                  |
| `callStatusLabel`      | `string`    | Label for the call status display.                                       | `"Call Status"`         |
| `transcriptLabel`      | `string`    | Label for the transcript display.                                        | `"Transcript"`          |
| `onStart`              | `function`  | Callback when the start button is clicked.                               |                         |
| `onStop`               | `function`  | Callback when the stop button is clicked.                                |                         |
| `onMuteToggle`         | `function`  | Callback when the mute button is toggled.                                |                         |
| `onVolumeChange`       | `function`  | Callback for realtime volumne levels (0-1).                              |                         |
| `onTranscriptUpdate`   | `function`  | Callback when transcript updates.                                        |                         |
| `showTranscript`       | `boolean`   | Show/hide transcript display.                                            | `true`                  |
| `autoStart`            | `boolean`   | Automatically start the assistant when component mounts.                 | `false`                 |
| `onFunctionCall`       | `function`  | Callback for function calls received in messages.                        |                         |
| `styles`               | `object`    | Custom styles for various elements.                                      | 

        

## Styles:  *Styles Interface* detailing configurable styles.
  - *container*: `React.CSSProperties | Style for the container element`.
  - *buttonContainer*: `React.CSSProperties | Style for the button container`.
  - *startButton*: `React.CSSProperties | Style for the start button`.
  - *stopButton*: `React.CSSProperties | Style for the stop button`.
  - *muteButton*: `React.CSSProperties | Style for the mute button`.
  - *logActionButton*: `React.CSSProperties | (Style for the log action button)`.
  - *statusContainer*: `React.CSSProperties | Style for the status container`.
  - *transcriptContainer*: `React.CSSProperties | Style for the transcript container`.
  - *transcriptEntry*: `React.CSSProperties | (Style for each transcript entry)`.


## **Example**
Here’s an advanced usage example that demonstrates complex setup, custom event handling, dynamic styling, and advanced assistant configuration.

```jsx
// Example usage in a component or app/page.tsx
import React from 'react';
import VapiComponent from 'vapi-web';
...

const App = () => {
  ...

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
        muteButtonLabel="Mute Mic"
        unmuteButtonLabel="Unmute Mic"
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



## **Acknowledgements**
Special thanks to the Vapi Team for their support and continuous development of the Vapi API.

## Next Steps
Work with Aceternity UI team to design beautiful styles / templates for a beautiful drop-in Voice AI solution
