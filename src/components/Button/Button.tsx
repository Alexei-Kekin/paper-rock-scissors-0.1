import React, { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Spinner } from '../loaders/Spinner/Spinner';
import styles from './Button.module.scss';

export interface IButtonProps extends AnchorHTMLAttributes<HTMLElement> {
    className?: string;
    type?: 'submit' | 'button';
    fullWidth?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
    nativeLink?: boolean;
}

export const Button = React.forwardRef<HTMLAnchorElement & HTMLButtonElement, IButtonProps>(({
     className,
     type = 'button',
     href,
     fullWidth,
     isLoading,
     disabled,
     nativeLink,
     children,
     ...restProps
}, ref) => {
    const generalProps = {
        ...restProps,
        className: classNames(
            styles.button,
            {
                [styles.fullWidth]: fullWidth,
                [styles.disabled]: disabled || isLoading,
                [styles.loading]: isLoading,
            },
            className,
        ),
        ref,
    };

    const content = (
        <>
            { children }
            { isLoading && (
                <Spinner className={styles.spinner} />
            ) }
        </>
    );

    if (href) {
        // if (nativeLink) {
        //     return (
        //         <a {...generalProps} href={href}>
        //             { content }
        //         </a>
        //     );
        // }
        //
        // return (
        //     <Link href={href}>
        //         <a {...generalProps}>
        //             { content }
        //         </a>
        //     </Link>
        // );
        return null;
    }

    return (
        <button
            {...generalProps}
            type={type}
            disabled={disabled || isLoading}
        >
            { content }
            <div className={styles.background} />
        </button>
    );
});

Button.displayName = 'Button';
