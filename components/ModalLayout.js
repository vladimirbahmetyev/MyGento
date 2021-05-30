import Cross from '../mediaComponents/cross';

export default function ModalLayout({
  withCross,
  children,
  handleClose,
  buttonText,
  title,
  className,
  isSimple,
}) {
  return (
    <div className={className.modal_container}>
      <div className={isSimple ? className.modal_layout : className.large_modal_layout}>
        {withCross && <Cross className={className.mobile_cross} onClick={handleClose} />}
        <Cross className={className.desktop_cross} onClick={handleClose} />
        <h1 className={className.modal_title}>{title}</h1>
        <div className={className.modal_content}>{children}</div>
        <button onClick={handleClose} type="button" className={className.button_active}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
