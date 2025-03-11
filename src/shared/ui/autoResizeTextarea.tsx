import React, { useRef, useEffect, forwardRef } from 'react';

import type { UseFormRegisterReturn } from 'react-hook-form';

interface AutoResizeTextareaProps {
  // value: string;
  // onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  maxHeight?: string;
  // ref?: React.LegacyRef<HTMLTextAreaElement>;
}

export const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps & UseFormRegisterReturn>(
  (
    props,
    // {
    //   // value,
    //   // onChange,
    //   placeholder = 'Type something...',
    //   minHeight = '100px',
    //   maxHeight = '600px',
    // },
    ref,
  ) => {
    // const textareaRef = useRef<HTMLTextAreaElement>(null);

    // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   onChange(e.target.value); // 입력된 값을 상위 컴포넌트로 전달
    // };

    // useEffect(() => {
    //   if (textareaRef.current) {
    //     textareaRef.current.style.height = 'auto';
    //     textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    //     if (textareaRef.current.scrollHeight > parseInt(maxHeight)) {
    //       textareaRef.current.style.overflowY = 'auto';
    //       textareaRef.current.style.height = maxHeight;
    //     } else {
    //       textareaRef.current.style.overflowY = 'hidden';
    //     }
    //   }
    // }, [value, maxHeight]);

    return (
      <textarea
        {...props}
        className="dark:bg-darkMode text-sm dark:text-white"
        ref={ref}
        // ref={textareaRef}
        // value={value}
        // onChange={handleChange}
        placeholder={props.placeholder}
        style={{
          width: '100%',
          minHeight: props.minHeight ?? '100px',
          maxHeight: props.maxHeight ?? '600px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '12px',
          lineHeight: '1.5',
          resize: 'none',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          transition: 'border-color 0.3s',
        }}
        onBlur={e => (e.target.style.borderColor = '#ccc')}
      />
    );
  },
);
