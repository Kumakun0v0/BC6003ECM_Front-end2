import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Logo from '@components/ui/logo';
import { useForm } from 'react-hook-form';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';

type FormValues = {
  email: string;
};

const defaultValues = {
  email: '',
};

const SignUpFinishForm = () => {
  const { t } = useTranslation();
  const { setModalView, openModal, closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  function handleSignIn() {
    setModalView('LOGIN_VIEW');
    return openModal();
  }

  const onSubmit = (values: FormValues) => {
    console.log(values, 'token');
  };

  return (
    <div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-9 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
          {t('Register Success')}
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate>
        <Button onClick={handleSignIn}>{t('common:text-login')}</Button>
      </form>
    </div>
  );
};

export default SignUpFinishForm;
