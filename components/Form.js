import {withFormik, Field} from 'formik';
import Plus from '../mediaComponents/plus';
import Paperclip from '../mediaComponents/paperclip';
import Cross from '../mediaComponents/cross';
import RadioChecked from '../mediaComponents/radioChecked';
import CheckBoxChecked from '../mediaComponents/checkBoxChecked';

const validate = values => {
  const errors = {};
  if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Пожалуйста, укажите электронную почту';
  }
  if (!values.firstName) {
    errors.firstName = 'Пожалуйста, укажите имя';
  }
  if (values.firstName && values.firstName.split('').some(char => !!parseInt(char, 10))) {
    errors.firstName = 'В имени могут быть только буквы';
  }
  if (!values.lastName) {
    errors.lastName = 'Пожалуйста, укажите фамилию';
  }
  if (values.lastName && values.lastName.split('').some(char => !!parseInt(char, 10))) {
    errors.lastName = 'В фамилии могут быть только буквы';
  }
  return errors;
};

const handleSubmit = (values, {setSubmitting, resetForm, props: {openPopup}}) => {
  const {firstName, lastName, gender, email, githubLink, file} = values;
  openPopup(firstName);
  console.log(firstName, lastName, gender, email, githubLink, file);
  setSubmitting(false);
  resetForm({});
};

const mapPropsToValues = () => ({
  firstName: '',
  lastName: '',
  email: '',
  githubLink: '',
  policy: false,
  file: null,
});

const Form = props => {
  const {
    styles,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    openPolicy,
  } = props;

  const {firstName, lastName, email, policy, gender} = values;
  const isSubmitActive = firstName && lastName && email && policy && gender;

  const handleFileUpload = e => {
    setFieldValue('file', e.currentTarget.files[0]);
  };

  const resetFile = () => setFieldValue('file', null);

  return (
    <form className={styles.form_layout} onSubmit={handleSubmit}>
      <h1 className={styles.main_title}>Анкета соискателя</h1>
      <h2 className={styles.sub_title}>Личные данные</h2>
      <div className={styles.main_info_layout}>
        <label className={!errors.firstName ? styles.input_text : styles.input_text_error}>
          Имя *
          <Field
            value={values.firstName}
            type="text"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstName && <div className={styles.text_error}>{errors['firstName']}</div>}
        </label>
        <label className={!errors.lastName ? styles.input_text : styles.input_text_error}>
          Фамилия *
          <Field
            type="text"
            value={values.lastName}
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastName && <div className={styles.text_error}>{errors['lastName']}</div>}
        </label>
        <label className={!errors.email ? styles.input_text : styles.input_text_error}>
          Электронная почта *
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <div className={styles.text_error}>{errors['email']}</div>}
        </label>
        <div className={!values.file ? styles.input_file : styles.input_file_uploaded}>
          <label className={!values.file ? styles.file_container : styles.file_container_upload}>
            {!values.file ? (
              <Plus className={styles.plus_icon} />
            ) : (
              <Paperclip className={styles.paperclip} />
            )}
            {!values.file ? 'Загрузить резюме' : values.file.name}
            <input type="file" name="cv" onChange={handleFileUpload} />
          </label>
          {values.file && <Cross className={styles.file_cross} onClick={resetFile} />}
        </div>
      </div>
      <h2 className={styles.sub_title}>
        Пол * {errors.gender && <div className={styles.gender_error}>{errors['gender']}</div>}
      </h2>
      <div className={styles.radio_container}>
        <label className={styles.input_radio}>
          {values.gender === 'man' ? (
            <RadioChecked classNames={styles.radio_checked} />
          ) : (
            <div className={styles.radio_empty} />
          )}
          <Field type="radio" name="gender" onBlur={handleBlur} value="man" /> Мужской
        </label>
        <label className={styles.input_radio}>
          {values.gender === 'woman' ? (
            <RadioChecked classNames={styles.radio_checked} />
          ) : (
            <div className={styles.radio_empty} />
          )}
          <Field type="radio" name="gender" onBlur={handleBlur} value="woman" /> Женский
        </label>
      </div>
      <h2 className={styles.sub_title}>Github</h2>
      <label className={styles.input_text}>
        Вставьте ссылку на Github
        <input type="text" value={values.githubLink} name="githubLink" onChange={handleChange} />
      </label>
      <div className={styles.input_checkbox}>
        <label>
          {!values.policy ? (
            <div className={styles.checkbox_empty} />
          ) : (
            <CheckBoxChecked className={styles.checkbox_checked} />
          )}
          <Field type="checkbox" name="policy" className={styles.checkbox_hide} />
        </label>
        * Я согласен с&nbsp;{' '}
        <span onClick={openPolicy} className={styles.link_politic}>
          политикой конфиденциальности
        </span>
      </div>
      <button
        type="submit"
        disabled={!isSubmitActive}
        className={!isSubmitActive ? styles.button : styles.button_active}
      >
        Отправить
      </button>
    </form>
  );
};

export default withFormik({
  mapPropsToValues,
  validate,
  validateOnBlur: true,
  validateOnChange: false,
  handleSubmit,
})(Form);
