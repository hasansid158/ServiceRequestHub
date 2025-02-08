import { useForm } from 'react-hook-form';

const useHookForm = (initialValues, options) => {
  const {
    control,
    formState: {
      isValid,
      errors
    },
    getValues,
    setValue,
    watch,
    reset,
    ...rest
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
    ...options,
  });

  const formObj = {
    control,
    getValues,
    setValue,
    watch,
    isValid,
    reset,
    errors,
  };

  return {
    formObj,
    ...rest,
  };
};

export default useHookForm;
