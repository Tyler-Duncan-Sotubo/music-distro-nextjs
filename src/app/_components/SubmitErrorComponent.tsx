type InputErrorProps = {
  message?: Array<string | undefined>;
};

const SubmitErrorComponent = ({ message = [] }: InputErrorProps) => (
  <div>
    {message.length > 0 && (
      <div className="text-sm font-semibold text-error">
        {message.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    )}
  </div>
);

export default SubmitErrorComponent;
