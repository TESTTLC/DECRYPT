import React from 'react';

interface Props {
  error?: string;
  isVisible?: boolean;
  customStyles?: string;
}

const ErrorMessage: React.FC<Props> = ({ error, isVisible, customStyles }) => {
  // if (!isVisible || !error) return null;

  return isVisible && error ? (
    <p className={`text-red-500 ${customStyles}`}>{error}</p>
  ) : null;
};

export default ErrorMessage;
