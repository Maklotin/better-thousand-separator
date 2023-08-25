import React, { useState, useRef } from 'react';
import separators from './separators.json'

interface SeparatorInputProps {
  className?: string;
  id?: string;
  separator?: keyof typeof separators;
}
function SeparatorInput(props: SeparatorInputProps) {
  const inputField = useRef<HTMLInputElement>(null)
  const inputField2 = useRef<string>('')
  const [numberValue, setNumberValue] = useState<Array<number>>([])
  const [inputValue, setInputValue] = useState('')
  const [mousePos, setMousePos] = useState<Array<number>>([0, 0])

  const separatorOption = separators[props.separator || "comma"]
  const regex = new RegExp(separatorOption.regex, 'g')
  const regexNoLetter = new RegExp(separatorOption.regexNoLetter, 'g')

  const handleOnInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    inputField2.current = (event.currentTarget.value)
    const numberSplit = (inputField2.current.replace(regex, '')).split('')
    const parsedNumbers = numberSplit.map(Number);
    setNumberValue(parsedNumbers);
    const inputElement = inputField.current;
    if (!inputElement) return;
    const cursorPosition = inputElement!.selectionStart || 0;
    if (inputValue.length === cursorPosition - 1) {
      const newCursorPosition = cursorPosition;
      inputElement!.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }
  const trackMouse = (event: React.MouseEvent<HTMLInputElement>) => {
    setMousePos([event.currentTarget.selectionStart || 0, event.currentTarget.selectionEnd || 0]);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (inputValue === '0') {
      setInputValue('')
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
      return
    }

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
    if (mousePos[0] === mousePos[1]) {
      if (event.key === 'Backspace') {
        event.preventDefault()
        const inputElement = inputField.current;
        const cursorPosition = inputElement!.selectionStart || 0;
        if (!inputElement) return;
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
          } else if ((inputValue.replace(regex, '')).length % 3 === 1) {
            setTimeout(() => {
              const newCursorPosition = cursorPosition - 2;
              inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 10);
          } else {
            setTimeout(() => {
              const newCursorPosition = cursorPosition - 1;
              inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 10);
          }
        }
      } else if (event.key === 'Delete') {
        event.preventDefault()
        const inputElement = inputField.current;
        if (!inputElement) return;
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
          } else if ((inputValue.replace(regex, '')).length % 3 === 1) {
            setTimeout(() => {
              const newCursorPosition = cursorPosition;
              inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 10);
          } else {
            setTimeout(() => {
              const newCursorPosition = cursorPosition;
              inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 10);
          }
        }
      }
    }
  }
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(Number(event.currentTarget.value.replace(regex, '')).toLocaleString(separatorOption.toLoStr))
    const inputElement = inputField.current;
    if (!inputElement) return;
    const cursorPosition = inputElement.selectionStart || 0;
    if (!(inputValue.length === cursorPosition - 1)) {
      if (((inputValue.replace(regex, '').length) % 3 === 0)) {
        setTimeout(() => {
          const newCursorPosition = cursorPosition + 1;
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 10);
      } else {
        setTimeout(() => {
          const newCursorPosition = cursorPosition;
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 10);
      }
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const clipBoard = event.clipboardData.getData('text/plain')
    const noLettersPaste = clipBoard.replace(regexNoLetter, '')

    setInputValue(Number(noLettersPaste).toLocaleString(separatorOption.toLoStr))
    event.preventDefault()
  }
  return (
    <input
      type='text'
      onChange={onChange}
      onInput={handleOnInput}
      onKeyDown={handleKeyDown}
      onMouseMove={trackMouse}
      onClick={trackMouse}
      onPaste={handlePaste}
      ref={inputField}
      value={inputValue}
      className={props.className}
      id={props.id}
      style={{ textAlign: 'right' }}
    />
  );
}
export default SeparatorInput;