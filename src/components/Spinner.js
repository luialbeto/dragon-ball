import { jsx as _jsx } from "react/jsx-runtime";
import "./Spinner.scss";
export var Spinner = function (_a) {
    var delay = _a.delay;
    return (_jsx("div", { className: "spinner-container", children: _jsx("div", { className: "spinner", style: { animationDelay: delay ? "".concat(delay, "ms") : "0ms" } }) }));
};
