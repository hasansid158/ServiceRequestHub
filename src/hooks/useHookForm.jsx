import { useForm } from 'react-hook-form';

const useHookForm = (initialValues, options) => {
  const {
    control,
    formState: {
      isValid,
      errors,
      isDirty,
    },
    getValues,
    setValue,
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
    isValid,
    reset,
    errors,
    isDirty,
  };

  return {
    formObj,
    ...rest,
  };
};

export default useHookForm;
