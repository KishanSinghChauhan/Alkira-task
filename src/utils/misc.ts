/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
export const randomNumber = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

export function debounce<Params extends any[]>(
	func: (...args: Params) => any,
	timeout: number
): (...args: Params) => void {
	let timer: NodeJS.Timeout;
	return (...args: Params) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
}
