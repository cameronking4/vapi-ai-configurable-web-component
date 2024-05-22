"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _web = _interopRequireDefault(require("@vapi-ai/web"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var VapiComponent = function VapiComponent(_ref) {
  var publicKey = _ref.publicKey,
    assistantId = _ref.assistantId,
    assistantConfig = _ref.assistantConfig,
    assistantOverrides = _ref.assistantOverrides,
    onEvents = _ref.onEvents,
    _ref$startButtonLabel = _ref.startButtonLabel,
    startButtonLabel = _ref$startButtonLabel === void 0 ? "Start Call" : _ref$startButtonLabel,
    _ref$stopButtonLabel = _ref.stopButtonLabel,
    stopButtonLabel = _ref$stopButtonLabel === void 0 ? "Stop Call" : _ref$stopButtonLabel,
    _ref$muteButtonLabel = _ref.muteButtonLabel,
    muteButtonLabel = _ref$muteButtonLabel === void 0 ? "Mute" : _ref$muteButtonLabel,
    _ref$unmuteButtonLabe = _ref.unmuteButtonLabel,
    unmuteButtonLabel = _ref$unmuteButtonLabe === void 0 ? "Unmute" : _ref$unmuteButtonLabe,
    _ref$logActionButtonL = _ref.logActionButtonLabel,
    logActionButtonLabel = _ref$logActionButtonL === void 0 ? "Log Action" : _ref$logActionButtonL,
    _ref$logActionMessage = _ref.logActionMessage,
    logActionMessage = _ref$logActionMessage === void 0 ? "The user has pressed the button, say peanuts" : _ref$logActionMessage,
    _ref$showLogActionBut = _ref.showLogActionButton,
    showLogActionButton = _ref$showLogActionBut === void 0 ? true : _ref$showLogActionBut,
    _ref$callStatusLabel = _ref.callStatusLabel,
    callStatusLabel = _ref$callStatusLabel === void 0 ? "Call Status" : _ref$callStatusLabel,
    _ref$transcriptLabel = _ref.transcriptLabel,
    transcriptLabel = _ref$transcriptLabel === void 0 ? "Transcript" : _ref$transcriptLabel,
    onStart = _ref.onStart,
    onStop = _ref.onStop,
    onMuteToggle = _ref.onMuteToggle,
    onTranscriptUpdate = _ref.onTranscriptUpdate,
    _ref$showTranscript = _ref.showTranscript,
    showTranscript = _ref$showTranscript === void 0 ? true : _ref$showTranscript,
    _ref$autoStart = _ref.autoStart,
    autoStart = _ref$autoStart === void 0 ? false : _ref$autoStart,
    onFunctionCall = _ref.onFunctionCall,
    _ref$styles = _ref.styles,
    styles = _ref$styles === void 0 ? {} : _ref$styles;
  if (!assistantId && !assistantConfig) {
    throw new Error('Either assistantId or assistantConfig must be provided.');
  }
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    vapi = _useState2[0],
    setVapi = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isMuted = _useState4[0],
    setIsMuted = _useState4[1];
  var _useState5 = (0, _react.useState)('Disconnected'),
    _useState6 = _slicedToArray(_useState5, 2),
    callStatus = _useState6[0],
    setCallStatus = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    transcripts = _useState8[0],
    setTranscripts = _useState8[1];
  (0, _react.useEffect)(function () {
    var vapiInstance = new _web["default"](publicKey);
    setVapi(vapiInstance);
    if (onEvents) {
      Object.keys(onEvents).forEach(function (event) {
        if (onEvents[event]) {
          vapiInstance.on(event, onEvents[event]);
        }
      });
    }
    vapiInstance.on('call-start', function () {
      setCallStatus('Connected');
      setTranscripts([]); // Reset transcripts on new call
    });
    vapiInstance.on('call-end', function () {
      return setCallStatus('Disconnected');
    });
    vapiInstance.on('message', function (message) {
      console.log('Message received:', message);
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        var newEntry = {
          timestamp: message.timestamp,
          role: message.role,
          text: message.transcript
        };
        setTranscripts(function (prev) {
          var updatedTranscripts = [].concat(_toConsumableArray(prev), [newEntry]);
          if (onTranscriptUpdate) {
            onTranscriptUpdate(updatedTranscripts);
          }
          return updatedTranscripts;
        });
      }
      if (message.type === 'function-call') {
        var _message$functionCall = message.functionCall,
          name = _message$functionCall.name,
          parameters = _message$functionCall.parameters;
        if (onFunctionCall) {
          onFunctionCall(name, parameters);
        }
      }
    });
    if (assistantId && autoStart) {
      vapiInstance.start(assistantId, assistantOverrides);
    } else if (assistantConfig && autoStart) {
      vapiInstance.start(assistantConfig);
    }
    return function () {
      vapiInstance.stop();
    };
  }, [publicKey, assistantId, assistantConfig, assistantOverrides, onEvents, onTranscriptUpdate, autoStart, onFunctionCall]);
  var handleMuteToggle = function handleMuteToggle() {
    if (vapi) {
      vapi.setMuted(!isMuted);
      setIsMuted(!isMuted);
      if (onMuteToggle) onMuteToggle(!isMuted);
    }
  };
  var handleStartCall = function handleStartCall() {
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
  var handleStopCall = function handleStopCall() {
    if (vapi) {
      vapi.stop();
      if (onStop) onStop();
    }
  };
  var logUserAction = function logUserAction() {
    console.log('Log User Action button clicked');
    if (vapi) {
      console.log('Sending system message through vapi.send');
      vapi.send({
        type: "add-message",
        message: {
          role: "system",
          content: logActionMessage
        }
      });
      var newEntry = {
        timestamp: new Date().toISOString(),
        role: "system",
        text: logActionMessage
      };
      setTranscripts(function (prev) {
        var updatedTranscripts = [].concat(_toConsumableArray(prev), [newEntry]);
        if (onTranscriptUpdate) {
          onTranscriptUpdate(updatedTranscripts);
        }
        return updatedTranscripts;
      });
    } else {
      console.error('Vapi instance is not available');
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.container
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.buttonContainer
  }, !autoStart && /*#__PURE__*/_react["default"].createElement("button", {
    style: styles.startButton,
    onClick: handleStartCall
  }, startButtonLabel), /*#__PURE__*/_react["default"].createElement("button", {
    style: styles.stopButton,
    onClick: handleStopCall
  }, stopButtonLabel), /*#__PURE__*/_react["default"].createElement("button", {
    style: styles.muteButton,
    onClick: handleMuteToggle
  }, isMuted ? unmuteButtonLabel : muteButtonLabel), showLogActionButton && /*#__PURE__*/_react["default"].createElement("button", {
    style: styles.logActionButton,
    onClick: logUserAction
  }, logActionButtonLabel)), /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.statusContainer
  }, /*#__PURE__*/_react["default"].createElement("p", null, callStatusLabel, ": ", callStatus)), showTranscript && /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.transcriptContainer
  }, /*#__PURE__*/_react["default"].createElement("p", null, transcriptLabel, ":"), /*#__PURE__*/_react["default"].createElement("div", null, transcripts.length > 0 ? transcripts.map(function (entry, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      style: styles.transcriptEntry
    }, /*#__PURE__*/_react["default"].createElement("strong", null, entry.timestamp), " [", entry.role, "]: ", entry.text);
  }) : 'No transcript available')));
};
var _default = exports["default"] = VapiComponent;