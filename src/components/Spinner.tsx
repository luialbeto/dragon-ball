import "./Spinner.scss";

interface SpinnerProps {
  delay?: number;
}

export const Spinner = ({ delay }: SpinnerProps) => {
  return (
    <div className="spinner-container">
      <div
        className="spinner"
        style={{ animationDelay: delay ? `${delay}ms` : "0ms" }}
      />
    </div>
  );
};
