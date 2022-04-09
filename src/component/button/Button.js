import React from "react";

const Button = ({
	onClick,
	className,
	full = true,
	children,
	type = "button",
	bgColor = "primary",
}) => {
	let bgClassName = "bg-primary";
	switch (bgColor) {
		case "primary":
			bgClassName = "bg-primary";
			break;
		case "secondary":
			bgClassName = "bg-secondary";
		default:
			break;
	}
	return (
		<button
			type={type}
			onClick={onClick}
			className={`py-3 px-6 rounded-lg capitalize ${bgClassName} ${
				full ? "w-full" : ""
			} mt-auto ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
