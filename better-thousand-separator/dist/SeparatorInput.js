"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const separators_json_1 = __importDefault(require("../src/separators.json"));
function SeparatorInput(props) {
    const inputField = (0, react_1.useRef)(null);
    const inputField2 = (0, react_1.useRef)('');
    const [numberValue, setNumberValue] = (0, react_1.useState)([]);
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const [mousePos, setMousePos] = (0, react_1.useState)([0, 0]);
    const separatorOption = separators_json_1.default[props.separator || "comma"];
    const regex = new RegExp(separatorOption.regex, 'g');
    const regexNoLetter = new RegExp(separatorOption.regexNoLetter, 'g');
    const handleOnInput = (event) => {
        inputField2.current = (event.currentTarget.value);
        const numberSplit = (inputField2.current.replace(regex, '')).split('');
        const parsedNumbers = numberSplit.map(Number);
        setNumberValue(parsedNumbers);
        const inputElement = inputField.current;
        if (!inputElement)
            return;
        const cursorPosition = inputElement.selectionStart || 0;
        if (inputValue.length === cursorPosition - 1) {
            const newCursorPosition = cursorPosition;
            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }
    };
    const trackMouse = (event) => {
        setMousePos([event.currentTarget.selectionStart || 0, event.currentTarget.selectionEnd || 0]);
    };
    function handleKeyDown(event) {
        if (inputValue === '0') {
            setInputValue('');
        }
        trackMouse;
        const allowedKeys = [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Ctrl',
            ...Array.from({ length: 10 }, (_, i) => String(i)),
        ];
        if (event.key === 'a' && (event.ctrlKey || event.metaKey)
            || event.key === 'c' && (event.ctrlKey || event.metaKey)
            || event.key === 'v' && (event.ctrlKey || event.metaKey)) {
            return;
        }
        if (!allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
        if (mousePos[0] === mousePos[1]) {
            if (event.key === 'Backspace') {
                event.preventDefault();
                const inputElement = inputField.current;
                const cursorPosition = inputElement.selectionStart || 0;
                if (!inputElement)
                    return;
                const commasBeforeCursor = (inputValue.substring(0, cursorPosition).match(regex) || []).length;
                const indexToDelete = (cursorPosition - commasBeforeCursor) - 1;
                if (indexToDelete >= 0 && indexToDelete < numberValue.length) {
                    const updatedNumberValue = [...numberValue];
                    updatedNumberValue.splice(indexToDelete, 1);
                    setNumberValue(updatedNumberValue);
                    setInputValue(Number(updatedNumberValue.join('')).toLocaleString(separatorOption.toLoStr));
                    if (inputElement.selectionStart === 1) {
                        setTimeout(() => {
                            const newCursorPosition = 0;
                            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                        }, 10);
                    }
                    else if ((inputValue.replace(regex, '')).length % 3 === 1) {
                        setTimeout(() => {
                            const newCursorPosition = cursorPosition - 2;
                            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                        }, 10);
                    }
                    else {
                        setTimeout(() => {
                            const newCursorPosition = cursorPosition - 1;
                            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                        }, 10);
                    }
                }
            }
            else if (event.key === 'Delete') {
                event.preventDefault();
                const inputElement = inputField.current;
                if (!inputElement)
                    return;
                const cursorPosition = inputElement.selectionStart || 0;
                const commasBeforeCursor = (inputValue.substring(0, cursorPosition).match(regex) || []).length;
                const indexToDelete = (cursorPosition - commasBeforeCursor);
                if (indexToDelete >= 0 && indexToDelete < numberValue.length) {
                    const updatedNumberValue = [...numberValue];
                    updatedNumberValue.splice(indexToDelete, 1);
                    setNumberValue(updatedNumberValue);
                    setInputValue(Number(updatedNumberValue.join('')).toLocaleString(separatorOption.toLoStr));
                    if (cursorPosition === 2) {
                        setTimeout(() => {
                            const newCursorPosition = cursorPosition - 1;
                            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                        }, 10);
                    }
                    else if ((inputValue.replace(regex, '')).length % 3 === 1) {
                        setTimeout(() => {
                            const newCursorPosition = cursorPosition;
                            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                        }, 10);
                    }
                    else {
                        setTimeout(() => {
                            const newCursorPosition = cursorPosition;
                            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                        }, 10);
                    }
                }
            }
        }
    }
    function onChange(event) {
        setInputValue(Number(event.currentTarget.value.replace(regex, '')).toLocaleString(separatorOption.toLoStr));
        const inputElement = inputField.current;
        if (!inputElement)
            return;
        const cursorPosition = inputElement.selectionStart || 0;
        if (!(inputValue.length === cursorPosition - 1)) {
            if (((inputValue.replace(regex, '').length) % 3 === 0)) {
                setTimeout(() => {
                    const newCursorPosition = cursorPosition + 1;
                    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                }, 10);
            }
            else {
                setTimeout(() => {
                    const newCursorPosition = cursorPosition;
                    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                }, 10);
            }
        }
    }
    function handlePaste(event) {
        const clipBoard = event.clipboardData.getData('text/plain');
        const noLettersPaste = clipBoard.replace(regexNoLetter, '');
        setInputValue(Number(noLettersPaste).toLocaleString(separatorOption.toLoStr));
        event.preventDefault();
    }
    return (react_1.default.createElement("input", { type: 'text', onChange: onChange, onInput: handleOnInput, onKeyDown: handleKeyDown, onMouseMove: trackMouse, onClick: trackMouse, onPaste: handlePaste, ref: inputField, value: inputValue, className: props.className, id: props.id, style: { textAlign: 'right' } }));
}
exports.default = SeparatorInput;
