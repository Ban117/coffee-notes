/**
 * @returns method with `this` bound to its class
 */
export function BindMethodToClass(
	_target: unknown,
	methodName: string,
	descriptor: PropertyDescriptor,
): PropertyDescriptor {
	const originalMethod = descriptor.value;

	return {
		configurable: true,
		enumerable: false,
		get() {
			const boundMethod = originalMethod.bind(this);

			Object.defineProperty(this, methodName, {
				value: boundMethod,
				configurable: true,
				writable: true,
			});

			return boundMethod;
		},
	};
}
