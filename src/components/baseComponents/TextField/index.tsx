import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react';
import classNames from 'classnames';
import InputAdornment from '../Adornment';
import { InputAdornmentType } from '../Adornment';
import { removeFirstDuplicateClassNames } from '../../../shared/config/constants';

// ----------------------------------------------------------------------
type Props = InputHTMLAttributes<HTMLInputElement> & {
  textOnly?: boolean;
  inputClassName?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  startAdornmentType?: InputAdornmentType;
  endAdornmentType?: InputAdornmentType;
  isInvalid?: boolean;
};

const TextField = forwardRef(
  (
    {
      className,
      textOnly,
      inputClassName,
      startAdornment,
      endAdornment,
      startAdornmentType,
      endAdornmentType,
      value,
      isInvalid = false,
      ...other
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {

    const existingInputClass = `
        body bg-[#F1F5F9] rounded-sm h-[42px] p-3 
        outline-none w-full placeholder:caption  
        border-1 border-transparent focus:border-[#4C42D7] focus:!ring-2 !ring-[#4C42D7]/25`;
    const modifiedInputClass = inputClassName ? 
        removeFirstDuplicateClassNames(existingInputClass + ' ' + inputClassName) 
        : existingInputClass;

    return (
      <div className={classNames('relative w-full', className)}>
        {startAdornment ? (
          <InputAdornment className="left-0 pl-2" type={startAdornmentType}>
            {startAdornment}
          </InputAdornment>
        ) : null}

        <input
          type="text"
          autoComplete="new-password"
          className={classNames(
            {
              ['pl-10']: !!startAdornment,
              ['pr-10']: !!endAdornment,
              ['font-bold tracking-2']: other.type === 'password',
              ['!bg-transparent focus:!border-transparent']: textOnly,
              ['!bg-[#00000008]']: value ? true : false,
              ['!border-rose-600 !ring-rose-600/25']: isInvalid,
            },
            modifiedInputClass,
          )}
          value={value}
          ref={ref}
          {...other}
        />

        {endAdornment ? (
          <InputAdornment className="right-0 pr-2" type={endAdornmentType}>
            {endAdornment}
          </InputAdornment>
        ) : null}
      </div>
    );
  }
);

export default TextField;
