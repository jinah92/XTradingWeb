import React from 'react';
import { Input } from '@shared/ui';

// Props 타입 정의
interface PasswordInputProps {
  value: string;
  onChange: (newValue: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, onKeyDown }) => {
  // const [show, setShow] = React.useState(false);
  // const handleClick = () => setShow(!show);

  return (
    <div className="flex text-black dark:text-white">
      <Input
        // type={show ? "text" : "password"}
        type="password"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="비밀번호"
        onKeyDown={onKeyDown}
      />
      {/* <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button> */}
    </div>
  );
};
