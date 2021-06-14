enum AuthMode {
  login,
  register,
}

interface Props {
  mode: AuthMode;
  onChange: Function;
}

const AuthToggleSlider = ({ mode, onChange }: Props) => {
  return (
    <div className="inline-flex p-1 bg-gray-200 rounded-full">
      <button
        className={`px-4 py-1 text-sm rounded-full transition focus:outline-none ${
          mode === AuthMode.login
            ? 'bg-white shadow-sm text-orange-600 font-medium'
            : ''
        }`}
        onClick={(_) => {
          onChange(AuthMode.login);
        }}
      >
        Login
      </button>
      <button
        className={`px-4 py-1 text-sm rounded-full transition focus:outline-none ${
          mode === AuthMode.register
            ? 'bg-white shadow-sm text-orange-600 font-medium'
            : ''
        }`}
        onClick={(_) => {
          onChange(AuthMode.register);
        }}
      >
        Register
      </button>
    </div>
  );
};

export default AuthToggleSlider;
export { AuthMode };
