import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';

import styles from './styles.module.scss';

type HTMLInputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

type CustomProps = {
	className?: string;
	icon?: ReactNode;
};

type InputProps = HTMLInputProps & CustomProps;

const Input = forwardRef(
	({ className, icon, ...rest }: InputProps, ref: any) => (
		<div className={styles.inputBox}>
			<span className={styles.icon}>{icon}</span>
			<input
				className={clsx(
					styles.input,
					{
						[styles.inputIcon]: icon,
					},
					className
				)}
				ref={ref}
				{...rest}
			/>
		</div>
	)
);

export default Input;

Input.defaultProps = {
	className: '',
	icon: '',
};
