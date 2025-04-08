import { jsx as _jsx } from "react/jsx-runtime";
import "./Spinner.scss";
export const Spinner = ({ delay }) => {
    return (_jsx("div", { className: "spinner-container", children: _jsx("div", { className: "spinner", style: { animationDelay: delay ? `${delay}ms` : "0ms" } }) }));
};
